# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Blu primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi logo SVG in `public/logo.svg`.

## Cambiare i metadati SEO

Edita `src/index.html` per title globale, meta description, Open Graph.

---

## Possibili Sviluppi Customizzabili

### Pet Profiling & AI

1. **Pet behavior-driven profile AI**
   - Temperamento proprietario
   - LLM suggest giochi/snack/toelettatura
   - Interaction history learning

2. **Smart inventory recommendation**
   - Cibo per razza/età/allergie
   - Upsell snack seasonal
   - Stock management JIT

3. **AI match caregiver personality**
   - Temperamento pet vs caregiver
   - Rating affinity automatico

### Dog Sitting & Tracking

4. **Real-time dog sitting tracking + geofence**
   - GPS live caregiver sessione
   - Alert ingresso/uscita zona
   - Foto/video update 60 min

5. **Stress detection video ML**
   - Analisi comportamento realtime
   - Alert anomalie
   - Exacerbation tracking

6. **Temperature alert SMS**
   - Notifica se T>25°C durante sitting
   - Preventiva heat stroke

### Services & Subscriptions

7. **Grooming subscription recurring**
   - Mensile/trimestrale pacchetto
   - Slot riservato abbonati
   - Reminder 7 giorni prima
   - Sconto 10% over-the-shelf

8. **Trainer recommendation + referral**
   - Catalogo trainer professionisti
   - Referral 5% commission
   - Rating proprietari post-session

9. **Vet integration**
   - Link cartella veterinaria (consenso)
   - Allergeni/medicazioni visibili
   - Emergency contact integrato

### Marketing & Loyalty

10. **Loyalty tier gamification**
    - Punti per acquisti + dog sitting
    - Tier Bronze/Silver/Gold
    - Birthday reminder pet → coupon

11. **Community events**
    - Coordina play-dates gruppo
    - Foto ricordino gallery

12. **Marketplace snack artisanali**
    - Partner local featured
    - Rating review client

13. **Feed subscription box**
    - Curated snack/toy mensile
    - Based pet profile AI

### Safety & Documentation

14. **Incident documentation + insurance**
    - Infortunio report: foto + video
    - Attachment polizza automatico
    - Claim workflow tracciato
    - Auto-forward compagnia

15. **Smart collar integration**
    - Sync Airtag + Tractive dati
    - Health metrics realtime
    - Location breadcrumb

---

## Note Implementative

- **Stack**: Angular 21 SSR + Spring Boot + Ollama qwen2.5
- **Video**: Jitsi per live streaming telemedicine + storage encrypted
- **Mobile**: React Native app caregiver + proprietario offline-first
- **Deploy**: Vercel demo + VPS cliente GDPR-compliant
- **Timeline**: 10–14 settimane per vertical full-featured
