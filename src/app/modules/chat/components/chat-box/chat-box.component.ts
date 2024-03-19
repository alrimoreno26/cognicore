import {Component, OnInit, ChangeDetectionStrategy, effect} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {MessageTO, optionsCustomization, optionsExternalData, optionsFilters} from '../../model';
import {AuthService} from '../../../../auth/service/auth.service';
import {UserAuthenticated} from '../../../../auth/model';
import {v4 as uuidv4} from 'uuid';
import {AnimationOptions} from 'ngx-lottie';
import {BrandServices} from '../../../brand/settings/service/brand.services';
import {MessageServices} from '../../../../core/injects/message.services';
import {TranslateService} from '@ngx-translate/core';
import {Options} from '../../../../core/models/table.model';
import {cloneDeep} from 'lodash';
import {WebSocketServices} from '../../../../core/injects/webSocket.services';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {

    message!: any;

    textContent: string = '';

    userLogged?: UserAuthenticated;

    messages: MessageTO[] = [];

    options: AnimationOptions = {
        path: '/assets/animations/chat_loaded.json'
    };

    selectedResonance: any[] = [{key: 'brand', name: 'Brand'}];
    selectedExternal!: Options[];
    selectedFilters!: Options[];

    checked: boolean = true;
    switchStyles: any = {
        transform: 'scale(0.7)'
    };
    totalGeneration: number;
    sentenceChecked: number = 0;
    socketGeneration: number;
    btnStop: boolean = true;
    receivingSocket: boolean;

    constructor(public chatService: ChatService,
                public brand: BrandServices,
                private messageService: MessageServices,
                private translateService: TranslateService,
                private ws: WebSocketServices,
                private authService: AuthService) {
        this.ws.open();
        this.ws.messages.subscribe(x => {
            console.log(x);
        });
        this.authService.userLogged$.subscribe(userLogged => {
            if (userLogged) {
                // this.chatService.reset();
                this.userLogged = userLogged;
            }
        });
        this.chatService.listEntities$.subscribe(message => {
            this.messages = cloneDeep(message);
            console.log(this.messages);
            if (this.messages.length > 0) {
                // if (this.getIfHaveMessageConfirmation()) {
                //     this.chatService.setOnlyText(true);
                // }
            }
        });
        this.chatService.receivingSocket$.subscribe(state => {
            this.receivingSocket = state;
        });
        this.chatService.saveGeneration$.subscribe(status => {
            if (status) {
                this.messageService.addSuccess(this.translateService.instant('Your generation was successfully saved'));
                this.sentenceChecked = 0;
            }
        });
        this.chatService.socketGeneration$.subscribe(count => {
            this.socketGeneration = count;
            if (this.socketGeneration > 0) {
                this.btnStop = false;
            }
            if (this.socketGeneration === this.totalGeneration && (this.userLogged.session_id === this.messages[0].usr)) {
                this.btnStop = true;
                this.messageService.addSuccess(this.translateService.instant('Your generation was complete'));
                this.chatService.waitingSocketComplete(false);
                this.chatService.setOnlyText(false);
            }
        });
        this.chatService.totalGeneration$.subscribe(count => {
            this.totalGeneration = count;
        });
        effect(() => {
            if (this.brand.loaded$() && this.userLogged) {
                this.chatService.initChat(this.userLogged);
            }
        });
    }

    setMessage() {
        if (this.userLogged) {
        }
    }

    ngOnInit(): void {
        this.setMessage();
    }

    sendMessage() {
        if (this.textContent == '' || this.textContent === ' ') {
            return;
        } else {
            let message: MessageTO = {
                id: uuidv4(),
                usr: this.messages[0].usr,
                msg: (this.textContent.toLowerCase() === 'ok' && this.messages.at(-1).generating) ? this.messages.at(-1).seed : this.textContent,
                step: this.messages.at(-1).step === 1 ? this.messages.at(-1).step : this.messages.at(-1).step + 1,
                fromRobots: false,
                domain: this.messages[0].domain,
                brand: this.brand.selectedEntity$(),
                bussiness_id: this.messages[0].bussiness_id,
                showMessage: true,
                required_visuals: this.checked,
                approved_generation: (this.textContent.toLowerCase() === 'ok' && this.messages.at(-1).generating) ? true : this.messages[0].approved_generation,
                ui_filters: this.selectedResonance.length === 0 ? [] : Object.keys(this.selectedResonance).filter(key => key !== 'id').map(key => this.selectedResonance[key].key)
            };
            if (this.textContent.toLowerCase() === 'ok') {
                this.chatService.waitingSocketComplete(true);
            } else {
                this.chatService.setOnlyText(false);
            }
            this.chatService.sendMessage(message,this.textContent.toLowerCase() !== 'ok');
            this.textContent = '';
        }
    }

    parseDate(timestamp: number) {
        return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
    }

    typeOfResponse(msg: any) {
        let type = 'TEXT';
        if (Array.isArray(msg)) {
            type = 'ARRAY';
        }
        return type;
    }

    refresh() {
        this.chatService.reset();
        this.chatService.initChat(this.userLogged);
    }

    clickSelectRadio(step: number, pos: number, evt) {
        const selectedStep = this.messages[pos];
        const msg: MessageTO = {
            id: uuidv4(),
            usr: this.messages[0].usr,
            msg: `Please generate a campaign titled '${selectedStep.target_title}' towards the target '${evt.value}'`,
            step: selectedStep.step,
            domain: this.messages[0].domain,
            selectedResponse: selectedStep.selectedResponse,
            brand: this.brand.selectedEntity$(),
            bussiness_id: this.messages[0].bussiness_id,
            required_visuals: this.checked,
            approved_generation: false,
            ui_filters: this.selectedResonance.length === 0 ? [] : Object.keys(this.selectedResonance).filter(key => key !== 'id').map(key => this.selectedResonance[key].key)
        };
        selectedStep.selectedResponse = evt.value;
        this.chatService.selectedOptions(msg, {selectedStep});
        // this.loadedMessage = true;

    }

    saveGeneration() {

        const message = this.messages.filter(f => f.generating === false &&
            f.fromRobots &&
            f.response?.length > 0 &&
            f.msg.includes('combinations for your question')).at(-1);
        const generationsId = message.response[0].generation_id;

        const send = {
            brand: this.brand.selectedEntity$().id,
            business: this.messages[0].bussiness_id,
            generationId: generationsId,
            generations: [],
            seed: message.response[0].seed,
            segmentId: message.response[0].target
        };
        message.response.forEach(x => {
            send.generations.push({
                image: x.images.length === 0 ? null : x.images[0].itemImageSrc,
                message: x.campaign,
                filter: x.filters.filter(x => x !== 'brand'),
                brand: x.brand
            });
        });
        this.chatService.saveGeneration({send});
        this.chatService.resetCounter();
    }

    disabledSave(): boolean {
        if (this.totalGeneration === 0) {
            return true;
        } else {
            return !(this.sentenceChecked === this.totalGeneration);
        }
    }

    checkedSentence(checked: number) {
        this.sentenceChecked += checked;
    }

    modifyCampaign(event, pos) {
        this.messages[pos].response[event.pos].campaign = event.value;
    }

    checkAll(step) {
        this.chatService.setCheckAll({value: true, step: step - 1});
    }

    uncheckAll(step) {
        this.chatService.setCheckAll({value: true, step: -1});
    }

    getIfHaveMessageConfirmation() {
        return this.messages.at(-1).generating &&
            this.messages.at(-1).fromRobots &&
            this.messages.at(-1).msg.includes('content will be generated');
    }

    getDimensionsGeneration() {
        return `The content will be customized to the ${Object.keys(this.selectedResonance).filter(key => key !== 'id').map(key => this.selectedResonance[key].key).join(';')}`;
    }

    onChangeSelectedResonance(evt) {
        if (evt.value.length === 0 || evt.value.length === 4) {
            this.selectedResonance = [{key: 'brand', name: 'Brand'}];
        } else {
            if (evt.itemValue.key === 'personality' || evt.itemValue.key === 'sex' || evt.itemValue.key === 'age') {
                this.selectedResonance = this.selectedResonance.filter(k => k.key !== 'brand');
            } else {
                if (evt.itemValue.key === 'brand') {
                    this.selectedResonance = [{key: 'brand', name: 'Brand'}];
                }
            }
        }
        if (this.getIfHaveMessageConfirmation()) {
            let message: MessageTO = {
                id: uuidv4(),
                usr: this.messages[0].usr,
                msg: (this.messages.at(-1).msg.includes('content will be generated') && this.messages.at(-1).generating) ? this.messages.at(-1).seed : this.textContent,
                step: this.messages.at(-1).step === 1 ? this.messages.at(-1).step : this.messages.at(-1).step + 1,
                fromRobots: false,
                domain: this.messages[0].domain,
                brand: this.brand.selectedEntity$(),
                bussiness_id: this.messages[0].bussiness_id,
                required_visuals: this.checked,
                approved_generation: (this.textContent.toLowerCase() === 'ok' && this.messages.at(-1).generating) ? true : this.messages[0].approved_generation,
                ui_filters: this.selectedResonance.length === 0 ? [] : Object.keys(this.selectedResonance).filter(key => key !== 'id').map(key => this.selectedResonance[key].key)
            };
            console.log(message);
            console.log('cambio con confirmation');
            this.chatService.sendMessage(message,false);
        }
    }

    protected readonly optionsCustomization = optionsCustomization;
    protected readonly optionsExternalData = optionsExternalData;
    protected readonly optionsFilters = optionsFilters;
}
