"use client";

import Image from "next/image";
import { Home, User, FolderGit2, Mail, ArrowRight, AtSign, Globe, Eye, Menu, X } from "lucide-react";
import ProjectsCarousel from "./components/ProjectsCarousel";
import { useLanguage } from "./components/LanguageProvider";
import { projects } from "./data/projects";
import { useState, useEffect, useRef } from "react";
import MouseGlow from "./components/MouseGlow";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useCountUp } from "./hooks/useCountUp";

const totalVisits = projects.reduce((acc, p) => acc + p.visits, 0);

function formatVisits(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return n.toLocaleString();
}

function StatCard({
  raw,
  label,
  green,
  started,
  format,
}: {
  raw: number;
  label: string;
  green?: boolean;
  started: boolean;
  format?: (n: number) => string;
}) {
  const counted = useCountUp(raw, 1800, started);
  const display = format ? format(counted) : String(counted);
  return (
    <div className="flex flex-col gap-2 bg-[#08080f] p-8 transition-colors duration-300 hover:bg-white/[0.03]">
      <span className={`text-3xl font-black tracking-tight tabular-nums ${
        green ? "text-violet-300" : "text-white"
      }`}>{display}+</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">{label}</span>
    </div>
  );
}

export default function House() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [liveCCU, setLiveCCU] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fetchCCU = () => {
      fetch("/api/playing")
        .then((r) => (r.ok ? r.json() : {}))
        .then((data: Record<string, number>) => {
          setLiveCCU(Object.values(data).reduce((a, b) => a + b, 0));
        })
        .catch(() => {});
    };
    fetchCCU();
    const id = setInterval(fetchCCU, 30_000);
    return () => clearInterval(id);
  }, []);

  const navItems = [
    { label: t("navHome"),     href: "#home",     icon: Home },
    { label: t("navAbout"),    href: "#about",    icon: User },
    { label: t("navProjects"), href: "#projects", icon: FolderGit2 },
  ];

  return (
    <>
      <MouseGlow />
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#08080f]">
      <header className="fixed top-5 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4">
        <nav className="relative flex items-center justify-between rounded-2xl pl-4 pr-3 py-3">
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.09] bg-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <Image
            src="/RubimLogoPng.png"
            alt="Rubim"
            width={72}
            height={24}
            priority
            className="relative opacity-90"
          />

          <ul className="relative hidden md:flex items-center gap-0.5">
            {navItems.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-white/40 transition-all duration-200 hover:text-white"
                >
                  <span className="absolute inset-0 rounded-xl bg-white/0 transition-all duration-200 group-hover:bg-white/[0.06]" />
                  <Icon size={14} className="relative" strokeWidth={1.5} />
                  <span className="relative text-xs font-medium tracking-wide">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-white/40 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
            >
              <Globe size={14} strokeWidth={1.5} />
              <span className="text-xs font-medium uppercase tracking-wide">
                {lang === "en" ? "PT" : "EN"}
              </span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white tracking-wide transition-all duration-200 hover:bg-violet-500 active:scale-95"
            >
              <Mail size={14} strokeWidth={2} />
              {t("navContact")}
            </a>
          </div>

          <div className="relative flex items-center gap-1 md:hidden">
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className="flex items-center gap-1 rounded-xl px-2.5 py-2 text-white/40 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
            >
              <Globe size={13} strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase tracking-wide">
                {lang === "en" ? "PT" : "EN"}
              </span>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center justify-center rounded-xl p-2 text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        <div
          className={`relative mt-2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d0d14]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-3 gap-1">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
              >
                <Icon size={15} strokeWidth={1.5} />
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}
            <div className="my-1 h-px bg-white/[0.06]" />
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 active:scale-[0.98]"
            >
              <Mail size={15} strokeWidth={2} />
              {t("navContact")}
            </a>
          </div>
        </div>
      </header>

      <div className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-violet-700 opacity-[0.10] blur-[130px]" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600 opacity-[0.07] blur-[160px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-violet-700 opacity-[0.09] blur-[130px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "200px 200px" }}
      />

      <section id="home" className="relative flex min-h-[80vh] items-center justify-center px-6 pt-28">
        <div className="relative flex max-w-lg flex-col gap-8 reveal">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              {t("heroTag")}
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("heroTitle")}
          </h1>

          <p className="max-w-md text-base leading-7 text-white/35 font-light">
            {t("heroDescription")}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#projects"
              className="group flex items-center gap-2.5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 active:scale-[0.97]"
            >
              {t("heroCta")}
              <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-white/30 transition-colors duration-200 hover:text-white/60"
            >
              {t("heroLearnMore")}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
              <span className="text-xs text-white/50">
                <span className="font-semibold text-violet-300">{liveCCU > 0 ? `${formatVisits(liveCCU)}+` : "..."}</span>
                {" "}{lang === "en" ? "live CCU" : "CCU ao vivo"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2.5">
              <Eye size={13} strokeWidth={1.5} className="text-white/30 shrink-0" />
              <span className="text-xs text-white/35">
                <span className="font-semibold text-white/70">{formatVisits(totalVisits)}+</span>
                {" "}{lang === "en" ? "total visits" : "visitas no total"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative px-6 pt-16 pb-32">
        <div className="mx-auto flex max-w-4xl flex-col gap-16 md:flex-row md:items-start md:gap-20">
          <div className="reveal flex shrink-0 flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                {t("aboutTag")}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("aboutTitle")}
            </h2>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col gap-6">
            <p className="text-base leading-7 text-white/40 font-light">
              {t("aboutP1")}
            </p>
            <p className="text-base leading-7 text-white/40 font-light">
              {t("aboutP2")}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {[
                { value: "2+", label: t("aboutYears") },
                { value: "30+", label: t("aboutProjects") },
                { value: "15+", label: t("aboutClients") },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-xs text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="relative px-6 pb-16">
        <div ref={statsRef} className="reveal mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/[0.06] grid grid-cols-2 gap-px bg-white/[0.05] sm:grid-cols-4">
          <StatCard raw={projects.length} label={lang === "en" ? "Games Shipped" : "Jogos Publicados"} started={statsVisible} />
          <StatCard raw={2} label={lang === "en" ? "Years Experience" : "Anos de Experiência"} started={statsVisible} />
          <StatCard raw={totalVisits} label={lang === "en" ? "Total Visits" : "Visitas Totais"} started={statsVisible} format={formatVisits} />
          <StatCard raw={liveCCU} label={lang === "en" ? "Live CCU" : "CCU ao Vivo"} green started={statsVisible} format={formatVisits} />
        </div>
      </section>

      <section id="projects" className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-14 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                {t("projectsTag")}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("projectsTitle")}
            </h2>
            <p className="max-w-md text-base leading-7 text-white/35 font-light">
              {t("projectsDescription")}
            </p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      <section id="contact" className="relative px-6 py-32">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              {t("contactTag")}
            </span>
            <span className="h-px w-8 bg-white/20" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("contactTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/35 font-light">
            {t("contactDescription")}
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:rubimdevlua@gmail.com"
              className="group relative flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] sm:w-auto"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                <AtSign size={18} className="text-white/60" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/30">{t("contactEmail")}</p>
                <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  rubimdevlua@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://discord.gg/rubimdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] sm:w-auto"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white/60" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/30">{t("contactDiscord")}</p>
                <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  rubimdev
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>

    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#050508] h-48">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative flex w-full">
            <div
              className={`flex shrink-0 items-center ${
                i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
              }`}
              style={{ animationDuration: `${25 + i * 5}s` }}
            >
              {[...Array(10)].map((_, j) => (
                <span
                  key={j}
                  className="mx-6 text-6xl font-black uppercase italic tracking-widest text-white/[0.08] sm:text-8xl"
                >
                  RUBIM
                </span>
              ))}
            </div>
            <div
              aria-hidden
              className={`flex shrink-0 items-center ${
                i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
              }`}
              style={{ animationDuration: `${25 + i * 5}s` }}
            >
              {[...Array(10)].map((_, j) => (
                <span
                  key={j}
                  className="mx-6 text-6xl font-black uppercase italic tracking-widest text-white/[0.08] sm:text-8xl"
                >
                  RUBIM
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
    </>
  );
}
