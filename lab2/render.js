
const app = document.getElementById('app');
 
const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
 
export function render(state) {
  app.innerHTML = `
    ${renderNavbar(state.page, state.favorites)}
    <main class="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
      ${state.page === 'favorites'
        ? renderFavorites(state.favorites)
        : renderHero(state.query) + renderResults(state)}
    </main>
    ${renderFooter()}
  `;
}
 
// Lab 1.1 – navbar, hero, footer
export function renderNavbar(page, favs = []) {
  const count = favs.length;
  // The saved books travel with the link, so the next page always receives them
  const data = '#fav=' + encodeURIComponent(JSON.stringify(favs));
  const link = (href, label, key) =>
    `<a href="${href}" class="px-3 py-1 rounded ${page === key ? 'bg-amber-500 text-blue-950' : 'hover:bg-blue-800'}">${label}</a>`;
  return `
    <nav class="bg-blue-950 text-white shadow-md border-b-4 border-amber-500">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl md:text-2xl font-bold">Book Explorer</h1>
        <div class="flex gap-2 text-sm font-medium">
          ${link('index.html' + data, 'Home', 'home')}
          ${link('favorite.html' + data, `Favorites <span id="fav-count" class="ml-1 rounded-full bg-white text-blue-950 px-2 text-xs font-bold ${count ? '' : 'hidden'}">${count}</span>`, 'favorites')}
        </div>
      </div>
    </nav>`;
}
 
function renderHero(query) {
  return `
    <section class=" hover:scale-105 transition-transform duration-1000 ease-in-out h-90 relative text-white rounded-2xl p-6 md:p-12 mb-8 shadow-md overflow-hidden bg-blue-950 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80')">
      <div class="absolute inset-0 bg-blue-950/70"></div>
      <div class="relative">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-3">Explore books from around the world</h2>
      <p class="text-blue-100 mb-6">Search the Open Library by title.</p>
      <form id="search-form" class="flex flex-col sm:flex-row gap-2 max-w-xl">
        <input name="q" type="search" value="${esc(query)}" placeholder="Search books by title..."
          class="flex-1 rounded bg-white border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <button class="bg-amber-500 hover:bg-amber-400 text-blue-950 rounded px-6 py-2 font-semibold">Search</button>
      </form>
      </div>
    </section>`;
}
 
// Favorites page: every saved book, each with a Remove button
function renderFavorites(favs) {
  return `
    <h2 class="text-3xl font-extrabold text-blue-950 mb-6">Your saved books</h2>
    ${favs.length
      ? renderGrid(favs, favs)
      : `<p class="text-center text-gray-500 py-16">No favorites yet.
           <a href="index.html" class="text-blue-700 underline">Find a book to save</a>.</p>`}`;
}
 
// Lab 3.4 – loading / error / empty states
function renderResults(state) {
  if (state.status === 'loading') {
    return `<div class="flex justify-center py-16">
      <div class="h-12 w-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" role="status" aria-label="Loading"></div>
    </div>`;
  }
  if (state.status === 'error') {
    return `<div class="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
      <p class="mb-3">Could not load books. Check your connection and try again.</p>
      <button id="retry" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Retry</button>
    </div>`;
  }
  if (state.books.length === 0) {
    return `<p class="text-center text-gray-500 py-16">No results found. Try a different title.</p>`;
  }
  return renderGrid(state.books, state.favorites);
}
 
// Lab 1.2 / 1.3 – responsive grid: 1 col mobile, 2 tablet, 3-4 desktop
export function renderGrid(books, favorites) {
  return `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    ${books.map((b) => renderCard(b, favorites.some((f) => f.key === b.key))).join('')}
  </div>`;
}
 
export function renderCard(book, isFav) {
  return `
    <article class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div class="h-48 bg-gray-100 flex items-center justify-center">
        ${book.cover
          ? `<img src="${esc(book.cover)}" alt="Cover of ${esc(book.title)}" class="h-full object-cover" loading="lazy" />`
          : `<span class="text-gray-400 text-sm">No cover</span>`}
      </div>
      <div class="p-4 flex-1 flex flex-col">
        <p class="text-xs font-semibold text-blue-600">${esc(book.year)}</p>
        <h3 class="font-bold leading-snug mb-1 line-clamp-2">${esc(book.title)}</h3>
        <p class="text-sm text-gray-600 truncate mb-3">${esc(book.author)}</p>
        <button data-fav="${esc(book.key)}"
          class="mt-auto text-sm font-semibold px-3 py-2 rounded ${isFav
            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}">
          ${isFav ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </article>`;
}
 
export function renderFooter() {
  return `<footer class="bg-gray-900 text-gray-400 py-8 text-center text-sm">
    Book Explorer · Data from Open Library
  </footer>`;
}