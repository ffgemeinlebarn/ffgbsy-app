import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar, ViewWillEnter } from '@ionic/angular/standalone';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatistikenApiService } from '../../../../data/api/statistiken-api.service';
import { EuroPreisPipe } from '../../../../misc/euro-preis.pipe';
import { StatistikProduktkategorienUndBereicheDto } from '../../../../model/dto/statistiken.dto';

@Component({
    selector: 'ffgbsy-sales-volumne',
    templateUrl: './sales-volumne.page.html',
    styleUrls: ['./sales-volumne.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, CommonModule, FormsModule, EuroPreisPipe, BaseChartDirective],
})
export class SalesVolumnePage implements ViewWillEnter {
    private statistikenApiService = inject(StatistikenApiService);

    public pieChartReadyToShow = signal(false);

    public chartUmsatzProTag: ChartConfiguration<'pie'>['data'] = {
        labels: [],
        datasets: [],
    };
    public chartOptions: ChartOptions = { responsive: true };
    public tableProduktbereiche = signal<StatistikProduktkategorienUndBereicheDto>(null);
    public tableProduktkategorien = signal<StatistikProduktkategorienUndBereicheDto>(null);

    public loadData() {
        this.statistikenApiService.readKennzahlen().subscribe((kennzahlen) => {
            this.chartUmsatzProTag.labels = kennzahlen.taeglich.map((x) => x.label);
            this.chartUmsatzProTag.datasets = [
                {
                    data: kennzahlen.taeglich.map((x) => x.summe),
                },
            ];

            this.pieChartReadyToShow.set(true);
        });

        this.statistikenApiService.readProduktbereiche().subscribe((stats) => this.tableProduktbereiche.set(stats));
        this.statistikenApiService.readProduktkategorien().subscribe((stats) => this.tableProduktkategorien.set(stats));
    }
    ionViewWillEnter(): void {
        this.loadData();
    }
}
