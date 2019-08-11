import { Component, OnInit } from '@angular/core';
import { Geraet } from 'src/app/classes/geraet.class';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { SessionService } from 'src/app/services/session/session.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public diesesGeraet: Geraet;

  constructor(
    public bestellungsHandler: BestellungenHandlerService,
    public data: DataService,
    public session: SessionService,
    public settings: SettingsService,
    public bestellungen: BestellungenHandlerService,
    public frontend: FrontendService
  ) { }

  ngOnInit() { }

}
