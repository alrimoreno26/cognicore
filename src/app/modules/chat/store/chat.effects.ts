import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ChatServices} from '../../../core/services/API/chat.services';
import {fromChatActions} from './chat.actions';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ChatEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatServices
    ) {
    }

    sendMessage = createEffect(() =>
        this.actions$.pipe(
            ofType(fromChatActions.sendMessageChat),
            switchMap((message) =>
                this.chatService.sendMessage(message.data).pipe(
                    map((data) =>
                        fromChatActions.sendMessageChatComplete({response: {message:data, show: message.show}})
                    ),
                    catchError(({error}) =>
                        of(fromChatActions.chatFail({error}))
                    )
                )
            )
        )
    );

    saveGeneration = createEffect(() =>
        this.actions$.pipe(
            ofType(fromChatActions.saveGeneration),
            switchMap(({data}) =>
                this.chatService.saveGeneration(data).pipe(
                    map((data) =>
                        fromChatActions.saveGenerationComplete()
                    ),
                    catchError(({error}) =>
                        of(fromChatActions.chatFail({error}))
                    )
                )
            )
        )
    );

    newImage = createEffect(() =>
        this.actions$.pipe(
            ofType(fromChatActions.getNewImage),
            switchMap((message) =>
                this.chatService.getNewImage(message).pipe(
                    map((data:any) =>
                        fromChatActions.getNewImageComplete({ payload: data })
                    ),
                    catchError(({ error }) =>
                        of(fromChatActions.getNewImageFail({ error }))
                    )
                )
            )
        )
    );
}
