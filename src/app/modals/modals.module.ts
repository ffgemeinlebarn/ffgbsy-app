import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BestellungKontrolleModalComponent } from './bestellung-kontrolle/bestellung-kontrolle-modal.component';
import { PipesModule } from "../pipes/pipes.module";
import { BestellungspositionEditModalComponent } from './bestellungsposition-edit-modal/bestellungsposition-edit-modal.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { ApiErrorComponent } from './api-error/api-error.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        ZXingScannerModule
    ],
    declarations: [
        BestellungKontrolleModalComponent,
        BestellungspositionEditModalComponent,
        QrScanComponent,
        ApiErrorComponent,
        NotificationComponent
    ]
})
export class ModalsModule { }
