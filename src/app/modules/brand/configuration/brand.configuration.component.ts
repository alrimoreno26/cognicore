import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../../standalone/data-table/models';
import {BrandConfigurationsService} from './service/brand.configurations.service';
import {ConfigurationBrandModalComponents} from './components/configuration-modal/configuration-brand-modal.component';

@Component({
    templateUrl: './brand.configuration.component.html'
})
export class BrandConfigurationComponent extends BaseComponentDirective implements OnInit  {

    override modalContent = ConfigurationBrandModalComponents;

    override headersTable: HeadersTable[] = [
        {header: 'table_data_config.name', field: 'name', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'table_data_config.description', field: 'description', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'common.action', field: 'action', class: 'text-center', export: false, visible: true}
    ];

    constructor(public service: BrandConfigurationsService) {
        super();
    }

    ngOnInit() {
    }
}
