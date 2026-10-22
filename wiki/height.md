# Bellhaven Height Field

Owner: **agent-height**. Units: **meters** unless noted. Origin at island center. **+X east, +Y north, +Z up**. Sea level is **Z = 0**. Land sits **2–62 m**. Unreal stores the same values ×100 as centimeters.

Playable island is **4000 m × 4000 m**. The Unreal Landscape is slightly larger so the mesh can hold a beach ring and a thin water apron.

## Landscape import

| Setting | Value |
|---|---|
| Resolution | **2017 × 2017** vertices |
| Quad size | **200 cm** (2 m) |
| World extent | **2016 × 2 m = 4032 m** per axis (~4034 m including the last vertex) |
| Origin | landscape center = world (0, 0) |
| Height range (authoring) | **−8 m** (The Cut floor) to **~55 m** (north ridge). Spare headroom to **62 m** if a later sculpt needs a knoll. |
| Sea / ocean | Z = 0 plane; land never drops below **2 m** except The Cut and a few dock cuts |

Import a 16-bit height PNG (or raw) at 2017². Do not use 8-bit — the south basin needs sub-meter steps. After import, set scale **X=200, Y=200, Z** so that 1 height-unit maps to 1 cm of authored Z (or match the project's chosen height-range encoding). Sculpt and paint in **World Partition** on this one landscape; do not split into multiple actors for v1.

## Macro silhouette

Read this as a single island, not five plates. From north to south the ground falls: ridge → club green → city benches → basin. From west to east it rolls, then flattens onto docks.

```
          N ridge ~55 m
               ▲
    W woods 12–28 m     NE strip 8 m
               │
         Port Rook benches 6–14 m
               │
      The Cut (below 0) ────────► SE
               │
         S basin 2–10 m
               ▼
          E docks 3 m
```

The Cut is the only inland water that goes **below sea**. Everywhere else, keep a dry lip of at least **2 m** so streets do not flood the ocean plane.

## Region heights

### North ridge — Belvedere Heights (~55 m)

AABB: (−900, 400) → (900, 1900). Manicured green on hills.

- **Crest:** a long east–west ridge, peak **~55 m**, slightly west of center near (−200, 1600). Do not spike to a single vertex — hold a **200–400 m** plateau so mansions and Laurel Green sit flat.
- **North face:** fall toward the ocean over **150–250 m** of run. Steep but walkable. No cliffs on the playable side.
- **South face:** gentler, **55 m → 18 m** by Y ≈ 500, so Belvedere Blvd and Crestwood Dr can climb without stairs.
- **Club green / Laurel Green:** terrace at **32–38 m**, almost flat (slope < 2%). Cul-de-sacs sit on this shelf.
- **Northridge / Ivy Gate:** small saddles **40–48 m**. Keep sightlines open to the south basin.

Sculpt: Smooth brush, large radius. Raise a sausage along Y = 1400–1800, then Flatten the club terrace. Avoid noise on the green.

### South basin — Foundry Ward / The Kiln (2–10 m)

AABB: (−900, −1800) → (1100, −200), plus Kiln Spur (800, −1600) → (1800, −400).

- **Floor:** **2–6 m** inside the I-9 ring. Lowest dry land on the island. Foundry, junkyard, trailer park, tent city under the overpass all sit here.
- **Rim:** **8–10 m** against the ring highway so the road can sit on a slight berm without looking like a wall.
- **Kiln Spur:** industrial apron **4–8 m**, almost table-flat for rail and warehouses. One gentle rise (**~9 m**) under the water-tower sightline is enough; do not add hills.
- **Far-south dead lot:** **2–3 m**, barely above the beach.

Sculpt: Flatten the basin first, then a soft Noise (amplitude **< 1 m**) so it is not a perfect plane. Keep slopes under **3%** on streets.

### The Cut — canal (below sea)

NW → SE blue line. This is inland water, not a painted river on land.

- **Water surface:** **Z = 0** (same ocean plane) or a dedicated water actor at **−0.2 m** if you want a still canal without ocean chop.
- **Bed:** **−4 to −8 m**. Deep enough that a boat hull clears; shallow enough that Landscape sculpt does not punch through the height-range.
- **Banks:** rise to **3–6 m** within **12–20 m** of the waterline. Steep but not vertical. Leave a **4 m** towpath shelf on at least one side for later walkways.
- **Width:** **40–70 m** water, wider at the NW mouth and the SE outfall.
- **Mouths:** both ends open to the ocean. Carve the NW cut through the west woods (around (−1400, 800)) and the SE cut past Kiln Spur (around (1400, −900)). Do not wall them off.
- **Under bridges:** keep the bed continuous. Cut Bridge, Oriole Crossing, Harbor Span, I-9 South Ramp, and Kiln Overpass span the canal — they are road/spline work, not height spikes. Leave the landscape **depressed** under each crossing.

Sculpt: Use the **Hydro / Erosion** or a long Flatten-below-zero stroke. Then Ramp the banks. Do not fill the canal with land “to make roads easier”; roads go over on bridges.

### Northeast airfield — flat 8 m

Small strip on the northeast peninsula. Landmark only — not a district.

- **Pad:** **8.0 m** dead flat, slope **< 0.5%**, roughly **400 × 80 m**, long axis closer to east–west.
- **Approx center:** (1200, 1600), still inside or just off the Belvedere AABB's east edge.
- **Shoulders:** 8 m for **20 m** around the strip, then a soft fall to the north beach (**2–4 m**) and a climb toward the ridge on the west side.
- **No hangars as terrain.** Buildings come later. Keep the sculpt empty and level.

Sculpt: Flatten to exactly 8 m. Resist the urge to “add drainage ditches” — those become trip hazards in graybox.

### East docks — Mason Flats waterfront (3 m)

East tip of Mason Flats (200, −200) → (1900, 1100).

- **Wharf deck / container apron:** **3.0 m**, flat, **80–150 m** deep from the waterline.
- **City behind the docks:** step up to **6–10 m** over two or three terraces so the dense grid does not sit in a hole. Mason Ave, E 8th, E 12th, E 18th stay on those benches.
- **Tank Hill Rd:** name is a street, not a mountain. A **12–16 m** knuckle is plenty for the water tower later. Do not build a real hill here.
- **Seawall:** vertical is a mesh, not landscape. Landscape should meet the water at **2–3 m** with a short slope.

Sculpt: Flatten the apron, then a wide Ramp inland. Low Noise only in back lots, not on the dock face.

### West woods — Pearl Row / Harbor (rolling 12–28 m)

AABB: (−1900, −400) → (−200, 1200). Clean urban plus woods on the peninsula.

- **Peninsula spine:** rolling **12–28 m**. Peaks are broad knolls, not spikes. Highest knoll **~28 m** near (−1400, 600), wooded.
- **Harbor / Civic floor:** **6–10 m**, flatter, for City Hall, hospital, casino, ferry, brownstones.
- **Ferry landing:** drop to **3–4 m** at the water, same language as the east docks but narrower.
- **Transition to Belvedere:** the woods climb toward the north ridge. Do not put a cliff on the district line; blend **28 m → 40 m** over **200 m**.
- **Transition to the basin:** south edge of Pearl Row falls toward Foundry. Hold **12–16 m** until Y ≈ −200, then drop.

Sculpt: large Smooth + mild Noise (amplitude **2–4 m**, frequency low). Flatten only the civic blocks and street corridors. Leave the peninsula messy so trees have slopes to sit on.

## City benches (Port Rook)

The four urban districts share a mid-island “bench” so the grid can stay walkable.

| Patch | Typical Z | Notes |
|---|---|---|
| Belvedere streets (south of ridge) | 18–38 m | climb with the hill; no 10 m walls between lots |
| Pearl Row civic | 6–10 m | flat blocks, woods roll around them |
| Mason Flats grid | 6–12 m | worn brick, slight east tilt toward the docks |
| Foundry / Kiln streets | 3–8 m | lowest city; I-9 berm at 8–10 m |
| Beach / ocean lip (all coasts) | 2–4 m | always above sea except The Cut mouths |

Slope budget for **drivable** surfaces (I-9, arterial streets, airfield, docks): **≤ 6%** except the north-ridge approaches, which may hit **8%** for a short run. Pedestrian lots and woods may be steeper.

## I-9 and the ring berm

I-9 is a road spline (see `wiki/roads.md`), but the landscape should offer a **1–2 m berm** under the ring so the highway reads as raised, not painted on a slope.

- **North arc:** ride the **18–30 m** contour below the ridge; do not cut the 55 m crest.
- **East arc:** stay **8–12 m**, inland of the 3 m docks.
- **South arc:** **8–10 m** berm around the 2–6 m basin.
- **West arc:** **10–16 m**, weaving the rolling woods.

Where I-9 crosses The Cut, **do not raise the canal bed**. Leave a gap; the overpass is a mesh/spline.

## Sculpt order (Unreal Landscape)

Work this order so later passes do not wreck earlier flats.

1. **Import** 2017×2017, 200 cm/quad, centered. Confirm sea plane at Z = 0.
2. **Raise the north ridge** to ~55 m. Flatten the Belvedere terrace (32–38 m) and the NE strip to **8 m**.
3. **Sink The Cut** NW→SE to **−4…−8 m**. Ramp banks. Check both ocean mouths.
4. **Flatten the south basin** to 2–10 m. Add the I-9 south berm at 8–10 m.
5. **Flatten east docks** to 3 m. Terrace Mason Flats up to 6–12 m.
6. **Roll the west woods** 12–28 m. Flatten Pearl Row civic to 6–10 m. Drop the ferry lip to 3–4 m.
7. **Pass Smooth** at large radius over district borders. No height cliffs on AABB edges.
8. **Pass low Noise** only on woods, basin dirt, and unused green. Zero noise on airfield, docks, club green, and canal bed.
9. **Erase sculpt under future KEEP footprints** just enough that graybox pads can sit level (mansions, City Hall, hospital, school, warehouses). Do not invent extra POIs.
10. **Export** the authored height PNG back to `TrapRaiders/data/` when the project exists. Until then this file is the spec.

Brush sizes that match the quad:

- **Island / ridge:** 200–400 m radius (100–200 quads)
- **District flatten:** 40–80 m
- **Street / canal bank:** 8–16 m
- **Fine lip / dock edge:** 2–4 m (1–2 quads)

Sculpt in **meters** in your head; the gizmo is centimeters. A “+5 m” raise is **+500** Unreal units.

## Height vs other agents

- **roads:** I-9, grid, canal, bridges. Height provides the berm and The Cut trench; roads do not invent new mountains.
- **ground:** splat colors follow height loosely (green high, rust low) but `wiki/ground.md` owns the palette.
- **trees:** densest on the 12–28 m west woods and the north-ridge flanks. None on the 8 m strip or 3 m docks.
- **pois:** KEEP list only. Pads listed above are hints, not new sites.
- **unreal:** import settings live in `wiki/unreal.md`. This file is the sculpt target.

## Checks before calling the field done

- North peak reads **~55 m**, not 80, not 20.
- South basin stays **2–10 m**; no random 20 m spoil piles.
- The Cut bed is **below 0** end to end, mouths open.
- NE airfield is **8 m** and visibly flat from the ridge.
- East dock apron is **3 m**.
- West woods roll **12–28 m** and blend into Belvedere without a cliff.
- No real-world city names, no extra POIs, no lab “recipes” in this file.
