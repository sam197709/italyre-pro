import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime

def scrape_real_properties():
    """Scraping di proprietà immobiliari reali da fonti pubbliche"""
    
    # Fonti immobiliari italiane affidabili
    sources = [
        {
            "name": "Immobiliare.it",
            "url": "https://www.immobiliare.it/vendita-case/milano/",
            "selector": "div.in-card"
        },
        {
            "name": "Idealista",
            "url": "https://www.idealista.it/vendita-case/milano/",
            "selector": "article.item"
        }
    ]
    
    all_properties = []
    
    for source in sources:
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            response = requests.get(source["url"], headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            properties = soup.select(source["selector"])
            
            for prop in properties[:5]:  # Limita a 5 proprietà per fonte
                try:
                    # Estrai i dati (adattati in base alla struttura reale)
                    title_elem = prop.select_one('p.titolo, h3.item-link')
                    price_elem = prop.select_one('li.lif__pricing, span.item-price')
                    location_elem = prop.select_one('p.location, div.item-location')
                    
                    if title_elem and price_elem:
                        property_data = {
                            "id": f"{source['name']}-{int(time.time()*1000)}-{len(all_properties)}",
                            "title": title_elem.get_text(strip=True),
                            "price": price_elem.get_text(strip=True),
                            "location": location_elem.get_text(strip=True) if location_elem else "Località non specificata",
                            "source": source["name"],
                            "scraped_at": datetime.now().isoformat(),
                            "featured": len(all_properties) < 3  # Le prime 3 sono in evidenza
                        }
                        all_properties.append(property_data)
                        
                except Exception as e:
                    print(f"Errore nell'estrazione di una proprietà: {e}")
                    continue
                    
        except Exception as e:
            print(f"Errore nel caricamento della fonte {source['name']}: {e}")
            continue
    
    # Se non trova proprietà reali, usa quelle di esempio
    if not all_properties:
        all_properties = [
            {
                "id": "demo-1",
                "title": "Villa Esclusiva a Milano - Centro Storico",
                "price": "€850.000",
                "location": "Milano, Centro Storico",
                "source": "Demo",
                "scraped_at": datetime.now().isoformat(),
                "featured": True
            },
            {
                "id": "demo-2", 
                "title": "Attico Panoramico a Roma - Parioli",
                "price": "€1.200.000",
                "location": "Roma, Parioli",
                "source": "Demo",
                "scraped_at": datetime.now().isoformat(),
                "featured": True
            },
            {
                "id": "demo-3",
                "title": "Casa Storica a Firenze - Oltrarno",
                "price": "€680.000",
                "location": "Firenze, Oltrarno",
                "source": "Demo", 
                "scraped_at": datetime.now().isoformat(),
                "featured": True
            }
        ]
    
    return all_properties

def save_properties_to_json(properties):
    """Salva le proprietà in un file JSON accessibile dal sito"""
    data = {
        "properties": properties,
        "total_count": len(properties),
        "last_updated": datetime.now().isoformat(),
        "sources_used": list(set([p["source"] for p in properties]))
    }
    
    with open('properties.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Salvate {len(properties)} proprietà in properties.json")
    return data

if __name__ == "__main__":
    print("Avvio scraping proprietà immobiliari...")
    properties = scrape_real_properties()
    result = save_properties_to_json(properties)
    print("Scraping completato!")
    print(f"Totale proprietà: {result['total_count']}")
    print(f"Fonti utilizzate: {', '.join(result['sources_used'])}")