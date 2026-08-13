import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar, ViewWillEnter } from '@ionic/angular/standalone';
import { AbrechnungenApiService } from '../../../../data/api/abrechnungen-api.service';
import { EuroPreisPipe } from '../../../../misc/euro-preis.pipe';
import { AbrechnungOverviewItemDto } from '../../../../model/dto/abrechnung-overview-item.dto';

@Component({
    selector: 'ffgbsy-auswertungen-abrechnungen',
    templateUrl: './abrechnungen.page.html',
    styleUrls: ['./abrechnungen.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, CommonModule, FormsModule, EuroPreisPipe],
})
export class AuswertungenAbrechnungen implements ViewWillEnter {
    private readonly abrechnungenApiService = inject(AbrechnungenApiService);

    public schank = signal<AbrechnungOverviewItemDto[]>(null);
    public grill = signal<AbrechnungOverviewItemDto[]>(null);

    public loadData() {
        this.abrechnungenApiService.readOverviews('Schank').subscribe((data) => this.schank.set(data));
        this.abrechnungenApiService.readOverviews('grill').subscribe((data) => this.grill.set(data));
    }

    ionViewWillEnter(): void {
        this.loadData();
    }
}
