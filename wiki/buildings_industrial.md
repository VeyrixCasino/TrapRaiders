# Industrial buildings — KEEP

Owner: **agent-buildings-industrial**. Graybox only. **KEEP pads from `wiki/pois.md` only.** No extras, no stadium, no subway, no dead-lot pad (that POI is not this file).

Coords: meters, origin island center, **+X east, +Y north, +Z up**. `z` is the ground guess from `wiki/pois.md`. Footprint `w` = X extent, `d` = Y extent. Anchor = footprint center. Unreal: ×100 to cm.

District AABBs and street names: `wiki/README.md`, `CITY_MAP.md`, `wiki/signs.md`. Place the actor on the pad; keep the pad **off the pavement** (`wiki/roads.md`).

---

## Counts (this file)

| Type | N | W | E | S | SE | Total |
|---|---:|---:|---:|---:|---:|---:|
| lab | 0 | 0 | 1 | 2 | 1 | **4** |
| warehouse | 0 | 0 | 1 | 2 | 0 | **3** (one fight club) |
| garage | 0 | 1 | 1 | 1 | 0 | **3** |
| abandoned | 0 | 0 | 1 | 1 | 0 | **2** |
| junkyard | 0 | 0 | 0 | 1 | 0 | **1** |
| power | 0 | 0 | 0 | 1 | 0 | **1** |
| trailer park | 0 | 0 | 0 | 1 | 0 | **1** |
| fenced goods | 0 | 0 | 0 | 1 | 0 | **1** |
| tent city | 0 | 0 | 0 | 1 | 0 | **1** |
| **all** | **0** | **1** | **4** | **11** | **1** | **17** |

---

## FBX map

Dump files live in `C:\Users\uybuv\Downloads\TrapRaiders`. Import dest: `/Game/Bellhaven/Meshes/Buildings` (`wiki/unreal.md`).

| File | Use on KEEP |
|---|---|
| `garagebuilding.fbx` | **Harbor Pit** (`w-garage-01`), **Grid Pit** (`e-garage-01`) |
| `cook garage.fbx` | **Foundry Pit** (`s-garage-01`) — south cook / industrial bay, next to the Kiln labs |
| `abandonedhouse.fbx` | **Hollow Storefront** (`e-abandoned-01`), **Dead Bay Shop** (`s-abandoned-01`) |

No lab / warehouse / yard / tent / trailer / substation FBX in the dump. Those pads are **graybox boxes** (or fence + crate dressing) scaled to the footprint. `cokebrick.fbx` / `frostedblock.fbx` / `pressedblock.fbx` / `wrappedblock.fbx` are crate props only — **not** lab recipes, not extra buildings.

Import options: Static Mesh, Combine Meshes on, Convert Scene on. Door ~200 cm. Same batch rules as `wiki/unreal.md` §8.

---

## All KEEP industrial

| id | name | district | x | y | z | w | d | mesh |
|---|---|---|---:|---:|---:|---:|---:|---|
| e-lab-01 | Flats Assay | E | 1400 | 480 | 8 | 36 | 28 | graybox box |
| s-lab-01 | Kiln Assay | S | -180 | -720 | 6 | 36 | 28 | graybox box |
| s-lab-02 | Foundry Bench | S | 220 | -980 | 5 | 36 | 28 | graybox box |
| se-lab-01 | Rail Bench | SE | 1420 | -980 | 7 | 36 | 28 | graybox box |
| e-warehouse-01 | East Slip Shed | E | 1680 | 200 | 5 | 50 | 36 | graybox shed |
| s-warehouse-01 | Ring Shed | S | -420 | -560 | 7 | 50 | 36 | graybox shed |
| s-warehouse-02 | Chainlink Pit | S | 80 | -640 | 6 | 48 | 32 | graybox shed (**fight club**) |
| w-garage-01 | Harbor Pit | W | -520 | -160 | 8 | 32 | 24 | `garagebuilding.fbx` |
| e-garage-01 | Grid Pit | E | 420 | 80 | 9 | 32 | 24 | `garagebuilding.fbx` |
| s-garage-01 | Foundry Pit | S | -520 | -760 | 6 | 32 | 24 | `cook garage.fbx` |
| e-abandoned-01 | Hollow Storefront | E | 1280 | 620 | 10 | 14 | 12 | `abandonedhouse.fbx` |
| s-abandoned-01 | Dead Bay Shop | S | -640 | -1100 | 5 | 14 | 12 | `abandonedhouse.fbx` |
| s-junkyard | Rook Scrap | S | -360 | -1360 | 4 | 80 | 60 | open yard (no building FBX) |
| s-power | Basin Substation | S | 720 | -1320 | 5 | 32 | 24 | graybox gear + fence |
| s-trailer-park | Basin Pads | S | 280 | -1480 | 4 | 70 | 50 | graybox trailers **inside** pad |
| s-fenced-goods | Chainlink Yard | S | 400 | -1120 | 5 | 24 | 20 | fence + crate props |
| s-tent-city | South Ramp Camp | S | -120 | -1240 | 4 | 50 | 30 | graybox tents **inside** pad |

Unreal location: `(x * 100, y * 100, z * 100)`. Scale the mesh so XY matches `w` × `d`. Yaw faces the nearest named street unless noted.

---

## Labs (4)

Same footprint **36 × 28**. Low brick / sheet-metal bench, not a campus. South flicker sodium (`wiki/lights.md`). East mixed.

| id | Faces | Notes |
|---|---|---|
| e-lab-01 Flats Assay | Tank Hill / E 18th | Mason Flats working-class assay. East of the apartment grid, west of the dock warehouse. |
| s-lab-01 Kiln Assay | Foundry | Pair with Foundry Pit (`cook garage.fbx`) to the west. |
| s-lab-02 Foundry Bench | Neon Liquor / Foundry | Deeper in the basin. |
| se-lab-01 Rail Bench | Kiln Rd / Spur | Only KEEP pad in **Kiln Spur**. Rail apron, table-flat 4–8 m (`wiki/height.md`). |

Do not add a fifth lab. Units do not live here.

---

## Warehouses (3)

| id | Faces | Notes |
|---|---|---|
| e-warehouse-01 East Slip Shed | dock apron | **East dock tip.** Ground ~5 m. Shed toward the water, not in it. |
| s-warehouse-01 Ring Shed | Foundry / ring inside | Standard shed, **50 × 36**. |
| s-warehouse-02 Chainlink Pit | Chainlink / Foundry | **Fight club.** Same shed family, **48 × 32**. Interior is a ring — still one footprint, not a stadium. |

One mesh family (graybox box, taller than labs). Fight club does **not** get a second building.

---

## Garages (3)

| id | Faces | Mesh |
|---|---|---|
| w-garage-01 Harbor Pit | Civic Way / Pike | `garagebuilding.fbx` — cleaner civic bay |
| e-garage-01 Grid Pit | Bodega St / E 8th | `garagebuilding.fbx` — same mesh, worn |
| s-garage-01 Foundry Pit | Foundry | `cook garage.fbx` — industrial cook bay |

Bay doors toward the street. Do not park a fourth garage.

---

## Abandoned (2)

Both use **`abandonedhouse.fbx`**. Small **14 × 12** storefronts, not mansions, not extra houses.

| id | Faces | Notes |
|---|---|---|
| e-abandoned-01 Hollow Storefront | E 18th / Tank Hill | Prefer a dead streetlight on this block (`wiki/lights.md`). |
| s-abandoned-01 Dead Bay Shop | Junkyard Cut / Foundry | South-west basin, near Rook Scrap. |

---

## Yards and camps (5)

Dressing stays **inside** the KEEP pad. Do not add new POI ids.

**s-junkyard — Rook Scrap** (80 × 60)  
Open scrap. Fence the pad. Graybox piles / hulks only. Street: **Junkyard Cut**. Trees stay industrial-sparse (`wiki/trees.md`). No warehouse mesh.

**s-power — Basin Substation** (32 × 24)  
Graybox transformers + chainlink. No extra towers (Tank Hill Tower is a different POI, not this file). Keep the pad clear of I-9 pavement.

**s-trailer-park — Basin Pads** (70 × 50)  
Several graybox trailers **inside** this one pad. Far south basin (~4 m). Do not scatter pads outside the AABB.

**s-fenced-goods — Chainlink Yard** (24 × 20)  
Locked lot, not a warehouse. Fence + crate props (`cokebrick` / `pressedblock` ok). Street: **Chainlink**.

**s-tent-city — South Ramp Camp** (50 × 30)  
Per `wiki/pois.md`: sits under the **I-9 South Ramp** / overpass. Graybox tents only, inside the pad. No field scatter. Lights only if a named road runs the edge — no camp lanterns (`wiki/lights.md`).

---

## District read-through

**West — Pearl Row.** One garage: Harbor Pit. Civic / Pike, clean LED. No labs or yards in West.

**East — Mason Flats.** Flats Assay, East Slip Shed on the dock tip, Grid Pit, Hollow Storefront. Worn brick. Docks stay at ~5 m.

**South — Foundry Ward.** The industrial sink: two labs, two warehouses (fight club = Chainlink Pit), Foundry Pit, Dead Bay Shop, Rook Scrap, Basin Substation, Basin Pads, Chainlink Yard, South Ramp Camp. Rust dirt, basin 3–8 m, flicker sodium.

**SE — Kiln Spur.** Rail Bench only. Same industrial read as South.

**North.** Nothing in this file.

---

## Place in Unreal

1. Import the three FBXs into `/Game/Bellhaven/Meshes/Buildings`.
2. Spawn **17** actors at the table XY (×100). Snap Z to landscape after sculpt; authored `z` is the guess.
3. Scale garages / abandoned meshes to `w` × `d`. Labs and sheds are boxes of that size, eave ~6–8 m.
4. Yards: one empty pad actor or a folded fence volume — still one KEEP id each.
5. Trailers and tents are **child dressing**, not new KEEP rows.

---

## Do not

- Invent extra labs, warehouses, garages, yards, or a second fight club.
- Use house FBXs (`brickhouse`, `farmhouse`, `townhouse`, …) on these pads.
- Place `rifles.fbx` / `submachinegun.fbx` as world dressing.
- Move East Slip Shed off the dock tip, or move South Ramp Camp off its authored XY.
- Add a stadium mesh for Chainlink Pit.
- Author `s-dead-lot` here (not industrial KEEP for this file).
