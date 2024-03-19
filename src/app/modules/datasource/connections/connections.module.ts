import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectionsRoutingModule} from './connections-routing.module';
import {ConnectionsComponent} from './connections.component';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {ConnectionsService} from './service/connections.service';
import {TagModule} from 'primeng/tag';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {DatasourceConfigurationEffects} from '../configuration/store/configuration.effects';
import {datasource_connections} from './store/connections.reducers';
import {DatasourceConnectionsEffects} from './store/connections.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConnectionsModalComponents} from './components/connections-modal/connections-modal.components';
import {TranslateModule} from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {ConfigurationService} from '../configuration/service/configuration.service';
import {datasource_configuration} from '../configuration/store/configuration.reducers';
import {DividerModule} from 'primeng/divider';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PasswordModule} from 'primeng/password';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConnectionsRoutingModule,
        DataTableModule,
        StoreModule.forFeature('datasource_connections', datasource_connections),
        StoreModule.forFeature('datasource_configuration', datasource_configuration),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([DatasourceConnectionsEffects, DatasourceConfigurationEffects]),
        TagModule,
        TranslateModule,
        InputTextModule,
        PanelModule,
        DropdownModule,
        ButtonModule,
        DividerModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        PasswordModule
    ],
    declarations: [ConnectionsComponent, ConnectionsModalComponents],
    exports: [
        ConnectionsModalComponents
    ],
    providers: [ConnectionsService, ConfigurationService]
})
export class ConnectionsModule {
}
