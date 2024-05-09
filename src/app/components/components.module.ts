import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FrontendLoadingComponent } from './frontend-loading/frontend-loading.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FrontendLoadingComponent
    ],
    exports: [
        FrontendLoadingComponent
    ]
})
export class ComponentsModule { }
