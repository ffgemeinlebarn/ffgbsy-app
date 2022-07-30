import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestellungStartPageRoutingModule } from './bestellung-start-routing.module';

import { BestellungStartPage } from './bestellung-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestellungStartPageRoutingModule
  ],
  declarations: [BestellungStartPage]
})
export class BestellungStartPageModule {}
