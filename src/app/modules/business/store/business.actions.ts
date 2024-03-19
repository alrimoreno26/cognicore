import {createAction, props} from '@ngrx/store';
import {AllBusinessTO, BusinessTO, CreatedTO} from '../models';
import {WorkspaceTO} from '../../workspace/models';

export enum EntityActionTypes {
    NoopAction = '[Business] NoopAction',
    BusinessError = '[Business] Business Fail Request',
    LoadBusiness = '[Business] Load Business',
    LoadBusinessComplete = '[Business] Load Business Complete',
    AddBusiness = '[Business] Add Business',
    AddBusinessComplete = '[Business] Add Business Complete',
    SetShowOrHideDialog = '[Business] Set Hide or Show Dialog',
    SetSelected = '[Business] Set Selected Business',
    SetSelectedWorkspace = '[Business] Set Selected Business Workspace',
    LoadInitialData = '[Business] Load all information by Bussiness',
    DeleteBusiness = '[Business] Delete Business',
    DeleteBusinessComplete = '[Business] Delete Business Complete',
}

export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadBusiness = createAction(EntityActionTypes.LoadBusiness);
export const loadBusinessComplete = createAction(EntityActionTypes.LoadBusinessComplete,props<{ data: AllBusinessTO }>());
export const businessError = createAction(EntityActionTypes.BusinessError, props<{ error: Error | any }>());
export const addBusiness = createAction(EntityActionTypes.AddBusiness, props<{ data: BusinessTO }>());
export const addBusinessComplete = createAction(EntityActionTypes.AddBusinessComplete, props<{ response: CreatedTO }>())
export const setShowOrHideDialog = createAction(EntityActionTypes.SetShowOrHideDialog, props<{ dialog: boolean }>());
export const setSelected = createAction(EntityActionTypes.SetSelected, props<{ entity: BusinessTO }>());
export const setSelectedWorkspace = createAction(EntityActionTypes.SetSelectedWorkspace, props<{ entity: WorkspaceTO }>());
export const loadInitialData = createAction(EntityActionTypes.LoadInitialData, props<{ entity: BusinessTO }>());
export const deleteBusiness = createAction(EntityActionTypes.DeleteBusiness, props<{ id: string }>());
export const deleteBusinessComplete = createAction(EntityActionTypes.DeleteBusinessComplete, props<{ id: string }>());


export const fromBusinessActions = {
    noopAction,
    businessError,
    loadBusiness,
    loadBusinessComplete,
    addBusiness,
    addBusinessComplete,
    setSelected,
    setSelectedWorkspace,
    loadInitialData,
    setShowOrHideDialog,
    deleteBusiness,
    deleteBusinessComplete
}
