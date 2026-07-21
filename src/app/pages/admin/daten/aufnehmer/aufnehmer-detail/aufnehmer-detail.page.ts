import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { PersonenApiService } from '../../../../../data/api/personen-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { PersonDto } from '../../../../../model/dto/aufnehmer.dto';

@Component({
    selector: 'ffgbsy-aufnehmer-detail',
    templateUrl: './aufnehmer-detail.page.html',
    styleUrls: ['./aufnehmer-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonBackButton, IonIcon, IonButton, IonButtons, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonToggle, IonInput, FormsModule, ReactiveFormsModule],
})
export class AufnehmerDetailPage {
    private readonly aufnehmerApiService = inject(PersonenApiService);
    private readonly frontendService = inject(FrontendService);
    private readonly formBuilder = inject(FormBuilder);

    public id = input.required<PersonId>();
    public aufnehmer = signal<PersonDto>(null);

    public form = this.formBuilder.group({
        vorname: ['', [Validators.required, Validators.minLength(1)]],
        nachname: ['', [Validators.required, Validators.minLength(1)]],
        zoom_level: [1, [Validators.required]],
        aktiv: [false, [Validators.required]],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    public load(id: PersonId) {
        this.aufnehmerApiService.read(id).subscribe((aufnehmer) => {
            this.aufnehmer.set(aufnehmer);
            this.form.patchValue(aufnehmer);
        });
    }

    public save() {
        this.aufnehmerApiService.update({ ...this.aufnehmer(), ...this.form.value }).subscribe((a) => {
            this.frontendService.showToast(`${a.vorname} ${a.nachname} wurde erfolgreich gespeichert!`);
            this.load(this.id());
        });
    }
}
