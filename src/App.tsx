/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Terminal, AlertTriangle, Filter, CheckCircle, RotateCcw } from 'lucide-react';
import { MaintenanceNote } from './types';
import { INITIAL_NOTES } from './seedData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotesCard } from './components/NotesCard';
import { NoteModal } from './components/NoteModal';
import { KamuiVortexBg } from './components/ObitoVisuals';

// Import the generated Obito Uchiha background artwork

export default function App() {
  // State for Maintenance Notes
  const [notes, setNotes] = useState<MaintenanceNote[]>(() => {
    const saved = localStorage.getItem('obito_maintenance_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Gagal memuat catatan dari LocalStorage: ', e);
      }
    }
    return INITIAL_NOTES;
  });

  // State for UI filters & themes
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeEye, setActiveEye] = useState<'sharingan' | 'rinnegan'>(() => {
    const savedEye = localStorage.getItem('obito_active_eye');
    return (savedEye === 'rinnegan' ? 'rinnegan' : 'sharingan') as 'sharingan' | 'rinnegan';
  });

  // State for Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<MaintenanceNote | null>(null);

  // State for Toast Notifications
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' | 'danger' }>>([]);

  // State for Custom Confirmation Modal (to avoid window.confirm inside iframe)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Sync Notes to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('obito_maintenance_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync active eye theme to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('obito_active_eye', activeEye);
  }, [activeEye]);

  // Handle toast notifications helper
  const showToast = (message: string, type: 'success' | 'info' | 'danger' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Add or Update Note Handler
  const handleSaveNote = (noteData: Omit<MaintenanceNote, 'id' | 'createdAt'> & { id?: string }) => {
    if (noteData.id) {
      // Update action
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteData.id
            ? { ...n, ...noteData, createdAt: n.createdAt } // Preserve original creation time
            : n
        )
      );
      showToast('Catatan Central Maintenance berhasil diperbarui!', 'success');
    } else {
      // Create action
      const newNote: MaintenanceNote = {
        ...noteData,
        id: 'note-' + Math.random().toString(36).substr(2, 9),
        createdAt: Date.now()
      };
      setNotes((prev) => [newNote, ...prev]);
      showToast('Catatan baru berhasil ditambahkan ke terminal!', 'success');
    }
  };

  // Initiate Delete Confirmation
  const confirmDeleteNote = (id: string) => {
    setDeleteTargetId(id);
  };

  // Execute Delete action
  const handleDeleteNote = () => {
    if (!deleteTargetId) return;
    setNotes((prev) => prev.filter((n) => n.id !== deleteTargetId));
    setDeleteTargetId(null);
    showToast('Catatan berhasil dihapus!', 'info');
  };

  // Reset to original seed notes if they want templates back
  const handleResetToSeeds = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang database ke default template bawaan Obito?')) {
      setNotes(INITIAL_NOTES);
      showToast('Database disetel ulang ke default template!', 'info');
    }
  };

  // Filter notes based on category & search query
  const filteredNotes = notes.filter((note) => {
    const matchCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const cleanQuery = searchQuery.toLowerCase().trim();
    if (!cleanQuery) return matchCategory;

    const matchTitle = note.judul.toLowerCase().includes(cleanQuery);
    const matchCommand = note.isiCatatan.toLowerCase().includes(cleanQuery);
    const matchNotes = note.notes.toLowerCase().includes(cleanQuery);

    return matchCategory && (matchTitle || matchCommand || matchNotes);
  });

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-[#050505] text-zinc-100 select-text">
      
      {/* Obito Uchiha Background Wallpaper with elegant dark cover overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-25 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/src/assets/images/obito_background_1782924362838.jpg")', mixBlendMode: 'luminosity' }}
      />

      {/* Interactive Ambient Kamui Vortex floating in background */}
      <KamuiVortexBg />

      {/* Header Panel with search, logo, eye switchers, and integrated Category dropdown */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeEye={activeEye}
        setActiveEye={setActiveEye}
      />

      {/* Main Panel Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 relative z-10">
        
        {/* Small Active Status Panel under header */}
        <div className="flex items-center justify-between gap-4 mb-6 px-1 select-none">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
            <span>Filter Aktif:</span>
            <span className={`px-2 py-0.5 rounded border ${
              activeEye === 'sharingan' ? 'border-sharingan-red/30 text-sharingan-red' : 'border-rinnegan-purple/30 text-rinnegan-light'
            }`}>
              {selectedCategory === 'All' ? '📂 Semua Kategori' : `🏷️ ${selectedCategory}`}
            </span>
            {searchQuery && (
              <span className="text-zinc-600">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          <button
            id="btn-reset-seeds"
            onClick={handleResetToSeeds}
            className="text-[11px] font-mono text-zinc-600 hover:text-sharingan-red transition-all duration-300 flex items-center gap-1"
            title="Muat ulang default data bawaan"
          >
            <RotateCcw size={10} />
            <span>Reset database</span>
          </button>
        </div>

        {/* Notes Grid Dashboard with accordion layout */}
        {filteredNotes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <NotesCard
                  key={note.id}
                  note={note}
                  onEdit={(selected) => {
                    setEditingNote(selected);
                    setIsModalOpen(true);
                  }}
                  onDelete={confirmDeleteNote}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search results or empty database display */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full py-16 px-6 rounded-lg border border-dashed border-zinc-800 bg-[#0c0c0e]/90 flex flex-col items-center text-center justify-center space-y-4 shadow-xl"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${activeEye === 'sharingan' ? 'bg-sharingan-red/10 border border-sharingan-red/20 text-sharingan-red' : 'bg-rinnegan-purple/10 border border-rinnegan-purple/20 text-rinnegan-light'}`}>
              <Terminal size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold font-display text-zinc-200">
                Tidak ada perintah ditemukan
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm">
                Cobalah mengubah kata pencarian atau bersihkan filter kategori di dropdown atas untuk memulihkan tampilan.
              </p>
            </div>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                id="btn-clear-search-empty"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                  activeEye === 'sharingan'
                    ? 'bg-sharingan-red/10 border-sharingan-red/40 text-sharingan-red hover:bg-sharingan-red/20'
                    : 'bg-rinnegan-purple/10 border-rinnegan-purple/40 text-rinnegan-light hover:bg-rinnegan-purple/20'
                }`}
              >
                Atur Ulang Pencarian & Kategori
              </button>
            )}
          </motion.div>
        )}
      </main>

      {/* Floating Action Button (FAB) at bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          id="btn-add-note-fab"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl transition-all duration-300 ${
            activeEye === 'sharingan'
              ? 'bg-sharingan-red hover:bg-sharingan-dark glow-red shadow-sharingan-red/20 border-2 border-white/25'
              : 'bg-rinnegan-purple hover:bg-rinnegan-purple/80 glow-purple shadow-rinnegan-purple/20 border-2 border-white/25'
          }`}
          title="Tambah Perintah Central Maintenance"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      {/* Add / Edit Form Modal Popup */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />

      {/* Interactive Delete Confirmation Dialog Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTargetId(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Box Alert */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-[#121215] p-6 shadow-2xl z-10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-sharingan-red/10 border border-sharingan-red/30 flex items-center justify-center text-sharingan-red">
                  <AlertTriangle size={22} className="animate-bounce" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold font-display text-zinc-100">Hapus Perintah?</h4>
                  <p className="text-xs text-zinc-400">
                    Tindakan ini permanen. Perintah terminal ini akan dihapus dari data LocalStorage Anda.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full pt-2">
                  <button
                    id="btn-confirm-delete-cancel"
                    onClick={() => setDeleteTargetId(null)}
                    className="flex-1 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    id="btn-confirm-delete-execute"
                    onClick={handleDeleteNote}
                    className="flex-1 py-2.5 rounded-lg bg-sharingan-red hover:bg-sharingan-dark text-white text-xs font-semibold transition-colors duration-200 glow-red"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification HUD */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              className={`p-3.5 rounded-xl border shadow-xl flex items-center space-x-2.5 pointer-events-auto bg-[#141418] text-sm text-zinc-200 ${
                toast.type === 'success'
                  ? 'border-emerald-800/40 text-emerald-400'
                  : toast.type === 'danger'
                  ? 'border-sharingan-red/40 text-sharingan-red'
                  : 'border-zinc-800'
              }`}
            >
              <CheckCircle size={15} className={toast.type === 'success' ? 'text-emerald-400' : 'text-zinc-400'} />
              <span className="font-sans font-medium text-xs text-zinc-300">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer copyright & creator links */}
      <Footer />
    </div>
  );
}
