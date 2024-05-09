import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'ffgbsy-qr-scan',
    templateUrl: './qr-scan.component.html',
    styleUrls: ['./qr-scan.component.scss'],
    standalone: true,
})
export class QrScanComponent implements OnInit {

    private modalCtrl = inject(ModalController);

    public enabled = false;

    public ngOnInit() {
        this.start();
    }

    public start() {
        this.enabled = true;
    }

    public close() {
        this.enabled = false;
    }

    public onSuccess(data) {
        // this.logger.debug("[QR Scan Component] onSuccess", data);
        this.close();
        return this.modalCtrl.dismiss(data, 'success');
    }

    public onError(error) {
        // this.logger.warn("[QR Scan Component] onError", error);
        this.close();
        return this.modalCtrl.dismiss(error, 'error');
    }
}
