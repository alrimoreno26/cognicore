import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponents} from './users.components';
import {UsersRoutingModule} from './users-routing.module';
import {DataTableModule} from '../../standalone/data-table/data-table.module';
import {PipesModule} from '../../core/pipes/pipes.module';
import {TagModule} from 'primeng/tag';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {users_reducer} from './store/users.reducers';
import {UsersEffects} from './store/users.effects';
import {UsersService} from './service/users.service';
import {AddEditUsersModalComponents} from './components/addEdit-modal/addEditUsers-modal.components';
import {InputTextModule} from 'primeng/inputtext';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UsersRoutingModule,
        DataTableModule,
        PipesModule,
        TagModule,
        StoreModule.forFeature('users', users_reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([UsersEffects]),
        InputTextModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
    ],
    declarations: [UsersComponents,AddEditUsersModalComponents],
    providers: [UsersService]
})

export class UsersModule {
}
