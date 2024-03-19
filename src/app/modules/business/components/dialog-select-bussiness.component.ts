import {Component, effect, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllBusinessTO, BusinessTO} from '../models';
import {BusinessService} from '../service/business.service';
import {NavigationExtras, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WorkspaceTO} from '../../workspace/models';
import {AuthService} from '../../../auth/service/auth.service';
import {BrandServices} from '../../brand/settings/service/brand.services';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
    selector: 'd-dialog-select-bussiness',
    templateUrl: './dialog-select-bussiness.component.html',
    styleUrls: ['./dialog-select-bussiness.component.scss']
})
export class DialogSelectBussinessComponent implements OnInit {

    nameDialog = 'Business Selection';
    btnDialog = 'Create New Project';
    selectedBusiness: BusinessTO;
    userLogged: any;
    @Input() showDialog: boolean = false;


    listBusiness: AllBusinessTO = {owner: [], analysts: []};

    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
    skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    showListBusiness = false;
    showCreateWorkspace = false;

    formAddWorkspace = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });

    timeouts: any[] = [];
    space: WorkspaceTO;

    constructor(public businessService: BusinessService,
                private confirmationService: ConfirmationService,
                private brandService: BrandServices,
                private translateService: TranslateService,
                private oauthService: OAuthService,
                private authService: AuthService,
                private router: Router) {
        this.initEffects();
    }

    initEffects() {
        effect(() => {
            this.listBusiness.owner = [];
            this.listBusiness.analysts = [];
            const temp = this.businessService.listEntities$();
            if (temp.length > 0) {
                this.listBusiness.owner = temp.find(x => x.owner.length > 0).owner;
                this.listBusiness.analysts = temp.find(x => x.owner.length > 0).analysts.map(a => {
                    return {...a, analyst: true};
                });
            }
            //this.listBusiness = this.businessService.listEntities$();

            if (this.businessService.selectedEntity$() !== null) {
            }
        });
        this.authService.userLogged$.subscribe(userLogged => {
            this.userLogged = userLogged;
            if (userLogged?.roles.find(x => x === 'ADMIN_SYSTEM')) {
                this.closeDialog.emit(true);
            }
        });
    }

    ngOnInit(): void {

    }

    selectBusiness($event: any, selected: BusinessTO): void {
        $event.stopPropagation();
        this.authService.removeRoleAnalyst$(this.userLogged);
        this.selectedBusiness = selected;
        this.businessService.setSelected(this.selectedBusiness);
        localStorage.setItem('selectedBusiness', JSON.stringify(this.selectedBusiness));
        this.brandService.loadInitialDataBrand(this.selectedBusiness.id);
        this.closeDialog.emit(true);

    }

    selectBusinessAnalyst($event: any, selected: BusinessTO): void {
        $event.stopPropagation();
        this.authService.setRoleAnalyst$(this.userLogged);
        this.selectedBusiness = selected;
        this.businessService.setSelected(this.selectedBusiness);
        localStorage.setItem('selectedBusiness', JSON.stringify(this.selectedBusiness));
        this.brandService.loadInitialDataBrand(this.selectedBusiness.id);
        this.closeDialog.emit(true);

    }

    applyWorkspace(selected: WorkspaceTO) {
        this.businessService.setSelected(this.selectedBusiness);
        this.businessService.setWorkspace(selected);
        this.updateParamsFromUrl(this.selectedBusiness.id, selected.id);
        this.closeDialog.emit(true);
    }

    updateParamsFromUrl(business: string, workspace: string) {
        let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'merge',
            queryParams: {}
        };
        navigationExtras.queryParams = {business: business, workspace: workspace};
        this.router.navigate([], navigationExtras);
    }

    goBack(): void {
        this.authService.logout();
    }

    createWorkspace() {
        this.nameDialog = 'Creating New Workspace';
        this.showCreateWorkspace = true;
    }

    addNewBusiness() {
        this.router.navigate(['/onboarding']);
    }

    deleteBusiness(event: Event, id: string) {
        event.stopPropagation();
        this.confirmationService.confirm({
            message: this.translateService.instant('form_datasource.delete_confirmation') + '?',
            key: 'deleteElement',
            header: 'Confirm',
            target: event.target || new EventTarget,
            acceptLabel: this.translateService.instant('common.yes'),
            rejectLabel: this.translateService.instant('common.cancel'),
            icon: 'mdi mdi-alert-outline',
            acceptIcon: 'mdi mdi-check',
            rejectIcon: 'mdi mdi-close',
            rejectButtonStyleClass: 'p-button-outlined',
            accept: () => {
                this.businessService.delete(id);
            }
        });


    }
}
