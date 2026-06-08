"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, ExternalLink, Users } from "lucide-react";
import { projects } from "../data/projects";

function formatNumber(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

type Project = (typeof projects)[number];

function GameCard({ project, live }: { project: Project; live?: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-48 shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="192px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-2 right-2 rounded-lg bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <ExternalLink size={10} className="text-white/80" />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 py-2.5">
        <h3 className="text-[11px] font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-white/30">
            <Eye size={9} strokeWidth={1.5} />
            <span className="text-[10px]">{formatNumber(project.visits)}</span>
          </div>
          {live !== undefined && live > 0 && (
            <div className="flex items-center gap-1 text-green-400/60">
              <Users size={9} strokeWidth={1.5} />
              <span className="text-[10px]">{formatNumber(live)}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default function ProjectsCarousel() {
  const [playing, setPlaying] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/playing")
      .then((r) => (r.ok ? r.json() : {}))
      .then(setPlaying)
      .catch(() => {});
  }, []);

  const half = Math.ceil(projects.length / 2);
  const row1 = projects.slice(0, half);
  const row2 = projects.slice(half);

  return (
    <div className="carousel-wrapper carousel-mask flex flex-col gap-4 overflow-hidden">
      <div className="flex overflow-hidden">
        <div
          className="carousel-track flex gap-4 animate-marquee-left"
          style={{ animationDuration: "45s" }}
        >
          {[...row1, ...row1].map((p, i) => (
            <GameCard key={`r1-${i}`} project={p} live={playing[p.universeId]} />
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden">
        <div
          className="carousel-track flex gap-4 animate-marquee-right"
          style={{ animationDuration: "38s" }}
        >
          {[...row2, ...row2].map((p, i) => (
            <GameCard key={`r2-${i}`} project={p} live={playing[p.universeId]} />
          ))}
        </div>
      </div>
    </div>
  );
}
