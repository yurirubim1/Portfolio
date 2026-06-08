"use client";

import { useEffect } from "react";

/**
 * Moves every element with a `data-parallax` attribute vertically as the page
 * scrolls. The attribute value is the speed factor (e.g. 0.2 = slow drift).
 * Disabled when the user prefers reduced motion.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    ).map((el) => ({ el, speed: parseFloat(el.dataset.parallax || "0") }));
    if (els.length === 0) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      for (const { el, speed } of els) {
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
