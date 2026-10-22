# Trees — density + scatter

Owner: **agent-trees**. Playable **4000 × 4000 m**, origin island center, **+X east, +Y north**. Counts are **trees per 100 m cell** (one hectare). Scatter from this table; do not plant on exclusions.

## Species

| Tag | Where | Note |
|---|---|---|
| `oak` | north estates, west woods, west streets | canopy, wide crown |
| `maple` | north estates, west woods, west streets | mixes with oak |
| `ailanthus` | east streets + lots | scrappy, uneven, volunteers in cracks |
| `dead` | south / SE lots only | snags, sparse live leftovers |

North-west = oak/maple. East = ailanthus. South = dead/sparse. No palms, no orchard rows, no highway plantings.

## Hard exclusions (density **0**)

Do not scatter on pavement, water, or these corridors. Cell count is **0** even if the cell also overlaps a planted district.

| Zone | Keep-out | Approx. |
|---|---|---|
| **I-9** | full ring + spine: travel lanes, shoulder, median | ~36 m either side of centerline |
| **The Cut** | canal water + banks | NW→SE; ~28 m either side of water centerline |
| **Airfield** | NE peninsula strip, apron, taxi | AABB **(1100, 1400) → (1900, 2000)** |
| Ocean / beach | below ~4 m land or off-island | — |

I-9 rings the south basin (Foundry inside the red ring) and spines through the island. Trees stop at the fence line. No allée, no interchange groves.

## Density by zone (per 100 m cell)

Use the **highest matching planted zone**, then apply exclusions (exclusion wins). Overlap of two planted zones: take the more specific row (woods / park / lot beat generic street / industrial).

| Id | Zone | AABB MinXY → MaxXY | Density | Mix |
|---|---|---|---|---|
| WW | West woods (peninsula canopy) | (-1900, 200) → (-1050, 1200) | **48** | oak 0.60 / maple 0.40 |
| NE | North estate canopy | (-900, 400) → (900, 1900) | **36** | oak 0.50 / maple 0.50 |
| LG | Laurel Green (park bump) | (-220, 980) → (180, 1380) | **42** | oak 0.45 / maple 0.55 |
| WS | West street trees | W district minus woods: (-1900, -400) → (-200, 1200) | **12** | oak 0.70 / maple 0.30 |
| ES | East street trees | (200, -200) → (1900, 1100) | **6** | ailanthus 0.85 / maple 0.15 |
| EL | East neglected / vacant lots | around neglected lot + block interiors | **8** | ailanthus 1.00 |
| ED | East docks / waterfront tip | (1400, -80) → (1900, 700) | **2** | ailanthus 1.00 |
| SI | South industrial (default) | (-900, -1800) → (1100, -200) | **1** | dead 1.00 |
| SE | Kiln Spur industrial | (800, -1600) → (1800, -400) | **1** | dead 1.00 |
| SD | South / SE dead lots | far-south dead lot + junk-edge lots | **5** | dead 0.80 / ailanthus 0.20 |
| X0 | I-9 / The Cut / airfield / water | see exclusions | **0** | — |

West woods and north estates are the only **dense canopy**. East is street-sparse (half of west). South industrial is almost bare except marked dead lots.

### Dead-lot cells (south)

Plant **SD (5)** only on these cells; everywhere else in S/SE stays **SI/SE (1)** or **0** on I-9 / The Cut.

| Lot | Center XY | Extent |
|---|---|---|
| Far-south dead lot | (80, -1680) | 140 × 120 m |
| Junkyard edge | (-420, -1320) | 100 × 80 m |
| Kiln vacant | (1280, -980) | 90 × 90 m |

### East lot cells

**EL (8)** on neglected-lot and a few block-heart vacancies inside Mason Flats; do not flood the whole east grid. Default east cell is **ES (6)**. Docks override to **ED (2)**.

## Scatter rules

- One roll per 100 m cell. Target count = density. Integer; leftover fraction is a probability for +1.
- Jitter uniformly inside the cell, then reject if inside an exclusion or on a road/building footprint.
- Min spacing: oak **8 m**, maple **7 m**, ailanthus **4 m**, dead **6 m**.
- Street trees (WS, ES): snap toward curb, **2.5–4.0 m** off pavement edge, both sides when the cell has a named street. Skip mid-block interiors unless the cell is EL/ED.
- West woods / north estates: full-cell canopy, not curb-only. Thin 40% on cul-de-sac pavement and driveway pads; keep the lots green.
- Scale: oak/maple 0.85–1.25, ailanthus 0.55–1.05 (lean scrappy), dead 0.70–1.10 and leafless.
- Yaw random. No rows, no perfect grids, no trees on rooftops or in The Cut.

## District read-through

**North — Belvedere Heights.** Dense oak/maple on estate lots, hills, and Laurel Green. Street trees continue the same mix along Belvedere Blvd, Crestwood, Laurel Crest, Oriole, Fairway, Country Club, Ivy Gate, Northridge — still under the 36/42 canopy, not a second layer on top.

**West — Pearl Row / Harbor.** Deep woods on the peninsula (**48**). In-town Harbor / Pearl / Civic / Ferry / Pike / Waterfront get clean street oaks (**12**). Harbor plaza and ferry apron stay clear (treat as pavement).

**East — Mason Flats.** Scrappy ailanthus along Mason, E 8th / 12th / 18th, Bodega, Laundry Line, Tank Hill, Pawn Row (**6**). Docks thinner (**2**). A few neglected interiors **8**. No west-style canopy.

**South — Foundry Ward / Kiln Spur.** Default **1** dead/snag per cell. Only the three dead lots rise to **5**. Basketball, junkyard interior, trailer pad, tent city, and the substation stay at industrial **1** or **0** if they sit on I-9 / Overpass pavement.

## Unreal notes

Foliage types: `oak`, `maple`, `ailanthus`, `dead`. Cell size **10000 uu**. Exclusion volumes for I-9, The Cut, airfield before paint. Do not use landscape grass as a tree substitute on I-9 or the strip.
