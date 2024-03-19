import {Injectable} from '@angular/core';
import {AbstractService} from '../abstract.services';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config';
import {LazyLoadData} from '../../models/table.model';
import {map} from 'lodash';
import {buildURL} from '../../util';
import {ConfigType} from '../../../modules/datasource/configuration/models';
import {silentIt} from '../../interceptors/spinner.interceptor';

@Injectable({
    providedIn: 'root'
})
export class BrandConfigurationServices extends AbstractService<any> {
    constructor(private httpClient: HttpClient, private config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway() + `:${config.getApiPort()}/datasource/api/v2/configbrand`));
    }

    findAllPaginateFilter(data: LazyLoadData | Partial<LazyLoadData>): Observable<ConfigType[]> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/configbrand`);
        return this.client.get(`${url}?${params}`, {
            context: silentIt(),
        });
    }

    override create(param: any): Observable<any> {
        return this.client.post(`${this.basePath}`, param.data);
    }

    override findOneById(id: any): Observable<any> {
        return this.client.get(`${this.basePath}/${id}`);
    }

    override update(params: any, id?: string): Observable<any> {
        return this.client.put(`${this.basePath}/${id}`, params);
    }

    override delete(id: any): Observable<any> {
        return this.client.delete(`${this.basePath}/${id}`);
    }
}
