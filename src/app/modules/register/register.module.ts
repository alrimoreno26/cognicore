import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {RegisterComponents} from './register.components';
import {RegisterRoutingModule} from './register-routing.module';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {ColorPickerModule} from 'primeng/colorpicker';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BusinessService} from '../business/service/business.service';
import {MessageServices} from '../../core/injects/message.services';
import {ConnectionsService} from '../datasource/connections/service/connections.service';
import {ConfigurationService} from '../datasource/configuration/service/configuration.service';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {businessReducer} from '../business/store/business.reducers';
import {BusinessEffects} from '../business/store/business.effects';
import {DatasourceConfigurationEffects} from '../datasource/configuration/store/configuration.effects';
import {DatasourceConnectionsEffects} from '../datasource/connections/store/connections.effects';
import {datasource_connections} from '../datasource/connections/store/connections.reducers';
import {datasource_configuration} from '../datasource/configuration/store/configuration.reducers';
import {RadioButtonModule} from 'primeng/radiobutton';
import {OrderListModule} from 'primeng/orderlist';
import {configuration_brand} from '../brand/configuration/store/brand.configuration.reducers';
import {BrandConfigurationEffects} from '../brand/configuration/store/brand.configuration.effects';
import {BrandConfigurationsService} from '../brand/configuration/service/brand.configurations.service';
import {BrandServices} from '../brand/settings/service/brand.services';
import {brandReducers} from '../brand/settings/store/brand.reducers';
import {BrandEffects} from '../brand/settings/store/brand.effects';
import {PasswordModule} from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RegisterRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        RippleModule,
        ColorPickerModule,
        TranslateModule,
        ReactiveFormsModule,
        StoreModule.forFeature('datasource_connections', datasource_connections),
        StoreModule.forFeature('business', businessReducer),
        StoreModule.forFeature('datasource_configuration', datasource_configuration),
        StoreModule.forFeature('configuration_brand', configuration_brand),
        StoreModule.forFeature('brand', brandReducers),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([DatasourceConfigurationEffects, BusinessEffects, DatasourceConnectionsEffects, BrandConfigurationEffects, BrandEffects]),
        RadioButtonModule,
        OrderListModule,
        PasswordModule,
    ],
    declarations: [RegisterComponents],
    providers: [BusinessService, MessageServices, ConnectionsService, ConfigurationService, BrandConfigurationsService, BrandServices]
})
export class RegisterModule {
}
