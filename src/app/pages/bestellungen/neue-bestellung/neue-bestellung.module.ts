import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NeueBestellungPage } from './neue-bestellung.page';


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
    NeueBestellungPage
]
})
export class NeueBestellungPageModule { }
