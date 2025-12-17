// src/pages/MenuPage.jsx
import React, { useState, useMemo } from 'react';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('soup');
  const [searchQuery, setSearchQuery] = useState('');

  // iPhone-style emoji mapping for each category
  const categoryEmojis = {
    soup: '🥣',
    kids: '👶',
    starters: '🔥',
    'cold-meze': '🧀',
    salads: '🥗',
    grill: '🥩',
    fish: '🐟',
    octopus: '🐙',
    moules: '🦪',
    lobster: '🦞',
    paella: '🥘',
    pasta: '🍝',
    sides: '🍟',
    desserts: '🍨',
    'cold-drinks': '🥤',
    'hot-drinks': '☕',
    wines: '🍷',
    raki: '🥃',
    mocktails: '🌴',
    cocktails: '🍸',
    alcohol: '🍺'
  };

  // Full menu data with category groupings
  const menuData = useMemo(() => [
    {
      id: 'soup',
      title: 'GÜNÜN ÇORBASI / Soup of the Day / Soep van de Dag',
      items: [
        { name: 'Günün çorbası', price: '7.50 €' }
      ]
    },
    {
      id: 'kids',
      title: 'ÇOCUK MENÜLERİ / Kids Menu / Kindermenu',
      items: [
        { name: 'Köfteburger + patates', price: '9.50 €' },
        { name: 'Kipstick + patates', price: '9.50 €' },
        { name: 'Nuggets + patates', price: '9.50 €' }
      ]
    },
    {
      id: 'starters',
      title: 'ARA SICAKLAR / Starters / Voorgerechten',
      items: [
        { name: 'Sigara böreği', price: '11.50 €' },
        { name: 'Tereyağında karides', price: '19.50 €' },
        { name: 'İçli köfte', price: '8.50 €' },
        { name: 'Kalamar tava', price: '14.50 €' },
        { name: 'Salyangoz (Escargots)', price: '18.50 €' }
      ]
    },
    {
      id: 'cold-meze',
      title: 'SOĞUK MEZELER / Cold Meze / Koude Meze',
      items: [
        { name: 'Les Huîtres / İstiridye (6 adet)', price: '24.00 €' },
        { name: 'Cacık', price: '7.50 €' },
        { name: 'Haydari', price: '7.50 €' },
        { name: 'Antep ezme', price: '7.50 €' },
        { name: 'Humus', price: '7.50 €' },
        { name: 'Barbunya pilaki', price: '8.50 €' },
        { name: 'Şakşuka', price: '8.50 €' },
        { name: 'Atom', price: '8.50 €' },
        { name: 'Yaprak sarma', price: '8.50 €' },
        { name: 'Rus salatası', price: '9.50 €' },
        { name: 'Peynir tabağı', price: '18.50 €' },
        { name: 'Karışık meze tabağı', price: '19.50 €' }
      ]
    },
    {
      id: 'salads',
      title: 'SALATALAR / Salads / Salades',
      items: [
        { name: 'Somon Salatası (Salmon Salad / Zalm Salade)', price: '22.50 €' },
        { name: 'Feta Salatası (Feta Salad / Feta Salade)', price: '17.50 €' },
        { name: 'Mevsim Salatası (Seasonal Salad)', price: '8.50 €' },
        { name: 'Çoban Salatası (Shepherd Salad)', price: '9.50 €' },
        { name: 'Muhabbet Special Salata', price: '24.50 €' }
      ]
    },
    {
      id: 'grill',
      title: 'IZGARA & KEBAPLAR / Grill & Kebabs',
      subtitle: '(Pilav / patates / püre ile servis edilir)',
      items: [
        { name: 'Et şiş', price: '26.50 €' },
        { name: 'Tavuk şiş', price: '22.50 €' },
        { name: 'Adana kebap', price: '24.50 €' },
        { name: 'Urfa kebap', price: '23.50 €' },
        { name: 'Çökertme kebabı', price: '28.50 €' },
        { name: 'Beyti sarma', price: '26.50 €' },
        { name: 'Ali Nazik (kuzu)', price: '29.50 €' },
        { name: 'Pirzola', price: '29.50 €' },
        { name: 'Madalyon şiş', price: '29.50 €' },
        { name: 'Izgara köfte', price: '21.50 €' },
        { name: 'Tavuk kanat', price: '22.50 €' },
        { name: 'Ciğer şiş', price: '22.50 €' },
        { name: 'Antrikot', price: '34.50 €' },
        { name: 'Karışık izgara', price: '34.50 €' },
        { name: 'Sac tava', price: '26.50 €' },
        { name: 'Fırında güveç', price: '26.50 €' }
      ]
    },
    {
      id: 'fish',
      title: 'BALIKLAR / Fish / Visgerechten',
      items: [
        { name: 'Levrek', price: '29.50 €' },
        { name: 'Çipura', price: '27.50 €' },
        { name: 'Somon', price: '28.50 €' },
        { name: 'Ton şiş / Tuna', price: '27.50 €' },
        { name: 'Mezgit', price: '26.50 €' },
        { name: 'Dil balığı (Tong)', price: '34.50 €' },
        { name: 'Közde Seksi 5', price: '25.00 €' }
      ]
    },
    {
      id: 'octopus',
      title: 'AHTAPOT / Octopus',
      items: [
        { name: 'Izgara ahtapot', price: '32.50 €' },
        { name: 'Patates yatağında ahtapot', price: '34.50 €' },
        { name: 'Ahtapot tava', price: '31.50 €' }
      ]
    },
    {
      id: 'moules',
      title: 'MOULES – MIDYELER',
      items: [
        { name: 'Belçika midyesi', price: '26.50 €' },
        { name: 'Sarımsaklı', price: '27.50 €' },
        { name: 'Kremalı', price: '28.50 €' },
        { name: 'Cozze alla Tarantina', price: '26.50 €' }
      ]
    },
    {
      id: 'lobster',
      title: 'ISTAKOZ / Lobster / Kreeft',
      items: [
        { name: 'Izgara istakoz', price: '45.00 €' },
        { name: 'Istakoz Thermidor', price: '49.00 €' },
        { name: 'Sarımsaklı istakoz tava', price: '47.00 €' }
      ]
    },
    {
      id: 'paella',
      title: 'PAELLA',
      items: [
        { name: 'Balıklı Paella (1 kişilik)', price: '29.50 €' },
        { name: 'Balıklı Paella (2 kişilik)', price: '55.00 €' }
      ]
    },
    {
      id: 'pasta',
      title: 'MAKARNALAR / Pasta',
      items: [
        { name: 'Penne (krema soslu)', price: '18.50 €' },
        { name: 'Spaghetti Bolognese', price: '19.50 €' }
      ]
    },
    {
      id: 'sides',
      title: 'YAN LEZZETLER / Side Dishes / Bijgerechten',
      items: [
        { name: 'Patates kızartması', price: '5.50 €' },
        { name: 'Patates püresi', price: '6.50 €' },
        { name: 'Pilav', price: '5.50 €' },
        { name: 'Izgara sebze', price: '6.50 €' },
        { name: 'Fırında kuşkonmaz', price: '8.50 €' }
      ]
    },
    {
      id: 'desserts',
      title: 'TATLILAR / Desserts',
      items: [
        { name: 'Sütlaç', price: '7.50 €' },
        { name: 'Künefe', price: '9.50 €' },
        { name: 'Dondurma (çeşitli)', price: '6.50 €' },
        { name: 'Çilek Mousse', price: '7.50 €' }
      ]
    },
    {
      id: 'cold-drinks',
      title: 'SOĞUK İÇECEKLER',
      items: [
        { name: 'Su / Water', price: '2.00 €' },
        { name: 'Ayran', price: '2.00 €' },
        { name: 'Soda', price: '2.50 €' },
        { name: 'Coca Cola / Zero', price: '2.50 €' },
        { name: 'Fanta', price: '2.50 €' },
        { name: 'Sprite', price: '2.50 €' },
        { name: 'Gazoz', price: '2.50 €' },
        { name: 'Red Bull', price: '3.00 €' },
        { name: 'Portakal suyu / Orange juice', price: '2.50 €' }
      ]
    },
    {
      id: 'hot-drinks',
      title: 'SICAK İÇECEKLER',
      items: [
        { name: 'Çay / Tea', price: '3.00 €' },
        { name: 'Türk kahvesi', price: '3.50 €' },
        { name: 'Espresso', price: '3.00 €' },
        { name: 'Koffie', price: '3.00 €' }
      ]
    },
    {
      id: 'wines',
      title: 'ŞARAPLAR – WINES',
      items: [
        { name: 'Beyaz şarap (kadeh)', price: '6.50 €' },
        { name: 'Kırmızı şarap (kadeh)', price: '6.00 €' },
        { name: 'Roze şarap (kadeh)', price: '6.50 €' },
        { name: 'Cava (kadeh)', price: '7.00 €' },
        { name: 'Şarap (şişe)', price: '24.00 €' },
        { name: 'Cava (şişe)', price: '37.00 €' }
      ]
    },
    {
      id: 'raki',
      title: 'RAKI',
      items: [
        { name: 'Yeni Raki Duble', price: '6.00 €' },
        { name: 'Yeni Raki 35 cl', price: '45.00 €' },
        { name: 'Yeni Raki 70 cl', price: '70.00 €' },
        { name: 'Tekirdağ Raki Duble', price: '8.00 €' },
        { name: 'Tekirdağ Raki 35 cl', price: '65.00 €' },
        { name: 'Tekirdağ Raki 70 cl', price: '100.00 €' },
        { name: 'Beylerbeyi Raki Duble', price: '8.50 €' },
        { name: 'Beylerbeyi Raki 35 cl', price: '65.00 €' },
        { name: 'Beylerbeyi Raki 70 cl', price: '120.00 €' }
      ]
    },
    {
      id: 'mocktails',
      title: 'ALKOLSÜZ KOKTEYLLER / Mocktails',
      items: [
        { name: 'Strawberry Blue Mocktail', price: '6.00 €' },
        { name: 'Mojito Mocktail', price: '9.00 €' },
        { name: 'Virgin Pina Colada', price: '9.00 €' }
      ]
    },
    {
      id: 'cocktails',
      title: 'KOKTEYLLER / Cocktails',
      items: [
        { name: 'Espresso Martini', price: '12.00 €' },
        { name: 'Spritz', price: '11.00 €' },
        { name: 'New York Sour', price: '17.00 €' },
        { name: 'Pink Lady', price: '9.00 €' }
      ]
    },
    {
      id: 'alcohol',
      title: 'ALKOLÜ İÇECEKLER',
      items: [
        { name: 'Jupiter / Hoegaarden', price: '3.50 €' },
        { name: 'Duvel', price: '6.00 €' }
      ]
    }
  ], []);

  // Filter menu items based on search query
  const filteredMenu = useMemo(() => {
    if (!searchQuery.trim()) return menuData;
    
    return menuData.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [menuData, searchQuery]);

  // Get active category items
  const activeItems = useMemo(() => {
    const category = menuData.find(c => c.id === activeCategory);
    return category ? category.items : [];
  }, [activeCategory, menuData]);

  // Category navigation items
  const categoryNavItems = [
    { id: 'soup', name: 'SOUP' },
    { id: 'kids', name: 'KIDS' },
    { id: 'starters', name: 'STARTERS' },
    { id: 'cold-meze', name: 'COLD MEZE' },
    { id: 'salads', name: 'SALADS' },
    { id: 'grill', name: 'GRILL' },
    { id: 'fish', name: 'FISH' },
    { id: 'octopus', name: 'OCTOPUS' },
    { id: 'moules', name: 'MUSSELS' },
    { id: 'lobster', name: 'LOBSTER' },
    { id: 'paella', name: 'PAELLA' },
    { id: 'pasta', name: 'PASTA' },
    { id: 'sides', name: 'SIDES' },
    { id: 'desserts', name: 'DESSERTS' },
    { id: 'drinks', name: 'DRINKS' }
  ];

  // Get items for drinks category (aggregates all drink categories)
  const getDrinkItems = () => [
    ...menuData.find(c => c.id === 'cold-drinks')?.items || [],
    ...menuData.find(c => c.id === 'hot-drinks')?.items || [],
    ...menuData.find(c => c.id === 'wines')?.items || [],
    ...menuData.find(c => c.id === 'raki')?.items || [],
    ...menuData.find(c => c.id === 'mocktails')?.items || [],
    ...menuData.find(c => c.id === 'cocktails')?.items || [],
    ...menuData.find(c => c.id === 'alcohol')?.items || []
  ];

  // Get items for current category
  const getCurrentItems = () => {
    if (activeCategory === 'drinks') {
      return getDrinkItems();
    }
    return activeItems;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-2">OCAKTA MUHABBET</h1>
          <p className="text-center text-gray-400 mb-6">Turkish • Mediterranean • European</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Category Navigation */}
          <nav className="flex justify-center overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {categoryNavItems.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Menu Items */}
        <div className="space-y-12">
          {getCurrentItems().length > 0 ? (
            getCurrentItems().map((item, index) => (
              <div 
                key={index}
                className="flex items-start border-b border-gray-800 pb-8 last:border-b-0"
              >
                {/* Category Emoji */}
                <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl">
                    {categoryEmojis[activeCategory] || '🍽️'}
                  </span>
                </div>
                
                {/* Item Details */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <p className="text-3xl font-bold text-amber-400">{item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-amber-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No items found</h3>
              <p className="text-gray-400">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-2xl">📱</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-2xl">📸</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-2xl">📍</span>
            </a>
          </div>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-2">
            Korte Meer 7, 2000 Antwerpen, Belgium • +32 3 123 45 67
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} OCAKTA MUHABBET Restaurant. All prices in EUR.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;