import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChefHat,
  Globe,
  Star
} from 'lucide-react';

// --- FULL DATASET ---
const MENU_DATA = [
  {
    id: 'soup',
    title: { tr: 'GÜNÜN ÇORBASI', en: 'Soup of the Day', nl: 'Soep van de Dag' },
    items: [{ name: { tr: 'Günün çorbası', en: 'Daily Soup', nl: 'Dagsoep' }, price: 7.50 }]
  },
  {
    id: 'kids',
    title: { tr: 'ÇOCUK MENÜLERİ', en: 'Kids Menu', nl: 'Kindermenu' },
    items: [
      { name: { tr: 'Köfteburger + patates', en: 'Meatball burger + fries', nl: 'Gehaktbal burger + friet' }, price: 9.50 },
      { name: { tr: 'Kipstick + patates', en: 'Chicken sticks + fries', nl: 'Kipstick + friet' }, price: 9.50 },
      { name: { tr: 'Nuggets + patates', en: 'Nuggets + fries', nl: 'Nuggets + friet' }, price: 9.50 }
    ]
  },
  {
    id: 'starters',
    title: { tr: 'ARA SICAKLAR', en: 'Starters', nl: 'Voorgerechten' },
    items: [
      { name: { tr: 'Sigara böreği', en: 'Crispy Rolls', nl: 'Crispy Rolls' }, price: 11.50 },
      { name: { tr: 'Tereyağında karides', en: 'Shrimp in Butter', nl: 'Garnalen in Boter' }, price: 19.50 },
      { name: { tr: 'İçli köfte', en: 'Stuffed Bulgur', nl: 'Gevulde Bulgur' }, price: 8.50 },
      { name: { tr: 'Kalamar tava', en: 'Fried Calamari', nl: 'Gefrituurde Inktvis' }, price: 14.50 },
      { name: { tr: 'Salyangoz (Escargots)', en: 'Escargots', nl: 'Slakken' }, price: 18.50 }
    ]
  },
  {
    id: 'meze',
    title: { tr: 'SOĞUK MEZELER', en: 'Cold Meze', nl: 'Koude Meze' },
    items: [
      { name: { tr: 'Les Huîtres / İstiridye (6 adet)', en: 'Oysters (6 pcs)', nl: 'Oesters (6 st)' }, price: 24.00 },
      { name: { tr: 'Cacık', en: 'Tzatziki', nl: 'Cacık' }, price: 7.50 },
      { name: { tr: 'Haydari', en: 'Haydari', nl: 'Haydari' }, price: 7.50 },
      { name: { tr: 'Antep ezme', en: 'Spicy Walnut Dip', nl: 'Spicy Dip' }, price: 7.50 },
      { name: { tr: 'Humus', en: 'Hummus', nl: 'Hummus' }, price: 7.50 },
      { name: { tr: 'Barbunya pilaki', en: 'Pinto Beans', nl: 'Pinto Bonen' }, price: 8.50 },
      { name: { tr: 'Şakşuka', en: 'Veggie Medley', nl: 'Saksuka' }, price: 8.50 },
      { name: { tr: 'Atom', en: 'Yogurt with Dried Chilies', nl: 'Hete Yogurt' }, price: 8.50 },
      { name: { tr: 'Yaprak sarma', en: 'Stuffed Leaves', nl: 'Gevulde Bladeren' }, price: 8.50 },
      { name: { tr: 'Rus salatası', en: 'Russian Salad', nl: 'Russische Salade' }, price: 9.50 },
      { name: { tr: 'Peynir tabağı', en: 'Cheese Plate', nl: 'Kaasplank' }, price: 18.50 },
      { name: { tr: 'Karışık meze tabağı', en: 'Mixed Meze Plate', nl: 'Gemengde Meze' }, price: 19.50 }
    ]
  },
  {
    id: 'salads',
    title: { tr: 'SALATALAR', en: 'Salads', nl: 'Salades' },
    items: [
      { name: { tr: 'Somon Salatası', en: 'Salmon Salad', nl: 'Zalm Salade' }, price: 22.50 },
      { name: { tr: 'Feta Salatası', en: 'Feta Salad', nl: 'Feta Salade' }, price: 17.50 },
      { name: { tr: 'Mevsim Salatası', en: 'Seasonal Salad', nl: 'Seizoenssalade' }, price: 8.50 },
      { name: { tr: 'Çoban Salatası', en: 'Shepherd Salad', nl: 'Herderssalade' }, price: 9.50 },
      { name: { tr: 'Muhabbet Special Salata', en: 'Special House Salad', nl: 'Speciale Salade' }, price: 24.50 }
    ]
  },
  {
    id: 'grill',
    title: { tr: 'IZGARA & KEBAPLAR', en: 'Grill & Kebabs', nl: 'Grill & Kebabs' },
    note: { tr: '(Pilav / patates / püre ile servis edilir)', en: '(Served with rice / fries / puree)', nl: '(Geserveerd met rijst / friet / puree)' },
    items: [
      { name: { tr: 'Et şiş', en: 'Beef Skewers', nl: 'Runderspies' }, price: 26.50 },
      { name: { tr: 'Tavuk şiş', en: 'Chicken Skewers', nl: 'Kippenspies' }, price: 22.50 },
      { name: { tr: 'Adana kebap', en: 'Spicy Minced Skewer', nl: 'Pittige Gehaktspies' }, price: 24.50 },
      { name: { tr: 'Urfa kebap', en: 'Mild Minced Skewer', nl: 'Milde Gehaktspies' }, price: 23.50 },
      { name: { tr: 'Çökertme kebabı', en: 'Beef over Crispy Potatoes', nl: 'Cokertme Kebab' }, price: 28.50 },
      { name: { tr: 'Beyti sarma', en: 'Wrapped Kebab', nl: 'Beyti Sarma' }, price: 26.50 },
      { name: { tr: 'Ali Nazik (kuzu)', en: 'Lamb over Eggplant', nl: 'Ali Nazik (lam)' }, price: 29.50 },
      { name: { tr: 'Pirzola', en: 'Lamb Chops', nl: 'Lamskoteletten' }, price: 29.50 },
      { name: { tr: 'Madalyon şiş', en: 'Medallion Skewers', nl: 'Medaillon Spies' }, price: 29.50 },
      { name: { tr: 'Izgara köfte', en: 'Grilled Meatballs', nl: 'Gegrilde Gehaktballen' }, price: 21.50 },
      { name: { tr: 'Tavuk kanat', en: 'Chicken Wings', nl: 'Kippenvleugels' }, price: 22.50 },
      { name: { tr: 'Antrikot', en: 'Rib-eye Steak', nl: 'Antricote' }, price: 34.50 },
      { name: { tr: 'Karışık izgara', en: 'Mixed Grill', nl: 'Mixed Grill' }, price: 34.50 }
    ]
  },
  {
    id: 'fish',
    title: { tr: 'BALIKLAR', en: 'Fish', nl: 'Visgerechten' },
    items: [
      { name: { tr: 'Levrek', en: 'Sea Bass', nl: 'Zeebaars' }, price: 29.50 },
      { name: { tr: 'Çipura', en: 'Sea Bream', nl: 'Dorade' }, price: 27.50 },
      { name: { tr: 'Somon', en: 'Salmon', nl: 'Zalm' }, price: 28.50 },
      { name: { tr: 'Ton şiş / Tuna', en: 'Tuna Skewers', nl: 'Tonijnspies' }, price: 27.50 },
      { name: { tr: 'Dil balığı (Tong)', en: 'Sole Fish', nl: 'Zeetong' }, price: 34.50 }
    ]
  },
  {
    id: 'octopus',
    title: { tr: 'AHTAPOT', en: 'Octopus', nl: 'Octopus' },
    items: [
      { name: { tr: 'Izgara ahtapot', en: 'Grilled Octopus', nl: 'Gegrilde Octopus' }, price: 32.50 },
      { name: { tr: 'Patates yatağında ahtapot', en: 'Octopus on Potato Bed', nl: 'Octopus op Aardappelbed' }, price: 34.50 }
    ]
  },
  {
    id: 'mussels',
    title: { tr: 'MOULES – MIDYELER', en: 'Mussels', nl: 'Mosselen' },
    items: [
      { name: { tr: 'Belçika midyesi', en: 'Belgian Mussels', nl: 'Belgische Mosselen' }, price: 26.50 },
      { name: { tr: 'Sarımsaklı', en: 'Garlic Mussels', nl: 'Knoflook Mosselen' }, price: 27.50 },
      { name: { tr: 'Kremalı', en: 'Creamy Mussels', nl: 'Room Mosselen' }, price: 28.50 }
    ]
  },
  {
    id: 'lobster',
    title: { tr: 'ISTAKOZ', en: 'Lobster', nl: 'Kreeft' },
    items: [
      { name: { tr: 'Izgara istakoz', en: 'Grilled Lobster', nl: 'Gegrilde Kreeft' }, price: 45.00 },
      { name: { tr: 'Istakoz Thermidor', en: 'Lobster Thermidor', nl: 'Kreeft Thermidor' }, price: 49.00 }
    ]
  },
  {
    id: 'pasta',
    title: { tr: 'MAKARNALAR', en: 'Pasta', nl: 'Pasta' },
    items: [
      { name: { tr: 'Penne (krema soslu)', en: 'Penne Creamy', nl: 'Penne Roomsaus' }, price: 18.50 },
      { name: { tr: 'Spaghetti Bolognese', en: 'Spaghetti Bolognese', nl: 'Spaghetti Bolognese' }, price: 19.50 }
    ]
  },
  {
    id: 'sides',
    title: { tr: 'YAN LEZZETLER', en: 'Side Dishes', nl: 'Bijgerechten' },
    items: [
      { name: { tr: 'Patates kızartması', en: 'Fries', nl: 'Friet' }, price: 5.50 },
      { name: { tr: 'Patates püresi', en: 'Mashed Potatoes', nl: 'Aardappelpuree' }, price: 6.50 },
      { name: { tr: 'Pilav', en: 'Rice', nl: 'Rijst' }, price: 5.50 },
      { name: { tr: 'Izgara sebze', en: 'Grilled Veggies', nl: 'Gegrilde Groenten' }, price: 6.50 }
    ]
  },
  {
    id: 'desserts',
    title: { tr: 'TATLILAR', en: 'Desserts', nl: 'Desserts' },
    items: [
      { name: { tr: 'Sütlaç', en: 'Rice Pudding', nl: 'Rijstpudding' }, price: 7.50 },
      { name: { tr: 'Künefe', en: 'Kunefe', nl: 'Kunefe' }, price: 9.50 },
      { name: { tr: 'Dondurma', en: 'Ice Cream', nl: 'Ijs' }, price: 6.50 }
    ]
  },
  {
    id: 'raki',
    title: { tr: 'RAKI', en: 'Raki', nl: 'Raki' },
    items: [
      { name: { tr: 'Yeni Raki 35 cl', en: 'Yeni Raki 35 cl', nl: 'Yeni Raki 35 cl' }, price: 45.00 },
      { name: { tr: 'Yeni Raki 70 cl', en: 'Yeni Raki 70 cl', nl: 'Yeni Raki 70 cl' }, price: 70.00 },
      { name: { tr: 'Tekirdağ Raki 70 cl', en: 'Tekirdağ Raki 70 cl', nl: 'Tekirdağ Raki 70 cl' }, price: 100.00 },
      { name: { tr: 'Beylerbeyi Raki 70 cl', en: 'Beylerbeyi Raki 70 cl', nl: 'Beylerbeyi Raki 70 cl' }, price: 120.00 }
    ]
  }
];

const MenuItem = ({ name, price, language }) => (
  <div className="group py-5 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
    <div className="flex flex-col">
      <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
        {name[language]}
      </h3>
      <div className="flex gap-2 mt-2 opacity-25 text-[9px] font-sans font-bold uppercase tracking-widest group-hover:opacity-60 transition-opacity">
        {language !== 'tr' && <span>{name.tr}</span>}
        {language !== 'en' && <span>{name.en}</span>}
        {language !== 'nl' && <span>{name.nl}</span>}
      </div>
    </div>
    <div className="flex items-center gap-4 self-end md:self-center">
      <div className="h-[1px] w-12 bg-zinc-100 group-hover:bg-zinc-900 transition-colors"></div>
      <span className="text-xl md:text-2xl font-sans font-bold tracking-tighter">
        {price.toFixed(2)} €
      </span>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState('tr');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return MENU_DATA;
    return MENU_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.nl.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white font-serif text-black p-4 md:p-12">
      
      {/* Search & Language Controls */}
      <div className="max-w-[1200px] mx-auto mb-20 flex flex-col md:flex-row gap-8 items-center justify-between">
         <div className="flex items-center gap-4 bg-zinc-50 p-1.5 rounded-full border border-zinc-100 shadow-sm">
            {['tr', 'en', 'nl'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-5 py-2 rounded-full text-[10px] font-sans font-black uppercase tracking-[0.2em] transition-all ${lang === l ? 'bg-black text-white shadow-md' : 'text-zinc-400 hover:text-black'}`}
              >
                {l}
              </button>
            ))}
         </div>

         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black transition-colors" size={20} />
            <input 
              type="text"
              placeholder={lang === 'tr' ? 'ARA...' : lang === 'en' ? 'SEARCH...' : 'ZOEKEN...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-full py-5 pl-16 pr-8 text-sm italic tracking-[0.2em] outline-none focus:border-black transition-all uppercase"
            />
         </div>
      </div>

      {/* Main Menu Feed */}
      <main className="max-w-[1200px] mx-auto">
        {filteredData.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-zinc-100 rounded-3xl">
            <p className="italic text-2xl text-zinc-300">No dishes found matching your search.</p>
          </div>
        )}

        {filteredData.map((cat) => (
          <section key={cat.id} className="mb-24 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10 border-b-2 border-black pb-6">
               <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={12} className="text-zinc-300" />
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-zinc-400">{cat.id}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    {cat.title[lang]}
                  </h2>
               </div>
               
               {cat.note && (
                 <p className="text-zinc-400 italic text-sm md:text-base md:text-right max-w-xs">
                    {cat.note[lang]}
                 </p>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
               {cat.items.map((item, idx) => (
                 <MenuItem 
                   key={idx} 
                   name={item.name} 
                   price={item.price} 
                   language={lang}
                 />
               ))}
            </div>
          </section>
        ))}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700;1,900&display=swap');
        
        body {
            font-family: 'Playfair Display', serif;
            background-color: #ffffff;
            color: #111111;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        ::-webkit-scrollbar {
          width: 0px; /* Hidden for menu boards */
        }
      `}</style>
    </div>
  );
}