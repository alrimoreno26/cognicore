import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './app.layout.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./../modules/dashboard/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'chat', data: { breadcrumb: 'Chat AI/UX' }, loadChildren: () => import('./../modules/chat/chat.app.module').then(m => m.ChatAppModule) },
            { path: 'datasource', data: { breadcrumb: 'Datasource' }, loadChildren: () => import('./../modules/datasource/datasource.module').then(m => m.DatasourceModule) },
            { path: 'brand', data: { breadcrumb: 'Brand' }, loadChildren: () => import('./../modules/brand/brand.module').then(m => m.BrandModule) },
            { path: 'users', data: { breadcrumb: 'Users' }, loadChildren: () => import('./../modules/users/users.module').then(m => m.UsersModule) },
            { path: 'auth', loadChildren: () => import('./../auth/auth.module').then(m => m.AuthModule) },
            // { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            // { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            // { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            // { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
            // { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            // { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            // { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            // { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLayoutRoutingModule {
}
