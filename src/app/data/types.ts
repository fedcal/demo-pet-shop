// Tipi TypeScript per i dati mock del pet shop

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  metaSeo: MetaSeo;
}

export interface CategoriaProdotto {
  id: string;
  nome: string;
  ordine: number;
}

export interface Prodotto {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  brand: string;
  peso: string | null;
  premium: boolean;
}

export interface CatalogoProdotti {
  categorie: CategoriaProdotto[];
  prodotti: Prodotto[];
}

export interface TariffaServizio {
  voce: string;
  prezzo: number;
}

export interface Servizio {
  id: string;
  nome: string;
  icona: string;
  descrizione: string;
  tariffe: TariffaServizio[];
  durata: string;
  note: string;
}

export interface CatalogoServizi {
  servizi: Servizio[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
}

export interface Team {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
