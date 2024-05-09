import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { ApiService } from 'src/app/services/api/api.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-grundprodukte-detail',
    templateUrl: './grundprodukte-detail.page.html',
    styleUrls: ['./grundprodukte-detail.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgIf,
    ],
})
export class GrundprodukteDetailPage implements OnInit {

    private api = inject(ApiService);
    private activatedRoute = inject(ActivatedRoute);
    public edit = inject(EditService);

    public grundprodukt: Grundprodukt = new Grundprodukt();
    public unlimitiert = true;

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
