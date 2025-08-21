import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_immobiliare():
    # Esempio di scraping da un sito immobiliare
    url = "https://www.immobiliare.it/vendita-case/milano/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    annunci = []
    # Questo è un esempio - dovrai adattarlo al sito reale
    for annuncio in soup.find_all('div', class_='listing-item'):
        try:
            titolo = annuncio.find('p', class_='titolo').text.strip()
            prezzo = annuncio.find('li', class_='lif__pricing').text.strip()
            annunci.append({
                'titolo': titolo,
                'prezzo': prezzo,
                'data_aggiunta': time.strftime('%Y-%m-%d %H:%M:%S')
            })
        except:
            continue
    
    # Salva in un file JSON accessibile dal sito
    with open('annunci.json', 'w') as f:
        json.dump(annunci, f, indent=2)
    
    print(f"Scraping completato: {len(annunci)} annunci trovati")

if __name__ == "__main__":
    scrape_immobiliare()