import { NgModule } from '@angular/core';
import { EuroPreisPipe } from './euro-preis/euro-preis.pipe';

@NgModule({
    imports: [
        EuroPreisPipe
    ],
    exports: [
        EuroPreisPipe
    ]
})
export class PipesModule { }
