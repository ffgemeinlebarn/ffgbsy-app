import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { DruckerApiService } from '../../../../../data/api/drucker-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { DruckerDto } from '../../../../../model/dto/drucker.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-drucker-detail',
    templateUrl: './drucker-detail.page.html',
    styleUrls: ['./drucker-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonBackButton, IonButtons, IonInput, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, PageSpinnerComponent, FormsModule, ReactiveFormsModule],
})
export class DruckerDetailPage implements ViewDidEnter {
    private druckerApiService = inject(DruckerApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<DruckerId>();
    public drucker = signal<DruckerDto>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        ip: ['', [Validators.required, Validators.minLength(1)]],
        port: [9100, [Validators.required]],
    });

    private load(id: DruckerId) {
        this.druckerApiService.read(id).subscribe((drucker: DruckerDto) => {
            this.drucker.set(drucker);
            this.form.patchValue(drucker);
        });
    }

    public save() {
        const updated = { ...this.drucker(), ...this.form.value };
        console.debug('[FFGBSY]', 'DruckerDetailPage', 'save(), Updated Drucker:', updated);
        this.druckerApiService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
        });
    }

    public ionViewDidEnter(): void {
        this.load(this.id());
    }
}
