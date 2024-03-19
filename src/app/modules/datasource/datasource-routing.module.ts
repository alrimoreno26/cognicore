import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {datasourceConfigurationResolvers} from './configuration/resolvers/configuration.resolvers';
import {datasourceConnectionsResolvers} from './connections/resolvers/connections.resolvers';
import {domainEnum} from '../../auth/model';
import {canActivateControlGuard} from '../../core/guards/control.guard';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'configuration',
            canActivate: [canActivateControlGuard],
            data: {breadcrumb: 'Configuration', roles: [domainEnum.ADMIN_SYSTEM]},
            resolve:{entity: datasourceConfigurationResolvers},
            loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
        },
        {
            path: 'connections',
            data: {breadcrumb: 'Connections'},
            resolve:{entity: datasourceConnectionsResolvers},
            loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsModule)
        },
        {
            path: 'connections/:id',
            data: {breadcrumb: 'Connections'},
            resolve:{entity: datasourceConnectionsResolvers},
            loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsModule)
        },

    ])],
    exports: [RouterModule]
})
export class DatasourceRoutingModule {
}
