import {Injectable} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs/operators';
import {ConfigService} from '../core/config';
import {AuthService} from './service/auth.service';

@Injectable()
export class AuthConfigService {

    private _decodedAccessToken: any;
    private _decodedIDToken: any;

    get decodedAccessToken() {
        return this._decodedAccessToken;
    }

    get decodedIDToken() {
        return this._decodedIDToken;
    }

    constructor(
        private readonly oauthService: OAuthService,
        private authService: AuthService,
        private configService: ConfigService,
        // private readonly authConfig: AuthConfig

    ) {
    }

    async initAuth(): Promise<any> {
        return new Promise<void>(async (resolveFn, rejectFn) => {
            this.configService.load().subscribe(() => {
                const authConfig: AuthConfig = {
                    issuer: this.configService?.getConfiguration()?.authServer.url + '/realms/' + this.configService.getConfiguration().authServer.realm,
                    logoutUrl:this.configService?.getConfiguration()?.authServer.url + '/realms/' + this.configService.getConfiguration().authServer.realm,
                    redirectUri: window.location.origin,
                    clientId: this.configService.getConfiguration().authServer.clientId,
                    dummyClientSecret: this.configService.getConfiguration().authServer.clientSecret,
                    responseType: 'code',
                    scope: 'openid profile email roles',
                    requireHttps: false,
                    showDebugInformation: true,
                    disableAtHashCheck: true
                };
                // setup oauthService
                this.oauthService.configure(authConfig);
                this.oauthService.setStorage(localStorage);
                this.oauthService.tokenValidationHandler = new NullValidationHandler();

                // subscribe to token events
                this.oauthService.events
                    .pipe(filter((e: any) => {
                        if (e.type === 'token_refresh_error') {
                            console.log('aqui debe hacer logout');
                            this.oauthService.logOut();
                        }
                        if (e.type === 'discovery_document_loaded') {
                            this.handleNewToken();
                        }
                        return e.type === 'token_received';
                    }))
                    .subscribe(() => this.handleNewToken());

                // continue initializing app or redirect to login-page
                this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
                    if (isLoggedIn) {
                        this.oauthService.setupAutomaticSilentRefresh();
                        resolveFn();
                    } else {
                        this.oauthService.initCodeFlow();
                        rejectFn();
                    }
                });
            });

        });
    }

    private handleNewToken() {
        this._decodedAccessToken = this.oauthService.getAccessToken();
        this.authService.getUserByJwtToken(this._decodedAccessToken);
        this._decodedIDToken = this.oauthService.getIdToken();
    }

}
