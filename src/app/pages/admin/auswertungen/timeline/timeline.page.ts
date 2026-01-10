import { Component, inject, signal } from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorGeneratorService } from 'src/app/data/color-generator.service';
import { StatistikenService } from 'src/app/data/statistiken.service';

@Component({
    selector: 'ffgbsy-timeline',
    templateUrl: './timeline.page.html',
    styleUrls: ['./timeline.page.scss'],
    imports: [
        IonContent,
        IonButton,
        IonIcon,
        IonButtons,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonMenuButton,
        BaseChartDirective,
    ],
})
export class TimelinePage implements ViewDidEnter {
    private statistikenService = inject(StatistikenService);
    private colorGenerator = inject(ColorGeneratorService);

    public chartTimelineBestellungen: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [],
    };
    public chartTimelineFrequenz: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [],
    };
    public chartTimelineUmsatz: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [],
    };
    public chartOptions: ChartOptions = { responsive: true };

    public readyToShow = signal(false);

    public loadData() {
        this.statistikenService.readTimeline().subscribe((timeline) =>
            timeline.forEach((day, i) => {
                const filtred = day.quaters.filter((x) => x.hour > 8);
                const labels = filtred.map((x) => x.label);
                const date = this.formatDate(new Date(day.datum));

                this.chartTimelineBestellungen.labels = labels;
                this.chartTimelineFrequenz.labels = labels;
                this.chartTimelineUmsatz.labels = labels;

                this.chartTimelineBestellungen.datasets.push({
                    data: filtred.map((x) => x.anzahl_bestellungen),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colorGenerator.getRgba(i),
                    backgroundColor: this.colorGenerator.getRgba(i, 0.3),
                });

                this.chartTimelineFrequenz.datasets.push({
                    data: filtred.map((x) => x.bestellung_frequenz_mHz),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colorGenerator.getRgba(i),
                    backgroundColor: this.colorGenerator.getRgba(i, 0.3),
                });

                this.chartTimelineUmsatz.datasets.push({
                    data: filtred.map((x) => x.summe),
                    label: date,
                    fill: true,
                    tension: 0.5,
                    borderColor: this.colorGenerator.getRgba(i),
                    backgroundColor: this.colorGenerator.getRgba(i, 0.3),
                });

                this.readyToShow.set(true);
            })
        );
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
