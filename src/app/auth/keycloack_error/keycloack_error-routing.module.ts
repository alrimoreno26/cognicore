import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {KeycloackErrorComponent} from './keycloack_error.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: KeycloackErrorComponent }
    ])],
    exports: [RouterModule]
})
export class KeycloackErrorRoutingModule { }
