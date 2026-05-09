import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Bau &amp; Miao nasce nel 2012 dalla passione di Laura Meroni per il benessere degli animali.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>La nostra storia</h2>
        <p>
          Laura Meroni apre Bau &amp; Miao nel 2012 in Via Triumplina, nel quartiere Brescia 3, dopo 10 anni di
          esperienza nel settore veterinario. Parte da un piccolo spazio di 60 mq con una selezione curata di alimenti
          premium e la convinzione che ogni animale meriti cura, attenzione e prodotti di qualità.
        </p>
        <p>
          In pochi anni il negozio cresce fino agli attuali 200 mq, con uno spazio dedicato alla toelettatura
          professionale, un'area dog &amp; cat sitting e corsi di addestramento tenuti da Marco Farina, trainer
          certificato ENCI con 400+ cani addestrati. Oggi un team di 5 persone serve oltre 1.200 clienti abituali
          a Brescia e hinterland.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Benessere animale</h3>
            <p>Ogni scelta — dal prodotto al servizio — parte dal benessere fisico e psicologico dell'animale.</p>
          </li>
          <li>
            <h3>Professionalità</h3>
            <p>Certificazioni ENCI, ASET e percorsi di aggiornamento continuo per tutto il personale.</p>
          </li>
          <li>
            <h3>Consulenza onesta</h3>
            <p>Nessuna vendita forzata. Vi guidiamo verso i prodotti e i servizi realmente utili per il vostro animale.</p>
          </li>
          <li>
            <h3>Comunità locale</h3>
            <p>Partner di eventi cinofili bresciani e sostenitore del rifugio comunale di Brescia.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent-dark);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #1f2328;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent-dark);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: #ecfccb;
        color: var(--color-accent-dark);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
      }
      .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      .faq-item {
        padding: 1.25rem 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .faq-item h3 {
        margin: 0 0 0.75rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
