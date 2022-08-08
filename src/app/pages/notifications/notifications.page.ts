import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
    constructor(public notifications: NotificationService) {
        console.log("CTOR");
    }
    ngAfterViewChecked(): void {
        console.log("ngAfterViewChecked");
    }
    ngAfterContentChecked(): void {
        console.log("ngAfterContentChecked");
    }
    ngOnInit() {
        console.log("ngOnInit");
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit");
    }
}
