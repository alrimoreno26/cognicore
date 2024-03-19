import {Component} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ExportDataService} from '../../services/export.data.service';


@Component({
  selector: 'm-export-data-modal',
  templateUrl: './export-data-modal.component.html',
  styleUrls: ['./export-data-modal.component.scss']
})
export class ExportDataModalComponent {
  constructor(public ref: DynamicDialogRef,
              public service: ExportDataService) {
  }
}
