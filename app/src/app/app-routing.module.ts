import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'init', loadChildren: './pages/start/init/init.module#InitPageModule' },
  { path: 'select-aufnehmer', loadChildren: './pages/start/select-aufnehmer/select-aufnehmer.module#SelectAufnehmerPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'neue-bestellung', loadChildren: './pages/bestellungen/neue-bestellung/neue-bestellung.module#NeueBestellungPageModule' },
  { path: 'bestellungen', loadChildren: './pages/bestellungen/bestellungen/bestellungen.module#BestellungenPageModule' },
  { path: 'systemstatus', loadChildren: './pages/systemstatus/systemstatus.module#SystemstatusPageModule' },
  { path: 'imprint', loadChildren: './pages/imprint/imprint.module#ImprintPageModule' },  { path: 'bestellungen-detail', loadChildren: './pages/bestellungen/bestellungen-detail/bestellungen-detail.module#BestellungenDetailPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
