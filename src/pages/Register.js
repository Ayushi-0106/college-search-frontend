import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ name, email }));
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Register Card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/20">
        
        {/* Header  */}
        <div className="text-center py-4 px-4">
          <div className="text-4xl mb-1">🚀</div>
          <h2 className="text-xl font-bold text-white">Create Account</h2>
          <p className="text-xs text-gray-200">Join us today</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleRegister} className="px-5 pb-5">
          {/* Full Name */}
          <div className="mb-3">
            <label className="block text-white text-xs font-semibold mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          {/* Email */}
          <div className="mb-3">
            <label className="block text-white text-xs font-semibold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          {/* Password */}
          <div className="mb-3">
            <label className="block text-white text-xs font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          {/* Confirm Password */}
          <div className="mb-3">
            <label className="block text-white text-xs font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          {/* Terms */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-xs text-white/80">
              <input type="checkbox" className="rounded bg-white/20 border-white/30 w-3 h-3" required /> 
              I agree to the Terms & Conditions
            </label>
          </div>
          
          {error && <p className="text-red-300 text-xs mb-3">{error}</p>}
          
          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold text-sm hover:bg-white/30 hover:scale-105 transition-all duration-300"
          >
            Register →
          </button>
          
          {/* Login Link */}
          <p className="text-center mt-4 text-white/70 text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:text-white/100">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;