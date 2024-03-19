import {TemplateRef} from '@angular/core';
export interface Options {
    id?: number;
    value: string | number | null;
    name: string;
}

export interface TemplateSlot {
    name: string;
    template: TemplateRef<any>;
}

export interface LazyLoadData {
    page?: number;
    size?: number;
    first?: number;
    filter?: string;
    limit?: number;
    offset?:number;
    sort?: string;
    direction?: string;
}

export interface ConnectionsLazyLoad extends LazyLoadData {
    idbussiness?: string;
    idbrand?: string;
}

export interface LazyResultData<T> {
    content: Array<T>;
    totalElements: number;
    totalPages: number;
}

export interface RowReorder {
    dragIndex: number;
    dropIndex: number;
    item: any;
}
