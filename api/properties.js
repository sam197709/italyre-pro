// API per ottenere le proprietà
export async function getProperties() {
  try {
    const response = await fetch('https://realestateai-pro.s3.eu-central-1.amazonaws.com/properties.json');
    const data = await response.json();
    return data.properties;
  } catch (error) {
    console.error("Errore nel caricamento delle proprietà:", error);
    return []; // Ritorna array vuoto in caso di errore
  }
}