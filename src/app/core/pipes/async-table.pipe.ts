import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asyncTable'
})
export class AsyncTablePipe implements PipeTransform {
  transform(value: any[] | null | undefined): any[] {
    return value ? value : [];
  }
}
