export interface BrandModels {
    name: string;
    id?: string;
    description: string;
    idBussiness: string;
    type: TypeBrand,
    configSetting: {
        settings: any
    }
}


export interface BrandResponse {
    data: BrandModels[];
    limit: number;
    offset: number;
    total: number;
}

export enum TypeBrand {
    STATIC = 'STATIC',
    DYNAMIC = 'DYNAMIC',
}
