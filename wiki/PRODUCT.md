# PRODUCT — read this first

**TrapRaiders is an Unreal Engine 5.8 online game.** Bellhaven / Port Rook is the world.

**This wiki is not fully accurate.** It is a 2-day dump from agents who built a localhost HTML walker and wrote as if that were the game. A header sticker does not make those pages true. Use this file + `wiki/STATUS.md`. Treat `wiki/STATUS_NODE_LOG.md`, CHECK_A/B, and the WASD tables in `gameplay.md` as **harness notes**.

## What the game is

Unreal client. Local (then dedicated) **authority server**. 8787 was requested so launch authority could exist *before* the editor world was filled — not so the player would live in a browser.

## Roots (do not mix)

| What | Path |
|---|---|
| **The game** | `Z:\AI Hangout\TrapRaiders 5.8\TrapRaiders.uproject` |
| Newer UE copy (plugins) | `Z:\UnrealProjects\TrapRaiders` |
| Authority + bake + this wiki | `Z:\AI Hangout\TrapRaiders` (also `Z:\TrapRaiders`) |
| Public wiki | https://github.com/VeyrixCasino/TrapRaiders/tree/master/wiki |

Ignore nested `TrapRaiders\TrapRaiders 5.8`, desktop bat → `C:\TrapRaiders 5.8`, home-directory git.

## What you actually have (honest)

**Real, keep:**
- UE 5.8 project on disk
- `data/heightmap.r16` (2017²) + roads/lots/splats/sat — **import spec**, not Landscape
- Sloyd house uassets
- World names / districts / KEEP POIs (`CITY_MAP.md`, sector notes)
- Substance catalog + locked batch math (`GAMEPLAY_RESPONSE.md`). Dual A/B boards; do not merge. `gameplay_estimate` only. No recipes, no doses-as-how-to, no opioids.

**Real, but not the game:**
- Node `server/index.js` on 8787 (inventory 403, clock, clampMove)
- `client/*.js` walker, HTML phone, KeyM sat — debug harness

**Not done:**
- Landscape in the editor
- Roads as UE splines
- Character on Bellhaven
- Unreal talking to 8787

## Next job

1. Import `heightmap.r16` into `Z:\AI Hangout\TrapRaiders 5.8` (`wiki/unreal.md`).
2. Roads/lots onto it. Possess a pawn.
3. Point that pawn at 8787. Stop growing HTML.

## Locked math (still binding)

`wiki/substance_research/GAMEPLAY_RESPONSE.md` — Strength = W×P×E×R, coke 1/100/100, α-PVP 5/250/350 D=90, MDPV D=210. 100 is not a cap. Economy ≠ Enjoyment.
