import React, { useState, useEffect } from 'react';

const Property = ({ property, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Auto-rotazione delle immagini ogni 5 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        property.gallery ? (prev + 1) % property.gallery.length : 0
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [property.gallery]);

  const nextImage = () => {
    if (property.gallery) {
      setCurrentImageIndex(prev => (prev + 1) % property.gallery.length);
    }
  };

  const prevImage = () => {
    if (property.gallery) {
      setCurrentImageIndex(prev => 
        prev === 0 ? property.gallery.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Italyre Pro</h1>
                <p className="text-sm text-blue-600">Mercato Immobiliare Italiano</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Torna Indietro
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={property.gallery ? property.gallery[currentImageIndex] : property.image}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
            
            {property.gallery && property.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.gallery.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
            
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-xl text-gray-600 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Camere da Letto</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bagni</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{property.size}</div>
                  <div className="text-sm text-gray-600">Metri Quadrati</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{property.type}</div>
                  <div className="text-sm text-gray-600">Tipo di Proprietà</div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrizione</h2>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {property.description}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Caratteristiche</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {property.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiche</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {property.views.toLocaleString()} visualizzazioni
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 9l2 2 4-4m6-18v18a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  {property.visits} visite programmate
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pubblicato {property.published}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Agent Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24">
              <div className="text-center mb-6">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{property.agent.name}</h3>
                <p className="text-gray-600">Agente Immobiliare</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 01-.502 1.21L9.414 21.5a11.042 11.042 0 00-5.516-5.516l-2.257-1.13a1 1 0 01-.502-1.21L3.684 9.743A1 1 0 014.684 9l4.493-1.498A1 1 0 0110 7.502V3.22a1 1 0 01.684-.948l4.493-1.498A1 1 0 0116 2h3.78a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 01-.502 1.21L21.5 14.586a11.042 11.042 0 00-5.516 5.516l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498A1 1 0 019 21.78V22a1 1 0 01-1 1H5a2 2 0 01-2-2v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.042 11.042 0 005.516 5.516l2.257-1.13a1 1 0 011.21.502l1.498 4.493A1 1 0 0120.78 22H17a1 1 0 01-1-1v-3.78a1 1 0 01.684-.948l4.493-1.498a1 1 0 011.21.502l1.13 2.257a11.0......
Continua a pensare