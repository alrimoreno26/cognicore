import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tableExpansion]'
})
export class TableExpansionDirective {

  constructor(private templateRef: TemplateRef<any>) {
  }

  get template(): TemplateRef<any> {
    return this.templateRef;
  }
}
