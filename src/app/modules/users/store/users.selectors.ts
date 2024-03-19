import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, ENTITY_FEATURE_KEY, State} from './users.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

// select the array of Entities
export const getAllUsers = createSelector(getEntityState, selectAll);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
