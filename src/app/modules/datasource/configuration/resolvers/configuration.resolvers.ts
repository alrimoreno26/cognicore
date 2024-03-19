import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {fromDatasourceConfigurationsActions} from '../store/configuration.actions';
import {DatasourceConfigurationPartialState} from '../store/configuration.reducers';
import {selectEntityLoaded} from '../store/configuration.selectors';

export const datasourceConfigurationResolvers: ResolveFn<boolean> = () => {
    const store = inject(Store<DatasourceConfigurationPartialState>);
    const loaded$ = store.pipe(select(selectEntityLoaded));

    return loaded$.pipe(
        filter(loaded => {
            if (!loaded) {
                store.dispatch(fromDatasourceConfigurationsActions.loadConfigurationList({lazy: {offset: 0, limit: 25}}));
            }
            return loaded;
        }),
        take(1)
    );
};
