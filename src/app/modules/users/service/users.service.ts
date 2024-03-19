import {Injectable} from '@angular/core';
import {BaseStoreServices} from '../../../standalone/data-table/class/base.store.services';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../core/services/spinner.service';
import {UsersPartialState} from '../store/users.reducers';
import {fromUsersActions} from '../store/users.actions';
import {BusinessService} from '../../business/service/business.service';
import {getAllUsers, getDialog, selectEntityLoaded} from '../store/users.selectors';

@Injectable({providedIn: 'platform'})
export class UsersService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 50;

    constructor(private store: Store<UsersPartialState>,
                private translateService: TranslateService,
                private business: BusinessService,
                public spinnerService: SpinnerService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllUsers);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
    }

    findAllAnalysts() {
        this.store.dispatch(fromUsersActions.loadUsersList({id: this.business.selectedEntity$().id}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromUsersActions.openAddOrEdit());
    }
    override create(data: any) {
        this.store.dispatch(fromUsersActions.addUsers({data}));
    }

    override update(data: any) {
        this.store.dispatch(fromUsersActions.editUsers({data: data}));
    }

    override delete(id: any) {
        const users = this.listEntities$().filter(x=>x.id !== id).map(obj => obj.name).join(',');
        const data = {
            id: this.business.selectedEntity$().id,
            user: users.split(',')
        }
        this.store.dispatch(fromUsersActions.editUsers({data: data}));
    }
}
