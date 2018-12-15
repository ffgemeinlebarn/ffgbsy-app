import { NgModule } from '@angular/core';
import { TischKachelComponent } from './tisch-kachel/tisch-kachel.component';
import { IonicModule } from '@ionic/angular';
import { KachelwandComponent } from './kachelwand/kachelwand.component';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        TischKachelComponent,
        KachelwandComponent
    ],
    exports: [
        TischKachelComponent,
        KachelwandComponent
    ],
})
export class ComponentsModule {}