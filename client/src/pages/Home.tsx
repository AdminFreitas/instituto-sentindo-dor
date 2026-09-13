import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScheduleModal } from "@/components/ScheduleModal";
import { EventDetailsModal, type AgendaEvent } from "@/components/EventDetailsModal";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Heart,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  GraduationCap,
  Scale,
  Activity,
  Smile,
  ArrowRight,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  ExternalLink,
  Calendar,
  Send,
  Compass,
  CheckCircle2,
  BookOpen,
  Briefcase,
  SmilePlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>("Acolhimento e Apoio");
  const [agendaFilter, setAgendaFilter] = useState("Todos");
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlightPaused, setHighlightPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Estado do formulário de contato preparado
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleOpenSchedule = (serviceName?: string) => {
    setSelectedServiceForModal(serviceName || "Acolhimento e Apoio");
    setModalOpen(true);
  };

  const handleDirectWhatsApp = (customText?: string) => {
    const text = customText || "Olá! Gostaria de conversar e agendar um atendimento no Instituto Sentindo a Dor do Próximo.";
    window.open(`https://wa.me/5521971046439?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      toast.error("Por favor, preencha pelo menos seu nome e telefone para contato.");
      return;
    }

    // Como informado no briefing: deixar preparado visualmente com direcionamento elegante ao WhatsApp
    const message = `*Nova mensagem pelo formulário do site:*\n\n` +
      `*Nome:* ${formName}\n` +
      `*Telefone:* ${formPhone}\n` +
      `*E-mail:* ${formEmail || "Não informado"}\n` +
      `*Assunto:* ${formSubject || "Geral"}\n` +
      `*Mensagem:* ${formMessage || "Olá! Gostaria de tirar dúvidas com o Instituto."}`;

    window.open(`https://wa.me/5521971046439?text=${encodeURIComponent(message)}`, "_blank");
    toast.success("Mensagem preparada! Abrindo o WhatsApp oficial para envio seguro.");
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormSubject("");
    setFormMessage("");
  };

  const services = [
    {
      id: "apoio-emocional",
      title: "Apoio Emocional",
      icon: Heart,
      quote: "Você não precisa enfrentar tudo sozinho. Estamos aqui para ouvir e acolher.",
      description:
        "Espaço de acolhimento e escuta qualificada para momentos de depressão, ansiedade, sobrecarga e dor emocional.",
      tag: "Cuidado Essencial",
      bgGradient: "from-[#F2FAF7] to-white",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#187568]",
    },
    {
      id: "saude-bem-estar",
      title: "Saúde e Bem-Estar",
      icon: Activity,
      quote: "Cuidar da saúde é o primeiro passo para reconstruir sua força.",
      description:
        "Consultas, orientações especializadas, ações de prevenção e atendimentos que devolvem o bem-estar físico e mental.",
      tag: "Prevenção & Saúde",
      bgGradient: "from-white to-[#F2FAF7]",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#1E8276]",
    },
    {
      id: "cursos-livres",
      title: "Cursos Livres",
      icon: BookOpen,
      quote: "Novos saberes abrem caminhos e despertam potenciais adormecidos.",
      description:
        "Oficinas, palestras e atividades práticas para enriquecimento pessoal, autoconfiança e aprendizado contínuo.",
      tag: "Desenvolvimento",
      bgGradient: "from-[#FDFBF7] to-white",
      borderColor: "border-[#EFE5D5]",
      accentColor: "text-[#0E485E]",
    },
    {
      id: "cursos-profissionalizantes",
      title: "Cursos Profissionalizantes",
      icon: GraduationCap,
      quote: "Aprender uma profissão também é transformar uma vida.",
      description:
        "Capacitação para mulheres e homens que desejam autonomia financeira, geração de renda e novos horizontes.",
      tag: "Autonomia & Renda",
      bgGradient: "from-[#F7FAF9] to-white",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#E7602C]",
    },
    {
      id: "apoio-juridico",
      title: "Orientação e Apoio Jurídico",
      icon: Scale,
      quote: "Conhecer seus direitos é recuperar a sua dignidade e voz.",
      description:
        "Auxílio informativo para esclarecimento de dúvidas e orientações fundamentais sobre direitos da família e cidadania.",
      tag: "Cidadania",
      bgGradient: "from-white to-[#F0F6F5]",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#0E485E]",
    },
    {
      id: "projetos-sociais",
      title: "Projetos Sociais",
      icon: Users,
      quote: "Acolher a comunidade é fortalecer os laços que sustentam famílias.",
      description:
        "Ações dedicadas para crianças, mães solo, homens em recomeço e famílias em situação de vulnerabilidade.",
      tag: "Apoio Comunitário",
      bgGradient: "from-[#FBF8F5] to-white",
      borderColor: "border-[#EFE5D5]",
      accentColor: "text-[#187568]",
    },
    {
      id: "grupos-apoio",
      title: "Reuniões e Grupos de Apoio",
      icon: HeartHandshake,
      quote: "Ouvir outra história nos ensina que a cura também acontece em conjunto.",
      description:
        "Círculos de conversa seguros onde histórias são compartilhadas sem julgamentos, gerando amizade e força mútua.",
      tag: "Encontro & Escuta",
      bgGradient: "from-white to-[#F2FAF7]",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#1E8276]",
    },
    {
      id: "esporte-lazer",
      title: "Esporte e Lazer",
      icon: SmilePlus,
      quote: "Viver bem inclui o sorriso, a convivência e o corpo em movimento.",
      description:
        "Iniciativas esportivas, caminhadas, gincanas e dinâmicas que incentivam a alegria, a amizade e a saúde integrativa.",
      tag: "Convivência",
      bgGradient: "from-[#F7FAF9] to-white",
      borderColor: "border-[#D6ECE5]",
      accentColor: "text-[#0E485E]",
    },
  ];

  const projects = [
    {
      id: "acolher",
      name: "Projeto Acolher",
      tagline: "Escuta humanizada e alívio emocional",
      description:
        "Núcleo de recepção prioritária para quem chega fragilizado emocionalmente ou sem saber a quem recorrer.",
      items: [
        "Escuta individual e sigilosa",
        "Acolhimento de mulheres em crise emocional",
        "Encaminhamento para grupos de fortalecimento",
      ],
      badge: "Núcleo de Cuidado",
      accent: "border-[#1E8276]",
    },
    {
      id: "novos-caminhos",
      name: "Projeto Novos Caminhos",
      tagline: "Capacitação profissional e futuro",
      description:
        "Trilhas formativas focadas no mercado de trabalho e pequenos negócios, para mulheres e homens da região.",
      items: [
        "Workshops profissionalizantes práticos",
        "Orientação para empreendedorismo e renda",
        "Estímulo à independência financeira",
      ],
      badge: "Oportunidade",
      accent: "border-[#E7602C]",
    },
    {
      id: "mulheres-fortes",
      name: "Projeto Mulheres Fortes",
      tagline: "Empoderamento, apoio mútuo e dignidade",
      description:
        "Iniciativa especial focada em fortalecer mulheres através de grupos de vivência, autoestima e desenvolvimento.",
      items: [
        "Encontros temáticos semanais",
        "Suporte em vulnerabilidades familiares",
        "Rede solidária de cuidado entre mulheres",
      ],
      badge: "Prioritário",
      accent: "border-[#187568]",
    },
    {
      id: "comunidade-movimento",
      name: "Projeto Comunidade em Movimento",
      tagline: "Ações sociais, cultura, esporte e lazer",
      description:
        "Mobilizações de bairro, eventos integrativos, campeonatos e ações de solidariedade para todas as idades.",
      items: [
        "Ações comunitárias itinerantes",
        "Atividades esportivas e recreativas",
        "Convivência familiar e integração comunitária",
      ],
      badge: "Integração",
      accent: "border-[#0E485E]",
    },
  ];

  const septemberEventDate = new Date(2026, 8, 25, 17, 0, 0);
  const daysUntilSeptemberEvent = Math.max(
    0,
    Math.ceil((septemberEventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  const septemberCountdown = daysUntilSeptemberEvent > 0
    ? `Faltam ${daysUntilSeptemberEvent} dias`
    : "Evento acontecendo hoje";

  const highlights = [
    {
      kind: "event",
      title: "Setembro Amarelo",
      eyebrow: "Destaque da Agenda",
      image: "/images/setembro-amarelo-convite.jpeg",
      description: "25 de setembro, às 17h · Palestras sobre saúde bucal e diabetes · Entrada solidária: 1kg de alimento.",
      countdown: septemberCountdown,
    },
    {
      kind: "notice",
      title: "O Instituto está começando essa caminhada",
      eyebrow: "Aviso importante",
      image: "/images/logo-instituto-oficial.png",
      description: "Conheça nossas iniciativas, participe das próximas atividades e faça parte desta história desde o início.",
      countdown: "Acolhimento, apoio e oportunidades",
    },
  ];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
    sections.forEach((section) => section.classList.add("reveal-section"));

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (highlightPaused) return;
    const timer = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % highlights.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [highlightPaused, highlights.length]);

  const upcomingEvents: AgendaEvent[] = [
    {
      category: "Cursos",
      type: "Curso",
      title: "Cursos profissionalizantes",
      description: "Novas turmas de capacitação para quem deseja aprender uma profissão e abrir novos caminhos.",
      status: "Em breve — data a confirmar",
      availability: "Vagas limitadas",
      icon: GraduationCap,
      accent: "bg-[#EAF5F2] text-[#187568]",
    },
    {
      category: "Grupos de Apoio",
      type: "Grupo de Apoio",
      title: "Grupo de apoio e escuta",
      description: "Um encontro seguro para conversar, compartilhar experiências e fortalecer a comunidade.",
      status: "Em breve — data a confirmar",
      availability: "Vagas limitadas",
      icon: HeartHandshake,
      accent: "bg-[#FFF1EB] text-[#E7602C]",
    },
    {
      category: "Eventos",
      type: "Evento",
      title: "Setembro Amarelo",
      description: "Palestras sobre prevenção do suicídio, diabetes e saúde bucal, com entrada solidária de 1kg de alimento não perecível.",
      status: "25 de setembro, às 17h",
      availability: "Vagas limitadas",
      isCampaign: true,
      countdown: septemberCountdown,
      image: "/images/setembro-amarelo-convite.jpeg",
      address: "Rua Alves de Castro, 1221 — Araçatiba, Maricá/RJ",
      mapUrl: "https://www.google.com/maps?q=-22.9244676,-42.8277222&z=17&output=embed",
      icon: Users,
      accent: "bg-[#EEF2F8] text-[#0E485E]",
    },
    {
      category: "Eventos",
      type: "Evento",
      title: "Comunidade em movimento",
      description: "Atividades sociais, esporte, lazer e convivência para aproximar famílias e vizinhos.",
      status: "Em breve — data a confirmar",
      availability: "Vagas limitadas",
      icon: Users,
      accent: "bg-[#EEF2F8] text-[#0E485E]",
    },
  ];
  const visibleEvents = agendaFilter === "Todos"
    ? upcomingEvents
    : upcomingEvents.filter((event) => event.category === agendaFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFEFE] text-slate-800 selection:bg-[#1E8276]/20 selection:text-[#0E485E]">
      {/* Barra de Navegação Superior Fixa */}
      <Navbar onScheduleClick={() => handleOpenSchedule()} />

      {/* Destaques prioritários em carrossel extensível */}
      <section className="order-20 relative z-10 pt-4 pb-4 md:pt-5 md:pb-5 bg-[#FFFDF0] border-b border-[#F1D66B]">
        <div className="container">
          <div
            className="relative overflow-hidden rounded-3xl border border-[#E4C23A] bg-gradient-to-r from-[#FFF8C9] via-white to-[#FFF3A8] shadow-sm touch-pan-y"
            onMouseEnter={() => setHighlightPaused(true)}
            onMouseLeave={() => setHighlightPaused(false)}
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; setHighlightPaused(true); }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              if (startX !== null && endX !== undefined && Math.abs(endX - startX) > 45) {
                setHighlightIndex((current) => endX < startX ? (current + 1) % highlights.length : (current - 1 + highlights.length) % highlights.length);
              }
              touchStartX.current = null;
              setHighlightPaused(false);
            }}
          >
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border-[24px] border-[#F1D66B]/30 pointer-events-none" />
            {highlights.map((highlight, index) => index === highlightIndex && (
              <div key={`${highlight.title}-${index}`} className="relative z-10 flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between animate-in fade-in duration-300">
                <div className="flex min-w-0 items-center gap-4 text-left">
                  <img src={highlight.image} alt={highlight.title} className="h-20 w-16 shrink-0 rounded-xl border border-[#E4C23A] object-cover object-top shadow-sm sm:h-24 sm:w-20" />
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F5D83F] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6B5100]"><Sparkles className="h-3 w-3" />{highlight.eyebrow}</span>
                      <span className="text-[11px] font-semibold text-[#8A6800]">{highlight.countdown}</span>
                    </div>
                    <h2 className="truncate text-lg font-bold font-serif-title text-[#0E3A4B] sm:text-xl">{highlight.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{highlight.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button type="button" onClick={() => document.getElementById(highlight.kind === "event" ? "agenda" : "inicio")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-[#0E485E] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#092B38]">Ver detalhes</Button>
                  <Button type="button" onClick={() => handleDirectWhatsApp(highlight.kind === "event" ? "Olá! Quero confirmar minha presença no evento Setembro Amarelo, dia 25 de setembro às 17h." : "Olá! Gostaria de conhecer as iniciativas do Instituto.")} className="rounded-full bg-[#E7602C] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#D44E1C]">{highlight.kind === "event" ? "Confirmar presença" : "Falar com a equipe"}</Button>
                </div>
              </div>
            ))}
            <div className="relative z-20 flex items-center justify-center gap-2 pb-3">
              <button type="button" aria-label="Destaque anterior" onClick={() => setHighlightIndex((highlightIndex - 1 + highlights.length) % highlights.length)} className="rounded-full p-1 text-[#0E485E] hover:bg-white/70"><ChevronLeft className="h-4 w-4" /></button>
              {highlights.map((highlight, index) => (
                <button
                  key={highlight.title}
                  type="button"
                  aria-label={`Mostrar ${highlight.title}`}
                  aria-current={index === highlightIndex}
                  onClick={() => setHighlightIndex(index)}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all focus-visible:outline-none ${index === highlightIndex ? "w-10 bg-[#D4B52A]" : "w-1.5 bg-[#D4B52A]"}`}
                >
                  {index === highlightIndex && (
                    <span
                      aria-hidden="true"
                      className="carousel-progress absolute inset-y-0 left-0 rounded-full bg-[#E7602C]"
                      style={{ animationPlayState: highlightPaused ? "paused" : "running" }}
                    />
                  )}
                </button>
              ))}
              <button type="button" aria-label="Próximo destaque" onClick={() => setHighlightIndex((highlightIndex + 1) % highlights.length)} className="rounded-full p-1 text-[#0E485E] hover:bg-white/70"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 1: HERO / INÍCIO
      ========================================================================= */}
      <section
        id="inicio"
        className="order-10 relative pt-12 pb-14 md:pt-16 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F2F8F6] via-white to-white"
      >
        {/* Elementos decorativos orgânicos de fundo */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#D7EFE7]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFF2EC]/50 to-transparent rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Coluna de Texto Principal */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold tracking-wide border border-[#CFE8E0] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E7602C]" />
                <span>Instituto Sentindo a Dor do Próximo</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-title tracking-tight text-[#0E3A4B] leading-[1.15]">
                Você não está <span className="italic font-normal text-[#187568]">sozinho.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                O <strong>Instituto Sentindo a Dor do Próximo</strong> nasceu para acolher, apoiar e transformar vidas.
                Acreditamos que toda pessoa merece ser ouvida, respeitada e ter a oportunidade de recomeçar.
                Oferecemos apoio social, emocional, profissional e comunitário para pessoas que estão enfrentando
                dificuldades. Aqui, cada história importa.
              </p>

              {/* Botões de Ação */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  onClick={() => handleOpenSchedule()}
                  className="bg-[#E7602C] hover:bg-[#D44E1C] text-white font-semibold px-7 py-3.5 text-base rounded-full shadow-lg shadow-[#E7602C]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Agendar Atendimento</span>
                </Button>

                <a
                  href="#sobre"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-slate-300 hover:border-[#1E8276] text-slate-700 hover:text-[#0E485E] font-medium text-sm transition-colors duration-200 bg-white/80 hover:bg-[#F2FAF7]"
                >
                  <span>Conheça o Instituto</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#187568]" />
                </a>
              </div>

              {/* Micro avaliações / garantia de acolhimento */}
              <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8276] shrink-0" />
                  <span>Atendimento sigiloso</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8276] shrink-0" />
                  <span>Apoio comunitário gratuito</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E7602C]" />
                  <span>Mulheres e famílias</span>
                </div>
              </div>
            </div>

            {/* Coluna Visual: Imagens Humanas e Acolhedoras */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[440px] lg:max-w-none">
                {/* Imagem Principal */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4">
                  <img
                    src="/images/hero-community.jpg"
                    alt="Pessoas em círculo de conversa e acolhimento mútuo no Instituto"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3A4B]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                      Comunidade & Apoio Emocional
                    </p>
                    <p className="text-sm font-serif-title font-medium">
                      "Aqui cada olhar encontra escuta e acolhimento sincero."
                    </p>
                  </div>
                </div>

                {/* Indicador de WhatsApp direto */}
                <div className="absolute -top-5 -right-4 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-2xl shadow-lg border border-[#DCEBE6] hidden sm:flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700">
                    WhatsApp: <strong>(21) 97104-6439</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: INÍCIO DA JORNADA — SEM NÚMEROS FICTÍCIOS
      ========================================================================= */}
      <section className="order-55 py-9 md:py-11 bg-[#F6FAF8] border-y border-[#E2EEEA]">
        <div className="container">
          <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#DCEBE6] shadow-xs px-6 py-8 md:px-10 md:py-9 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF5F2] text-[#187568] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#0E3A4B]">
                  Estamos começando essa caminhada
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#187568] bg-[#EAF5F2] border border-[#D2EAE1] rounded-full px-2.5 py-1">
                  Desde 5 de setembro de 2026
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                O Instituto Sentindo a Dor do Próximo acaba de nascer, mas já carrega um propósito grande: acolher,
                apoiar e transformar vidas. Estamos dando os primeiros passos e convidamos você a fazer parte dessa
                história desde o início — como voluntário, apoiador ou simplesmente conhecendo o nosso trabalho.
              </p>
              <p className="text-sm font-semibold italic text-[#187568] mt-3">
                Cada pessoa acolhida a partir de hoje se torna parte da nossa história.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SOBRE O INSTITUTO
      ========================================================================= */}
      <section id="sobre" className="order-95 py-14 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Foto secundária humanizada */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
                  <img
                    src="/images/group-women.jpg"
                    alt="Roda de acolhimento e escuta entre mulheres no Instituto"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Elemento de citação de impacto */}
                <div className="mt-4 p-5 rounded-2xl bg-[#EAF5F2] border border-[#D0EAE2] text-left">
                  <p className="text-xs uppercase font-bold text-[#187568] tracking-widest mb-1">
                    Nosso Compromisso
                  </p>
                  <p className="text-sm font-medium text-[#0E485E] italic">
                    "Muitas pessoas precisam apenas de uma oportunidade, uma orientação ou alguém disposto a ouvir."
                  </p>
                </div>
              </div>
            </div>

            {/* Texto Sobre */}
            <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#E7602C]" />
                <span>Nossa Essência</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
                Sobre o Instituto
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                O <strong>Instituto Sentindo a Dor do Próximo</strong> é uma iniciativa dedicada a ajudar pessoas que
                estão passando por momentos difíceis. Nosso propósito é acolher pessoas, oferecer oportunidades e
                contribuir para uma sociedade mais humana e solidária.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Acreditamos que muitas pessoas precisam apenas de uma oportunidade, uma orientação ou alguém disposto a
                ouvir. Por isso desenvolvemos ações de bem-estar emocional, capacitação profissional, saúde, orientação,
                inclusão social, esporte, lazer e apoio à comunidade — sempre com respeito, responsabilidade e
                compromisso.
              </p>

              {/* Botão de contato rápido */}
              <div className="pt-2">
                <Button
                  onClick={() => handleOpenSchedule("Informações sobre o Instituto")}
                  variant="outline"
                  className="rounded-full border-[#1E8276] text-[#0E485E] hover:bg-[#EAF5F2] font-semibold text-sm px-6 py-2.5"
                >
                  Falar com nossa equipe
                </Button>
              </div>
            </div>
          </div>

          {/* Cards de Missão, Visão e Valores */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card Missão */}
            <div className="p-7 rounded-3xl bg-[#F7FCFA] border border-[#D6ECE5] hover:border-[#1E8276]/40 transition-all hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs text-[#187568] flex items-center justify-center mb-5 border border-[#D6ECE5]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif-title text-[#0E3A4B] mb-2">Missão</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Acolher, apoiar e transformar vidas através de ações sociais, apoio emocional, orientação e
                oportunidades para a comunidade.
              </p>
            </div>

            {/* Card Visão */}
            <div className="p-7 rounded-3xl bg-[#FBFDFB] border border-[#D6ECE5] hover:border-[#1E8276]/40 transition-all hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs text-[#0E485E] flex items-center justify-center mb-5 border border-[#D6ECE5]">
                <Sparkles className="w-6 h-6 text-[#E7602C]" />
              </div>
              <h3 className="text-xl font-bold font-serif-title text-[#0E3A4B] mb-2">Visão</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Construir uma comunidade mais humana, solidária e consciente, onde as pessoas tenham oportunidades para
                reconstruir suas histórias.
              </p>
            </div>

            {/* Card Valores */}
            <div className="p-7 rounded-3xl bg-[#F7FCFA] border border-[#D6ECE5] hover:border-[#1E8276]/40 transition-all hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs text-[#1E8276] flex items-center justify-center mb-5 border border-[#D6ECE5]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif-title text-[#0E3A4B] mb-2">Valores</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Respeito",
                  "Solidariedade",
                  "Empatia",
                  "Inclusão",
                  "Responsabilidade",
                  "Transparência",
                  "Compromisso social",
                  "Amor ao próximo",
                ].map((val) => (
                  <span
                    key={val}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#D2EAE1] text-slate-700"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: QUEM IDEALIZOU ESSE SONHO
      ========================================================================= */}
      <section className="order-55 py-14 md:py-20 bg-[#F8FCFA] border-y border-[#E2EEEA]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Foto oficial da idealizadora */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-3 rounded-[2rem] border border-[#CFE8E0] rotate-2 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0E3A4B] shadow-xl border-4 border-white">
                <img
                  src="/images/patricia-bitencourt.webp"
                  alt="Dra. Patrícia Bitencourt, Patrícia da Saúde, com seu esposo"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E3A4B]/90 via-[#0E3A4B]/30 to-transparent px-6 pb-5 pt-16 text-white">
                  <p className="text-xs uppercase tracking-widest font-semibold text-emerald-200">
                    Idealizadora e administradora
                  </p>
                  <p className="text-lg font-serif-title font-semibold mt-1">
                    Dra. Patrícia Bitencourt
                  </p>
                </div>
              </div>
            </div>

            {/* História e apresentação */}
            <div className="lg:col-span-7 text-left space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-[#E7602C] fill-[#E7602C]" />
                <span>Quem idealizou esse sonho</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
                Um sonho que se tornou realidade
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  O Instituto Sentindo a Dor do Próximo nasceu do sonho da vereadora <strong>Patrícia Bitencourt</strong>,
                  também conhecida como <strong>Patrícia da Saúde</strong>.
                </p>
                <p>
                  Médica, vereadora e apaixonada por transformar vidas, Patrícia carregava há muito tempo o desejo de
                  criar um espaço de acolhimento para quem mais precisa. Depois de anos de dedicação, esse sonho
                  finalmente se tornou realidade — e hoje se transforma em oportunidade para ajudar e mudar a vida de
                  muitas pessoas.
                </p>
                <p>
                  Como idealizadora e administradora do Instituto, Patrícia acompanha de perto cada ação, cada projeto e
                  cada pessoa acolhida, com o compromisso de que ninguém precise enfrentar seus momentos difíceis
                  sozinho.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <p className="font-serif-title font-semibold text-[#0E3A4B] text-lg">
                    Dra. Patrícia Bitencourt
                  </p>
                  <p className="text-xs text-[#187568] font-semibold">
                    Patrícia da Saúde — Vereadora, médica e idealizadora do Instituto
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/vereadorapatriciadasaude/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-full border border-[#D2EAE1] bg-white text-[#187568] hover:bg-[#EAF5F2] hover:border-[#1E8276] text-xs font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Acompanhar no Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: SERVIÇOS — COMO PODEMOS AJUDAR?
      ========================================================================= */}
      <section id="servicos" className="order-30 py-14 md:py-20 bg-[#F5FAF8] border-y border-[#DFEEEA]">
        <div className="container text-left">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2EB] text-[#136155] text-xs font-semibold mb-3">
              <Heart className="w-3.5 h-3.5 text-[#E7602C]" />
              <span>Nossos Serviços</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
              Como podemos ajudar?
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              O Instituto oferece diferentes serviços e atividades voltados para o desenvolvimento, bem-estar e
              qualidade de vida da comunidade.
            </p>
          </div>

          {/* Grid com os 8 Serviços Solicitados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  style={{ "--reveal-delay": `${index * 65}ms` } as React.CSSProperties}
                  className={`reveal-card relative p-6 rounded-3xl bg-white border ${item.borderColor} shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${item.id === "apoio-juridico" ? "border-[#E7602C]/60 bg-gradient-to-br from-[#FFF8F3] to-white shadow-md ring-1 ring-[#E7602C]/15" : ""}`}
                >
                  {item.id === "apoio-juridico" && (
                    <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-[#E7602C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      Apoio prioritário
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] flex items-center justify-center text-[#187568] group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif-title text-[#0E3A4B] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.quote && (
                      <p className="text-xs italic text-[#187568] border-l-2 border-[#187568] pl-2.5 py-0.5 bg-[#F2FAF7] rounded-r-md">
                        {item.quote}
                      </p>
                    )}
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (item.id === "apoio-juridico") {
                          document.getElementById("apoio-juridico")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          handleOpenSchedule(item.title);
                        }
                      }}
                      className="text-xs font-semibold text-[#0E485E] hover:text-[#E7602C] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Saber mais</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (item.id === "apoio-juridico") {
                          document.getElementById("apoio-juridico")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          handleOpenSchedule(item.title);
                        }
                      }}
                      aria-label={item.id === "apoio-juridico" ? "Ver detalhes do Apoio Jurídico" : `Agendar ${item.title}`}
                      className="w-7 h-7 rounded-full bg-slate-50 hover:bg-[#E7602C] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-white border border-[#D6ECE5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-base font-bold text-[#0E3A4B]">Precisa de atendimento em outra área?</h4>
              <p className="text-xs text-slate-500">
                Converse com nossa equipe e nós orientamos você sobre o melhor caminho.
              </p>
            </div>
            <Button
              onClick={() => handleDirectWhatsApp("Olá! Gostaria de consultar se o Instituto oferece apoio para minha situação específica.")}
              className="bg-[#187568] hover:bg-[#11554b] text-white font-semibold rounded-full px-6 text-xs h-10"
            >
              Falar pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: APOIO JURÍDICO — COMO FUNCIONA
      ========================================================================= */}
      <section id="apoio-juridico" className="order-40 py-14 md:py-20 bg-[#FFF9F4] border-y border-[#F1DED2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE9DE] text-[#A84220] text-xs font-semibold mb-3">
                <Scale className="w-3.5 h-3.5" />
                <span>Cidadania e direitos</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
                Apoio Jurídico
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mt-4">
                Um espaço de orientação inicial para ajudar você a compreender seus direitos e identificar os próximos
                caminhos com mais segurança e clareza.
              </p>
              <div className="mt-6 rounded-3xl bg-white border border-[#F0D6C8] p-5 shadow-xs">
                <p className="text-[11px] uppercase tracking-widest font-bold text-[#A84220]">Responsável pelo atendimento</p>
                <p className="text-xl font-bold font-serif-title text-[#0E3A4B] mt-1">Dr. Marcos Ferreira</p>
                <p className="text-sm text-slate-600 mt-1">Orientação jurídica com acolhimento e respeito.</p>
                <a
                  href="https://wa.me/5521986965141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#187568] hover:text-[#E7602C] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar com o Dr. Marcos: (21) 98696-5141</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/Ddm2gs9dXUs21zJYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600 hover:text-[#187568] transition-colors"
                >
                  <Compass className="w-4 h-4 shrink-0 text-[#E7602C]" />
                  <span>Atendimento no Instituto: Rua Alves de Castro, 1221 — Araçatiba, Maricá/RJ</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-3xl bg-white border border-[#F0D6C8] p-6 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE9DE] text-[#A84220] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0E3A4B] mb-2">Como funciona</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Você entra em contato, explica brevemente sua dúvida e recebe orientação sobre os próximos passos ou
                  possíveis encaminhamentos.
                </p>
              </div>
              <div className="rounded-3xl bg-white border border-[#F0D6C8] p-6 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE9DE] text-[#A84220] flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0E3A4B] mb-2">Horários disponíveis</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  De segunda a sexta-feira, das 9h às 17h. Recomendamos o contato prévio para organizar o atendimento
                  e confirmar a melhor orientação para cada caso.
                </p>
              </div>
              <div className="sm:col-span-2 rounded-3xl bg-[#0E485E] p-6 text-white shadow-lg">
                <h3 className="font-bold mb-2">Quem pode participar?</h3>
                <p className="text-sm text-emerald-50/90 leading-relaxed">
                  Moradores da comunidade, famílias, mulheres, homens e qualquer pessoa que precise de uma orientação
                  inicial sobre direitos, família, cidadania ou acesso a serviços. O atendimento é informativo e não
                  substitui a atuação de um advogado em processos ou casos que exijam representação formal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: ESPECIAL — APOIO E ACOLHIMENTO (GRANDE DESTAQUE)
      ========================================================================= */}
      <section className="order-50 py-14 md:py-20 relative overflow-hidden bg-gradient-to-r from-[#0E485E] via-[#125A6E] to-[#187568] text-white">
        {/* Texturas e formas de luz suaves */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/20">
              <Heart className="w-3.5 h-3.5 fill-[#E7602C] text-[#E7602C]" />
              <span>Espaço Seguro de Acolhimento</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif-title tracking-tight leading-tight">
              Você não precisa passar por isso sozinho.
            </h2>

            <p className="text-base sm:text-lg text-slate-100 font-light leading-relaxed">
              Todos nós podemos passar por momentos difíceis. Problemas familiares, dificuldades financeiras, solidão,
              tristeza ou outras situações podem tornar a caminhada mais difícil. O{" "}
              <strong className="font-semibold text-white">Instituto Sentindo a Dor do Próximo</strong> acredita na
              importância de ouvir, acolher e caminhar ao lado das pessoas.
            </p>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Se você está passando por um momento difícil, procure orientação e conheça as ações desenvolvidas pelo
              Instituto.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => handleDirectWhatsApp("Olá! Gostaria de conversar com alguém do Instituto para acolhimento e escuta.")}
                className="bg-[#E7602C] hover:bg-[#D44E1C] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Quero conversar</span>
              </Button>
            </div>

            {/* Aviso de responsabilidade e saúde mental */}
            <div className="mt-8 pt-6 border-t border-white/15 max-w-2xl mx-auto text-xs text-emerald-100/75 leading-relaxed">
              <p>
                <strong>Nota de Acolhimento Responsável:</strong> O Instituto oferece escuta solidária, orientação e
                ações de suporte comunitário. Nossos serviços não substituem consultas médicas, diagnósticos ou
                acompanhamentos psicológicos e psiquiátricos profissionais. Caso esteja em sofrimento agudo, disque 188
                (CVV - Centro de Valorização da Vida).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: PROJETOS QUE TRANSFORMAM VIDAS
      ========================================================================= */}
      <section id="projetos" className="order-60 py-14 md:py-20 bg-white">
        <div className="container text-left">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E7602C]" />
              <span>Iniciativas Contínuas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
              Projetos que transformam vidas
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Ações estruturadas para transformar realidades através de escuta, capacitação e convivência comunitária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="reveal-card p-8 rounded-3xl bg-[#F8FCFA] border border-[#D8ECE5] hover:border-[#1E8276]/50 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#187568] px-3 py-1 rounded-full bg-white border border-[#D6ECE5]">
                      {proj.badge}
                    </span>
                    <Heart className="w-4 h-4 text-[#E7602C]" />
                  </div>

                  <h3 className="text-2xl font-bold font-serif-title text-[#0E3A4B] mt-2 mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#187568] mb-3">
                    {proj.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {proj.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#1E8276] shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2EEEA] flex items-center justify-between">
                  <span className="text-xs text-slate-500">Inscrições e participação abertas</span>
                  <Button
                    onClick={() => handleOpenSchedule(proj.name)}
                    variant="outline"
                    className="rounded-full border-[#187568] text-[#0E485E] hover:bg-[#EAF5F2] text-xs font-semibold"
                  >
                    Participar deste projeto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 7: AGENDA DE ATIVIDADES
      ========================================================================= */}
      <section id="agenda" className="order-70 py-14 md:py-20 bg-[#F5FAF8] border-y border-[#DFEEEA]">
        <div className="container text-left">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2EB] text-[#136155] text-xs font-semibold mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#E7602C]" />
                <span>Próximas atividades</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
                Agenda do Instituto
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                Acompanhe os próximos cursos, reuniões e eventos. As datas serão divulgadas assim que cada atividade
                estiver confirmada.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-xl bg-white border border-[#DCEBE6] text-xs text-slate-600 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E7602C]" />
              <span>Programação em construção</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-7" role="tablist" aria-label="Filtrar agenda por categoria">
            {["Todos", "Cursos", "Grupos de Apoio", "Eventos"].map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={agendaFilter === category}
                onClick={() => setAgendaFilter(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E8276]/30 ${
                  agendaFilter === category
                    ? "bg-[#0E485E] text-white shadow-md"
                    : "bg-white text-slate-600 border border-[#D8ECE5] hover:border-[#1E8276] hover:text-[#0E485E] hover:bg-[#EAF5F2]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleEvents.map((event, index) => {
              const EventIcon = event.icon;
              return (
                <article
                  key={event.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedEvent(event);
                    setEventModalOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedEvent(event);
                      setEventModalOpen(true);
                    }
                  }}
                  aria-label={`Ver detalhes de ${event.title}`}
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  className={`reveal-card group cursor-pointer p-6 rounded-3xl bg-white border shadow-xs hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1E8276]/30 transition-all duration-300 ease-out flex flex-col ${
                    event.isCampaign
                      ? "border-[#E4C23A] hover:border-[#C79E00] bg-gradient-to-br from-[#FFFDF0] to-white"
                      : "border-[#D8ECE5] hover:border-[#1E8276]/50"
                  }`}
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={`Convite do evento ${event.title}`}
                      className="mb-5 h-36 w-full rounded-2xl border border-[#F1D66B] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${event.isCampaign ? "bg-[#FFF3A8] text-[#8A6800]" : event.accent}`}>
                      <EventIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold rounded-full px-2.5 py-1 ${event.isCampaign ? "text-[#7A5A00] bg-[#FFF3A8] border border-[#E4C23A]" : "text-[#187568] bg-[#EAF5F2] border border-[#D2EAE1]"}`}>
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-title text-[#0E3A4B] mb-2 transition-colors duration-200 group-hover:text-[#187568]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {event.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#E8F1EE] flex items-center gap-2 text-xs font-semibold text-[#0E485E]">
                    <Calendar className="w-4 h-4 text-[#E7602C]" />
                    <span>{event.status}</span>
                  </div>
                  <div className={`mt-3 inline-flex self-start items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${event.isCampaign ? "bg-[#FFF3A8] text-[#7A5A00]" : "bg-[#FFF1E9] text-[#B34A24]"}`}>
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.availability}</span>
                  </div>
                  {event.countdown && (
                    <div className="mt-2 inline-flex self-start items-center rounded-full bg-[#FFF9D9] border border-[#E4C23A] px-2.5 py-1 text-[10px] font-bold text-[#7A5A00]">
                      {event.countdown}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          {visibleEvents.length === 0 && (
            <div className="rounded-3xl bg-white border border-[#D8ECE5] p-8 text-center text-sm text-slate-600">
              Nenhuma atividade encontrada nesta categoria no momento.
            </div>
          )}
          <p className="text-xs text-slate-500 mt-6 text-center">
            Quer receber as datas em primeira mão? Fale com a equipe pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 8: PERGUNTAS FREQUENTES
      ========================================================================= */}
      <section id="faq" className="order-100 py-12 md:py-16 bg-[#F8FCFA] border-y border-[#E2EEEA]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-9">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E7602C]" />
              <span>Antes de falar com a equipe</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#0E3A4B]">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Respostas rápidas para você chegar mais tranquilo ao seu primeiro contato.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {[
              {
                question: "Os atendimentos são gratuitos?",
                answer: "As ações e orientações do Instituto são oferecidas de forma gratuita, conforme a disponibilidade de cada iniciativa.",
              },
              {
                question: "Quem pode participar?",
                answer: "Mulheres, homens, famílias e pessoas da comunidade que estejam buscando acolhimento, orientação ou oportunidades.",
              },
              {
                question: "Preciso agendar antes de ir?",
                answer: "Para garantir um atendimento organizado, recomendamos falar primeiro pelo WhatsApp e confirmar as orientações.",
              },
              {
                question: "O Instituto substitui atendimento médico ou psicológico?",
                answer: "Não. Oferecemos escuta e apoio comunitário, mas não substituímos acompanhamento médico, psicológico ou psiquiátrico profissional.",
              },
            ].map((item, index) => (
              <details key={item.question} style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties} className="reveal-card group rounded-2xl bg-white border border-[#DCEBE6] open:border-[#1E8276]/50 shadow-xs transition-colors duration-200">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-[#0E3A4B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E8276]/40 rounded-2xl">
                  <span>{item.question}</span>
                  <span className="text-xl font-light text-[#187568] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-4 text-xs leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 9: VOLUNTARIADO
      ========================================================================= */}
      <section id="voluntariado" className="order-75 scroll-mt-28 py-14 md:py-20 bg-white transition-colors duration-500">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0E485E] via-[#125A6E] to-[#187568] px-7 py-10 md:px-12 md:py-12 text-white shadow-xl">
            <div className="absolute -right-20 -top-28 w-72 h-72 rounded-full border-[32px] border-white/10 pointer-events-none" />
            <div className="absolute -left-24 -bottom-36 w-80 h-80 rounded-full border-[42px] border-white/10 pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-xs font-semibold mb-4">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#F7A47D]" />
                  <span>Faça parte desde o começo</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif-title leading-tight">
                  Seu tempo e seu cuidado também podem transformar uma história.
                </h2>
                <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed mt-4 max-w-2xl">
                  Estamos formando uma rede de pessoas dispostas a contribuir com escuta, conhecimento, habilidades e
                  solidariedade. Se você quer ser voluntário, conte um pouco sobre como gostaria de ajudar.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button
                  onClick={() => handleDirectWhatsApp("Olá! Tenho interesse em ser voluntário(a) no Instituto Sentindo a Dor do Próximo. Gostaria de saber como posso ajudar.")}
                  className="w-full sm:w-auto bg-[#E7602C] hover:bg-[#D44E1C] text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Quero ser voluntário</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 9: CHAMADA DE TRANSFORMAÇÃO (PRÉ-CONTATO)
      ========================================================================= */}
      <section className="order-76 py-12 bg-[#F3F9F7] border-y border-[#D6ECE5]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#0E3A4B]">
              Pequenas ações podem transformar grandes histórias.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Quando uma pessoa é acolhida, uma nova possibilidade pode surgir. Quando uma comunidade se une, vidas
              podem ser transformadas. Conheça o Instituto Sentindo a Dor do Próximo e faça parte dessa caminhada.
            </p>
            <div className="pt-2">
              <a
                href="#contato"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0E485E] hover:bg-[#092B38] text-white font-semibold text-sm shadow-md transition-colors gap-2"
              >
                <span>Entre em Contato</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 8: CONTATO & FORMULÁRIO PREPARADO
      ========================================================================= */}
      <section id="contato" className="order-80 py-14 md:py-20 bg-white">
        <div className="container text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Informações de Contato Oficiais */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3EE] text-[#136155] text-xs font-semibold mb-3">
                  <Phone className="w-3.5 h-3.5 text-[#E7602C]" />
                  <span>Canais Oficiais</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0E3A4B]">
                  Estamos aqui para você
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Entre em contato para tirar dúvidas, agendar atendimentos, participar de projetos ou conhecer nossas
                  iniciativas.
                </p>
              </div>

              {/* Card WhatsApp de Destaque */}
              <div className="p-6 rounded-3xl bg-[#F0F8F5] border border-[#D2EAE1] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">WhatsApp Oficial</p>
                    <p className="text-xl font-bold text-[#0E3A4B]">(21) 97104-6439</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  Atendimento rápido tanto pelo celular quanto pelo computador. Converse diretamente com nossa equipe.
                </p>

                <Button
                  onClick={() => handleDirectWhatsApp()}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl py-3 shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar pelo WhatsApp</span>
                </Button>
              </div>

              {/* Redes Sociais */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Acompanhe nas Redes Sociais
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/sentindoadordoproximo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3.5 rounded-2xl border border-slate-200 hover:border-[#1E8276] hover:bg-[#F2FAF7] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">Instagram</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#187568]" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61594505901730&locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3.5 rounded-2xl border border-slate-200 hover:border-[#1E8276] hover:bg-[#F2FAF7] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">Facebook</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#187568]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato Preparado */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#FAFDFB] border border-[#DCEBE6] shadow-xs">
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-serif-title text-[#0E3A4B]">
                    Envie uma mensagem
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha os campos abaixo. Sua mensagem será direcionada com total segurança e atenção.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="(21) 90000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Assunto
                      </label>
                      <input
                        type="text"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="Ex.: Dúvida sobre cursos, apoio emocional..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Conte um pouco como podemos te ajudar..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E8276] focus:ring-2 focus:ring-[#1E8276]/20 text-sm bg-white resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-[#E7602C] hover:bg-[#D44E1C] text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensagem</span>
                    </Button>
                    <p className="text-[11px] text-slate-500 mt-2">
                      * O envio direciona com total segurança para o WhatsApp oficial do Instituto.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 9: PARCEIROS (DISCRETA E ELEGANTE)
      ========================================================================= */}
      <section className="order-90 py-10 md:py-14 bg-[#EDF7F3] border-y border-[#CFE8DE]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#187568]">
              Apoio Institucional
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-[#0E3A4B] mt-1">
              Parceiros que acreditam nessa transformação
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Empresas que somam forças com tecnologia, inovação e compromisso social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {/* DRD Support */}
            <a
              href="https://www.drdsupport.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white border border-[#BFDCD0] hover:border-[#1E8276] hover:shadow-xl transition-all group block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E485E] text-white flex items-center justify-center font-bold text-xs">DRD</div>
                  <span className="text-base font-bold text-[#0E485E] group-hover:text-[#187568] transition-colors">DRD Support</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#187568]" />
              </div>
              <p className="text-xs font-semibold text-[#187568] mb-1">
                Parceiro Tecnológico e Institucional
              </p>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Tecnologia e soluções que apoiam o crescimento de iniciativas e projetos."
              </p>
            </a>

            {/* DigitalTech */}
            <a
              href="https://www.digitaltech.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white border border-[#BFDCD0] hover:border-[#1E8276] hover:shadow-xl transition-all group block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#E7602C] text-white flex items-center justify-center font-bold text-xs">DT</div>
                  <span className="text-base font-bold text-[#0E485E] group-hover:text-[#187568] transition-colors">DigitalTech</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#187568]" />
              </div>
              <p className="text-xs font-semibold text-[#187568] mb-1">
                Parceiro de Tecnologia e Inovação
              </p>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Tecnologia, inovação e informação contribuindo para novas oportunidades."
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RODAPÉ OFICIAL
      ========================================================================= */}
      <footer className="order-110 bg-[#092B38] text-white pt-12 pb-8 border-t border-[#133F50]">
        <div className="container text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Logo e Missão do Rodapé */}
            <div className="md:col-span-5 space-y-4">
              <Logo size="lg" dark={true} />
              <p className="text-sm text-slate-300 font-light leading-relaxed max-w-sm pt-2">
                Acolhendo pessoas. Transformando histórias. Construindo novos caminhos.
              </p>
              <p className="text-xs text-emerald-300 font-medium">
                "Você não precisa enfrentar tudo sozinho."
              </p>
            </div>

            {/* Menu Rápido */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Menu Rápido
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-white transition-colors">
                    Sobre o Instituto
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-white transition-colors">
                    Nossos Serviços
                  </a>
                </li>
                <li>
                  <a href="#projetos" className="hover:text-white transition-colors">
                    Projetos Sociais
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-white transition-colors">
                    Fale Conosco
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato e Atendimento */}
            <div className="md:col-span-4 space-y-3">
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Atendimento
              </p>
              <p className="text-xs text-slate-300">
                WhatsApp: <strong className="text-white">(21) 97104-6439</strong>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Endereço: <strong className="text-white">Rua Alves de Castro, 1221 — Araçatiba, Maricá/RJ</strong>
              </p>
              <a
                href="https://maps.app.goo.gl/Ddm2gs9dXUs21zJYA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Abrir rota no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-inner">
                <iframe
                  title="Mapa do Instituto Sentindo a Dor do Próximo"
                  src="https://www.google.com/maps?q=-22.9244676,-42.8277222&z=17&output=embed"
                  loading="lazy"
                  className="h-28 w-full border-0 grayscale-[20%] opacity-90 sm:h-32"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/sentindoadordoproximo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram do Instituto"
                  className="w-9 h-9 rounded-full bg-transparent md:bg-white/10 hover:bg-[#E7602C] text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594505901730&locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook do Instituto"
                  className="w-9 h-9 rounded-full bg-transparent md:bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/5521971046439"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp do Instituto"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Instituto Sentindo a Dor do Próximo. Todos os direitos reservados.</p>
            <p className="text-[11px] text-slate-500">
              Desenvolvido com carinho, acolhimento e compromisso com o próximo.
            </p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp fixo */}
      <FloatingWhatsApp phoneNumber="5521971046439" />

      {/* Modal de Agendamento Rápido */}
      <ScheduleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        serviceName={selectedServiceForModal}
      />

      {/* Modal de detalhes e confirmação de presença na Agenda */}
      <EventDetailsModal
        event={selectedEvent}
        open={eventModalOpen}
        onOpenChange={setEventModalOpen}
      />
    </div>
  );
}
