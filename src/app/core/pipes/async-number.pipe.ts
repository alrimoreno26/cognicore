import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asyncNumber'
})
export class AsyncNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    return value ? value : 0;
  }
}
