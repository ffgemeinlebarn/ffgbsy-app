import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BestellungenPage } from './bestellungen.page';


const routes: Routes = [
    {
        path: '',
        component: BestellungenPage
    }
];

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BestellungenPage
]
})
export class BestellungenPageModule { }
