# Bellhaven Wiki

**Read `wiki/PRODUCT.md` first.** TrapRaiders is an **Unreal 5.8 online game**. 8787 is the launch **authority server**, not a second client. **Much of this wiki was written for a browser walker and is not accurate as a ship log.** World/district/catalog pages can still feed Unreal. `STATUS_NODE_LOG.md` is the old agent diary.

Every agent **reads PRODUCT.md then this file** and **only writes their assigned file**. Do not edit another agent’s file. Append a dated line to `wiki/STATUS.md` when you finish.

## World

- Island: **Bellhaven**. City: **Port Rook**. All names invented.
- Playable size: **4000 m × 4000 m**
- Origin: island center. **+X east, +Y north, +Z up**. Units in data files: **meters**. Unreal: ×100 to cm.
- Heightmap: **2017 × 2017** (Unreal landscape, ~200 cm/quad → ~4034 m)
- Sea level: height **0**. Land **2–62 m**. North ridge peak **~55 m**. South basin **2–10 m**.
- Water: ocean around island + **The Cut** canal (NW→SE).

## District AABBs (meters, axis-aligned, approximate)

| Id | Name | MinXY | MaxXY | Ground |
|---|---|---|---|---|
| N | Belvedere Heights | (-900, 400) | (900, 1900) | manicured green, hills |
| W | Pearl Row / Harbor | (-1900, -400) | (-200, 1200) | clean urban + woods |
| E | Mason Flats | (200, -200) | (1900, 1100) | worn brick, dense grid |
| S | Foundry Ward | (-900, -1800) | (1100, -200) | rust brown, flat |
| SE | Kiln Spur | (800, -1600) | (1800, -400) | industrial, rail |

## Shared files

| Path | Owner | What |
|---|---|---|
| `wiki/PRODUCT.md` | lead | Unreal = the game; 8787 = authority |
| `wiki/README.md` | lead | this contract |
| `wiki/STATUS.md` | everyone appends | one line when done |
| `wiki/height.md` | agent-height | hills, heightmap notes |
| `wiki/roads.md` | agent-roads | I-9, grid, canal, bridges |
| `wiki/ground.md` | agent-ground | splat / ground colors |
| `wiki/trees.md` | agent-trees | tree density + scatter |
| `wiki/lights.md` | agent-lights | streetlights |
| `wiki/signs.md` | agent-signs | named signs |
| `wiki/pois.md` | agent-pois | KEEP POI xyz |
| `wiki/unreal.md` | agent-unreal | import / project |

Data goes in `TrapRaiders/data/` (baked):

- `heightmap.r16` — 2017², `raw = 32768 + Z_m * 100`
- `preview_color.bmp` — district colors + roads
- `splat_green/urban/brick/dirt.bmp` — layer weights
- `roads.json` `lights.csv` `trees.csv` `signs.csv` `meta.json`

UE 5.8 is at `C:\UE\UE_5.8`. **The game project exists:** `Z:\AI Hangout\TrapRaiders 5.8\TrapRaiders.uproject`. Landscape import is **not done** — see `wiki/unreal.md`. Do not create a new blank project.

## KEEP POIs (do not invent extras)

See `CITY_MAP.md`. Apartments = 8 (W2 E4 S2). Labs = 4. No stadium, no subway.

## Style

North warm even lights. West clean LED. East mixed, some dead. South flicker. Slight hills. Street signs use the named list in CITY_MAP.md.
