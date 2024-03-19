import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config';
import {Observable, of} from 'rxjs';
import {buildURL} from '../../util';
import {AllBusinessTO, BusinessTO, CreatedTO} from '../../../modules/business/models';
import {AbstractService} from '../abstract.services';
import {silentIt} from '../../interceptors/spinner.interceptor';

@Injectable({
    providedIn: 'root'
})
export class BusinessService extends AbstractService<any> {
    constructor(private httpClient: HttpClient, public config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway() + `:${config.getApiPort()}/datasource/api/v2/business`));
    }

    loadAll(): Observable<AllBusinessTO> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/business`);
        return this.client.get(`${url}`);
    }

    override create(param: BusinessTO): Observable<CreatedTO> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/business`);
        return this.client.post(`${url}`, param,{
            context: silentIt(),
        });
    }

    override delete(id: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway() + `:${this.config.getApiPort()}/datasource/api/v2/business`);
        return this.client.delete(`${url}/${id}`);
    }

    loadData(): Observable<any> {
        return of([]);
    }
}
