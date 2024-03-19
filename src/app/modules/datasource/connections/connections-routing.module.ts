import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectionsComponent } from './connections.component';
import {datasourceConnectionsResolvers} from './resolvers/connections.resolvers';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConnectionsComponent, resolve:{entity: datasourceConnectionsResolvers}, }
	])],
	exports: [RouterModule]
})
export class ConnectionsRoutingModule { }
