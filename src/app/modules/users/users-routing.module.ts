import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UsersComponents} from './users.components';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UsersComponents }
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
