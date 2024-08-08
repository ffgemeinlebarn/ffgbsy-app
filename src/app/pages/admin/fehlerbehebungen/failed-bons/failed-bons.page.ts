import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxCustomEvent, IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCheckbox, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonNote, IonRippleEffect, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { Bon } from 'src/app/classes/bon.model';
import { IBonsFilter } from 'src/app/interfaces/bons-filter.interface';
import { BonsService } from 'src/app/services/bons/bons.service';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { TischeService } from 'src/app/services/tische/tische.service';
import {FrontendService} from '../../../../services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-failed-bons',
    templateUrl: './failed-bons.page.html',
    styleUrls: ['./failed-bons.page.scss'],
    standalone: true,
    imports: [TitleCasePipe, IonBadge, IonItemDivider, IonAccordionGroup, IonAccordion, IonItemOption, IonItemOptions, IonItemSliding, IonButtons, IonMenuButton, IonToggle, IonButton, IonSelect, IonSelectOption, IonRippleEffect, IonFooter, IonCheckbox, IonIcon, IonTabButton, IonTabBar, IonTabs, IonNote, IonChip, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FailedBonsPage {
    private bonsService = inject(BonsService);
    private druckerService = inject(DruckerService);
    private tischeService = inject(TischeService);
    private formBuilder = inject(FormBuilder);
    private frontendService = inject(FrontendService);

    public bons = signal<Bon[]>([]);

    public numberOfBonsSelected = computed(() => this.bons().filter(b => b.selected).length);
    public anyBonsSelected = computed(() => this.numberOfBonsSelected() > 0);
    public allBonsSelectedAreMissingSuccess = computed(() => this.bons().filter(b => b.selected && b.successes == 0).length == this.numberOfBonsSelected());

    public filter = this.formBuilder.group({
        druckerId: new FormControl<null | number>(null),
        tischId: new FormControl<null | number>(null),
        missingSuccessfulDruck: new FormControl<boolean>(true),
        multipleDrucke: new FormControl<boolean>(false),
        type: new FormControl<null | 'bestellung' | 'storno'>(null),
        limit: [100]
    });

    public availableFilter = {
        drucker: toSignal(this.druckerService.readAll()),
        tische: toSignal(this.tischeService.readAll()),
        types: ['bestellung', 'storno'],
        limits: [5, 10, 25, 50, 100, 200, 500, 1000]
    };

    public toggleAllOnOff() {
        const allSelected = this.bons().filter(b => b.selected).length == this.bons().length;
        this.bons.update(bons => {
            bons.forEach(bon => bon.selected = !allSelected);
            return [...bons];
        });
    }

    public onCheckboxToggle(event: Event) {
        event.stopPropagation();
    }

    public onChange(changeEvent: CheckboxCustomEvent, bon: Bon) {
        this.bons.update(bons => {
            bons.find(b => b == bon).selected = changeEvent.detail.checked;
            return [...bons];
        });
    }

    public searchBons() {
        return this.bonsService
            .search(this.filter.value as IBonsFilter)
            .subscribe(bons => this.bons.set(bons));
    }

    public printSelectedBons() {
        const selectedBons = this.bons().filter(b => b.selected).map(bon => bon.id);
        this.bonsService.druckBonsByIds(selectedBons)
            .subscribe(bonDrucke => {
                this.searchBons();
                const successfulBons = bonDrucke.filter(bon => bon.success).length;
                if(successfulBons === bonDrucke.length) {
                    this.frontendService.showToast('Alle Bons erfolgreich gedruckt!');
                } else {
                    this.frontendService.showToast(`Nur ${successfulBons}/${bonDrucke.length} Bons gedruckt!`);
                }
            });
    }
}
