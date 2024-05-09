import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './statistics.page';
import { NgChartsModule } from 'ng2-charts';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgChartsModule,
        StatisticsPageRoutingModule,
        PipesModule,
        StatisticsPage
    ]
})
export class StatisticsPageModule { }
