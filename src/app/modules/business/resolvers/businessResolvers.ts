import {inject, Injectable} from '@angular/core';
import {Resolve, ResolveFn} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {BusinessPartialState} from '../store/business.reducers';
import {selectEntityLoaded} from '../store/business.selectors';
import {fromBusinessActions} from '../store/business.actions';
import { Observable } from 'rxjs';



@Injectable()
export class BusinessResolvers implements Resolve<boolean> {
    constructor(private store: Store<BusinessPartialState>) {
    }

    resolve(): Observable<boolean> {
        const loaded$ = this.store.pipe(select(selectEntityLoaded));

        return loaded$.pipe(
            filter(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromBusinessActions.loadBusiness());
                }
                return loaded;
            }),
            take(1)
        );
    }
}
