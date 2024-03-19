import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitialDashboardComponent } from './initial.dashboard.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InitialDashboardComponent }
	])],
	exports: [RouterModule]
})
export class EcommerceDashboardRoutigModule { }
