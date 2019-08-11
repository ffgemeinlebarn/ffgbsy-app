import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { HttpClient } from '@angular/common/http';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { AlertController } from '@ionic/angular';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';

@Component({
  selector: 'app-bestellungen-detail',
  templateUrl: './bestellungen-detail.page.html',
  styleUrls: ['./bestellungen-detail.page.scss'],
})
export class BestellungenDetailPage implements OnInit {

  public bestellung: Bestellung;
  public idParam: number = null;

  constructor(
    private bestellungsHandler: BestellungenHandlerService,
    private frontend: FrontendService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController) { }

  ngOnInit() {
    this.idParam = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bestellungsHandler.loadAnsichtsbestellung(this.idParam);
  }

  printBon(drucker_id){
    this.bestellungsHandler.printAnsichtsbestellungBestellpositionBon(drucker_id).then((data: any) => {
      this.bestellungsHandler.loadAnsichtsbestellung(this.idParam);
      if (data.all_success){
        this.frontend.showToast("Bon wurde erfolgreich gedruckt!", 2000);
      }else{
        this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bon konnte leider nicht gedruckt werden!');
      }
    });
  }

  async askStornoAnzahl(bestellposition: Bestellposition) {

    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          placeholder: "Anzahl",
          name: 'anzahl',
          type: 'number',
          value: 1,
          min: 1,
          max: bestellposition.anzahl - bestellposition.storno_anzahl
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { return true; }
        }, {
          text: 'Anzahl stornieren',
          handler: (res) => {
            let anzahl = parseInt(res.anzahl);

            if ((anzahl > 0) && (anzahl <= (bestellposition.anzahl - bestellposition.storno_anzahl))){
              this.bestellungsHandler.stornoAnsichtsbestellungBestellposition(bestellposition, anzahl).then((data: any) => {

                this.bestellungsHandler.loadAnsichtsbestellung(bestellposition.bestellungen_id);

                if (data.insert.result && data.bon_result.result){
                  this.frontend.showToast("Storno-Position und Bon wurden erfolgreich eingefügt und gedruckt!", 3000);
                }else if (data.insert.result && !data.bon_result.result){
                  this.frontend.showOkAlert('Fehler beim Storno-Bon-Druck', 'Die Storno-Bestellposition wurde in die Datenbank eingefügt, konnte aber nicht gedruckt werden!');
                }else{
                  this.frontend.showOkAlert('Fehler beim Einfügen in die Datenbank', 'Die Storno-Bestellposition konnte nicht in die Datenbank eingefügt werden!');
                }
              });
              return true;
            }
            return false;
          }
        }
      ]
    });

    await alert.present();
  }

}