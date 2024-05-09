import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdukteDetailPageRoutingModule } from './produkte-detail-routing.module';
import { ProdukteDetailPage } from './produkte-detail.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProdukteDetailPageRoutingModule,
        PipesModule,
        ProdukteDetailPage
    ]
})
export class ProdukteDetailPageModule { }
