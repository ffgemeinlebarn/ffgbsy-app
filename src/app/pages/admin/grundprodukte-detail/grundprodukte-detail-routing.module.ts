import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrundprodukteDetailPage } from './grundprodukte-detail.page';

const routes: Routes = [
    {
        path: '',
        component: GrundprodukteDetailPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GrundprodukteDetailPageRoutingModule { }
