# Bellhaven — launch authority (localhost)

Owner: **agent-gameplay**. This is the **server-authoritative layer for the Unreal online game**, bound to this machine until dedicated replace it. It is **not** the player client. HTML on `/` is a debug harness so we can test the API before Unreal talks to it. Do not ship features only in the browser and call that TrapRaiders.

World size, origin, and districts stay in `wiki/README.md` + `wiki/PRODUCT.md`. KEEP pads stay in `wiki/pois.md`. Do not invent extra POIs or real-world city names.

Coords: meters, island center, **+X east, +Y north, +Z up**. The debug canvas maps world Y onto −Z. Unreal uses cm (`×100`).

---

## Bind

| Field | Value |
|---|---|
| Kind | **local-machine** (`server: "local-machine"` on `/api/state`) |
| Host | **127.0.0.1** only |
| Port | **8787** (`PORT` env overrides) |
| Start | `npm start` → `node server/index.js` from `Z:\AI Hangout\TrapRaiders` |
| Debug view | `http://127.0.0.1:8787` (`/` → `client/index.html`) — **not the game** |
| Real client | Unreal pawn in `TrapRaiders.uproject` (not wired yet) |

The process serves `client/` and `data/` as static files so the harness can run. CORS is open for the local page. Same-machine authority, not a public host. Do not start a second listener (`EADDRINUSE`). Recycle the one PID.

Player spawn (authoritative): Pearl / Harbor civic pad **(−960, 520)**, `z` from height (~23). Old **(−720, 280)** is the canal — do not use it.

---

## Controls

Click the canvas to **pointer-lock** look. Movement posts a wish to the server; the server clamps it.

| Key | Action |
|---|---|
| **WASD** | Walk. W/S along look yaw, A/D strafe. No move until pointer-lock. |
| **Shift** | Run. Ground walk **~1.65** m/s, run **~5.2** (`WALK` / `SPRINT`). Fly is faster. |
| **Space** | Jump (when not flying). |
| **M** | Debug sat overlay. Terrain in this harness is the height sample, not UE Landscape. |
| **Tab** | Toggle inventory. Prevents default focus change. |
| **↑** | Open Bellhaven Mobile if you have a burner. Arrows move. **↓** closes it only from the bottom row (the dock, or the last row inside an app). **Enter** opens the highlighted app. |
| **1–0** | With inventory open, select slots 0–9. |
| Mouse | Yaw / pitch while locked. Pitch clamped ±1.3 rad. |
| **V** | Toggle **FLY** noclip. Off at spawn. |

### Fly

**V** sets `player.fly`. In fly: no terrain collision, no water/breath, no step clamp. WASD is horizontal along look yaw; **Space** up, **Ctrl** down. Shift uses the fly sprint cap. Server still clamps the wish to **16 / 24 m/s** (`FLY` / `FLY_SPRINT`) so a packet cannot teleport. HUD shows **FLY** while on. Default spawn stays on land at City Hall, fly off.

Server `clampMove` also:

- Caps step length by `dt` (clamped 0.016–0.12 s) so a fat client packet cannot teleport.
- Rejects a landing whose sampled height is **< 1.2 m** (ocean / The Cut). Position stays put.
- Snaps `z` to ground; max drop per accept **1.6 m**.

---

## Clock

Server-authoritative. One game day = **48 real minutes**. Ticks from process time. **Does not pause** in fly or interiors. In-memory (no persist).

| Field | Value |
|---|---|
| Real day | **48 min** (2880 s) |
| Game hour | **120 s** |
| Game minute | **2 s** |
| Range | 00:00–23:59, wraps |
| Start | **08:00** day 0 |
| Phases | `night` 21–05 · `dawn` 05–07 · `day` 07–19 · `dusk` 19–21 |
| Snapshot | `/api/state` `clock` · optional `GET /api/clock` |
| Fields | `hour`, `minute`, `second`, `day`, `phase`, `t01` (0–1 from midnight) |

HUD: always-visible digital **HH:MM**, top-right (GTA-ish, small). Fog / ambient / sun tint slightly by phase.

---

## Map (M)

**M is a debug overlay**, not Unreal. Color sat under `data/satellite_color_ui.jpg` is the pause-map sketch. Landscape import is `wiki/unreal.md`.

**Interactable:** mouse drag pans, wheel zooms (cursor-centered). Click a lot or KEEP pad to show **name / kind / district** from `/data/lots.json` (KEEP names from `wiki/pois.md` via `data/keep_pads.json`). Yellow player blip with heading; NPCs are small light dots.

Same meter space as the wiki: island extent from `height_lo.json` (bake ≈ **4032 m**), origin center, +Y north at the top of the bitmap. Rebuild: `node _gen_sat.js` (also runs at the end of `_gen_terrain.js` so every terrain bake refreshes the satellite). A new pad in `lots.json` appears on the next sat bake.

---

## Inventory (Tab) — server owns it

The panel is a **view**. The machine server is the only writer. Persist file: `data/inv_save.json`.

| Rule | Value |
|---|---|
| Slots | **20** |
| Max stack | **99** |
| Snapshot | `GET /api/inv` and `/api/state` (`inv` + `catalog`) |
| Allowed writes | `POST /api/inv/add` `{ itemId, count }` · `POST /api/inv/move` `{ from, to }` · `POST /api/inv/drop` `{ slot }` |
| Forbidden | `POST /api/inv/set` → **403** `{ ok: false, error: "server_owns_inventory" }` |

The client still fires `/api/inv/set` after a give-button press to prove the reject. The log line is `cheat: …`. Empty slots stay empty.

**Catalog** (ids are data, names are labels):

| id | name | stack |
|---|---|---|
| `cash` | Cash | yes |
| `bag_empty` | Zip Bag | yes |
| `brick_wrap` | Wrap Roll | yes |
| `key_house` | House Key | no (count forced to 1) |
| `phone` | Burner Phone | no |

Unknown `itemId` → `unknown_item`. No free slot → `full`. Stackables fill existing stacks first, then the next empty slot. Move onto a same-id stack merges up to 99; otherwise the two slots swap.

Give buttons on the panel call `add` only. Drop: click the **already selected** slot. Poll `/api/state` every **400 ms** so another writer on this machine would still win.

---

## NPC names — 100 / 50

Pools live in `data/names.json`. Counts are what `/api/state` reports as `names.first` / `names.last`.

| Pool | Count | Use |
|---|---|---|
| `first` | **100** | given name |
| `last` | **50** | family name |

`GET /api/names` returns both arrays. `fullName()` is `first + " " + last`. Sixteen NPCs spawn at boot (`makeNpcs(16)`), unique names with a short retry. They wander from eight pads around Port Rook (City Hall, Mason Flats, Foundry Ward, Pearl Row, and nearby KEEP sites). Tick every **100 ms**. Water / canal (`z < 1.2`) flips heading.

A nameplate shows the nearest NPC within **4 m**.

---

## HTTP surface

| Method | Path | Who writes |
|---|---|---|
| GET | `/api/state` | — player, inv snapshot, catalog, npcs, name-pool sizes, world extent, **clock** |
| GET | `/api/clock` | — `{ hour, minute, second, day, phase, t01 }` |
| GET | `/api/inv` | — snapshot + catalog |
| GET | `/api/names` | — raw 100 / 50 pools |
| POST | `/api/move` | server (`clampMove`) |
| POST | `/api/inv/add` `/move` `/drop` | server |
| POST | `/api/inv/set` | **rejected** |

---

## Files

| Path | Role |
|---|---|
| `server/index.js` | bind **8787**, routes, static |
| `server/clock.js` | 48-min day, process-time tick |
| `server/world.js` | height sample + walk clamp |
| `server/inventory.js` | authoritative slots |
| `server/names.js` | 100 / 50 pool |
| `server/npcs.js` | named walkers |
| `client/index.html` `game.js` | **debug harness only** — WASD / M / Tab / phone |
| `data/names.json` | pools |
| `data/inv_save.json` | last server inventory |
| `data/height_lo.json` | authority height sample |

Unreal is the game (`wiki/unreal.md`, `wiki/PRODUCT.md`). This process is the authority the Unreal client will call.
