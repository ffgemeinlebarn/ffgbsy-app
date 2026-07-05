import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProdukteinteilungenApiService } from '../../../../../data/api/produkteinteilungen-api.service';
import { ProduktkategorienApiService } from '../../../../../data/api/produktkategorien-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { ProdukteinteilungDto } from '../../../../../model/dto/produkteinteilung.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produkteinteilungen-detail',
    templateUrl: './produkteinteilungen-detail.page.html',
    styleUrls: ['./produkteinteilungen-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonList, IonItem, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonInput, IonSelect, IonSelectOption, FormsModule, ReactiveFormsModule, PageSpinnerComponent],
})
export class ProdukteinteilungenDetailPage {
    private produkteinteilungenApiService = inject(ProdukteinteilungenApiService);
    private produktkategorienApiService = inject(ProduktkategorienApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public produktkategorien = toSignal(this.produktkategorienApiService.readAll());
    public produkteinteilung = signal<ProdukteinteilungDto>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        sortierindex: [100, [Validators.min(0)]],
        produktkategorien_id: [null],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produkteinteilungenApiService.read(id).subscribe((produkteinteilung: ProdukteinteilungDto) => {
            this.produkteinteilung.set(produkteinteilung);
            this.form.patchValue(produkteinteilung);
        });
    }

    public save() {
        const updated = { ...this.produkteinteilung(), ...this.form.value };
        console.debug('[FFGBSY]', 'ProdukteinteilungenDetailPage', 'save(), Updated Product:', updated);
        this.produkteinteilungenApiService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
            this.reload();
        });
    }

    private reload() {
        this.produkteinteilungenApiService.readAll();
    }
}
