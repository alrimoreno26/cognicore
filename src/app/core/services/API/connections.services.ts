import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config';
import {ConnectionsLazyLoad, LazyResultData} from '../../models/table.model';
import {cloneDeep, map} from 'lodash';
import {buildURL} from '../../util';
import {ConnectionsTO} from '../../../modules/datasource/connections/models';
import {AbstractService} from '../abstract.services';
import {silentIt} from '../../interceptors/spinner.interceptor';

@Injectable({
    providedIn: 'root'
})
export class ConnectionsServices extends AbstractService<any> {
    constructor(private httpClient: HttpClient, public config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway()+`datasource/api/v2/datasource`));
    }

    findAllPaginateFilter(data: ConnectionsLazyLoad | Partial<ConnectionsLazyLoad>): Observable<LazyResultData<ConnectionsTO[]>> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.get(`${url}?${params}`);
    }
    loadAll(): Observable<ConnectionsTO[]> {
        return this.client.get(`${this.basePath}`);
    }

    override create(params: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.post(`${url}`, params.data);
    }

    createFromOnboarding(params: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.post(`${url}`, params.data, {
            context: silentIt(),
        });
    }

    override update(params: any, id?: string): Observable<any> {
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.put(`${url}/${id}`, params);
    }

    override delete(id: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.delete(`${url}/${id}`);
    }

    createWithBrand(data: ConnectionsTO, id?: string): Observable<any> {
        const temp = cloneDeep(data);
        temp.idBrand = id
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/datasource/api/v2/datasource`);
        return this.client.post(`${url}`, temp);
    }

}
