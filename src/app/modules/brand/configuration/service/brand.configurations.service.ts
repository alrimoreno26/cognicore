import {Injectable} from '@angular/core';
import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../../core/services/spinner.service';
import {BrandConfigurationPartialState} from '../store/brand.configuration.reducers';
import {getAllBrandConfig, selectedEntity, getTotalElements, getDialog, selectEntityLoaded} from '../store/brand.configuration.selectors';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {fromBrandConfigurationsActions} from '../store/brand.configuration.actions';

@Injectable({providedIn: 'platform'})
export class BrandConfigurationsService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 50;

    constructor(private store: Store<BrandConfigurationPartialState>,
                private translateService: TranslateService,
                public spinnerService: SpinnerService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllBrandConfig);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.total$ = this.store.selectSignal(getTotalElements);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
    }

    override loadAll(data: LazyLoadData) {
        this.store.dispatch(fromBrandConfigurationsActions.loadBrandConfigurationList({lazy: {...data}}));
        super.loadAll(data);
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromBrandConfigurationsActions.openAddOrEdit());
    }

    override create(data: any) {
        this.store.dispatch(fromBrandConfigurationsActions.addBrandConfiguration({data}));
    }

    override update(data: any) {
        const id = data.id;
        delete data['id'];
        this.store.dispatch(fromBrandConfigurationsActions.editBrandConfiguration({data: data, id}));
    }

    override delete(id: number) {
        this.store.dispatch(fromBrandConfigurationsActions.deleteBrandConfiguration({id}));
    }
}
