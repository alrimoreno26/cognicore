import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, retry, share, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {ConfigService} from '../config';
import {ChatService} from '../../modules/chat/service/chat.service';
import {map} from 'rxjs/operators';

export enum SocketClientState {
    ATTEMPTING, CONNECTED, ERROR, DISCONNECTED
}

@Injectable({
    providedIn: 'root'
})
export class WebSocketServices {

    public messages: Subject<string>;
    public ws: any;
    public isConnected = false;
    private subject: Subject<MessageEvent>;
    state: BehaviorSubject<SocketClientState> = new BehaviorSubject<SocketClientState>(SocketClientState.DISCONNECTED);

    constructor(private store: Store, private config: ConfigService, private chat: ChatService) {
    }
    public open() {
        this.messages = <Subject<any>>this.connect().pipe(
            map(
                (response: MessageEvent): any => {
                    this.chat.getMessageSocket(response.data)
                }
            )
        );
        console.log('Websocket successfully connected to : ', `ws://${this.config.getApiGateway()}:8181/openaigeneration/api/v1/ws/chat`);
    }
    public connect(): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create();
        }
        return this.subject;
    }

    private create(): Subject<MessageEvent> {
        //this.ws = new WebSocket(url, [this.env.wsProtocol, this.token]);
        this.ws = new WebSocket(`ws://${this.config.getApiGateway()}:8181/openaigeneration/api/v1/ws/chat`);
        const observable = Observable.create((obs: Observer<MessageEvent>) => {
            this.ws.onmessage = obs.next.bind(obs);
            this.ws.onerror = obs.error.bind(obs);
            this.ws.onclose = obs.complete.bind(obs);
            return this.ws.close.bind(this.ws);
        }).pipe(
            share(),
            retry({count: 10, delay: 5000})
        );
        const observer = {
            next: (data: Object) => {
                console.log(data);
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
    }

    public close() {
        if (this.ws) {
            this.ws.close();
            console.log('websocket connection closed');
            this.subject = null;
        }
    }

}
