import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Produkt } from 'src/app/classes/produkt.class';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProdukteService } from 'src/app/services/produkte/produkte.service';

@Component({
    selector: 'ffgbsy-produkte-detail',
    templateUrl: './produkte-detail.page.html',
    styleUrls: ['./produkte-detail.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        EuroPreisPipe,
        ReactiveFormsModule
    ],
})
export class ProdukteDetailPage {
    private frontendService = inject(FrontendService);
    private produkteService = inject(ProdukteService);
    private druckerService = inject(DruckerService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public produkt = signal<Produkt>(null);
    public drucker = toSignal(this.druckerService.readAll());
    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        formal_name: ["", [Validators.required, Validators.minLength(1)]],
        preis: [0, [Validators.required, Validators.min(0)]],
        aktiv: [false, [Validators.required]],
        celebration_active: [false, [Validators.required]],
        celebration_last: [0, [Validators.required]],
        drucker_id_level_2: [null],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produkteService.read(id).subscribe((produkt) => {
            this.produkt.set(produkt);
            this.form.patchValue(produkt);
        });
    }

    public save() {
        const patchedProdukt = { ...this.produkt(), ...this.form.value };
        this.produkteService
            .update(patchedProdukt)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.produkteService.readAll().subscribe(_ => this.load(this.id()));
            });
    }
}
