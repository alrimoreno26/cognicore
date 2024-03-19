import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fromBrandActions} from './brand.actions';
import {BrandServices} from '../../../../core/services/API/brand.services';
import {fromBusinessActions} from '../../../business/store/business.actions';
import {fromDatasourceConnectionsActions} from '../../../datasource/connections/store/connections.actions';

@Injectable()
export class BrandEffects {
    constructor(
        private actions$: Actions,
        private service: BrandServices
    ) {
    }

    loadInformationByBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.loadInitialDataBrand),
            switchMap(({entity}) =>
                this.service.loadData({offset: 0, limit: 25, idbussiness: entity}).pipe(
                    switchMap((response) => {
                        return of(
                            fromBrandActions.loadBrandSuccess({data: response}),
                            fromDatasourceConnectionsActions.loadConnectionsList({
                                lazy: {
                                    offset: 0,
                                    limit: 25,
                                    idbussiness: entity,
                                    idbrand: response.data[0].id
                                }
                            }),
                        );
                    }),
                    catchError(error => of(fromBusinessActions.businessError({error})))
                )
            )
        )
    );
    createBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.addBrand),
            switchMap((param) =>
                this.service.create(param).pipe(
                    switchMap((response) => {
                        console.log(response);
                        return of(
                            fromBrandActions.addBrandSuccess({response}),
                            // fromBrandActions.loadBrandList({lazy: {offset: 0, limit: 25, idbussiness: param.data.idBussiness}})
                        );
                    }),
                    catchError(error => of(fromBrandActions.brandError({error})))
                )
            )
        )
    );
    addBrandFromOnboarding$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.addBrandFromOnboarding),
            switchMap((param) =>
                this.service.createFromOnboarding(param).pipe(
                    switchMap((response) => {
                        console.log(response);
                        return of(
                            fromBrandActions.addBrandSuccess({response}),
                            // fromBrandActions.loadBrandList({lazy: {offset: 0, limit: 25, idbussiness: param.data.idBussiness}})
                        );
                    }),
                    catchError(error => of(fromBrandActions.brandError({error})))
                )
            )
        )
    );
    createBrandFromBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.createBrandFromBusiness),
            switchMap(({brand, datasource}) =>
                this.service.create(brand).pipe(
                    switchMap((response) => {
                        console.log(response.id);
                        return of(
                            fromBrandActions.createBrandFromBusinessSuccess({response}),
                            fromDatasourceConnectionsActions.addConnectionsByBrand({data: datasource, id: response.id}),
                            fromBrandActions.loadBrandList({lazy: {offset: 0, limit: 25, idbussiness: brand.idBussiness}}),
                        );
                    }),
                    catchError(error => of(fromBrandActions.brandError({error})))
                )
            )
        )
    );

    editBrands$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.editBrand),
            switchMap(({data, id}) =>
                this.service.update(data, id).pipe(
                    switchMap(() => of(
                        fromBrandActions.editBrandSuccess(),
                        fromBrandActions.loadBrandList({lazy: {offset: 0, limit: 25, idbussiness: data.idBussiness}})
                    )),
                    catchError(error => of(fromBrandActions.brandError({error})))
                )
            )
        )
    );

    deleteBrands$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBrandActions.deleteBrand),
            switchMap(({id, businessId}) =>
                this.service.delete(id).pipe(
                    switchMap(() => of(
                        fromBrandActions.deleteBrandSuccess(),
                        fromBrandActions.loadBrandList({lazy: {offset: 0, limit: 25, idbussiness: businessId}})
                    )),
                    catchError(error => of(fromBrandActions.brandError({error})))
                )
            )
        )
    );
}
