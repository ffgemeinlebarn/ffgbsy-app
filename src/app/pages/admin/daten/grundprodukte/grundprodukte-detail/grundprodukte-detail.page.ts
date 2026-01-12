import { Component, effect, inject, input, signal } from '@angular/core';
import { IGrundprodukt } from 'src/app/model/i-grundprodukt.class';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { GrundprodukteApiService } from 'src/app/data/api/grundprodukte-api.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-grundprodukte-detail',
    templateUrl: './grundprodukte-detail.page.html',
    styleUrls: ['./grundprodukte-detail.page.scss'],
    imports: [
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
        PageSpinnerComponent,
    ],
})
export class GrundprodukteDetailPage {
    private grundprodukteApiService = inject(GrundprodukteApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public showBestand = signal(true);

    public grundprodukt = signal<IGrundprodukt>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        unlimitiert: [true, [Validators.required]],
        bestand: [null, [Validators.min(0)]],
        einheit: ['', []],
    });

    constructor() {
        effect(() => this.load(this.id()));
        this.form.controls['unlimitiert'].valueChanges.subscribe((isUnlimitiert) => this.showBestand.set(!isUnlimitiert));
    }

    private load(id: number) {
        this.grundprodukteApiService.read(id).subscribe((grundprodukt: IGrundprodukt) => {
            this.grundprodukt.set(grundprodukt);
            this.showBestand.set(grundprodukt.bestand != null);
            this.form.patchValue({
                ...grundprodukt,
                unlimitiert: grundprodukt.bestand == null,
            });
        });
    }

    public save() {
        const updated = { ...this.grundprodukt(), ...this.form.value };
        updated.bestand = updated.unlimitiert ? null : updated.bestand;
        console.debug('[FFGBSY]', 'GrundprodukteDetailPage', 'save(), Updated Product:', updated);
        this.grundprodukteApiService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
            this.reload();
        });
    }

    private reload() {
        this.grundprodukteApiService.readAll();
    }
}
