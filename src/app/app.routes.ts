import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/start/init/init.page').then(m => m.InitPage) },
    { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage) },
    { path: 'neue-bestellung', loadComponent: () => import('./pages/bestellungen/neue-bestellung/neue-bestellung.page').then(m => m.NeueBestellungPage) },
    { path: 'bestellungen', loadComponent: () => import('./pages/bestellungen/bestellungen/bestellungen.page').then(m => m.BestellungenPage) },
    { path: 'bestellungen/:id', loadComponent: () => import('./pages/bestellungen/bestellungen-detail/bestellungen-detail.page').then(m => m.BestellungenDetailPage) },
    { path: 'systemstatus', loadComponent: () => import('./pages/systemstatus/systemstatus.page').then(m => m.SystemstatusPage) },
    {
        path: 'notifications',
        loadComponent: () => import('./pages/notifications/notifications.page').then(m => m.NotificationsPage)
    },
    {
        path: 'aufnehmer-edit',
        loadComponent: () => import('./pages/aufnehmer-edit/aufnehmer-edit.page').then(m => m.AufnehmerEditPage)
    },
    {
        path: 'admin/statistics',
        loadComponent: () => import('./pages/admin/statistics/statistics.page').then(m => m.StatisticsPage)
    },
    {
        path: 'admin/notifactions',
        loadComponent: () => import('./pages/admin/notifications/notifications.page').then(m => m.NotificationsPage)
    },
    {
        path: 'admin/grundprodukte',
        loadComponent: () => import('./pages/admin/grundprodukte/grundprodukte.page').then(m => m.GrundproduktePage)
    },
    {
        path: 'admin/produkte',
        loadComponent: () => import('./pages/admin/produkte/produkte.page').then(m => m.ProduktePage)
    },
    {
        path: 'admin/produkte/:id',
        loadComponent: () => import('./pages/admin/produkte-detail/produkte-detail.page').then(m => m.ProdukteDetailPage)
    },
    {
        path: 'admin/grundprodukte/:id',
        loadComponent: () => import('./pages/admin/grundprodukte-detail/grundprodukte-detail.page').then(m => m.GrundprodukteDetailPage)
    },
    {
        path: 'admin/logs',
        loadComponent: () => import('./pages/admin/logs/logs.page').then(m => m.LogsPage)
    }
];
