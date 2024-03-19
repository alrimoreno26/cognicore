import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from './config/app.config.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppBreadcrumbComponent } from './component/breadcrumb/app.breadcrumb.component';
import { AppSidebarComponent } from './component/sidebar/app.sidebar.component';
import { AppTopbarComponent } from './component/topbar/app.topbar.component';
import { AppRightMenuComponent } from './component/menu/app.rightmenu.component';
import { AppMenuComponent } from './component/menu/app.menu.component';
import { AppMenuitemComponent } from './component/menu/app.menuitem.component';
import { AppSearchComponent } from './component/searchbar/app.search.component';
import { AppFooterComponent } from './component/footer/app.footer.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {BlockUIModule} from 'primeng/blockui';
import {LottieComponent} from 'ngx-lottie';
import {AppLayoutRoutingModule} from './app.layout-routing.module';
import {StoreModule} from '@ngrx/store';
import {datasource_connections} from '../modules/datasource/connections/store/connections.reducers';
import {businessReducer} from '../modules/business/store/business.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BusinessEffects} from '../modules/business/store/business.effects';
import {CommonModule} from '@angular/common';
import {BusinessService} from '../modules/business/service/business.service';
import {ConnectionsService} from '../modules/datasource/connections/service/connections.service';
import {BusinessModule} from '../modules/business/business.module';
import {BrandServices} from '../modules/brand/settings/service/brand.services';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MessageServices} from '../core/injects/message.services';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppRightMenuComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppSearchComponent,
        AppFooterComponent,
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppLayoutRoutingModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        TooltipModule,
        RippleModule,
        MenuModule,
        RouterModule,
        DropdownModule,
        DividerModule,
        AppConfigModule,
        DialogModule,
        StyleClassModule,
        BlockUIModule,
        LottieComponent,
        StoreModule.forFeature('business', businessReducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([BusinessEffects]),
        StoreModule.forFeature('datasource_connections', datasource_connections),
        BusinessModule,
        ConfirmDialogModule,
    ],
    providers:[
        BusinessService,
        ConnectionsService,
        BrandServices,
        ConfirmationService,
        MessageServices
    ]
})
export class AppLayoutModule { }
