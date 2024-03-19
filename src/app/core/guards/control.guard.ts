import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth/service/auth.service';

export const canActivateControlGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ControlGuard).canActivate(route, state);
};
export const canActivateChildControlGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ControlGuard).canActivate(route, state);
};

@Injectable({
    providedIn: 'root'
})
export class ControlGuard {
    constructor(private authService: AuthService, private router: Router) {
    }

    /**
     * CanActivate the module if you find permission user inside of Roles
     * else redirect navigation to error access page
     * @param route {@link ActivatedRouteSnapshot}
     * @param state {@link RouterStateSnapshot}
     * @return An boolean value
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const {roles} = route?.data;
        if (this.authService.roleAccess(roles)) {
            return true;
        } else {
            this.router.navigate(['/static/access']).then();
        }
        return false;
    }

    /**
     * CanActivateChild checks the roles permission for the child pages
     * @param route {@link ActivatedRouteSnapshot}
     * @param state {@link RouterStateSnapshot}
     * @return An boolean value
     */
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
