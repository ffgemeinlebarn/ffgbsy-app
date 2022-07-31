import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
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
        PipesModule,
        ZXingScannerModule
    ],
    declarations: [BestellungenPage]
})
export class BestellungenPageModule { }
