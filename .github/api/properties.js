// Endpoint API per le proprietà
export default async function handler(request, response) {
  try {
    // In produzione, questo caricherebbe da un database reale
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
        description: "Elegante appartamento nel cuore di Milano con vista sul Duomo.",
        features: ["Ascensore", "Cantina", "Aria Condizionata", "Terrazzo"],
        views: 1247,
        published: "2 ore fa"
      }
    ];

    response.status(200).json({
      properties: mockProperties,
      total_count: mockProperties.length,
      last_updated: new Date().toISOString()
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