let favoriteBook = [];
export function addFavorite(title,author,date){
        const newBook = {title:title,author:author,date:date}
        favoriteBook.push(newBook);
        console.log(`successfuly adding book :${title}`);

}
export function removeFavorite(title){
        favoriteBook=favoriteBook.filter(book =>book.title !==title);
        console.log(`removed book:"${title}"`);
        console.log("current list after removal:",favoriteBook);

}
 
export function getFavorites(){
        return favoriteBook;


}
console.log("starting add books in our array");
addFavorite("physics","jackison","21/act/2000");
addFavorite("mathematics","jems mathyo",1987);

console.log(getFavorites());
removeFavorite("physics");
console.log("List after removing:", getFavorites());
console.log("--- TEST FINISHED ---");