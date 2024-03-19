import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasourceRoutingModule} from './datasource-routing.module';
import {datasourceConnectionsResolvers} from './connections/resolvers/connections.resolvers';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DatasourceRoutingModule
    ],
    providers:[datasourceConnectionsResolvers]
})
export class DatasourceModule {
}
