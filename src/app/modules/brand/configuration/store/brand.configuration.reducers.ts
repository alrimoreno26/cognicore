import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {fromBrandConfigurationsActions} from './brand.configuration.actions';
import {ConfigType} from '../../../datasource/configuration/models';

export const ENTITY_FEATURE_KEY = 'configuration_brand';

export interface State extends EntityState<ConfigType> {
    loaded: boolean;
    dialog: boolean;
    totalElements: 0,
    selected?: ConfigType;
    error?: Error | any;
}

export interface BrandConfigurationPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<ConfigType> = createEntityAdapter<ConfigType>({});
export const initialState: State = adapter.getInitialState({
    entities: [],
    loaded: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const configuration_brand = createReducer<State>(
    initialState,
    on(fromBrandConfigurationsActions.loadBrandConfigurationListSuccess, (state, {data}) => {
        return adapter.setAll(data.data, {...state, loaded: true, dialog: false, totalElements: data.total});
    }),
    on(fromBrandConfigurationsActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromBrandConfigurationsActions.addBrandConfigurationComplete, (state, {data}) => {
        return {...state, dialog: false};
    }),
    on(fromBrandConfigurationsActions.editBrandConfigurationComplete, (state, {data}) => {
        return {...state, dialog: false};
    }),
    on(fromBrandConfigurationsActions.brandConfigurationError, (state) => {
        return {...state, dialog: false};
    }),
);

export function reducer(state: State | undefined, action: Action): State {
    return configuration_brand(state, action);
}
