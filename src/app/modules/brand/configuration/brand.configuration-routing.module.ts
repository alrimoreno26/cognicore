import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrandConfigurationComponent} from './brand.configuration.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BrandConfigurationComponent }
    ])],
    exports: [RouterModule]
})
export class BrandConfigurationRoutingModule { }
