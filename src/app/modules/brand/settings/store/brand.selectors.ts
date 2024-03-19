import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter,ENTITY_FEATURE_KEY, State} from './brand.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

// select the array of Entities
export const getAllBrand = createSelector(getEntityState, selectAll);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const getTotalElements = createSelector(getEntityState, state => state.totalElements);
export const selectedEntity = createSelector(getEntityState, state => state.selected);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
export const createdBrand = createSelector(getEntityState, state => state.createdId);
export const created = createSelector(getEntityState, state => state.created);
