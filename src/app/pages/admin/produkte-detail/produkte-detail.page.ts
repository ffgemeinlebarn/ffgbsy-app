import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produkt } from 'src/app/classes/produkt.class';
import { ApiService } from 'src/app/services/api/api.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-produkte-detail',
    templateUrl: './produkte-detail.page.html',
    styleUrls: ['./produkte-detail.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgFor,
        NgIf,
        EuroPreisPipe,
    ],
})
export class ProdukteDetailPage implements OnInit {

    private api = inject(ApiService);
    private activatedRoute = inject(ActivatedRoute);
    public edit = inject(EditService);

    public produkt: Produkt = new Produkt();

    ngOnInit() {
        this.api.readProdukt(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((produkt) => {
            this.produkt = produkt;
        });
    }

    public save() {
        this.edit.updateProdukt(this.produkt).subscribe(produkt => {
            this.produkt = produkt;
            this.edit.readProdukte();
        });
    }
}
