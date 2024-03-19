import {Config, KeycloakServer} from './index';

/**
 * Implementación del patrón Builder para el modelo Config
 */
export class ConfigBuilder {
    private _instance: Config = {
        authServer: {
            "clientId": "ClientCognicore",
            "flow": "implicit",
            "realm": "cognicore",
            "clientSecret": "noU12u46RjG56omSrQb4p4lCsabaqOPd",
            "url": "http://keycloak-dev-2123060858.eu-west-2.elb.amazonaws.com/auth"
        },
        gateway: 'http://gateway-dev-2039754877.eu-west-2.elb.amazonaws.com',
        port:'8181',
        loaded: false
    };

    static newInstance(): ConfigBuilder {
        return new ConfigBuilder();
    }

    withAuthServer(authServer: KeycloakServer) {
        this._instance.authServer = authServer;
        return this;
    }

    withGateway(gateway: string) {
        this._instance.gateway = gateway;
        return this;
    }

    build(): Config {
        return this._instance;
    }
}
