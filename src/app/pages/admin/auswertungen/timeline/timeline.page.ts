import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { ApiService } from 'src/app/services/api/api.service';
import { ColorGeneratorService } from 'src/app/services/color-generator/color-generator.service';

@Component({
    selector: 'ffgbsy-timeline',
    templateUrl: './timeline.page.html',
    styleUrls: ['./timeline.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonButton,
        IonIcon,
        IonButtons,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonMenuButton,
        DatePipe,
        EuroPreisPipe,
        BaseChartDirective
    ]
})
export class TimelinePage implements ViewDidEnter {
    private apiService = inject(ApiService);
    private colorGenerator = inject(ColorGeneratorService);

    public chartTimelineBestellungen: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
    public chartTimelineFrequenz: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
    public chartTimelineUmsatz: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
    public chartOptions: ChartOptions = { responsive: true };

    public readyToShow = signal(false);

    public loadData() {
        this.apiService.getStatisticsTimeline().subscribe(timeline => timeline.forEach((day, i) => {

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
                borderColor: this.colorGenerator.getRgba(i),
                backgroundColor: this.colorGenerator.getRgba(i, 0.3)
            });

            this.chartTimelineFrequenz.datasets.push({
                data: filtred.map(x => x.bestellung_frequenz_mHz),
                label: date,
                fill: true,
                tension: 0.5,
                borderColor: this.colorGenerator.getRgba(i),
                backgroundColor: this.colorGenerator.getRgba(i, 0.3)
            });

            this.chartTimelineUmsatz.datasets.push({
                data: filtred.map(x => x.summe),
                label: date,
                fill: true,
                tension: 0.5,
                borderColor: this.colorGenerator.getRgba(i),
                backgroundColor: this.colorGenerator.getRgba(i, 0.3)
            });

            this.readyToShow.set(true);
        }));
    }

    private formatDate(date) {
        return [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear(),
        ].join('.');
    }

    ionViewDidEnter(): void {
        this.loadData();
    }
}
