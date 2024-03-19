import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fromBusinessActions} from './business.actions';
import {BusinessService} from '../../../core/services/API/business.services';
import {fromBrandActions} from '../../brand/settings/store/brand.actions';

@Injectable()
export class BusinessEffects {
    constructor(
        private actions$: Actions,
        private service: BusinessService
    ) {
    }

    loadBussiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBusinessActions.loadBusiness),
            switchMap(() =>
                this.service.loadAll().pipe(
                    switchMap((business) => {
                        const analyst = business.analysts.map(a=>{
                            return {...a, analyst: true}
                        });
                        const localSelected = JSON.parse(localStorage.getItem('selectedBusiness'));
                        if (localSelected !== null) {
                            if (business.owner.concat(analyst).filter(b => b.id === localSelected.id).length > 0) {
                                return of(
                                    fromBusinessActions.loadBusinessComplete({data: business}),
                                    fromBusinessActions.loadInitialData({entity: localSelected}));
                            } else{
                                return of(
                                    fromBusinessActions.loadBusinessComplete({data: business}));
                            }
                        }
                        return of(
                            fromBusinessActions.loadBusinessComplete({data: business}));
                    }),
                    catchError(error => of(fromBusinessActions.businessError({error})))
                )
            )
        )
    );
    loadInformationByBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBusinessActions.loadInitialData),
            switchMap(({entity}) =>
                this.service.loadData().pipe(
                    switchMap(() => {
                        return of(fromBrandActions.loadInitialDataBrand({entity: entity.id}));
                    }),
                    catchError(error => of(fromBusinessActions.businessError({error})))
                )
            )
        )
    );
    createConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBusinessActions.addBusiness),
            switchMap(({data}) =>
                this.service.create(data).pipe(
                    switchMap((response) => of(
                        fromBusinessActions.addBusinessComplete({response}),
                        fromBusinessActions.loadBusiness()
                    )),
                    catchError(error => of(fromBusinessActions.businessError({error})))
                )
            )
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBusinessActions.deleteBusiness),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    switchMap(() => of(
                        fromBusinessActions.deleteBusinessComplete({id}),
                        fromBusinessActions.loadBusiness()
                    )),
                    catchError(error => of(fromBusinessActions.businessError({error})))
                )
            )
        )
    );
}
