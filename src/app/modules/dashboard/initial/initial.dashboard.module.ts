import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialDashboardComponent } from './initial.dashboard.component';
import { EcommerceDashboardRoutigModule } from './initial.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';

@NgModule({
	imports: [
		CommonModule,
		EcommerceDashboardRoutigModule,
		ButtonModule,
		RippleModule,
		DropdownModule,
		FormsModule,
		TableModule,
		ChartModule,
        MenuModule
	],
	declarations: [InitialDashboardComponent]
})
export class InitialDashboardModule { }
