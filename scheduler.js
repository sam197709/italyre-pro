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
 