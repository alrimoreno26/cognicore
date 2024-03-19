import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {ServiceUnavailableRoutingModule} from './service_unavailable-routing.module';
import {ServiceUnavailableComponent} from './service_unavailable.component';


@NgModule({
    declarations: [
        ServiceUnavailableComponent
    ],
    imports: [
        CommonModule,
        ServiceUnavailableRoutingModule,
        ButtonModule
    ]
})
export class ServiceUnavailableModule {
}
