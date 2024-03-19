import {computed, signal, Signal, WritableSignal} from '@angular/core';
import {BaseServices} from './base.services';
import {LazyLoadData, LoadAllRequestI} from '../models';

export class BaseDragServices<T> extends BaseServices<T> implements LoadAllRequestI {

  /**
   * If total elements is loaded
   * the observable is for used in store ngrx and the plain value is always updated
   */
  totalElements: WritableSignal<number> = signal(0);
  totalElements$: Signal<number | undefined> = computed(() => this.totalElements());
  /**
   * Show when the request is executing
   * the observable is for used in store ngrx and the plain value is always updated
   */
  allLoaded$: Signal<boolean> = computed(() => {
    const totalElements = this.totalElements$();
    const total = this.total$();
    return totalElements !== undefined && total !== undefined && totalElements <= total;
  });

  loadAll(data?: LazyLoadData | Partial<LazyLoadData>): void {
    if (data) {
      const {size, page} = data;
      this.pageSize = size ? size : 25;
      this.pageRecord = page ? page : 0;
    }
  }

  setLoad(): void {
  }

  reload(): void {
  }

  dragEnd(data: any): void {
    throw (data);
  }

  dropEnd(data: any): void {
    throw (data);
  }
}
