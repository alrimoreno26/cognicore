import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, ENTITY_FEATURE_KEY, State} from './brand.configuration.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

// select the array of Entities
export const getAllBrandConfig = createSelector(getEntityState, selectAll);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const getTotalElements = createSelector(getEntityState, state => state.totalElements);
export const selectedEntity = createSelector(getEntityState, state => state.selected);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
