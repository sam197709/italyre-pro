// Funzione serverless per lo scraping
const scraperFunction = async (event, context) => {
  try {
    // Simula lo scraping da fonti immobiliari
    const properties = await scrapeRealEstateSources();
    
    // Salva le proprietà in un file JSON accessibile
    await savePropertiesToJson(properties);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Scraping completato",
        properties_count: properties.length
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Errore nel scraping: " + error.message
      })
    };
  }
};

module.exports = { handler: scraperFunction };