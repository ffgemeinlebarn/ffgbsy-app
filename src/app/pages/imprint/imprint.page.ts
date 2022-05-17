import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-imprint',
    templateUrl: './imprint.page.html',
    styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {

    public appName = null;
    public packageName = null;
    public versionCode = null;
    public versionNumber = null;

    constructor(private platform: Platform) { }
    ngOnInit() { }
}
