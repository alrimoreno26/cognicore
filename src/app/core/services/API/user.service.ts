import {Injectable} from '@angular/core';
import {AbstractService} from '../abstract.services';
import {ConnectionsLazyLoad, LazyResultData} from '../../models/table.model';
import {Observable} from 'rxjs';
import {ConnectionsTO} from '../../../modules/datasource/connections/models';
import {map} from 'lodash';
import {buildURL} from '../../util';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractService<any> {
    constructor(private httpClient: HttpClient, public config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway() + `:${config.getApiPort()}/datasource/api/v2/business`));
    }

    findAllAnalysts(id: string): Observable<string[]> {
        return this.client.get(`${this.basePath}/${id}/analysts`);
    }

    override create(params: any): Observable<any> {
        return this.client.put(`${this.basePath}/${params.id}/analysts/${params.user}`,);
    }

    override update(params: any): Observable<any> {
        return this.client.put(`${this.basePath}/${params.id}/analysts`, params.user);
    }
}
