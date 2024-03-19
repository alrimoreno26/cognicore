import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '../../../core/services/API/user.service';
import {fromUsersActions} from './users.actions';

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private service: UserService
    ) {
    }
    //
    loadAnalysts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsersActions.loadUsersList),
            switchMap(({id}) =>
                this.service.findAllAnalysts(id).pipe(
                    map((data) => fromUsersActions.loadUsersSuccess({data})),
                    catchError(error => of(fromUsersActions.usersFailRequest({error})))
                )
            )
        )
    );
    createAnalysts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsersActions.addUsers),
            switchMap(({data}) =>
                this.service.create(data).pipe(
                    switchMap(() => of(
                        fromUsersActions.loadUsersList({id: data.id}),
                    )),
                    catchError(error => of(fromUsersActions.usersFailRequest({error})))
                )
            )
        )
    );
    editConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsersActions.editUsers),
            switchMap(({data}) =>
                this.service.update(data).pipe(
                    switchMap(() => of(
                        fromUsersActions.loadUsersList({id: data.id}),
                    )),
                    catchError(error => of(fromUsersActions.usersFailRequest({error})))
                )
            )
        )
    );
    // deleteConfig$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromUsersActions.deleteConfiguration),
    //         switchMap(({id}) =>
    //             this.service.delete(id).pipe(
    //                 switchMap(() => of(
    //                     fromUsersActions.deleteConfigurationComplete(),
    //                     fromUsersActions.loadConfigurationList({lazy: {offset: 0, limit: 25}})
    //                 )),
    //                 catchError(error => of(fromUsersActions.loadDataSourceError({error})))
    //             )
    //         )
    //     )
    // );
}
