// config.js - Central place for all API keys & configuration
// WARNING: For GitHub Pages, keys here are visible in browser. Use only public/read-only APIs with domain restrictions.
// For real security → move to Vercel/Netlify + serverless proxy.

// --------------------- API Keys & Endpoints ---------------------
export const API_KEYS = {
  // Zoo Animal API (free, no key needed most times) - example
  zooAnimal: '',  // Usually no key required → leave empty or put dummy

  // API Ninjas Animals (if you still want to use it)
  apiNinjas: 'c4cl9184mblEFyesyrFGJqxCLVZAs4UvyvWFSubt',  // ← Paste your real key here (get from api-ninjas.com)

  // Xeno-canto (bird/wildlife sounds) - free, no key
  xenoCanto: '',

  // Unsplash (for beautiful animal background/feature images) - free tier key
  unsplash: 'YOUR_UNSPLASH_ACCESS_KEY_HERE',  // Get free at https://unsplash.com/developers

  // Hugging Face Inference (for AI-generated facts) - free tier
  huggingFace: 'hf_YOUR_HUGGINGFACE_TOKEN_HERE',

  // Add more APIs as needed (IUCN, iNaturalist, etc.)
};

// --------------------- Utility Functions ---------------------
export function getApiHeader(apiName) {
  const key = API_KEYS[apiName];
  if (!key) return {}; // No key needed for some APIs

  switch (apiName) {
    case 'apiNinjas':
      return { 'X-Api-Key': key };
    case 'unsplash':
      return { Authorization: `Client-ID ${key}` };
    case 'huggingFace':
      return { Authorization: `Bearer ${key}` };
    default:
      return {};
  }
}

// Base URLs (easy to update)
export const ENDPOINTS = {
  zooRandom: 'https://zoo-animal-api.herokuapp.com/animals/rand',
  animalsSearch: (query) => `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(query)}`,
  xenoSearch: (species) => `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(species)}`,
  unsplashSearch: (query) => `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' wildlife')}&per_page=1`,
};

// Export default for easy import
export default { API_KEYS, getApiHeader, ENDPOINTS };
