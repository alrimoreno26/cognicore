import {inject, Injectable} from '@angular/core';
import {Resolve, ResolveFn, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {datasourceConnectionsPartialState} from '../store/connections.reducers';
import {DatasourceConfigurationPartialState} from '../../configuration/store/configuration.reducers';
import {selectEntityLoaded} from '../store/connections.selectors';
import {fromDatasourceConfigurationsActions} from '../../configuration/store/configuration.actions';
import {fromDatasourceConnectionsActions} from '../store/connections.actions';
import {BusinessPartialState} from '../../../business/store/business.reducers';
import {selectEntity} from '../../../business/store/business.selectors';
import {Observable} from 'rxjs';
import {fromBusinessActions} from '../../../business/store/business.actions';

@Injectable()
export class datasourceConnectionsResolvers implements Resolve<boolean> {

    constructor(private store: Store<datasourceConnectionsPartialState>,
                private storePartial: Store<DatasourceConfigurationPartialState>,
                private storeBusiness: Store<BusinessPartialState>,
                private router: Router) {
    }

    resolve(): Observable<boolean> {
        const loaded$ = this.store.pipe(select(selectEntityLoaded));
        const selectedBussiness = this.storeBusiness.pipe(select(selectEntity));
        let loadedBussiness$ = false;
        selectedBussiness.subscribe(selected => {
            if (selected !== undefined) {
                loadedBussiness$ = true;
            }
        });
        if (loadedBussiness$ === false) {
            this.router.navigate(['/']).then();
        }
        return loaded$.pipe(
            filter(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 10}}));
                }
                return loaded;
            }),
            take(1)
        );
    }
};
