import { addFavorite,getFavorites } from "./favorite.js";
console.log("DOM event");

// to find the selected button according to it class name 
const favButtons = document.querySelectorAll(".add-fav-btn");
favButtons.forEach(button =>{
        button.addEventListener("click",(event) => {
                const card = event.target.closest(".book-card");
                const titleText = card.querySelector(".book-title").innerText;
                const authorText = card.querySelector(".book-author").innerText;
                addFavorite(titleText,authorText,"N/A");
                event.target.classList.replace('bg-gray-600','bg-emerald-600');
                event.target.classList.replace('hover:bg-gray-800','hover:bg-emerald-700');
                event.target.disabled = true;
                console.log("current array:", getFavorites());
        });

                
}); 