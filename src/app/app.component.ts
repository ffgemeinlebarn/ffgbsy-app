import { Component, computed, inject } from '@angular/core';
import { IonApp, IonButton, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { NgClass, NgIf } from '@angular/common';
import { FrontendLoadingComponent } from './components/frontend-loading/frontend-loading.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
    alertCircle,
    alertCircleOutline,
    arrowUndo,
    beerOutline,
    bookmarkOutline,
    bugOutline,
    checkmarkCircle,
    closeCircle,
    closeOutline,
    createOutline,
    cubeOutline,
    fileTrayOutline,
    gitPullRequest,
    logOutOutline,
    navigateCircleOutline,
    notificationsOutline,
    peopleOutline,
    personOutline,
    phonePortraitOutline,
    pulseOutline,
    radioButtonOff,
    refreshOutline,
    restaurantOutline,
    rocketOutline,
    save,
    searchOutline,
    send,
    sendOutline,
    settingsOutline,
    shieldCheckmarkOutline,
    star,
    statsChartOutline,
    timerOutline
} from 'ionicons/icons';
import { AppService } from './services/app/app.service';

@Component({
    selector: 'ffgbsy-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [
        FrontendLoadingComponent,
        RouterLink,
        NgClass,
        NgIf,
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

    private appService = inject(AppService);

    public aufnehmer = this.appService.aufnehmer;
    public isAdmin = this.appService.isAdmin;
    public zoomLevel = computed(() => `zoom-level--${this.aufnehmer()?.zoom_level ?? 1}`);

    constructor() {

        addIcons({
            alertCircle,
            alertCircleOutline,
            arrowUndo,
            beerOutline,
            bookmarkOutline,
            bugOutline,
            checkmarkCircle,
            closeCircle,
            closeOutline,
            createOutline,
            cubeOutline,
            fileTrayOutline,
            gitPullRequest,
            logOutOutline,
            navigateCircleOutline,
            notificationsOutline,
            peopleOutline,
            personOutline,
            phonePortraitOutline,
            pulseOutline,
            radioButtonOff,
            refreshOutline,
            restaurantOutline,
            rocketOutline,
            save,
            searchOutline,
            send,
            sendOutline,
            settingsOutline,
            shieldCheckmarkOutline,
            star,
            statsChartOutline,
            timerOutline
        });
    }

    public logout() {
        this.appService.clearAufnehmer();
    }
}
