
import { Injectable, inject } from '@angular/core';
import { FrontendService } from '../frontend/frontend.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {
    private frontend = inject(FrontendService);

    public globalApiErrorHandling(error: Error | any, silent: boolean = false): Observable<any> {

        if (!silent) {
            this.frontend.hideLoadingSpinner();

            if (error.status == 0) {
                this.frontend.showOkAlert("Es konnte keine Verbindung hergestellt werden!", error.message);
            }

            if (error.status == 500) {
                this.frontend.showOkAlert("Unbekannter Kommunikationsfehler aufgetreten!", error.message);
            }
        }

        throw error;
    }
}
