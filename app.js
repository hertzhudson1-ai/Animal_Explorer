// Basic UI routing
const panels = {
  home: document.getElementById('home'),
  search: document.getElementById('search'),
  vision: document.getElementById('vision'),
  video: document.getElementById('video'),
  ai: document.getElementById('ai'),
  settings: document.getElementById('settings')
};
document.querySelectorAll('.sidebar nav button').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    document.querySelectorAll('.sidebar nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    Object.values(panels).forEach(p=>p.classList.remove('active'));
    const id = btn.id.replace('nav-','');
    panels[id].classList.add('active');
  });
});

// Settings persistence
const darkToggle = document.getElementById('dark-mode');
const autoplayToggle = document.getElementById('autoplay');
const loadSettings = () => {
  const s = JSON.parse(localStorage.getItem('av_settings')||'{}');
  darkToggle.checked = !!s.dark;
  autoplayToggle.checked = !!s.autoplay;
  document.body.classList.toggle('dark', s.dark);
};
const saveSettings = () => {
  localStorage.setItem('av_settings', JSON.stringify({dark: darkToggle.checked, autoplay: autoplayToggle.checked}));
  document.body.classList.toggle('dark', darkToggle.checked);
};
darkToggle.addEventListener('change', saveSettings);
autoplayToggle.addEventListener('change', saveSettings);
document.getElementById('reset-settings').addEventListener('click', ()=>{ localStorage.removeItem('av_settings'); loadSettings(); });
loadSettings();

// Plyr init for nice controls
const player = new Plyr('#player', {controls: ['play','progress','current-time','mute','volume','fullscreen']});
if (autoplayToggle.checked) player.muted = true;

// Video HLS fallback (if you serve .m3u8, uncomment and use hls.js)
// if (Hls.isSupported()) { const hls = new Hls(); hls.loadSource('media/stream.m3u8'); hls.attachMedia(document.getElementById('player')); }

// Animal search: Wikipedia + Wikidata
document.getElementById('search-btn').addEventListener('click', async ()=>{
  const q = document.getElementById('animal-query').value.trim();
  if (!q) return;
  const out = document.getElementById('search-results');
  out.innerHTML = '<em>Searching Wikipedia and Wikidata...</em>';
  try {
    // Wikipedia summary
    const wiki = await fetch(`/api/wiki?query=${encodeURIComponent(q)}`).then(r=>r.json());
    // Wikidata extra facts
    const wd = await fetch(`/api/wikidata?query=${encodeURIComponent(q)}`).then(r=>r.json());
    out.innerHTML = `<h3>${wiki.title}</h3><p>${wiki.extract}</p><p><strong>Wikidata:</strong> ${wd.description || 'No extra structured data found.'}</p>`;
  } catch (err) {
    out.innerHTML = `<div class="error">Error fetching data: ${err.message}</div>`;
  }
});

// AI Assistant (chat)
const chatLog = document.getElementById('chat-log');
const chatText = document.getElementById('chat-text');
document.getElementById('chat-send').addEventListener('click', sendChat);
chatText.addEventListener('keydown', e=>{ if (e.key === 'Enter') sendChat(); });
async function sendChat(){
  const text = chatText.value.trim(); if(!text) return;
  appendMsg('user', text); chatText.value='';
  appendMsg('bot', 'Thinking...');
  try {
    const res = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({prompt:text})});
    const data = await res.json();
    replaceLastBot(data.reply || 'No response');
  } catch (err) {
    replaceLastBot('Error: ' + err.message);
  }
}
function appendMsg(cls, text){
  const d = document.createElement('div'); d.className = 'msg ' + cls; d.textContent = text; chatLog.appendChild(d); chatLog.scrollTop = chatLog.scrollHeight;
}
function replaceLastBot(text){
  const msgs = chatLog.querySelectorAll('.msg.bot'); if (msgs.length) msgs[msgs.length-1].textContent = text;
}

// Advanced Vision: TensorFlow.js MobileNet
let model = null;
(async ()=>{ model = await mobilenet.load(); console.log('MobileNet loaded'); })();

document.getElementById('classify-btn').addEventListener('click', async ()=>{
  const file = document.getElementById('image-upload').files[0];
  if (!file) return alert('Choose an image first');
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.onload = async ()=>{
    const preds = await model.classify(img);
    document.getElementById('vision-output').innerHTML = '<h4>Predictions</h4>' + preds.map(p=>`<div>${p.className} — ${(p.probability*100).toFixed(2)}%</div>`).join('');
    // If top label looks like an animal, auto-search Wikipedia
    const top = preds[0]?.className || '';
    if (top) {
      document.getElementById('animal-query').value = top.split(',')[0];
      document.getElementById('search-btn').click();
    }
  };
});

// Camera capture
const camera = document.getElementById('camera');
document.getElementById('start-camera').addEventListener('click', async ()=>{
  const stream = await navigator.mediaDevices.getUserMedia({video:true});
  camera.srcObject = stream;
});
document.getElementById('snap').addEventListener('click', async ()=>{
  const c = document.createElement('canvas'); c.width = camera.videoWidth; c.height = camera.videoHeight;
  c.getContext('2d').drawImage(camera,0,0);
  const img = new Image(); img.src = c.toDataURL();
  img.onload = async ()=> {
    const preds = await model.classify(img);
    document.getElementById('vision-output').innerHTML = '<h4>Camera Predictions</h4>' + preds.map(p=>`<div>${p.className} — ${(p.probability*100).toFixed(2)}%</div>`).join('');
    document.getElementById('animal-query').value = preds[0]?.className.split(',')[0] || '';
    document.getElementById('search-btn').click();
  };
});

function init() { /* any extra init */ }
init();
