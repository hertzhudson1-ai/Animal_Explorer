// Global variables
let currentAnimal = null;
let videoPlayer = null;
let webcamStream = null;
let settings = {
    theme: 'dark',
    fontSize: 'medium',
    videoQuality: 'auto',
    autoplayVideos: true,
    aiModel: 'gpt-3.5',
    visionAccuracy: 'balanced',
    autoDetect: true,
    dataSources: ['wikipedia', 'iucn', 'natgeo', 'animaldiversity'],
    notifications: true,
    soundEffects: true
};

// Mock data for demonstration (in production, this would come from APIs)
const animalDatabase = {
    lion: {
        name: 'Lion',
        scientificName: 'Panthera leo',
        conservationStatus: 'Vulnerable',
        habitat: 'Savannas, grasslands, and open woodlands',
        diet: 'Carnivore - primarily large ungulates',
        lifespan: '10-14 years in wild, up to 20 years in captivity',
        weight: '150-250 kg (males), 120-180 kg (females)',
        speed: 'Up to 80 km/h',
        description: 'The lion is a large cat of the genus Panthera native to Africa and India. It has a muscular, deep-chested body, short, rounded head, round ears, and a hairy tuft at the end of its tail.',
        behavior: 'Lions are social animals, living in groups called prides. Females do most of the hunting, while males protect the territory.',
        threats: 'Habitat loss, human-wildlife conflict, poaching',
        interestingFacts: [
            'Lions are the only cats that live in groups',
            'A lion\'s roar can be heard from 8 kilometers away',
            'Lions sleep for up to 20 hours a day'
        ],
        images: [
            'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
            'https://images.unsplash.com/
