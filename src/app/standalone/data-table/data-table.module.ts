import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {PickListModule} from 'primeng/picklist';
import {ConfirmationService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {PipesModule} from '../../core/pipes/pipes.module';
import {DirectivesModule} from '../../core/directives/directives.module';

import {DataTableComponent} from './data-table.component';
import {ShowValueComponent} from './components/show-value/show-value.component';
import {ExportDataModalComponent} from './components/export-data-modal/export-data-modal.component';

import {TableRowDirective} from './directives/table-row.directive';
import {BaseComponentDirective} from './directives/base.component.directive';
import {TableExpansionDirective} from './directives/table-expansion.directive';
import {BaseModalComponentDirective} from './directives/base.modal.component.directive';
import {BaseModalDragComponentDirective} from './directives/base.modal.drag.component.directive';

import {RowTemplatePipe} from './pipes/row-template.pipe';

import {DialogService} from 'primeng/dynamicdialog';
import {ExportDataService} from './services/export.data.service';
import {BaseStoreServices} from './class/base.store.services';
import {BaseDragServices} from './class/base.drag.services';


@NgModule({
  declarations: [
    DataTableComponent,
    ShowValueComponent,
    ExportDataModalComponent,

    TableRowDirective,
    BaseComponentDirective,
    TableExpansionDirective,
    BaseModalComponentDirective,
    BaseModalDragComponentDirective,

    RowTemplatePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,

    PipesModule,
    DirectivesModule,

    MenuModule,
    TableModule,
    PickListModule,
    InputTextModule,
    SplitButtonModule,
    ConfirmDialogModule
  ],
  providers: [
    DecimalPipe, CurrencyPipe, DatePipe,
    ConfirmationService, DialogService,
    ExportDataService, BaseStoreServices, BaseDragServices
  ],
  exports: [
    DataTableComponent,
    TableRowDirective,
    TableExpansionDirective,

    PipesModule,
    DirectivesModule
  ]
})
export class DataTableModule {
}
