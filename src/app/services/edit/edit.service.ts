import { Injectable, inject } from '@angular/core';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { ApiService } from '../api/api.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    private api = inject(ApiService);
    private settings = inject(SettingsService);

    public grundprodukte: Array<Grundprodukt> = [];
    public produkte: Array<Produkt> = [];

    constructor() {
        this.settings.ready.then(() => {
            this.readGrundprodukte();
            this.readProdukte();
        });
    }

    public readGrundprodukte() {
        this.api.readGrundprodukte().subscribe((grundprodukte) => this.grundprodukte = grundprodukte);
    }

    public readGrundprodukt(id: number) {
        return this.api.readGrundprodukt(id);
    }

    public updateGrundprodukt(grundprodukt: Grundprodukt) {
        return this.api.updateGrundprodukt(grundprodukt);
    }


    public readProdukte() {
        this.api.readProdukte().subscribe((produkte) => this.produkte = produkte);
    }

    public readProdukt(id: number) {
        return this.api.readProdukt(id);
    }

    public updateProdukt(produkt: Produkt) {
        return this.api.updateProdukt(produkt);
    }

}
