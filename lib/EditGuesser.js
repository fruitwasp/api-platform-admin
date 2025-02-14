var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Edit, FileInput, FormTab, SimpleForm, TabbedForm, useNotify, useRedirect, useResourceContext, useUpdate, } from 'react-admin';
import { useParams } from 'react-router-dom';
import InputGuesser from './InputGuesser.js';
import Introspecter from './Introspecter.js';
import getIdentifierValue from './getIdentifierValue.js';
import useMercureSubscription from './useMercureSubscription.js';
import useDisplayOverrideCode from './useDisplayOverrideCode.js';
const getOverrideCode = (schema, fields) => {
    let code = 'If you want to override at least one input, paste this content in the <EditGuesser> component of your resource:\n\n';
    code += `const ${schema.title}Edit = props => (\n`;
    code += `    <EditGuesser {...props}>\n`;
    fields.forEach((field) => {
        code += `        <InputGuesser source={"${field.name}"} />\n`;
    });
    code += `    </EditGuesser>\n`;
    code += `);\n`;
    code += `\n`;
    code += `And don't forget update your <ResourceGuesser> component:\n`;
    code += `<ResourceGuesser name={"${schema.name}"} edit={${schema.title}Edit} />`;
    return code;
};
export const IntrospectedEditGuesser = (_a) => {
    var { fields, readableFields, writableFields, schema, schemaAnalyzer, resource, mutationMode = 'pessimistic', mutationOptions, redirect: redirectTo = 'list', mode, defaultValues, validate, transform, toolbar, warnWhenUnsavedChanges, formComponent, sanitizeEmptyValues = true, children } = _a, props = __rest(_a, ["fields", "readableFields", "writableFields", "schema", "schemaAnalyzer", "resource", "mutationMode", "mutationOptions", "redirect", "mode", "defaultValues", "validate", "transform", "toolbar", "warnWhenUnsavedChanges", "formComponent", "sanitizeEmptyValues", "children"]);
    const { id: routeId } = useParams();
    const id = decodeURIComponent(routeId !== null && routeId !== void 0 ? routeId : '');
    useMercureSubscription(resource, id);
    const [update] = useUpdate();
    const notify = useNotify();
    const redirect = useRedirect();
    const displayOverrideCode = useDisplayOverrideCode();
    let inputChildren = React.Children.toArray(children);
    if (inputChildren.length === 0) {
        inputChildren = writableFields.map((field) => (React.createElement(InputGuesser, { key: field.name, source: field.name })));
        displayOverrideCode(getOverrideCode(schema, writableFields));
    }
    const hasFileFieldElement = (elements) => elements.some((child) => React.isValidElement(child) &&
        (child.type === FileInput ||
            hasFileFieldElement(React.Children.toArray(child.props.children))));
    const hasFileField = hasFileFieldElement(inputChildren);
    const save = useCallback((values) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        if (id === undefined) {
            return undefined;
        }
        let data = values;
        if (transform) {
            data = transform(values);
        }
        // Identifiers need to be formatted in case they have not been modified in the form.
        Object.entries(values).forEach(([key, value]) => {
            const identifierValue = getIdentifierValue(schemaAnalyzer, resource, fields, key, value);
            if (identifierValue !== value) {
                data[key] = identifierValue;
            }
        });
        try {
            const response = yield update(resource, {
                id,
                data: Object.assign(Object.assign({}, data), { extraInformation: { hasFileField } }),
            }, { returnPromise: true });
            const success = (_b = mutationOptions === null || mutationOptions === void 0 ? void 0 : mutationOptions.onSuccess) !== null && _b !== void 0 ? _b : ((updatedRecord) => {
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect(redirectTo, resource, updatedRecord.id, updatedRecord);
            });
            success(response, { id, data: response, previousData: values }, {});
            return undefined;
        }
        catch (mutateError) {
            const submissionErrors = schemaAnalyzer.getSubmissionErrors(mutateError);
            const failure = (_c = mutationOptions === null || mutationOptions === void 0 ? void 0 : mutationOptions.onError) !== null && _c !== void 0 ? _c : ((error) => {
                let message = 'ra.notification.http_error';
                if (!submissionErrors) {
                    message =
                        typeof error === 'string' ? error : error.message || message;
                }
                let errorMessage;
                if (typeof error === 'string') {
                    errorMessage = error;
                }
                else if (error === null || error === void 0 ? void 0 : error.message) {
                    errorMessage = error.message;
                }
                notify(message, {
                    type: 'warning',
                    messageArgs: { _: errorMessage },
                });
            });
            failure(mutateError, { id, data: values, previousData: values }, {});
            if (submissionErrors) {
                return submissionErrors;
            }
            return {};
        }
    }), [
        fields,
        hasFileField,
        id,
        mutationOptions,
        notify,
        redirect,
        redirectTo,
        resource,
        schemaAnalyzer,
        transform,
        update,
    ]);
    const hasFormTab = inputChildren.some((child) => typeof child === 'object' && 'type' in child && child.type === FormTab);
    const FormType = hasFormTab ? TabbedForm : SimpleForm;
    return (React.createElement(Edit, Object.assign({ resource: resource, id: id, mutationMode: mutationMode, redirect: redirectTo, transform: (data) => (Object.assign(Object.assign({}, data), { extraInformation: { hasFileField } })) }, props),
        React.createElement(FormType, { onSubmit: mutationMode !== 'pessimistic' ? undefined : save, mode: mode, defaultValues: defaultValues, validate: validate, toolbar: toolbar, warnWhenUnsavedChanges: warnWhenUnsavedChanges, sanitizeEmptyValues: sanitizeEmptyValues, component: formComponent }, inputChildren)));
};
const EditGuesser = (props) => {
    const resource = useResourceContext(props);
    return (React.createElement(Introspecter, Object.assign({ component: IntrospectedEditGuesser, resource: resource }, props)));
};
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
EditGuesser.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    resource: PropTypes.string,
};
/* eslint-enable tree-shaking/no-side-effects-in-initialization */
export default EditGuesser;
//# sourceMappingURL=EditGuesser.js.map