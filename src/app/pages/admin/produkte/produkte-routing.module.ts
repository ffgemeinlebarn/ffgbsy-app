import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduktePage } from './produkte.page';

const routes: Routes = [
  {
    path: '',
    component: ProduktePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduktePageRoutingModule {}
