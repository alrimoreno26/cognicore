import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/service/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private oauthService: OAuthService) {
    }

    /**
     * Intercept all HTTP Calls and if has logged token and request url belongs to
     * the API server is add the Authorization token
     * @param request HttpRequest<any>
     * @param next HttpHandler
     * @return An Observable for HttpEvent
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isApiUrl = request.url.includes('auth/realms/') ||
            request.url.includes('/configuration') ||
            request.url.includes('/assets/i18n') ||
            request.url.includes('openid-connect')
        //
        if (!isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.oauthService.getAccessToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
