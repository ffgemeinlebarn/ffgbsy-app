import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { ApiService } from 'src/app/services/api/api.service';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
    selector: 'app-grundprodukte-detail',
    templateUrl: './grundprodukte-detail.page.html',
    styleUrls: ['./grundprodukte-detail.page.scss'],
})
export class GrundprodukteDetailPage implements OnInit {

    public grundprodukt: Grundprodukt = new Grundprodukt();
    public unlimitiert = true;

    constructor(private activatedRoute: ActivatedRoute, private api: ApiService, public edit: EditService) { }

    ngOnInit() {
        this.api.readGrundprodukt(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((grundprodukt) => {
            this.grundprodukt = grundprodukt;
            this.unlimitiert = grundprodukt.bestand === null;
        });
    }

    public save() {

        this.grundprodukt.bestand = this.unlimitiert ? null : this.grundprodukt.bestand;

        this.edit.updateGrundprodukt(this.grundprodukt).subscribe(grundprodukt => {
            this.grundprodukt = grundprodukt;
            this.edit.readGrundprodukte();
        });
    }
}
