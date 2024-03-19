import {Component, OnInit} from '@angular/core';
import {BaseComponentDirective} from '../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../standalone/data-table/models';
import {UsersService} from './service/users.service';
import {AddEditUsersModalComponents} from './components/addEdit-modal/addEditUsers-modal.components';

@Component({
    templateUrl: './users.components.html',
    styleUrls: ['./users.components.scss']
})
export class UsersComponents  extends BaseComponentDirective implements OnInit{

    override modalContent = AddEditUsersModalComponents;

    override headersTable: HeadersTable[] = [
        {header: 'table_data_config.name', field: 'name', sort: true, class: 'text-center', visible: true, export: false},
        {header: 'common.action', field: 'action', class: 'text-center', export: false, visible: true}
    ];

    constructor(public service: UsersService) {
        super();

    }
    ngOnInit(): void {
        this.service.findAllAnalysts()
    }


}
