// Nel componente principale
useEffect(() => {
  const loadRealProperties = async () => {
    try {
      const response = await fetch('properties-real.json');
      const data = await response.json();
      setProperties(data.properties || mockProperties);
      setFilteredProperties(data.properties || mockProperties);
      setLastUpdate(data.last_updated);
    } catch (error) {
      console.error("Errore nel caricamento proprietà reali:", error);
      // Fallback a dati demo
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };
  
  loadRealProperties();
  
  // Auto-refresh ogni ora
  const refreshInterval = setInterval(loadRealProperties,