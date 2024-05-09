import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        NgFor,
        DatePipe,
    ],
})
export class NotificationsPage implements OnInit {
    constructor(public notification: NotificationService) { }
    public ngOnInit() { }
}
