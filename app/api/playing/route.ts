import { NextResponse } from "next/server";
import { projects } from "@/app/data/projects";

export const revalidate = 0;

export async function GET() {
  const universeIds = projects.map((p) => p.universeId).join(",");

  const res = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeIds}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    return NextResponse.json({}, { status: 502 });
  }

  const json = await res.json();
  const playing: Record<string, number> = {};

  for (const game of json.data) {
    playing[game.id] = game.playing;
  }

  return NextResponse.json(playing, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
