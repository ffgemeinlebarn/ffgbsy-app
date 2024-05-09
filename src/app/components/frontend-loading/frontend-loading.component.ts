import { Component, OnInit, inject } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-frontend-loading',
    templateUrl: './frontend-loading.component.html',
    styleUrls: ['./frontend-loading.component.scss'],
    standalone: true,
    imports: [IonicModule, NgIf],
})
export class FrontendLoadingComponent {
    frontend = inject(FrontendService);
}
