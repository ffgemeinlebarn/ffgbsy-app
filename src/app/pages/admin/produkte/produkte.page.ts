import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edit/edit.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-produkte',
    templateUrl: './produkte.page.html',
    styleUrls: ['./produkte.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        RouterLink,
        EuroPreisPipe,
    ],
})
export class ProduktePage implements OnInit {
    constructor(public edit: EditService) { }
    ngOnInit() { }
}
