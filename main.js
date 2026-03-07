document.addEventListener('DOMContentLoaded', () => {
  fetch('animals.json')
    .then(res => res.json())
    .then(animals => {
      const ul = document.getElementById('animalLinks');
      animals.forEach(animal => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="animals/${animal.name.toLowerCase().replace(/\s/g, '-')}.html">${animal.name}</a>`;
        ul.appendChild(li);
      });
    });
  const search = document.getElementById('search');
  search.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#animalLinks li').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
  });
});
