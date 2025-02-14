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
import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLogoutIfAccessDenied } from 'react-admin';
import SchemaAnalyzerContext from './SchemaAnalyzerContext.js';
import useIntrospect from './useIntrospect.js';
const ResourcesIntrospecter = (_a) => {
    var { component: Component, schemaAnalyzer, includeDeprecated, resource, resources, loading, error } = _a, rest = __rest(_a, ["component", "schemaAnalyzer", "includeDeprecated", "resource", "resources", "loading", "error"]);
    if (loading) {
        return null;
    }
    if (error) {
        if (process.env.NODE_ENV === 'production') {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        throw new Error('API schema is not readable');
    }
    const schema = resources.find((r) => r.name === resource);
    if (!(schema === null || schema === void 0 ? void 0 : schema.fields) || !(schema === null || schema === void 0 ? void 0 : schema.readableFields) || !(schema === null || schema === void 0 ? void 0 : schema.writableFields)) {
        if (process.env.NODE_ENV === 'production') {
            // eslint-disable-next-line no-console
            console.error(`Resource ${resource} not present inside API description`);
        }
        throw new Error(`Resource ${resource} not present inside API description`);
    }
    const fields = includeDeprecated
        ? schema.fields
        : schema.fields.filter(({ deprecated }) => !deprecated);
    const readableFields = includeDeprecated
        ? schema.readableFields
        : schema.readableFields.filter(({ deprecated }) => !deprecated);
    const writableFields = includeDeprecated
        ? schema.writableFields
        : schema.writableFields.filter(({ deprecated }) => !deprecated);
    return (React.createElement(Component, Object.assign({ schemaAnalyzer: schemaAnalyzer, resource: resource, schema: schema, fields: fields, readableFields: readableFields, writableFields: writableFields }, rest)));
};
const Introspecter = (_a) => {
    var { component, includeDeprecated = false, resource } = _a, rest = __rest(_a, ["component", "includeDeprecated", "resource"]);
    const logoutIfAccessDenied = useLogoutIfAccessDenied();
    const schemaAnalyzer = useContext(SchemaAnalyzerContext);
    const schemaAnalyzerProxy = useMemo(() => {
        if (!schemaAnalyzer) {
            return null;
        }
        return new Proxy(schemaAnalyzer, {
            get: (target, key) => {
                if (typeof target[key] !== 'function') {
                    return target[key];
                }
                return (...args) => {
                    // eslint-disable-next-line prefer-spread,@typescript-eslint/ban-types
                    const result = target[key].apply(target, args);
                    if (result && typeof result.then === 'function') {
                        return result.catch((e) => {
                            logoutIfAccessDenied(e).then((loggedOut) => {
                                if (loggedOut) {
                                    return;
                                }
                                throw e;
                            });
                        });
                    }
                    return result;
                };
            },
        });
    }, [schemaAnalyzer, logoutIfAccessDenied]);
    const { refetch, data, isLoading, isIdle, error } = useIntrospect();
    const resources = data ? data.data.resources : null;
    useEffect(() => {
        if (!error && !resources) {
            refetch();
        }
    }, [refetch, error, resources]);
    if (!schemaAnalyzerProxy) {
        return null;
    }
    return (React.createElement(ResourcesIntrospecter, Object.assign({ component: component, schemaAnalyzer: schemaAnalyzerProxy, includeDeprecated: includeDeprecated, resource: resource, resources: resources !== null && resources !== void 0 ? resources : [], loading: isLoading || isIdle, error: error }, rest)));
};
Introspecter.propTypes = {
    component: PropTypes.elementType.isRequired,
    includeDeprecated: PropTypes.bool,
    resource: PropTypes.string,
};
export default Introspecter;
//# sourceMappingURL=Introspecter.js.map