/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Terminal, FileText, Info, HelpCircle } from 'lucide-react';
import { MaintenanceNote } from '../types';
import { CATEGORIES } from '../seedData';
import { MangekyouSharingan } from './ObitoVisuals';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<MaintenanceNote, 'id' | 'createdAt'> & { id?: string }) => void;
  editingNote?: MaintenanceNote | null;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingNote
}) => {
  const [judul, setJudul] = useState('');
  const [isiCatatan, setIsiCatatan] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Service');
  const [error, setError] = useState('');

  // Populate data when editing
  useEffect(() => {
    if (editingNote) {
      setJudul(editingNote.judul);
      setIsiCatatan(editingNote.isiCatatan);
      setNotes(editingNote.notes);
      setCategory(editingNote.category);
    } else {
      // Reset form
      setJudul('');
      setIsiCatatan('');
      setNotes('');
      setCategory('Service');
    }
    setError('');
  }, [editingNote, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!judul.trim()) {
      setError('Judul catatan tidak boleh kosong!');
      return;
    }
    if (!isiCatatan.trim()) {
      setError('Perintah terminal / isi catatan tidak boleh kosong!');
      return;
    }

    onSave({
      judul: judul.trim(),
      isiCatatan: isiCatatan.trim(),
      notes: notes.trim(),
      category,
      ...(editingNote ? { id: editingNote.id } : {})
    });

    onClose();
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Exclude 'All' from selection
  const modalCategories = CATEGORIES.filter(cat => cat !== 'All');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060608]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#121215] shadow-2xl overflow-hidden z-10"
          >
            {/* Design Ornament Header with Obito Sharingan */}
            <div className="absolute top-0 right-0 p-6 overflow-hidden pointer-events-none">
              <MangekyouSharingan size={150} className="opacity-[0.03] translate-x-12 -translate-y-12 rotate-45 scale-110" animated={false} />
            </div>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80 bg-[#151519]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sharingan-red/10 border border-sharingan-red/30 flex items-center justify-center">
                  <Terminal size={16} className="text-sharingan-red" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display text-zinc-100">
                    {editingNote ? 'Edit Perintah Central Maintenance' : 'Tambah Perintah Baru'}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    {editingNote ? 'Ubah parameter dan notes untuk command ini' : 'Tambahkan catatan dan perintah Linux baru'}
                  </p>
                </div>
              </div>
              
              <button
                id="btn-close-modal"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3.5 bg-sharingan-red/10 border border-sharingan-red/20 rounded-lg text-xs text-sharingan-red font-medium flex items-center space-x-2">
                  <Info size={14} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Title Input */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FileText size={13} className="text-zinc-500" />
                  Judul Perintah / Operasi
                </label>
                <input
                  id="title"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Restart Parking Service & Cek Status"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-sharingan-red focus:bg-zinc-900 transition-all duration-300 text-sm"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <HelpCircle size={13} className="text-zinc-500" />
                  Kategori Perintah
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {modalCategories.map((cat) => (
                    <button
                      id={`btn-select-category-${cat}`}
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-xs rounded-lg border text-center font-medium transition-all duration-200 ${
                        category === cat
                          ? 'bg-sharingan-red/10 text-sharingan-red border-sharingan-red/50 shadow-[0_0_10px_rgba(255,26,26,0.15)]'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Command Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="terminal_code" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Terminal size={13} className="text-zinc-500" />
                    Perintah Terminal Linux
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">Mendukung multi-baris</span>
                </div>
                <textarea
                  id="terminal_code"
                  value={isiCatatan}
                  onChange={(e) => setIsiCatatan(e.target.value)}
                  placeholder="Contoh:&#10;sudo systemctl restart parking.service&#10;systemctl status parking.service"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-[#060608] text-emerald-400 placeholder-zinc-700 font-mono focus:outline-none focus:border-sharingan-red transition-all duration-300 text-sm leading-relaxed"
                />
              </div>

              {/* Notes Input */}
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Info size={13} className="text-zinc-500" />
                  Catatan Tambahan (Notes)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Lakukan restart ini hanya ketika gate keluar tidak merespon pengiriman database pusat."
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-sharingan-red focus:bg-zinc-900 transition-all duration-300 text-sm"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-800/80">
                <button
                  id="btn-cancel"
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium text-sm transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  id="btn-save"
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-sharingan-red text-white hover:bg-sharingan-dark font-medium text-sm transition-all duration-200 glow-red"
                >
                  <Save size={16} />
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
