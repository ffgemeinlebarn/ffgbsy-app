import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

// Classen
import { Aufnehmer } from '../../classes/aufnehmer.class';
import { Geraet } from '../../classes/geraet.class';
import { Router } from '@angular/router';
import { BestellungenHandlerService } from '../bestellungen/bestellungen-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public aufnehmer: Aufnehmer;
  public geraet: Geraet;
  public running: any;
  public timeStart: Date;

  constructor(
    public alertController: AlertController, 
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
  }

  setGeraet(geraet: Geraet){
    this.geraet = geraet;
  }

  async askForEndSession() {

    if (this.bestellungsHandler.current !== null) {

      const alert = await this.alertController.create({
        header: 'Fehler',
        message: 'Es existiert noch eine offene Bestellung. Diese muss vor dem beenden der Session beendet werden!',
        buttons: ['OK']
      });
  
      await alert.present();

    }else{

      const alert = await this.alertController.create({
        header: 'Session beenden',
        message: 'Willst du die Session wirklich beenden?',
        buttons: [
          {
            text: 'Nein',
            role: 'Nein',
            cssClass: 'secondary',
            handler: (blah) => {
              
            }
          }, {
            text: 'Ja, ausloggen',
            handler: () => {
              this.end();
              this.router.navigateByUrl('/init');
              this.menu.close();
            }
          }
        ]
      });
  
      await alert.present();

    }
  }

}
