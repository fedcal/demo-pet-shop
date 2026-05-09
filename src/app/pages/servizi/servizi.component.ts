import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>Toelettatura professionale · Dog &amp; Cat Sitting · Addestramento cinofilo ENCI</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="servizi$ | async as catalogo">
      <section *ngFor="let s of catalogo.servizi" class="servizio-section" [id]="s.id">
        <div class="servizio-header">
          <span class="servizio-icon" aria-hidden="true">{{ s.icona }}</span>
          <h2>{{ s.nome }}</h2>
        </div>
        <p class="servizio-desc">{{ s.descrizione }}</p>

        <div class="servizio-body">
          <div class="tariffe-block">
            <h3>Tariffe</h3>
            <ul class="tariffe-list">
              <li *ngFor="let t of s.tariffe">
                <span>{{ t.voce }}</span>
                <span class="tariffa-price">{{ t.prezzo | currency: 'EUR' }}</span>
              </li>
            </ul>
          </div>
          <div class="servizio-meta">
            <div class="meta-item">
              <strong>Durata:</strong>
              <span>{{ s.durata }}</span>
            </div>
            <div class="meta-item meta-note">
              <strong>Note:</strong>
              <span>{{ s.note }}</span>
            </div>
            <a routerLink="/prenota" class="btn btn-primary">Prenota {{ s.nome }}</a>
          </div>
        </div>
      </section>

      <div class="faq-cta">
        <p>Hai domande sui nostri servizi? Consulta le <a routerLink="/chi-siamo">FAQ</a> o contattaci direttamente.</p>
        <a href="tel:+390305558900" class="btn btn-secondary">Chiama: +39 030 555 8900</a>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .servizio-section {
        margin-bottom: 4rem;
        padding-bottom: 3rem;
        border-bottom: 1px solid var(--color-border);
      }
      .servizio-section:last-of-type {
        border-bottom: none;
      }
      .servizio-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .servizio-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }
      .servizio-header h2 {
        margin: 0;
        font-size: 1.75rem;
      }
      .servizio-desc {
        color: var(--color-fg-muted);
        font-size: 1rem;
        margin: 0 0 2rem;
        line-height: 1.7;
        max-width: 720px;
      }
      .servizio-body {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }
      .tariffe-block h3 {
        margin: 0 0 1rem;
        font-size: 1.1rem;
      }
      .tariffe-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .tariffe-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.6rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.95rem;
        gap: 1rem;
      }
      .tariffe-list li:last-child {
        border-bottom: none;
      }
      .tariffa-price {
        color: var(--color-accent-dark);
        font-weight: 700;
        flex-shrink: 0;
      }
      .servizio-meta {
        background: var(--color-bg-subtle);
        padding: 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.9rem;
      }
      .meta-item strong {
        color: var(--color-fg-default);
      }
      .meta-item span {
        color: var(--color-fg-muted);
      }
      .meta-note span {
        font-style: italic;
        font-size: 0.85rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        font-size: 0.95rem;
        text-align: center;
        border: none;
        cursor: pointer;
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
      .faq-cta {
        text-align: center;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      .faq-cta p {
        margin: 0;
        color: var(--color-fg-muted);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly servizi$ = this.mockData.servizi$;
}
