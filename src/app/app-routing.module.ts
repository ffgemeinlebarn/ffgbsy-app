import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'init', pathMatch: 'full' },
    { path: 'init', loadChildren: () => import('./pages/start/init/init.module').then(m => m.InitPageModule) },
    { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
    { path: 'neue-bestellung', loadChildren: () => import('./pages/bestellungen/neue-bestellung/neue-bestellung.module').then(m => m.NeueBestellungPageModule) },
    { path: 'bestellungen', loadChildren: () => import('./pages/bestellungen/bestellungen/bestellungen.module').then(m => m.BestellungenPageModule) },
    { path: 'bestellungen/:id', loadChildren: () => import('./pages/bestellungen/bestellungen-detail/bestellungen-detail.module').then(m => m.BestellungenDetailPageModule) },
    { path: 'systemstatus', loadChildren: () => import('./pages/systemstatus/systemstatus.module').then(m => m.SystemstatusPageModule) },
    { path: 'imprint', loadChildren: () => import('./pages/imprint/imprint.module').then(m => m.ImprintPageModule) }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
