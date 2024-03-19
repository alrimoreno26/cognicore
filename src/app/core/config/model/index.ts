import {InjectionToken} from '@angular/core';
export enum ConfigState {
    LOADED, EMPTY
}
export interface Config {
    authServer: KeycloakServer | null;
    gateway: string;
    port: string;
    loaded: boolean;
}

export interface Environment {
    production: boolean;
    loaded?: boolean;
    urlApi?: string,
    webSocket?: string,
    configUrl: string;
}

export interface KeycloakServer {
    url: string;
    realm: string;
    clientId: string;
    clientSecret: string;
    flow: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
