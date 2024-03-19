import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {LazyLoadData} from "../models/table.model";

export interface BaseStore {
    /**
     * Init the state of service
     */
    initState: () => void;
    /**
     * Load by ID
     * @param data type T as any
     */
    loadById: (data: any) => void;
    /**
     * Load All data required for the store
     * @param data {@link LazyLoadData}
     */
    loadAll: (data?: LazyLoadData | Partial<LazyLoadData>) => void;
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
}


@Injectable({
    providedIn: 'root'
})
export class BaseStoreServices<T> implements BaseStore, OnDestroy {
    /**
     * Server side pagination and filter default value false
     */
    serverSide: boolean = true;
    /**
     * Server side pagination start on Init default value true
     */
    lazyLoadOnInit = true;
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
     */
    loaded!: boolean;
    loaded$!: Observable<boolean>;
    /**
     * Length value from list of Entities
     */
    total = 0;
    total$!: Observable<number>;
    /**
     * List of Entities type T
     */
    listEntities!: T[];
    listEntities$!: Observable<T[]>;
    /**
     * Selected Entity type T
     */
    selectedEntity!: T;
    selectedEntity$!: Observable<T | any>;
    /**
     * The dialog visibility
     */
    dialog = false;
    dialog$!: Observable<boolean>;
    /**
     * Keep all subscription of NgRx
     * @protected ngUnsubscribe Subject boolean
     */
    protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    /**
     * Reference of dialog
     * @private dialogRef {@link DynamicDialogRef}
     */
    protected dialogRef!: DynamicDialogRef;

    constructor() {
    }

    initState(): void {
    }

    /**
     * Clear subscription
     */
    ngOnDestroy(): void {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    loadById(data: any): void {
    }

    loadAll(data?: LazyLoadData | Partial<LazyLoadData>): void {
        if (data) {
            const {size, first} = data;
            this.pageSize = size ? size : 25;
            this.pageRecord = first ? first : 0;
        }
    }

    setSelected(data: any): void {
    }

    create(data: any): void {
    }

    update(data: any): void {
    }

    delete(id: number): void {
    }

    openModalAddOrEdit(state: boolean = false): void {
    }
}
