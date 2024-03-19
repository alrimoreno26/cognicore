import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {TranslateModule} from '@ngx-translate/core';
import {BusinessService} from './service/business.service';
import {businessReducer} from './store/business.reducers';
import {BusinessEffects} from './store/business.effects';
import {datasource_connections} from '../datasource/connections/store/connections.reducers';
import {DatasourceConnectionsEffects} from '../datasource/connections/store/connections.effects';
import {DialogSelectBussinessComponent} from './components/dialog-select-bussiness.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {SkeletonModule} from 'primeng/skeleton';
import {AvatarModule} from 'primeng/avatar';
import {brandReducers} from '../brand/settings/store/brand.reducers';
import {BrandEffects} from '../brand/settings/store/brand.effects';
import {PipesModule} from '../../core/pipes/pipes.module';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DividerModule} from 'primeng/divider';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('business', businessReducer),
        StoreModule.forFeature('datasource_connections', datasource_connections),
        StoreModule.forFeature('brand', brandReducers),
        EffectsModule.forFeature([BusinessEffects, BrandEffects, DatasourceConnectionsEffects]),
        StoreDevtoolsModule.instrument({}),
        TranslateModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        DialogModule,
        SkeletonModule,
        AvatarModule,
        PipesModule,
        TooltipModule,
        ConfirmDialogModule,
        DividerModule,

    ],
    declarations: [DialogSelectBussinessComponent],
    exports: [
        DialogSelectBussinessComponent
    ],
    providers: [BusinessService]
})
export class BusinessModule {
}
