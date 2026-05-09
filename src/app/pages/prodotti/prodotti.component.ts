import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { MockDataService } from '../../data/mock-data.service';
import type { Prodotto } from '../../data/types';

interface ProdottoView {
  categorie: { id: string; nome: string; prodotti: Prodotto[] }[];
}

@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri prodotti</h1>
        <p>20 prodotti selezionati — cibo premium, accessori, antiparassitari e integratori</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="view$ | async as view">
      <div class="filtri-bar">
        <span class="filtri-label">Filtra per categoria:</span>
        <div class="filtri-chips">
          <button
            class="chip"
            [class.chip--active]="categoriaAttiva() === null"
            (click)="setCategoriaAttiva(null)"
          >
            Tutti
          </button>
          <button
            *ngFor="let cat of view.categorie"
            class="chip"
            [class.chip--active]="categoriaAttiva() === cat.id"
            (click)="setCategoriaAttiva(cat.id)"
          >
            {{ cat.nome }}
          </button>
        </div>
      </div>

      <ng-container *ngFor="let cat of view.categorie">
        <section
          *ngIf="categoriaAttiva() === null || categoriaAttiva() === cat.id"
          class="categoria-section"
          [id]="cat.id"
        >
          <h2>{{ cat.nome }}</h2>
          <ul class="prodotti-list">
            <li *ngFor="let p of cat.prodotti" class="prodotto-item">
              <div class="prodotto-item__head">
                <h3>{{ p.nome }}</h3>
                <span class="prodotto-item__price">{{ p.prezzo | currency: 'EUR' }}</span>
              </div>
              <p class="prodotto-item__brand">{{ p.brand }}<ng-container *ngIf="p.peso"> · {{ p.peso }}</ng-container></p>
              <p class="prodotto-item__desc">{{ p.descrizione }}</p>
              <div class="prodotto-item__badges">
                <span *ngIf="p.premium" class="badge badge--premium">Premium</span>
              </div>
            </li>
          </ul>
        </section>
      </ng-container>

      <p class="disclaimer">
        Prezzi IVA inclusa. La disponibilità dei prodotti può variare. Venite in negozio per una consulenza
        nutrizionale gratuita con il nostro staff specializzato.
      </p>
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
      .filtri-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1.5rem 0;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 1.5rem;
      }
      .filtri-label {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        font-weight: 600;
        white-space: nowrap;
      }
      .filtri-chips {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .chip {
        padding: 0.35rem 0.9rem;
        border-radius: 9999px;
        border: 1.5px solid var(--color-border);
        background: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.15s ease;
        font-family: inherit;
      }
      .chip:hover {
        border-color: var(--color-accent);
        color: var(--color-accent-dark);
      }
      .chip--active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #1f2328;
        font-weight: 600;
      }
      .categoria-section {
        margin-bottom: 3rem;
      }
      .categoria-section h2 {
        font-size: 1.4rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .prodotti-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .prodotto-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .prodotto-item__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.25rem;
      }
      .prodotto-item__head h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .prodotto-item__price {
        color: var(--color-accent-dark);
        font-weight: 700;
        flex-shrink: 0;
      }
      .prodotto-item__brand {
        font-size: 0.8rem;
        color: var(--color-accent-dark);
        font-weight: 600;
        margin: 0 0 0.5rem;
      }
      .prodotto-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
        line-height: 1.5;
      }
      .prodotto-item__badges {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
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
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 1rem auto 3rem;
        max-width: 720px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProdottiComponent {
  private readonly mockData = inject(MockDataService);

  readonly categoriaAttiva = signal<string | null>(null);

  readonly view$ = this.mockData.prodotti$.pipe(
    map((catalogo) => ({
      categorie: catalogo.categorie
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat) => ({
          id: cat.id,
          nome: cat.nome,
          prodotti: catalogo.prodotti.filter((p) => p.categoria === cat.id)
        }))
    } satisfies ProdottoView))
  );

  setCategoriaAttiva(id: string | null): void {
    this.categoriaAttiva.set(id);
  }
}
