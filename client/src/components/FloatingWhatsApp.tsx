import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "5521971046439",
  defaultMessage = "Olá! Gostaria de saber mais sobre o Instituto Sentindo a Dor do Próximo e agendar um acolhimento.",
}: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <aside aria-label="Atendimento rápido pelo WhatsApp" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Balão de acolhimento opcional e discreto */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-medium py-2.5 px-3.5 rounded-2xl shadow-xl border border-[#DCEBE6] animate-in fade-in slide-in-from-right-3 duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Precisa de ajuda? Fale conosco.</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fechar aviso"
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 rounded-full hover:bg-slate-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botão de WhatsApp flutuante */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com o Instituto Sentindo a Dor do Próximo"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-7 h-7 transition-transform group-hover:scale-110" />
        <span className="sr-only">Abrir conversa no WhatsApp</span>
      </a>
    </aside>
  );
}
