import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { DataService } from '../../../services/data/data.service';
import { SessionService } from '../../../services/session/session.service';

// Classes
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Geraet } from 'src/app/classes/geraet.class';

import { Storage } from '@ionic/storage';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { IonSelect } from '@ionic/angular';

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
  private lokalesGeraetReady: boolean = false;

  private geraet: any = null;
  private geraet_message: string = '';

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

      this.refrehLocalGeraet();

      if (result){
        this.datenSynchronisiert = true;
        this.messageLineOne = "Daten erfolgreich synchronisiert!";
        if (!this.geraet){
          this.messageLineTwo = "Bevor du deine Session starten kannst, muss das lokale Gerät konfiguriert werden.";
        }else{
          this.messageLineTwo = "Du kannst jetzt deine Session starten.";
        }
      }else{
        this.datenSynchronisiert = false;
        this.messageLineOne = "Es trat ein Fehler auf!";
        this.messageLineTwo = "Daten wurden nicht synchronisiert!";
      }

      this.datenSynchronisierungLaeuft = false;

    });
  }

  refrehLocalGeraet(){
    
    this.geraet = this.data.getGeraetById(this.settings.locale.diesesGeraetId);

    if (this.geraet){
      this.lokalesGeraetReady = true;
      this.geraet_message = 'Lokale Gerät-Konfiguration: ' + this.geraet.hersteller + ' ' + this.geraet.type + ' (' + this.geraet.ip + ')';
    }else{
      this.geraet_message = 'Dieses lokale Gerät ist noch keinem Gerät im System zugewiesen!';
    }

  }

  @ViewChild(IonSelect, {static: false}) select: IonSelect;
  openGeraeteSelect(){
    this.select.open();
  }

}
