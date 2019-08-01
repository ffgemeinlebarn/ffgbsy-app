import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'sync', loadChildren: './pages/sync/sync.module#SyncPageModule' },
  { path: 'neue-bestellung', loadChildren: './pages/neue-bestellung/neue-bestellung.module#NeueBestellungPageModule' },
  { path: 'bestellungen', loadChildren: './pages/bestellungen/bestellungen.module#BestellungenPageModule' },
  { path: 'bestellungen/:id', loadChildren: './pages/bestellung-detail/bestellung-detail.module#BestellungDetailPageModule' },
  { path: 'systemstatus', loadChildren: './pages/systemstatus/systemstatus.module#SystemstatusPageModule' },
  { path: 'select-aufnehmer', loadChildren: './pages/select-aufnehmer/select-aufnehmer.module#SelectAufnehmerPageModule' },
  { path: 'bestellungspositionEditModal', loadChildren: './modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.module#BestellungspositionEditModalPageModule' },
  { path: 'bestellung-kontrolle', loadChildren: './modals/bestellung-kontrolle/bestellung-kontrolle.module#BestellungKontrollePageModule' },
  { path: 'einstellungen', loadChildren: './pages/einstellungen/einstellungen.module#EinstellungenPageModule' },
  { path: 'impressum', loadChildren: './pages/impressum/impressum.module#ImpressumPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
