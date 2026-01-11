import { HttpErrorResponse, type HttpEvent, type HttpHandlerFn, type HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, type Observable } from 'rxjs';
import { FrontendService } from '../data/frontend.service';

export function apiErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const frontend = inject(FrontendService);

    return next(request).pipe(
        catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
                console.error('[FFGBSY]', 'HTTP Error:', error.error.error);
                frontend.hideLoadingSpinner();

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
}
