import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'keycloack', loadChildren: () => import('./keycloack_error/keycloack_error.module').then(m => m.KeycloackErrorModule) },
        { path: 'service-unavailable', loadChildren: () => import('./service_unavailable/service_unavailable.module').then(m => m.ServiceUnavailableModule) },
        { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
        // { path: '**', redirectTo: '/' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
