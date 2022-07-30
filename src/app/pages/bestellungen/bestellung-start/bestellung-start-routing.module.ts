import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestellungStartPage } from './bestellung-start.page';

const routes: Routes = [
  {
    path: '',
    component: BestellungStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestellungStartPageRoutingModule {}
