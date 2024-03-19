import {Component, effect, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AppSidebarComponent} from '../sidebar/app.sidebar.component';
import {domainEnum, UserAuthenticated} from '../../../auth/model';
import {AuthService} from '../../../auth/service/auth.service';
import {BrandServices} from '../../../modules/brand/settings/service/brand.services';
import {BusinessService} from '../../../modules/business/service/business.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    userLogged?: UserAuthenticated;

    brandSelected: any = null;
    listBrand: any[] = [];

    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                private authService: AuthService,
                public business: BusinessService,
                public brandService: BrandServices) {
        this.authService.userLogged$.subscribe(userLogged => {
            this.userLogged = userLogged;
        });
        effect(() => {
            if (this.brandService.listEntities$().length > 0) {
                this.listBrand = this.brandService.listEntities$();
            }
            if (this.brandService.selectedEntity$() !== undefined) {
                this.brandSelected = this.brandService.selectedEntity$();
            }
        });
    }


    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showRightMenu();
    }

    onSearchClick() {
        this.layoutService.toggleSearchBar();
    }

    onRightMenuClick() {
        this.layoutService.showRightMenu();
    }

    get logo() {
        const logo = this.layoutService.config.menuTheme === 'white' || this.layoutService.config.menuTheme === 'orange' ? 'dark' : 'white';
        return logo;
    }

    logout() {
        this.authService.logout();
    }

    changeSelectedBrand() {
        this.brandService.setSelected(this.brandSelected);
    }

    changeBusiness() {
        this.business.setSelected(null);
        localStorage.clear();
    }

    adminUsers() {
        this.authService.adminUsers();
    }

    protected readonly domainEnum = domainEnum;
}
