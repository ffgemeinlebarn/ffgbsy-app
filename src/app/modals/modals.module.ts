import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BestellungKontrollePage } from './bestellung-kontrolle/bestellung-kontrolle.page';
import { PipesModule } from "../pipes/pipes.module";
import { BestellungspositionEditModalPage } from './bestellungsposition-edit-modal/bestellungsposition-edit-modal.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScanComponent } from './qr-scan/qr-scan.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        ZXingScannerModule
    ],
    declarations: [
        BestellungKontrollePage,
        BestellungspositionEditModalPage,
        QrScanComponent
    ]
})
export class ModalsModule { }
