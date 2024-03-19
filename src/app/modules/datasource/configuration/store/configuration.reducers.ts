import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ConfigType} from '../models';
import {fromDatasourceConfigurationsActions} from './configuration.actions';

export const ENTITY_FEATURE_KEY = 'datasource_configuration';

export interface State extends EntityState<ConfigType> {
    loaded: boolean;
    dialog: boolean;
    totalElements: 0,
    selected?: ConfigType;
    error?: Error | any;
}

export interface DatasourceConfigurationPartialState {
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

export const datasource_configuration = createReducer<State>(
    initialState,
    on(fromDatasourceConfigurationsActions.loadDataSourceSuccess, (state, {data}) => {
        return adapter.setAll(data.data, {...state, loaded: true, dialog: false, totalElements: data.total});
    }),
    on(fromDatasourceConfigurationsActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromDatasourceConfigurationsActions.addConfigurationComplete, (state, {data}) => {
        return {...state, dialog: false};
    }),
    on(fromDatasourceConfigurationsActions.editConfigurationComplete, (state, {data}) => {
        return {...state, dialog: false};
    })
);

export function reducer(state: State | undefined, action: Action): State {
    return datasource_configuration(state, action);
}
