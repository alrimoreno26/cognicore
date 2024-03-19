import {createAction, props} from '@ngrx/store';
import {MessageTO} from '../model';

export enum EntityActionTypes {
    StartChat = '[Chat] Start Chat',
    AddMessageChat = '[Chat] Add Message Chat',
    WaitingRobot = '[Chat] Show Loading Robot Waiting',
    SendMessageChat = '[Chat] Send Chat',
    SendMessageChatComplete = '[Chat] Send Chat Complete',
    MessageChatSocketComplete = '[Chat] Receive Socket Chat Complete',
    SaveGeneration = '[Chat] Saving Generation Chat',
    SaveGenerationComplete = '[Chat] Saving Generation Chat Complete',
    UpdateOptionsSelected = '[Chat] Update Options Selected',
    GetNewImage = '[Chat] Get New Image',
    GetNewImageComplete = '[Chat] Get New Image Complete',
    GetNewImageFail = '[Chat] Get New Image Fail',
    WaitingSocketComplete = '[Chat] Waiting Socket Complete',
    ResetCounter = '[Chat] Reset Counter',
    ResetChat = '[Chat] Reset Chat',
    ChatFail = '[Chat] Chat Fail',
}


export const startChat = createAction(EntityActionTypes.StartChat, props<{ message: MessageTO; }>());
export const addMessageChat = createAction(EntityActionTypes.AddMessageChat, props<{ message: MessageTO; }>());
export const sendMessageChat = createAction(EntityActionTypes.SendMessageChat, props<{ data: MessageTO, show: boolean }>());
export const sendMessageChatComplete = createAction(EntityActionTypes.SendMessageChatComplete, props<{ response: any; }>());
export const messageChatSocketComplete = createAction(EntityActionTypes.MessageChatSocketComplete, props<{ response: any; }>());
export const waitingRobot = createAction(EntityActionTypes.WaitingRobot);
export const resetCounter = createAction(EntityActionTypes.ResetCounter);
export const chatFail = createAction(EntityActionTypes.ChatFail, props<{ error: Error | any }>());
export const saveGeneration = createAction(EntityActionTypes.SaveGeneration, props<{ data: any }>());
export const saveGenerationComplete = createAction(EntityActionTypes.SaveGenerationComplete);
export const resetChat = createAction(EntityActionTypes.ResetChat);
export const updateOptionsSelected = createAction(EntityActionTypes.UpdateOptionsSelected, props<{ updated: any }>());
export const getNewImage = createAction(EntityActionTypes.GetNewImage, props<{ data: any; }>());
export const waitingSocketComplete = createAction(EntityActionTypes.WaitingSocketComplete, props<{ waiting: boolean; }>());
export const getNewImageComplete = createAction(EntityActionTypes.GetNewImageComplete, props<{ payload: any }>());
export const getNewImageFail = createAction(EntityActionTypes.GetNewImageFail, props<{ error: Error | any }>());

export const fromChatActions = {
    startChat,
    addMessageChat,
    sendMessageChat,
    waitingRobot,
    sendMessageChatComplete,
    messageChatSocketComplete,
    saveGeneration,
    saveGenerationComplete,
    updateOptionsSelected,
    resetChat,
    getNewImage,
    getNewImageComplete,
    getNewImageFail,
    waitingSocketComplete,
    resetCounter,
    chatFail
};
