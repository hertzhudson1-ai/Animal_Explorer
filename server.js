const fs = require('fs');
const animals = require('./animals.json'); // Load JSON

animals.forEach(animal => {
  const filename = `animals/${animal.name.toLowerCase().replace(/\s/g, '-')}.html`;
  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${animal.name} - Animal Explorer</title>
  <style>
    body { font-family: Arial; background: linear-gradient(to bottom, #2196F3, #673AB7); color: white; text-align: center; padding: 50px; animation: bgAnim 10s infinite; }
    @keyframes bgAnim { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    img { max-width: 80%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: transform 0.5s; }
    img:hover { transform: rotate(5deg) scale(1.1); }
    h1 { font-size: 4em; text-shadow: 3px 3px 6px #000; }
    p { font-size: 1.5em; background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; }
  </style>
</head>
<body>
  <h1>${animal.name}</h1>
  <img src="https://source.unsplash.com/featured/800x600/?${animal.name.toLowerCase()},wildlife" alt="${animal.name}">
  <p>Habitat: ${animal.habitat}</p>
  <p>Fact: ${animal.fact}</p>
  <a href="../index.html" style="color: #FFEB3B; text-decoration: none; font-size: 1.2em;">Back to Home</a>
</body>
</html>
  `;
  fs.mkdirSync('animals', { recursive: true });
  fs.writeFileSync(filename, content);
  console.log(`Generated: ${filename}`);
});
console.log('50 creative animal pages generated! Commit to GitHub.');
