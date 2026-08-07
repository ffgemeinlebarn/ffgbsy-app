import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { PersonenApiService } from '../../../../../data/api/personen-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { PersonDto } from '../../../../../model/dto/person.dto';

@Component({
    selector: 'ffgbsy-personen-detail',
    templateUrl: './personen-detail.page.html',
    styleUrls: ['./personen-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonList, IonHeader, IonSelect, IonSelectOption, IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonToggle, IonInput, FormsModule, ReactiveFormsModule, FormField],
})
export class PersonenDetailPage {
    private readonly aufnehmerApiService = inject(PersonenApiService);
    private readonly frontendService = inject(FrontendService);

    public id = input.required<PersonId>();
    public aufnehmer = signal<PersonDto>(null);
    public form = form(this.aufnehmer);

    public load(id: PersonId) {
        this.aufnehmerApiService.read(id).subscribe((aufnehmer) => this.aufnehmer.set(aufnehmer));
    }

    public save() {
        this.aufnehmerApiService.update(this.aufnehmer()).subscribe((a) => {
            this.frontendService.showToast(`${a.vorname} ${a.nachname} wurde erfolgreich gespeichert!`);
            this.load(this.id());
        });
    }

    ionViewDidEnter(): void {
        this.load(this.id());
    }
}
