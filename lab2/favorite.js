
const KEY = ' My favorites';
 
export function getFavorites() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}
 
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
 
export function addFavorite(book) {
  const list = getFavorites();
  return list.some((b) => b.key === book.key) ? list : save([...list, book]);
}
 
export function removeFavorite(key) {
  return save(getFavorites().filter((b) => b.key !== key));
}
 
export function isFavorite(key) {
  return getFavorites().some((b) => b.key === key);
}
 
// Receive favorites sent through the link 
// This keeps both pages 
export function importFromUrl() {
  if (!location.hash.startsWith('#fav=')) return;
  try { save(JSON.parse(decodeURIComponent(location.hash.slice(5)))); } catch { /* ignore bad data */ }
  history.replaceState(null, '', location.pathname + location.search);
}