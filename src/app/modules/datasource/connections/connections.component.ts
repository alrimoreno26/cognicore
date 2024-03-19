import {Component, OnInit} from '@angular/core';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../../standalone/data-table/models';
import {ConnectionsService} from './service/connections.service';
import {ConnectionsModalComponents} from './components/connections-modal/connections-modal.components';
import {ConfigurationService} from '../configuration/service/configuration.service';

@Component({
    templateUrl: './connections.component.html'
})
export class ConnectionsComponent extends BaseComponentDirective implements OnInit {

    override modalContent = ConnectionsModalComponents;

    override headersTable: HeadersTable[] = [
        {header: 'table_data_config.name', field: 'name', sort: false, class: 'text-center', visible: true, export: false},
        {header: 'table_data_config.description', field: 'description', sort: false, class: 'text-center', visible: true, export: false},
        {header: 'table_data_config.type', field: 'type', sort: false, class: 'text-center', visible: true, export: false},
        {header: 'common.action', field: 'action', class: 'text-center', export: false, visible: true}
    ];

    constructor(public service: ConnectionsService, public configuration: ConfigurationService) {
        super();
        if(!this.configuration.loaded$()){
            this.configuration.loadAll({offset: 0, limit: 100})
        }
    }

    ngOnInit(): void {
    }

    test(ev: any) {
        console.log(ev);
    }

}
