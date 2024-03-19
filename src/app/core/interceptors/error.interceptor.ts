import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageServices} from '../injects/message.services';
import {AuthService} from '../../auth/service/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private readonly injector: Injector,
                private authService: AuthService,
                private oauthService: OAuthService,
                private messageService: MessageServices) {
    }

    /**
     * Intercept all HTTP Errors, and if the request is Unauthenticated then send a Refresh Token API Call
     * @param request HttpRequest<any>
     * @param next HttpHandler
     * @return An Observable for HttpEvent
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                /**
                 * Switch for the error in the api response
                 */
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 0:
                            this.router.navigate(['/auth/error']).then();
                            this.getErrorFromApi('networkError.code500');
                            break;
                        case 400:
                            this.messageService.addError('Error From Server', 'Bad Request')
                            this.getErrorFromApi('networkError.code400', error?.error.error);
                            break;
                        case 401:
                            console.log('unauthorized');
                            this.oauthService.logOut();
                            break;
                        case 403:
                            this.router.navigate(['/auth/access']).then();
                            this.getErrorFromApi('networkError.code403');
                            break;
                        case 405:
                            this.getErrorFromApi('networkError.code405', error?.error?.message);
                            break;
                        case 415:
                            this.getErrorFromApi('networkError.code415', error?.error?.message);
                            break;
                        case 422:
                            this.getErrorFromApi('networkError.code422', error?.error?.message);
                            break;
                        case 500:
                            this.getErrorFromApi('networkError.code500',error?.error.statusText);
                            this.router.navigate(['/auth/error']).then();
                            break;
                        case 502:
                        case 503:
                            if(error?.error?.error.includes('Service Unavailable')){
                                this.getErrorFromApi('networkError.code500',error?.error.error);
                                this.router.navigate(['/service_unavailable']).then();
                            } else{
                                this.getErrorFromApi('networkError.code500',error?.error);
                                this.router.navigate(['/auth/error']).then();
                            }
                            break;
                        default:
                            /**
                             * Prints the unknown error for further treatment
                             */
                            // console.error(error);
                            this.getErrorFromApi('networkError.code0');
                            break;
                    }
                }
                return throwError(error);
            }));
    }

    /**
     * Fires the corresponding error message for the error returned by the api
     * @param error string
     * @param message string
     */
    public getErrorFromApi(error: string, message?: string): void {
        try {
            const translateService = this.injector.get(TranslateService);
            message ?
                this.messageService.addError(message) :
                this.messageService.addError(translateService.instant(error));
        } catch (e) {
            console.error('Load TranslateService');
        }
    }
}
