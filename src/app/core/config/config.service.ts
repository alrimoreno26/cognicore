import {Inject, Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Config, ConfigState, Environment, ENVIRONMENT} from './model';
import {ConfigBuilder} from './model/config-builder';


/**
 *  Servicio que lee las configraciones de la aplicación.
 */
@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    state: BehaviorSubject<ConfigState> = new BehaviorSubject<ConfigState>(ConfigState.EMPTY);
    private config: Config;

    /**
     * Constructor.
     * @param httpClient HttpClient.
     * @param environment Entorno.
     */
    constructor(
        private readonly httpClient: HttpClient,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
        this.config = ConfigBuilder.newInstance().build();
    }

    /**
     *  Lee la configuración
     */
    load(): Observable<HttpErrorResponse | Config> {
        return this.httpClient
            .get<Config>(this.environment.configUrl, {
                headers: new HttpHeaders(),
            })
            .pipe(
                tap((config: Config) => {
                    this.config = config;
                    this.state.next(ConfigState.LOADED);
                    if (this.config !== undefined) {
                    }
                })
            )
            .pipe(catchError(this.handleError.bind(this)));
    }


    getConfiguration(): Config {
        return <Config> this.config;
    }

    getApiGateway(): string {
        return this.config.gateway;
    }

    getApiPort(): string {
        return this.config.port;
    }

    /**
     * Retorna un objeto de error cuando existe algun problema leyendo la configuración.
     * @param error
     */
    private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
        this.state.next(ConfigState.LOADED);
        this.config = ConfigBuilder.newInstance().build();
        return of(error);
    }
}
