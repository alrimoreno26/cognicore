import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessageServices {

    constructor(private message: MessageService) {
    }

    /**
     * Generate success message notification
     * @param message string
     * @param title string optional
     * @param sticky boolean default false
     * @param closable boolean default true
     */
    addSuccess(message: string, title?: string, sticky: boolean = false, closable: boolean = true): void {
        this.message.add({severity: 'success', detail: message, summary: title, sticky, closable});
    }

    /**
     * Generate info message notification
     * @param message string
     * @param title string optional
     * @param sticky boolean default false
     * @param closable boolean default true
     */
    addInfo(message: string, title?: string, sticky: boolean = false, closable: boolean = true): void {
        this.message.add({severity: 'info', detail: message, summary: title, sticky, closable});
    }

    /**
     * Generate warn message notification
     * @param message string
     * @param title string optional
     * @param sticky boolean default false
     * @param closable boolean default true
     */
    addWarn(message: string, title?: string, sticky: boolean = false, closable: boolean = true): void {
        this.message.add({severity: 'warn', detail: message, summary: title, sticky, closable});
    }

    /**
     * Generate error message notification
     * @param message string
     * @param title string optional
     * @param sticky boolean default false
     * @param closable boolean default true
     */
    addError(message: string, title?: string, sticky: boolean = false, closable: boolean = true): void {
        this.message.add({severity: 'error', detail: message, summary: title, sticky, closable});
    }
}
