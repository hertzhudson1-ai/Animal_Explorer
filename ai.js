async function identify() {
  const file = document.getElementById('imgUpload').files[0];
  if (!file) return;

  const form = new FormData();
  form.append('image', file);

  const res = await fetch('https://api.example.com/identify', { // placeholder AI api
    method: 'POST',
    body: form
  });

  const data = await res.json();
  document.getElementById('aiOutput').innerHTML = `
    <h3>Detected: ${data.species}</h3>
    <p>${data.description}</p>
  `;
}
