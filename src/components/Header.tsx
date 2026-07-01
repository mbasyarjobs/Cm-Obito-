/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Terminal, Plus } from 'lucide-react';
import { MangekyouSharingan, Rinnegan, AkatsukiCloud } from './ObitoVisuals';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClick: () => void;
  activeEye: 'sharingan' | 'rinnegan';
  setActiveEye: (eye: 'sharingan' | 'rinnegan') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onAddClick,
  activeEye,
  setActiveEye
}) => {
  return (
    <header className="relative w-full border-b border-zinc-800 bg-[#0a0a0a]/90 py-8 sm:py-10 overflow-hidden select-none">
      {/* S-Rank Mission Status HUD on top-right */}
      <div className="absolute top-6 right-8 text-right hidden md:block">
        <span className="text-[10px] text-zinc-500 tracking-wider block font-semibold uppercase">MISSION STATUS</span>
        <span className={`text-xs font-mono font-bold animate-pulse ${activeEye === 'sharingan' ? 'text-sharingan-red' : 'text-rinnegan-light'}`}>
          ACTIVE / S-RANK
        </span>
      </div>

      {/* Visual background effects: Floating subtle Akatsuki clouds */}
      <div className="absolute top-4 left-[5%] opacity-15 pointer-events-none">
        <AkatsukiCloud size={60} animated={true} />
      </div>
      <div className="absolute bottom-4 right-[8%] opacity-10 pointer-events-none scale-75">
        <AkatsukiCloud size={80} animated={false} />
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
        
        {/* Interactive Obito Dual-Eye Portal (Sharingan & Rinnegan) */}
        <div className="flex items-center justify-center space-x-6 sm:space-x-8 mb-6">
          
          {/* Left Eye Option (Rinnegan) */}
          <button
            id="btn-toggle-rinnegan"
            onClick={() => setActiveEye('rinnegan')}
            className={`group relative p-2 rounded-full transition-all duration-300 ${
              activeEye === 'rinnegan'
                ? 'bg-rinnegan-purple/10 border-2 border-rinnegan-purple/80 shadow-[0_0_15px_rgba(138,43,226,0.3)] scale-110'
                : 'border border-transparent bg-[#111] hover:bg-zinc-900 opacity-60 hover:opacity-100 scale-95'
            }`}
            title="Aktifkan Mode Rinnegan (Ungu)"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rinnegan-purple/20 text-rinnegan-light border border-rinnegan-purple/40 text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Left Eye: Rinnegan
            </div>
            <Rinnegan size={55} animated={activeEye === 'rinnegan'} />
          </button>

          {/* Center Connector / Vortex Center */}
          <div className="flex flex-col items-center select-none">
            <div className="w-1.5 h-12 bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
              Kamui Portal
            </span>
            <div className="w-1.5 h-12 bg-gradient-to-t from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Right Eye Option (Mangekyou Sharingan) */}
          <button
            id="btn-toggle-sharingan"
            onClick={() => setActiveEye('sharingan')}
            className={`group relative p-2 rounded-full transition-all duration-300 ${
              activeEye === 'sharingan'
                ? 'bg-sharingan-red/10 border-2 border-sharingan-red/80 shadow-[0_0_15px_rgba(255,26,26,0.3)] scale-110'
                : 'border border-transparent bg-[#111] hover:bg-zinc-900 opacity-60 hover:opacity-100 scale-95'
            }`}
            title="Aktifkan Mode Sharingan (Merah)"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sharingan-red/20 text-sharingan-red border border-sharingan-red/40 text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Right Eye: Sharingan
            </div>
            <MangekyouSharingan size={55} animated={activeEye === 'sharingan'} />
          </button>
          
        </div>

        {/* Title */}
        <div className="mb-3.5 flex items-center justify-center space-x-2">
          <Terminal size={22} className={activeEye === 'sharingan' ? 'text-sharingan-red animate-pulse' : 'text-rinnegan-light animate-pulse'} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white select-text">
            Settings <span className={activeEye === 'sharingan' ? 'text-sharingan-red glow-text-red transition-all duration-500' : 'text-rinnegan-light glow-text-purple transition-all duration-500'}>CM</span>
          </h1>
        </div>
        
        {/* Subtitle / Sub-header */}
        <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest italic mb-2">
          Central Maintenance Terminal
        </p>

        {/* Mobile Mission Status HUD */}
        <div className="mb-4 text-center md:hidden">
          <span className="text-[9px] text-zinc-500 tracking-wider font-semibold uppercase">MISSION STATUS</span>
          <span className={`text-xs font-mono font-bold animate-pulse ml-1.5 ${activeEye === 'sharingan' ? 'text-sharingan-red' : 'text-rinnegan-light'}`}>
            ACTIVE / S-RANK
          </span>
        </div>
        
        {/* Quote Description */}
        <p className="text-xs sm:text-sm italic font-mono text-zinc-500 max-w-lg mb-8 select-text">
          &ldquo;Kumpulan perintah terminal Linux untuk kebutuhan Central Maintenance.&rdquo;
        </p>

        {/* Unified Search and Add Note HUD */}
        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-xl bg-[#111] border rounded-2xl overflow-hidden transition-all duration-500 ${
          activeEye === 'sharingan'
            ? 'border-zinc-800/80 focus-within:border-sharingan-red focus-within:shadow-[0_0_18px_rgba(255,26,26,0.15)]'
            : 'border-zinc-800/80 focus-within:border-rinnegan-purple focus-within:shadow-[0_0_18px_rgba(138,43,226,0.15)]'
        }`}>
          {/* Add Note Button replacing Category dropdown */}
          <button
            id="btn-add-note-header"
            onClick={onAddClick}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 bg-zinc-950 border-b sm:border-b-0 sm:border-r border-zinc-800 text-xs sm:text-sm font-semibold font-display text-zinc-300 hover:text-white transition-all duration-300 whitespace-nowrap ${
              activeEye === 'sharingan'
                ? 'hover:bg-sharingan-red/15 hover:border-sharingan-red/30'
                : 'hover:bg-rinnegan-purple/15 hover:border-rinnegan-purple/30'
            }`}
          >
            <Plus size={15} className={activeEye === 'sharingan' ? 'text-sharingan-red' : 'text-rinnegan-light'} />
            <span>Tambah Catatan Baru</span>
          </button>

          {/* Search text input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-zinc-500" />
            </div>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari perintah, judul, atau notes..."
              className="w-full bg-transparent text-zinc-100 text-xs sm:text-sm pl-11 pr-12 py-3.5 sm:py-4 outline-none placeholder-zinc-600"
            />
            {searchQuery && (
              <button
                id="clear-search"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
