const app = document.getElementById('app');
 
const HERO_BG = "background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80') ";
const favData = (favs) => '#fav=' + encodeURIComponent(JSON.stringify(favs)); // saved books travel with the link
 
const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
 
export function render(state) {
  app.innerHTML = `
    ${renderNavbar(state.page, state.favorites)}
    <main class="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
      ${state.page === 'favorites' ? renderFavorites(state.favorites)
        : state.page === 'about' ? renderAbout()
        : renderHero(state.query, state.favorites) + renderResults(state)}
    </main>
    ${renderFooter()}
  `;
}
 
// Lab 1.1 – navbar, hero, footer
function renderNavbar(page, favs = []) {
  const count = favs.length;
  const data = favData(favs);
  const link = (href, label, key) =>
    `<a href="${href}" class="px-3 py-1 rounded ${page === key ? 'bg-amber-500 text-blue-950' : 'hover:bg-blue-800'}">${label}</a>`;
  return `
    <nav class="bg-blue-950 text-white shadow-md border-b-4 border-amber-500">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl md:text-2xl font-bold">Book Explorer</h1>
        <div class="flex gap-2 text-sm font-medium">
          ${link('index.html' + data, 'Home', 'home')}
          ${link('about.html' + data, 'About', 'about')}
          ${link('favorite.html' + data, `Favorites <span id="fav-count" class="ml-1 rounded-full bg-white text-blue-950 px-2 text-xs font-bold ${count ? '' : 'hidden'}">${count}</span>`, 'favorites')}
        </div>
      </div>
    </nav>`;
}
 
function renderHero(query, favs = []) {
  return `
    <section class="relative text-white p-6 md:p-12 mb-8 shadow-md overflow-hidden bg-blue-950 bg-cover bg-center transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
      style="${HERO_BG}">
      <div class="absolute inset-0 bg-blue-950/70"></div>
      <div class="relative">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-3">Explore books from around the world</h2>
      <p class="text-blue-100 mb-2">Your online library of coding books: search by title and save the ones you like.</p>
      <a href="about.html${favData(favs)}" class="inline-block mb-6 text-amber-300 underline hover:text-amber-200">Read more about our library →</a>
      <form id="search-form" class="flex flex-col sm:flex-row gap-2 max-w-xl">
        <input name="q" type="search" value="${esc(query)}" placeholder="Search books by title..."
          class="flex-1 rounded bg-white border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <button class="bg-amber-500 hover:bg-amber-400 text-blue-950 rounded px-6 py-2 font-semibold">Search</button>
      </form>
      </div>
    </section>`;
}
 
// About page: detailed description of the library
function renderAbout() {
  const topics = [
    ['JavaScript & Web Development', 'Language fundamentals, the DOM, asynchronous code, APIs and front-end frameworks.', ['ES6+', 'DOM', 'React', 'Node.js']],
    ['Python', 'Beginner-friendly introductions through to automation, data analysis and back-end development.', ['Basics', 'Automation', 'Data', 'Flask']],
    ['HTML & CSS', 'Structure and style responsive pages, from semantic markup to layouts and utility-first CSS.', ['Semantic HTML', 'Flexbox', 'Grid', 'Tailwind']],
    ['Databases & SQL', 'Design tables, write queries and understand how applications store and protect data.', ['SQL', 'Design', 'NoSQL']],
    ['Algorithms & Data Structures', 'The theory behind efficient programs: sorting, searching, trees, graphs and complexity.', ['Sorting', 'Graphs', 'Big-O']],
    ['Software Craft', 'Clean code, testing, version control and the habits of professional development teams.', ['Testing', 'Git', 'Clean code']],
  ];
  const paths = [
    ['Beginner', 'You are new to programming. Start with a gentle introduction to one language, then practise with small projects.', 'Try searching: python, javascript, html'],
    ['Intermediate', 'You can write programs and want to build real applications. Look for books on APIs, databases and frameworks.', 'Try searching: sql, react, web api'],
    ['Advanced', 'You want depth and craft. Explore algorithms, architecture, testing and performance.', 'Try searching: algorithms, design patterns'],
  ];
  const steps = [
    ['1. Search', 'Type a title or topic in the search bar on the Home page and press Search. Short, specific words such as “python” or “css grid” give the best results.'],
    ['2. Look at the card', 'Each card shows the cover, the first year the book was published, its title and its first listed author.'],
    ['3. Save it', 'Click “Add to favorites” on a book you want to read later. The Favorites count in the navbar goes up.'],
    ['4. Return any time', 'Open the Favorites page to see every saved book. Click “Remove from favorites” when you no longer need one.'],
  ];
  const faqs = [
    ['Where does the book information come from?', 'Book Explorer uses the public Open Library catalog, so the results you see are real book records with covers and authors when available.'],
    ['Why do some books have no cover?', 'Not every record in the catalog has a cover image. In that case the card shows “No cover”.'],
    ['Are my favorites saved after I close the browser?', 'Yes. They are stored in your browser on this device, so they are still there when you come back.'],
    ['Can I read the books here?', 'Book Explorer helps you discover and keep track of books. It is a catalog and reading list rather than a reader.'],
  ];
  return `
    <section class="relative text-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl p-6 md:p-12 mb-10 shadow-md overflow-hidden bg-blue-950 bg-cover bg-center"
      style="${HERO_BG}">
      <div class="absolute inset-0 bg-blue-950/70"></div>
      <div class="relative max-w-3xl">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-3">About Book Explorer</h2>
        <p class="text-blue-100 text-lg">A small online library for people who learn to code. Find programming books, see what they cover, and keep a personal list of the ones you want to read next.</p>
      </div>
    </section>
 
    <section class="mb-10 max-w-3xl">
      <h3 class="text-2xl font-bold mb-3">Our mission</h3>
      <p class="text-gray-700 mb-3">Learning to program means choosing from thousands of books, and it is hard to know where to begin. Book Explorer makes that search simple: one search bar, clear cards and a favorites list that remembers your choices.</p>
      <p class="text-gray-700">The library focuses on coding books, from first steps in a language to professional practices, so students, self-taught developers and teachers can all find something useful.</p>
    </section>
 
    <section class="mb-10">
      <h3 class="text-2xl font-bold mb-2">What you will find</h3>
      <p class="text-gray-600 mb-6">Search any programming topic. These are the main areas the library covers:</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${topics.map(([title, text, tags]) => `
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-5 border-t-4 border-t-amber-500">
            <h4 class="font-bold text-blue-950 mb-1">${title}</h4>
            <p class="text-sm text-gray-600 mb-3">${text}</p>
            <div class="flex flex-wrap gap-2">
              ${tags.map((t) => `<span class="text-xs bg-blue-50 text-blue-800 rounded-full px-2 py-1">${t}</span>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </section>
 
    <section class="mb-10">
      <h3 class="text-2xl font-bold mb-2">Where should I start?</h3>
      <p class="text-gray-600 mb-6">Pick the level that fits you today.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${paths.map(([title, text, tip]) => `
          <div class="bg-blue-50 rounded-lg p-5">
            <h4 class="font-bold text-blue-900 mb-1">${title}</h4>
            <p class="text-sm text-gray-700 mb-3">${text}</p>
            <p class="text-xs font-semibold text-blue-800">${tip}</p>
          </div>`).join('')}
      </div>
    </section>
 
    <section class="mb-10">
      <h3 class="text-2xl font-bold mb-6">How to use Book Explorer</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${steps.map(([title, text]) => `
          <div class="bg-white rounded-lg border border-gray-200 p-5">
            <h4 class="font-bold text-blue-950 mb-1">${title}</h4>
            <p class="text-sm text-gray-700">${text}</p>
          </div>`).join('')}
      </div>
    </section>
 
    <section class="mb-10 max-w-3xl">
      <h3 class="text-2xl font-bold mb-6">Frequently asked questions</h3>
      <div class="space-y-3">
        ${faqs.map(([q, a]) => `
          <details class="bg-white rounded-lg border border-gray-200 p-4">
            <summary class="font-semibold cursor-pointer">${q}</summary>
            <p class="text-sm text-gray-700 mt-2">${a}</p>
          </details>`).join('')}
      </div>
    </section>
 
    <section class="text-center bg-white rounded-lg border border-gray-200 p-8">
      <h3 class="text-xl font-bold mb-2">Ready to start reading?</h3>
      <p class="text-gray-600 mb-3">Search the catalog and build your own reading list.</p>
      <a href="index.html" class="inline-block bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold rounded px-6 py-2">Browse books</a>
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
function renderGrid(books, favorites) {
  return `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    ${books.map((b) => renderCard(b, favorites.some((f) => f.key === b.key))).join('')}
  </div>`;
}
 
function renderCard(book, isFav) {
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
 
function renderFooter() {
  return `<footer class="bg-gray-900 text-gray-400 py-8 text-center text-sm">
    Book Explorer · Data from Open Library
  </footer>`;
}