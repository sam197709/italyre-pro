// Scheduler per aggiornamento automatico ogni 24 ore
const RealEstateScraper = require('./scraper');

console.log('Scheduler avviato - Aggiornamento automatico ogni 24 ore');

// Funzione per eseguire lo scraping
async function runScraping() {
  console.log('Esecuzione scraping programmato...');
  
  const scraper = new RealEstateScraper();
  const properties = await scraper.scrapeProperties();
  
  // Salva le proprietà in un file
  const fs = require('fs');
  const data = {
    properties: properties,
    total_count: properties.length,
    last_updated: new Date().toISOString()
  };
  
  fs.writeFileSync('data/properties.json', JSON.stringify(data, null, 2));
  console.log('Proprietà salvate con successo!');
}

// Esegui immediatamente
runScraping();

// Pianifica l'esecuzione ogni 24 ore
setInterval(runScraping, 86400000); // 24 ore in millisecondi
{
  "name": "italyre-pro",
  "version": "1.0.0",
  "description": "Piattaforma immobiliare AI per il mercato italiano",
  "main": "index.html",
  "scripts": {
    "build": "echo 'Build completed successfully'",
    "start": "echo 'Starting server...'"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12"
  },
  "keywords": ["real-estate", "immobiliare", "italy"],
  "author": "sam197709",
  "license": "MIT"
}