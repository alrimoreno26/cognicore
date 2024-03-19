import {computed, signal, Signal, WritableSignal} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {Observable, Subject} from 'rxjs';
import {BaseStoreI} from '../models';

export class BaseServices<T> implements BaseStoreI {
  /**
   * Keep the reference for pagination in lazy mode default value 0
   */
  pageRecord = 0;
  /**
   * Keep the reference for pagination number of row per page in lazy mode default value 25
   */
  pageSize = 25;
  /**
   * Show when the request is executing
   * the observable is for used in store ngrx and the plain value is always updated
   */
  loaded: WritableSignal<boolean> = signal(false);
  loaded$: Signal<boolean | undefined> = computed(() => this.loaded());
  /**
   * Length value from list of Entities
   * the observable is for used in store ngrx and the plain value is always updated
   */
  total: WritableSignal<number> = signal(0);
  total$: Signal<number | undefined> = computed(() => this.total());
  /**
   * List of Entities type T
   * the observable is for used in store ngrx and the plain value is always updated
   */
  listEntities: WritableSignal<T[]> = signal([]);
  listEntities$: Signal<T[] | undefined> = computed(() => this.listEntities());
  /**
   * Selected Entity type T
   * the observable is for used in store ngrx and the plain value is always updated
   */
  selectedEntity: WritableSignal<any> = signal(null);
  selectedEntity$: Signal<T | any> = computed(() => this.selectedEntity());
  /**
   * The dialog visibility
   * the observable is for used in store ngrx and the plain value is always updated
   */
  dialog: WritableSignal<boolean> = signal(false);
  dialog$: Signal<boolean | undefined> = computed(() => this.dialog());
  /**
   * Keep all subscription of NgRx
   * @protected ngUnsubscribe Subject boolean
   */
  protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  /**
   * Reference of dialog
   * @private dialogRef {@link DynamicDialogRef}
   */
  protected dialogRef: DynamicDialogRef;

  constructor() {
  }

  initState(): void {
  }

  loadAllForExport(): Signal<any> | Observable<any> {
    return this.listEntities$;
  }

  setSelected(data: any): void {
    throw (data);
  }

  create(data: any): void {
    throw (data);
  }

  update(data: any): void {
    throw (data);
  }

  delete(id: number | string): void {
    throw (id);
  }

  openModalAddOrEdit(): void {
  }

  destroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
