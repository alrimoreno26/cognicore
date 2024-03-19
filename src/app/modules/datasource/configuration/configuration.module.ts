import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationRoutingModule} from './configuration-routing.module';
import {ConfigurationComponent} from './configuration.component';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {TagModule} from 'primeng/tag';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {datasource_configuration} from './store/configuration.reducers';
import {DatasourceConfigurationEffects} from './store/configuration.effects';
import {ConfigurationService} from './service/configuration.service';
import {ConfigurationModalComponents} from './components/configuration-modal/configuration-modal.components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigurationRoutingModule,
        DataTableModule,
        TagModule,
        StoreModule.forFeature('datasource_configuration', datasource_configuration),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([DatasourceConfigurationEffects]),
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
    declarations: [ConfigurationComponent, ConfigurationModalComponents],
    providers: [ConfigurationService]
})
export class ConfigurationModule {
}
