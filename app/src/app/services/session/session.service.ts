import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

// Classen
import { Aufnehmer } from '../../classes/aufnehmer.class';
import { Geraet } from '../../classes/geraet.class';
import { Router } from '@angular/router';
import { BestellungenHandlerService } from '../bestellungen/bestellungen-handler.service';
import { FrontendService } from '../frontend/frontend.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public aufnehmer: Aufnehmer;
  public geraet: Geraet;
  public running: any;
  public hash: any;
  public timeStart: Date;
  public zoomLevel: number = 1;

  constructor(
    private frontend: FrontendService, 
    private router: Router, 
    private menu: MenuController,
    private bestellungsHandler: BestellungenHandlerService,
    private http: HttpClient,
    private settings: SettingsService
  ) {
    
    this.running = {
      state: false,
      text: "Inaktiv"
    };
    this.timeStart = null;
    this.aufnehmer = null;
    this.geraet = null;
    this.hash = null;

  }

  start(){

    // Aufnehmer und Gerät müssen für Session-Start gesetzt sein
    if (!this.running.state && this.aufnehmer && this.geraet){
      return new Promise((resolve, reject) => {

        this.frontend.showLoadingSpinner('send');
        this.http.post<any>(this.settings.api.url + '/aufnehmer/' + this.aufnehmer.id + '/geraet/' + this.geraet.id + '/session/start', {}).subscribe(data => {
          this.frontend.hideLoadingSpinner();

          this.running.state = true;
          this.running.text = "Aktiv";
          this.timeStart = data.start;
          this.hash = data.hash;

          resolve(data);
        },
        err => {
          this.frontend.hideLoadingSpinner();
          this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
          reject(err);
        });
      });

    } else if (this.running.state){
      this.frontend.showOkAlert(
        'Fehler',
        'Session kann nicht begonnen werden, da bereits eine Session läuft!'
      );
    } else if (!this.aufnehmer){
      this.frontend.showOkAlert(
        'Fehler',
        'Session kann nicht begonnen werden, es wurde kein Aufnehmer gewählt!'
      );
    } else {
      this.frontend.showOkAlert(
        'Fehler',
        'Session kann nicht begonnen werden, es wurde kein Gerät gewählt!'
      );
    }
  }

  end(){

    if (this.running.state){

      return new Promise((resolve, reject) => {

        this.frontend.showLoadingSpinner('send');
        this.http.post<any>(this.settings.api.url + '/aufnehmer/' + this.aufnehmer.id + '/geraet/' + this.geraet.id + '/session/ende', {hash: this.hash}).subscribe(data => {
          this.frontend.hideLoadingSpinner();

          this.running.state = false;
          this.running.text = "Keine aktive Session";
          this.timeStart = null;
          this.aufnehmer = null;
          this.geraet = null;
          this.hash = null;

          resolve(data);
        },
        err => {
          this.frontend.hideLoadingSpinner();
          this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
          reject(err);
        });
      });
    } else {
      this.frontend.showOkAlert(
        'Fehler',
        'Session kann nicht beendet werden, da keine Session läuft!'
      );
    }
  }

  setAufnehmer(aufnehmer: Aufnehmer){
    this.aufnehmer = aufnehmer;
    this.zoomLevel = this.aufnehmer.zoom_level;
  }

  setGeraet(geraet: Geraet){
    this.geraet = geraet;
  }

  async askForEndSession() {

    if (this.bestellungsHandler.neubestellung.bestellung !== null) {

      this.frontend.showOkAlert(
        'Fehler',
        'Es existiert noch eine offene Bestellung. Diese muss vor dem beenden der Session beendet werden!'
      ).then(ok =>{
        this.menu.close();
      });

    }else{

      this.frontend.showJaNeinAlert(
        'Session beenden',
        'Willst du die Session wirklich beenden und dich ausloggen?'
      ).then(yes => {
        this.end().then(res => {
          this.router.navigateByUrl('/init');
          this.menu.close();
        });
      }, no => {});

    }
  }

}
