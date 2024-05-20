import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-logs',
    templateUrl: './logs.page.html',
    styleUrls: ['./logs.page.scss'],
    standalone: true,
    imports: [
    IonicModule,
    FormsModule
],
})
export class LogsPage {
    api = inject(ApiService);
    frontend = inject(FrontendService);

    public logs: Array<any>;
    public usedFilter: any = {
        level: 'info',
        limit: 10
    };

    public availableFilter: any = {
        level: [2, 3, 4, 5, 6, 7],
        limits: [5, 10, 25, 50, 100]
    };


    public searchLogs() {
        let params = new HttpParams();
        params = params.append("level", this.usedFilter.level);
        params = params.append("limit", this.usedFilter.limit);

        this.api.searchLogs(params).subscribe((logs) => this.logs = logs);
    }
}
