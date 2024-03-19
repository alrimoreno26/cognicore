import {Component, OnInit} from '@angular/core';
import {BaseModalComponentDirective} from '../../../../../standalone/data-table/directives/base.modal.component.directive';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationService} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesBrand, PropertiesType} from '../../../../datasource/configuration/models';
import {BrandConfigurationsService} from '../../service/brand.configurations.service';

@Component({
    selector: 'm-brand-configuration-modal',
    templateUrl: './configuration-brand-modal.component.html'
})
export class ConfigurationBrandModalComponents extends BaseModalComponentDirective implements OnInit {

    productDialog: boolean = false;
    fields_name: string;
    fields_name_show: string;
    fields_default_value: string;

    old_fields: PropertiesBrand;
    selected_fields: string;
    submitted: boolean = false;
    edit: boolean = false;
    brand_fields: PropertiesBrand[] = [];

    selected_types: any;
    types: any | undefined;

    constructor(public override service: BrandConfigurationsService,
                private translateService: TranslateService,
                private confirmationService: ConfirmationService,) {
        super(service);
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.form = new FormGroup<any>({
            name: new FormControl<string>(data?.name, Validators.required),
            description: new FormControl<string>(data?.description, Validators.required),
            properties: new FormControl<string>(data?.properties, Validators.required),
        });
        this.brand_fields = data === undefined ? [] : data.properties;
        this.types = [
            {name: 'Facet', code: 'facet'},
            {name: 'Age', code: 'age'},
            {name: 'Gender', code: 'gender'},
            {name: 'Context', code: 'domain'},
        ];
    }

    openNew() {
        this.selected_fields = '';
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.selected_types = {};
        this.fields_name = '';
        this.fields_name_show = '';
        this.submitted = false;
        this.productDialog = false;
    }

    saveFields() {
        this.submitted = true;
        const temp_field: PropertiesBrand = {
            name: this.fields_name,
            description: this.fields_name_show,
            type: this.selected_types.code,
            value: [this.fields_default_value]
        };
        const clone_data = [...this.brand_fields];
        const index = this.brand_fields.findIndex(item => item?.name === (this.edit ? this.old_fields.name.trim() : temp_field.name.trim()));
        if (index !== -1) {
            clone_data[index] = (this.edit ?
                temp_field :
                this.old_fields);
        } else {
            clone_data.push((this.edit ?
                this.old_fields :
                temp_field));
        }
        this.brand_fields = clone_data;
        this.form.get('properties').setValue(this.brand_fields)
        this.selected_types = {};
        this.fields_name = '';
        this.fields_name_show = '';
        this.fields_default_value = '';
        this.productDialog = false;
        this.edit = false;
    }

    deleteFields(event: Event,field: PropertiesType) {
        this.confirmationService.confirm({
            message: this.translateService.instant('form_datasource.delete_confirmation') + '?',
            key: 'deleteProperty',
            header: 'Confirm',
            target: event.target || new EventTarget,
            acceptLabel: this.translateService.instant('common.yes'),
            rejectLabel: this.translateService.instant('common.cancel'),
            icon: 'mdi mdi-alert-outline',
            acceptIcon: 'mdi mdi-check',
            rejectIcon: 'mdi mdi-close',
            rejectButtonStyleClass: 'p-button-outlined',
            accept: () => {
                this.brand_fields = this.brand_fields.filter(item => item.name !== field.name.trim());
            }
        });
    }

    editFields(field: PropertiesBrand) {
        this.fields_name = field.name;
        this.selected_types = this.types.find(x => x.code === field.type);
        this.fields_name_show = field.description;
        this.fields_default_value = field.value;
        this.old_fields = field;
        this.submitted = false;
        this.edit = true;
        this.productDialog = true;
    }
}
