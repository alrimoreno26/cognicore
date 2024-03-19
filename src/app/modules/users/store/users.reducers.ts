import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {fromUsersActions} from './users.actions';

export const ENTITY_FEATURE_KEY = 'users';

export interface State extends EntityState<string[]> {
    loaded: boolean;
    dialog: boolean;
    totalElements: 0,
    selected?: string;
    error?: Error | any;
}

export interface UsersPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<string[]> = createEntityAdapter<string[]>({});
export const initialState: State = adapter.getInitialState({
    entities: [],
    loaded: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const users_reducer = createReducer<State>(
    initialState,
    on(fromUsersActions.loadUsersSuccess, (state, {data}) => {
        const users = [];
        data.forEach((x, i) => {
            users.push({id: i + 1, name: x});
        });
        return adapter.setAll(users, {...state, loaded: true, dialog: false});
    }),
    on(fromUsersActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromUsersActions.usersFailRequest, (state) => {
        return {...state, dialog: false};
    }),
);

export function reducer(state: State | undefined, action: Action): State {
    return users_reducer(state, action);
}
