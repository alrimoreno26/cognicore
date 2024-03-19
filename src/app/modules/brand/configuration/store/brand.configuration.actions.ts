import {createAction, props} from '@ngrx/store';
import {LazyLoadData} from '../../../../standalone/data-table/models';

export enum EntityActionTypes {
    NoopAction = '[BrandConfiguration] NoopAction',
    OpenAddOrEdit = '[BrandConfiguration] Open Add Or Edit Dialog Brand',
    LoadBrandConfigurationList = '[BrandConfiguration] Load Brand List',
    LoadBrandConfigurationListSuccess = '[BrandConfiguration] Load Brand List Success',
    BrandConfigurationError = '[BrandConfiguration] Brand Fail Request',
    AddBrandConfiguration = '[BrandConfiguration] Add Brand Config',
    AddBrandConfigurationComplete = '[BrandConfiguration] Add Brand Brand Complete',
    EditBrandConfiguration = '[BrandConfiguration] Edit Brand Config',
    EditBrandConfigurationComplete = '[BrandConfiguration] Edit Brand Brand Complete',
    DeleteBrandConfiguration = '[BrandConfiguration] Delete Brand Config',
    DeleteBrandConfigurationComplete = '[BrandConfiguration] Delete Brand Configuration Complete',
}


export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadBrandConfigurationList = createAction(EntityActionTypes.LoadBrandConfigurationList, props<{lazy: LazyLoadData}>());
export const loadBrandConfigurationListSuccess = createAction(EntityActionTypes.LoadBrandConfigurationListSuccess, props<{ data: any}>());
export const brandConfigurationError = createAction(EntityActionTypes.BrandConfigurationError, props<{ error: Error | any }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const addBrandConfiguration = createAction(EntityActionTypes.AddBrandConfiguration, props<{ data: any }>());
export const addBrandConfigurationComplete = createAction(EntityActionTypes.AddBrandConfigurationComplete, props<{ data: any }>());
export const editBrandConfiguration = createAction(EntityActionTypes.EditBrandConfiguration, props<{ data: any, id:any }>());
export const editBrandConfigurationComplete = createAction(EntityActionTypes.EditBrandConfigurationComplete, props<{ data: any }>());
export const deleteBrandConfiguration = createAction(EntityActionTypes.DeleteBrandConfiguration, props<{ id: any }>());
export const deleteBrandConfigurationComplete = createAction(EntityActionTypes.DeleteBrandConfigurationComplete);

export const fromBrandConfigurationsActions = {
    loadBrandConfigurationList,
    loadBrandConfigurationListSuccess,
    brandConfigurationError,
    openAddOrEdit,
    addBrandConfigurationComplete,
    addBrandConfiguration,
    editBrandConfiguration,
    editBrandConfigurationComplete,
    deleteBrandConfiguration,
    deleteBrandConfigurationComplete
}
