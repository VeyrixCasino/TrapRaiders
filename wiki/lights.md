# Streetlights — Port Rook

Owner: **agent-lights**. Place poles **along roads only**. Never in **The Cut**, ocean, or off-road green.

One shared pole + fixture mesh for the whole island. Districts change **spacing, color temperature, intensity, and behavior** — not the mesh.

Origin: island center. **+X east, +Y north, +Z up**. Meters. Unreal: ×100 to cm.

---

## Shared mesh

| Field | Value |
|---|---|
| Mesh | one streetlight pole + downward fixture (same asset everywhere) |
| Mount | curb / shoulder, **2.5–3.5 m** off road centerline |
| Fixture height | **7.5 m** to lamp |
| Aim | down at pavement, slight inward tilt |
| Do not | plant in The Cut water, canal banks as “rows,” parks, lots, or open hills |

I-9 uses the same mesh. Follow the **district AABB** the segment sits in. Bridge decks (Cut Bridge, Oriole Crossing, Harbor Span, I-9 South Ramp, Kiln Overpass) get the same rule as the road they carry. No poles in the canal under the deck.

---

## District rules

| District | AABB (minXY → maxXY) | Spacing | CCT | Intensity (rel.) | Behavior |
|---|---|---|---|---|---|
| **N** Belvedere Heights | (-900, 400) → (900, 1900) | **28 m** even | warm **2700 K** | **1.00** even | every pole on, no flicker |
| **W** Pearl Row / Harbor | (-1900, -400) → (-200, 1200) | **22 m** | cool **4000 K** LED | **1.25** | clean, even, no dead |
| **E** Mason Flats | (200, -200) → (1900, 1100) | **18–24 m** mixed | mixed 2700–4000 K | **0.70–1.10** | **15% dead** (intensity 0) |
| **S** Foundry Ward | (-900, -1800) → (1100, -200) | **32 m** sparse | orange sodium **~2200 K** | **0.55** | flicker |
| **SE** Kiln Spur | (800, -1600) → (1800, -400) | **32 m** sparse | orange sodium **~2200 K** | **0.55** | flicker (same as South) |

Intensity is a multiplier on the shared fixture (one light component, not a second mesh). North is the reference (`1.00`). West is brighter clean LED. East varies per pole. South / SE are dimmer sodium.

Overlap (SE vs S, W vs N, etc.): use the **more specific district** (SE over S on Kiln Spur streets; otherwise the table row for that AABB).

---

## Per-district notes

### North — Belvedere Heights

Warm even suburban. **28 m** on center, both sides of wider streets (Belvedere Blvd, Country Club Rd, Northridge), one side on cul-de-sacs (Crestwood Dr, Laurel Crest, Oriole Lane, Fairway, Ivy Gate). All poles **2700 K**, intensity **1.00**. No dead lamps. Skip Laurel Green interior — only the road that skirts the park.

### West — Pearl Row / Civic Harbor

Clean LED. **22 m** on Harbor Ave, Pearl St, Civic Way, Ferry Rd, Pike, Waterfront. **4000 K**, intensity **1.25**. Even run, no flicker, no dead. Harbor / ferry curb gets the same mesh; do not light the water.

### East — Mason Flats

Dense grid, worn. Spacing **18 m** on tight streets (Bodega St, Laundry Line, Pawn Row), **24 m** on Mason Ave / E 8th / E 12th / E 18th / Tank Hill Rd. Mixed CCT: about **half 2700 K, half 4000 K**, assigned per pole (not a blend in one fixture). Intensity **0.70–1.10**. **15% of poles are dead** (mesh still placed, light off). Prefer dead lamps on neglected / abandoned / pawn blocks, not the school frontage. Docks: lights on the road to the waterfront, not on the water.

### South — Foundry Ward + Kiln Spur

Sparse orange sodium. **32 m** on Foundry, Kiln Rd, Spur, Overpass, Junkyard Cut, Neon Liquor, Chainlink. CCT **~2200 K** (high-pressure sodium look). Intensity **0.55**. **Flicker**: slow irregular pulse (~0.7–1.0 of that intensity, 1–4 Hz, not synced between poles). Tent city / junkyard / dead lot: only if a named road runs there — no field scatter.

---

## Placement

1. Sample **road centerlines** (I-9 + district streets from `CITY_MAP.md` / `wiki/roads.md`). Offset to the curb.
2. Step along the spline at that district’s spacing. East: jitter spacing in **18–24 m**.
3. **Reject** any point whose XY is inside The Cut water, ocean (ground ≤ 0), or more than **4 m** from a road edge.
4. Bridges: poles on the **deck / approach**, not in the span’s water.
5. KEEP POI footprints: skip if the pole would sit inside a building. Road in front of a POI is fine.
6. NE airfield: landmark only — **no** runway lighting, no extra fixtures off the access road.

---

## Do not

- Invent a second pole mesh for sodium vs LED.
- Light The Cut as a canal feature (no waterline lanterns).
- Scatter lights across Belvedere hills, Laurel Green, or Foundry brownfield.
- Add stadium / subway lighting (those POIs do not exist).
