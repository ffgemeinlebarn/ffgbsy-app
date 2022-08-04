import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrundproduktePage } from './grundprodukte.page';

const routes: Routes = [
  {
    path: '',
    component: GrundproduktePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrundproduktePageRoutingModule {}
