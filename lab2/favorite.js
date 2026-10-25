// favorite.js
let favoriteBook = JSON.parse(localStorage.getItem('booksData')) || [];

export function addFavorite(title, author, date) {
    const newBook = { Title: title, Author: author, Date: date };
    favoriteBook.push(newBook);
    
    localStorage.setItem('booksData', JSON.stringify(favoriteBook));
    console.log(`Successfully saved "${title}" to localStorage!`);
}

export function removeFavorite(titleToRemove) {
    favoriteBook = favoriteBook.filter(book => book.Title !== titleToRemove);
    localStorage.setItem('booksData', JSON.stringify(favoriteBook));
    console.log(`Removed "${titleToRemove}" from localStorage.`);
}

export function getFavorites() {
    return favoriteBook;
}