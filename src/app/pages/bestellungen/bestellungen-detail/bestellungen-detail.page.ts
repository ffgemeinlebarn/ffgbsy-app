import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-bestellungen-detail',
    templateUrl: './bestellungen-detail.page.html',
    styleUrls: ['./bestellungen-detail.page.scss'],
})
export class BestellungenDetailPage implements OnInit {

    public bestellung: Bestellung;

    constructor(
        private activatedRoute: ActivatedRoute,
        private api: ApiService) { }

    ngOnInit() {
        this.api.getBestellung(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(bestellung => this.bestellung = bestellung);
    }

    printBon(drucker_id) {
        // this.bestellungsHandler.printAnsichtsbestellungBestellpositionBon(drucker_id).then((data: any) => {
        //   this.bestellungsHandler.loadAnsichtsbestellung(this.idParam);
        //   if (data.all_success){
        //     this.frontend.showToast("Bon wurde erfolgreich gedruckt!", 2000);
        //   }else{
        //     this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bon konnte leider nicht gedruckt werden!');
        //   }
        // });
    }

    async askStornoAnzahl(bestellposition: Bestellposition) {

        // const alert = await this.alertController.create({
        //   header: 'Prompt!',
        //   inputs: [
        //     {
        //       placeholder: "Anzahl",
        //       name: 'anzahl',
        //       type: 'number',
        //       value: 1,
        //       min: 1,
        //       max: bestellposition.anzahl - bestellposition.anzahl_storno
        //     }
        //   ],
        //   buttons: [
        //     {
        //       text: 'Abbrechen',
        //       role: 'cancel',
        //       cssClass: 'secondary',
        //       handler: () => { return true; }
        //     }, {
        //       text: 'Anzahl stornieren',
        //       handler: (res) => {
        //         let anzahl = parseInt(res.anzahl);

        //         if ((anzahl > 0) && (anzahl <= (bestellposition.anzahl - bestellposition.anzahl_storno))){
        //           this.bestellungsHandler.stornoAnsichtsbestellungBestellposition(bestellposition, anzahl).then((data: any) => {

        //             this.bestellungsHandler.loadAnsichtsbestellung(bestellposition.bestellungen_id);

        //             if (data.insert.result && data.bon_result.result){
        //               this.frontend.showToast("Storno-Position und Bon wurden erfolgreich eingefügt und gedruckt!", 3000);
        //             }else if (data.insert.result && !data.bon_result.result){
        //               this.frontend.showOkAlert('Fehler beim Storno-Bon-Druck', 'Die Storno-Bestellposition wurde in die Datenbank eingefügt, konnte aber nicht gedruckt werden!');
        //             }else{
        //               this.frontend.showOkAlert('Fehler beim Einfügen in die Datenbank', 'Die Storno-Bestellposition konnte nicht in die Datenbank eingefügt werden!');
        //             }
        //           });
        //           return true;
        //         }
        //         return false;
        //       }
        //     }
        //   ]
        // });

        // await alert.present();
    }

}
