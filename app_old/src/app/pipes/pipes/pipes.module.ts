import { NgModule } from '@angular/core';
import { StatusPipe } from '../status/status.pipe';
import { EigenschaftenChangedToMitPipe } from '../eigenschaften-changed-to-mit/eigenschaften-changed-to-mit.pipe';
import { EigenschaftenChangedToOhnePipe } from '../eigenschaften-changed-to-ohne/eigenschaften-changed-to-ohne.pipe';
import { EuroPreisPipe } from '../euro-preis/euro-preis.pipe';

@NgModule({
  declarations: [
    StatusPipe,
    EigenschaftenChangedToMitPipe,
    EigenschaftenChangedToOhnePipe,
    EuroPreisPipe
  ],
  imports: [

  ],
  exports: [
    StatusPipe,
    EigenschaftenChangedToMitPipe,
    EigenschaftenChangedToOhnePipe,
    EuroPreisPipe
  ]
})
export class PipesModule { }
