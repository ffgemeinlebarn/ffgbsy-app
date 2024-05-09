import { Component, OnInit, inject } from '@angular/core';
import { Notification } from 'src/app/classes/notification.class';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
    standalone: true,
    imports: [IonicModule, FormsModule],
})
export class NotificationsPage implements OnInit {

    private api = inject(ApiService);
    private bestellungenHandler = inject(BestellungenHandlerService);

    public notification: Notification;

    ngOnInit() {
        this.reset();
    }

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
