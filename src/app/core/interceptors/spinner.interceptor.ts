import {Injectable} from '@angular/core';
import {HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {finalize, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SpinnerService} from '../services/spinner.service';

const SILENT = new HttpContextToken<boolean>(() => false);

export function silentIt(): HttpContext {
    return new HttpContext().set(SILENT, true);
}

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinner: SpinnerService) {
    }

    /**
     * Intercept all HTTP Call to manage the global spinner, keeping counter
     * to lunch and hide the spinner automatic
     * @param request HttpRequest<any>
     * @param next HttpHandler
     * @return An Observable for HttpEvent
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.context.get(SILENT) && !request.url.includes('assets/i18n')) {
            if(request.url.includes('auth/realms')){
                this.spinner.setLoading(false, request.url);
            } else{
                if(!request.url.includes('/chat')){
                    this.spinner.setLoading(true, request.url);
                }
            }
        }
        return next.handle(request)
            .pipe(catchError((err) => {
                this.spinner.setLoading(false, request.url);
                return throwError(err);
            }))
            .pipe(map<any, any>((evt: HttpEvent<any>) => {
                    if (evt instanceof HttpResponse &&
                        !request.context.get(SILENT) &&
                        !request.url.includes('assets/i18n') &&
                        !request.url.includes('auth/realms')) {
                        this.spinner.setLoading(false, request.url);
                    }
                    return evt;
                }),
                finalize(() => {
                    if (this.spinner.checkUrlOrphan(request.url)) {
                        this.spinner.setLoading(false, request.url);
                    }
                }));
    }
}
