"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, ExternalLink, Users } from "lucide-react";
import { projects } from "../data/projects";
import { useLanguage } from "./LanguageProvider";

function formatNumber(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default function ProjectsCarousel() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/playing")
      .then((r) => (r.ok ? r.json() : {}))
      .then(setPlaying)
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {projects.map((project, index) => {
        const live = playing[project.universeId];
        const isTop = index === 0;
        return (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:-translate-y-0.5"
          >
            {/* Thumbnail */}
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Rank badge */}
              {isTop && (
                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 backdrop-blur-md border border-amber-400/20">
                  <span className="text-[10px] font-bold text-amber-300">#1</span>
                </div>
              )}

              {/* Live badge */}
              {live !== undefined && live > 0 && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-green-500/20 px-2 py-0.5 backdrop-blur-md border border-green-500/20">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  <span className="text-[10px] font-semibold text-green-300">
                    {formatNumber(live)}
                  </span>
                </div>
              )}

              {/* External link icon */}
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                <ExternalLink size={11} className="text-white/80" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 px-3 py-3">
              <h3 className="text-xs font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-white transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-white/35">
                  <Eye size={10} strokeWidth={1.5} />
                  <span className="text-[10px]">{formatNumber(project.visits)}</span>
                </div>
                {live !== undefined && live > 0 && (
                  <div className="flex items-center gap-1 text-green-400/60">
                    <Users size={10} strokeWidth={1.5} />
                    <span className="text-[10px]">{formatNumber(live)}</span>
                  </div>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
