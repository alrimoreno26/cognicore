import {Component, effect} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../datasource/configuration/service/configuration.service';
import {ConnectionsService} from '../datasource/connections/service/connections.service';
import {ConfigType, DatasourceTO} from '../datasource/configuration/models';
import {UserBussinessTO} from '../../auth/model';
import {BusinessService} from '../business/service/business.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/service/auth.service';
import {MessageServices} from '../../core/injects/message.services';
import {TranslateService} from '@ngx-translate/core';
import {BrandConfigurationsService} from '../brand/configuration/service/brand.configurations.service';
import {BrandServices} from '../brand/settings/service/brand.services';

@Component({
    templateUrl: './register.components.html',
    styleUrls: ['./register.components.scss']
})
export class RegisterComponents {

    userBusiness: UserBussinessTO;
    activeIndex: number = 0;
    brandIndex: number = 10;

    businessForm: FormGroup;
    brandForm: FormGroup;

    configCRM = false;
    dataSourceCRM: ConfigType[] = [];
    selectedCRM: ConfigType;
    formCRM: FormGroup;
    tempDatasourceCRM: DatasourceTO;
    haveConfigCRM = false;

    configCMS = false;
    dataSourceCMS: ConfigType[] = [];
    selectedCMS: ConfigType;
    formCMS: FormGroup;
    haveConfigCMS = false;

    createdBussiness = '';
    createdBrand = '';

    nameStep = '';

    ages: any[] = [];
    gender: any[] = [];
    context: any[] = [];

    facets: any[] = [];

    loadingBusiness: number = -1;
    loadingBrand: number = -1;
    loadingDatasource: number = -1;

    constructor(private configurations: ConfigurationService,
                private formBuilder: FormBuilder,
                private brandConfigurationService: BrandConfigurationsService,
                public brandService: BrandServices,
                private router: Router,
                public business: BusinessService,
                private sessionService: AuthService,
                private messageService: MessageServices,
                private translateService: TranslateService,
                public datasource: ConnectionsService) {

        this.configurations.loadForRegister();
        this.brandConfigurationService.loadAll({page: 0, limit: 200});

        this.ages = [];
        this.gender = [];
        this.context = [];
        this.facets = [];

        this.formCMS = this.formBuilder.group({});
        this.formCRM = this.formBuilder.group({});

        this.businessForm = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            description: new FormControl<string>('', Validators.required),
            color: new FormControl<string>('f0f0f0', Validators.required)
        });
        this.brandForm = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            description: new FormControl<string>('', Validators.required),
            age: new FormControl<string>('', Validators.required),
            gender: new FormControl<string>('', Validators.required),
            domain: new FormControl<string>('', Validators.required),
        });
        effect(() => {

            console.log(this.brandService.loaded$());
            if (this.brandConfigurationService.listEntities$().length > 0) {
                const config = this.brandConfigurationService.listEntities$();
                //AGE VALUES
                const tempAge = config.find(x => x.name === 'Age');
                this.ages = [];
                tempAge.properties[0].value[0].split(',').forEach(a => {
                    this.ages.push({
                        name: a,
                        key: 'age_' + a,
                        value: a
                    });
                });
                //GENDER VALUES
                const tempGender = config.find(x => x.name === 'Gender');
                this.gender = [];
                tempGender.properties[0].value[0].split(',').forEach(a => {
                    this.gender.push({
                        name: a,
                        key: 'gender_' + a,
                        value: a.toLowerCase()
                    });
                });
                //Context VALUES
                const tempContext = config.find(x => x.name === 'Context');
                this.context = [];
                tempContext.properties[0].value[0].split(',').forEach(a => {
                    this.context.push({
                        name: a,
                        key: 'domain_' + a,
                        value: a.toLowerCase()
                    });
                });
                const tempFacet = config.find(x => x.name === 'Facet');
                this.facets = [];
                tempFacet.properties.forEach(a => {
                    this.facets.push(JSON.parse(a.value[0]));
                });
                this.facets.sort((a, b) => a.order - b.order);
            }
        });
        effect(() => {
            this.userBusiness = {};
            this.dataSourceCRM = [];
            this.dataSourceCMS = [];
            this.configurations.listEntities$().forEach((data) => {
                data.type === 'CRM' ? this.dataSourceCRM.push(data) : this.dataSourceCMS.push(data);
            });

            if (this.business.businessRegisterStep$()) {
                if (this.activeIndex === 100 && this.loadingBusiness === -1) {
                    this.nameStep = this.getNameStep();
                    const facets = [];
                    this.loadingBrand = 0;
                    this.loadingBusiness = 1;
                    this.facets.forEach((x, i) => {
                        facets.push({order: i + 1, facet: x.facet, value: x.value});
                    });
                    setTimeout(() => {
                        const data = {
                            name: this.brandForm.get('name').value,
                            description: this.brandForm.get('description').value,
                            idBussiness: this.business.createdBussiness$(),
                            type: 'STATIC',
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
                        this.brandService.createFromOnboarding(data);
                    }, 500);
                }
            }
            if (this.brandService.createdBrandStep$() && this.loadingBrand === 0) {
                if (this.activeIndex === 100) {
                    this.createdBrand = this.brandService.createdBrand$();
                    this.loadingBrand = 1;
                    this.loadingDatasource = 0;
                    this.nameStep = this.getNameStep();
                    if (this.selectedCMS !== undefined) {
                        setTimeout(() => {
                            const datasourceCMS = {
                                idBussiness: this.business.createdBussiness$(),
                                idBrand: this.createdBrand,
                                name: this.selectedCMS.name,
                                description: this.selectedCMS.description,
                                type: this.selectedCMS.type,
                                configSetting: {
                                    idConfigType: this.selectedCMS.id,
                                    settings: {
                                        ...this.formCMS.value,
                                        type: this.formCMS.get('type').value
                                    }
                                }
                            };
                            this.datasource.createFromRegister(datasourceCMS);
                        }, 500);
                    } else {
                        if (this.tempDatasourceCRM !== undefined) {
                            this.tempDatasourceCRM.idBrand = this.createdBrand;
                            this.tempDatasourceCRM.idBussiness = this.business.createdBussiness$();

                            this.datasource.createFromRegister(this.tempDatasourceCRM);
                        }
                    }
                }
            }

            if (this.datasource.cmsRegister$()) {
                this.haveConfigCMS = true;
                if (this.tempDatasourceCRM !== undefined) {
                    this.tempDatasourceCRM.idBrand = this.createdBrand;
                    this.tempDatasourceCRM.idBussiness = this.business.createdBussiness$();

                    this.datasource.createFromRegister(this.tempDatasourceCRM);
                }
                if (this.haveConfigCMS && this.tempDatasourceCRM === undefined) {
                    this.loadingDatasource = 1;
                    this.nameStep = this.getNameStep();
                }
            }
            if (this.datasource.crmRegister$()) {
                this.haveConfigCRM = true;
                this.haveConfigCMS = true;
                this.loadingDatasource = 1;
                this.nameStep = this.getNameStep();
            }

            this.sessionService.userLogged$.subscribe(userLogged => {
                if (userLogged?.roles[0] === 'ADMIN_SYSTEM') {
                    this.router.navigate(['/chat']).then();
                } else {

                }
            });
        });

        this.nameStep = this.getNameStep();
    }

    nextRegisterStep(): void {
        switch (this.activeIndex) {
            case 0:
                this.nameStep = this.getNameStep();
                this.activeIndex += 1;
                break;
            case 1:
                this.nameStep = this.getNameStep();
                switch (this.brandIndex) {
                    case 9:
                        if (this.brandForm.get('name').value === '') {
                            this.messageService.addInfo(this.translateService.instant('You must complete the information'));
                            return;
                        }
                        this.brandIndex += 1;
                        break;
                    case 10:
                        this.brandIndex += 1;
                        break;
                    case 11:
                        this.activeIndex += 1;
                        break;
                }

                break;
            case 2:

                if (this.selectedCRM === undefined) {
                    this.messageService.addInfo(this.translateService.instant('You must selected a CRM'));
                    return;
                }
                this.tempDatasourceCRM = {
                    idBussiness: this.createdBussiness,
                    idBrand: this.createdBrand,
                    name: this.selectedCRM.name,
                    description: this.selectedCRM.description,
                    type: this.selectedCRM.type,
                    configSetting: {
                        idConfigType: this.selectedCRM.id,
                        settings: {
                            ...this.formCRM.value,
                            type: this.formCRM.get('type').value
                        }
                    }
                };
                this.activeIndex += 1;
                this.nameStep = this.getNameStep();
                //
                break;
            case 3:
                this.nameStep = this.getNameStep();
                if (this.selectedCMS === undefined) {
                    this.messageService.addInfo(this.translateService.instant('You must selected a CMS'));
                    return;
                }
                this.activeIndex = 100;
                setTimeout(() => {
                    this.business.create(this.businessForm.value);
                }, 1000);
                break;
        }
    }

    backRegisterStep(): void {
        switch (this.activeIndex) {
            case 1:
                this.nameStep = this.getNameStep();
                switch (this.brandIndex) {
                    case 11:
                        this.brandIndex -= 1;
                        return;
                }
                break;
            case 2:
                if (this.configCRM === false) {
                    this.activeIndex -= 1;
                    return;
                }
                this.selectedCRM = undefined;
                this.configCRM = false;
                return;
            case 3:
                if (this.configCMS === false) {
                    this.activeIndex -= 1;
                    return;
                }
                this.selectedCMS = undefined;
                this.configCMS = false;
                return;
        }
        this.nameStep = this.getNameStep();
        this.activeIndex -= 1;
    }

    omitStep() {
        switch (this.activeIndex) {
            case 2:
                this.activeIndex += 1;
                this.nameStep = this.getNameStep();
                break;
            case 3:
                if (this.tempDatasourceCRM !== undefined) {
                    this.activeIndex = 100;
                    this.nameStep = this.getNameStep();
                    setTimeout(() => {
                        this.business.create(this.businessForm.value);
                    }, 1000);

                }
        }
    }

    getNameStep() {
        switch (this.activeIndex) {
            case 1:
                return 'step_brand';
            case 2:
            case 3:
                return 'step_datasource';
            case 100:
                return 'step_final';
            default:
                return 'step_business';
        }
    }

    /**
     * Check if cant continue next step
     */
    checkState(): boolean {
        switch (this.activeIndex) {
            case 0:
                return this.businessForm.invalid;
            case 1:
                switch (this.brandIndex) {
                    case 10:
                        return this.brandForm.get('name').value === '' ||
                            this.brandForm.get('age').value === '' ||
                            this.brandForm.get('gender').value === '' ||
                            this.brandForm.get('domain').value === '';
                }
                return this.brandForm.get('name').value === '';
            case 2:
                return this.formCRM.invalid;
            case 3:
                return this.formCMS.invalid;
            default:
                return false;
        }
    }

    selectedConfigCMS() {
        this.configCMS = !this.configCMS;
        this.formCMS = this.formBuilder.group({});
        this.selectedCMS.properties.forEach(field => {
            this.formCMS.addControl(field.name, this.formBuilder.control({
                value: field.defaultValue,
                disabled: field.nameShow === 'Type'
            }, Validators.required));
        });
        console.log(this.formCMS.value);
    }

    selectedConfigCRM() {
        this.configCRM = !this.configCRM;

        this.formCRM = this.formBuilder.group({});
        this.selectedCRM.properties.forEach(field => {
            this.formCRM.addControl(field.name, this.formBuilder.control({
                value: field.defaultValue,
                disabled: field.nameShow === 'Type'
            }, Validators.required));
        });
        console.log(this.formCRM.value);
    }

    start(): void {
        this.router.navigate(['/']).then();
    }

}
