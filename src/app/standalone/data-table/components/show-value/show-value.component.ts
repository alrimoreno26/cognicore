import {Component, Input} from '@angular/core';

@Component({
  selector: 'c-show-value',
  templateUrl: './show-value.component.html'
})
export class ShowValueComponent {
  /**
   * Input data in generic format
   */
  @Input() public data: any;

  constructor() {
  }
}
