import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandRoutingModule} from './brand-routing.module';
import {brandConfigurationResolvers} from './configuration/resolvers/brand.configuration.resolvers';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrandRoutingModule
    ],
    providers:[brandConfigurationResolvers]
})
export class BrandModule {
}
