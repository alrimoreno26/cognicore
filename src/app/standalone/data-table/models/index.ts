import {TemplateRef} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TableRowReorderEvent} from 'primeng/table';

import {BaseStoreI, LoadAllRequestI} from './base.store';

export {BaseStoreI, LoadAllRequestI};

export type pipe = 'number' | 'cpfCnpj' | 'date' | 'cep' | 'currency' | 'email' | 'tel' | 'shortMoney' |
  'accountant' | 'deep' | 'concat' | 'joinTextMap' | 'wrapText' | 'file' | 'cnae' | 'percent' | 'diffHour' | 'timeAgo';

export interface HeadersTable {
  // obligatorios
  field: string;
  header: string;
  visible: boolean;
  export: boolean;
  // opcionales
  pipe?: pipe;
  extraVal?: string;
  class?: string;
  width?: number;
  sort?: boolean;
  sortField?: string;
  context?: Array<MenuItem>;
  cFunc?: (data: any) => {};
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
  sort?: string;
  offset?:number;
  limit?: number;
  direction?: any;
}

export interface LazyResultData<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
}

export interface RowReorder extends TableRowReorderEvent {
  item: any;
}
