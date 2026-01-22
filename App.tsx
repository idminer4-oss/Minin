import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Pickaxe, 
  ShoppingCart, 
  Wallet, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import { User, WalletState, AppTab } from './types';
import { BASE_MINING_RATE } from './constants';
import Dashboard from './components/Dashboard';
import MiningPanel from './components/MiningPanel';
import Shop from './components/Shop';
import WalletView from './components/WalletView';
import Missions from './components/Missions';
import Referral from './components/Referral';
import AICustomerService from './components/AICustomerService';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';

// Fix: Extending the global Window interface to include markAppAsReady for type safety on lines 58-59
declare global {
  interface Window {
    markAppAsReady?: () => void;
  }
}

const App: React.FC = () => {
  // Safe Storage Retrieval
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('minier_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return (parsed && parsed.email) ? parsed : null;
    } catch (e) {
      console.error("User storage error:", e);
      return null;
    }
  });

  const [wallet, setWallet] = useState<WalletState>(() => {
    const defaultWallet = {
      balance: 1.0000,
      hashrate: 1.0,
      lastClaimTime: Date.now(),
      accumulatedMined: 0
    };
    try {
      const saved = localStorage.getItem('minier_wallet');
      return saved ? JSON.parse(saved) : defaultWallet;
    } catch (e) {
      return defaultWallet;
    }
  });

  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  // Pastikan loader ditutup kapanpun komponen berhasil dimuat
  useEffect(() => {
    console.log("App component mounted, current user:", user?.email || "Guest");
    const timer = setTimeout(() => {
      // Fix: markAppAsReady is now recognized on the window object
      if (window.markAppAsReady) {
        window.markAppAsReady();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('minier_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('minier_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('minier_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      setWallet(prev => {
        const ratePerSecond = (prev.hashrate * BASE_MINING_RATE) / 86400;
        return {
          ...prev,
          accumulatedMined: prev.accumulatedMined + ratePerSecond
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const handleClaim = useCallback(() => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + prev.accumulatedMined,
      accumulatedMined: 0,
      lastClaimTime: Date.now()
    }));
  }, []);

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  // Jika tidak ada user, tampilkan halaman Login/Register
  if (!user) {
    return (
      <div id="auth-container" style={{ minHeight: '100vh', background: '#0a0a0c' }}>
        <Auth onLogin={(u) => setUser(u)} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard wallet={wallet} onNavigate={setActiveTab} />;
      case 'mining': return <MiningPanel wallet={wallet} onClaim={handleClaim} />;
      case 'shop': return <Shop wallet={wallet} setWallet={setWallet} />;
      case 'wallet': return <WalletView wallet={wallet} setWallet={setWallet} />;
      case 'missions': return <Missions wallet={wallet} setWallet={setWallet} />;
      case 'referral': return <Referral />;
      case 'support': return <AICustomerService />;
      case 'admin': return user.role === 'admin' ? <AdminPanel /> : <Dashboard wallet={wallet} onNavigate={setActiveTab} />;
      default: return <Dashboard wallet={wallet} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#0a0a0c] text-white shadow-2xl relative border-x border-gray-800 overflow-hidden">
      <header className="p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-[#0a0a0c]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 p-2 rounded-xl">
            <Pickaxe className="w-5 h-5 text-black" />
          </div>
          <h1 className="font-orbitron font-bold text-lg tracking-wider text-yellow-500 leading-none">IDR MINIER</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-orbitron font-semibold text-yellow-400">
              {wallet.balance.toFixed(4)} <span className="text-[10px]">IDR</span>
            </p>
          </div>
          <button onClick={handleLogout} className="p-2 bg-gray-900 rounded-lg">
            <LogOut className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#111114]/90 backdrop-blur-xl border-t border-white/5 px-2 py-3 flex justify-between items-center z-50">
        <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard className="w-5 h-5" />} label="Home" />
        <NavButton active={activeTab === 'mining'} onClick={() => setActiveTab('mining')} icon={<Pickaxe className="w-5 h-5" />} label="Mine" />
        <NavButton active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} icon={<ShoppingCart className="w-5 h-5" />} label="Shop" />
        <NavButton active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} icon={<Wallet className="w-5 h-5" />} label="Wallet" />
        <NavButton active={activeTab === 'support'} onClick={() => setActiveTab('support')} icon={<MessageSquare className="w-5 h-5" />} label="Support" />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 min-w-[60px] ${active ? 'text-yellow-500' : 'text-gray-500'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;