import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import {SpinnerService} from '../../../core/services/spinner.service';


@Component({
    selector: 'app-spinner',
    template: `
        <p-blockUI [blocked]="spinnerService.block" styleClass="spinner">
            <ng-lottie
                    width="150px"
                    height="150px"
                    [options]="options"
            ></ng-lottie>
        </p-blockUI>
    `,
    styles: [`::ng-deep .spinner {
    z-index: 1000;
  } `]
})
export class SpinnerComponent {

    /**
     * Configurations to plugin ng-lottie
     */
    options: AnimationOptions = {
        path: '/assets/animations/spinner.json'
    };

    constructor(public spinnerService: SpinnerService) {
    }
}
