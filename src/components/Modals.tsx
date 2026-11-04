import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Ticket, Volume2, VolumeX } from 'lucide-react';
import { MarcaEfectoLogo } from './MarcaEfectoLogo';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  const [tier, setTier] = useState<'general' | 'vip'>('general');
  const [qty, setQty] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unitPrice = tier === 'general' ? 65 : 135;
  const total = unitPrice * qty;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa tu nombre completo y un correo electrónico válido.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
    >
      <div
        className="relative w-full max-w-[480px] rounded-[24px] p-[2px] speaker-border-gradient shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[22px] bg-[#160d24] p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-5">
            <MarcaEfectoLogo size="sm" />
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#10ce99]/20 text-[#10ce99] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 id="ticket-modal-title" className="text-xl font-bold uppercase">
                ¡Reserva Confirmada!
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Hemos enviado los detalles de tus <strong>{qty}</strong> entrada(s){' '}
                <strong>{tier === 'vip' ? 'VIP Experience' : 'General'}</strong> a{' '}
                <span className="text-[#12D89E]">{email}</span>.
              </p>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white/80 space-y-1 text-left">
                <p>
                  <strong>Evento:</strong> Marca Efecto 2024: El Poder De Tu Marca Personal
                </p>
                <p>
                  <strong>Fecha:</strong> 14 De Enero De 2024, 3:00 PM
                </p>
                <p>
                  <strong>Lugar:</strong> The Vault Function Hall, 238 Essex Street, Lawrence, USA
                </p>
                <p>
                  <strong>Total:</strong> ${total} USD
                </p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-2 w-full py-3 rounded-full btn-marca-gradient text-xs font-semibold uppercase tracking-wider text-white cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="space-y-4">
              <div>
                <h3 id="ticket-modal-title" className="text-xl sm:text-2xl font-bold uppercase">
                  Adquiere Tus Entradas
                </h3>
                <div className="mt-2 flex flex-col gap-1 text-xs text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#12D89E] shrink-0" />
                    14 De Enero De 2024, 3pm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B427CC] shrink-0" />
                    The Vault Function Hall, 238 Essex Street, Lawrence, USA
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setTier('general')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === 'general'
                      ? 'border-[#12D89E] bg-[#12D89E]/15'
                      : 'border-white/15 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-white">General</span>
                    <Ticket className="w-4 h-4 text-[#12D89E]" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-white tabular-nums">$65</p>
                  <p className="text-[11px] text-white/70">Acceso completo</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('vip')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === 'vip'
                      ? 'border-[#B427CC] bg-[#B427CC]/20'
                      : 'border-white/15 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-white">VIP Pass</span>
                    <Ticket className="w-4 h-4 text-[#DF5CF2]" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-white tabular-nums">$135</p>
                  <p className="text-[11px] text-white/70">Primera fila + Networking</p>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
                <span className="text-xs font-medium text-white/90">Cantidad de entradas</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                    aria-label="Reducir cantidad"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold tabular-nums w-5 text-center">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Nombre completo*"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-[#12D89E]"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-[#12D89E]"
                />
              </div>

              {error && <p className="text-xs text-[#ff7b9c]">{error}</p>}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full btn-marca-gradient text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
              >
                Confirmar Reserva · ${total} USD
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClick: () => void;
}

export const VideoPreviewModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onBookClick }) => {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa del evento Marca Efecto"
    >
      <div
        className="relative w-full max-w-[720px] rounded-[24px] p-[2px] speaker-border-gradient shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[22px] bg-[#140a1b] overflow-hidden">
          <div className="relative aspect-video bg-[#1e1033] overflow-hidden">
            <img
              src="/assets/extracted/objectives-stage.webp"
              alt="Escenario en vivo Marca Efecto"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-105 animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a1b] via-[#140a1b]/45 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#12D89E]">
                Marca Efecto 2024 · Lawrence, USA
              </p>
              <h3 className="mt-1 text-xl sm:text-3xl font-bold uppercase text-white">
                El Poder De Tu Marca Personal
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
                Una experiencia en vivo de aprendizaje, música, etiqueta, oratoria y proyección estratégica junto a nuestros conferencistas internacionales.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookClick();
                  }}
                  className="px-7 py-2.5 rounded-full btn-marca-gradient text-xs font-semibold uppercase tracking-wider text-white cursor-pointer"
                >
                  Buy Tickets
                </button>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{muted ? 'Sonido silenciado' : 'Ambiente activo'}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
