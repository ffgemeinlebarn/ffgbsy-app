import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/start/init/init.page').then(m => m.InitPage) },
    { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage) },
    { path: 'neue-bestellung', loadComponent: () => import('./pages/bestellungen/neue-bestellung/neue-bestellung.page').then(m => m.NeueBestellungPage) },
    { path: 'bestellungen', loadComponent: () => import('./pages/bestellungen/bestellungen/bestellungen.page').then(m => m.BestellungenPage) },
    { path: 'bestellungen/:id', loadComponent: () => import('./pages/bestellungen/bestellungen-detail/bestellungen-detail.page').then(m => m.BestellungenDetailPage) },
    { path: 'systemstatus', loadComponent: () => import('./pages/systemstatus/systemstatus.page').then(m => m.SystemstatusPage) },
    {
        path: 'aufnehmer-edit',
        loadComponent: () => import('./pages/aufnehmer-edit/aufnehmer-edit.page').then(m => m.AufnehmerEditPage)
    },
    {
        path: 'admin',
        children: [

            {
                path: 'statistics',
                loadComponent: () => import('./pages/admin/statistics/statistics.page').then(m => m.StatisticsPage)
            },
            {
                path: 'grundprodukte',
                loadComponent: () => import('./pages/admin/daten/grundprodukte/grundprodukte/grundprodukte.page').then(m => m.GrundproduktePage)
            },
            {
                path: 'produkte',
                loadComponent: () => import('./pages/admin/daten/produkte/produkte-list/produkte-list.page').then(m => m.ProdukteListPage)
            },
            {
                path: 'produkte/:id',
                loadComponent: () => import('./pages/admin/daten/produkte/produkte-detail/produkte-detail.page').then(m => m.ProdukteDetailPage)
            },
            {
                path: 'grundprodukte/:id',
                loadComponent: () => import('./pages/admin/daten/grundprodukte/grundprodukte-detail/grundprodukte-detail.page').then(m => m.GrundprodukteDetailPage)
            },
            {
                path: 'logs',
                loadComponent: () => import('./pages/admin/logs/logs.page').then(m => m.LogsPage)
            }
        ]
    }
];
