import { Component, effect, inject, input, signal } from '@angular/core';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { GrundprodukteService } from 'src/app/services/grundprodukte/grundprodukte.service';

@Component({
    selector: 'ffgbsy-grundprodukte-detail',
    templateUrl: './grundprodukte-detail.page.html',
    styleUrls: ['./grundprodukte-detail.page.scss'],
    standalone: true,
    imports: [
        IonSpinner,
        IonItemDivider,
        IonLabel,
        IonList,
        IonItem,
        IonContent,
        IonIcon,
        IonButton,
        IonButtons,
        IonTitle,
        IonBackButton,
        IonToolbar,
        IonHeader,
        IonToggle,
        IonInput,
        FormsModule,
        ReactiveFormsModule,
        PageSpinnerComponent
    ],
})
export class GrundprodukteDetailPage {
    private grundprodukteService = inject(GrundprodukteService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public showBestand = signal(true);

    public grundprodukt = signal<Grundprodukt>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        unlimitiert: [true, [Validators.required]],
        bestand: [null, [Validators.min(0)]],
        einheit: ["", []],
    });

    constructor() {
        effect(() => this.load(this.id()));
        this.form.controls['unlimitiert'].valueChanges.subscribe((isUnlimitiert) => this.showBestand.set(!isUnlimitiert));
    }

    private load(id: number) {
        this.grundprodukteService.read(id).subscribe((grundprodukt: Grundprodukt) => {
            this.grundprodukt.set(grundprodukt);
            this.showBestand.set(grundprodukt.bestand != null);
            this.form.patchValue({ ...grundprodukt, unlimitiert: grundprodukt.bestand == null });
        });
    }

    public save() {
        const updated = { ...this.grundprodukt(), ...this.form.value };
        updated.bestand = updated.unlimitiert ? null : updated.bestand;
        console.debug("GrundprodukteDetailPage", "save(), Updated Product:", updated);
        this.grundprodukteService
            .update(updated)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
            });
    }
}
