/// <reference types="react" />
import PropTypes from 'prop-types';
import type { CreateGuesserProps, IntrospectedCreateGuesserProps } from './types.js';
export declare const IntrospectedCreateGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, resource, mutationOptions, redirect: redirectTo, mode, defaultValues, transform, validate, toolbar, warnWhenUnsavedChanges, sanitizeEmptyValues, formComponent, children, ...props }: IntrospectedCreateGuesserProps) => JSX.Element;
declare const CreateGuesser: {
    (props: CreateGuesserProps): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactNodeLike>>;
        resource: PropTypes.Requireable<string>;
    };
};
export default CreateGuesser;
//# sourceMappingURL=CreateGuesser.d.ts.map