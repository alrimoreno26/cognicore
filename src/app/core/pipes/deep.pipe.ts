import {Pipe, PipeTransform} from '@angular/core';
import {get} from 'lodash';

@Pipe({
  name: 'deep'
})
export class DeepPipe implements PipeTransform {

  /**
   * Make get from lodash
   * @param value object
   * @param extraVal string
   */
  transform({value, extraVal}: any): string {
    return value ? get(value, extraVal) : '-';
  }
}
