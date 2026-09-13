import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle, HeartHandshake } from "lucide-react";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
}

export function ScheduleModal({
  open,
  onOpenChange,
  serviceName = "Apoio e Acolhimento",
}: ScheduleModalProps) {
  const [selectedService, setSelectedService] = useState(serviceName);
  const [name, setName] = useState("");
  const [preferredShift, setPreferredShift] = useState("Qualquer horário");

  const servicesList = [
    "Apoio Emocional e Escuta",
    "Saúde e Bem-Estar",
    "Cursos Livres",
    "Cursos Profissionalizantes",
    "Orientação Jurídica",
    "Projetos Sociais e Família",
    "Grupos de Apoio",
    "Esporte e Lazer",
  ];

  const handleStartWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const greetings = name.trim() ? `Olá! Meu nome é ${name.trim()}.` : "Olá!";
    const message = `${greetings} Gostaria de agendar um atendimento ou tirar dúvidas sobre: *${selectedService}*. Preferência de período: ${preferredShift}.`;
    const url = `https://wa.me/5521971046439?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border border-[#DCEBE6] shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] flex items-center justify-center text-[#187568] mb-1">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-serif-title font-bold text-[#0E485E]">
            Agendar Horário ou Atendimento
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm leading-relaxed">
            Aqui você é acolhido com respeito e sigilo. Preencha rapidamente para iniciarmos a conversa no WhatsApp oficial do Instituto: <strong>(21) 97104-6439</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleStartWhatsApp} className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Seu Nome (como gostaria de ser chamado)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Maria Souza"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Área de Interesse ou Atendimento
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white"
            >
              {servicesList.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Melhor período para contato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Manhã", "Tarde", "Qualquer horário"].map((shift) => (
                <button
                  type="button"
                  key={shift}
                  onClick={() => setPreferredShift(shift)}
                  className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                    preferredShift === shift
                      ? "bg-[#1E8276] text-white border-[#1E8276]"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {shift}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-3 bg-[#E7602C] hover:bg-[#D44E1C] text-white font-semibold rounded-xl shadow-lg shadow-[#E7602C]/25 flex items-center justify-center gap-2 text-base transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Continuar no WhatsApp</span>
            </Button>
            <p className="text-[11px] text-center text-slate-500 mt-2.5 flex items-center justify-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Atendimento gratuito, acolhedor e seguro.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
