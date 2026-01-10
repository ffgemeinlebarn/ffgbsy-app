import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FrontendService } from './frontend.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {
    private frontend = inject(FrontendService);

    public globalApiErrorHandling(
        error: Error | any,
        silent: boolean = false
    ): Observable<any> {
        if (!silent) {
            this.frontend.hideLoadingSpinner();

            if (error.status == 0) {
                this.frontend.showOkAlert(
                    'Es konnte keine Verbindung hergestellt werden!',
                    error.message
                );
            }

            if (error.status == 500) {
                this.frontend.showOkAlert(
                    'Unbekannter Kommunikationsfehler aufgetreten!',
                    error.message
                );
            }
        }

        throw error;
    }
}
