import {Injectable} from '@angular/core';
import {BaseStoreServices} from '../../../core/injects/base.store.services';
import {MessageTO} from '../model';
import {select, Store} from '@ngrx/store';
import {ChatPartialState} from '../store/chat.reducers';
import {fromChatActions} from '../store/chat.actions';
import {
    getAllChatMessage,
    newImageGenerate, receivingSocket,
    saveGeneration,
    selectEntityLoaded,
    socketGeneration,
    totalGeneration,
    waitingRobot
} from '../store/chat.selectors';
import {AuthService} from '../../../auth/service/auth.service';
import {UserAuthenticated} from '../../../auth/model';
import {v4 as uuid} from 'uuid';
import {BehaviorSubject, Observable} from 'rxjs';
import {BusinessService} from '../../business/service/business.service';
import {BrandServices} from '../../brand/settings/service/brand.services';

@Injectable({providedIn: 'platform'})
export class ChatService extends BaseStoreServices<MessageTO> {

    waiting$: Observable<boolean>;
    saveGeneration$: Observable<boolean>;
    socketGeneration$: Observable<number>;
    newImage$: Observable<any>;
    totalGeneration$: Observable<number>;
    receivingSocket$: Observable<boolean>;
    checkAll$ = new BehaviorSubject<{ value: boolean, step: number }>({value: false, step: 0});
    onlyText$ = new BehaviorSubject<boolean>(false);

    constructor(private store: Store<ChatPartialState>, private authService: AuthService, private bussiness: BusinessService, private brand: BrandServices) {
        super();
        this.initState();
    }

    override initState() {
        this.listEntities$ = this.store.pipe(select(getAllChatMessage));
        this.loaded$ = this.store.pipe(select(selectEntityLoaded));
        this.waiting$ = this.store.pipe(select(waitingRobot));
        this.saveGeneration$ = this.store.pipe(select(saveGeneration));
        this.socketGeneration$ = this.store.pipe(select(socketGeneration));
        this.totalGeneration$ = this.store.pipe(select(totalGeneration));
        this.newImage$ = this.store.pipe(select(newImageGenerate));
        this.receivingSocket$ = this.store.pipe(select(receivingSocket));
    }

    get getCheckAll$() {
        return this.checkAll$.value;
    }

    setCheckAll(check: any) {
        this.checkAll$.next(check);
    }

    setOnlyText(value: any) {
        this.onlyText$.next(value);
    }

    resetCounter() {
        this.store.dispatch(fromChatActions.resetCounter());
    }

    initChat(userLogged: UserAuthenticated) {
        const initialChat: MessageTO = {
            id: uuid(),
            usr: this.authService.userLogged.session_id,
            msg: 'Hello ' + userLogged.username + ' how can I help you?',
            step: 1,
            fromRobots: true,
            bussiness_id: this.bussiness.selectedEntity$().id,
            brand: this.brand.selectedEntity$(),
            generating: false,
            required_visuals: false,
            approved_generation: false,
            ui_filters: []
        };
        this.store.dispatch(fromChatActions.startChat({message: initialChat}));
    }

    sendMessage(message: any, see: boolean) {
        this.store.dispatch(fromChatActions.waitingRobot());
        this.store.dispatch(fromChatActions.addMessageChat({message}));
        this.store.dispatch(fromChatActions.sendMessageChat({data: message, show: see}));
    }


    saveGeneration(data: any) {
        this.store.dispatch(fromChatActions.saveGeneration({data: data.send}));
    }

    changeImage(data: any) {
        this.store.dispatch(fromChatActions.getNewImage(data));
    }

    reset() {
        this.store.dispatch(fromChatActions.resetChat());
    }

    getMessageSocket(response: string): void {
        try {
            const data = JSON.parse(response);
            this.store.dispatch(fromChatActions.messageChatSocketComplete({response: data}));
        } catch (e) {
            console.log(e);
        }
    }

    selectedOptions(message: any, updatedMessage: any) {
        this.store.dispatch(fromChatActions.waitingRobot());
        this.store.dispatch(fromChatActions.sendMessageChat({data: message, show: true}));
        this.store.dispatch(fromChatActions.updateOptionsSelected({updated: updatedMessage}));
    }

    waitingSocketComplete(wait: boolean): void {
        this.store.dispatch(fromChatActions.waitingSocketComplete({waiting: wait}));
    }
}
