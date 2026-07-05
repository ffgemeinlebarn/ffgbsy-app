import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { ProduktkategorienApiService } from '../../../../../data/api/produktkategorien-api.service';
import { TischkategorienApiService } from '../../../../../data/api/tischkategorien-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { TischkategorieDto } from '../../../../../model/dto/tischkategorie.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tischkategorien-detail',
    templateUrl: './tischkategorien-detail.page.html',
    styleUrls: ['./tischkategorien-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonList, IonItem, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonToggle, IonInput, FormsModule, ReactiveFormsModule, PageSpinnerComponent],
})
export class TischkategorienDetailPage {
    private tischkategorienApiService = inject(TischkategorienApiService);
    private produktkategorienApiService = inject(ProduktkategorienApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public produktkategorien = toSignal(this.produktkategorienApiService.readAll());
    public tischkategorie = signal<TischkategorieDto>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        aktiv: [true],
        sortierindex: [100, [Validators.min(0)]],
    });

    constructor() {
        effect(() => this.tischkategorienApiService.read(this.id()).subscribe((tischkategorie: TischkategorieDto) => this.setEntity(tischkategorie)));
    }

    private setEntity(tischkategorie: TischkategorieDto) {
        this.tischkategorie.set(tischkategorie);
        this.form.patchValue(tischkategorie);
    }

    public save() {
        const updated = { ...this.tischkategorie(), ...this.form.value };
        console.debug('[FFGBSY]', 'TischkategorienDetailPage', 'save(), Updated Product:', updated);
        this.tischkategorienApiService.update(updated).subscribe((tischkategorie) => {
            this.frontendService.showToast(`${tischkategorie.name} wurde erfolgreich gespeichert!`);
            this.setEntity(tischkategorie);
        });
    }
}
