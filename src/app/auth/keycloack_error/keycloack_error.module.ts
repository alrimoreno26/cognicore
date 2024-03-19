import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeycloackErrorRoutingModule} from './keycloack_error-routing.module';
import { KeycloackErrorComponent} from './keycloack_error.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
      KeycloackErrorComponent
  ],
  imports: [
    CommonModule,
      KeycloackErrorRoutingModule,
    ButtonModule
  ]
})
export class KeycloackErrorModule { }
