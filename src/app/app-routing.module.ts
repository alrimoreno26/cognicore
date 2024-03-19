import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {path: '', loadChildren: () => import('./layout/app.layout.module').then((m) => m.AppLayoutModule)},
    {path: 'auth', data: {breadcrumb: 'Auth'}, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'notfound', loadChildren: () => import('./modules/notfound/notfound.module').then(m => m.NotfoundModule)},
    {path: 'onboarding', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)},
    {
        path: 'service-unavailable',
        loadChildren: () => import('./../app/auth/service_unavailable/service_unavailable.module').then(m => m.ServiceUnavailableModule)
    },
    {path: 'redirect', redirectTo: '/', pathMatch: 'full'},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
