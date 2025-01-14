/// <reference types="react" />
import PropTypes from 'prop-types';
import type { DatagridBodyProps } from 'react-admin';
import type { IntrospectedListGuesserProps, ListGuesserProps } from './types.js';
export declare const DatagridBodyWithMercure: (props: DatagridBodyProps) => JSX.Element;
export declare const IntrospectedListGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, datagridSx, bulkActionButtons, rowClick, rowStyle, isRowSelectable, isRowExpandable, body, header, empty, hover, expand, optimized, size, children, ...props }: IntrospectedListGuesserProps) => JSX.Element;
declare const ListGuesser: {
    ({ filters, ...props }: ListGuesserProps): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactNodeLike>>;
        resource: PropTypes.Requireable<string>;
        filters: PropTypes.Requireable<PropTypes.ReactElementLike>;
        hasShow: PropTypes.Requireable<boolean>;
        hasEdit: PropTypes.Requireable<boolean>;
        rowClick: PropTypes.Requireable<string>;
    };
};
export default ListGuesser;
//# sourceMappingURL=ListGuesser.d.ts.map