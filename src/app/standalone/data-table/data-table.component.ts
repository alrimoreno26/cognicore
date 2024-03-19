import {Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Table, TableLazyLoadEvent, TableRowReorderEvent} from 'primeng/table';
import {BaseStoreServices} from './class/base.store.services';
import {HeadersTable, RowReorder} from './models';
import {TableRowDirective} from './directives/table-row.directive';
import {TableExpansionDirective} from './directives/table-expansion.directive';
import {Menu} from 'primeng/menu';


@Component({
  selector: 'c-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  /**
   * Element ref to track in data table
   */
  @Input() dataKey = 'id';
  /**
   * Set custom css class to de table
   */
  @Input() class = '';
  /**
   * Set mode row drag and drop in the table default is false
   */
  @Input() rowDragAndDrop = false;
  /**
   * Set mode row expansion in the table default is false
   */
  @Input() rowExpansion = false;
  /**
   * For enable pagination table default value true
   */
  @Input() pagination = true;
  /**
   * Array the values for the pagination default value 25, 50, 100
   */
  @Input() rowsPerPageOptions: number[] = [25, 50, 75, 100];
  /**
   * The available table Headers
   */
  @Input() headers: HeadersTable[] = [];
  /**
   * Service inject data from store
   */
  @Input() service: BaseStoreServices<any>;
  /**
   * List of items inside of Button Split type {@link MenuItem}
   */
  @Input() itemsSplit: MenuItem[] = [];
  /**
   * Action column default true
   */
  @Input() action = true;
  /**
   * Show Create Button Action
   */
  @Input() showCreate = true;
  /**
   * Icon for create Button
   */
  @Input() iconCreate = 'pi-plus';
  /**
   * Show Edit Button Action
   */
  @Input() showEdit = true;
  /**
   * Icon for edit Button
   */
  @Input() iconEdit = 'pi-pencil';
  /**
   * Show Delete Button Action
   */
  @Input() showDelete = true;
  /**
   * Icon for delete Button
   */
  @Input() iconDelete = 'pi-trash';
  /**
   * List of source items optional use service
   */
  @Input() items: any[];
  /**
   * Toggle export button
   */
  @Input() exportBtn = true;
  /**
   * EventEmitter for create Action launch the modal
   */
  @Output() create: EventEmitter<void> = new EventEmitter<void>();
  /**
   * EventEmitter for edit Action launch the modal width current value of row item
   */
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  /**
   * EventEmitter for Export Action. launch the export feature
   */
  @Output() export: EventEmitter<any> = new EventEmitter<any>();
  /**
   * EventEmitter for delete Action confirm action before emit the event
   */
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  /**
   * EventEmitter for row drag and drop action event
   */
  @Output() onRowReorder: EventEmitter<RowReorder> = new EventEmitter<RowReorder>();
  /**
   * Input for control search state
   */
  @ViewChild('inputSearch', {static: false}) input: ElementRef;
  @ViewChild('menu', {static: false}) menu: Menu;
  /**
   * List of templates inside of table
   */
  @ContentChild(TableExpansionDirective) expansionRow!: TableExpansionDirective;
  @ContentChildren(TableRowDirective) contentChildren!: QueryList<TableRowDirective>;
  /**
   * Contains the search value
   */
  search: string;
  /**
   * Content all extra action in menu overflow for keep more clean the table
   */
  contextAction: MenuItem[] | undefined;
  /**
   * Set custom names to tooltips to the actions in table
   */
  name = '';

  constructor(private routing: ActivatedRoute,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.headers = this.headers.filter(header => header.visible);
    if (this.action && this.headers.length) {
      const {context}: HeadersTable = this.headers[this.headers.length - 1];
      this.contextAction = context ?
        context.map((m: MenuItem) => ({...m, label: this.translateService.instant(m?.label ? m?.label : '')})) :
        undefined;
    }
    /**
     * Extract metadata from routing
     */
    this.routing.data.subscribe((r: any) => this.name = r?.name);
  }

  /**
   * It's for lazy load of data, filters and sort elements direct in API server
   * @param $event {@link TableLazyLoadEvent}
   */
  loadCustomLazy($event: TableLazyLoadEvent): void {
    const {first, rows, globalFilter, sortField, sortOrder} = $event;
    this.service.loadAll({
      page: first as number / (rows as number),
      size: rows ? rows : 25,
      filter: globalFilter ? globalFilter as string : '',
      sort: sortField as string,
      direction: sortField ? sortOrder === 1 ? 'ASC' : 'DESC' : sortField,
      first
    });
  }

  /**
   * Make the global filter over data elements
   * @param event Event
   * @param dt {@link Table}
   */
  setGlobalFilter(event: { target: { value: string; } } | any, dt: Table): void {
    const {value} = event.target;
    this.search = event.target.value;
    dt.filterGlobal(value, 'contains');
  }

  /**
   * Set the selected item in the store for future work
   * @param event Event
   * @param data any
   */
  setSelectedRow(event: any, data: any): void {
    this.menu.toggle(event);
    this.service.setSelected(data);
  }

  /**
   * Emit the create event and set dialog in true
   */
  createItem(): void {
    if (this.service && this.showCreate) {
      this.service.openModalAddOrEdit();
    }
    this.create.emit();
  }

  /**
   * Emit the edit event and set dialog in true
   * @param item any
   */
  editItem(item: any): void {
    if (this.service && this.showEdit) {
      this.service.openModalAddOrEdit();
    }
    this.edit.emit(item);
  }

  /**
   * Confirm the action of delete before emit the event
   * @param event {@link Event}
   * @param item any
   */
  deleteItem(event: { target: any }, item: any): void {
    this.confirmationService.confirm({
      key: 'deleteDataTable',
      message: this.translateService.instant('common.textConfirmDelete'),
      acceptLabel: this.translateService.instant('common.yes'),
      rejectLabel: this.translateService.instant('common.cancel'),
      icon: 'pi pi-alert-outline',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-close',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.delete.emit(item);
        if (this.service) {
          this.service.delete(item[this.dataKey]);
        }
      }
    });
  }

  /**
   * Method recharges the data of the table
   */
  refreshContentData(dt: Table): void {
    this.service.serverSide ? this.service.loadAll({
      page: 0,
      size: dt.rows,
      filter: undefined,
      sort: undefined,
      direction: undefined
    }) : this.service.loadAll();
    this.input.nativeElement.value = '';
    dt.filters = {};
  }

  /**
   * Emit event drag and drop for row table
   * @param event TableRowReorderEvent
   * @param dt {@link Table}
   */
  rowReorder(event: TableRowReorderEvent, dt: Table): void {
    this.onRowReorder.emit({...event, item: dt.value[event.dropIndex as number]});
  }

  /**
   * Trigger the export feature
   */
  showPrintModal(): void {
    this.export.emit(this.service.loadAllForExport());
  }
}
