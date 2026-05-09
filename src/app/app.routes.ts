import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Bau & Miao Pet Store — Negozio animali, toelettatura, dog sitting a Brescia'
  },
  {
    path: 'prodotti',
    loadComponent: () => import('./pages/prodotti/prodotti.component').then((m) => m.ProdottiComponent),
    title: 'Prodotti — Bau & Miao Pet Store'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Bau & Miao Pet Store'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Bau & Miao Pet Store'
  },
  {
    path: 'prenota',
    loadComponent: () => import('./pages/prenota/prenota.component').then((m) => m.PrenotaComponent),
    title: 'Prenota un servizio — Bau & Miao Pet Store'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
