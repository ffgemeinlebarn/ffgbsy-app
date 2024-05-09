import { Component, inject } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';
import { BestellungenHandlerService } from './services/bestellungen/bestellungen-handler.service';
import { FrontendService } from './services/frontend/frontend.service';
import { DataService } from './services/data/data.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from './services/notification/notification.service';
import { EditService } from './services/edit/edit.service';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { NgClass, NgIf } from '@angular/common';
import { FrontendLoadingComponent } from './components/frontend-loading/frontend-loading.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
    alertCircle,
    arrowUndo,
    checkmarkCircle,
    closeCircle,
    closeOutline,
    createOutline,
    cubeOutline,
    fileTrayOutline,
    gitPullRequest,
    navigateCircleOutline,
    notificationsOutline,
    peopleOutline,
    personOutline,
    phonePortraitOutline,
    pulseOutline,
    radioButtonOff,
    refreshOutline,
    rocketOutline,
    save,
    searchOutline,
    send,
    settingsOutline,
    shieldCheckmarkOutline,
    star,
    timerOutline,
} from 'ionicons/icons';

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
        IonIcon,
        IonLabel,
        IonRouterOutlet
    ]
})
export class AppComponent {

    public isAdmin: boolean = false;

    constructor(
        public settings: SettingsService,
        public bestellungsHandler: BestellungenHandlerService,
        public data: DataService,
        public frontend: FrontendService,
        public notification: NotificationService,
        public edit: EditService
    ) {
        this.settings.ready.then(() => {
            this.isAdmin = environment.localAdminPin == this.settings.locale.adminPin;
        });

        addIcons({
            alertCircle,
            arrowUndo,
            checkmarkCircle,
            closeCircle,
            closeOutline,
            createOutline,
            cubeOutline,
            fileTrayOutline,
            gitPullRequest,
            navigateCircleOutline,
            notificationsOutline,
            peopleOutline,
            personOutline,
            phonePortraitOutline,
            pulseOutline,
            radioButtonOff,
            refreshOutline,
            rocketOutline,
            save,
            searchOutline,
            send,
            settingsOutline,
            shieldCheckmarkOutline,
            star,
            timerOutline,
        });
    }
}
