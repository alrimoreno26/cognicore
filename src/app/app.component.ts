import {Component, HostListener, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url === '/redirect') {
                    this.router.navigateByUrl('/');
                }
            }
        });
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
    closeToast(): void {
        document.location.reload();
    }
}
