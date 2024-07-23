import { Component, input } from '@angular/core';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
    selector: 'ffgbsy-page-spinner',
    templateUrl: './page-spinner.component.html',
    styleUrls: ['./page-spinner.component.scss'],
    standalone: true,
    imports: [IonSpinner]
})
export class PageSpinnerComponent {
    public title = input<string>('Lade Daten');
}
