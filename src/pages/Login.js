import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/*  Login Card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="text-center p-6">
          <div className="text-5xl mb-2">🎓</div>
          <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
          <p className="text-sm text-gray-200">Sign in to continue</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleLogin} className="p-6">
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" className="rounded bg-white/20 border-white/30" /> Remember me
            </label>
            <a href="#" className="text-sm text-white/80 hover:text-white">Forgot Password?</a>
          </div>
          
          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300"
          >
            Login →
          </button>
          
          <p className="text-center mt-6 text-white/80">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-semibold hover:text-white/100">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;