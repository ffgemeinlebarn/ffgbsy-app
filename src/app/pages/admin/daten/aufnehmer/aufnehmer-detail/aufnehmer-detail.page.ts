import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-aufnehmer-detail',
    templateUrl: './aufnehmer-detail.page.html',
    styleUrls: ['./aufnehmer-detail.page.scss'],
    standalone: true,
    imports: [IonBackButton, IonIcon, IonButton, IonButtons,
        IonItem,
        IonLabel,
        IonItemDivider,
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonToggle,
        IonInput,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AufnehmerDetailPage {
    private aufnehmerService = inject(AufnehmerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public aufnehmer = signal<Aufnehmer>(null);

    public form = this.formBuilder.group({
        vorname: ["", [Validators.required, Validators.minLength(1)]],
        nachname: ["", [Validators.required, Validators.minLength(1)]],
        zoom_level: [1, [Validators.required]],
        aktiv: [false, [Validators.required]]
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    public load(id: number) {
        this.aufnehmerService.read(id).subscribe(aufnehmer => {
            this.aufnehmer.set(aufnehmer);
            this.form.patchValue(aufnehmer);
        });
    }

    public save() {
        this.aufnehmerService
            .update({ ...this.aufnehmer(), ...this.form.value })
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
            });
    }

}
