import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'ffgbsy-frontend-loading',
    templateUrl: './frontend-loading.component.html',
    styleUrls: ['./frontend-loading.component.scss'],
})
export class FrontendLoadingComponent implements OnInit {
    constructor(public frontend: FrontendService) { }
    ngOnInit() { }
}
