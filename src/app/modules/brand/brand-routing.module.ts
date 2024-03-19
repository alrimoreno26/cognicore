import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {brandConfigurationResolvers} from './configuration/resolvers/brand.configuration.resolvers';
import {domainEnum} from '../../auth/model';
import {canActivateControlGuard} from '../../core/guards/control.guard';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'configuration',
            canActivate: [canActivateControlGuard],
            data: {breadcrumb: 'Configuration Brand', roles: [domainEnum.ADMIN_SYSTEM]},
            resolve:{entity: brandConfigurationResolvers},
            loadChildren: () => import('./configuration/brand.configuration.module').then(m => m.BrandConfigurationModule)
        },
        {
            path: 'new',
            data: {breadcrumb: 'Settings', option: 'new'},
            loadChildren: () => import('./settings/brand.module').then(m => m.BrandModule)
        },
        {
            path: 'edit/:id',
            data: {breadcrumb: 'Settings', option: 'edit'},
            loadChildren: () => import('./settings/brand.module').then(m => m.BrandModule)
        },
    ])],
    exports: [RouterModule]
})
export class BrandRoutingModule {
}
