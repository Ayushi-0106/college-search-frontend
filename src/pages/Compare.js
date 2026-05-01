import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const allColleges = [
    { id: 1, name: 'IIT Delhi', city: 'Delhi', rating: 4.8, fees: '₹2.2 Lakhs', placement: '₹25 LPA', type: 'Government' },
    { id: 2, name: 'IIT Bombay', city: 'Mumbai', rating: 4.9, fees: '₹2.3 Lakhs', placement: '₹28 LPA', type: 'Government' },
    { id: 3, name: 'IIT Madras', city: 'Chennai', rating: 4.7, fees: '₹2.2 Lakhs', placement: '₹24 LPA', type: 'Government' },
    { id: 4, name: 'NIT Trichy', city: 'Tiruchirappalli', rating: 4.5, fees: '₹1.8 Lakhs', placement: '₹20 LPA', type: 'Government' },
    { id: 5, name: 'BITS Pilani', city: 'Pilani', rating: 4.6, fees: '₹4.5 Lakhs', placement: '₹27 LPA', type: 'Private' },
    { id: 6, name: 'VIT Vellore', city: 'Vellore', rating: 4.3, fees: '₹3.2 Lakhs', placement: '₹12 LPA', type: 'Private' },
  ];

  // addCollege function
  const addCollege = useCallback((college) => {
    setSelectedColleges((prev) => {
      if (prev.length < 3 && !prev.find(c => c.id === college.id)) {
        return [...prev, college];
      }
      return prev;
    });
    setSearchQuery('');
    setSearchResults([]);
  }, []);  

  // Effect for location.state
  useEffect(() => {
    if (location.state?.college) {
      addCollege(location.state.college);
    }
  }, [location.state, addCollege]);

  // Effect for search
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = allColleges.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedColleges.find(sc => sc.id === c.id)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedColleges]);

  const removeCollege = (id) => {
    setSelectedColleges((prev) => prev.filter(c => c.id !== id));
  };

  return (
    <div 
      className="min-h-screen py-8"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/40 fixed"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        /* Header */
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Compare Colleges</h1>
          <p className="text-white/70 mt-2">Compare up to 3 colleges side by side</p>
        </div>

        /* Search Box */
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search colleges to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden z-20">
                {searchResults.map(college => (
                  <div 
                    key={college.id} 
                    onClick={() => addCollege(college)} 
                    className="p-3 border-b border-white/20 cursor-pointer hover:bg-white/30 transition text-white"
                  >
                    <div className="font-semibold">{college.name}</div>
                    <div className="text-sm text-white/60">{college.city} | ⭐ {college.rating}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedColleges.length === 3 && (
            <p className="text-yellow-300 text-sm mt-2">⚠️ You can compare up to 3 colleges only</p>
          )}
        </div>

        /* Comparison Table */
        {selectedColleges.length === 0 ? (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 text-center border border-white/20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white">No colleges selected</h3>
            <p className="text-white/60 mt-2">Search and add colleges to compare them side by side</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <thead>
                <tr className="bg-white/20 border-b border-white/20">
                  <th className="p-4 text-left text-white font-semibold w-32">Parameters</th>
                  {selectedColleges.map(college => (
                    <th key={college.id} className="p-4 text-left text-white">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{college.name}</span>
                        <button 
                          onClick={() => removeCollege(college.id)} 
                          className="ml-3 w-6 h-6 bg-red-500/50 hover:bg-red-500 text-white rounded-full text-sm transition"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="p-4 font-semibold text-white/80">📍 Location</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-4 text-white/70">{college.city}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="p-4 font-semibold text-white/80">⭐ Rating</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-4">
                      <span className="text-yellow-400 font-bold text-lg">{college.rating}</span>
                      <span className="text-white/50"> / 5</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="p-4 font-semibold text-white/80">💰 Fees (per year)</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-4 text-emerald-300 font-semibold">{college.fees}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="p-4 font-semibold text-white/80">💼 Avg Placement</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-4 text-blue-300 font-semibold">{college.placement}</td>
                  ))}
                </tr>
                <tr className="hover:bg-white/5 transition">
                  <td className="p-4 font-semibold text-white/80">🏷️ Type</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        college.type === 'Government' 
                          ? 'bg-green-500/30 text-green-300' 
                          : 'bg-orange-500/30 text-orange-300'
                      }`}>
                        {college.type}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        /* Tips */
        {selectedColleges.length > 0 && selectedColleges.length < 3 && (
          <div className="mt-6 text-center text-white/50 text-sm">
            💡 Add {3 - selectedColleges.length} more college(s) for better comparison
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;