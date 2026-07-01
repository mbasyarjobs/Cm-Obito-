/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface TerminalBlockProps {
  command: string;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin perintah: ', err);
    }
  };

  const lines = command.split('\n');

  return (
    <div className="w-full rounded-lg border border-zinc-800 bg-[#060608] overflow-hidden shadow-2xl relative group">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f0f12] border-b border-zinc-800/80">
        <div className="flex items-center space-x-2">
          {/* Linux Mac-like terminal buttons */}
          <div className="w-3 h-3 rounded-full bg-sharingan-red/80 transition-all duration-300 hover:bg-sharingan-red" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 transition-all duration-300 hover:bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 transition-all duration-300 hover:bg-emerald-500" />
          
          <div className="flex items-center ml-2 space-x-1.5 text-zinc-500 text-[11px] font-mono select-none">
            <Terminal size={11} className="text-zinc-600" />
            <span>root@obito-central-maintenance:~</span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          id={`btn-copy-${Math.random().toString(36).substr(2, 9)}`}
          onClick={handleCopy}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium font-sans transition-all duration-300 ${
            copied
              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/50'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
          }`}
          title="Salin Perintah"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy size={12} className="transition-transform group-hover:scale-110" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Editor Content */}
      <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed max-h-[300px] select-text">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-zinc-900/40 transition-colors">
                {/* Line numbers */}
                <td className="text-right text-zinc-600 select-none border-r border-zinc-800/50 w-8 pr-3 font-mono">
                  {index + 1}
                </td>
                {/* Command text */}
                <td className="pl-4 text-emerald-400 whitespace-pre-wrap break-all sm:break-normal font-mono tracking-wide align-top">
                  <span className="text-zinc-500 select-none mr-1.5">$</span>
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
