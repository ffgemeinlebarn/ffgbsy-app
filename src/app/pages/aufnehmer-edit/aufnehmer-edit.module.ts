import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AufnehmerEditPageRoutingModule } from './aufnehmer-edit-routing.module';
import { AufnehmerEditPage } from './aufnehmer-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AufnehmerEditPageRoutingModule,
        AufnehmerEditPage
    ]
})
export class AufnehmerEditPageModule { }
