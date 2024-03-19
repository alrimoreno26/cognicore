import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../service/chat.service';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

    // TODO MODELO USUARIO PONER
    @Input() user!: any;
    // TODO MESSAGE
    lastMessage!: any;

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
        let filtered = this.user.messages.filter((m: { ownerId: number; }) => m.ownerId !== 123)
        this.lastMessage = filtered[filtered.length - 1];
    }

    changeView(user: any) {
    }
}
