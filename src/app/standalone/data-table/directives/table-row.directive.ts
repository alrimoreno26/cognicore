import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tableRow]'
})
export class TableRowDirective {
  private templateName: string;

  constructor(private templateRef: TemplateRef<any>) {
  }

  @Input({required: true}) set tableRow(name: string) {
    this.templateName = name;
  }

  get template(): TemplateRef<any> {
    return this.templateRef;
  }

  get name(): string {
    return this.templateName;
  }

}
