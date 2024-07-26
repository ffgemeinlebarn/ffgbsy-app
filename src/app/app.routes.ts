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
                path: 'uebersicht-angebot',
                loadComponent: () => import('./pages/admin/angebot-uebersicht/angebot-uebersicht.page').then(m => m.AngebotUebersichtPage)
            },
            {
                path: 'produktbereiche',
                loadComponent: () => import('./pages/admin/daten/produktbereiche/produktbereiche-list/produktbereiche-list.page').then(m => m.ProduktbereicheListPage)
            },
            {
                path: 'produktbereiche/:id',
                loadComponent: () => import('./pages/admin/daten/produktbereiche/produktbereiche-detail/produktbereiche-detail.page').then(m => m.ProduktbereicheDetailPage)
            },
            {
                path: 'grundprodukte',
                loadComponent: () => import('./pages/admin/daten/grundprodukte/grundprodukte-list/grundprodukte-list.page').then(m => m.GrundprodukteListPage)
            },
            {
                path: 'grundprodukte/:id',
                loadComponent: () => import('./pages/admin/daten/grundprodukte/grundprodukte-detail/grundprodukte-detail.page').then(m => m.GrundprodukteDetailPage)
            },
            {
                path: 'produkteinteilungen',
                loadComponent: () => import('./pages/admin/daten/produkteinteilungen/produkteinteilungen-list/produkteinteilungen-list.page').then(m => m.ProdukteinteilungenListPage)
            },
            {
                path: 'produkteinteilungen/:id',
                loadComponent: () => import('./pages/admin/daten/produkteinteilungen/produkteinteilungen-detail/produkteinteilungen-detail.page').then(m => m.ProdukteinteilungenDetailPage)
            },
            {
                path: 'produktkategorien',
                loadComponent: () => import('./pages/admin/daten/produktkategorien/produktkategorien-list/produktkategorien-list.page').then(m => m.ProduktkategorienListPage)
            },
            {
                path: 'produktkategorien/:id',
                loadComponent: () => import('./pages/admin/daten/produktkategorien/produktkategorien-detail/produktkategorien-detail.page').then(m => m.ProduktkategorienDetailPage)
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
                path: 'aufnehmer',
                loadComponent: () => import('./pages/admin/daten/aufnehmer/aufnehmer-list/aufnehmer-list.page').then(m => m.AufnehmerListPage)
            },
            {
                path: 'aufnehmer/:id',
                loadComponent: () => import('./pages/admin/daten/aufnehmer/aufnehmer-detail/aufnehmer-detail.page').then(m => m.AufnehmerDetailPage)
            },
            {
                path: 'tischkategorien',
                loadComponent: () => import('./pages/admin/daten/tischkategorien/tischkategorien-list/tischkategorien-list.page').then(m => m.TischkategorienListPage)
            },
            {
                path: 'tischkategorien/:id',
                loadComponent: () => import('./pages/admin/daten/tischkategorien/tischkategorien-detail/tischkategorien-detail.page').then(m => m.TischkategorienDetailPage)
            },
            {
                path: 'tische',
                loadComponent: () => import('./pages/admin/daten/tische/tische-list/tische-list.page').then(m => m.TischeListPage)
            },
            {
                path: 'tische/:id',
                loadComponent: () => import('./pages/admin/daten/tische/tische-detail/tische-detail.page').then(m => m.TischeDetailPage)
            }
        ]
    },
    {
        path: 'angebot-uebersicht',
        loadComponent: () => import('./pages/admin/angebot-uebersicht/angebot-uebersicht.page').then(m => m.AngebotUebersichtPage)
    },
    {
        path: 'aufnehmer-list',
        loadComponent: () => import('./pages/admin/daten/aufnehmer/aufnehmer-list/aufnehmer-list.page').then(m => m.AufnehmerListPage)
    },
    {
        path: 'aufnehmer-detail',
        loadComponent: () => import('./pages/admin/daten/aufnehmer/aufnehmer-detail/aufnehmer-detail.page').then(m => m.AufnehmerDetailPage)
    }
];
