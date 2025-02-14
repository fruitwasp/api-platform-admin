/// <reference types="react" />
import PropTypes from 'prop-types';
import type { IntrospectedShowGuesserProps, ShowGuesserProps } from './types.js';
export declare const IntrospectedShowGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, children, ...props }: IntrospectedShowGuesserProps) => JSX.Element;
declare const ShowGuesser: {
    (props: ShowGuesserProps): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactNodeLike>>;
        resource: PropTypes.Requireable<string>;
    };
};
export default ShowGuesser;
//# sourceMappingURL=ShowGuesser.d.ts.map