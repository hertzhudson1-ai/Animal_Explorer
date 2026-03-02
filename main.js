// dark mode
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.theme = document.body.classList.contains('dark') ? 'dark' : 'light';
});

// persist theme
if (localStorage.theme === 'dark') document.body.classList.add('dark');

// live search
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', async () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ''; return; }
  const data = await fetch('data/animals.json').then(r => r.json());
  const matches = data.filter(a => a.name.toLowerCase().includes(q));
  searchResults.innerHTML = matches.length 
    ? matches.map(a => `<div class="result">${a.name}</div>`).join('')
    : '<p>No matches found</p>';
});
