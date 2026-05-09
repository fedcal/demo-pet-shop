import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Il negozio per animali di Brescia</h1>
        <p class="hero-tagline">
          Toelettatura professionale, dog sitting, addestramento cinofilo e una selezione premium di prodotti.
          Brescia, Via Triumplina 18.
        </p>
        <div class="hero-actions">
          <a routerLink="/prodotti" class="btn btn-primary">Scopri i prodotti</a>
          <a routerLink="/prenota" class="btn btn-secondary">Prenota un servizio</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Bau &amp; Miao</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">✂️</span>
          <h3>Toelettatura certificata</h3>
          <p>Groomer con diploma ASET. Ogni trattamento su misura per razza e tipo di manto.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏠</span>
          <h3>Dog &amp; Cat Sitting</h3>
          <p>Custodia in struttura o visita domiciliare. Personale con formazione in comportamento animale.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Dog Trainer ENCI</h3>
          <p>Addestramento individuale e corsi di gruppo con trainer certificato. Dal cucciolo all'adulto.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🥩</span>
          <h3>Cibo premium selezionato</h3>
          <p>Royal Canin, Hill's, Farmina e altri brand veterinari. Consulenza nutrizionale gratuita.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredProdotti$ | async as prodotti">
      <div class="section-header">
        <h2>Prodotti in evidenza</h2>
        <a routerLink="/prodotti" class="link-more">Tutti i prodotti →</a>
      </div>
      <ul class="prodotto-grid">
        <li *ngFor="let p of prodotti" class="prodotto-card">
          <div class="prodotto-card__head">
            <h3>{{ p.nome }}</h3>
            <span class="prodotto-card__price">{{ p.prezzo | currency: 'EUR' }}</span>
          </div>
          <p class="prodotto-card__brand">{{ p.brand }}</p>
          <p class="prodotto-card__desc">{{ p.descrizione }}</p>
          <span *ngIf="p.premium" class="badge badge--premium">Premium</span>
        </li>
      </ul>
    </section>

    <section class="servizi-preview demo-container" *ngIf="serviziPreview$ | async as servizi">
      <div class="section-header">
        <h2>I nostri servizi</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <span class="servizio-card__icon" aria-hidden="true">{{ s.icona }}</span>
          <h3>{{ s.nome }}</h3>
          <p>{{ s.descrizione }}</p>
          <a routerLink="/prenota" class="btn btn-outline">Prenota ora</a>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Il tuo animale merita il meglio</h2>
        <p>Vieni a trovarci in Via Triumplina 18 a Brescia. Aperto 7 giorni su 7.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota online</a>
          <a href="https://wa.me/393495558901" target="_blank" rel="noopener" class="btn btn-secondary">WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f7fee7 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #1f2328;
      }
      .btn-primary:hover {
        background: var(--color-accent-dark);
        color: #ffffff;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .btn-outline {
        background: transparent;
        color: var(--color-accent-dark);
        border: 1.5px solid var(--color-accent);
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        display: inline-block;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-outline:hover {
        background: var(--color-accent);
        color: #1f2328;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 2rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent-dark);
        text-decoration: none;
        font-weight: 600;
      }
      .prodotto-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .prodotto-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .prodotto-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }
      .prodotto-card__head h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .prodotto-card__price {
        color: var(--color-accent-dark);
        font-weight: 700;
        flex-shrink: 0;
      }
      .prodotto-card__brand {
        font-size: 0.8rem;
        color: var(--color-accent-dark);
        font-weight: 600;
        margin: 0 0 0.5rem;
      }
      .prodotto-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--premium {
        background: #ecfccb;
        color: var(--color-accent-dark);
      }
      .servizi-preview {
        padding: 4rem 1rem;
        margin: 0 1rem 2rem;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .servizio-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-card__icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .servizio-card h3 {
        margin: 0 0 0.5rem;
      }
      .servizio-card p {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1rem;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredProdotti$ = this.mockData.prodotti$.pipe(
    map((catalogo) => catalogo.prodotti.filter((p) => p.premium).slice(0, 3))
  );

  readonly serviziPreview$ = this.mockData.servizi$.pipe(
    map((catalogo) => catalogo.servizi)
  );
}
