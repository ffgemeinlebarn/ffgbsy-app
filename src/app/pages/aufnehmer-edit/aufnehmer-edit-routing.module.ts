import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AufnehmerEditPage } from './aufnehmer-edit.page';

const routes: Routes = [
    {
        path: '',
        component: AufnehmerEditPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AufnehmerEditPageRoutingModule { }
