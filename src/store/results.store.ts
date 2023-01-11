import { atom, map } from 'nanostores';
import { SearchResponse } from '../model/product';

export const storeIndexSelected = atom<number>(-1);

export const searchResults = map<SearchResponse[]>();

export const addSearchResults = (results: SearchResponse[]) => {
  searchResults.set(results);
};

export const getSearchResults = () => {
  return searchResults.get();
};
