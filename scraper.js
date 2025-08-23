// File: scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class RealEstateScraper {
  constructor() {
    this.sources = [
      {
        name: 'Immobiliare.it',
        baseUrl: 'https://www.immobiliare.it',
        selectors: {
          propertyCard: 'div.in-card',
          title: 'p.titolo, h3.item-link',
          price: 'li.lif__pricing, span.item-price',
          location: 'p.location, div.item-location',
          bedrooms: 'div.features__item:contains("camera")',
          bathrooms: 'div.features__item:contains("bagno")',
          size: 'div.features__item:contains("mq")'
        }
      },
      {
        name: 'Idealista',
        baseUrl: 'https://www.idealista.it',
        selectors: {
          propertyCard: 'article.item',
          title: 'p.title, h3.item-link',
          price: 'span.item-price',
          location: 'p.location, div.item-location',
          bedrooms: 'span.rooms, div.features__item:contains("camera")',
          bathrooms: 'span.baths, div.features__item:contains("bagno")',
          size: 'span.surface, div.features__item:contains("mq")'
        }
      },
      {
        name: 'Casa.it',
        baseUrl: 'https://www.casa.it',
        selectors: {
          propertyCard: 'div.card',
          title: 'h3.title, p.property-title',
          price: 'div.price, span.price-value',
          location: 'p.location, div.property-location',
          bedrooms: 'span.bedrooms, div.features__item:contains("camera")',
          bathrooms: 'span.bathrooms, div.features__item:contains("bagno")',
          size: 'span.size, div.features__item:contains("mq")'
        }
      }
    ];
    
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'it-IT,it;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    };
  }

  async scrapeSource(source, cities = ['Milano', 'Roma', 'Firenze', 'Napoli', 'Torino']) {
    const properties = [];
    
    for (const city of cities) {
      try {
        console.log(`Scraping ${source.name} per ${city}...`);
        
        // URL di ricerca per la città
        const searchUrl = `${source.baseUrl}/vendita-case/${city.toLowerCase()}/`;
        
        const response = await axios.get(searchUrl, { headers: this.headers });
        const $ = cheerio.load(response.data);
        
        // Estrai le proprietà
        $(source.selectors.propertyCard).each((index, element) => {
          if (index >= 10) return; // Limita a 10 proprietà per città
          
          try {
            const title = $(element).find(source.selectors.title).first().text().trim();
            const priceText = $(element).find(source.selectors.price).first().text().trim();
            const location = $(element).find(source.selectors.location).first().text().trim();
            
            // Estrai i numeri dal prezzo
            const price = this.extractPrice(priceText);
            
            if (title && price > 0) {
              const property = {
                id: `${source.name}-${city}-${Date.now()}-${index}`,
                title: title,
                price: price,
                location: `${location}, ${city}`,
                bedrooms: this.extractNumber($(element).find(source.selectors.bedrooms).first().text()),
                bathrooms: this.extractNumber($(element).find(source.selectors.bathrooms).first().text()),
                size: this.extractNumber($(element).find(source.selectors.size).first().text()),
                type: this.getPropertyType(title),
                image: this.generatePlaceholderImage(city, index),
                description: `Proprietà esclusiva a ${city} con ${this.extractNumber($(element).find(source.selectors.bedrooms).first().text()) || '?'} camere da letto.`,
                features: this.extractFeatures(element, source.selectors),
                views: Math.floor(Math.random() * 1000) + 100,
                published: this.formatPublishedDate(),
                source: source.name,
                url: `${source.baseUrl}${$(element).find('a').first().attr('href') || ''}`
              };
              
              properties.push(property);
            }
          } catch (error) {
            console.error(`Errore nell'estrazione di una proprietà da ${source.name}:`, error.message);
          }
        });
        
        // Pausa per evitare di essere bloccati
        await this.delay(2000);
        
      } catch (error) {
        console.error(`Errore nel caricamento di ${source.name} per ${city}:`, error.message);
      }
    }
    
    return properties;
  }

  extractPrice(priceText) {
    if (!priceText) return 0;
    
    // Rimuovi simboli non numerici eccetto il punto e la virgola
    const cleanPrice = priceText.replace(/[^\d,.]/g, '').replace(',', '.');
    const price = parseFloat(cleanPrice);
    
    // Se il prezzo sembra essere in migliaia, convertilo
    return price < 1000 ? price * 1000 : price;
  }

  extractNumber(text) {
    if (!text) return 0;
    
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  getPropertyType(title) {
    const types = ['Appartamento', 'Villa', 'Attico', 'Casa Storica', 'Villetta'];
    for (const type of types) {
      if (title.toLowerCase().includes(type.toLowerCase())) {
        return type;
      }
    }
    return 'Appartamento'; // Default
  }

  generatePlaceholderImage(city, index) {
    const colors = {
      'Milano': '4f46e5',
      'Roma': '059669',
      'Firenze': 'dc2626',
      'Napoli': 'ea580c',
      'Torino': '7c3aed'
    };
    
    const color = colors[city] || '6366f1';
    return `https://placehold.co/400x300/${color}/ffffff?text=${city}+${index + 1}`;
  }

  extractFeatures(element, selectors) {
    const features = [];
    
    // Aggiungi caratteristiche comuni
    const commonFeatures = ['Ascensore', 'Cantina', 'Aria Condizionata', 'Terrazzo', 'Giardino', 'Piscina'];
    
    // Seleziona 3-5 caratteristiche casuali
    const numFeatures = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numFeatures; i++) {
      const randomFeature = commonFeatures[Math.floor(Math.random() * commonFeatures.length)];
      if (!features.includes(randomFeature)) {
        features.push(randomFeature);
      }
    }
    
    return features;
  }

  formatPublishedDate() {
    const hoursAgo = Math.floor(Math.random() * 24) + 1;
    return `${hoursAgo} ore fa`;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scrapeAll(cities) {
    console.log('Avvio scraping automatico...');
    
    let allProperties = [];
    
    for (const source of this.sources) {
      try {
        const properties = await this.scrapeSource(source, cities);
        allProperties = [...allProperties, ...properties];
        console.log(`Completato scraping da ${source.name}: ${properties.length} proprietà`);
      } catch (error) {
        console.error(`Errore nel scraping da ${source.name}:`, error.message);
      }
    }
    
    // Salva le proprietà in un file JSON
    await this.saveProperties(allProperties);
    
    console.log(`Scraping completato! ${allProperties.length} proprietà totali.`);
    return allProperties;
  }

  async saveProperties(properties) {
    const data = {
      properties: properties,
      total_count: properties.length,
      last_updated: new Date().toISOString(),
      sources_used: [...new Set(properties.map(p => p.source))]
    };
    
    try {
      await fs.writeFile(
        path.join(__dirname, 'data', 'properties.json'),
        JSON.stringify(data, null, 2),
        'utf8'
      );
      console.log('Proprietà salvate in data/properties.json');
    } catch (error) {
      console.error('Errore nel salvataggio delle proprietà:', error.message);
    }
  }
}

// Funzione principale
async function main() {
  const scraper = new RealEstateScraper();
  
  // Città da monitorare
  const cities = ['Milano', 'Roma', 'Firenze', 'Napoli', 'Torino', 'Venezia', 'Bologna', 'Palermo'];
  
  try {
    const properties = await scraper.scrapeAll(cities);
    console.log(`✅ ${properties.length} proprietà scaricate con successo!`);
  } catch (error) {
    console.error('❌ Errore nel processo di scraping:', error.message);
  }
}

// Esegui lo script se chiamato direttamente
if (require.main === module) {
  main();
}

module.exports = RealEstateScraper;
};

module.exports = { handler: scraperFunction };