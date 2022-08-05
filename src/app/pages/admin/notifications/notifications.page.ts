import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/classes/notification.class';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

    public notification: Notification;

    constructor(private api: ApiService) {
        this.reset();
    }
    ngOnInit() { }

    public reset() {
        this.notification = new Notification();
    }

    public sendNewNotification() {
        this.api.createNotification(this.notification).subscribe(_ => this.reset());
    }
}
