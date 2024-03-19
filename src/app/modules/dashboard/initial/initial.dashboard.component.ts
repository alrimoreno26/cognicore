import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig, LayoutService } from 'src/app/layout/service/app.layout.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/service/auth.service';
import {ConnectionsService} from '../../datasource/connections/service/connections.service';


@Component({
    templateUrl: './initial.dashboard.component.html'
})
export class InitialDashboardComponent implements OnInit, OnDestroy {

    subscription!: Subscription;

    config!: AppConfig;

    isHoveredS = false;
    isHoveredB = false;
    isHoveredI = false;
    isHoveredC = false;

    userLogued:any;
    constructor(private layoutService: LayoutService,
                private router: Router,
                private sessionService: AuthService,
                private datasource: ConnectionsService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }

    ngOnInit(): void {
        this.sessionService.userLogged$.subscribe(user => {
            if (user) {
                this.userLogued = user;
                if (this.userLogued?.roles.find(r => r === 'ADMIN_SYSTEM')) {
                    this.router.navigate(['/initial']).then();
                }
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    goto(rute: string){
        if(rute === 'branding' && this.userLogued?.roles.indexOf("ADMIN_SYSTEM") !== 1){
            this.router.navigate(['/brand/new']).then();
        }
        if(rute === 'datasource' && this.userLogued?.roles.indexOf("ADMIN_SYSTEM") !== 1){
            if(this.datasource.listEntities$().length < 2){
                this.router.navigate(['/datasource/connections']).then();
            } else{

                this.router.navigate(['/datasource/connections', {id: this.datasource.listEntities$()[0].id}]).then();
            }

        }
        if(rute === 'chat' && this.userLogued?.roles.indexOf("ADMIN_SYSTEM") !== 1){
            this.router.navigate(['/chat']).then();
        }
    }
}
