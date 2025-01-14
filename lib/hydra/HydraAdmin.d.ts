/// <reference types="react" />
import PropTypes from 'prop-types';
import type { AdminGuesserProps } from '../AdminGuesser.js';
import type { MercureOptions } from '../types.js';
type AdminGuesserPartialProps = Omit<AdminGuesserProps, 'dataProvider' | 'schemaAnalyzer'> & Partial<Pick<AdminGuesserProps, 'dataProvider' | 'schemaAnalyzer'>>;
export interface HydraAdminProps extends AdminGuesserPartialProps {
    entrypoint: string;
    mercure?: MercureOptions | boolean;
}
declare const HydraAdmin: {
    ({ entrypoint, mercure, dataProvider, schemaAnalyzer: adminSchemaAnalyzer, ...props }: HydraAdminProps): JSX.Element;
    propTypes: {
        entrypoint: PropTypes.Validator<string>;
    };
};
export default HydraAdmin;
//# sourceMappingURL=HydraAdmin.d.ts.map