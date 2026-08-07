import { HttpErrorResponse, HttpEventType, type HttpEvent, type HttpHandlerFn, type HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, tap, type Observable } from 'rxjs';
import { FrontendService } from '../data/frontend.service';
import { LOADING_ANIMATION, RETRY_COUNT } from './http-context-tokens';

export const httpInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const frontend = inject(FrontendService);

    return next(request).pipe(
        retry(request.context.get(RETRY_COUNT)),
        tap((event) => {
            if (request.context.get(LOADING_ANIMATION)) {
                if (event.type === HttpEventType.Sent) {
                    console.debug('[FFGBSY] HttpEventType = Sent', request.method, request.url);
                    frontend.showLoadingSpinner();
                }

                if (event.type === HttpEventType.Response) {
                    console.debug('[FFGBSY] HttpEventType = Response', request.method, request.url);
                    frontend.hideLoadingSpinner();
                }
            }
        }),
        catchError((error: any) => {
            frontend.hideLoadingSpinner();
            if (error instanceof HttpErrorResponse) {
                console.error('[FFGBSY]', 'HTTP Error:', error);

                if (error.error.statusCode == 0) {
                    frontend.showOkAlert('Es konnte keine Verbindung hergestellt werden!', error.error.message);
                }

                if (error.error.statusCode == 500) {
                    frontend.showOkAlert('Unbekannter Kommunikationsfehler aufgetreten!', JSON.stringify(error.error.error));
                }
            }

            throw error;
        }),
    );
};
