import { Component, OnInit, input } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonRippleEffect, IonRow } from '@ionic/angular/standalone';

@Component({
    selector: 'app-init-tile',
    templateUrl: './init-tile.component.html',
    styleUrls: ['./init-tile.component.scss'],
    standalone: true,
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,
        IonRippleEffect
    ]
})
export class InitTileComponent {

    iconName = input<string>();
    title = input.required<string>();
    subtitle = input<string>();

}
