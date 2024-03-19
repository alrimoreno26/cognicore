import {Component, OnInit} from '@angular/core';
import {BaseModalComponentDirective} from '../../../../standalone/data-table/directives/base.modal.component.directive';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationService} from 'primeng/api';
import {UsersService} from '../../service/users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusinessService} from '../../../business/service/business.service';
import {PropertiesType} from '../../../datasource/configuration/models';

@Component({
    selector: 'm-addEditUsers',
    templateUrl: './addEditUsers-modal.components.html'
})
export class AddEditUsersModalComponents extends BaseModalComponentDirective implements OnInit {

    oldValue: string = '';

    constructor(public override service: UsersService,
                private translateService: TranslateService,
                private business: BusinessService,
                private confirmationService: ConfirmationService) {
        super(service);
    }

    ngOnInit() {
        const {data} = this.config;
        this.oldValue = data?.name;
        this.form = new FormGroup<any>({
            email: new FormControl<string>(data?.name, Validators.required),
        });
    }

    override save(): void {
        if (!this.config.data) {
            this.service.create({id: this.business.selectedEntity$().id, user: this.form.get('email').value});
        } else {
            const names = this.service.listEntities$().map(obj => obj.name).filter(x=>x !== this.oldValue);
            const all = names.length === 0? names.concat(this.form.get('email').value).join(','): names.join(',').concat(','+this.form.get('email').value);
            this.service.update({id: this.business.selectedEntity$().id, user: all.split(",")});
        }
    }

}
