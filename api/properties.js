// File: api/properties.js
export default async function handler(request, response) {
  try {
    // In produzione, questo caricherebbe da un database reale
    // Per ora usiamo dati mock basati sul PDF
    
    const mockProperties = [
      {
        id: 1,
        title: "Lussuoso Appartamento a Milano",
        price: 850000,
        location: "Milano, Centro Storico",
        bedrooms: 3,
        bathrooms: 2,
        size: 145,
        type: "Appartamento",
        image: "https://placehold.co/400x300/4f46e5/ffffff?text=Milano+Luxury",
        description: "Elegante appartamento nel cuore di Milano con vista sul Duomo. Ristrutturato nel 2022 con finiture di lusso.",
        features: ["Ascensore", "Cantina", "Aria Condizionata", "Terrazzo"],
        views: 1247,
        visits: 45,
        published: "2 ore fa",
        source: "Demo",
        url: "https://example.com/milano-luxury"
      },
      {
        id: 2,
        title: "Villa Esclusiva a Roma",
        price: 1200000,
        location: "Roma, Parioli",
        bedrooms: 4,
        bathrooms: 3,
        size: 280,
        type: "Villa",
        image: "https://placehold.co/400x300/059669/ffffff?text=Roma+Villa",
        description: "Villa signorile con giardino privato di 500mq e piscina. Posizione tranquilla ma vicina al centro città.",
        features: ["Giardino", "Piscina", "Garage", "Sistema di Sicurezza"],
        views: 983,
        visits: 38,
        published: "4 ore fa",
        source: "Demo",
        url: "https://example.com/roma-villa"
      },
      {
        id: 3,
        title: "Attico Panoramico a Firenze",
        price: 680000,
        location: "Firenze, Oltrarno",
        bedrooms: 2,
        bathrooms: 2,
        size: 110,
        type: "Attico",
        image: "https://placehold.co/400x300/dc2626/ffffff?text=Firenze+Attico",
        description: "Attico ristrutturato con vista mozzafiato sulla cupola del Duomo e sui tetti storici di Firenze.",
        features: ["Terrazza", "Tettoia", "Climatizzazione", "Finiture d'epoca"],
        views: 876,
        visits: 32,
        published: "6 ore fa",
        source: "Demo",
        url: "https://example.com/firenze-attico"
      }
    ];

    response.status(200).json({
      properties: mockProperties,
      total_count: mockProperties.length,
      last_updated: new Date().toISOString(),
      sources_used: ["Demo"]
    });
  } catch (error) {
    console.error("Errore nel caricamento delle proprietà:", error);
    response.status(500).json({ 
      error: "Errore nel caricamento delle proprietà",
      properties: [],
      total_count: 0
    });
  }
}