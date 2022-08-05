import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
    selector: 'app-grundprodukte',
    templateUrl: './grundprodukte.page.html',
    styleUrls: ['./grundprodukte.page.scss'],
})
export class GrundproduktePage implements OnInit {
    constructor(public edit: EditService) { }
    ngOnInit() { }
}
