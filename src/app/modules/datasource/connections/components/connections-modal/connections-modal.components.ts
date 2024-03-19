import {Component, effect, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ConnectionsService} from '../../service/connections.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigType} from '../../../configuration/models';
import {ConfigurationService} from '../../../configuration/service/configuration.service';
import {BaseComponentDirective} from '../../../../../standalone/data-table/directives/base.component.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessService} from '../../../../business/service/business.service';
import {BrandServices} from '../../../../brand/settings/service/brand.services';
import {ConfirmationService} from 'primeng/api';

interface configuration {
    name: string;
    nameShow: string;
}

@Component({
    selector: 'm-connections-modal',
    templateUrl: './connections-modal.components.html'
})
export class ConnectionsModalComponents extends BaseComponentDirective implements OnInit {

    dataSourceConfig: ConfigType[] = [];
    selectedDataSource: ConfigType;
    configuration: configuration[] = [];
    formCRM: FormGroup;
    idBussiness: string;
    editing = false;
    form: FormGroup;
    formData: any;
    id = '';
    editItem: any;
    @Input() showSaveBtn = true;

    constructor(public service: ConnectionsService,
                private translateService: TranslateService,
                private business: BusinessService,
                private brand: BrandServices,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                public configurationService: ConfigurationService,
                private formBuilder: FormBuilder) {
        super();
        this.loadedEffect();
    }

    ngOnInit() {
        this.dataSourceConfig = [];
        this.route.params.subscribe(params => {
            if (this.id !== '' && params['id'] !== this.id) {
                this.id = params['id'];
                this.initForm();
            }
            this.id = params['id'];
        });
        this.form = new FormGroup<any>({
            name: new FormControl<string>('', Validators.required),
            id: new FormControl<string>(''),
            selectedDataSource: new FormControl<ConfigType>(null),
            description: new FormControl<string>('', Validators.required)
        });

    }

    getFormData() {
        return this.form.value;
    }

    getFormDataValid() {
        return this.form.invalid;
    }

    getConfigurationData() {
        return this.configuration;
    }

    loadedEffect() {
        effect(() => {
            if (this.configurationService.loaded$()) {
                this.dataSourceConfig = this.configurationService.listEntities$();
                this.initForm();
            } else {
                this.configurationService.loadAll({page: 0, limit: 100});
            }
            console.log(this.service.selectedEntity$());
            if (this.service.selectedEntity$() === undefined) {
                this.editing = false;
                this.router.navigate(['/datasource/connections']).then();
            }
        });
    }

    initForm() {
        this.configuration = [];
        this.editing = this.id !== undefined;
        this.editItem = this.service.listEntities$().find(x => x.id === this.id);

        // // LOAD CONFIG
        const temp = this.dataSourceConfig.find(config => config.id === this.editItem?.configSetting.idConfigType);
        this.selectedDataSource = temp ? temp : this.dataSourceConfig[0];
        // // COMPLETE FORM WITH DATA AND CONFIG

        this.form = new FormGroup<any>({
            name: new FormControl<string>(this.editItem?.name, Validators.required),
            id: new FormControl<string>(this.editItem?.id),
            selectedDataSource: new FormControl<ConfigType>({value: this.selectedDataSource, disabled: this.editing}),
            description: new FormControl<string>(this.editItem?.description, Validators.required)
        });
        // ADD CONTROL TO FORM
        if (this.editing) {
            Object.keys(this.editItem.configSetting.settings).forEach(field => {
                this.configuration.push({name: field, nameShow: field.replace(/^\w/, (c) => c.toUpperCase())});
                this.form.addControl(field, this.formBuilder.control({
                    value: this.editItem.configSetting.settings[field],
                    disabled: field === 'type'
                }, Validators.required));
            });
        } else {
            this.form.get('selectedDataSource').value.properties.forEach(field => {
                this.configuration.push({name: field.name, nameShow: field.nameShow});
                this.form.addControl(field.name, this.formBuilder.control(field.defaultValue, Validators.required));
            });
        }

    }

    reconstruct() {
        if (this.form.get('selectedDataSource').value !== null) {
            this.configuration.forEach(controlName => {
                this.form.removeControl(controlName.name);
            });
            this.configuration = [];
            this.form.get('selectedDataSource').value.properties.forEach(field => {
                this.configuration.push({name: field.name, nameShow: field.nameShow});
                this.form.addControl(field.name, this.formBuilder.control(field.defaultValue, Validators.required));
            });
            this.selectedDataSource = this.form.get('selectedDataSource').value;
        }
    }

    saveOrEdit() {
        var settings = {};
        this.configuration.forEach(x => {
            settings[x.name] = this.form.get(x.name).value;
        });
        this.editing ? this.service.update({
            idBussiness: this.editItem.idBussiness,
            idBrand: this.brand.selectedEntity$().id,
            id: this.form.get('id').value,
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            type: this.form.get('selectedDataSource').value.type,
            configSetting: {
                idConfigType: this.form.get('selectedDataSource').value.id,
                settings: settings
            }
        }) : this.service.create({
            idBussiness: this.business.selectedEntity$().id,
            idBrand: this.brand.selectedEntity$().id,
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            type: this.form.get('selectedDataSource').value.type,
            configSetting: {
                idConfigType: this.form.get('selectedDataSource').value.id,
                settings: settings
            }
        });
    }

    delete() {
        this.confirmationService.confirm({
            message: this.translateService.instant('form_datasource.delete_confirmation') + '?',
            key: 'deleteDatasource',
            header: 'Confirm',
            target: event.target || new EventTarget,
            acceptLabel: this.translateService.instant('common.yes'),
            rejectLabel: this.translateService.instant('common.cancel'),
            icon: 'mdi mdi-alert-outline',
            acceptIcon: 'mdi mdi-check',
            rejectIcon: 'mdi mdi-close',
            rejectButtonStyleClass: 'p-button-outlined',
            accept: () => {
                this.service.delete(this.form.get('id').value);
            }
        });
    }

}
