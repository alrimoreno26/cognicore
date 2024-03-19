import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {LottieCacheModule, LottieModule} from 'ngx-lottie';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpinnerInterceptor} from './interceptors/spinner.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AppUpdateService} from './injects/app.update.services';
import {MessageServices} from './injects/message.services';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {WebSocketServices} from './injects/webSocket.services';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../modules/chat/store/chat.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ChatEffects} from '../modules/chat/store/chat.effects';
import {appInitializerFactory} from './util/app.translation';
import {TranslateService} from '@ngx-translate/core';
import {ChatService} from '../modules/chat/service/chat.service';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthConfigService} from '../auth/auth-config-service';
import {OAuthModule} from 'angular-oauth2-oidc';

export function playerFactory(): any {
    return import('lottie-web/build/player/lottie_light');
}

export function init_app(authConfigService: AuthConfigService) {
    return () => authConfigService.initAuth();
}

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                sendAccessToken: true,
            },
        }),
        LottieModule.forRoot({player: playerFactory}),
        LottieCacheModule.forRoot(),
        StoreModule.forFeature('chat', reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([ChatEffects]),
    ],
    exports: [],
    providers: [
        MessageService, MessageServices, AppUpdateService, DialogService, WebSocketServices, ChatService,AuthConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [ AuthConfigService ],
            multi: true
        },
        {provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [TranslateService, Injector], multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
    ]
})
export class CoreModule {
    constructor(app: AppUpdateService) {
        app.init();
    }
}
