import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {breadcrumb: 'Welcome Cognicore'},
            loadChildren: () => import('./initial/initial.dashboard.module').then(m => m.InitialDashboardModule)
        },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
