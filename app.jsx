// Nella sezione di navigazione esistente
<nav className="flex space-x-8">
  {[
    { id: 'market', label: 'Mercato Immobiliare', icon: '🏠' },
    { id: 'ai', label: 'Assistente AI', icon: '🤖' },
    { id: 'saved', label: 'Salvati', icon: '❤️' },
    { id: 'alerts', label: 'Notifiche', icon: '🔔' },
    { id: 'china', label: '中国市场', icon: '🐉' } // <-- AGGIUNGI QUESTO
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
        activeTab === tab.id
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="mr-2">{tab.icon}</span>
      {tab.label}
    </button>
  ))}
</nav>// Nel componente principale
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