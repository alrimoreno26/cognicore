import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, ENTITY_FEATURE_KEY, State} from './chat.reducers';

const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

const {selectAll} = adapter.getSelectors();

export const getAllChatMessage = createSelector(getEntityState, selectAll);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
export const waitingRobot = createSelector(getEntityState, state => state.waiting);
export const saveGeneration = createSelector(getEntityState, state => state.saveGeneration);
export const socketGeneration = createSelector(getEntityState, state => state.socketGeneration);
export const totalGeneration = createSelector(getEntityState, state => state.totalGeneration);
export const newImageGenerate = createSelector(getEntityState, state => state.newImage);
export const receivingSocket = createSelector(getEntityState, state => state.receivingSocket);
