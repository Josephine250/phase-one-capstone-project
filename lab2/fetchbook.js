
export async function fetchBooks(title) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
 
  // Keep only the fields the app needs
  return data.docs.map((d) => ({
    key: d.key,
    title: d.title,
    author: d.author_name?.[0] || 'Unknown author',
    year: d.first_publish_year || '',
    cover: d.cover_i ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg` : '',
  }));
}
 