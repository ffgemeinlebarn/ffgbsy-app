import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrundprodukteDetailPageRoutingModule } from './grundprodukte-detail-routing.module';

import { GrundprodukteDetailPage } from './grundprodukte-detail.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GrundprodukteDetailPageRoutingModule
    ],
    declarations: [GrundprodukteDetailPage]
})
export class GrundprodukteDetailPageModule { }
