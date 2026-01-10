import { Component, inject } from '@angular/core';
import {
    IonButton,
    IonIcon,
    IonList,
    IonMenuToggle,
} from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { MenuItemComponent } from '../../ui/menu-item/menu-item.component';

@Component({
    selector: 'ffgbsy-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [
        IonIcon,
        IonList,
        IonMenuToggle,
        IonButton,
        IonIcon,
        MenuItemComponent,
    ],
})
export class MenuComponent {
    private appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;

    public logout() {
        this.appService.clearAufnehmer();
    }
}
