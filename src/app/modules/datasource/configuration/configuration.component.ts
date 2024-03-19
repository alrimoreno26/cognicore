import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../../standalone/data-table/models';
import {ConfigurationService} from './service/configuration.service';
import {ConfigurationModalComponents} from './components/configuration-modal/configuration-modal.components';

@Component({
    templateUrl: './configuration.component.html'
})
export class ConfigurationComponent extends BaseComponentDirective implements OnInit  {

    override modalContent = ConfigurationModalComponents;

    override headersTable: HeadersTable[] = [
        {header: 'table_data_config.name', field: 'name', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'table_data_config.description', field: 'description', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'table_data_config.type', field: 'type', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'common.action', field: 'action', class: 'text-center', export: false, visible: true}
    ];

    constructor(public service: ConfigurationService) {
        super();

    }
    ngOnInit(): void {
    }

}
