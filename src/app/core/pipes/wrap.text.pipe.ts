import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wrapText'
})
export class WrapTextPipe implements PipeTransform {

  /**
   * Extract a length from text and concat ...
   * @param value string
   * @param length number default value 60
   * @return An string
   */
  transform(value: string, length = 60): string {
    return (value.length > length) ? value.slice(0, length - 3) + '...' : value;
  }
}
