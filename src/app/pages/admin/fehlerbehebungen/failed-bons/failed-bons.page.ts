import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCheckbox, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonNote, IonRippleEffect, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { Bon } from 'src/app/classes/bon.model';
import { AppService } from 'src/app/services/app/app.service';
import { BestellungenService } from 'src/app/services/bestellungen/bestellungen.service';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { TischeService } from 'src/app/services/tische/tische.service';

@Component({
    selector: 'ffgbsy-failed-bons',
    templateUrl: './failed-bons.page.html',
    styleUrls: ['./failed-bons.page.scss'],
    standalone: true,
    imports: [IonItemDivider, IonAccordionGroup, IonAccordion, IonItemOption, IonItemOptions, IonItemSliding, IonButtons, IonMenuButton, IonToggle, IonButton, IonSelect, IonSelectOption, IonRippleEffect, IonFooter, IonCheckbox, IonIcon, IonTabButton, IonTabBar, IonTabs, IonNote, IonChip, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FailedBonsPage {

    // Seite anzeigen mit Bons, die nicht gedruckt wurden: übersichtlich
    // hallo Jakob,
    private bestellungenService = inject(BestellungenService);
    private druckerService = inject(DruckerService);
    private tischeService = inject(TischeService);
    private appService = inject(AppService);
    private formBuilder = inject(FormBuilder);

    public scannerEnabled: boolean = false;
    public bons: Bon[];

    public filter = this.formBuilder.group({
        druckerId: new FormControl<null | number>(null),
        tischId: new FormControl<null | number>(null),
        failed: new FormControl<null | number>(null),
        succeeded: new FormControl<null | number>(null),
        limit: [100]
    });

    public availableFilter = {
        drucker: toSignal(this.druckerService.readAll()),
        tische: toSignal(this.tischeService.readAll()),
        limits: [5, 10, 25, 50, 100, 200, 500, 1000]
    };

    public searchBons() {
        console.log("Searching Bons ...");
    }
}
