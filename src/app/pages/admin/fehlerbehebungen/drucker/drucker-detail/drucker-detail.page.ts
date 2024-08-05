import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { Drucker } from 'src/app/classes/drucker.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-drucker-detail',
    templateUrl: './drucker-detail.page.html',
    styleUrls: ['./drucker-detail.page.scss'],
    standalone: true,
    imports: [IonBackButton, IonButtons, IonInput, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, PageSpinnerComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DruckerDetailPage implements ViewDidEnter {
    private druckerService = inject(DruckerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public drucker = signal<Drucker>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        ip: ["", [Validators.required, Validators.minLength(1)]],
        port: [9100, [Validators.required]],
    });

    private load(id: number) {
        this.druckerService.read(id).subscribe((drucker: Drucker) => {
            this.drucker.set(drucker);
            this.form.patchValue(drucker);
        });
    }

    public save() {
        const updated = { ...this.drucker(), ...this.form.value };
        console.debug("DruckerDetailPage", "save(), Updated Drucker:", updated);
        this.druckerService
            .update(updated)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
            });
    }

    public ionViewDidEnter(): void {
        this.load(this.id());
    }
}
