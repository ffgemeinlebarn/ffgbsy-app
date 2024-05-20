import { Component, OnInit, effect, inject } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ApiService } from 'src/app/services/api/api.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StatusListItemComponent } from 'src/app/components/status-list-item/status-list-item.component';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from 'src/app/services/app/app.service';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'ffgbsy-systemstatus',
    templateUrl: './systemstatus.page.html',
    styleUrls: ['./systemstatus.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonTitle,
        IonContent,
        IonList,
        StatusListItemComponent
    ],
})
export class SystemstatusPage implements OnInit {
    private app = inject(AppService);
    private data = inject(DataService);
    private drucker = inject(DruckerService);
    private availability = inject(AvailabilityService);

    public api = this.availability.api;
    public druckerItems = toSignal(this.drucker.readAll().pipe(map((items) => items.map((item) => ({ drucker: item, result: null })))), { initialValue: [] });
    public dataItems = this.data.loadedReport;

    public check() {
        this.availability.check();

        // effect(() => { });
    }

    ngOnInit() {
        this.check();
    }
}
