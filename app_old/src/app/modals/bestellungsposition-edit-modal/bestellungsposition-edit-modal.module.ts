import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BestellungspositionEditModalPage } from './bestellungsposition-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BestellungspositionEditModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BestellungspositionEditModalPage]
})
export class BestellungspositionEditModalPageModule {}
