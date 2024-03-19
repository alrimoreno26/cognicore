import {effect, OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {domainEnum} from '../../../auth/model';
import {AuthService} from '../../../auth/service/auth.service';
import {flatMap} from 'lodash';
import {ConnectionsService} from '../../../modules/datasource/connections/service/connections.service';
import {BrandServices} from '../../../modules/brand/settings/service/brand.services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    menuList: any[] = [];

    userLogued: any;

    constructor(private sessionService: AuthService,
                public datasource: ConnectionsService,
                public brand: BrandServices,
                private router: Router) {
        this.updateSubscribers();

    }

    ngOnInit() {

    }

    updateSubscribers() {
        this.sessionService.userLogged$.subscribe(user => {
            if (user) {
                this.userLogued = user;
            }
        });
        effect(() => {
            if (this.userLogued !== undefined) {
                if(this.userLogued.roles.find(x => x === 'ANALYST')){
                    this.model.push(
                        {
                            label: 'Chat AI/UX',
                            icon: 'pi pi-fw pi-comments',
                            data: {showDelete: false, parent: true},
                            roles: [domainEnum.ADMIN_BUSSINES, domainEnum.ANALYST],
                            routerLink: ['/chat'],
                            visible: true,
                            command: () => {
                                this.router.navigate(['/chat']).then();
                            }
                        },
                    );
                }else{
                    this.model = [
                        {
                            label: 'Datasource',
                            icon: 'pi pi-database',
                            data: {showDelete: false, parent: true},
                            roles: [domainEnum.ADMIN_SYSTEM],
                            items: []
                        },
                        {separator: true},
                        {
                            label: 'Brand',
                            icon: 'pi pi-star',
                            data: {showDelete: false, parent: true},
                            roles: [domainEnum.ADMIN_SYSTEM, domainEnum.ADMIN_BUSSINES, domainEnum.ANALYST],
                            routerLink: ['/chat'],
                            items: []
                        },
                    ];
                    if (this.userLogued?.roles.find(x => x === 'ADMIN_SYSTEM')) {
                        this.model.find(x => x.label === 'Datasource').items.push({
                            label: 'Configuration',
                            icon: 'pi pi-cog',
                            data: {showDelete: false, parent: true},
                            routerLink: ['/datasource/configuration'],
                            roles: [domainEnum.ADMIN_SYSTEM],
                            command: () => {
                                this.router.navigate(['/datasource/configuration']).then();
                            }
                        });
                        this.model.find(x => x.label === 'Brand').items.push({
                            label: 'Configuration',
                            icon: 'pi pi-cog',
                            data: {showDelete: false, parent: true},
                            routerLink: ['/brand/configuration'],
                            roles: [domainEnum.ADMIN_SYSTEM],
                            command: () => {
                                this.router.navigate(['/brand/configuration']).then();
                            }
                        });
                    } else {
                        this.model.push(
                            {separator: true},
                            {
                                label: 'Chat AI/UX',
                                icon: 'pi pi-fw pi-comments',
                                data: {showDelete: false, parent: true},
                                roles: [domainEnum.ADMIN_BUSSINES, domainEnum.ANALYST],
                                routerLink: ['/chat'],
                                visible: true,
                                command: () => {
                                    this.router.navigate(['/chat']).then();
                                }

                            },
                        );
                    }
                    if (this.datasource.listEntities$().length > 0 && this.userLogued?.roles.indexOf('ADMIN_SYSTEM') !== 1) {
                        this.datasource.listEntities$().forEach(menu => {
                            this.model.find(x => x.label === 'Datasource').items.push({
                                label: menu.name,
                                icon: 'pi pi-database',
                                data: {
                                    name: menu.name + '-' + menu.type,
                                    showDelete: true,
                                    parent: false,
                                    id: menu.id,
                                    type: 'DATASOURCE'
                                },
                                routerLink: ['/datasource/connections', menu.id],
                                roles: [domainEnum.ADMIN_BUSSINES],
                            });
                        });
                        if (this.datasource.listEntities$().length < 2 && this.userLogued?.roles.indexOf('ADMIN_SYSTEM') !== 1) {
                            this.model.find(x => x.label === 'Datasource').items.push({
                                label: 'Datasource Management',
                                icon: 'pi pi-plus-circle',
                                data: {showDelete: false, parent: true},
                                routerLink: ['/datasource/connections'],
                                roles: [domainEnum.ADMIN_BUSSINES],
                                command: () => {
                                    this.router.navigate(['/datasource/connections']).then();
                                }
                            });
                        }
                    }
                    if (this.datasource.listEntities$().length === 0 && this.userLogued?.roles.indexOf('ADMIN_SYSTEM') !== 1) {
                        this.model.find(x => x.label === 'Datasource').items.push({
                            label: 'Datasource Management',
                            icon: 'pi pi-plus-circle',
                            data: {showDelete: false, parent: true},
                            routerLink: ['/datasource/connections'],
                            roles: [domainEnum.ADMIN_BUSSINES],
                            command: () => {
                                this.router.navigate(['/datasource/connections']).then();
                            }
                        });
                    }
                    if (this.brand.listEntities$().length > 0 && this.userLogued?.roles.indexOf('ADMIN_SYSTEM') !== 1) {
                        this.brand.listEntities$().forEach(menu => {
                            this.model.find(x => x.label === 'Brand').items.push({
                                label: menu.name,
                                icon: 'pi pi-star',
                                data: {
                                    name: menu.name,
                                    showDelete: true,
                                    parent: false,
                                    id: menu.id,
                                    type: 'BRAND'
                                },
                                routerLink: ['/brand/edit', menu.id],
                                roles: [domainEnum.ADMIN_BUSSINES],
                            });
                        });
                    }
                    if (this.userLogued?.roles.indexOf('ADMIN_SYSTEM') !== 1) {
                        this.model.find(x => x.label === 'Brand').items.push({
                            label: 'New Brand',
                            icon: 'pi pi-plus-circle',
                            data: {showDelete: false, parent: true},
                            routerLink: ['/brand/new'],
                            roles: [domainEnum.ADMIN_BUSSINES],
                            command: () => {
                                this.router.navigate(['/brand/new']).then();
                            }
                        });
                    }
                }




                this.generateMenu();
            }
        });

    }

    generateMenu(): void {
        this.menuList = [];
        const authorities: Array<string> = this.sessionService.userLogged.roles;
        this.model.forEach((m: any) => {
            const hasMenuAccess = this.menuAccess(m.roles);
            const children: any[] = [];
            if (hasMenuAccess && m?.items?.length) {
                m.items.forEach(i => {
                    if (flatMap(i.roles.map(r => authorities.filter(f => f === r)))?.length > 0) {
                        children.push(i);
                    }
                });
                if (children.length) {
                    this.menuList.push({...m, items: children});
                }
            } else if (hasMenuAccess) {
                this.menuList.push(m);
            }
        });
    }

    private menuAccess(roles: Array<any> = []): boolean {
        const authorities: Array<string> = this.sessionService.userLogged.roles;
        return roles[0] === domainEnum.ADMIN_SYSTEM ? true : flatMap(roles.map(r => authorities.filter(f => f === r)))?.length > 0;
    }
}
