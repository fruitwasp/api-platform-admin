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
import React from 'react';
import PropTypes from 'prop-types';
import { Show, SimpleShowLayout, Tab, TabbedShowLayout, useResourceContext, } from 'react-admin';
import { useParams } from 'react-router-dom';
import FieldGuesser from './FieldGuesser.js';
import Introspecter from './Introspecter.js';
import useMercureSubscription from './useMercureSubscription.js';
import useDisplayOverrideCode from './useDisplayOverrideCode.js';
const getOverrideCode = (schema, fields) => {
    let code = 'If you want to override at least one field, paste this content in the <ShowGuesser> component of your resource:\n\n';
    code += `const ${schema.title}Show = props => (\n`;
    code += `    <ShowGuesser {...props}>\n`;
    fields.forEach((field) => {
        code += `        <FieldGuesser source={"${field.name}"} />\n`;
    });
    code += `    </ShowGuesser>\n`;
    code += `);\n`;
    code += `\n`;
    code += `And don't forget update your <ResourceGuesser> component:\n`;
    code += `<ResourceGuesser name={"${schema.name}"} show={${schema.title}Show} />`;
    return code;
};
export const IntrospectedShowGuesser = (_a) => {
    var { fields, readableFields, writableFields, schema, schemaAnalyzer, children } = _a, props = __rest(_a, ["fields", "readableFields", "writableFields", "schema", "schemaAnalyzer", "children"]);
    const { id: routeId } = useParams();
    const id = decodeURIComponent(routeId !== null && routeId !== void 0 ? routeId : '');
    useMercureSubscription(props.resource, id);
    const displayOverrideCode = useDisplayOverrideCode();
    let fieldChildren = children;
    if (!fieldChildren) {
        fieldChildren = readableFields.map((field) => (React.createElement(FieldGuesser, { key: field.name, source: field.name })));
        displayOverrideCode(getOverrideCode(schema, readableFields));
    }
    const hasTab = Array.isArray(fieldChildren) &&
        fieldChildren.some((child) => typeof child === 'object' && 'type' in child && child.type === Tab);
    const ShowLayout = hasTab ? TabbedShowLayout : SimpleShowLayout;
    return (React.createElement(Show, Object.assign({}, props),
        React.createElement(ShowLayout, null, fieldChildren)));
};
const ShowGuesser = (props) => {
    const resource = useResourceContext(props);
    return (React.createElement(Introspecter, Object.assign({ component: IntrospectedShowGuesser, resource: resource }, props)));
};
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
ShowGuesser.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    resource: PropTypes.string,
};
/* eslint-enable tree-shaking/no-side-effects-in-initialization */
export default ShowGuesser;
//# sourceMappingURL=ShowGuesser.js.map