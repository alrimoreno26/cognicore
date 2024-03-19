import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './service/chat.service';
import {UserAuthenticated} from '../../auth/model';

@Component({
    templateUrl: './chat.app.component.html'
})
export class ChatAppComponent implements OnDestroy {

    constructor() {
    }

    ngOnDestroy() {

    }
}
