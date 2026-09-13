import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, MessageCircle, Users, X } from "lucide-react";

export interface AgendaEvent {
  category: string;
  type: string;
  title: string;
  description: string;
  status: string;
  availability: string;
  isCampaign?: boolean;
  countdown?: string;
  image?: string;
  address?: string;
  mapUrl?: string;
  icon: React.ElementType;
  accent: string;
}

interface EventDetailsModalProps {
  event: AgendaEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsModal({ event, open, onOpenChange }: EventDetailsModalProps) {
  if (!event) return null;

  const confirmPresence = () => {
    const message = `Olá! Quero confirmar minha presença no evento *${event.title}*. Poderiam me enviar mais informações?`;
    window.open(`https://wa.me/5521971046439?text=${encodeURIComponent(message)}`, "_blank");
    onOpenChange(false);
  };

  const EventIcon = event.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[470px] rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Fechar detalhes do evento"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#DCEBE6] bg-white text-slate-500 shadow-sm transition-colors hover:bg-[#EAF5F2] hover:text-[#0E485E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7602C]"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="text-left space-y-3">
          {event.image && (
            <img
              src={event.image}
              alt={`Convite do evento ${event.title}`}
              className="w-full max-h-52 object-cover rounded-2xl border border-[#F1D66B]"
            />
          )}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${event.accent}`}>
            <EventIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#187568] bg-[#EAF5F2] border border-[#D2EAE1] rounded-full px-2.5 py-1">
              {event.type}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold font-serif-title text-[#0E3A4B]">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-slate-600">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-[#F5FAF8] border border-[#DCEBE6] px-4 py-3 text-sm text-[#0E485E]">
            <Calendar className="w-5 h-5 text-[#E7602C] shrink-0" />
            <span className="font-semibold">{event.status}</span>
          </div>
          {event.address && event.mapUrl && (
            <div className="overflow-hidden rounded-2xl border border-[#DCEBE6] bg-white">
              <iframe
                title={`Mapa para ${event.title}`}
                src={event.mapUrl}
                loading="lazy"
                className="h-44 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold leading-relaxed text-[#0E485E]">{event.address}</p>
                <a
                  href="https://maps.app.goo.gl/Ddm2gs9dXUs21zJYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-bold text-[#187568] hover:text-[#E7602C] transition-colors"
                >
                  Abrir rota
                </a>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-2xl bg-[#FDF8F5] border border-[#F2DED4] px-4 py-3 text-xs text-slate-600">
            <Users className="w-4 h-4 text-[#E7602C] shrink-0" />
            <span>Confirme sua presença para receber orientações sobre local e participação.</span>
          </div>
          <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${event.isCampaign ? "bg-[#FFF9D9] border-[#F1D66B] text-[#7A5A00]" : "bg-[#FFF6F0] border-[#F2D2C2] text-[#B34A24]"}`}>
            <Users className="w-5 h-5 shrink-0" />
            <span>{event.availability}</span>
          </div>
          {event.countdown && (
            <div className="rounded-2xl bg-[#FFF3A8] border border-[#E4C23A] px-4 py-3 text-center text-sm font-bold text-[#7A5A00]">
              {event.countdown}
            </div>
          )}
          <Button
            type="button"
            onClick={confirmPresence}
            className="w-full rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-md shadow-[#25D366]/20 hover:bg-[#20bd5a] flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Confirmar presença pelo WhatsApp</span>
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#187568]" />
            Atendimento oficial: (21) 97104-6439
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
