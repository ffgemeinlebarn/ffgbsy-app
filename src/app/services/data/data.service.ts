import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Daten } from 'src/app/interfaces/daten';
import { SettingsService } from '../settings/settings.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class DataService implements Daten {

    public ready: Promise<any>;
    private storageKey = 'data';

    public aufnehmer: Aufnehmer[] = [];
    public produktbereiche: Produktbereich[];
    public produktkategorien: Produktkategorie[];
    public produkte: Produkt[];
    public tischkategorien: Tischkategorie[];
    public tische: Tisch[];

    public version: number = 0;
    public saved: Date | null = null;

    constructor(
        private api: ApiService,
        private storage: Storage,
        private settings: SettingsService
    ) {
        this.loadfromStorage();
    }

    public loadfromStorage() {
        this.ready = new Promise((resolve, reject) => this.settings.ready.then(() => this.storage.get(this.settings.StoragePrefix + this.storageKey).then((jsonObject: any) => {

            console.log('[FFGBSY]', 'Data ', 'Loaded from Storage');

            if (jsonObject == null) {
                console.log('[FFGBSY]', 'Data ', 'Keine lokalen Daten vorhanden!');
            } else {

                const dataObject = <{
                    saved: Date,
                    data: any
                }>JSON.parse(jsonObject);

                this.aufnehmer = dataObject.data.aufnehmer;
                this.produktbereiche = dataObject.data.produktbereiche;
                this.produktkategorien = dataObject.data.produktkategorien;
                this.produkte = dataObject.data.produkte;
                this.tischkategorien = dataObject.data.tischkategorien;
                this.tische = dataObject.data.tische;
                this.version = dataObject.data.version;

                this.saved = new Date(dataObject.saved);
            }

            resolve(this.saved);
        })));
    }

    public async download() {

        console.log('[FFGBSY]', 'Data ', 'Start Download');

        this.api.getDaten().subscribe((data) => {

            const saved = new Date();

            this.storage.set(this.settings.StoragePrefix + this.storageKey, JSON.stringify({
                saved,
                data
            }));

            this.aufnehmer = data.aufnehmer;
            this.produktbereiche = data.produktbereiche;
            this.produktkategorien = data.produktkategorien;
            this.produkte = data.produkte;
            this.tischkategorien = data.tischkategorien;
            this.tische = data.tische;
            this.version = data.version;

            this.saved = saved;

            this.ready = Promise.resolve(saved);

        }, (err) => {
            alert("Es trat ein Fehler auf!" + "Daten wurden nicht synchronisiert!");
            this.ready = Promise.reject(err);
        });
    }

    getProduktById(id: number) {
        for (let p of this.produkte) {
            if (p.id == id) { return p; }
        }
        return null;
    }

    getProduktByIds(ids: Array<number>) {
        let arr: Array<Produkt>;
        for (let p of this.produkte) {
            if (ids.indexOf(p.id)) { arr.push(p) }
        }
        return arr;
    }

}
