import {Injectable, Signal} from '@angular/core';
import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {brandPartialState} from '../store/brand.reducers';
import {getAllBrand, selectEntityLoaded, selectedEntity, getTotalElements, getDialog, createdBrand, created} from '../store/brand.selectors';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {fromBrandActions} from '../store/brand.actions';
import {BrandModels} from '../../models/brand.models';
import {datasourceConnectionsPartialState} from '../../../datasource/connections/store/connections.reducers';
import {fromDatasourceConnectionsActions} from '../../../datasource/connections/store/connections.actions';
import {BusinessService} from '../../../business/service/business.service';

@Injectable({providedIn: 'platform'})
export class BrandServices extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 50;

    createdBrand$: Signal<string>;
    createdBrandStep$: Signal<boolean | false>;

    constructor(private store: Store<brandPartialState>,
                private storeD: Store<datasourceConnectionsPartialState>,
                private business: BusinessService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllBrand);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.total$ = this.store.selectSignal(getTotalElements);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.createdBrand$ = this.store.selectSignal(createdBrand);
        this.createdBrandStep$ = this.store.selectSignal(created);
    }

    override loadAll(data: LazyLoadData) {
        this.store.dispatch(fromBrandActions.loadBrandList({lazy: {...data}}));
    }

    override create(data: any) {
        this.store.dispatch(fromBrandActions.addBrand(data));
    }

    createFromOnboarding(data: any) {
        this.store.dispatch(fromBrandActions.addBrandFromOnboarding(data));
    }

    override setSelected(data: any) {
        this.store.dispatch(fromBrandActions.selectedBrand({entity: data}));
        this.storeD.dispatch(fromDatasourceConnectionsActions.loadConnectionsList({lazy: {
            offset: 0, limit: 25, idbussiness: this.business.selectedEntity$().id, idbrand: data.id}}));
    }

    override delete(id: string) {
        this.store.dispatch(fromBrandActions.deleteBrand({id, businessId: this.business.selectedEntity$().id}))
    }

    loadInitialDataBrand(id: string) {
        this.store.dispatch(fromBrandActions.loadInitialDataBrand({entity: id}));
    }

    createNewBrand(brand: BrandModels, datasource: any) {
        this.store.dispatch(fromBrandActions.createBrandFromBusiness({brand, datasource}));
    }

    updateBrand(data: any, id: any) {
        this.store.dispatch(fromBrandActions.editBrand({data, id}));
    }
}
