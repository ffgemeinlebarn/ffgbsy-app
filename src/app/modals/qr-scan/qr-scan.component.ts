import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-qr-scan',
    templateUrl: './qr-scan.component.html',
    styleUrls: ['./qr-scan.component.scss'],
})
export class QrScanComponent implements OnInit {

    public enabled = false;

    constructor(private modalCtrl: ModalController) { }
    ngOnInit() {
        this.start();
    }

    start() {
        this.enabled = true;
    }

    close() {
        this.enabled = false;
    }

    onSuccess(data) {
        console.log("[FFGBSY]", "onSuccess", data);
        this.close();
        return this.modalCtrl.dismiss(data, 'success');
    }

    onError(error) {
        console.log("[FFGBSY]", "onError", error);
        this.close();
        return this.modalCtrl.dismiss(error, 'error');
    }
}
