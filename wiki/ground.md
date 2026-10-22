# Ground — Bellhaven splat

Four landscape layers. Weights always sum to **1.0**. Origin at island center; +X east, +Y north. District AABBs from `wiki/README.md`.

## Layers

| Layer | Name | Hex | Dominates |
|---|---|---|---|
| 0 | Manicured green | `#3F6E36` | **N** Belvedere Heights — hills, club green, Laurel Green, cul-de-sacs |
| 1 | Clean urban concrete | `#B9B6AE` | **W** Pearl Row / Civic Harbor — paved civic, brownstone walks, ferry apron |
| 2 | Worn brick / asphalt | `#5A4338` | **E** Mason Flats — dense grid, docks, worn street + brick grit |
| 3 | Rust dirt / industrial | `#7A4A2E` | **S** Foundry Ward + **SE** Kiln Spur — basin, rail, yards, packed rust soil |

Layer hex is the albedo tint painted on the weightmap. Interiors of a district AABB hold that layer at **≥ 0.85**.

## Material hexes

Shared base colors the layers tint. Use these exact values in landscape materials / layer info.

| Material | Hex | Use |
|---|---|---|
| Grass | `#4A7C3F` | Layer 0 lawns and park. Thin dry mix `#6B7A3A` only on N ridge fringes. |
| Dirt | `#6E4B2A` | Layer 3 packed soil. Also canal cut-banks and SE rail ballast mix. |
| Asphalt | `#2F2E2C` | Clean west pavement and I-9. Worn east streets shift toward `#3A3530`. |
| Sand | `#C4A66A` | The Cut banks, harbor edge, NE airfield strip. Never a district dominant. |

Layer 0 = grass-led. Layer 1 = asphalt + concrete. Layer 2 = worn asphalt + brick grit (`#7A4A3A` fleck, not a fifth layer). Layer 3 = dirt-led with rust tint. Sand is a weight bump only, never a fifth splat channel.

## Splat weights at district borders

Do not hard-clip at AABB edges. Blend in a **80–120 m** band.

- **Two-district overlap** (N∩W, N∩E, W∩S, E∩S, S∩SE): inverse-distance to each AABB interior. Both weights live in `0.25–0.75`, then normalize.
- **Three-district corners** (E/S/SE around (800, −400)): three-way mix, then normalize to 1.0. No layer above 0.55 in a triple overlap. W/S west of The Cut is two-layer only.
- **Touch edges** (E minY and S maxY at **Y = −200**): treat as a full 100 m blend, not a 1 m seam.
- **Outside all AABBs** (shore, west woods, NE peninsula): nearest district layer at 0.6–0.8, fill with grass (north/west woods) or dirt/sand (south basin / beach).
- **I-9 and named grid streets**: locally raise asphalt (layer 2, or layer 1 on Pearl Row) by **+0.25**, then renormalize. Does not erase the district color.
- **The Cut**: 20–40 m bank = sand + dirt (layers 3 and a sand bump). Water stays height 0, no splat.

Kiln Spur is layer 3, same as Foundry Ward. East docks stay layer 2 to the waterline.
