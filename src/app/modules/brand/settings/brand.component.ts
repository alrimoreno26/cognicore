import {Component, effect, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {BrandConfigurationsService} from '../configuration/service/brand.configurations.service';
import {BrandServices} from './service/brand.services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectionsModalComponents} from '../../datasource/connections/components/connections-modal/connections-modal.components';
import {MessageServices} from '../../../core/injects/message.services';
import {TranslateService} from '@ngx-translate/core';
import {BusinessService} from '../../business/service/business.service';
import {TypeBrand} from '../models/brand.models';
import {optionsCustomization, optionsExternalData, optionsFilters} from '../../chat/model';
import {Options} from '../../../core/models/table.model';

@Component({
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent extends BaseComponentDirective implements OnInit, OnDestroy {

    brand_name = '';
    id = '';
    edit: boolean;
    active_dropdown = false;
    brandForm: FormGroup;

    @ViewChild(ConnectionsModalComponents) modalComponent: ConnectionsModalComponents;

    /// ESTO DEBE CONSTRUIRSE DYNAMICAMENTE PARA LOS CONTEXTO
    selectedContext: any = null;
    context: any[] = [];
    /// ESTO DEBE CONSTRUIRSE DYNAMICAMENTE PARA LOS AGE
    selectedAge: any = null;
    ages: any[] = [];
    /// ESTO DEBE CONSTRUIRSE DYNAMICAMENTE PARA LOS SEX
    selectedGender: any = null;
    gender: any[] = [];
    /// ESTO DEBE CONSTRUIRSE DYNAMICAMENTE PARA LOS FACETS
    facets: any[] = [];
    validFacet: boolean;

    selectedResonance!: Options[];
    selectedExternal!: Options[];
    selectedFilters!: Options[];
    checked: boolean;
    switchStyles: any = {
        transform: 'scale(0.7)'
    };

    constructor(public brandConfigurationService: BrandConfigurationsService,
                private service: BrandServices,
                private business: BusinessService,
                private messageService: MessageServices,
                private translateService: TranslateService,
                public router: Router,
                public route: ActivatedRoute) {
        super();
        this.brandConfigurationService.loadAll({page: 0, limit: 25});
        this.brandForm = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            description: new FormControl<string>(''),
            age: new FormControl<string>('', Validators.required),
            gender: new FormControl<string>('', Validators.required),
            domain: new FormControl<string>('', Validators.required),
        });

        effect(() => {
            if (this.service.createdBrandStep$() === true) {
                this.messageService.addSuccess(this.translateService.instant('Brand create successfull'));
                this.initBrandForm();
                this.service.loadInitialDataBrand(this.business.selectedEntity$().id)
            }
            if (this.brandConfigurationService.listEntities$().length > 0 && this.brandConfigurationService.loaded$()) {
                this.context = [];
                this.ages = [];
                this.gender = [];
                this.facets = [];
                const config = this.brandConfigurationService.listEntities$();
                //AGE VALUES
                const tempAge = config.find(x => x.name === 'Age');
                tempAge.properties[0].value[0].split(',').forEach(a => {
                    this.ages.push({
                        name: a,
                        key: 'age_' + a,
                        value: a
                    });
                });
                //GENDER VALUES
                const tempGender = config.find(x => x.name === 'Gender');
                tempGender.properties[0].value[0].split(',').forEach(a => {
                    this.gender.push({
                        name: a,
                        key: 'gender_' + a,
                        value: a.toLowerCase()
                    });
                });
                //Context VALUES
                const tempContext = config.find(x => x.name === 'Context');
                tempContext.properties[0].value[0].split(',').forEach(a => {
                    this.context.push({
                        name: a,
                        key: 'domain_' + a,
                        value: a.toLowerCase()
                    });
                });
                //facet VALUES
                const tempFacet = config.find(x => x.name === 'Facet');
                tempFacet.properties.forEach(a => {
                    this.facets.push(JSON.parse(a.value[0]));
                });
                this.facets.sort((a, b) => a.order - b.order);
            }
            if (this.service.selectedEntity$() !== undefined) {
                this.initForm();
            }
        });
        this.route.params.subscribe(params => {
            if (params['id'] !== undefined && params['id'] !== '') {
                this.id = params['id'];
                this.service.setSelected(this.service.listEntities$().find(x => x.id === this.id));
            }
        });
        this.initForm();
    }

    ngOnInit() {
        console.log(this.router.routerState.snapshot.url.includes('edit'));
        if (this.router.routerState.snapshot.url.includes('edit')) {
            this.edit = true;
            this.initForm();
        }
    }

    initForm() {
        if (this.service.selectedEntity$() && this.edit) {
            if(this.id !== ''){
                this.service.setSelected(this.service.listEntities$().find(x => x.id === this.id));
            }
            const selectedBrand = this.service.selectedEntity$();
            this.active_dropdown = true;
            this.brand_name = selectedBrand.name;
            this.brandForm.get('age').setValue(selectedBrand.configSetting.settings.age);
            this.brandForm.get('name').setValue(this.brand_name);
            this.brandForm.get('domain').setValue(selectedBrand.configSetting.settings.domain);
            this.brandForm.get('gender').setValue(selectedBrand.configSetting.settings.gender);
            this.facets = JSON.parse(selectedBrand.configSetting.settings.facet);
        }
    }

    sendMessage() {
        if(this.brand_name !== ''){
            this.active_dropdown = true;
            this.brandForm.get('name').setValue(this.brand_name);
        }
    }

    ngOnDestroy(): void {
      this.initBrandForm();
    }

    initBrandForm(){
        this.brandForm = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            age: new FormControl<string>('', Validators.required),
            gender: new FormControl<string>('', Validators.required),
            domain: new FormControl<string>('', Validators.required),
        });
        this.active_dropdown = false;
        this.brand_name = '';
        this.context = [];
        this.ages = [];
        this.gender = [];
        this.facets = [];
    }
    saveBrand() {
        const facets = [];
        this.facets.forEach((x, i) => {
            facets.push({order: i + 1, facet: x.facet, value: x.value});
        });
        const brand = {
            name: this.brandForm.get('name').value,
            description: this.brandForm.get('description').value,
            idBussiness: this.business.selectedEntity$().id,
            type: TypeBrand.STATIC,
            configSetting: {
                settings: {
                    gender: this.brandForm.get('gender').value,
                    age: this.brandForm.get('age').value,
                    domain: this.brandForm.get('domain').value,
                    facets: facets[0].facet,
                    facet: JSON.stringify(facets)
                }
            }
        };
        if (this.edit) {
            if (this.brandForm.invalid) {
                this.messageService.addInfo(this.translateService.instant('You must complete the information'));
                return;
            } else {
                this.service.updateBrand(brand, this.service.selectedEntity$().id);
            }
        } else {
            if (this.brandForm.invalid && this.modalComponent.getFormDataValid()) {
                this.messageService.addInfo(this.translateService.instant('You must complete the information'));
                return;
            } else {
                var settings = {};
                this.modalComponent.getConfigurationData().forEach(x => {
                    settings[x.name] = this.modalComponent.getFormData().name;
                });
                const datasource = {
                    idBussiness: this.business.selectedEntity$().id,
                    idBrand: '',
                    name: this.modalComponent.getFormData().name,
                    description: this.modalComponent.getFormData().description,
                    type: this.modalComponent.getFormData().selectedDataSource.type,
                    configSetting: {
                        idConfigType: this.modalComponent.getFormData().selectedDataSource.id,
                        settings: settings
                    }
                };
                this.service.createNewBrand(brand, datasource);
            }
        }
    }

    validAccordion(state): string {
        switch (state) {
            case 'basic':
                return (this.brandForm.get('domain').value === '') ? 'invalid' : 'active';
            case 'demographics':
                return (this.brandForm.get('age').value === '' && this.brandForm.get('gender').value === '') ? 'invalid' : 'active';
            case 'facet':
                return this.validFacet === true ? 'active' : 'invalid';
            default:
                return 'invalid';
        }
    }

    openAcocordion(event){
        if(event.index === 2){
            this.validFacet = true;
        }
    }

    protected readonly optionsFilters = optionsFilters;
    protected readonly optionsCustomization = optionsCustomization;
    protected readonly optionsExternalData = optionsExternalData;
    protected readonly event = event;
}
