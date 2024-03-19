import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {Injectable, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../../core/services/spinner.service';
import {datasourceConnectionsPartialState} from '../store/connections.reducers';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {fromDatasourceConnectionsActions} from '../store/connections.actions';
import {
    getAllDataSource,
    getTotalElements,
    selectedEntity,
    getDialog,
    selectEntityLoaded,
    selectedCrmRegister,
    selectedCmsRegister
} from '../store/connections.selectors';
import {BusinessService} from '../../../business/service/business.service';
import {BrandServices} from '../../../brand/settings/service/brand.services';

@Injectable({providedIn: 'platform'})
export class ConnectionsService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 50;

    cmsRegister$: Signal<boolean | false>;
    crmRegister$: Signal<boolean | false>;

    constructor(private store: Store<datasourceConnectionsPartialState>,
                private translateService: TranslateService,
                private business: BusinessService,
                private brandServices: BrandServices,
                public spinnerService: SpinnerService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllDataSource);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.total$ = this.store.selectSignal(getTotalElements);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.crmRegister$ = this.store.selectSignal(selectedCrmRegister);
        this.cmsRegister$ = this.store.selectSignal(selectedCmsRegister);
    }

    override loadAll(data: LazyLoadData) {
        this.store.dispatch(fromDatasourceConnectionsActions.loadConnectionsList({lazy: {...data}}));
        super.loadAll(data);
    }

    override create(data: any) {
        this.store.dispatch(fromDatasourceConnectionsActions.addConnections({data}));
    }

    override update(data: any) {
        const id = data.id;
        delete data['id'];
        this.store.dispatch(fromDatasourceConnectionsActions.editConnections({data: data, id}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromDatasourceConnectionsActions.openAddOrEdit());
    }

    override delete(id: number) {
        this.store.dispatch(fromDatasourceConnectionsActions.deleteConnections({
            id,
            businessId: this.business.selectedEntity$().id,
            brandId: this.brandServices.selectedEntity$().id
        }));
    }

    createFromRegister(data: any): void {
        this.store.dispatch(fromDatasourceConnectionsActions.addConnectionsRegister({data: data}));
    }

}
