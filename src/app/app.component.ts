import { Component, computed, inject } from '@angular/core';
import { IonApp, IonButton, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { NgClass } from '@angular/common';
import { FrontendLoadingComponent } from './components/frontend-loading/frontend-loading.component';
import { RouterLink } from '@angular/router';
import { AppService } from './services/app/app.service';
import { IonIconsService } from './services/ion-icons/ion-icons.service';

@Component({
    selector: 'ffgbsy-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [
        FrontendLoadingComponent,
        RouterLink,
        NgClass,
        IonApp,
        IonSplitPane,
        IonMenu,
        IonContent,
        IonList,
        IonMenuToggle,
        IonItem,
        IonItemDivider,
        IonIcon,
        IonLabel,
        IonRouterOutlet,
        IonButton
    ]
})
export class AppComponent {

    private ionicIcons = inject(IonIconsService);
    private appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;
    public zoomLevel = computed(() => `zoom-level--${this.aufnehmer()?.zoom_level ?? 1}`);

    constructor() {
        this.ionicIcons.useDefinedIcons();
    }

    public logout() {
        this.appService.clearAufnehmer();
    }
}
