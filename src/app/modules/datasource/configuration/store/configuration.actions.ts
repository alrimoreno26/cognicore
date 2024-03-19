import {createAction, props} from '@ngrx/store';
import {LazyLoadData} from '../../../../standalone/data-table/models';

export enum EntityActionTypes {
    NoopAction = '[Configuration] NoopAction',
    OpenAddOrEdit = '[Configuration] Open Add Or Edit Dialog Configuration',
    LoadDataSourceList = '[Configuration] Load Configuration List',
    LoadDataSourceSuccess = '[Configuration] Load Configuration List Success',
    LoadDataSourceError = '[Configuration] Document Configuration Fail Request',
    AddConfiguration = '[Configuration] Add DataSource Config',
    AddConfigurationComplete = '[Configuration] Add DataSource Configuration Complete',
    EditConfiguration = '[Configuration] Edit DataSource Config',
    EditConfigurationComplete = '[Configuration] Edit DataSource Configuration Complete',
    DeleteConfiguration = '[Configuration] Delete DataSource Config',
    DeleteConfigurationComplete = '[Configuration] Delete DataSource Configuration Complete',
}

export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadConfigurationList = createAction(EntityActionTypes.LoadDataSourceList, props<{lazy: LazyLoadData}>());
export const loadDataSourceSuccess = createAction(EntityActionTypes.LoadDataSourceSuccess, props<{ data: any}>());
export const loadDataSourceError = createAction(EntityActionTypes.LoadDataSourceError, props<{ error: Error | any }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const addConfiguration = createAction(EntityActionTypes.AddConfiguration, props<{ data: any }>());
export const addConfigurationComplete = createAction(EntityActionTypes.AddConfigurationComplete, props<{ data: any }>());
export const editConfiguration = createAction(EntityActionTypes.EditConfiguration, props<{ data: any, id:any }>());
export const editConfigurationComplete = createAction(EntityActionTypes.EditConfigurationComplete, props<{ data: any }>());
export const deleteConfiguration = createAction(EntityActionTypes.DeleteConfiguration, props<{ id: any }>());
export const deleteConfigurationComplete = createAction(EntityActionTypes.DeleteConfigurationComplete);

export const fromDatasourceConfigurationsActions = {
    noopAction,
    loadConfigurationList,
    loadDataSourceSuccess,
    loadDataSourceError,
    openAddOrEdit,
    addConfiguration,
    addConfigurationComplete,
    editConfiguration,
    editConfigurationComplete,
    deleteConfiguration,
    deleteConfigurationComplete
}
