import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {LazyLoadData, LazyResultData, Options} from "../models/table.model";
import {silentIt} from '../interceptors/spinner.interceptor';

export class AbstractService<T> {
    public form: string;
    public client: any;
    public basePath: string;


    /**
     * @param client HttpClient angular client
     * @param path string endpoint url from base CRUD request
     * @param form string default value 'file'
     */
    constructor(client: HttpClient, path: string, form = 'files') {
        this.form = form;
        this.client = client;
        this.basePath = path;
    }

    /**
     * Fetch all elements without paging
     * @return An Observable T[]
     */
    findAll(): Observable<T[] | any> {
        return this.client.get(this.basePath);
    }

    /**
     * Fetch all elements with paging
     * @param paging any
     * @return An Observable T[]
     */
    findAllPaginate({page, size, filter, sort, direction}: LazyLoadData): Observable<LazyResultData<T>> {
        // @ts-ignore
        const params = new HttpParams().set('page', page).set('size', size)
            .set('filter', filter ? filter : '').set('sort', sort ? sort : '').set('direction', direction ? direction : '');
        return this.client.get(this.basePath, {params});
    }

    /**
     * Fetch element by Id
     * @param id number | string
     * @param hidden boolean
     * @return An Observable<T>
     */
    findOneById(id: any, hidden?: boolean): Observable<T> {
        return hidden ?
            this.client.get(this.basePath + '/' + id, {context: silentIt()}) :
            this.client.get(this.basePath + '/' + id);
    }

    /**
     * Fetch elements by dynamic path
     * @param params string[]
     * @return An Observable<T>
     */
    findOneByCriteria(...params: any): Observable<T> {
        return this.client.get(this.basePath + '/' + params.join('/'));
    }

    /**
     * Create element T
     * @param params T
     * @return An Observable<T>
     */
    create(params: any): Observable<any> {
        return this.client.post(this.basePath, params);
    }

    /**
     * Update element T
     * @param params T
     * @param id string
     * @return An Observable<T>
     */
    update(params: any, id?: string): Observable<any> {
        return id ? this.client.put(this.basePath + '/' + params[id], params) : this.client.put(this.basePath, params);
    }

    /**
     * Delete element by Id
     * @param id number | string
     * @return An Observable<T>
     */
    delete(id: any): Observable<T> {
        return this.client.delete(this.basePath + '/' + id);
    }

    /**
     * Upload Attachment
     * @param files File[]
     * @param otherParams optional Array<{ name: string; value: any; }> default value []
     * @param path string default '/upload'
     * @param form string optional
     * @return An Observable T | T[]
     */
    uploadAttachment(files: any, otherParams: Array<Options> = [], path: string = '/upload', form?: string): Observable<any> {
        const formData = new FormData();
        const formKey = form ? form : this.form;
        files instanceof FileList ?
            Array.from(files).forEach((f: any) => formData.append(formKey, f)) :
            files.forEach((f: any) => formData.append(formKey, f));
        if (otherParams.length) {
            // @ts-ignore
            otherParams.forEach(p => formData.append(p.name, p.value.toString()));
        }
        const response = this.client.post(this.basePath + path, formData);
        return response.pipe(map((data: any) => data));
    }

    /**
     * Delete Attachment by Id
     * @param id number | string
     * @return An Observable<T>
     */
    deleteAttachment(id: any): Observable<any> {
        return this.client.delete(`${this.basePath}/upload/${id}`);
    }

    /**
     * Post Attachment after created object
     * @param data any
     * @return An Observable<T>
     */
    postAttachment(data: any): Observable<any> {
        if (data.attachments.length !== 0) {
            const formData = new FormData();
            const id = data.id;
            data.attachments instanceof FileList ?
                Array.from(data.attachments).forEach((f: any) => formData.append(this.form, f)) :
                data.attachments.forEach((f: any) => formData.append(this.form, f));
            return this.client.post(`${this.basePath}/upload/${id}`, formData);
        } else {
            return of(data);
        }
    }
}
