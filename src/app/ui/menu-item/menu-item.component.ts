import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonItem, IonLabel, IonMenuToggle } from '@ionic/angular/standalone';

@Component({
    selector: 'ffgbsy-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonMenuToggle, IonItem, IonLabel, IonIcon, RouterLink],
})
export class MenuItemComponent {
    public icon = input<string | null>(null);
    public link = input<string>('');
    public disabled = input<boolean>(false);
}
