import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {AllBusinessTO, BusinessTO} from '../models';
import {fromBusinessActions} from './business.actions';
import {WorkspaceTO} from '../../workspace/models';

export const ENTITY_FEATURE_KEY = 'business';

export interface State extends EntityState<AllBusinessTO> {
    loaded: boolean;
    dialog: boolean;
    register: boolean;
    listElements: BusinessTO[],
    selected?: BusinessTO;
    createdId?: string;
    selectedWorkspace?: WorkspaceTO;
    error?: Error | any;
}

export interface BusinessPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<AllBusinessTO> = createEntityAdapter<AllBusinessTO>({
    selectId: customSelectId
});
export const initialState: State = adapter.getInitialState({
    entities: [],
    listElements: [],
    loaded: false,
    register: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const businessReducer = createReducer<State>(
    initialState,
    on(fromBusinessActions.addBusinessComplete, (state, {response}) => {
        return {...state, register: true, createdId: response.id};
    }),
    on(fromBusinessActions.loadBusinessComplete, (state, {data}) => {
        const analyst = data.analysts.map(a=>{
            return {...a, analyst: true}
        });
        const localSelected = JSON.parse(localStorage.getItem('selectedBusiness'));
        let local = null;
        if (localSelected !== null) {
            if (data.owner.concat(analyst).filter(b => b.id === localSelected.id).length > 0) {
                local = localSelected;
            }
        }
        return adapter.addOne(data, {...state, loaded: true, error: null, selected: local, dialog: false, listElements: data.owner.concat(analyst)});
    }),
    on(fromBusinessActions.setShowOrHideDialog, (state, {dialog}) => {
        return {...state, dialog: dialog};
    }),
    on(fromBusinessActions.setSelected, (state, {entity}) => {
        return {...state, selected: entity, dialog: false};
    }),
    on(fromBusinessActions.setSelectedWorkspace, (state, {entity}) => {
        return {...state, selectedWorkspace: entity, dialog: false};
    }),
    on(fromBusinessActions.deleteBusinessComplete, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromBusinessActions.businessError, (state, {error}) => {
        return {...state, error};
    }),
);

export function reducer(state: State | undefined, action: Action): State {
    return businessReducer(state, action);
}

function customSelectId(entity: AllBusinessTO): string {
    // Utiliza "id" del primer elemento en "owner" como parte del ID único.
    if (entity.owner.length > 0) {
        return `${entity.owner[0].id}`;
    } else if (entity.analysts.length > 0) {
        return `${entity.analysts[0].id}`;
    }
    return null; // Devuelve null si no se puede determinar un ID único.
}

