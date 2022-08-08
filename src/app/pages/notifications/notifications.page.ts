import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'ffgbsy-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
    constructor(public notifications: NotificationService) { }
    public ngOnInit() { }
}
