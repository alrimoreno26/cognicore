import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config';
import {AbstractService} from '../abstract.services';
import {Injectable} from '@angular/core';
import {buildURL} from '../../util';
import {Observable} from 'rxjs';
import {MessageTO} from '../../../modules/chat/model';
import {map} from 'rxjs/operators';
import {silentIt} from '../../interceptors/spinner.interceptor';

@Injectable({
    providedIn: 'root'
})
export class ChatServices extends AbstractService<any> {
    constructor(private httpClient: HttpClient, private config: ConfigService) {
        super(httpClient, buildURL(config.getApiGateway()));
    }

    sendMessage(msg: any): Observable<MessageTO> {
        const sendAPI = {
            msg: msg.msg,
            step: msg.step,
            usr: msg.usr,
            brand: msg.brand,
            bussiness_id: msg.bussiness_id,
            required_visuals: msg.required_visuals,
            approved_generation: msg.approved_generation,
            ui_filters: msg.ui_filters
        };
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/botservice/api/v1/http/chat`);
        const response = this.httpClient.post(`${url}`, sendAPI, {
            context: silentIt(),
        });
        return response.pipe(map((data: any) => data));
    }

    saveGeneration(data: any): Observable<any> {
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/content-manager/contentmanager`);
        const response = this.httpClient.post(`${url}`, {...data}, {
            context: silentIt(),
        });
        return response.pipe(map((data: any) => data));
    }

    getNewImage(msg: any): Observable<any> {
        const data = {
            target: msg.target,
            age: msg.age,
            sex: msg.sex,
            facet: msg.personality,
            visuals_description: msg.description,
            brand: msg.domain,
            business_id: msg.business_id,
            generation_id: msg.generation_id,
            id: msg.id
        };
        const url = buildURL(this.config.getApiGateway()+`:${this.config.getApiPort()}/openaigeneration/api/v1/http/regenerate_visuals`);
        const response = this.httpClient.post(`${url}`, {...data}, {
            context: silentIt(),
        });
        return response.pipe(map((data: any) => data));
    }
}
