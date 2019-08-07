import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bestellungen-detail',
  templateUrl: './bestellungen-detail.page.html',
  styleUrls: ['./bestellungen-detail.page.scss'],
})
export class BestellungenDetailPage implements OnInit {

  public bestellung: Bestellung;
  public idParam: number = null;

  constructor(
    private http: HttpClient, 
    private session: SessionService, 
    private data: DataService,
    private settings: SettingsService, 
    private frontend: FrontendService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idParam = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getBestellung(this.idParam);
  }

  getBestellung(id: number){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner();
      this.http.get<Bestellung>(this.settings.api.url + '/bestellungen/' + id).subscribe(bestellung => {
        this.bestellung = bestellung;
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

  printBon(bestellungs_id, drucker_id){

    this.frontend.showLoadingSpinner('send');
    this.http.post<any>(this.settings.api.url + '/bestellungen/' + bestellungs_id + '/druck/drucker/' + drucker_id, {}).subscribe(data => {

      this.frontend.hideLoadingSpinner();
      this.getBestellung(this.idParam);

      if (data.all_success){
        this.frontend.showToast("Bon wurde erfolgreich gedruckt!", 2000);
      }else{
        this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
      }

    },
    err => {
      this.frontend.hideLoadingSpinner();
      this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
      console.log("Error occured: ", err);
    });
  }

}