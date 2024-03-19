import {createAction, props} from '@ngrx/store';
import {ConnectionsLazyLoad} from '../../../../core/models/table.model';
import {ConnectionsTO} from '../models';

export enum EntityActionTypes {
    NoopAction = '[Connections] NoopAction',
    ConnectionsError = '[Connections] Connections Fail Request',
    OpenAddOrEdit = '[Connections] Open Add Or Edit Dialog Connections',
    LoadConnectionsList = '[Connections] Load Connections List',
    LoadConnectionsSuccess = '[Connections] Load Connections List Success',
    LoadConnectionsError = '[Connections] Document Connections Fail Request',
    AddConnections = '[Connections] Add Connections',
    AddConnectionsFromRegister = '[Connections] Add Connections From Register',
    AddConnectionsRegister = '[Connections] Add Connections from Register',
    AddConnectionsComplete = '[Connections] Add Connections Complete',
    EditConnections = '[Connections] Edit Connections',
    EditConnectionsComplete = '[Connections] Edit Connections Complete',
    DeleteConnections = '[Connections] Delete Connections',
    DeleteConnectionsComplete = '[Connections] Delete Connections Complete',
    AddConnectionsByBrand = '[Connections] Add Connections with Brand',
}

export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadConnectionsList = createAction(EntityActionTypes.LoadConnectionsList, props<{
    lazy: ConnectionsLazyLoad
}>());
export const loadConnectionsSuccess = createAction(EntityActionTypes.LoadConnectionsSuccess, props<{ data: any }>());
export const loadConnectionsError = createAction(EntityActionTypes.LoadConnectionsError, props<{ error: Error | any }>());
export const ConnectionsError = createAction(EntityActionTypes.ConnectionsError, props<{ error: Error | any }>());
export const addConnections = createAction(EntityActionTypes.AddConnections, props<{ data: ConnectionsTO }>());
export const addConnectionsFromRegister = createAction(EntityActionTypes.AddConnectionsFromRegister, props<{ data: ConnectionsTO }>());
export const addConnectionsRegister = createAction(EntityActionTypes.AddConnectionsRegister, props<{ data: ConnectionsTO }>());
export const addConnectionsComplete = createAction(EntityActionTypes.AddConnectionsComplete, props<{ data: any }>());
export const editConnections = createAction(EntityActionTypes.EditConnections, props<{ data: ConnectionsTO, id: any }>());
export const editConnectionsComplete = createAction(EntityActionTypes.EditConnectionsComplete);
export const deleteConnections = createAction(EntityActionTypes.DeleteConnections, props<{ id: any, businessId: string, brandId: string }>());
export const deleteConnectionsComplete = createAction(EntityActionTypes.DeleteConnectionsComplete, props<{ id: any }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const addConnectionsByBrand = createAction(EntityActionTypes.AddConnectionsByBrand, props<{ data: ConnectionsTO, id: any }>());
export const fromDatasourceConnectionsActions = {
    noopAction,
    loadConnectionsList,
    loadConnectionsSuccess,
    loadConnectionsError,
    addConnections,
    addConnectionsFromRegister,
    addConnectionsRegister,
    addConnectionsComplete,
    editConnections,
    editConnectionsComplete,
    deleteConnections,
    deleteConnectionsComplete,
    ConnectionsError,
    openAddOrEdit,
    addConnectionsByBrand
};
