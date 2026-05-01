import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const typewriterTexts = ['25000+ Colleges', '11000+ Courses', '500+ Exams', '1000+ Scholarships'];

 const backgroundImages = [
    'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const runTypewriter = useCallback(() => {
    const currentText = typewriterTexts[index];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  useEffect(() => {
    runTypewriter();
  }, [runTypewriter]);

  const colleges = [
    { id: 1, name: 'IIT Delhi', city: 'Delhi', rating: 4.8, fees: '₹2.2 Lakhs', placement: '₹25 LPA', type: 'government' },
    { id: 2, name: 'IIT Bombay', city: 'Mumbai', rating: 4.9, fees: '₹2.3 Lakhs', placement: '₹28 LPA', type: 'government' },
    { id: 3, name: 'NIT Trichy', city: 'Tiruchirappalli', rating: 4.5, fees: '₹1.8 Lakhs', placement: '₹20 LPA', type: 'government' },
  ];

  const studyGoals = [
    { title: 'Engineering', count: '6374 Colleges', icon: '⚙️', color: '#FF6B6B', courses: ['B.Tech', 'M.Tech', 'BCA'] },
    { title: 'Management', count: '8070 Colleges', icon: '📊', color: '#4ECDC4', courses: ['MBA', 'BBA', 'PGDM'] },
    { title: 'Commerce', count: '5110 Colleges', icon: '💰', color: '#45B7D1', courses: ['B.Com', 'M.Com', 'CA'] },
    { title: 'Arts', count: '5736 Colleges', icon: '🎨', color: '#96CEB4', courses: ['BA', 'MA', 'BFA'] },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-[550px] flex items-center"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 w-full px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Over{' '}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent border-r-2 border-purple-500 animate-blink">
                {displayText}
              </span>{' '}
              in India
            </h1>
            <p className="text-gray-200 text-lg mb-8">Search for colleges, courses and more...</p>

             {/* Search Bar  */}
            <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate('/results', { state: { query } }); }} className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2 backdrop-blur-md bg-white/20 rounded-full p-1 shadow-xl border border-white/30">
                <input
                  type="text"
                  placeholder="Search colleges, exams, courses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full outline-none text-gray-800 bg-transparent placeholder-white/60"
                />
                   <button 
                   type="submit" 
                   className="px-8 py-4 backdrop-blur-md bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-300 shadow-lg border border-white/30 hover:scale-105"
                    >
                    Search →
                 </button>
              </div>
            </form>

            <div className="flex justify-center gap-3 flex-wrap mb-6">
              <span className="text-gray-200">🕒 Recent Visits:</span>
              {colleges.map((college) => (
                <span
                  key={college.id}
                  onClick={() => navigate('/results', { state: { query: college.name } })}
                  className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/30 text-white"
                >
                  {college.name}
                </span>
              ))}
              <span className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full text-white text-sm cursor-pointer">
                Need Counselling ?
              </span>
            </div>

            <div className="flex justify-center gap-2">
              {backgroundImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study Goal */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Select Your Study Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyGoals.map((goal, i) => (
              <div
                key={i}
                onClick={() => navigate('/results', { state: { query: goal.title } })}
                className="text-center p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-2"
                style={{ backgroundColor: `${goal.color}10` }}
              >
                <div className="text-5xl mb-3">{goal.icon}</div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: goal.color }}>{goal.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{goal.count}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {goal.courses.map((course, idx) => (
                    <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full shadow-sm text-gray-600">{course}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="font-bold text-lg">Rankings</h3>
            <p className="text-gray-500 text-sm">NIRF, India Today Rankings</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="font-bold text-lg">College Predictor</h3>
            <p className="text-gray-500 text-sm">Know your admission chances</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/compare')}>
            <div className="text-5xl mb-3">⚖️</div>
            <h3 className="font-bold text-lg">Compare Colleges</h3>
            <p className="text-gray-500 text-sm">Side by side comparison</p>
          </div>
        </div>
      </div>

{/* Top 10 Colleges Section - Complete 1-10 */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-2xl font-bold text-gray-800">🏆 Top 10 Colleges in India 2026</h2>
      <p className="text-gray-500 text-sm mt-1">Based on NIRF Ranking 2026 | Placement | Reputation</p>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">College</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">NIRF Rank</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cutoff</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Deadline</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fees</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          
          {/* Rank 1 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'IIM Ahmedabad' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-yellow-500 text-white font-bold rounded-full inline-flex items-center justify-center">1</span></td>
            <td><div><p className="font-semibold">IIMA - IIM Ahmedabad</p><p className="text-xs text-gray-500">Ahmedabad, Gujarat</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">5.0</span></div></td>
            <td><span className="text-blue-600 font-semibold">#1 in India</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">CAT 99+</span></td>
            <td className="text-gray-500">07 Sept 2026</td>
            <td><span className="text-green-600 font-semibold">₹27.5 Lakhs</span></td>
           </tr>

          {/* Rank 2 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'IIT Bombay' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">2</span></td>
            <td><div><p className="font-semibold">IIT Bombay</p><p className="text-xs text-gray-500">Mumbai, Maharashtra</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">5.0</span></div></td>
            <td><span className="text-blue-600 font-semibold">#2 in India</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">JEE-Adv 66</span></td>
            <td className="text-gray-500">03 Apr 2026</td>
            <td><span className="text-green-600 font-semibold">₹8.82 Lakhs</span></td>
           </tr>

          {/* Rank 3 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'AIIMS Delhi' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-amber-600 text-white font-bold rounded-full inline-flex items-center justify-center">3</span></td>
            <td><div><p className="font-semibold">AIIMS Delhi</p><p className="text-xs text-gray-500">New Delhi</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.9</span></div></td>
            <td><span className="text-blue-600 font-semibold">#8 in India</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">INI-CET 2412</span></td>
            <td className="text-gray-500">10 May 2026</td>
            <td><span className="text-green-600 font-semibold">₹39,095</span></td>
           </tr>

          {/* Rank 4 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'NLSIU Bangalore' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">4</span></td>
            <td><div><p className="font-semibold">NLSIU Bangalore</p><p className="text-xs text-gray-500">Bangalore, Karnataka</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.9</span></div></td>
            <td><span className="text-gray-500">#1 in Law</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">CLAT 108</span></td>
            <td className="text-gray-500">23 Mar 2026</td>
            <td><span className="text-green-600 font-semibold">₹15.56 Lakhs</span></td>
           </tr>

          {/* Rank 5 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'VMMC Delhi' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">5</span></td>
            <td><div><p className="font-semibold">Vardhman Mahavir Medical College</p><p className="text-xs text-gray-500">New Delhi</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.9</span></div></td>
            <td><span className="text-gray-500">#5 in Medical</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">NEET 132</span></td>
            <td className="text-gray-500">15 May 2026</td>
            <td><span className="text-green-600 font-semibold">₹2.65 Lakhs</span></td>
           </tr>

          {/* Rank 6 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'IIT Delhi' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">6</span></td>
            <td><div><p className="font-semibold">IIT Delhi</p><p className="text-xs text-gray-500">New Delhi</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.9</span></div></td>
            <td><span className="text-blue-600 font-semibold">#3 in India</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">JEE-Adv 355</span></td>
            <td className="text-gray-500">03 Apr 2026</td>
            <td><span className="text-green-600 font-semibold">₹8.62 Lakhs</span></td>
           </tr>

          {/* Rank 7 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'IIT Kanpur' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">7</span></td>
            <td><div><p className="font-semibold">IIT Kanpur</p><p className="text-xs text-gray-500">Kanpur, Uttar Pradesh</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.8</span></div></td>
            <td><span className="text-blue-600 font-semibold">#4 in India</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">JEE-Adv 400</span></td>
            <td className="text-gray-500">03 Apr 2026</td>
            <td><span className="text-green-600 font-semibold">₹8.5 Lakhs</span></td>
           </tr>

          {/* Rank 8 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'BITS Pilani' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">8</span></td>
            <td><div><p className="font-semibold">BITS Pilani</p><p className="text-xs text-gray-500">Pilani, Rajasthan</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.8</span></div></td>
            <td><span className="text-gray-500">#1 in Private</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">BITSAT 350</span></td>
            <td className="text-gray-500">30 Jun 2026</td>
            <td><span className="text-green-600 font-semibold">₹19.2 Lakhs</span></td>
           </tr>

          {/* Rank 9 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'NIT Trichy' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">9</span></td>
            <td><div><p className="font-semibold">NIT Trichy</p><p className="text-xs text-gray-500">Tiruchirappalli, Tamil Nadu</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.7</span></div></td>
            <td><span className="text-blue-600 font-semibold">#1 among NITs</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">JEE-Main 5500</span></td>
            <td className="text-gray-500">30 Jun 2026</td>
            <td><span className="text-green-600 font-semibold">₹5.6 Lakhs</span></td>
           </tr>

          {/* Rank 10 */}
          <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/results', { state: { query: 'IIIT Hyderabad' } })}>
            <td className="px-4 py-3"><span className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full inline-flex items-center justify-center">10</span></td>
            <td><div><p className="font-semibold">IIIT Hyderabad</p><p className="text-xs text-gray-500">Hyderabad, Telangana</p></div></td>
            <td><div className="flex items-center gap-1"><span className="text-yellow-500">★</span><span className="font-semibold">4.7</span></div></td>
            <td><span className="text-gray-500">#1 in IIITs</span></td>
            <td><span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">JEE-Main 2000</span></td>
            <td className="text-gray-500">30 Jun 2026</td>
            <td><span className="text-green-600 font-semibold">₹12.8 Lakhs</span></td>
           </tr>
        </tbody>
      </table>
    </div>
    
    {/* View All Button */}
    <div className="bg-gray-50 px-6 py-4 border-t text-center">
      <button onClick={() => navigate('/results', { state: { query: 'top colleges' } })} className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:scale-105 transition font-medium">
        View All 50+ Colleges →
      </button>
      <p className="text-xs text-gray-500 mt-2">Last updated: April 2026 | Source: NIRF Rankings 2026</p>
    </div>
  </div>
</div>


  {/* Top Study Places Section  */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
      <span className="text-lg">📍</span>
      <h2 className="font-semibold text-gray-800">Top Study Places</h2>
    </div>
    <div className="p-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { name: 'Delhi NCR', count: '1,200+', bg: 'bg-blue-50' },
          { name: 'Bangalore', count: '980+', bg: 'bg-green-50' },
          { name: 'Hyderabad', count: '850+', bg: 'bg-purple-50' },
          { name: 'Pune', count: '780+', bg: 'bg-orange-50' },
          { name: 'Mumbai', count: '720+', bg: 'bg-red-50' },
          { name: 'Chennai', count: '690+', bg: 'bg-teal-50' },
        ].map((city, i) => (
          <div
            key={i}
            onClick={() => navigate('/results', { state: { query: city.name } })}
            className={`${city.bg} rounded-xl p-3 text-center cursor-pointer transition hover:shadow-md`}
          >
            <p className="font-semibold text-gray-800 text-sm">{city.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{city.count} Colleges</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



       {/* Admission 2026 Section */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-xl font-bold text-gray-800">📋 Admission 2026</h2>
      <p className="text-gray-500 text-sm">Important admission deadlines & updates</p>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          'B.Ed Admission 2026',
          'MBA Admission 2026',
          'MBBS Admission 2026',
          'BA Admission 2026',
          'M.Tech Admission 2026',
          'PhD Admission 2026',
          'LLB Admission 2026',
          'D.El.Ed Admission 2026',
          'B.Sc Admission 2026',
          'B.Pharmacy Admission 2026',
        ].map((course, i) => (
          <div 
            key={i}
            onClick={() => navigate('/results', { state: { query: course.replace(' Admission 2026', '') } })}
            className="bg-gray-50 hover:bg-green-50 border border-gray-200 rounded-xl p-3 text-center cursor-pointer transition"
          >
            <p className="text-sm font-medium text-gray-700">{course}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      
      {/* Latest News & Stories Section */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-xl font-bold text-gray-800">📰 Latest News & Stories</h2>
      <p className="text-gray-500 text-sm">Stay updated with latest exam and college notifications</p>
    </div>
    
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side - Exam Alerts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-orange-500">📢</span> Exam Alerts
          </h3>
          <div className="space-y-4">
            {/* News 1 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                NTA Issues Guidelines for NEET UG 2026 Exam; Check...
              </h4>
              <p className="text-xs text-gray-400 mt-1">May 1, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                The National Testing Agency has issued a comprehensive advisory regarding dress code and permissible items for candidates...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
            
            {/* News 2 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                MH Law CET 3 Year LLB 2026 Answer Key Out; Raise...
              </h4>
              <p className="text-xs text-gray-400 mt-1">May 1, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                Maharashtra State Common Entrance Test (CET) Cell has released the answer key for 3 Year LLB 2026 examination...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
            
            {/* News 3 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                VITEEE 2026 May 1 Shift 1 Question Paper: Download...
              </h4>
              <p className="text-xs text-gray-400 mt-1">May 1, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                VITEEE 2026 Question Paper for May 1 Shift 1 is available here. VIT Vellore conducted VITEEE exam on May 1, 2026 in Shift 1...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - College & Admission Alerts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-500">🏛️</span> College & Admission Alerts
          </h3>
          <div className="space-y-4">
            {/* Alert 1 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                CBSE Class 12 Board Exam 2026 Schedule Released
              </h4>
              <p className="text-xs text-gray-400 mt-1">April 28, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                Central Board of Secondary Education has released the Class 12 exam schedule for 2026. Exams will begin from February 15...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
            
            {/* Alert 2 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                JEE Main 2026 April Session Results Expected Soon
              </h4>
              <p className="text-xs text-gray-400 mt-1">April 30, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                National Testing Agency is expected to release JEE Main 2026 April session results by second week of May...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
            
            {/* Alert 3 */}
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 cursor-pointer">
                NEET UG 2026 Application Form Correction Window Open
              </h4>
              <p className="text-xs text-gray-400 mt-1">April 25, 2026</p>
              <p className="text-sm text-gray-600 mt-2">
                NTA has opened the correction window for NEET UG 2026 application forms. Candidates can make changes until May 5...
              </p>
              <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* View All Button */}
      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All News & Updates →
        </button>
      </div>
    </div>
  </div>
</div>

     


       {/* Top Courses Section */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-xl font-bold text-gray-800">📚 Top Courses in India</h2>
      <p className="text-gray-500 text-sm">Most popular courses among students</p>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          'BE/B.Tech', 'BA', 'B.Sc', 'MBA/PGDM',
          'M.Sc', 'ME/M.Tech', 'MA', 'Polytechnic',
          'B.Com', 'BBA/BMS', 'LLB', 'B.Pharm',
          'B.Ed', 'BCA', 'MCA', 'PhD'
        ].map((course, i) => (
          <div 
            key={i}
            onClick={() => navigate('/results', { state: { query: course } })}
            className="bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-xl p-3 text-center cursor-pointer transition group"
          >
            <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">{course}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



      {/* Subscribe To Our Newsletter - Exact Style */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Subscribe To Our News Letter</h2>
      <p className="text-gray-500 text-sm mb-6">Get College Notifications, Exam Notifications and News Updates</p>
      
      <div className="space-y-4">
        <div>
          <input 
            type="email" 
            placeholder="Enter your email id" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input 
            type="tel" 
            placeholder="Enter your mobile no" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600">
            <option>Choose your course</option>
            <option>Engineering (B.Tech/M.Tech)</option>
            <option>Medical (MBBS/BDS)</option>
            <option>Management (MBA/BBA)</option>
            <option>Commerce (B.Com/M.Com)</option>
            <option>Law (LLB/BA LLB)</option>
            <option>Arts (BA/MA)</option>
          </select>
        </div>
        <button className="px-6 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition">
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
        


          {/* footer section */}
          <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      {/* Column 1 - Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">🎓</div>
          <div>
            <h3 className="font-bold text-lg">Campusly</h3>
            <p className="text-xs text-gray-400">Your Education Partner</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Helping students find the perfect college since 2024. Compare colleges, read reviews, and make informed decisions.
        </p>
      </div>

      {/* Column 2 - Why Choose Us */}
      <div>
        <h3 className="font-semibold text-lg mb-4">✨ Why Choose Us?</h3>
        <div className="space-y-2">
          <p className="text-green-400 text-sm">✓ 1M+ Students</p>
          <p className="text-blue-400 text-sm">✓ 10K+ Colleges</p>
          <p className="text-yellow-400 text-sm">✓ 4.9 Rating</p>
          <p className="text-purple-400 text-sm">✓ ISO Certified</p>
          <p className="text-orange-400 text-sm">✓ 24/7 Support</p>
        </div>
       
      </div>

      {/* Column 3 - Quick Links */}
      <div>
        <h3 className="font-semibold text-lg mb-4">🔗 Quick Links</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition">About Us</a></li>
          <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
        </ul>
      </div>

      {/* Column 4 - Contact */}
      <div>
        
        <h3 className="font-semibold text-lg mb-2 mt-4">📞 Get in Touch</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-center gap-2">✉️ info@campusly.com</li>
          <li className="flex items-center gap-2">📞 +91 12345 67890</li>
          <li className="flex items-center gap-2">💬 24/7 Student Helpline</li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
      <p>© 2024 Campusly. All rights reserved. | Designed with ❤️ for students</p>
      <p className="mt-1">📍 India | 🌍 Global Presence</p>
    </div>
  </div>
</footer>


    </div>
  );
}

export default Home;