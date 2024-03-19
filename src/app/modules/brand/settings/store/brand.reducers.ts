import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {fromBrandActions} from './brand.actions';

export const ENTITY_FEATURE_KEY = 'brand';

export interface State extends EntityState<any> {
    selected?: any;
    search?: any[];
    result?: any;
    dialog: boolean,
    loaded: boolean;
    created?: boolean;
    totalElements: number,
    createdId?: string;
    error?: Error | any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({});

export interface brandPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
    entities: [],
    loaded: false,
    created: false,
    dialog: false,
    totalElements: 0,
    error: null
});
export const brandReducers = createReducer<State>(
    initialState,
    on(fromBrandActions.createBrandFromBusiness, (state) => {
        return {...state, loaded: true};
    }),
    on(fromBrandActions.loadBrandSuccess, (state, {data}) => {
        return adapter.setAll(data.data, {...state, loaded: true, created: false, createdId: '', dialog: false, totalElements: data.total, selected: data.data[0]});
    }),
    on(fromBrandActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromBrandActions.brandError, (state) => {
        return {...state, dialog: false, loaded: false};
    }),
    on(fromBrandActions.addBrandSuccess, (state, {response}) => {
        return {...state, createdId: response.id, created: true, loaded: false};
    }),
    on(fromBrandActions.createBrandFromBusinessSuccess, (state, {response}) => {
        return {...state, created: true, createdId: response.id,};
    }),
    on(fromBrandActions.selectedBrand, (state, {entity}) => {
        return {...state, selected: entity};
    }),
);

export function reducer(state: State | undefined, action: Action): State {
    return brandReducers(state, action);
}
