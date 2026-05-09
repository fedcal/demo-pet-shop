import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota un servizio</h1>
        <p>Toelettatura, dog sitting o addestramento — compila il form e ti contattiamo entro 24h.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="prenota-grid">
        <section class="info-block">
          <h2>Informazioni di contatto</h2>
          <p>{{ info.indirizzo.via }}<br />
             {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})</p>

          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari negozio</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>
        </section>

        <section class="form-block">
          <h2>Richiesta prenotazione</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <fieldset class="fieldset">
              <legend>Il tuo animale</legend>
              <div class="field">
                <label for="nomePet">Nome del tuo animale</label>
                <input id="nomePet" type="text" formControlName="nomePet" placeholder="es. Fido" required />
              </div>
              <div class="row">
                <div class="field">
                  <label for="specie">Specie</label>
                  <select id="specie" formControlName="specie" required>
                    <option value="">Seleziona</option>
                    <option value="cane">Cane</option>
                    <option value="gatto">Gatto</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                <div class="field">
                  <label for="eta">Età (anni)</label>
                  <input id="eta" type="number" formControlName="eta" min="0" max="30" placeholder="es. 3" />
                </div>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Servizio richiesto</legend>
              <div class="field">
                <label for="servizio">Servizio</label>
                <select id="servizio" formControlName="servizio" required>
                  <option value="">Seleziona un servizio</option>
                  <option value="toelettatura">Toelettatura professionale</option>
                  <option value="dog-sitting">Dog Sitting</option>
                  <option value="cat-sitting">Cat Sitting</option>
                  <option value="addestramento">Addestramento cinofilo</option>
                </select>
              </div>
              <div class="field">
                <label for="data">Data preferita</label>
                <input id="data" type="date" formControlName="data" required />
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>I tuoi dati</legend>
              <div class="field">
                <label for="nome">Nome e cognome</label>
                <input id="nome" type="text" formControlName="nome" required />
              </div>
              <div class="row">
                <div class="field">
                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email" required />
                </div>
                <div class="field">
                  <label for="telefono">Telefono</label>
                  <input id="telefono" type="tel" formControlName="telefono" required />
                </div>
              </div>
            </fieldset>

            <div class="field">
              <label for="note">Note aggiuntive (eventuali problemi di salute, carattere, allergie)</label>
              <textarea id="note" formControlName="note" rows="3"></textarea>
            </div>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per la prenotazione (GDPR 679/2016).
              </label>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione è realmente inviata. Per prenotare contatta il numero sopra.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">🐾</span>
              <h3>Richiesta ricevuta, {{ form.value.nome }}!</h3>
              <p>
                Hai richiesto <strong>{{ form.value.servizio }}</strong> per
                <strong>{{ form.value.nomePet }}</strong> il <strong>{{ form.value.data }}</strong>.
              </p>
              <p>In un sito reale riceveresti un'email di conferma e ti chiameremmo per definire l'orario.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
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
      .prenota-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem 1.25rem;
        margin: 0 0 1.25rem;
      }
      .fieldset legend {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-accent-dark);
        padding: 0 0.4rem;
      }
      .field {
        margin-bottom: 0.75rem;
        display: flex;
        flex-direction: column;
      }
      .field:last-child {
        margin-bottom: 0;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #1f2328;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
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
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin: 0 0 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrenotaComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nomePet: ['', [Validators.required, Validators.minLength(1)]],
    specie: ['', Validators.required],
    eta: [null],
    servizio: ['', Validators.required],
    data: ['', Validators.required],
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ eta: null, privacy: false });
    this.submitted.set(false);
  }
}
