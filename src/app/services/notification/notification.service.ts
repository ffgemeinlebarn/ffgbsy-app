import { Injectable } from '@angular/core';
import { Notification } from 'src/app/classes/notification.class';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public unread: Array<Notification> = [];
    public archive: Array<Notification> = [];

    constructor(private api: ApiService) {
        setInterval(() => {
            this.pollNew();
        }, 10 * 1000);
    }

    public showUnread() {
        this.unread = [];
    }

    public show(notifications: Array<Notification>) {
        // this.modal.open(notifications);
    }

    private loadArchive() {
        // this.api.loadUntil()
    }

    private pollNew() {
        console.log('[FFGBSY]', 'Notification Serivce', 'Poll new Notifications');
        // this.api.loadSince()
        // this.unread.push(new Notification());
    }
}
