# Status

Read `wiki/PRODUCT.md` first. This page is **current truth only**. The 2-day Node work log is `wiki/STATUS_NODE_LOG.md` — do not treat it as shipped Unreal.

## Product

TrapRaiders is **Unreal Engine 5.8, online**. Bellhaven / Port Rook.

| Piece | State |
|---|---|
| `.uproject` | **Exists** — `Z:\AI Hangout\TrapRaiders 5.8\TrapRaiders.uproject` |
| Landscape from `heightmap.r16` | **Not imported** — this is the hole |
| Roads/lots in editor | **Not in** |
| Walking Character in UE | **Not in** |
| UE net client → 8787 | **Not wired** |
| Sloyd house meshes | In `Content/SloydModels/` |
| Bake (r16, roads.json, lots, sat) | On disk under the Node tree `data/` |
| Catalog / locked drug math | `wiki/substance_research/` + GitHub |
| Node 8787 | Authority prototype + **HTML debug walker**. Not the game. |

## Wiki honesty

Most files in this folder were written while agents built a **browser walker**. World spec (districts, height, CITY_MAP, kits) can still feed Unreal. CHECK_A/B/C, `gameplay.md` control tables, and the old STATUS log describe **8787 HTML**, not a shipped island.

Bake **counts disagree** across docs. Trust `data/meta.json` + the files on disk, not a STATUS bullet.

## Next

Import Landscape. Unreal pawn. 8787 stays server. No more HTML features as “the game.”
