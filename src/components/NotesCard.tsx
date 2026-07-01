/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Trash2, Tag, Calendar, Info, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { MaintenanceNote } from '../types';
import { TerminalBlock } from './TerminalBlock';
import { AkatsukiCloud } from './ObitoVisuals';

interface NotesCardProps {
  note: MaintenanceNote;
  onEdit: (note: MaintenanceNote) => void;
  onDelete: (id: string) => void;
}

export const NotesCard: React.FC<NotesCardProps> = ({ note, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format creation date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Determine category color themes based on Sharingan / Rinnegan palettes
  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case 'service':
        return 'bg-sharingan-red/10 text-sharingan-red border-sharingan-red/30';
      case 'database':
        return 'bg-rinnegan-purple/10 text-rinnegan-light border-rinnegan-purple/30';
      case 'network':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'system':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'log':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const getLeftBorderColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'service':
        return 'border-l-4 border-sharingan-red';
      case 'database':
        return 'border-l-4 border-rinnegan-purple';
      case 'network':
        return 'border-l-4 border-amber-500';
      case 'system':
        return 'border-l-4 border-blue-500';
      case 'log':
        return 'border-l-4 border-emerald-500';
      default:
        return 'border-l-4 border-zinc-700';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative flex flex-col justify-between w-full p-5 rounded-lg bg-[#0f0f0f]/95 shadow-xl hover:shadow-[0_8px_30px_rgb(255,26,26,0.08)] transition-all duration-300 overflow-hidden group ${getLeftBorderColor(note.category)}`}
    >
      {/* Decorative Akatsuki cloud background watermark */}
      <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-15 group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none">
        <AkatsukiCloud size={100} />
      </div>

      <div>
        {/* Header containing Category, Date & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryStyles(note.category)}`}>
              <Tag size={10} />
              {note.category}
            </span>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Calendar size={10} />
              {formatDate(note.createdAt)}
            </span>
          </div>

          {/* Action buttons (Edit, Delete) */}
          <div className="flex items-center space-x-2">
            <button
              id={`btn-edit-${note.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-200"
              title="Edit Catatan"
            >
              <Edit2 size={11} />
              <span>✏ Edit</span>
            </button>
            <button
              id={`btn-delete-${note.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-sharingan-red hover:border-sharingan-red/30 hover:bg-sharingan-red/10 transition-all duration-200"
              title="Hapus Catatan"
            >
              <Trash2 size={11} />
              <span>🗑 Hapus</span>
            </button>
          </div>
        </div>

        {/* Note Title & Toggle Action Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex items-center justify-between gap-4 py-2 hover:bg-zinc-900/40 rounded px-1 transition-all duration-200"
          title="Klik untuk membuka/menutup detail perintah"
        >
          <h3 className="text-base sm:text-lg font-bold font-display text-zinc-100 group-hover:text-sharingan-red transition-colors duration-300">
            {note.judul}
          </h3>

          <button
            id={`btn-toggle-expand-${note.id}`}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              isExpanded
                ? 'bg-sharingan-red/10 border-sharingan-red/40 text-sharingan-red'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {isExpanded ? (
              <>
                <span>Tutup</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Lihat</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>

        {/* Expandable Linux Terminal Block & Notes content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                {/* Terminal block with actual command execution line numbers */}
                <TerminalBlock command={note.isiCatatan} />

                {/* Additional description text notes */}
                {note.notes && (
                  <div className="pt-3 border-t border-zinc-900 flex items-start space-x-2 text-zinc-500 select-text relative z-10">
                    <Info size={14} className="text-sharingan-red/60 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-normal leading-relaxed">
                        <span className="font-semibold text-zinc-400 mr-1">Notes:</span>
                        {note.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
