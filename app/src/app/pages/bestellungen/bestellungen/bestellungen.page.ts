import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { ModalController, IonSelect } from '@ionic/angular';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';

@Component({
  selector: 'app-bestellungen',
  templateUrl: './bestellungen.page.html',
  styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

  public bestellungen: Array<Bestellung>;
  public filter: any = {
    aufnehmerId: null
  };
  public anyFilterBestellung: boolean = false;

  constructor(
    public bestellungsHandler: BestellungenHandlerService,
    public data: DataService,
    public session: SessionService,
    public settings: SettingsService,
    public frontend: FrontendService,
    private http: HttpClient, 
    private modalController: ModalController
  ) {
    this.filter.aufnehmerId = this.session.aufnehmer.id;
    this.getBestellungen().then(_ => this.checkIfanyFilterBestellung());
  }

  ngOnInit() { }

  getBestellungen(){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner();
      this.http.get<Bestellung[]>(this.settings.api.url + '/bestellungen').subscribe(bestellungen => {
        this.bestellungen = bestellungen;
        this.frontend.hideLoadingSpinner();
        resolve();
      },
      err => {
        this.frontend.hideLoadingSpinner();
        reject(err);
        console.log("Error occured: ", err);
      }); 

    });
  }

  checkIfanyFilterBestellung(){
    this.anyFilterBestellung = false;

    if(this.filter.aufnehmerId == null){
      if (this.bestellungen.length > 0) this.anyFilterBestellung = true;
    }else{
      this.bestellungen.forEach(item => {
        if (item.aufnehmer.id == this.filter.aufnehmerId){
          this.anyFilterBestellung = true;
        }
      });
    }
  }

  @ViewChild(IonSelect, {static: false}) select: IonSelect;
  filterSelectAufnehmer(){
    this.select.open();
  }

}
