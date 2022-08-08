import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
    selector: 'ffgbsy-produkte',
    templateUrl: './produkte.page.html',
    styleUrls: ['./produkte.page.scss'],
})
export class ProduktePage implements OnInit {
    constructor(public edit: EditService) { }
    ngOnInit() { }
}
