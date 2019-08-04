import { Component, OnInit } from '@angular/core';

// Services
import { DataService } from '../../../services/data/data.service';
import { SessionService } from '../../../services/session/session.service';

// Classes
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Geraet } from 'src/app/classes/geraet.class';

import { Storage } from '@ionic/storage';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  private messageLineOne: string = "";
  private messageLineTwo: string = "";
  private datenSynchronisiert: boolean = false;
  private datenSynchronisierungLaeuft: boolean = false;

  constructor(private data: DataService, private session: SessionService, private settings: SettingsService) {
    this.messageLineOne = "Warte auf Synchronisierung der Daten.";
    this.messageLineTwo = "";
  }

  ngOnInit() {}

  datenSynchronisierungStarten(){

    this.datenSynchronisierungLaeuft = true;
    this.messageLineOne = "Starte Synchronisierung ...";
    this.messageLineTwo = "";

    this.data.download().then(result => {
      
      this.datenSynchronisierungLaeuft = false;

      if (result){
        this.datenSynchronisiert = true;
        this.messageLineOne = "Daten erfolgreich synchronisiert!";
        this.messageLineTwo = "Du kannst jetzt deine Session starten.";
      }else{
        this.datenSynchronisiert = false;
        this.messageLineOne = "Es trat ein Fehler auf!";
        this.messageLineTwo = "Daten wurden nicht synchronisiert!";
      }
    });
  }

}
