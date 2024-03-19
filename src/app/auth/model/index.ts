export enum domainEnum {
    ANALYST = 'ANALYST',
    ADMIN_BUSSINES = 'ADMIN_BUSSINES',
    ADMIN_SYSTEM = 'ADMIN_SYSTEM',
}
export interface UserAuthenticated {
    attributes?: any;
    emailVerified?: boolean;
    firstName?: string;
    id?: string;
    lastName?: string;
    userProfileMetadata?: any;
    username?: string;
    session_id?: string;
    roles?: string[];
}

export interface UserBussinessTO {
    color?: string,
    id?: number,
    keyLogo?: string,
    logo?: StorageObjectTo,
    name?: string,
    description?: string,
}

export interface StorageObjectTo {
    encodedFile: string,
    name: string,
    type: string
}
