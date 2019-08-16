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
  public filtredBestellungen: Array<Bestellung> = [];
  public filter: any = {
    aufnehmerId: null,
    tischeId: null
  };

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
    this.filter.tischeId = null;
    this.getBestellungen().then(_ => this.filterBestellungen());
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

  filterBestellungen(){

    console.log("filtredBestellungen", this.filter.tischeId, this.filter.aufnehmerId);

    this.filtredBestellungen = [];
    
    for(var i=0;i<this.bestellungen.length;i++){
      let b = this.bestellungen[i];
      let push = false;

      if (this.filter.aufnehmerId == b.aufnehmer.id || this.filter.aufnehmerId == null){
        if (this.filter.tischeId == b.tisch.id || this.filter.tischeId == null){
          push = true;
        }
      }

      if (push) this.filtredBestellungen.push(b);
    }
    
  }

  @ViewChild('aufnehmerSelect', {static: false}) aufnehmerSelect: IonSelect;
  filterSelectAufnehmer(){
    this.aufnehmerSelect.open();
  }

  @ViewChild('tischeSelect', {static: false}) tischeSelect: IonSelect;
  filterSelectTische(){
    console.log(this.data.tische);
    this.tischeSelect.open();
  }

}
