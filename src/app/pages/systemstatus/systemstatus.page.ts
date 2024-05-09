import { Component, OnInit, inject } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ApiService } from 'src/app/services/api/api.service';
import { NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-systemstatus',
    templateUrl: './systemstatus.page.html',
    styleUrls: ['./systemstatus.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        NgFor,
        DatePipe,
    ],
})
export class SystemstatusPage {

    api = inject(ApiService);
    settings = inject(SettingsService);
    frontend = inject(FrontendService);
    data = inject(DataService);

    public systemstatus: any = null;
    public systemstatusDateTime: Date = null;

    systemstatusAbrufen() {

        let startingDateTime = new Date();

        return this.api.getSystemstatus().subscribe((systemstatus) => {
            this.systemstatusDateTime = startingDateTime;
            this.systemstatus = systemstatus;
            this.frontend.hideLoadingSpinner();
        });
    }

}
