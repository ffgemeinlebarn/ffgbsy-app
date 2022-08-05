import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produkt } from 'src/app/classes/produkt.class';
import { ApiService } from 'src/app/services/api/api.service';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
    selector: 'app-produkte-detail',
    templateUrl: './produkte-detail.page.html',
    styleUrls: ['./produkte-detail.page.scss'],
})
export class ProdukteDetailPage implements OnInit {

    public produkt: Produkt = new Produkt();

    constructor(private activatedRoute: ActivatedRoute, private api: ApiService, public edit: EditService) { }

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
