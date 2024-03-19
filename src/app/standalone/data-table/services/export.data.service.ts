import {Injectable, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {get, map} from 'lodash';
import * as XLSX from 'xlsx';
import {HeadersTable, pipe} from '../models';


@Injectable({
  providedIn: 'platform'
})
export class ExportDataService {
    sourceFields: HeadersTable[];
    targetFields: HeadersTable[] = [];

    // todo revisar el ciclo de dependencia
    constructor(@Optional() private translateService: TranslateService,
                @Optional() private numberPipe: DecimalPipe,
                @Optional() private currencyPipe: CurrencyPipe,
                @Optional() private datePipe: DatePipe) {
    }

    transform(pipeName: pipe, data: any): string | number {
        switch (pipeName) {
            case 'deep':
                return data.value ? get(data.value, data.extraVal) : '-';
            case 'date':
                return this.datePipe.transform(data.value, 'dd-MM-YYYY') as string;
            case 'currency':
                return this.currencyPipe.transform(data.value) as string;
            case 'number':
                return this.numberPipe.transform(data.value) as string;
            case 'concat':
                return this.translateService.instant(data?.extraVal + data.value);
            case 'wrapText':
            default:
                return data.value;
        }
    }

    exportExcel(listEntities: any): void {
        const headers: string[] = this.targetFields
            .map(header => this.translateService.instant(header?.header));

        const resp = map(listEntities, (rawEntityInfo: any) => {
            return this.targetFields.map(h => {
                if (h.cFunc) {
                    return h.cFunc(rawEntityInfo);
                } else if (h.pipe) {
                    return this.transform(h.pipe, {value: get(rawEntityInfo, h.field), extraVal: h.extraVal});
                } else {
                    return get(rawEntityInfo, h.field);
                }
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(resp);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatorio');
        XLSX.utils.sheet_add_aoa(worksheet, [headers], {origin: 'A1'});
        XLSX.writeFile(workbook, 'Relatorio.xlsx', {compression: true});

        this.targetFields = [];
    }
}
