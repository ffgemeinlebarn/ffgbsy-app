import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToggle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { GrundprodukteApiService } from '../../../../../data/api/grundprodukte-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { GrundproduktDto } from '../../../../../model/dto/grundprodukt.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-grundprodukte-detail',
    templateUrl: './grundprodukte-detail.page.html',
    styleUrls: ['./grundprodukte-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonList, IonItem, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonToggle, IonInput, FormsModule, ReactiveFormsModule, PageSpinnerComponent],
})
export class GrundprodukteDetailPage implements ViewDidEnter {
    private grundprodukteApiService = inject(GrundprodukteApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<GrundproduktId>();
    public showBestand = signal(true);

    public grundprodukt = signal<GrundproduktDto>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        unlimitiert: [true, [Validators.required]],
        bestand: [null, [Validators.min(0)]],
        einheit: ['', []],
    });

    constructor() {
        this.form.controls['unlimitiert'].valueChanges.subscribe((isUnlimitiert) => this.showBestand.set(!isUnlimitiert));
    }

    private load(id: GrundproduktId) {
        this.grundprodukteApiService.read(id).subscribe((grundprodukt: GrundproduktDto) => {
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

    ionViewDidEnter(): void {
        this.load(this.id());
    }
}
