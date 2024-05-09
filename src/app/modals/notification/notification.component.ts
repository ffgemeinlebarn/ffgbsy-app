import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { Notification } from 'src/app/classes/notification.class';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'ffgbsy-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        DatePipe,
    ],
})
export class NotificationComponent implements OnInit {

    public notifications: Array<Notification> = [];
    public notification: Notification = null;

    constructor(private modalCtrl: ModalController) { }
    ngOnInit() {
        this.readNext();
    }

    public readNext() {
        this.notification = this.notifications[0];
        this.notifications = this.notifications.filter(n => n.id != this.notification?.id) ?? [];
    }

    public close() {
        return this.modalCtrl.dismiss();
    }
}
