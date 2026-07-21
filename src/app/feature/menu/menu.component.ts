import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonIcon, IonList, IonMenuToggle } from '@ionic/angular/standalone';
import { AppService } from '../../data/app.service';
import { MenuItemComponent } from '../../ui/menu-item/menu-item.component';

@Component({
    selector: 'ffgbsy-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonList, IonMenuToggle, IonButton, IonIcon, MenuItemComponent],
})
export class MenuComponent {
    private readonly appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;
    public isAbrechner = this.appService.isAbrechner;
    public bonDebug = this.appService.bonDebug;

    public logout() {
        this.appService.clearAufnehmer();
    }
}
