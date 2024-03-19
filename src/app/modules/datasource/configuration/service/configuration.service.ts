import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {Injectable} from '@angular/core';
import {DatasourceConfigurationPartialState} from '../store/configuration.reducers';
import { Store} from '@ngrx/store';
import {getAllDataSourceConfig, getDialog, getTotalElements, selectedEntity, selectEntityLoaded} from '../store/configuration.selectors';
import {fromDatasourceConfigurationsActions} from '../store/configuration.actions';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../../core/services/spinner.service';

@Injectable({providedIn: 'platform'})
export class ConfigurationService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 50;

    constructor(private store: Store<DatasourceConfigurationPartialState>, private translateService: TranslateService,public spinnerService: SpinnerService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllDataSourceConfig);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.total$ = this.store.selectSignal(getTotalElements);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
    }

    override loadAll(data: LazyLoadData) {
        this.store.dispatch(fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {...data}}));
        super.loadAll(data);
    }

    loadForRegister(){
        this.store.dispatch(fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 100}}))
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromDatasourceConfigurationsActions.openAddOrEdit());
    }

    override create(data: any) {
        this.store.dispatch(fromDatasourceConfigurationsActions.addConfiguration({data}))
    }

    override update(data: any) {
        const id = data.id;
        delete data['id'];
        this.store.dispatch(fromDatasourceConfigurationsActions.editConfiguration({data: data, id}))
    }

    override delete(id: number) {
        this.store.dispatch(fromDatasourceConfigurationsActions.deleteConfiguration({id}))
    }
}
