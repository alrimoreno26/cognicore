import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {concat, first, interval} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppUpdateService {
    constructor(private appRef: ApplicationRef,
                private updates: SwUpdate,
                private messageService: MessageService) {
    }

    init(): void {
        const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable));
        const everyTime$ = interval(environment.timeChecks);
        const everyOnceAppIsStable$ = concat(appIsStable$, everyTime$);
        if (environment.production) {
            everyOnceAppIsStable$.subscribe(async () => {
                try {
                    const updateFound = await this.updates.checkForUpdate();
                    console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
                } catch (err) {
                    console.error('Failed to check for updates:', err);
                }
            });
        }

        this.updates.versionUpdates
            .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
            .subscribe(() => {
                this.messageService.add({key: 'version', severity: 'info', closable: false});
            });
    }
}
