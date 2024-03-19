import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {BrandConfigurationPartialState} from '../store/brand.configuration.reducers';
import {selectEntityLoaded} from '../store/brand.configuration.selectors';
import {fromBrandConfigurationsActions} from '../store/brand.configuration.actions';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs';
@Injectable()
export class brandConfigurationResolvers implements Resolve<boolean> {

    constructor(private store: Store<BrandConfigurationPartialState>,
                private router: Router) {
    }

    resolve(): Observable<boolean> {
        const loaded$ = this.store.pipe(select(selectEntityLoaded));

        return loaded$.pipe(
            filter(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromBrandConfigurationsActions.loadBrandConfigurationList({lazy: {offset: 0, limit: 25}}));
                }
                return loaded;
            }),
            take(1)
        );
    }
};
