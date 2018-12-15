import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BestellungKontrollePage } from './bestellung-kontrolle.page';
import { PipesModule } from "../../pipes/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: BestellungKontrollePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [BestellungKontrollePage]
})
export class BestellungKontrollePageModule {}
