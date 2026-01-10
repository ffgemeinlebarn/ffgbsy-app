import { Component, inject } from '@angular/core';
import { IonBackdrop, IonSpinner } from '@ionic/angular/standalone';
import { FrontendService } from 'src/app/data/frontend.service';

@Component({
    selector: 'ffgbsy-frontend-loading',
    templateUrl: './frontend-loading.component.html',
    styleUrls: ['./frontend-loading.component.scss'],
    imports: [IonSpinner, IonBackdrop],
})
export class FrontendLoadingComponent {
    frontend = inject(FrontendService);
}
