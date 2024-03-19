import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, ENTITY_FEATURE_KEY, State} from './connections.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

// select the array of Entities
export const getAllDataSource = createSelector(getEntityState, selectAll);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const getTotalElements = createSelector(getEntityState, state => state.totalElements);
export const selectedEntity = createSelector(getEntityState, state => state.selected);
export const selectedCmsRegister = createSelector(getEntityState, state => state.cmsRegister);
export const selectedCrmRegister = createSelector(getEntityState, state => state.crmRegister);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
