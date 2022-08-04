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
    {
        path: 'statistics',
        loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsPageModule)
    },
    {
        path: 'aufnehmer-edit',
        loadChildren: () => import('./pages/aufnehmer-edit/aufnehmer-edit.module').then(m => m.AufnehmerEditPageModule)
    },
    {
        path: 'notifications',
        loadChildren: () => import('./pages/admin/notifications/notifications.module').then(m => m.NotificationsPageModule)
    },
    {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
    },
    {
        path: 'grundprodukte',
        loadChildren: () => import('./pages/admin/grundprodukte/grundprodukte.module').then(m => m.GrundproduktePageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
