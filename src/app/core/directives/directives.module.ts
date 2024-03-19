import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormResponsiveDirective} from './form-responsive.directive';
import {FormFieldValidationDirective} from './form-field-validation.directive';

@NgModule({
    declarations: [
        FormFieldValidationDirective,
        FormResponsiveDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormFieldValidationDirective,
        FormResponsiveDirective
    ]
})
export class DirectivesModule {
}
