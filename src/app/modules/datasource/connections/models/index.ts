import {ConfigSetting} from '../../configuration/models';

export interface ConnectionsTO {
    id?: string;
    name: string;
    description: string;
    type: 'CRM' | 'CMS';
    idBussiness: string;
    idBrand?: string;
    configSetting: ConfigSetting;
}
