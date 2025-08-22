import React, { useState, useEffect } from 'react';

const ItalyreProHomepage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [adRotation, setAdRotation] = useState(0);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('buy'); // buy, rent, sold, new
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Mock data for properties
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
      trendingScore: 95,
      views: 1247,
      visits: 45,
      published: "2 ore fa",
      agent: {
        name: "<NAME>",
        phone: "+39 333 1234567",
        email: "<EMAIL>",
        photo: "https://placehold.co/100x100/4f46e5/ffffff?text=MR"
      },
      coordinates: { lat: 45.4642, lng: 9.1900 }
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
      trendingScore: 92,
      views: 983,
      visits: 38,
      published: "4 ore fa",
      agent: {
        name: "<NAME>",
        phone: "+39 333 9876543",
        email: "<EMAIL>",
        photo: "https://placehold.co/100x100/059669/ffffff?text=LB"
      },
      coordinates: { lat: 41.9028, lng: 12.4964 }
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
      trendingScore: 88,
      views: 876,
      visits: 32,
      published: "6 ore fa",
      agent: {
        name: "<NAME>",
        phone: "+39 333 4567890",
        email: "<EMAIL>",
        photo: "https://placehold.co/100x100/dc2626/ffffff?text=GV"
      },
      coordinates: { lat: 43.7696, lng: 11.2558 }
    }
  ];

  // Advertising data for real estate agencies
  const agencyAds = [
    {
      id: 1,
      title: "Investi nel Mercato Immobiliare Italiano",
      description: "Scopri le migliori opportunità di investimento con il nostro team esperto",
      image: "https://placehold.co/600x300/059669/ffffff?text=Investment+Opportunity",
      cta: "Scopri di più",
      url: "https://example.com/investments"
    },
    {
      id: 2,
      title: "Mutui Casa con Tassi Agevolati",
      description: "Finanzia la tua casa dei sogni con i nostri mutui a tasso agevolato",
      image: "https://placehold.co/600x300/4f46e5/ffffff?text=Mortgage+Rates",
      cta: "Calcola il tuo mutuo",
      url: "https://example.com/mortgages"
    },
    {
      id: 3,
      title: "Ristrutturazioni Chiavi in Mano",
      description: "Trasforma il tuo immobile con il nostro servizio chiavi in mano",
      image: "https://placehold.co/600x300/dc2626/ffffff?text=Renovation+Service",
      cta: "Richiedi preventivo",
      url: "https://example.com/renovations"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setSearchResults(mockProperties);
      setLoading(false);
    }, 1500);

    // Set up ad rotation
    const adInterval = setInterval(() => {
      setAdRotation(prev => (prev + 1) % agencyAds.length);
    }, 5000);

    return () => clearInterval(adInterval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const filtered = properties.filter(property => {
      return (
        (filters.location === '' || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.minPrice === '' || property.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || property.price <= parseInt(filters.maxPrice)) &&
        (filters.bedrooms === '' || property.bedrooms >= parseInt(filters.bedrooms)) &&
        (filters.propertyType === '' || property.type === filters.propertyType)
      );
    });
    setFilteredProperties(filtered);
    setSearchResults(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
    setShowSearch(true);
  };

  const PropertyCard = ({ property }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => setSelectedProperty(property)}
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(property.price)}
        </div>
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {property.type}
        </div>
        {property.isFeatured && (
          <div className="absolute top-4 left-16 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
            IN EVIDENZA
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 9l2 2 4-4m6-18v18a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {property.bedrooms} camere
          </div>
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            {property.bathrooms} bagni
          </div>
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-1 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5-5M4 16v4m0 4h4m-4 0l-5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            {property.size} mq
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{property.features.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {property.views.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 9l2 2 4-4m6-18v18a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {property.published}
          </div>
        </div>
      </div>
    </div>
  );

  const PropertyDetail = ({ property, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dettagli Proprietà</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  // Add to favorites
                  alert("Proprietà aggiunta ai preferiti!");
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="relative mb-4">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-80 object-cover rounded-xl"
                />
                {property.isFeatured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded">
                    IN EVIDENZA
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 mb-6">
                <button 
                  onClick={() => {
                    // AR View
                    alert("Funzionalità Realtà Aumentata in sviluppo");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h16M6 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  Realtà Aumentata
                </button>
                
                <button 
                  onClick={() => {
                    // AI Assistant
                    alert("Assistente AI in sviluppo");
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Assistente AI
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-gray-600 mb-4 flex items-center text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{formatPrice(property.price)}</div>
                <div className="text-sm text-gray-600">Prezzo richiesto</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Camere da letto</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bagni</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.size}</div>
                  <div className="text-sm text-gray-600">Metri quadrati</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.type}</div>
                  <div className="text-sm text-gray-600">Tipo di proprietà</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Descrizione</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{property.description}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Caratteristiche</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Contatta l'Agente</h3>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{property.agent.name}</div>
                    <div className="text-gray-600">Agente Immobiliare</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {property.agent.phone}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {property.agent.email}
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Richiedi Informazioni
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AgencyAd = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Spazio Pubblicitario per Agenzie</h3>
        <div className="flex space-x-2">
          {agencyAds.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === adRotation ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <img
          src={agencyAds[adRotation].image}
          alt={agencyAds[adRotation].title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <h4 className="text-xl font-bold mb-2">{agencyAds[adRotation].title}</h4>
            <p className="mb-4">{agencyAds[adRotation].description}</p>
            <a
              href={agencyAds[adRotation].url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {agencyAds[adRotation].cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const SearchSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Cerca la Tua Prossima Casa</h3>
      
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dove</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Città, quartiere..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo Minimo</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="€"
            className="w-full px-4 py-3 border border-gray-3