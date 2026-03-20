"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/sobre", label: "Sobre o Projeto" },
  { to: "/para-profissionais", label: "Para Profissionais" },
  { to: "/ldrt", label: "LDRT" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 mb-3 transition-all duration-300 ${scrolled || menuOpen ? "bg-white shadow-md" : "bg-transparent shadow-none"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:scale-104 drop-shadow-[0_3px_7px_rgba(0,0,0,0.2)] cursor-pointer transition">
            <img
              src={scrolled || menuOpen ? "/pet-saude-logo-png.png" : "/pet-logo-branca.png"}
              alt="Ministério da Saúde"
              className={`h-12 w-auto ${scrolled || menuOpen ? "" : "brightness-85"}`}
            />
            <div className={`text-sm sm:text-md font-semibold transition-colors duration-300 ${scrolled || menuOpen ? "text-orange-600" : "text-orange-400"}`}>
              SAÚDE DO <br />
              <span className={`text-md sm:text-xl font-bold transition-colors duration-300 ${scrolled || menuOpen ? "text-sky-600" : "text-sky-400"}`}>TRABALHADOR</span>
            </div>
          </Link>

          <nav className="hidden md:flex font-semibold text-lg items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={`transition-colors duration-300 ${scrolled ? `${label === "LDRT" ? " font-bold text-orange-600 " : " text-sky-800 "} hover:text-sky-500` : `${label === "LDRT" ? " font-bold text-sky-400 hover:text-orange-500 " : " text-white/90 hover:text-sky-300 "} transition`}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            <Menu className={`w-6 h-6 absolute transition-all duration-200 ${menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"} ${scrolled ? "text-gray-700" : "text-white"}`} />
            <X className={`w-6 h-6 transition-all duration-200 ${menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"} text-gray-700`} />
          </button>
        </div>

        {/* Menu mobile com animação */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col gap-4 pt-4 pb-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold text-lg ${label === "LDRT" ? "text-orange-600" : "text-sky-800"} hover:text-sky-500 transition-colors`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
