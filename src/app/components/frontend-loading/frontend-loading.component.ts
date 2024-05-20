import { Component, OnInit, inject } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-frontend-loading',
    templateUrl: './frontend-loading.component.html',
    styleUrls: ['./frontend-loading.component.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class FrontendLoadingComponent {
    frontend = inject(FrontendService);
}
