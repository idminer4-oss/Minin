
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Lock, ChevronRight, Eye, EyeOff, Coins, Zap } from 'lucide-react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    console.log("Auth view active: ", isRegister ? "Register" : "Login");
  }, [isRegister]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !phone || !password) {
      alert("Harap isi semua kolom!");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    try {
      // Logic: Pendaftar pertama adalah Admin
      const existingUsers = localStorage.getItem('minier_all_users');
      let usersList = [];
      try {
        usersList = existingUsers ? JSON.parse(existingUsers) : [];
        if (!Array.isArray(usersList)) usersList = [];
      } catch (e) {
        usersList = [];
      }
      
      const isFirstUser = usersList.length === 0;
      const newUser: User = {
        email: email.trim(),
        phone: phone.trim(),
        isLoggedIn: true,
        role: isFirstUser ? 'admin' : 'user'
      };

      // Simpan ke "database" lokal jika registrasi
      if (isRegister) {
        const userExists = usersList.some((u: any) => u.phone === phone || u.email === email);
        if (userExists) {
          alert("Nomor HP atau Email sudah terdaftar!");
          return;
        }
        usersList.push({ email: newUser.email, phone: newUser.phone, role: newUser.role });
        localStorage.setItem('minier_all_users', JSON.stringify(usersList));
      }

      onLogin(newUser);
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Terjadi kesalahan sistem. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#0a0a0c] flex flex-col p-8 items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      
      <div className="z-10 w-full animate-in fade-in zoom-in duration-500">
        {/* Logo Bergerak */}
        <div className="flex flex-col items-center mb-10 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-[2.5rem] shadow-[0_20px_60px_rgba(234,179,8,0.4)] mb-4 border-t-2 border-white/30 flex items-center justify-center">
              <Coins className="w-12 h-12 text-black" />
              <Zap className="absolute -top-1 -right-1 w-6 h-6 text-white bg-blue-500 rounded-full p-1 border-2 border-[#0a0a0c]" />
            </div>
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white tracking-tighter text-center leading-tight">
            COIN IDR <br/> 
            <span className="text-yellow-500">MINIER</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-3">Cloud Network Secure</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="tel" 
                  placeholder="083169046XXX"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="miner@idr.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs"
            >
              {isRegister ? 'Register Account' : 'Secure Login'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-gray-400 text-xs font-medium hover:text-yellow-500 transition-colors"
            >
              {isRegister ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar Sekarang'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center opacity-30">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">Gemini AI Secured Connection</p>
      </div>
    </div>
  );
};

export default Auth;
