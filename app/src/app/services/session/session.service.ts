import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

// Classen
import { Aufnehmer } from '../../classes/aufnehmer.class';
import { Geraet } from '../../classes/geraet.class';
import { Router } from '@angular/router';
import { BestellungenHandlerService } from '../bestellungen/bestellungen-handler.service';
import { FrontendService } from '../frontend/frontend.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public aufnehmer: Aufnehmer;
  public geraet: Geraet;
  public running: any;
  public timeStart: Date;
  public zoomLevel: number = 1;

  constructor(
    private frontend: FrontendService, 
    private router: Router, 
    private menu: MenuController,
    private bestellungsHandler: BestellungenHandlerService
  ) {
    
    this.running = {
      state: false,
      text: "Inaktiv"
    };
    this.timeStart = null;
    this.aufnehmer = null;
    this.geraet = null;

  }

  start(){

    // Aufnehmer und Gerät müssen für Session-Start gesetzt sein
    if (this.aufnehmer && this.geraet){
      this.running.state = true;
      this.running.text = "Aktiv";
      this.timeStart = new Date();
    }
  }

  end(){

    // Session Duration in Sekunden
    let sessionDuration = (new Date().getTime() - this.timeStart.getTime()) / 1000;

    // Push Session via API

    // Reset
    this.running = {
      state: false,
      text: "Keine aktive Session"
    };
    this.timeStart = null;
    this.aufnehmer = null;
    this.geraet = null;
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
        this.end();
        this.router.navigateByUrl('/init');
        this.menu.close();
      }, no => {});

    }
  }

}
