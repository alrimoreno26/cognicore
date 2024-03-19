import {Directive, HostBinding, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Directive({
    selector: '[formResponsive]'
})
export class FormResponsiveDirective implements OnInit {
    /**
     * Set custom width or keep default
     */
    @Input('width') customWidth = '500px';
    /**
     * Bind width to changes value according resolution changes
     */
    @HostBinding('style.width') width: string;

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    if (state.breakpoints[Breakpoints.XSmall]) {
                        this.width = '95vw';
                    } else if (state.breakpoints[Breakpoints.Small]) {
                        this.width = '75vw';
                    }
                } else {
                    this.width = this.customWidth;
                }
            });
    }
}
