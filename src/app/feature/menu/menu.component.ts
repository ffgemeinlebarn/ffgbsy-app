import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
    public showAufnehmen = computed(() => this.appService.features().aufnehmen);
    public showAbrechnung = computed(() => this.appService.features().abrechnungen);
    public showBonDebug = computed(() => this.appService.features().bonDebug);
    public showProduktverwaltung = computed(() => this.appService.features().produktverwaltung);
    public showPersonenverwaltung = computed(() => this.appService.features().personenverwaltung);
    public showTischverwaltung = computed(() => this.appService.features().tischverwaltung);
    public showStatistik = computed(() => this.appService.features().statistiken);
    public showSystemeinstellungen = computed(() => this.appService.features().system);

    public logout() {
        this.appService.clearAufnehmer();
    }
}
