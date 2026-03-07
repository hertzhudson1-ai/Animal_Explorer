/**
 * WILDLIFEEXPLORER - Main Intelligence Logic
 * Version: 3.0 Pro
 * Purpose: Handles UI interactions, data injection, and secure form simulation.
 */

// 1. Biological Database - Initial Research Data
const animals = [
    { 
        name: "Bengal Tiger", 
        scientific: "Panthera tigris tigris",
        vid: "7N08m_L9-9s", 
        threat: "Endangered",
        pop: "~3,900 remains",
        desc: "Apex predator of the Indian subcontinent. Our tracking units monitor territory expansion and human-wildlife conflict zones in the Sundarbans.", 
        img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600" 
    },
    { 
        name: "African Elephant", 
        scientific: "Loxodonta africana",
        vid: "AWaawE2zDbs", 
        threat: "Vulnerable",
        pop: "Decreasing",
        desc: "Keystone species for savanna ecosystems. WILDLIFEEXPLORER uses acoustic sensors to track migration patterns and prevent poaching incidents.", 
        img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600" 
    },
    { 
        name: "Mountain Gorilla", 
        scientific: "Gorilla beringei beringei",
        vid: "pM6O7Z1S7Yc", 
        threat: "Endangered",
        pop: "~1,063 remains",
        desc: "Residing in high-altitude volcanic slopes. Our AI modules analyze social behavior and respiratory health through non-invasive thermal imaging.", 
        img: "https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=600" 
    },
    { 
        name: "Snow Leopard", 
        scientific: "Panthera uncia",
        vid: "X9zS_G8E7kU", 
        threat: "Vulnerable",
        pop: "4,000 - 6,500",
        desc: "The 'Ghost of the Mountains'. Remote camera traps provide encrypted data streams from the Himalayas directly to our Central Hub.", 
        img: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600" 
    }
];

/**
 * Initializes the Species Database on the main page.
 */
function initDatabase() {
    const grid = document.getElementById('animalGrid');
    if (!grid) return;

    grid.innerHTML = animals.map(a => `
        <div class="card" onclick="openModal('${a.name}', '${a.desc}', '${a.vid}', '${a.threat}', '${a.pop}')">
            <div style="position:relative;">
                <img src="${a.img}" alt="${a.name}">
                <div style="position:absolute; top:10px; right:10px; background:rgba(6,95,70,0.8); color:white; padding:4px 10px; border-radius:20px; font-size:0.6rem; font-weight:800; border:1px solid rgba(255,255,255,0.2);">
                    ${a.threat.toUpperCase()}
                </div>
            </div>
            <div class="card-content">
                <span style="color:var(--secondary); font-weight:800; font-size:0.7rem; letter-spacing:1.5px; text-transform:uppercase;">Sector: Research Lab</span>
                <h3 style="margin: 8px 0;">${a.name}</h3>
                <p style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--text-light); margin-bottom:12px;">ID: ${a.scientific}</p>
                <p style="font-size:0.9rem; line-height:1.4;">${a.desc.substring(0, 90)}...</p>
                <div style="margin-top:15px; display:flex; align-items:center; gap:5px; color:var(--primary); font-weight:600; font-size:0.8rem;">
                    VIEW DEEP DATA →
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Handles the registration form with a simulated security handshake.
 */
window.handleRegistration = function(e) {
    e.preventDefault();
    const monitor = document.getElementById('secMonitor');
    const fname = document.getElementById('fname').value;
    const tier = document.getElementById('tier').value;

    monitor.innerHTML = `
        > INITIALIZING HANDSHAKE...<br>
        > GENERATING RSA KEYS... OK<br>
        > VERIFYING BIOMETRICS FOR: ${fname.toUpperCase()}<br>
        > ACCESS LEVEL: ${tier.toUpperCase()}<br>
        > [SUCCESS] ENCRYPTED LINK ESTABLISHED.
    `;
    
    // Add a pulsing effect to the monitor
    monitor.style.borderColor = 'var(--secondary)';
    monitor.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';

    setTimeout(() => {
        const welcomeBox = document.createElement('div');
        welcomeBox.className = 'security-monitor';
        welcomeBox.style.marginTop = '10px';
        welcomeBox.style.background = 'var(--primary)';
        welcomeBox.style.color = 'white';
        welcomeBox.innerHTML = `WELCOME TO THE NETWORK, EXPLORER ${fname}. YOUR HUB IS NOW ACTIVE.`;
        monitor.after(welcomeBox);
    }, 1000);
}

/**
 * Research Modal Controllers
 */
window.openModal = function(name, desc, vid, threat, pop) {
    const modal = document.getElementById('infoModal');
    document.getElementById('mTitle').innerText = name;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mThreat').innerText = threat;
    document.getElementById('mPop').innerText = pop;
    
    // Inject YouTube embed
    document.getElementById('player').innerHTML = `
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&modestbranding=1" 
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active');
    document.getElementById('player').innerHTML = ""; // Stop video
    document.body.style.overflow = 'auto';
}

/**
 * Global Theme Manager
 */
window.toggleTheme = function() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// Initialize application on load
window.addEventListener('DOMContentLoaded', initDatabase);
