import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
    IonApp,
    IonContent,
    IonMenu,
    IonRouterOutlet,
    IonSplitPane,
} from '@ionic/angular/standalone';
import { AppService } from './data/app.service';
import { IonIconsService } from './data/ion-icons.service';
import { FrontendLoadingComponent } from './feature/frontend-loading/frontend-loading.component';
import { MenuComponent } from './feature/menu/menu.component';

@Component({
    selector: 'ffgbsy-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [
        FrontendLoadingComponent,
        NgClass,
        IonApp,
        IonSplitPane,
        IonMenu,
        IonContent,
        IonRouterOutlet,
        MenuComponent,
    ],
})
export class AppComponent {
    private ionicIcons = inject(IonIconsService);
    private appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;
    public zoomLevel = computed(
        () => `zoom-level--${this.aufnehmer()?.zoom_level ?? 1}`
    );

    constructor() {
        this.ionicIcons.useDefinedIcons();
    }
}
