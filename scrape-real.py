import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
import random

def scrape_italian_real_estate():
    """Scraping reale da fonti immobiliari italiane"""
    
    sources = [
        {"name": "Immobiliare.it", "url": "https://www.immobiliare.it/vendita-case/milano/", "pages": 5},
        {"name": "Idealista", "url": "https://www.idealista.it/vendita-case/milano/", "pages":