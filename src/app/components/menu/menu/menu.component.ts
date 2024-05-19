import { Component, inject } from '@angular/core';
import { IonButton, IonIcon, IonItemDivider, IonLabel, IonList, IonMenuToggle } from "@ionic/angular/standalone";
import { AppService } from 'src/app/services/app/app.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'ffgbsy-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [IonIcon, IonItemDivider, IonLabel,
        IonList,
        IonMenuToggle,
        IonButton,
        IonIcon,
        MenuItemComponent
    ]
})
export class MenuComponent {
    private appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;

    public logout() {
        this.appService.clearAufnehmer();
    }
}
