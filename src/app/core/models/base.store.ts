import {Signal} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyLoadData} from './table.model';

export interface BaseStoreI {
  /**
   * Init the state of service
   */
  initState: () => void;
  /**
   * Load All data from server for print
   */
  loadAllForExport: () => Signal<any> | Observable<any>;
  /**
   * Set selected item for actions
   * @param data type T as any
   */
  setSelected: (data: any) => void;
  /**
   * Create a new Entity
   * @param data type T as any
   */
  create: (data: any) => void;
  /**
   * Update Entity
   * @param data type T as any
   */
  update: (data: any) => void;
  /**
   * Delete Entity by id
   * @param id number
   */
  delete: (id: number) => void;
  /**
   * Open modal for Add or Edit element type T
   */
  openModalAddOrEdit: () => void;
  /**
   * Used for destroy all references
   */
  destroy: () => void;
}

export interface LoadAllRequestI {
  /**
   * Load All data required for the store
   * @param data {@link LazyLoadData}
   */
  loadAll: (data?: LazyLoadData | Partial<LazyLoadData>) => void;
}
