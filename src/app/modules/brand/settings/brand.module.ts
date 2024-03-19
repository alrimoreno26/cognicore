import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrandComponent} from './brand.component';
import {BrandRoutingModule} from './brand-routing.module';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {PipesModule} from '../../../core/pipes/pipes.module';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {LottieComponent} from 'ngx-lottie';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {ConnectionsModule} from '../../datasource/connections/connections.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrandEffects} from './store/brand.effects';
import {brandReducers} from './store/brand.reducers';
import {configuration_brand} from '../configuration/store/brand.configuration.reducers';
import {BrandConfigurationEffects} from '../configuration/store/brand.configuration.effects';
import {BrandConfigurationsService} from '../configuration/service/brand.configurations.service';
import {BrandServices} from './service/brand.services';
import {OrderListModule} from 'primeng/orderlist';
import {TranslateModule} from '@ngx-translate/core';
import {BusinessService} from '../../business/service/business.service';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrandRoutingModule,
        DataTableModule,
        PipesModule,
        TagModule,
        ButtonModule,
        InputTextModule,
        LottieComponent,
        RadioButtonModule,
        RippleModule,
        AccordionModule,
        InputTextareaModule,
        TooltipModule,
        ConnectionsModule,
        StoreModule.forFeature('brand', brandReducers),
        StoreModule.forFeature('configuration_brand', configuration_brand),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([BrandEffects, BrandConfigurationEffects]),
        OrderListModule,
        TranslateModule,
        InputSwitchModule,
        MultiSelectModule,
    ],
    declarations: [BrandComponent],
    providers: [BrandServices, BrandConfigurationsService, BusinessService]
})
export class BrandModule {
}
