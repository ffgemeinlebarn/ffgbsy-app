import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduktePageRoutingModule } from './produkte-routing.module';

import { ProduktePage } from './produkte.page';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduktePageRoutingModule,
    ProduktePage
]
})
export class ProduktePageModule { }
