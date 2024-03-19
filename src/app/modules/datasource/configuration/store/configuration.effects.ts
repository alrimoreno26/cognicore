import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fromDatasourceConfigurationsActions} from './configuration.actions';
import {DatasourceConfigurationServices} from '../../../../core/services/API/configuration.services';

@Injectable()
export class DatasourceConfigurationEffects {
    constructor(
        private actions$: Actions,
        private datasource: DatasourceConfigurationServices
    ) {
    }

    loadConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConfigurationsActions.loadConfigurationList),
            switchMap(({lazy}) =>
                this.datasource.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromDatasourceConfigurationsActions.loadDataSourceSuccess({data})),
                    catchError(error => of(fromDatasourceConfigurationsActions.loadDataSourceError({error})))
                )
            )
        )
    );
    createConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConfigurationsActions.addConfiguration),
            switchMap((param) =>
                this.datasource.create(param).pipe(
                    switchMap((response) => of(
                        fromDatasourceConfigurationsActions.addConfigurationComplete({data: response}),
                        fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromDatasourceConfigurationsActions.loadDataSourceError({error})))
                )
            )
        )
    );
    editConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConfigurationsActions.editConfiguration),
            switchMap(({data, id}) =>
                this.datasource.update(data, id).pipe(
                    switchMap((response) => of(
                        fromDatasourceConfigurationsActions.editConfigurationComplete({data: response}),
                        fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromDatasourceConfigurationsActions.loadDataSourceError({error})))
                )
            )
        )
    );
    deleteConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDatasourceConfigurationsActions.deleteConfiguration),
            switchMap(({id}) =>
                this.datasource.delete(id).pipe(
                    switchMap(() => of(
                        fromDatasourceConfigurationsActions.deleteConfigurationComplete(),
                        fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromDatasourceConfigurationsActions.loadDataSourceError({error})))
                )
            )
        )
    );
}
