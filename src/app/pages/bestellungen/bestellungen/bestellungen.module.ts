import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BestellungenPage } from './bestellungen.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
        PipesModule
    ],
    declarations: [BestellungenPage]
})
export class BestellungenPageModule { }
