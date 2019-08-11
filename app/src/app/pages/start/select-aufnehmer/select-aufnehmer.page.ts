import { Component, OnInit } from '@angular/core';

// Services
import { DataService } from '../../../services/data/data.service';
import { SessionService } from '../../../services/session/session.service';

// Classes
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Geraet } from 'src/app/classes/geraet.class';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
  selector: 'app-select-aufnehmer',
  templateUrl: './select-aufnehmer.page.html',
  styleUrls: ['./select-aufnehmer.page.scss'],
})
export class SelectAufnehmerPage implements OnInit {

  public selectedAufnehmer: Aufnehmer;
  public geraet: Geraet;

  constructor(
    private http: HttpClient,
    private router: Router,
    public bestellungsHandler: BestellungenHandlerService,
    public data: DataService,
    public session: SessionService,
    public settings: SettingsService,
    public frontend: FrontendService
  ) {

    this.selectedAufnehmer = this.data.aufnehmer[0];
    this.geraet = this.data.getGeraetById(this.settings.locale.diesesGeraetId);
  }

  readySelectedAufnehmer(){
    this.session.setAufnehmer(this.selectedAufnehmer);
    this.session.setGeraet(this.geraet);

    this.session.start();
    this.router.navigateByUrl('/neue-bestellung');
  }

  ngOnInit() {  }

}
