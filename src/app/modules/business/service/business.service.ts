import {AllBusinessTO, BusinessTO} from '../models';
import {BaseStoreServices} from '../../../standalone/data-table/class/base.store.services';
import {Injectable, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {BusinessPartialState} from '../store/business.reducers';
import {
    createdBussiness, error, getAllBusiness,
    listElements,
    selectEntity,
    selectEntityLoaded,
    selectRegisterState,
    showOrHideDialog
} from '../store/business.selectors';
import {fromBusinessActions} from '../store/business.actions';
import {WorkspaceTO} from '../../workspace/models';
import {BehaviorSubject} from 'rxjs';
import {v4 as uuid} from 'uuid';

@Injectable({providedIn: 'platform'})
export class BusinessService extends BaseStoreServices<AllBusinessTO> {

    override serverSide = false;
    override lazyLoadOnInit = false;

    businessRegisterStep$: Signal<boolean | false>;
    createdBussiness$: Signal<string>;
    error$: Signal<any>;
    listElements$: Signal<BusinessTO[]>;
    loadedBusiness$ = new BehaviorSubject<boolean>(false);

    constructor(private store: Store<BusinessPartialState>) {
        super();
        this.initState();
    }

    override initState(): void {
        this.listEntities$ = this.store.selectSignal(getAllBusiness);
        this.listElements$ = this.store.selectSignal(listElements);
        this.dialog$ = this.store.selectSignal(showOrHideDialog);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.selectedEntity$ = this.store.selectSignal(selectEntity);
        this.businessRegisterStep$ = this.store.selectSignal(selectRegisterState);
        this.createdBussiness$ = this.store.selectSignal(createdBussiness);
        this.error$ = this.store.selectSignal(error);
    }

    loadBusiness() {
        this.store.dispatch(fromBusinessActions.loadBusiness());
    }

    override create(data: any): void {
        this.store.dispatch(fromBusinessActions.addBusiness({data: data}));
    }

    override delete(id: string) {
        this.store.dispatch(fromBusinessActions.deleteBusiness({id}));
    }

    override setSelected(data: BusinessTO): void {
        this.store.dispatch(fromBusinessActions.setSelected({entity: data}));
        this.store.dispatch(fromBusinessActions.loadInitialData({entity: data}));
    }

    setWorkspace(workspace: WorkspaceTO): void {
        this.store.dispatch(fromBusinessActions.setSelectedWorkspace({entity: workspace}));
    }

    get loadedBusiness(): any {
        return this.loadedBusiness$.getValue();
    }

    setLoadedBusiness$(status: boolean): void {
        this.loadedBusiness$.next(status);

    }


    updateSelectedFromStorage() {
        this.store.dispatch(fromBusinessActions.loadInitialData({entity: this.selectedEntity$()}));
    }


}
