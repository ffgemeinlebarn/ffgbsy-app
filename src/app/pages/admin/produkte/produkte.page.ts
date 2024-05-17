import { Component, OnInit, inject } from '@angular/core';
import { EditService } from 'src/app/services/edit/edit.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { RouterLink } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-produkte',
    templateUrl: './produkte.page.html',
    styleUrls: ['./produkte.page.scss'],
    standalone: true,
    imports: [
    IonicModule,
    RouterLink,
    EuroPreisPipe
],
})
export class ProduktePage {
    public edit = inject(EditService);
}
