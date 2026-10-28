import { fetchBooks } from './fetchbook.js';
import { getFavorites, addFavorite, removeFavorite, importFromUrl } from './favorite.js';
import { render } from './render.js';
 
importFromUrl(); // favorites sent from the Favorites page
 
const state = {
  page: 'home',
  query: 'javascript',
  status: 'loading', // loading | success | error
  books: [],
  favorites: getFavorites(),
};
 
function update(changes) {
  Object.assign(state, changes);
  render(state);
}
 
// load books from the API
let latest = 0; // ignore slow, outdated responses
async function load(query) {
  const id = ++latest;
  update({ query, status: 'loading' });
  try {
    const books = await fetchBooks(query);
    if (id === latest) update({ books, status: 'success' });
  } catch (err) {
    console.error('Search failed:', err);
    if (id === latest) update({ status: 'error' });
  }
}
 
const app = document.getElementById('app');
 
// Lab 2.3 – DOM events (delegated, so they survive re-renders)
app.addEventListener('submit', (e) => {
  if (e.target.id !== 'search-form') return;
  e.preventDefault();
  const q = e.target.elements.q.value.trim();
  if (q) load(q);
});
 
app.addEventListener('click', (e) => {
  if (e.target.closest('#retry')) return load(state.query);
 
  const btn = e.target.closest('[data-fav]');
  if (!btn) return;
  const key = btn.dataset.fav;
  const isFav = state.favorites.some((b) => b.key === key);
  const book = [...state.books, ...state.favorites].find((b) => b.key === key);
  update({ favorites: isFav ? removeFavorite(key) : addFavorite(book) });
});
 
load(state.query);