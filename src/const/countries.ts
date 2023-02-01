import { Country } from '../model/country';
export enum COUNTRIES_CODES {
  COLOMBIA = 'COL',
  ARGENTINA = 'ARG',
  PERU = 'PER',
  CHILE = 'CHL',
  MEXICO = 'MEX',
  ESPANA = 'ESP',
  USA = 'USA',
}

export const COUNTRIES: Country[] = [
  { name: 'Colombia', code: COUNTRIES_CODES.COLOMBIA, icon: 'ColombiaIcon' },
  { name: 'Argentina', code: COUNTRIES_CODES.ARGENTINA, icon: 'ArgentinaIcon' },
  { name: 'Peru', code: COUNTRIES_CODES.PERU, icon: 'PeruIcon' },
  { name: 'Chile', code: COUNTRIES_CODES.CHILE, icon: 'ChileIcon' },
  { name: 'Mexico', code: COUNTRIES_CODES.MEXICO, icon: 'MexicoIcon' },
  { name: 'Espana', code: COUNTRIES_CODES.ESPANA, icon: 'MexicoIcon' },
  { name: 'USA', code: COUNTRIES_CODES.USA, icon: 'MexicoIcon' },
];
