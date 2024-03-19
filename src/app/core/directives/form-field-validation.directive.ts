import {Directive, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Directive({
    selector: '[formFieldValidation]'
})
export class FormFieldValidationDirective implements OnInit, OnDestroy {

    /**
     * HTMLElement injected to display error message
     */
    small: HTMLElement;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private translate: TranslateService,
        @Self() private ngControl: NgControl
    ) {
    }

    /**
     * Bind class for valid state
     */
    @HostBinding('class.ng-valid')
    public get isValid(): boolean {
        return this.valid;
    }

    /**
     * Bind class for error state
     */
    @HostBinding('class.ng-dirty')
    public get isInvalid(): boolean {
        return this.invalid;
    }

    /**
     * Check valid conditions
     */
    get valid(): boolean {
        if (this.ngControl.valid && (this.ngControl.dirty || this.ngControl.touched)) {
            this.small.innerText = '';
            return true;
        }
        return false;
    }

    /**
     * Check invalid conditions for all type of error defined
     */
    get invalid(): boolean {
        if (!this.ngControl.pending && !this.ngControl.valid && (this.ngControl.touched || this.ngControl.dirty)) {
            const {required, mustMatch, pattern, cpf, minlength, cellPhone, email, cep, cnpj}: any = this.ngControl.errors;
            if (required) {
                this.small.innerText = this.translate.instant('formError.required');
            } else if (cnpj) {
                this.small.innerText = this.translate.instant('formError.cnpj');
            } else if (email) {
                this.small.innerText = this.translate.instant('formError.email');
            } else if (cpf) {
                this.small.innerText = this.translate.instant('formError.cpf');
            } else if (cellPhone) {
                this.small.innerText = this.translate.instant('formError.telefone');
            } else if (cep) {
                this.small.innerText = this.translate.instant('formError.cep');
            } else if (mustMatch) {
                this.small.innerText = this.translate.instant('formError.mustMatch');
            } else if (minlength) {
                this.small.innerText = this.translate.instant('formError.minlength', {value: minlength.requiredLength});
            } else if (pattern) {
                if (pattern.requiredPattern === '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,100}$') {
                    this.small.innerText = this.translate.instant('formError.strongPasswordPattern');
                }
            } else {
                /**
                 * Print form error for future treatment
                 */
                console.error(this.ngControl.errors);
            }
            return true;
        }
        return false;
    }

    ngOnInit(): void {
        /**
         * Inject HTMLElement in under control
         */
        this.small = this.renderer.createElement('small');
        this.small.className = 'block p-error';
        this.elementRef.nativeElement.parentElement.classList.value !== 'field' ?
            this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.small) :
            this.renderer.appendChild(this.elementRef.nativeElement.parentElement.parentElement, this.small);
    }

    /**
     * Remove HTMLElement when close dialog to avoid issue
     */
    ngOnDestroy(): void {
        if (this.small) {
            this.small.remove();
        }
    }
}
