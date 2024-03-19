import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ServiceUnavailableComponent} from './service_unavailable.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ServiceUnavailableComponent }
    ])],
    exports: [RouterModule]
})
export class ServiceUnavailableRoutingModule { }
