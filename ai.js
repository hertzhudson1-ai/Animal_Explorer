function getAIFact() {
  const query = document.getElementById('aiInput').value;
  const result = document.getElementById('result');
  result.innerHTML = 'Generating...';

  // Use free Hugging Face API (get token from huggingface.co)
  fetch('https://api-inference.huggingface.co/models/gpt2', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer your_hf_token', 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: `Fun fact about ${query}:` })
  })
    .then(res => res.json())
    .then(data => {
      result.innerHTML = `<p>${data[0].generated_text}</p><img src="https://source.unsplash.com/featured/?${query.replace(/\s/g, '+')},wildlife" alt="${query}" style="max-width:100%; border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.3);">`;
    })
    .catch(() => result.innerHTML = 'AI error - Try again!');
}
