"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

const OFFSETS: Record<Direction, string> = {
  up: "translateY(34px)",
  down: "translateY(-34px)",
  left: "translateX(-44px)",
  right: "translateX(44px)",
  scale: "scale(0.92)",
  blur: "translateY(20px)",
};

export default function Reveal({
  children,
  as: Tag = "div",
  dir = "up",
  delay = 0,
  duration = 750,
  threshold = 0.15,
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  dir?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // Dynamic: reveal when it scrolls into view, reset when it leaves,
        // so the animation replays based on where the user is on the page.
        setVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={className}
      {...rest}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : OFFSETS[dir],
        filter: dir === "blur" && !visible ? "blur(8px)" : "blur(0px)",
        transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms, filter ${duration}ms ${ease} ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
