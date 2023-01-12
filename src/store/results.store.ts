import { atom, map } from 'nanostores';
import { COUNTRIES } from '../const/countries';
import { Country } from '../model/country';
import { SearchResponse } from '../model/product';

const colombia: Country = COUNTRIES.find(
  (item: Country) => item.code === 'COL'
) as Country;

// --- Atoms

export const countrySelected = atom<Country>(colombia);

export const lowerPriceFirst = atom<boolean>(true);

export const storeIndexSelected = atom<number[]>([-1]);

// ---
export const searchResults = map<SearchResponse[]>();

export const addSearchResults = (results: SearchResponse[]) => {
  searchResults.set(results);
};

export const getSearchResults = () => {
  return searchResults.get();
};
