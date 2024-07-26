import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonRippleEffect, IonRow } from '@ionic/angular/standalone';

@Component({
    selector: 'ffgbsy-init-tile',
    templateUrl: './init-tile.component.html',
    styleUrls: ['./init-tile.component.scss'],
    standalone: true,
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,
        IonRippleEffect,
        NgClass
    ]
})
export class InitTileComponent {
    iconName = input<string>();
    title = input.required<string>();
    subtitle = input<string>();
    success = input<boolean>(false);

    tileClass = computed(() => this.success() ? 'tile--success' : '');
}
