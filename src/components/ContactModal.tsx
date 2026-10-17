import React, { useState } from 'react';
import { X, Send, Instagram, Mail, CheckCircle2, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Narudžbe & Veličine',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0C0C0C] border border-[#262626] text-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border border-[#222222] hover:border-white text-[#888888] hover:text-white transition-colors cursor-pointer"
          aria-label="Zatvori kontakt prozor"
        >
          <X className="w-4 h-4" />
        </button>

        {formSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
            <h3 className="text-xl font-bold font-syne uppercase text-white">
              PORUKA POSLANA
            </h3>
            <p className="text-xs font-typewriter text-[#888888] max-w-xs mx-auto">
              Kontaktirat ćemo vas uskoro na vašu e-mail adresu ili putem telefona.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono-tech text-[#888888] uppercase tracking-widest">
                // NOIR CULTURE KONTAKT
              </div>
              <h2 className="text-2xl font-bold font-syne uppercase tracking-tight text-white mt-1">
                KONTAKT & UPITI
              </h2>
              <p className="text-xs font-typewriter text-[#888888] mt-2 leading-relaxed">
                Pitanja o veličinama majica, ličnom preuzimanju u Sarajevu ili narudžbama.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
              <a
                href="https://instagram.com/cltr.noir"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#111111] border border-[#262626] hover:border-white transition-colors flex items-center gap-3 group"
              >
                <Instagram className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-[#777777] uppercase">Instagram:</div>
                  <div className="text-white font-bold">cltr.noir</div>
                </div>
              </a>

              <a
                href="mailto:noir.culture76@gmail.com"
                className="p-3 bg-[#111111] border border-[#262626] hover:border-white transition-colors flex items-center gap-3 group"
              >
                <Mail className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[10px] text-[#777777] uppercase">E-Mail:</div>
                  <div className="text-white font-bold truncate text-[11px]">noir.culture76@gmail.com</div>
                </div>
              </a>
            </div>

            <div className="p-2.5 bg-[#080808] border border-[#1E1E1E] flex items-center gap-2 text-[11px] font-mono-tech text-[#AAAAAA]">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
              <span>Dostava u roku 48h ili lično preuzimanje Sarajevo.</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                  Vaše Ime
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ime i Prezime"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] focus:border-white px-3.5 py-2.5 text-xs font-mono-tech text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                  Vaša E-Mail Adresa
                </label>
                <input
                  type="email"
                  required
                  placeholder="vas.email@domena.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] focus:border-white px-3.5 py-2.5 text-xs font-mono-tech text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                  Tema Upita
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none"
                >
                  <option value="Narudžbe & Veličine">Pomoć oko regular veličina (S-XL)</option>
                  <option value="Lično preuzimanje">Lično preuzimanje Sarajevo</option>
                  <option value="Dostava">Kurirska dostava 48h</option>
                  <option value="Ostalo">Opšti upit</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                  Poruka
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Napišite svoju poruku..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] focus:border-white p-3 text-xs font-mono-tech text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white hover:bg-[#E5E5E5] text-black font-mono-tech text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>POŠALJI DIREKTAN UPIT</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
