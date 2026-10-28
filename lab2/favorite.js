// // favorite.js
// let favoriteBook = JSON.parse(localStorage.getItem('booksData')) || [];

// export function addFavorite(title, author, date) {
//     const newBook = { Title: title, Author: author, Date: date };
//     favoriteBook.push(newBook);
    
//     localStorage.setItem('booksData', JSON.stringify(favoriteBook));
//     console.log(`Successfully saved "${title}" to localStorage!`);
// }

// export function removeFavorite(titleToRemove) {
//     favoriteBook = favoriteBook.filter(book => book.Title !== titleToRemove);
//     localStorage.setItem('booksData', JSON.stringify(favoriteBook));
//     console.log(`Removed "${titleToRemove}" from localStorage.`);
// }

// export function getFavorites() {
//     return favoriteBook;
// }

const KEY = 'favorites';
 
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