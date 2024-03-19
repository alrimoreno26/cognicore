import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {domainEnum, UserAuthenticated} from '../model';
import {flatMap} from 'lodash';
import {v4 as uuid} from 'uuid';
import * as jwt_decode from 'jwt-decode';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {


    userLogged$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    access_token$: BehaviorSubject<any> = new BehaviorSubject<string>(null);


    constructor(
                private router: Router,
                private oauthService: OAuthService) {
    }

    mapResponse(response: Observable<any>) {
        return response.pipe(map((data: any) => data));
    }

    get userLogged(): any {
        return this.userLogged$.getValue();
    }

    setUserLogged$(userLogged: any): void {
        this.userLogged$.next({...userLogged, session_id: uuid()});
    }

    setRoleAnalyst$(userLogged: any): void {
        const roles = userLogged.roles.push('ANALYST');
        this.userLogged$.next({...userLogged});
    }

    removeRoleAnalyst$(userLogged: any): void {
        userLogged.roles = userLogged.roles.filter(x => x !== 'ANALYST');
        this.userLogged$.next({...userLogged});
    }

    login(): void {
        this.router.navigate(['/chat']).then();
    }

    logout(): void {
        this.oauthService.logOut();
    }

    errorLoadKeycloack() {
        this.router.navigate(['/keycloack']).then();
    }

    adminUsers() {
        this.router.navigate(['/users']).then();
    }

    roleAccess(roles: Array<domainEnum> = []): boolean {
        const list = flatMap(roles.map(r => this.userLogged.roles.filter(f => f === r)));
        return list.length > 0;
    }

    getUserByJwtToken(token: string){
        if(token !== null && this.userLogged === null){
            const decode:any =  jwt_decode.jwtDecode(token)
            const user: UserAuthenticated = {
                username: decode.preferred_username,
                session_id: decode.sid,
                firstName: decode.name.split(' ')[0],
                lastName: decode.name.split(' ')[0],
                roles: decode.resource_access.ClientCognicore.roles
            };
            // user.roles = this.keycloakService.getUserRoles(false);
            this.setUserLogged$(user);
        }

    }
}
