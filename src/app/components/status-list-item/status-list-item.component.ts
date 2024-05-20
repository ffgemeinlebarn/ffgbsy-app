import { Component, computed, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CheckStatus } from 'src/app/types/check-status.type';

@Component({
    selector: 'ffgbsy-status-list-item',
    templateUrl: './status-list-item.component.html',
    styleUrls: ['./status-list-item.component.scss'],
    standalone: true,
    imports: [
        IonItem,
        IonLabel,
        IonIcon
    ]
})
export class StatusListItemComponent {
    public status = input<CheckStatus>();

    public icon = computed(() => {
        switch (this.status()) {
            case 'busy': return 'radio-button-on';
            case 'warning': return 'alert-circle';
            case 'success': return 'checkmark-circle';
            case 'error': return 'close-circle';
            default: return 'radio-button-off';
        };
    });

    public color = computed(() => {
        switch (this.status()) {
            case 'busy': return 'primary';
            case 'warning': return 'warning';
            case 'success': return 'success';
            case 'error': return 'danger';
            default: return 'light';
        };
    });
}
