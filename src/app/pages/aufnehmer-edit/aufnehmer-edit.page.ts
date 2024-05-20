import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from 'src/app/services/app/app.service';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-aufnehmer-edit',
    templateUrl: './aufnehmer-edit.page.html',
    styleUrls: ['./aufnehmer-edit.page.scss'],
    standalone: true,
    imports: [IonInput,
        FormsModule,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonContent,
        IonList,
        IonItemDivider,
        IonLabel,
        IonItem,
        IonSelect,
        IonSelectOption,
        ReactiveFormsModule
    ],
})
export class AufnehmerEditPage {

    private appService = inject(AppService);
    private aufnehmerService = inject(AufnehmerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public aufnehmer = this.appService.aufnehmer;

    constructor() {
        effect(() => this.form.patchValue(this.aufnehmer()));
    }

    public form = this.formBuilder.group({
        vorname: ["", [Validators.required, Validators.minLength(1)]],
        nachname: ["", [Validators.required, Validators.minLength(1)]],
        zoom_level: [1, [Validators.required]],
    });

    public save() {
        const updatedAufnehmer = { ...this.aufnehmer(), ...this.form.value };
        this.aufnehmerService.update(updatedAufnehmer).subscribe(a => {
            this.frontendService.showToast(`${a.vorname} ${a.nachname} wurde gespeichert.`);
            this.aufnehmer.set(a);
        });
    }
}
