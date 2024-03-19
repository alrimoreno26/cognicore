import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ConnectionsTO} from '../models';
import {fromDatasourceConnectionsActions} from './connections.actions';

export const ENTITY_FEATURE_KEY = 'datasource_connections';

export interface State extends EntityState<ConnectionsTO> {
    selected?: ConnectionsTO;
    search?: ConnectionsTO[];
    result?: any;
    dialog: boolean,
    loaded: boolean;
    totalElements: 0,
    cmsRegister: boolean;
    crmRegister: boolean;
    error?: Error | any;
}

export interface datasourceConnectionsPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<ConnectionsTO> = createEntityAdapter<ConnectionsTO>({});
export const initialState: State = adapter.getInitialState({
    selected: null,
    search: [],
    dialog: false,
    loaded: false,
    crmRegister: false,
    cmsRegister: false,
    totalElements: 0,
    error: null
});

export const datasource_connections = createReducer<State>(
    initialState,
    on(fromDatasourceConnectionsActions.loadConnectionsSuccess, (state, {data}) => {
        return adapter.setAll(data.data, {...state, loaded: true, dialog: false, totalElements: data.total});
    }),
    on(fromDatasourceConnectionsActions.addConnectionsFromRegister, (state) => {
        return {...state, loaded: true};
    }),
    on(fromDatasourceConnectionsActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromDatasourceConnectionsActions.addConnectionsComplete, (state, {data}) => {
        return {...state, crmRegister: data.type === 'CRM', cmsRegister: data.type === 'CMS'};
    }),
    on(fromDatasourceConnectionsActions.editConnectionsComplete, (state) => {
        return {...state, dialog: false, loaded: false};
    }),
    on(fromDatasourceConnectionsActions.loadConnectionsError, (state) => {
        return {...state, dialog: false};
    }),
    on(fromDatasourceConnectionsActions.deleteConnectionsComplete, (state,{id}) => {
        console.log(state);
        return adapter.removeOne(id, state);
    })
);

export function reducer(state: State | undefined, action: Action): State {
    return datasource_connections(state, action);
}
