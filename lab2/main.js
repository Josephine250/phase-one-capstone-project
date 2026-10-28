
import { fetchBooks } from './fetchbook.js';
import { getFavorites, addFavorite, removeFavorite } from './favorite.js';
import { render } from './render.js';
 
const state = {
  query: 'javascript',
  status: 'loading', // loading | success | error
  books: [],
  favorites: getFavorites(),
};
 
function update(changes) {
  Object.assign(state, changes);
  render(state);
}
 
// Lab 3.2 / 3.3 – load books from the API
async function load(query) {
  update({ query, status: 'loading' });
  try {
    update({ books: await fetchBooks(query), status: 'success' });
  } catch {
    update({ status: 'error' });
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