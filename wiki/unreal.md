# Unreal — Bellhaven import

Owner: **agent-unreal**. **This is the game.** World spec: `wiki/README.md` + `wiki/PRODUCT.md`. Sculpt: `wiki/height.md`. Do not invent POIs, street names, or extra landscape layers. Do not treat Node HTML as the player client.

## Machine check (this PC)

| Item | Result |
|---|---|
| Epic Games Launcher | **Installed** — `C:\Program Files\Epic Games\Launcher` |
| Unreal Engine 5 | **Installed** — **UE 5.8.3** at `C:\UE\UE_5.8` |
| Editor | `C:\UE\UE_5.8\Engine\Binaries\Win64\UnrealEditor.exe` |
| PCG plugin | Present under `Engine\Plugins\PCG` |
| **The game `.uproject`** | **`Z:\AI Hangout\TrapRaiders 5.8\TrapRaiders.uproject`** |
| Newer plugin copy | `Z:\UnrealProjects\TrapRaiders\TrapRaiders.uproject` (Sloyd, phone, Interchange) |
| Bake to import | `Z:\AI Hangout\TrapRaiders\data\heightmap.r16` (2017²), `roads.json`, `lots.json`, splat bmps |
| House meshes already in Content | `Content/SloydModels/` (brick/farm/terrace/town/trap) |

Registry still lists a dead UE **4.0** path (`C:\Program Files\Epic Games\4.0\`). Ignore it. Use **5.8 only**. Desktop `Trap Raiders (UE 5.8).bat` pointing at `C:\TrapRaiders 5.8` is **stale** — do not use it.

**Hole:** Landscape is **not** imported. Maps `TrapRaiders.umap` / `TrapRaiders2.umap` are starter tiles. Next job is section 3, not “create a blank project.”

If this engine is ever uninstalled, recreate it from Epic Launcher → Unreal Engine → Library → **Engine Versions → +** → install **5.8** to `C:\UE\UE_5.8`.

---

## 1. Project already exists — do not make another

**Open** `Z:\AI Hangout\TrapRaiders 5.8\TrapRaiders.uproject`. Do **not** File→New a second TrapRaiders under Documents.

Bake originals stay in `Z:\AI Hangout\TrapRaiders\data\` (and the Cursor/Downloads copy). Junction or copy into `/Game/Bellhaven/Data` when importing.

### First-open project settings (if a setting is missing)

1. **Edit → Plugins** — enable **Procedural Content Generation Framework (PCG)**. Restart if asked.
2. **Edit → Project Settings → Engine → Rendering**: leave defaults. Do not turn on Lumen/Nanite requirements for graybox.
3. **Edit → Project Settings → Engine → World Partition**: leave default runtime hash.
4. Content Browser folders (create now):

```
/Game/Bellhaven/Maps
/Game/Bellhaven/Landscape
/Game/Bellhaven/Landscape/Layers
/Game/Bellhaven/Roads
/Game/Bellhaven/Lights
/Game/Bellhaven/Foliage
/Game/Bellhaven/Meshes/Buildings
/Game/Bellhaven/Meshes/Props
/Game/Bellhaven/Data
```

5. Copy (or junction) bake data:

```
<uproject>/Content/Bellhaven/Data/   ← Z:\AI Hangout\TrapRaiders\data\*
```

Authoring originals: `Z:\AI Hangout\TrapRaiders\data\` (PNG + JSON/CSV + `heightmap.r16`). Downloads copy is a working tree, not the only copy.

---

## 2. Open World + World Partition map

Starter maps `TrapRaiders.umap` / `TrapRaiders2.umap` are **not** Bellhaven. Make (or switch to) an Open World map named Bellhaven. Do not delete Sloyd meshes.

1. **File → New Level → Open World** if `/Game/Bellhaven/Maps/Bellhaven` does not exist.
2. **File → Save Current Level As…** → `/Game/Bellhaven/Maps/Bellhaven`
3. **Window → World Settings**: confirm **Enable World Partition** is on. One landscape for v1 — do not split into multiple Landscape actors.
4. **Window → World Partition**: set **Cell Size** to **25600** (256 m). Loading range **51200** is enough for a 4 km island.
5. World origin = island center. **+X east, +Y north, +Z up**. Data files are **meters**; Unreal is **cm** (`×100`).
6. Delete the default player-start floating in the void after the landscape exists; place a new one on the Pearl Row civic bench (~`(-80000, 40000, 1000)` as a first guess until POIs land).

---

## 3. Heightmap — 2017×2017 r16, 200 cm/quad

Source (**already written**): `Z:\AI Hangout\TrapRaiders\data\heightmap.r16` (2017×2017, 8136578 bytes). Spec: `wiki/height.md`. Encoding: `raw = 32768 + Z_m * 100`.

**Why 2017:** Unreal valid size `16 components × 2 sections × 63 quads + 1 = 2017`.

| Landscape field | Value |
|---|---|
| Quads / section | **63** |
| Sections / component | **2 × 2** |
| Number of components | **16 × 16** |
| Overall resolution | **2017 × 2017** vertices |
| Quad size | **200 cm** (2 m) |
| World extent | **2016 × 2 m = 4032 m** (~4034 m incl. last vertex) |
| Location | **(0, 0, 0)** — landscape **centered** on origin |
| Enable World Partition | **On** (already true on the Open World map) |

### r16 encoding (do this, do not use 8-bit)

- Unsigned 16-bit little-endian, row-major, **2017 × 2017**, no header.
- Midpoint **32768 = sea level (Z = 0)**.
- Authoring range: **−8 m** (The Cut bed) to **~55 m** (north ridge), spare to **62 m**.

**Recommended scale (matches `wiki/height.md` “1 height-unit → 1 cm”):**

| Scale | Value | Meaning |
|---|---|---|
| X | **200** | cm / quad |
| Y | **200** | cm / quad |
| Z | **128** | world Z(cm) = `(raw − 32768) / 128 * 128` = **raw − 32768** |

Encode with `raw = 32768 + Z_meters * 100`. Then −8 m → 31968, 0 m → 32768, 55 m → 38268, 62 m → 38968.

**Alternate (Unreal default Z):** X=200, Y=200, Z=**100**. Then `raw = 32768 + Z_meters * 128`. Pick **one** encoding and stick to it. Write the choice on the Landscape actor.

### Import steps

1. Mode toolbar → **Landscape**.
2. **Manage → New / Import from File**.
3. Heightmap File → `height.r16` (or 16-bit PNG). Confirm it reads **2017 × 2017**. If the dialog says 2016 or 2048, the file is wrong — do not pad in-engine.
4. **Scale X=200, Y=200, Z=128** (or Z=100 if using the alternate encode).
5. **Location 0,0,0**. Centered.
6. Components / sections as the table above (the importer fills this when the file is 2017²).
7. **Enable World Partition** stays on. One Landscape, many `LandscapeStreamingProxy` cells — that is correct.
8. Import. In World Partition, each proxy should cover a piece of the 4 km island.
9. If the island is mirrored N/S, re-import with **Flip Y**. Do not rotate the actor 180° — that breaks the meter-space JSON/CSV.
10. Drop a water plane (or Water plugin ocean) at **Z = 0**. The Cut bed is below 0; land elsewhere is **2–62 m**.

After import, sculpt only to match `wiki/height.md` (ridge ~55 m, basin 2–10 m, Cut −4…−8 m, docks 3 m, airfield 8 m). Export the authored height back to `TrapRaiders/data/` when the sculpt is done.

---

## 4. Four Layer Info splat maps

Spec: `wiki/ground.md`. **Exactly four** landscape layers. Weights always sum to **1.0**. Sand is a tint bump, not a fifth channel.

| Layer | Layer Info asset | Hex | Dominates |
|---|---|---|---|
| 0 | `LI_ManicuredGreen` | `#3F6E36` | N Belvedere |
| 1 | `LI_CleanUrban` | `#B9B6AE` | W Pearl Row |
| 2 | `LI_WornBrick` | `#5A4338` | E Mason Flats |
| 3 | `LI_RustDirt` | `#7A4A2E` | S Foundry + SE Kiln Spur |

Material tints (same file): Grass `#4A7C3F`, Dirt `#6E4B2A`, Asphalt `#2F2E2C`, Sand `#C4A66A`.

Expected files (when `data/` exists), each **2017 × 2017** 8-bit grayscale PNG, same orientation as the heightmap:

```
TrapRaiders/data/splat_0_green.png
TrapRaiders/data/splat_1_urban.png
TrapRaiders/data/splat_2_brick.png
TrapRaiders/data/splat_3_dirt.png
```

Packed RGBA (`splat_rgba.png`, R=0 G=1 B=2 A=3) is also fine — split in the import dialog.

### Create Layer Infos

1. Content Browser → `/Game/Bellhaven/Landscape/Layers`.
2. Right-click → **Miscellaneous → Landscape Layer Info** × 4. Names above.
3. Each: **No Weight Blend** = off (we want weight-blended). **Phys Material** later.

### Landscape material (minimum)

1. Create `M_BellhavenGround` (Landscape material) in `/Game/Bellhaven/Landscape`.
2. Four **Landscape Layer Blend** nodes (or one `LB Height Blend` / `LB Weight Blend` with four layers named `green`, `urban`, `brick`, `dirt`).
3. Each layer: a cheap tiled base (or a Constant3Vector of the hex) × that layer’s tint.
4. Assign `M_BellhavenGround` on the Landscape actor.
5. Landscape Mode → **Paint** → create/assign the four Layer Infos so the layer names match the material.

### Import weightmaps

1. Landscape Mode → **Manage → Import**.
2. Same heightmap (or skip height if already imported).
3. **Layers** section → add four slots → assign each Layer Info → **Weightmap** file for that layer.
4. Import. Confirm interiors of each district AABB sit at **≥ 0.85** on the dominant layer, with **80–120 m** blends on borders (`wiki/ground.md`).
5. Do **not** add a fifth Layer Info for sand. If a sand weight PNG appears later, add it as a material-only wetness/tint, not a new landscape layer.

---

## 5. Spline roads from `roads.json`

Spec: `wiki/roads.md` (roads agent) + named streets in `CITY_MAP.md`. Source: `TrapRaiders/data/roads.json`.

Unreal has **no** native JSON-to-spline importer. Use an **Editor Utility Widget** or **Editor Python** once, then save the actors.

### Expected JSON (meters, island center)

```json
{
  "crs": "bellhaven-meters",
  "origin": [0, 0, 0],
  "roads": [
    {
      "id": "I-9",
      "name": "I-9",
      "type": "highway",
      "width_m": 16,
      "points": [{ "x": 0.0, "y": 0.0, "z": 10.0 }]
    }
  ]
}
```

`type` values to expect: `highway` (I-9), `arterial`, `street`, `bridge`. Bridges: Cut Bridge, Oriole Crossing, Harbor Span, I-9 South Ramp, Kiln Overpass — spline over The Cut, **do not fill the canal**.

### Blueprint / spline setup

1. Create `BP_RoadSpline` (Actor) with a **Spline Component** + a **Spline Mesh** (or a decal / Landscape spline, your choice for graybox).
2. Defaults: mesh a flat 400 cm strip (or engine Cube scaled to `width_m * 100` × 20 cm thick). Highway wider than streets.
3. Convert each point: `FVector(x * 100, y * 100, z * 100)`.
4. **Project onto landscape** after spawn (`Landscape -> Get Height`) so the spline rides the berm. Bridges skip projection and keep authored Z so they clear The Cut.

### Editor Python (run once from **Output Log → Cmd: `py`**, or `Tools → Execute Python Script`)

```python
import json, unreal

path = r"C:\Users\uybuv\Downloads\TrapRaiders\data\roads.json"
editor = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
bp = unreal.EditorAssetLibrary.load_asset("/Game/Bellhaven/Roads/BP_RoadSpline")

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for road in data["roads"]:
    actor = editor.spawn_actor_from_object(bp, unreal.Vector(0, 0, 0))
    actor.set_actor_label(road.get("name") or road["id"])
    spline = actor.get_component_by_class(unreal.SplineComponent)
    pts = road["points"]
    spline.clear_spline_points(False)
    for i, p in enumerate(pts):
        loc = unreal.Vector(p["x"] * 100.0, p["y"] * 100.0, p["z"] * 100.0)
        spline.add_spline_point(loc, unreal.SplineCoordinateSpace.WORLD, i == len(pts) - 1)
    spline.set_closed_loop(bool(road.get("closed", False)))
```

Save the spawned actors into the Bellhaven map (World Partition will stream them by cell). I-9 is the ring/spine; district grids are separate polylines. Do not invent extra highways.

**Landscape Splines alternative:** Landscape Mode → **Manage → Splines**. Import is still manual / Python (`LandscapeSplineControlPoint`). Same ×100 convert. Use this only if you want the highway to carve a 1–2 m berm (`wiki/height.md`).

---

## 6. Instanced lights from `lights.csv`

Spec: `wiki/lights.md`. Source: `TrapRaiders/data/lights.csv`. **One** pole + fixture mesh for the whole island. Districts change spacing / CCT / intensity / flicker — not the mesh.

### Expected CSV (meters)

```
x,y,z,cct,intensity,dead,flicker,district
-180,1520,7.5,2700,1.00,0,0,N
```

| Column | Meaning |
|---|---|
| `x,y` | island-center meters |
| `z` | fixture height, usually **7.5 m** (pole still sits on terrain) |
| `cct` | Kelvin (N 2700, W 4000, E mixed, S/SE ~2200) |
| `intensity` | multiplier (N=1.00, W=1.25, E=0.70–1.10, S/SE=0.55) |
| `dead` | `1` = mesh on, Lights off (East ~15%) |
| `flicker` | `1` = S/SE sodium pulse |
| `district` | `N` `W` `E` `S` `SE` |

### Setup

1. Import or placeholder a single pole mesh → `/Game/Bellhaven/Lights/SM_Streetlight`. Fixture **7.5 m**. Until a mesh exists, use a Cylinder 15 cm × 750 cm + a downward Spot.
2. Create `BP_Streetlight` with: Static Mesh (pole) + **Spot Light** (inner cone ~25°, outer ~40°, aimed −Z, slight inward tilt).
3. Create `HISM_Streetlights` **or** let PCG instance the mesh and spawn `BP_Streetlight` only where `dead==0` / flicker needs a component.

Graybox path that matches the spec (instances for mesh, unique lights for behavior):

1. One **Hierarchical Instanced Static Mesh** for every row (including dead). Location `(x*100, y*100, ground_z)`, yaw along the road.
2. For each row with `dead==0`, spawn a Spot Light at `(x*100, y*100, ground_z + 750)`:
   - Temperature = `cct`
   - Intensity = `8000 * intensity` lumens as a starting point (tune in-engine, keep **relative** ratios).
   - Use Temperature = on.
3. Flicker: add a short timeline / `sin` on intensity for `flicker==1` only. Do not sync poles.

### Editor Python sketch

```python
import csv, unreal

csv_path = r"C:\Users\uybuv\Downloads\TrapRaiders\data\lights.csv"
editor = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
pole_bp = unreal.EditorAssetLibrary.load_asset("/Game/Bellhaven/Lights/BP_Streetlight")

with open(csv_path, newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        loc = unreal.Vector(float(row["x"]) * 100.0, float(row["y"]) * 100.0, float(row["z"]) * 100.0)
        actor = editor.spawn_actor_from_object(pole_bp, loc)
        actor.set_actor_label(f"SL_{row.get('district','?')}")
        # BP exposes CCT / Intensity / Dead / Flicker on the instance
        actor.set_editor_property("cct", float(row["cct"]))
        actor.set_editor_property("intensity_mul", float(row["intensity"]))
        actor.set_editor_property("dead", row["dead"].strip() in ("1", "true", "True"))
        actor.set_editor_property("flicker", row["flicker"].strip() in ("1", "true", "True"))
```

Reject any light whose XY is in The Cut, ocean (ground ≤ 0), or >4 m from a road — the CSV should already be clean; do not re-scatter.

---

## 7. PCG / foliage from `trees.csv`

Spec: `wiki/trees.md`. Source: `TrapRaiders/data/trees.csv`. Four foliage types only: `oak`, `maple`, `ailanthus`, `dead`.

### Expected CSV (meters)

```
x,y,z,species,scale,yaw
-1400,600,18,oak,1.05,137
```

| Column | Meaning |
|---|---|
| `x,y,z` | meters, island center (`z` = ground; snap to landscape on import) |
| `species` | `oak` / `maple` / `ailanthus` / `dead` |
| `scale` | uniform (oak/maple 0.85–1.25, ailanthus 0.55–1.05, dead 0.70–1.10) |
| `yaw` | degrees, random |

Hard exclusions (CSV should already omit): I-9 ±36 m, The Cut ±28 m, airfield AABB (1100,1400)→(1900,2000), ocean / beach below ~4 m.

### Foliage types

1. Placeholder or Quixel meshes in `/Game/Bellhaven/Foliage` (`SM_Oak`, `SM_Maple`, `SM_Ailanthus`, `SM_Dead`).
2. Right-click each → **Create Foliage Type** → `FT_Oak`, `FT_Maple`, `FT_Ailanthus`, `FT_Dead`.
3. Min spacing from the spec: oak **8 m**, maple **7 m**, ailanthus **4 m**, dead **6 m**.
4. Do **not** use Landscape Grass for trees. Do **not** plant on I-9 or the NE strip.

### PCG graph (preferred)

1. Create `PCG_BellhavenTrees` in `/Game/Bellhaven/Foliage`.
2. Drop a **PCG Volume** covering the island (extent ~ ±201600 uu, Z ±10000).
3. Graph: **Input → Load CSV / Input Points** (or an Editor Utility that converts CSV → `PCGPoint` array / `Data Table`).
4. **Match` species` → four **Static Mesh Spawner** (or **Mesh Spawner**) nodes, one per foliage type.
5. Apply `scale` and `yaw`. **Projection** onto Landscape so roots sit.
6. Exclusion volumes: I-9 corridor, The Cut, airfield AABB — Density = 0, even if a bad row sneaks in.
7. Generate. Cell size mentally **10000 uu** (100 m) to match the density table; the CSV is already per-tree, so do not re-roll density in PCG.

### Foliage Mode fallback (no PCG)

**Foliage Mode → Paint** with the four types, then **Foliage → Place** from a script, or import via:

```python
import csv, unreal

# one ISM actor per species
# add_instance(unreal.Transform(
#   location=unreal.Vector(x*100, y*100, z*100),
#   rotation=unreal.Rotator(0, yaw, 0),
#   scale=unreal.Vector(s, s, s)))
```

Same ×100 rule. Random yaw already in the CSV — do not grid them.

---

## 8. Import the FBX dump (no `.uproject` in this folder)

Current `C:\Users\uybuv\Downloads\TrapRaiders` contents that belong in Content (skip `.exe` / `.zip` / wiki):

| File | Suggested dest | Use |
|---|---|---|
| `abandonedhouse.fbx` | `/Game/Bellhaven/Meshes/Buildings` | KEEP abandoned |
| `brickhouse.fbx` | Buildings | East / south house |
| `damagedhouse.fbx` | Buildings | Worn east / south |
| `farmhouse.fbx` | Buildings | North / west house |
| `semidetachedhouse.fbx` | Buildings | West brownstone stand-in |
| `terracedhouse.fbx` | Buildings | West / east row |
| `townhouse.fbx` + `townhouse (1).fbx` | Buildings | Apartment-adjacent; pick one if duplicates |
| `woodencottage.fbx` | Buildings | North cottage |
| `1.fbx` | Buildings | Inspect in FBX viewer first — unnamed |
| `cornershop.fbx` | Buildings | East convenience / liquor |
| `garagebuilding.fbx` + `cook garage.fbx` | Buildings | Garages |
| `cokebrick.fbx` `frostedblock.fbx` `pressedblock.fbx` `wrappedblock.fbx` | `/Game/Bellhaven/Meshes/Props` | Graybox crates — **not** lab recipes |
| `rifles.fbx` `submachinegun.fbx` | `/Game/Bellhaven/Meshes/Props` | Weapon meshes; do not place as world dressing |
| `xsdiv9ph.obj` | optional | Ignore unless it is a landscape proxy |
| `bellhaven-satellite.jpg` | `/Game/Bellhaven/Maps` | Align-only overlay, not a splat |

### FBX import options (batch)

1. Content Browser → `/Game/Bellhaven/Meshes/Buildings` → **Import**.
2. Multi-select the building FBXs (not the weapons / zip / exe).
3. Dialog:

| Option | Value |
|---|---|
| Import Type | **Static Mesh** |
| Convert Scene / Convert Scene Unit | **On** |
| Transform Vertex to Absolute | On |
| Mesh Uniform Scale | **1.0** if the FBX is already cm; **100** if it is meters (check first asset: a door should be ~200 cm, not 2 cm) |
| Generate Lightmap UVs | On |
| Combine Meshes | **On** per file (one actor per building) |
| Import Materials / Textures | On if packed; otherwise a gray `M_Graybox` |
| Auto Generate Collision | **Simple** (complex as simple off for houses) |

4. Repeat for props into `/Game/Bellhaven/Meshes/Props`.
5. Place **only** KEEP POIs from `wiki/pois.md` / `CITY_MAP.md`. Apartments = 8, labs = 4. No stadium, no subway. Unused house FBXs stay in Content as extras.

---

## 9. Import order (do not skip)

1. Create `TrapRaiders` blank BP project (Documents path above). Enable **PCG**. New **Open World** level `Bellhaven`.
2. Import **2017² r16** height, **200 cm/quad**, World Partition on, origin centered.
3. Water at Z = 0. Check ridge ~55 m, basin 2–10 m, Cut below 0.
4. Create four **Layer Info** assets. Import four splat weightmaps. Assign `M_BellhavenGround`.
5. When `data/roads.json` exists: Python / EUW → `BP_RoadSpline`. Project to landscape; bridges skip.
6. When `data/lights.csv` exists: HISM poles + per-row lights. One mesh.
7. When `data/trees.csv` exists: PCG (or ISM) with four foliage types. Exclusions on.
8. Batch-import building FBXs. Drop KEEP POIs only.
9. Named signs from `wiki/signs.md` (one corner per name) — signs agent owns the list.
10. Save. World Partition → **Build / Generate Streaming Sources** if prompted. PIE from Pearl Row.

---

## 10. Units cheat sheet

| Data | Unreal |
|---|---|
| 1 m | 100 uu |
| Island 4000 m | 400000 uu |
| Landscape 4032 m | 403200 uu |
| Quad 2 m | 200 uu |
| Sea / Cut surface | Z = 0 |
| North peak ~55 m | Z ≈ 5500 |
| Streetlight fixture | Z = ground + 750 |
| Foliage cell 100 m | 10000 uu |

---

## Out of scope (this file)

- Authoring the height PNG/r16, splat PNGs, `roads.json`, `lights.csv`, `trees.csv` — other agents.
- Extra POIs, real city names on signs, a fifth splat layer, a second streetlight mesh, trees on I-9 / the airfield.
- Networking, dedicated server, marketplace packs. Quixel/Fab is already on this 5.8 install if you need placeholder trees/poles later.
