# PRODUCT — read this first

**TrapRaiders is an Unreal Engine 5.8 online game.** Bellhaven / Port Rook is the world. That is the whole product.

The localhost process on **127.0.0.1:8787** is the **upcoming launch authority** (inventory, movement clamp, clock, economy, substance sim). It is **not** a second game. It is **not** the player client. HTML/Three.js on `/` is a debug harness only. Do not add features there and call the game shipped.

## Roots (do not mix)

| What | Path | Open this |
|---|---|---|
| **The game** | `Z:\AI Hangout\TrapRaiders 5.8` | `TrapRaiders.uproject` (UE **5.8**, `C:\UE\UE_5.8`) |
| Newer UE copy (extra plugins: Sloyd, phone, Interchange) | `Z:\UnrealProjects\TrapRaiders` | same `.uproject` name |
| Authority + wiki + bake | `Z:\AI Hangout\TrapRaiders` (also `Z:\TrapRaiders`) | `server/index.js` on 8787 |
| Public wiki | https://github.com/VeyrixCasino/TrapRaiders/tree/master/wiki | always-on for ChatGPT |

Ignore: nested `TrapRaiders\TrapRaiders 5.8`, desktop bat pointing at `C:\TrapRaiders 5.8`, `C:\Users\uybuv` home git.

## What is true

- Bake exists: `data/heightmap.r16` (2017²), `roads.json`, `lots.json`, splats, sat. Spec for **Landscape import**.
- Unreal project exists. Maps `TrapRaiders.umap` / `TrapRaiders2.umap` are starter tiles. **Landscape is not imported.** House Sloyd meshes are in `Content/SloydModels/`.
- Wiki / kits / locked drug math exist (`GAMEPLAY_RESPONSE.md`). Gameplay numbers are `gameplay_estimate`. No recipes, no doses-as-how-to, no opioids.
- Node walk/run/jump/phone proves the **authority API**. Next: Unreal pawn talks to that API. Do not grow the browser walker.

## Next job (Unreal)

1. Import `data/heightmap.r16` as Landscape into `Z:\AI Hangout\TrapRaiders 5.8` (playbook: `wiki/unreal.md`).
2. Project roads/lots onto it. Possess a walking Character.
3. Keep 8787 as server-authoritative. Unreal is the client.

## Locked (do not reinvent)

Drug batch math, coke/α-PVP anchors, MDPV duration 210: `wiki/substance_research/GAMEPLAY_RESPONSE.md`.
World size, districts, KEEP POIs: this folder’s `README.md` + `CITY_MAP.md`.
