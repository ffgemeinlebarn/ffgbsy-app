import { Component, inject, input, signal } from '@angular/core';
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
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { DruckerService } from 'src/app/data/drucker.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { IDrucker } from 'src/app/model/i-drucker.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-drucker-detail',
    templateUrl: './drucker-detail.page.html',
    styleUrls: ['./drucker-detail.page.scss'],
    imports: [
        IonBackButton,
        IonButtons,
        IonInput,
        IonButton,
        IonIcon,
        IonLabel,
        IonItem,
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        PageSpinnerComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class DruckerDetailPage implements ViewDidEnter {
    private druckerService = inject(DruckerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public drucker = signal<IDrucker>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        ip: ['', [Validators.required, Validators.minLength(1)]],
        port: [9100, [Validators.required]],
    });

    private load(id: number) {
        this.druckerService.read(id).subscribe((drucker: IDrucker) => {
            this.drucker.set(drucker);
            this.form.patchValue(drucker);
        });
    }

    public save() {
        const updated = { ...this.drucker(), ...this.form.value };
        console.debug('DruckerDetailPage', 'save(), Updated Drucker:', updated);
        this.druckerService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
        });
    }

    public ionViewDidEnter(): void {
        this.load(this.id());
    }
}
