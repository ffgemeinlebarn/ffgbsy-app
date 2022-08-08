import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'ffgbsy-systemstatus',
    templateUrl: './systemstatus.page.html',
    styleUrls: ['./systemstatus.page.scss'],
})
export class SystemstatusPage implements OnInit {

    public systemstatus: any = null;
    public systemstatusDateTime: Date = null;

    constructor(
        private api: ApiService,
        public settings: SettingsService,
        public frontend: FrontendService,
        public data: DataService) { }

    ngOnInit() { }

    systemstatusAbrufen() {

        let startingDateTime = new Date();

        return this.api.getSystemstatus().subscribe((systemstatus) => {
            this.systemstatusDateTime = startingDateTime;
            this.systemstatus = systemstatus;
            this.frontend.hideLoadingSpinner();
        });
    }

}
