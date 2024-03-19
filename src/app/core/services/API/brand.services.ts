import {Injectable} from '@angular/core';
import {AbstractService} from '../abstract.services';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config';
import {ConnectionsLazyLoad} from '../../models/table.model';
import {map} from 'lodash';
import {buildURL} from '../../util';
import {BrandResponse} from '../../../modules/brand/models/brand.models';
import {silentIt} from '../../interceptors/spinner.interceptor';

@Injectable({
    providedIn: 'root'
})
export class BrandServices extends AbstractService<any> {
    constructor(private httpClient: HttpClient, private config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway() + `:${config.getApiPort()}/datasource/api/v2/brand`));
    }

    loadData(data: ConnectionsLazyLoad | Partial<ConnectionsLazyLoad>): Observable<BrandResponse> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/brand`);
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');
        return this.client.get(`${url}?${params}`);
    }

    override create(param: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/brand`);
        const send = {
            name: param.name,
            description: param.description,
            idBussiness: param.idBussiness,
            type: 'STATIC',
            configSetting: param.configSetting
        };
        return this.client.post(`${url}`, send);
    }

    createFromOnboarding(param: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/brand`);
        const send = {
            name: param.name,
            description: param.description,
            idBussiness: param.idBussiness,
            type: 'STATIC',
            configSetting: param.configSetting
        };
        return this.client.post(`${url}`, send, {
            context: silentIt(),
        });
    }

    override findOneById(id: any): Observable<any> {
        return this.client.get(`${this.basePath}/${id}`);
    }

    override update(params: any, id?: string): Observable<any> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/brand`);
        return this.client.put(`${url}/${id}`, params);
    }

    override delete(id: any): Observable<any> {
        return this.client.delete(`${this.basePath}/${id}`);
    }
}
