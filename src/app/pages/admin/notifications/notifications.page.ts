import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/classes/notification.class';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

    public notification: Notification;

    constructor(private api: ApiService, private bestellungenHandler: BestellungenHandlerService) {
        this.reset();
    }
    ngOnInit() { }

    public reset() {
        this.notification = new Notification();

        if (this.bestellungenHandler.aufnehmer) {
            this.notification.author = `${this.bestellungenHandler.aufnehmer.vorname} ${this.bestellungenHandler.aufnehmer.nachname}`;
        }
    }

    public sendNewNotification() {
        this.api.createNotification(this.notification).subscribe(_ => this.reset());
    }
}
