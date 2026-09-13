import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onScheduleClick: () => void;
}

export function Navbar({ onScheduleClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Projetos", href: "#projetos" },
    { name: "Agenda", href: "#agenda" },
    { name: "Voluntariado", href: "#voluntariado" },
    { name: "Contato", href: "#contato" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E0ECE8] py-3.5"
          : "bg-white/80 backdrop-blur-xs py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo oficial */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, "#inicio")}
          className="focus:outline-none focus:ring-2 focus:ring-[#1E8276] rounded-lg"
        >
          <Logo size="md" />
        </a>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[14px] font-medium text-slate-700 hover:text-[#0E485E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1E8276] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Ações Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={onScheduleClick}
            className="bg-[#E7602C] hover:bg-[#D44E1C] text-white font-semibold shadow-md shadow-[#E7602C]/20 px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Horário</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Button>
        </div>

        {/* Botão Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
            className="text-slate-800 p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Menu Mobile Retrátil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-[#E0ECE8] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-slate-700 hover:text-[#0E485E] py-2 border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScheduleClick();
                }}
                className="w-full bg-[#E7602C] hover:bg-[#D44E1C] text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Agendar Horário (WhatsApp)</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
