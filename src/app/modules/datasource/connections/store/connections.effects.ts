import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fromDatasourceConnectionsActions} from './connections.actions';
import {ConnectionsServices} from '../../../../core/services/API/connections.services';

@Injectable()
export class DatasourceConnectionsEffects {
    constructor(
        private actions$: Actions,
        private service: ConnectionsServices
    ) {
    }

    loadConnections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.loadConnectionsList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromDatasourceConnectionsActions.loadConnectionsSuccess({data})),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );

    createConnections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.addConnections),
            switchMap((param) =>
                this.service.create(param).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.addConnectionsComplete(param),
                        fromDatasourceConnectionsActions.loadConnectionsList({lazy: {offset: 0, limit: 25, idbussiness: param.data.idBussiness,idbrand: param.data.idBrand}})
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );

    createFromOnboarding$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.addConnectionsFromRegister),
            switchMap((param) =>
                this.service.createFromOnboarding(param).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.addConnectionsComplete(param),
                        fromDatasourceConnectionsActions.loadConnectionsList({lazy: {offset: 0, limit: 25, idbussiness: param.data.idBussiness,idbrand: param.data.idBrand}})
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );

    createDatasourceRegister$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.addConnectionsRegister),
            switchMap((param) =>
                this.service.create(param).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.addConnectionsComplete(param),
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );
    editConnections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.editConnections),
            switchMap(({data, id}) =>
                this.service.update(data, id).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.editConnectionsComplete(),
                        fromDatasourceConnectionsActions.loadConnectionsList({lazy: {offset: 0, limit: 25, idbussiness: data.idBussiness}})
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );
    deleteConnections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.deleteConnections),
            switchMap(({id, businessId,brandId}) =>
                this.service.delete(id).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.deleteConnectionsComplete(id),
                        fromDatasourceConnectionsActions.loadConnectionsList({lazy: {offset: 0, limit: 25,idbrand: brandId, idbussiness: businessId}})
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );
    addConnectionsByBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConnectionsActions.addConnectionsByBrand),
            switchMap(({data, id}) =>
                this.service.createWithBrand(data,id).pipe(
                    switchMap(() => of(
                        fromDatasourceConnectionsActions.loadConnectionsList({lazy: {offset: 0, limit: 25, idbussiness: data.idBussiness, idbrand: id}})
                    )),
                    catchError(error => of(fromDatasourceConnectionsActions.loadConnectionsError({error})))
                )
            )
        )
    );
}
