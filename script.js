document.getElementById('regForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const confirmPass = document.getElementById('confirmPass').value;
  const human = document.getElementById('humanCheck').checked;
  const message = document.getElementById('message');

  // Basic validation
  if (name.length < 3) return message.textContent = 'Name too short - False details!';
  if (!/\S+@\S+\.\S+/.test(email)) return message.textContent = 'Invalid email - False!';
  if (pass !== confirmPass || pass.length < 8) return message.textContent = 'Passwords mismatch or weak - False!';
  if (!human) return message.textContent = 'Prove you\'re human - False!';

  // Simulate "proof" API check (e.g., email exists? Use free validator API)
  fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=your_free_hunter_key`) // Get free key from hunter.io
    .then(res => res.json())
    .then(data => {
      message.textContent = data.data.result === 'deliverable' ? 'Details verified true! Registered.' : 'Email invalid - False details!';
    })
    .catch(() => message.textContent = 'Verification failed - Try again.');
});
