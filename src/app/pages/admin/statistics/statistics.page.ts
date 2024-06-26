import { Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-statistics',
    templateUrl: './statistics.page.html',
    styleUrls: ['./statistics.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgChartsModule,
        DatePipe,
        EuroPreisPipe
    ],
})
export class StatisticsPage implements OnInit {

    private api = inject(ApiService);

    public readyTimeline = false;
    public readyPie = false;
    public tableProduktbereiche = null;
    public tableProduktkategorien = null;
    public chartTimelineBestellungen: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: []
    };
    public chartTimelineFrequenz: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: []
    };
    public chartTimelineUmsatz: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: []
    };
    public chartKennzahlenUmsatz: ChartConfiguration<'pie'>['data'] = {
        labels: [],
        datasets: []
    };
    public chartOptions: ChartOptions = {
        responsive: true
    };
    public chartLegend = true;

    private colors = [{
        borderColor: 'rgb(136, 17, 17)',
        backgroundColor: 'rgba(204, 25, 25, 0.3)'
    }, {
        borderColor: 'rgb(0, 0, 153)',
        backgroundColor: 'rgba(51, 51, 255, 0.3)'
    }, {
        borderColor: 'rgb(179, 179, 0)',
        backgroundColor: 'rgba(255, 255, 102, 0.3)'
    }, {
        borderColor: 'rgb(0, 102, 34)',
        backgroundColor: 'rgba(0, 204, 68, 0.3)'
    }];

    ngOnInit() {
        this.loadStatistics();
    }

    public loadStatistics() {
        this.api.getStatisticsTimeline().subscribe(timeline => {

            timeline.forEach((day, i) => {

                const filtred = day.quaters.filter(x => x.hour > 8);
                const labels = filtred.map(x => x.label);
                const date = this.formatDate(new Date(day.datum));

                this.chartTimelineBestellungen.labels = labels;
                this.chartTimelineFrequenz.labels = labels;
                this.chartTimelineUmsatz.labels = labels;

                this.chartTimelineBestellungen.datasets.push({
                    data: filtred.map(x => x.anzahl_bestellungen),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colors[i].borderColor,
                    backgroundColor: this.colors[i].backgroundColor
                });

                this.chartTimelineFrequenz.datasets.push({
                    data: filtred.map(x => x.bestellung_frequenz_mHz),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colors[i].borderColor,
                    backgroundColor: this.colors[i].backgroundColor
                });

                this.chartTimelineUmsatz.datasets.push({
                    data: filtred.map(x => x.summe),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colors[i].borderColor,
                    backgroundColor: this.colors[i].backgroundColor
                });
            });

            this.readyTimeline = true;
        });

        this.api.getStatisticsKennzahlen().subscribe(kennzahlen => {
            this.chartKennzahlenUmsatz.labels = kennzahlen.taeglich.map(x => x.label);
            this.chartKennzahlenUmsatz.datasets = [{
                data: kennzahlen.taeglich.map(x => x.summe)
            }];

            this.readyPie = true;
        });

        this.api.getStatisticsProduktbereiche().subscribe(stats => {
            this.tableProduktbereiche = stats;
        });

        this.api.getStatisticsProduktkategorien().subscribe(stats => {
            this.tableProduktkategorien = stats;
        });
    }

    private formatDate(date) {
        return [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear(),
        ].join('.');
    }
}
