import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, ENTITY_FEATURE_KEY, State} from './business.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

// select the array of Entities
export const getAllBusiness = createSelector(getEntityState, selectAll);
export const showOrHideDialog = createSelector(getEntityState, state => state.dialog);
export const selectedWorkspace = createSelector(getEntityState, state => state.selectedWorkspace);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
export const selectEntity = createSelector(getEntityState, state => state.selected);
export const selectRegisterState = createSelector(getEntityState, state => state.register);
export const createdBussiness = createSelector(getEntityState, state => state.createdId);
export const listElements = createSelector(getEntityState, state => state.listElements);
export const error = createSelector(getEntityState, state => state.error);

