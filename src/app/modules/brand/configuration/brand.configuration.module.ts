import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrandConfigurationComponent} from './brand.configuration.component';
import {BrandConfigurationRoutingModule} from './brand.configuration-routing.module';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {TagModule} from 'primeng/tag';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrandConfigurationEffects} from './store/brand.configuration.effects';
import {configuration_brand} from './store/brand.configuration.reducers';
import {BrandConfigurationsService} from './service/brand.configurations.service';
import {ConfigurationBrandModalComponents} from './components/configuration-modal/configuration-brand-modal.component';
import {TranslateModule} from '@ngx-translate/core';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrandConfigurationRoutingModule,
        DataTableModule,
        TagModule,
        StoreModule.forFeature('configuration_brand', configuration_brand),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([BrandConfigurationEffects]),
        DialogModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        RippleModule,
        TableModule,
        ToolbarModule,
        RadioButtonModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
    ],
    declarations: [BrandConfigurationComponent, ConfigurationBrandModalComponents],
    providers: [BrandConfigurationsService]
})
export class BrandConfigurationModule {
}
