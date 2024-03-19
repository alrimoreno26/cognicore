import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {MessageTO} from '../model';
import {fromChatActions} from './chat.actions';
import {v4 as uuid} from 'uuid';
import {modifyChatAnswer} from '../utils';
import {cloneDeep} from 'lodash';

export const ENTITY_FEATURE_KEY = 'chat';

export interface State extends EntityState<MessageTO> {
    selected?: MessageTO | null;
    dialog: boolean,
    loaded: boolean;
    waiting: boolean;
    receivingSocket: boolean;
    saveGeneration: boolean
    totalGeneration: number;
    socketGeneration: number;
    newImage: string;
    temporalGeneration: any[];
    error?: Error | any;
}

export interface ChatPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<MessageTO> = createEntityAdapter<MessageTO>({});
export const initialState: State = adapter.getInitialState({
    selected: null,
    dialog: false,
    saveGeneration: false,
    loaded: false,
    waiting: false,
    receivingSocket: false,
    newImage: '',
    totalGeneration: 0,
    socketGeneration: 0,
    temporalGeneration: [],
    error: null
});

export const chatReducer = createReducer<State>(
    initialState,
    on(fromChatActions.startChat, (state, {message}) => {
        return adapter.addOne(message, {...state, loaded: true});
    }),
    on(fromChatActions.waitingRobot, (state) => {
        return {...state, waiting: true};
    }),
    on(fromChatActions.addMessageChat, (state, {message}) => {
        return adapter.addOne(message, {...state});
    }),
    on(fromChatActions.resetChat, (state) => {
        return adapter.removeAll({
            ...state, dialog: false,
            saveGeneration: false,
            loaded: false,
            waiting: false,
            receivingSocket: false,
            newImage: '',
            totalGeneration: 0,
            socketGeneration: 0,
            temporalGeneration: []
        });
    }),
    on(fromChatActions.chatFail, (state) => {
        return {...state, waiting: false};
    }),
    on(fromChatActions.saveGenerationComplete, (state) => {
        return {...state, saveGeneration: true, totalGeneration: 0, socketGeneration: 0};
    }),
    on(fromChatActions.updateOptionsSelected, (state, {updated}) => {
        const message = state.entities[updated.selectedStep.id];
        return adapter.updateOne({id: updated.selectedStep.id, changes: {...message, selectedResponse: updated.selectedStep.selectedResponse}}, {
            ...state,
            waiting: true
        });
    }),
    on(fromChatActions.getNewImageComplete, (state, {payload}) => {
        return {...state, newImage: payload};
    }),
    on(fromChatActions.waitingSocketComplete, (state, {waiting}) => {
        return {...state, receivingSocket: waiting};
    }),
    on(fromChatActions.chatFail, (state, {error}) => {
        return {...state, receivingSocket: false, waiting: false, totalGeneration: 0, socketGeneration: 0};
    }),
    on(fromChatActions.resetCounter, (state) => {
        return {...state, receivingSocket: false, waiting: false, totalGeneration: 0, socketGeneration: 0, temporalGeneration: []};
    }),
    on(fromChatActions.sendMessageChatComplete, (state, {response}) => {
        var lastElement = state.entities[Object.keys(state.entities).pop()!];
        const initialChat: MessageTO = {
            id: uuid(),
            usr: 'Cognicore',
            msg: response.message.response,
            step: 0,
            response: [],
            fromRobots: true,
            generating: false,
            showMessage: response.show,
            grafica: '',
            domain: lastElement.domain,
            brand: lastElement.brand,
            bussiness_id: lastElement.bussiness_id,
            msgDate: new Date().toLocaleDateString(),
            type: 'ROBOT_CHAT',
        };
        if (!Array.isArray(response.message.response)) {
            if (response.message.response?.hasOwnProperty('generating') && response.message.response?.hasOwnProperty('msg')) {
                initialChat.msg = `${response.message.response.generation_instances} versions of the content will be generated`;
                initialChat.generating = !response.message.response?.generating;
                initialChat.seed = response.message.response.msg;
            } else {
                if (response.message.response?.hasOwnProperty('generating') && !response.message.response?.hasOwnProperty('msg')) {
                    initialChat.msg = `Well we are generating ${response.message.response.generation_instances} combinations for your question`;
                    initialChat.generating = !response.message.response?.generating;
                    initialChat.seed = response.message.response.msg;
                } else {
                    if (response.message.response?.hasOwnProperty('grafica')) {
                        initialChat.msg = response.message.response.response;
                        initialChat.grafica = response.message.response.grafica;
                    } else {
                        initialChat.msg = response.message.response;
                    }

                }
            }

            initialChat.step = response.message.step;
        } else {
            if (response.message.response.length === 1) {
                initialChat.msg = response.message.response[0].text;
                initialChat.step = response.message.step;
                initialChat.target_option = response.message.response[0].target_option;
                initialChat.selectedResponse = '';
                initialChat.target_title = response.message.response[0].title;
                initialChat.type = 'SELECTION_CONTENT';
            } else {
                const temp_sentence = [];
                response.message.response.forEach(r => {
                    if (Array.isArray(r.texto) && r.texto.length > 0) {
                        temp_sentence.push(modifyChatAnswer(r.texto[0], response.message.step));
                    }
                    if (!Array.isArray(r.texto)) {
                        temp_sentence.push(modifyChatAnswer(r, response.message.step));
                    }
                });
                initialChat.response = temp_sentence;
                initialChat.msg = response.message.response;
                initialChat.step = response.message.step;
            }
        }
        const tg = response.message.response.generation_instances ? response.message.response.generation_instances : 0;
        let sg = state.socketGeneration;
        if (tg === 0) {
            sg = 0;
        }
        return adapter.addOne(initialChat, {
            ...state,
            loaded: true,
            waiting: false,
            socketGeneration: sg,
            totalGeneration: tg
        });
    }),
    on(fromChatActions.messageChatSocketComplete, (state, {response}) => {
        const initial = state.entities[Object.keys(state.entities).at(0)];
        const generated = findObjectInState(state.entities, response.step + 1);
        if (initial.usr === response.user && generated) {
            const initialChat: MessageTO = {
                id: uuid(),
                usr: 'Cognicore',
                msg: response.response,
                step: 0,
                response: [],
                fromRobots: true,
                status: response.status,
                brand: initial.brand,
                bussiness_id: initial.bussiness_id,
                msgDate: new Date().toLocaleDateString(),
                type: 'ROBOT_CHAT',
            };

            const temp_sentence = [];
            temp_sentence.push(modifyChatAnswer(response, response.step));

            initialChat.response = temp_sentence;
            initialChat.msg = [];
            initialChat.step = response.step;

            const clon = cloneDeep(generated);
            if (state.temporalGeneration.length > 0) {
                clon.response = cloneDeep(state.temporalGeneration);

            }
            clon.response.push(modifyChatAnswer(response, response.step));

            return adapter.updateOne({id: generated.id, changes: {...generated, response: clon.response}}, {
                ...state,
                loaded: true,
                waiting: false,
                saveGeneration: false,
                receivingSocket: state.socketGeneration + 1 === state.totalGeneration,
                temporalGeneration: [],
                socketGeneration: clon.response === state.totalGeneration ? 0 : state.socketGeneration + 1
            });

        } else {
            if (initial.usr === response.user) {
                const temp = cloneDeep(state.temporalGeneration);
                temp.push(modifyChatAnswer(response, response.step));
                return {...state, loaded: true, waiting: false, saveGeneration: false, temporalGeneration: temp, socketGeneration: state.socketGeneration + 1};
            } else {
                return {...state, loaded: true, waiting: false};
            }
        }

    }),
);

function findObjectInState(data: any, step: number) {
    for (const key in data) {
        if (data[key].step === step) {
            return data[key];
        }
    }
    return null;
}

export function reducer(state: State | undefined, action: Action): State {
    return chatReducer(state, action);
}
