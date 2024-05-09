import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduktePageRoutingModule } from './produkte-routing.module';

import { ProduktePage } from './produkte.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProduktePageRoutingModule,
        PipesModule,
        ProduktePage
    ]
})
export class ProduktePageModule { }
