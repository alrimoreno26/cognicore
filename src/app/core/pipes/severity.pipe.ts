import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'severity'
})
export class SeverityPipe implements PipeTransform {

    /**
     * Returno color of severity badge
     * @param value string
     * @return An 'success' | 'warning' | 'danger' | 'info'
     */
    transform(value: string): 'success' | 'warning' | 'danger' | 'info' {
        switch (value) {
            case 'CRM':
                return 'success';
            default:
                return 'info';
        }
    }
}
