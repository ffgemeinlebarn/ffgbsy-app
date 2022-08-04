import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrundproduktePageRoutingModule } from './grundprodukte-routing.module';

import { GrundproduktePage } from './grundprodukte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrundproduktePageRoutingModule
  ],
  declarations: [GrundproduktePage]
})
export class GrundproduktePageModule {}
