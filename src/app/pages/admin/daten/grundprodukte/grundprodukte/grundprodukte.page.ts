import { Component, OnInit, inject } from '@angular/core';
import { EditService } from 'src/app/services/edit/edit.service';
import { RouterLink } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-grundprodukte',
    templateUrl: './grundprodukte.page.html',
    styleUrls: ['./grundprodukte.page.scss'],
    standalone: true,
    imports: [
    IonicModule,
    RouterLink
],
})
export class GrundproduktePage {
    edit = inject(EditService);
}
