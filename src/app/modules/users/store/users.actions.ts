import {createAction, props} from '@ngrx/store';
import {LazyLoadData} from '../../../standalone/data-table/models';

export enum EntityActionTypes {
    NoopAction = '[Users] NoopAction',
    OpenAddOrEdit = '[Users] Open Add Or Edit Dialog Users',
    LoadUsersList = '[Users] Load Users List',
    LoadUsersSuccess = '[Users] Load Users List Success',
    AddUsers = '[Users] Add Users Config',
    AddUsersComplete = '[Users] Add Users Complete',
    EditUsers = '[Users] Edit Users Config',
    EditUsersComplete = '[Users] Edit Users Complete',
    DeleteUsers = '[Users] Delete Users Config',
    DeleteUsersComplete = '[Users] Delete Users Complete',
    UsersFailRequest = '[Users] Users Fail Request',
}

export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadUsersList = createAction(EntityActionTypes.LoadUsersList, props<{ id: string }>());
export const loadUsersSuccess = createAction(EntityActionTypes.LoadUsersSuccess, props<{ data: any }>());
export const usersFailRequest = createAction(EntityActionTypes.UsersFailRequest, props<{ error: Error | any }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const addUsers = createAction(EntityActionTypes.AddUsers, props<{ data: { id: string, user: string } }>());
export const addUsersComplete = createAction(EntityActionTypes.AddUsersComplete, props<{ data: any }>());
export const editUsers = createAction(EntityActionTypes.EditUsers, props<{ data: { id: string, user: string[] } }>());
export const editUsersComplete = createAction(EntityActionTypes.EditUsersComplete, props<{ data: any }>());
export const deleteUsers = createAction(EntityActionTypes.DeleteUsers, props<{ id: any }>());
export const deleteUsersComplete = createAction(EntityActionTypes.DeleteUsersComplete);

export const fromUsersActions = {
    noopAction,
    loadUsersList,
    loadUsersSuccess,
    openAddOrEdit,
    addUsers,
    addUsersComplete,
    editUsers,
    editUsersComplete,
    deleteUsers,
    deleteUsersComplete,
    usersFailRequest
};
