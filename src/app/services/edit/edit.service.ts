import { Injectable } from '@angular/core';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    public grundprodukte: Array<Grundprodukt> = [];
    public produkte: Array<Produkt> = [];

    constructor(private api: ApiService) {
        this.readGrundprodukte();
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
        // this.api.readProdukte().subscribe((produkte) => this.produkte = produkte);
    }

}
