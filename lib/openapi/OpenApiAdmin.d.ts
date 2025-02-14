/// <reference types="react" />
import PropTypes from 'prop-types';
import type { AdminGuesserProps } from '../AdminGuesser.js';
import type { MercureOptions } from '../types.js';
type AdminGuesserPartialProps = Omit<AdminGuesserProps, 'dataProvider' | 'schemaAnalyzer'> & Partial<Pick<AdminGuesserProps, 'dataProvider' | 'schemaAnalyzer'>>;
export interface OpenApiAdminProps extends AdminGuesserPartialProps {
    entrypoint: string;
    docEntrypoint: string;
    mercure?: MercureOptions | false;
}
declare const OpenApiAdmin: {
    ({ entrypoint, docEntrypoint, mercure, dataProvider, schemaAnalyzer: adminSchemaAnalyzer, ...props }: OpenApiAdminProps): JSX.Element;
    propTypes: {
        entrypoint: PropTypes.Validator<string>;
    };
};
export default OpenApiAdmin;
//# sourceMappingURL=OpenApiAdmin.d.ts.map