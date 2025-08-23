// File: ChinaApp.jsx
import React, { useState, useEffect } from 'react';
import './china-styles.css';

const ChinaApp = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [adRotation, setAdRotation] = useState(0);

  // Mock data per proprietà cinesi
  const chineseProperties = [
    {
      id: 1,
      title: "三亚豪华海景公寓",
      price_cny: 1200000,
      price_eur: 156000,
      location: "三亚, 海棠湾",
      bedrooms: 2,
      bathrooms: 2,
      size: 120,
      type: "海景公寓",
      image: "https://placehold.co/400x300/059669/ffffff?text=三亚+豪华公寓",
      description: "位于海棠湾核心区域的豪华海景公寓，可俯瞰南海美景。配备现代化设施和智能家居系统。",
      features: ["海景阳台", "智能家居", "健身房", "游泳池"],
      views: 892,
      published: "刚刚发布"
    },
    {
      id: 2,
      title: "厦门高端别墅",
      price_cny: 2800000,
      price_eur: 364000,
      location: "厦门, 鼓浪屿",
      bedrooms: 4,
      bathrooms: 3,
      size: 320,
      type: "独栋别墅",
      image: "https://placehold.co/400x300/4f46e5/ffffff?text=厦门+高端别墅",
      description: "鼓浪屿上的独栋别墅，拥有私人花园和无边泳池。地理位置优越，靠近历史文化景点。",
      features: ["私人花园", "无边泳池", "海景", "历史建筑"],
      views: 654,
      published: "2小时前"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProperties(chineseProperties);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="china-app">
      {/* Header cinese */}
      <header className="chinese-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="dragon-icon">🐉</div>
            <h1 className="chinese-title">ITALYRE.CN</h1>
          </div>
          <nav className="chinese-nav">
            <a href="/">意大利版</a>
            <a href="/en">English</a>
            <a href="/cn" className="active">中文版</a>
          </nav>
        </div>
      </header>

      {/* Hero section cinese */}
      <section className="chinese-hero">
        <div className="hero-content">
          <h2>连接中国投资者与意大利奢华房产</h2>
          <p>专业的房地产投资平台，提供真实房源和市场分析</p>
          <div className="search-bar">
            <input type="text" placeholder="搜索城市或地区..." />
            <button>搜索</button>
          </div>
        </div>
      </section>

      {/* Proprietà cinesi */}
      <section className="chinese-properties">
        <div className="container">
          <h3 className="section-title">精选意大利房产</h3>
          {loading ? (
            <div className="loading">加载中...</div>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <div 
                  key={property.id} 
                  className="chinese-property-card"
                  onClick={() => setSelectedProperty(property)}
                >
                  <img src={property.image} alt={property.title} />
                  <div className="property-info">
                    <h4>{property.title}</h4>
                    <p className="property-location">{property.location}</p>
                    <div className="property-price">
                      <div className="price-cny">¥{property.price_cny.toLocaleString()}</div>
                      <div className="price-eur">€{property.price_eur.toLocaleString()}</div>
                    </div>
                    <div className="property-details">
                      <span>{property.bedrooms}室</span>
                      <span>{property.bathrooms}卫</span>
                      <span>{property.size}平米</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer cinese */}
      <footer className="chinese-footer">
        <div className="container">
          <p>&copy; 2023 Italyre.cn - 意大利房地产投资平台</p>
        </div>
      </footer>
    </div>
  );
};

export default ChinaApp;