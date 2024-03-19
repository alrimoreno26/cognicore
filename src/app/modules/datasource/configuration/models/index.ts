export interface ConfigType {
    id: string;
    name: string;
    description: string;
    properties: PropertiesType[];
    type: 'CRM' | 'CMS';
}

export interface PropertiesType {
    nameShow: string
    name: string
    type?: string,
    defaultValue: string
}

export interface PropertiesBrand {
    description: string
    name: string
    type?: string,
    value: any
}

export interface ConfigSetting {
    idConfigType?: string;
    settings: any[];
}

export interface DatasourceTO {
    id?: string;
    name: string;
    description: string;
    type: 'CRM' | 'CMS';
    idBussiness: string;
    idBrand: string,
    configSetting: ConfigSetting;
}
