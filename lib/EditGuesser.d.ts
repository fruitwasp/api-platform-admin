/// <reference types="react" />
import PropTypes from 'prop-types';
import type { EditGuesserProps, IntrospectedEditGuesserProps } from './types.js';
export declare const IntrospectedEditGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, resource, mutationMode, mutationOptions, redirect: redirectTo, mode, defaultValues, validate, transform, toolbar, warnWhenUnsavedChanges, formComponent, sanitizeEmptyValues, children, ...props }: IntrospectedEditGuesserProps) => JSX.Element;
declare const EditGuesser: {
    (props: EditGuesserProps): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactNodeLike>>;
        resource: PropTypes.Requireable<string>;
    };
};
export default EditGuesser;
//# sourceMappingURL=EditGuesser.d.ts.map