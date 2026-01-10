import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    CheckboxCustomEvent,
    IonAccordion,
    IonAccordionGroup,
    IonBadge,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonChip,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonMenuButton,
    IonRippleEffect,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToggle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { BonsService } from 'src/app/data/bons.service';
import { DruckerService } from 'src/app/data/drucker.service';
import { TischeService } from 'src/app/data/tische.service';
import { Bon } from 'src/app/model/bon.model';
import { IBonsFilter } from 'src/app/model/bons-filter.interface';
import { FrontendService } from '../../../../data/frontend.service';

@Component({
    selector: 'ffgbsy-failed-bons',
    templateUrl: './failed-bons.page.html',
    styleUrls: ['./failed-bons.page.scss'],
    imports: [
        TitleCasePipe,
        IonBadge,
        IonItemDivider,
        IonAccordionGroup,
        IonAccordion,
        IonButtons,
        IonMenuButton,
        IonToggle,
        IonButton,
        IonSelect,
        IonSelectOption,
        IonRippleEffect,
        IonFooter,
        IonCheckbox,
        IonIcon,
        IonChip,
        IonLabel,
        IonItem,
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class FailedBonsPage implements ViewDidEnter {
    private bonsService = inject(BonsService);
    private druckerService = inject(DruckerService);
    private tischeService = inject(TischeService);
    private formBuilder = inject(FormBuilder);
    private frontendService = inject(FrontendService);

    public bons = signal<Bon[]>([]);

    public numberOfBonsSelected = computed(
        () => this.bons().filter((b) => b.selected).length
    );
    public anyBonsSelected = computed(() => this.numberOfBonsSelected() > 0);
    public allBonsSelectedAreMissingSuccess = computed(
        () =>
            this.bons().filter((b) => b.selected && b.successes == 0).length ==
            this.numberOfBonsSelected()
    );

    public filter = this.formBuilder.group({
        druckerId: new FormControl<null | number>(null),
        tischId: new FormControl<null | number>(null),
        missingSuccessfulDruck: new FormControl<boolean>(true),
        multipleDrucke: new FormControl<boolean>(false),
        type: new FormControl<null | 'bestellung' | 'storno'>(null),
        limit: [100],
    });

    public availableFilter = {
        drucker: toSignal(this.druckerService.readAll()),
        tische: toSignal(this.tischeService.readAll()),
        types: ['bestellung', 'storno'],
        limits: [5, 10, 25, 50, 100, 200, 500, 1000],
    };

    public toggleAllOnOff() {
        const allSelected =
            this.bons().filter((b) => b.selected).length == this.bons().length;
        this.bons.update((bons) => {
            bons.forEach((bon) => (bon.selected = !allSelected));
            return [...bons];
        });
    }

    public onCheckboxToggle(event: Event) {
        event.stopPropagation();
    }

    public onChange(changeEvent: CheckboxCustomEvent, bon: Bon) {
        this.bons.update((bons) => {
            bons.find((b) => b == bon).selected = changeEvent.detail.checked;
            return [...bons];
        });
    }

    public searchBons() {
        return this.bonsService
            .search(this.filter.value as IBonsFilter)
            .subscribe((bons) => this.bons.set(bons));
    }

    public printSelectedBons() {
        this.frontendService.showLoadingSpinner();
        const selectedBons = this.bons()
            .filter((b) => b.selected)
            .map((bon) => bon.id);
        this.bonsService.druckBonsByIds(selectedBons).subscribe((bonDrucke) => {
            this.searchBons();
            const successfulBons = bonDrucke.filter(
                (bon) => bon.success
            ).length;
            if (successfulBons === bonDrucke.length) {
                this.frontendService.showToast(
                    'Alle Bons erfolgreich gedruckt!'
                );
            } else {
                this.frontendService.showToast(
                    `Nur ${successfulBons}/${bonDrucke.length} Bons gedruckt!`
                );
            }
            this.frontendService.hideLoadingSpinner();
        });
    }

    ionViewDidEnter(): void {
        this.searchBons();
    }
}
