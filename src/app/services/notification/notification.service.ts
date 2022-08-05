import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Notification } from 'src/app/classes/notification.class';
import { NotificationComponent } from 'src/app/modals/notification/notification.component';
import { ApiService } from '../api/api.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public unread: Array<Notification> = [];
    public archive: Array<Notification> = [];
    public lastPoll = null;

    constructor(private api: ApiService, private modalCtrl: ModalController, private settings: SettingsService) {

        this.settings.ready.then(_ => {
            this.lastPoll = new Date();
            this.api.getNotificationsUntil(this.lastPoll).subscribe((notifications) => {
                this.archive = notifications;

                setInterval(() => {
                    this.pollNew();
                }, 10 * 1000);
            });
        });
    }

    public showUnread() {
        this.show(this.unread);
    }

    public readIt(notification: Notification) {
        this.unread = this.unread.filter(n => n.id != notification.id);
    }

    public async show(notifications: Array<Notification>) {
        const ordered = notifications.reverse();
        const modal = await this.modalCtrl.create({
            component: NotificationComponent,
            componentProps: {
                notifications: ordered
            },
            cssClass: ''
        });

        this.unread = [];

        modal.present();
    }

    private pollNew() {
        console.log('[FFGBSY]', 'Notification Serivce', 'Poll new Notifications');

        const newLastPoll = new Date();
        this.api.getNotificationsSince(this.lastPoll).subscribe((notifications) => {
            this.lastPoll = newLastPoll;
            this.unread = this.unread.concat(notifications);
        });
    }
}