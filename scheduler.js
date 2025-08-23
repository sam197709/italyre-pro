// File: scheduler.js
const cron = require('node-cron');
const RealEstateScraper = require('./scraper');

console.log('_SCHEDULER AVVIATO_: Aggiornamento automatico ogni 24 ore');

// Programma l'aggiornamento ogni 24 ore alle 3:00
cron.schedule('0 3 * * *', async () => {
  console.log('🔄 _INIZIO AGGIORNAMENTO AUTOMATICO_');
  
  const scraper = new RealEstateScraper();
  const cities = ['Milano', 'Roma', 'Firenze', 'Napoli', 'Torino', 'Venezia', 'Bologna', 'Palermo'];
  
  try {
    await scraper.scrapeAll(cities);
    console.log('✅ _AGGIORNAMENTO COMPLETATO CON SUCCESSO_');
  } catch (error) {
    console.error('❌ _ERRORE NELL\'AGGIORNAMENTO_:', error.message);
  }
});

// Aggiornamento ogni 6 ore durante il giorno
cron.schedule('0 */6 * * *', async () => {
  console.log('🔄 _AGGIORNAMENTO PARZIALE_ (ogni 6 ore)');
  
  const scraper = new RealEstateScraper();
  // Focus sulle città principali
  const mainCities = ['Milano', 'Roma', 'Firenze', 'Napoli', 'Torino'];
  
  try {
    await scraper.scrapeAll(mainCities);
    console.log('✅ _AGGIORNAMENTO PARZIALE COMPLETATO_');
  } catch (error) {
    console.error('❌ _ERRORE NELL\'AGGIORNAMENTO PARZIALE_:', error.message);
  }
});

console.log('⏰ _SCHEDULER ATTIVO_: Prossimo aggiornamento alle 3:00');