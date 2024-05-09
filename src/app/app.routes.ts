import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/start/init/init.module').then(m => m.InitPageModule) },
    { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
    { path: 'neue-bestellung', loadChildren: () => import('./pages/bestellungen/neue-bestellung/neue-bestellung.module').then(m => m.NeueBestellungPageModule) },
    { path: 'bestellungen', loadChildren: () => import('./pages/bestellungen/bestellungen/bestellungen.module').then(m => m.BestellungenPageModule) },
    { path: 'bestellungen/:id', loadChildren: () => import('./pages/bestellungen/bestellungen-detail/bestellungen-detail.module').then(m => m.BestellungenDetailPageModule) },
    { path: 'systemstatus', loadChildren: () => import('./pages/systemstatus/systemstatus.module').then(m => m.SystemstatusPageModule) },
    {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
    },
    {
        path: 'aufnehmer-edit',
        loadChildren: () => import('./pages/aufnehmer-edit/aufnehmer-edit.module').then(m => m.AufnehmerEditPageModule)
    },
    {
        path: 'admin/statistics',
        loadChildren: () => import('./pages/admin/statistics/statistics.module').then(m => m.StatisticsPageModule)
    },
    {
        path: 'admin/notifactions',
        loadChildren: () => import('./pages/admin/notifications/notifications.module').then(m => m.NotificationsPageModule)
    },
    {
        path: 'admin/grundprodukte',
        loadChildren: () => import('./pages/admin/grundprodukte/grundprodukte.module').then(m => m.GrundproduktePageModule)
    },
    {
        path: 'admin/produkte',
        loadChildren: () => import('./pages/admin/produkte/produkte.module').then(m => m.ProduktePageModule)
    },
    {
        path: 'admin/produkte/:id',
        loadChildren: () => import('./pages/admin/produkte-detail/produkte-detail.module').then(m => m.ProdukteDetailPageModule)
    },
    {
        path: 'admin/grundprodukte/:id',
        loadChildren: () => import('./pages/admin/grundprodukte-detail/grundprodukte-detail.module').then(m => m.GrundprodukteDetailPageModule)
    },
    {
        path: 'admin/logs',
        loadChildren: () => import('./pages/admin/logs/logs.module').then(m => m.LogsPageModule)
    }
];
