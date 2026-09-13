import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

/** Logo oficial do Instituto, preservada como imagem original local. */
export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-12 w-auto max-w-[180px]",
    md: "h-14 w-auto max-w-[220px]",
    lg: "h-20 w-auto max-w-[280px]",
  };

  return (
    <img
      src="/images/logo-instituto-oficial.png"
      alt="Logo oficial do Instituto Sentindo a Dor do Próximo"
      className={`object-contain object-center ${sizes[size]} ${className}`}
    />
  );
}
