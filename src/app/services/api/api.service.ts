import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError, map } from 'rxjs/operators';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Bon } from 'src/app/classes/bon';
import { Daten } from 'src/app/interfaces/daten';
import { ApiErrorComponent } from 'src/app/modals/api-error/api-error.component';
import { environment } from 'src/environments/environment';
import { FrontendService } from '../frontend/frontend.service';
import { SettingsService } from '../settings/settings.service';
import { BonDruck } from 'src/app/classes/bonDruck';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public ready: Promise<any>;
    private url: string = null;
    private headers: HttpHeaders = null;

    constructor(
        private http: HttpClient,
        private frontend: FrontendService,
        private settings: SettingsService,
        private modalCtrl: ModalController
    ) {
        this.settings.ready.then(() => {
            this.url = this.settings.locale.api ?? environment.api;
            this.ready = Promise.resolve(undefined);
        });
    }

    public errorHandler(error: Error | any): Observable<any> {
        this.frontend.hideLoadingSpinner();

        if (error.status == 500) {
            this.showModal(error);
        }

        return throwError(error);
    }
    async showModal(error: Error | any) {
        const modal = await this.modalCtrl.create({
            component: ApiErrorComponent,
            componentProps: {
                error
            },
            cssClass: 'api-error'
        });

        modal.present();
    }

    public getCurrentVersion(): Observable<number> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/daten/latest`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                map((data: Daten) => data.version),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getDaten(): Observable<Daten> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/daten/latest`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createBestellung(bestellung: Bestellung): Observable<Bestellung> {
        return this.http
            .post(`${this.url}/bestellungen`, bestellung, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public updateAufnehmer(aufnehmer: Aufnehmer): Observable<Bestellung> {
        this.frontend.showLoadingSpinner();
        return this.http
            .put(`${this.url}/aufnehmer/${aufnehmer.id}`, aufnehmer, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createStornoBon(bestellposition: Bestellposition): Observable<Bon> {
        this.frontend.showLoadingSpinner();
        return this.http
            .post(`${this.url}/bons`, {
                type: "storno",
                bestellungen_id: bestellposition.bestellungen_id,
                drucker_id: bestellposition.drucker_id,
                bestellpositionen: [bestellposition]
            }, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public druckBons(bons: Array<Bon>): Observable<Array<BonDruck>> {
        this.frontend.showLoadingSpinner();
        return this.http
            .post(`${this.url}/bons/druck`, bons, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public druckBon(bon: Bon): Observable<BonDruck> {
        this.frontend.showLoadingSpinner();
        return this.http
            .post(`${this.url}/bons/${bon.id}/druck`, bon, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getBestellungen(params: HttpParams = new HttpParams()): Observable<Array<Bestellung>> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/bestellungen`, { headers: this.headers, params })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getBestellung(id: number): Observable<Bestellung> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/bestellungen/${id}`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getSystemstatus(): Observable<any> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/status/systemstatus`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createStornoBestellposition(bestellposition: Bestellposition, anzahl: number): Observable<Bestellposition> {
        this.frontend.showLoadingSpinner();
        return this.http
            .post(`${this.url}/bestellungen/${bestellposition.bestellungen_id}/bestellpositionen/${bestellposition.id}`, { anzahl }, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getStatisticsTimeline(): Observable<any> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/statistiken/timeline`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }
}
