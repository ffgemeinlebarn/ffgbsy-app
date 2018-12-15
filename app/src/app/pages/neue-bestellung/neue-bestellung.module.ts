import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NeueBestellungPage } from './neue-bestellung.page';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from "../../pipes/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: NeueBestellungPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule
  ],
  declarations: [NeueBestellungPage]
})
export class NeueBestellungPageModule {}
