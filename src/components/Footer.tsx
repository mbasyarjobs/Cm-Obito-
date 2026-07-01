/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Globe, MessageSquare } from 'lucide-react';
import { OrangeMask, WhiteMask } from './ObitoVisuals';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-zinc-800 bg-[#0a0a0a] py-10 overflow-hidden select-none">
      
      {/* Background Masks Side-Decorations */}
      <div className="absolute left-6 bottom-4 opacity-5 hidden md:block">
        <OrangeMask size={70} />
      </div>
      <div className="absolute right-6 bottom-4 opacity-5 hidden md:block">
        <WhiteMask size={70} />
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-5 relative z-10">
        
        {/* Creator Name branding */}
        <div className="space-y-1">
          <p className="text-xs tracking-widest text-zinc-600 uppercase font-mono">
            Crafted for Engineers
          </p>
          <h4 className="text-sm font-semibold text-zinc-300 font-display hover:text-sharingan-red transition-colors duration-300">
            M Khoirul Basyar
          </h4>
        </div>

        {/* Social Links with Elegant Modern SVG/Lucide Icons */}
        <div className="flex items-center space-x-5">
          {/* TikTok link */}
          <a
            id="link-tiktok"
            href="https://tiktok.com/@mbasyar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-[#25f4ee] hover:bg-[#25f4ee]/5 transition-all duration-300"
            title="TikTok Profile"
          >
            {/* Custom TikTok SVG icon */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.15 1.14 2.76 1.74 4.36 1.81V9.92c-1.63-.04-3.23-.51-4.58-1.44-.12-.08-.24-.18-.35-.27v7.22c0 3.39-2.02 6.55-5.26 7.57-3.71 1.05-7.78-.99-9.15-4.66-1.43-3.64.44-7.9 4.15-9.1 1.34-.45 2.78-.4 4.12.06V1.31c0-.43-.02-.87.01-1.3.11.01.21.01.31.01z" />
            </svg>
          </a>

          {/* Instagram link */}
          <a
            id="link-instagram"
            href="https://instagram.com/mbasyar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-[#e1306c] hover:bg-[#e1306c]/5 transition-all duration-300"
            title="Instagram Profile"
          >
            <Instagram size={16} className="transition-transform group-hover:scale-110" />
          </a>

          {/* Personal Website link */}
          <a
            id="link-website"
            href="https://mbasyar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-[#ff7300] hover:bg-[#ff7300]/5 transition-all duration-300"
            title="Website Pribadi"
          >
            <Globe size={16} className="transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Dynamic copyright and Obito signature statement */}
        <div className="space-y-1">
          <p className="text-[11px] text-zinc-500 font-mono select-text">
            &copy; {currentYear} Settings CM. Hak Cipta Dilindungi.
          </p>
          <p className="text-[10px] text-zinc-600 font-mono tracking-wide">
            &ldquo;Seseorang yang melanggar aturan disebut sampah, tetapi orang yang meninggalkan temannya lebih buruk dari sampah.&rdquo; — Obito Uchiha
          </p>
        </div>

      </div>
    </footer>
  );
};
