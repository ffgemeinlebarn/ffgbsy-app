import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxLoggerLevel } from 'ngx-logger';
import { ApiService } from 'src/app/services/api/api.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-logs',
    templateUrl: './logs.page.html',
    styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

    public logs: Array<any>;
    public usedFilter: any = {
        level: NgxLoggerLevel.INFO,
        limit: 10
    };

    public availableFilter: any = {
        level: [2, 3, 4, 5, 6, 7],
        limits: [5, 10, 25, 50, 100]
    };

    constructor(private api: ApiService, public frontend: FrontendService) { }
    ngOnInit() { }

    public searchLogs() {
        let params = new HttpParams();
        params = params.append("level", this.usedFilter.level);
        params = params.append("limit", this.usedFilter.limit);

        this.api.searchLogs(params).subscribe((logs) => this.logs = logs);
    }
}
