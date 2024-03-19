import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { ENVIRONMENT} from './core/config';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from './auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpTranslateLoader} from './core/util/app.translation';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MessageServices} from './core/injects/message.services';
import {ToastModule} from 'primeng/toast';
import {BusinessModule} from './modules/business/business.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppLayoutModule,
        HttpClientModule,
        AuthModule,
        CoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useClass: HttpTranslateLoader,
                deps: [HttpClient]
            },
            extend: true
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ToastModule,
        AppRoutingModule,
        BusinessModule,
    ],
    providers: [
        MessageServices,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: ENVIRONMENT, useValue: environment}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
