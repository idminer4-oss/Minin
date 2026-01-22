
import React from 'react';
import { Users, Gift, Share2, Copy, TrendingUp, ChevronRight, Award, Zap, Layers } from 'lucide-react';

const Referral: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-6 -bottom-6 opacity-20">
          <Users className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Build Your Team</h2>
          <p className="text-white/80 text-sm mb-6 max-w-[200px]">Earn passive income while your friends mine coins.</p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-flex items-center gap-3 border border-white/20">
            <Gift className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-[10px] font-bold uppercase text-white/60">Instant Reward</p>
              <p className="text-lg font-orbitron font-bold">0.1000 <span className="text-xs">IDR</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* My Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1 tracking-widest">Total Invited</p>
          <p className="text-xl font-orbitron font-bold text-white">0</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1 tracking-widest">Current Tier</p>
          <p className="text-xl font-orbitron font-bold text-yellow-500">ROOKIE</p>
        </div>
      </div>

      {/* Detailed Referral Tiers */}
      <div className="bg-[#1a1a1e] rounded-3xl p-6 border border-white/5">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-400" />
          Referral Commissions
        </h3>
        <div className="space-y-3">
          <TierRow level="Level 1" percentage="20%" label="Direct Friends" />
          <TierRow level="Level 2" percentage="5%" label="Friends of Friends" />
          <TierRow level="Level 3" percentage="2%" label="Network Expansion" />
          <p className="text-[10px] text-gray-500 mt-4 leading-relaxed italic">
            * Commissions are calculated from the hourly mining output of your referral network and credited instantly to your balance.
          </p>
        </div>
      </div>

      {/* VIP Status progression */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">VIP Mining Status</h3>
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <VIPItem 
            icon={<Award className="text-amber-700" />} 
            title="Bronze Partner" 
            requirement="10 Referrals" 
            perks={["+0.5 Hs Bonus", "Basic Support"]}
          />
          <VIPItem 
            icon={<Award className="text-gray-300" />} 
            title="Silver Partner" 
            requirement="25 Referrals" 
            perks={["+1.5 Hs Bonus", "1% Yield Multiplier", "Priority Support"]}
          />
          <VIPItem 
            icon={<Award className="text-yellow-500" />} 
            title="Gold Partner" 
            requirement="50 Referrals" 
            perks={["+5.0 Hs Bonus", "5% Yield Multiplier", "Personal Manager"]}
          />
          <VIPItem 
            icon={<Award className="text-blue-400" />} 
            title="Diamond Elite" 
            requirement="100 Referrals" 
            perks={["Custom Mining Rig", "10% Yield Multiplier", "Instant Withdrawals"]}
            isLast
          />
        </div>
      </div>

      {/* Share Link */}
      <div className="space-y-2">
        <p className="text-[10px] text-gray-500 font-bold uppercase ml-1 tracking-widest">Your Referral Code</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group">
          <span className="font-orbitron font-bold tracking-widest text-lg">IDR-99281X</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText("IDR-99281X");
              alert("Referral code copied!");
            }}
            className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Copy className="w-5 h-5 text-yellow-500" />
          </button>
        </div>
        <button className="w-full bg-white text-black font-bold py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 shadow-lg hover:bg-yellow-500 transition-all active:scale-95">
          <Share2 className="w-5 h-5" />
          Share Invite Link
        </button>
      </div>
    </div>
  );
};

const TierRow = ({ level, percentage, label }: { level: string, percentage: string, label: string }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
    <div className="flex flex-col">
      <span className="text-xs font-bold text-indigo-400">{level}</span>
      <span className="text-[10px] text-gray-500">{label}</span>
    </div>
    <div className="text-right">
      <span className="font-orbitron font-bold text-white">{percentage}</span>
    </div>
  </div>
);

const VIPItem = ({ icon, title, requirement, perks, isLast = false }: { icon: React.ReactNode, title: string, requirement: string, perks: string[], isLast?: boolean }) => (
  <div className={`p-5 flex gap-4 ${!isLast ? 'border-b border-white/5' : ''}`}>
    <div className="bg-white/5 p-3 rounded-2xl self-start">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-sm text-white">{title}</h4>
          <p className="text-[10px] text-gray-500 font-medium">{requirement}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-700" />
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {perks.map((perk, i) => (
          <span key={i} className="text-[8px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400 flex items-center gap-1">
            <Zap className="w-2 h-2 text-yellow-500" />
            {perk}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Referral;
