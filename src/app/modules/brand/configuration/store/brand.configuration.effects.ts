import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fromBrandConfigurationsActions} from './brand.configuration.actions';
import {BrandServices} from '../../../../core/services/API/brand.services';
import {BrandConfigurationsService} from '../service/brand.configurations.service';
import {BrandConfigurationServices} from '../../../../core/services/API/brand-configuration.services';

@Injectable()
export class BrandConfigurationEffects {
    constructor(
        private actions$: Actions,
        private service: BrandConfigurationServices
    ) {
    }

    loadConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandConfigurationsActions.loadBrandConfigurationList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromBrandConfigurationsActions.loadBrandConfigurationListSuccess({data})),
                    catchError(error => of(fromBrandConfigurationsActions.brandConfigurationError({error})))
                )
            )
        )
    );
    createConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandConfigurationsActions.addBrandConfiguration),
            switchMap((param) =>
                this.service.create(param).pipe(
                    switchMap((response) => of(
                        fromBrandConfigurationsActions.addBrandConfigurationComplete({data: response}),
                        fromBrandConfigurationsActions.loadBrandConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromBrandConfigurationsActions.brandConfigurationError({error})))
                )
            )
        )
    );
    editConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandConfigurationsActions.editBrandConfiguration),
            switchMap(({data, id}) =>
                this.service.update(data, id).pipe(
                    switchMap((response) => of(
                        fromBrandConfigurationsActions.editBrandConfigurationComplete({data: response}),
                        fromBrandConfigurationsActions.loadBrandConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromBrandConfigurationsActions.brandConfigurationError({error})))
                )
            )
        )
    );
    deleteConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandConfigurationsActions.deleteBrandConfiguration),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    switchMap(() => of(
                        fromBrandConfigurationsActions.deleteBrandConfigurationComplete(),
                        fromBrandConfigurationsActions.loadBrandConfigurationList({lazy: {offset: 0, limit: 25}})
                    )),
                    catchError(error => of(fromBrandConfigurationsActions.brandConfigurationError({error})))
                )
            )
        )
    );
}
