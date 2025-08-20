<script>
  // Aggiorna gli annunci ogni giorno
  function aggiornaAnnunci() {
    fetch('annunci.json')
      .then(response => response.json())
      .then(data => {
        const properties = document.getElementById('proprietà');
        data.forEach(annuncio => {
          const card = document.createElement('div');
          card.className = 'property-card';
          card.innerHTML = `
            <img src="${annuncio.immagine}" alt="${annuncio.titolo}">
            <h2>${annuncio.titolo}</h2>
            <p>${annuncio.località}</p>
            <p class="price">${annuncio.prezzo}</p>
          `;
          properties.appendChild(card);
        });
      });
  }
  aggiornaAnnunci();
</script>