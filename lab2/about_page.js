
import { getFavorites, importFromUrl } from './favorite.js';
import { render } from './render.js';
 
importFromUrl(); // keep the favorites badge in sync
render({ page: 'about', favorites: getFavorites() });