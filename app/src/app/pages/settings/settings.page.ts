import { Component, OnInit } from '@angular/core';
import { Geraet } from 'src/app/classes/geraet.class';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public diesesGeraet: Geraet;

  constructor(private data: DataService, private settings: SettingsService) {
    console.log(settings);
  }

  ngOnInit() {
  }

}
