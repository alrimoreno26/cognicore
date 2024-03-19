import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponents} from './register.components';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterComponents }
    ])],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
