import { Component, inject } from '@angular/core';
import { IonBackdrop, IonSpinner } from "@ionic/angular/standalone";
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-frontend-loading',
    templateUrl: './frontend-loading.component.html',
    styleUrls: ['./frontend-loading.component.scss'],
    standalone: true,
    imports: [IonSpinner, IonBackdrop,],
})
export class FrontendLoadingComponent {
    frontend = inject(FrontendService);
}
