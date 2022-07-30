import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitPage } from './init.page';
import { InitRequirementComponent } from 'src/app/components/init-requirement/init-requirement.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: InitPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [InitPage]
})
export class InitPageModule { }
