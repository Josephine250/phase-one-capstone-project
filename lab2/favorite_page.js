
import { getFavorites, removeFavorite, importFromUrl } from './favorite.js';
import { render } from './render.js';
 
importFromUrl(); // favorites sent from the home page
 
const state = { page: 'favorites', favorites: getFavorites() };
 
render(state);
 

document.getElementById('app').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-fav]');
  if (!btn) return;
  state.favorites = removeFavorite(btn.dataset.fav);
  render(state);
});
 
// Refresh when coming back  or when another tab changes favorites
function refresh() {
  state.favorites = getFavorites();
  render(state);
}
window.addEventListener('pageshow', refresh);
window.addEventListener('storage', refresh);