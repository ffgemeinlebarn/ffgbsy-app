import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { IonApp, IonContent, IonMenu, IonProgressBar, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIonicIcons from 'ionicons/icons';
import { AppService } from './data/app.service';
import { FrontendService } from './data/frontend.service';
import { MenuComponent } from './feature/menu/menu.component';

@Component({
    selector: 'ffgbsy-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [IonProgressBar, NgClass, IonApp, IonSplitPane, IonMenu, IonContent, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
    private readonly appService = inject(AppService);
    private readonly frontendService = inject(FrontendService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;
    public zoomLevel = computed(() => `zoom-level--${this.aufnehmer()?.zoom_level ?? 1}`);

    public loadingCount = this.frontendService.loadingSpinnerActiveCount;
    public loadingShow = computed(() => this.frontendService.loadingSpinnerActiveCount() > 0);
    public loadingMessage = this.frontendService.loadingSpinnerMessage;

    constructor() {
        addIcons(allIonicIcons);
    }
}
