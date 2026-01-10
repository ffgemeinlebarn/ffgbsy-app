import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar, ViewWillEnter } from '@ionic/angular/standalone';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { ApiService } from 'src/app/services/api/api.service';
import { StatistikenService } from 'src/app/services/statistiken/statistiken.service';

@Component({
    selector: 'ffgbsy-sales-volumne',
    templateUrl: './sales-volumne.page.html',
    styleUrls: ['./sales-volumne.page.scss'],
    imports: [IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, CommonModule, FormsModule, EuroPreisPipe, BaseChartDirective]
})
export class SalesVolumnePage implements ViewWillEnter {
    private apiService = inject(ApiService);
    private statistikenService = inject(StatistikenService);

    public pieChartReadyToShow = signal(false);

    public chartUmsatzProTag: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] }
    public chartOptions: ChartOptions = { responsive: true };
    public tableProduktbereiche = null;
    public tableProduktkategorien = null;

    public loadData() {
        this.statistikenService.readKennzahlen().subscribe(kennzahlen => {
            this.chartUmsatzProTag.labels = kennzahlen.taeglich.map(x => x.label);
            this.chartUmsatzProTag.datasets = [{
                data: kennzahlen.taeglich.map(x => x.summe)
            }];

            this.pieChartReadyToShow.set(true);
        });

        this.statistikenService.readProduktbereiche().subscribe(stats => {
            this.tableProduktbereiche = stats;
        });

        this.statistikenService.readProduktkategorien().subscribe(stats => {
            this.tableProduktkategorien = stats;
        });
    }
    ionViewWillEnter(): void {
        this.loadData();
    }
}
