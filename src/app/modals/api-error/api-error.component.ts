import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-api-error',
    templateUrl: './api-error.component.html',
    styleUrls: ['./api-error.component.scss'],
})
export class ApiErrorComponent implements OnInit {

    public error: Error | any;

    constructor() { }
    ngOnInit() {
        console.log(this.error);
    }
}
