import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    sortBy: 'rating',
    minRating: 0,
  });

  const query = location.state?.query || '';

  const allColleges = [
    { id: 1, name: 'IIT Delhi', city: 'Delhi', rating: 4.8, fees: '₹2.2 Lakhs', placement: '₹25 LPA', type: 'government' },
    { id: 2, name: 'IIT Bombay', city: 'Mumbai', rating: 4.9, fees: '₹2.3 Lakhs', placement: '₹28 LPA', type: 'government' },
    { id: 3, name: 'IIT Madras', city: 'Chennai', rating: 4.7, fees: '₹2.2 Lakhs', placement: '₹24 LPA', type: 'government' },
    { id: 4, name: 'NIT Trichy', city: 'Tiruchirappalli', rating: 4.5, fees: '₹1.8 Lakhs', placement: '₹20 LPA', type: 'government' },
    { id: 5, name: 'BITS Pilani', city: 'Pilani', rating: 4.6, fees: '₹4.5 Lakhs', placement: '₹27 LPA', type: 'private' },
    { id: 6, name: 'VIT Vellore', city: 'Vellore', rating: 4.3, fees: '₹3.2 Lakhs', placement: '₹12 LPA', type: 'private' },
  ];

  const fetchColleges = useCallback(() => {
    setLoading(true);
    let filtered = [...allColleges];
    
    if (query) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.city.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(c => c.type === filters.type);
    }
    
    if (filters.minRating > 0) {
      filtered = filtered.filter(c => c.rating >= filters.minRating);
    }
    
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'fees_low') {
      filtered.sort((a, b) => parseInt(a.fees) - parseInt(b.fees));
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setColleges(filtered);
    setLoading(false);
  }, [query, filters]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

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
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 fixed"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Header - Soft Glass */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl">
          <h1 className="text-2xl font-bold text-white">
            {colleges.length} Colleges Found {query && `for "${query}"`}
          </h1>
          <p className="text-white/70 text-sm mt-1">Find the best colleges matching your criteria</p>
        </div>

        {/* Filters - Soft Glass */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
          <h3 className="text-white/90 font-semibold mb-3 text-lg">🔍 Filters</h3>
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2.5 bg-white/20 border border-white/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer backdrop-blur-sm"
            >
              <option value="all" className="text-gray-900">All Types</option>
              <option value="government" className="text-gray-900">🏛️ Government</option>
              <option value="private" className="text-gray-900">🏢 Private</option>
            </select>
            
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-2.5 bg-white/20 border border-white/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer backdrop-blur-sm"
            >
              <option value="rating" className="text-gray-900">⭐ Sort by Rating</option>
              <option value="fees_low" className="text-gray-900">💰 Fees: Low to High</option>
              <option value="name" className="text-gray-900">📛 Sort by Name</option>
            </select>
            
            <select
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
              className="px-4 py-2.5 bg-white/20 border border-white/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer backdrop-blur-sm"
            >
              <option value={0} className="text-gray-900">⭐ Min Rating: Any</option>
              <option value={3} className="text-gray-900">⭐⭐⭐ 3+ Stars</option>
              <option value={4} className="text-gray-900">⭐⭐⭐⭐ 4+ Stars</option>
              <option value={4.5} className="text-gray-900">⭐⭐⭐⭐½ 4.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/80"></div>
          </div>
        ) : colleges.length === 0 ? (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 text-center border border-white/20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white">No colleges found</h3>
            <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition"
            >
              Go Back Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div
                key={college.id}
                className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 cursor-pointer shadow-xl"
                onClick={() => navigate(`/details/${college.id}`, { state: { college } })}
              >
                {/* Card Header - Soft Gradient (No Blue) */}
                <div className="h-32 bg-gradient-to-r from-white/20 to-white/5 flex items-center justify-center text-5xl backdrop-blur-sm">
                  🏛️
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-xl text-white">{college.name}</h3>
                  <p className="text-white/60 text-sm mt-1">📍 {college.city}</p>
                  
                  <div className="flex justify-between items-center mt-3 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white font-semibold">{college.rating}</span>
                    </div>
                    <span className="text-emerald-300 font-semibold bg-white/10 px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                      {college.fees}/year
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/details/${college.id}`, { state: { college } }); }} 
                      className="flex-1 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate('/compare', { state: { college } }); }} 
                      className="flex-1 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white/80 rounded-xl text-sm font-medium hover:bg-white/20 transition"
                    >
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;