# Mason Flats (E)

Owner: **agent-sector-east**. Units: **meters**. Origin: island center. **+X east, +Y north, +Z up**. Unreal: ×100 to cm.

Island: **Bellhaven**. City: **Port Rook**. Fictional names only. Do not invent KEEP pads. Do not edit generators.

Dense working-class grid, worn brick, mixed lamps (some dead), container docks on the east tip. Big-building pads on a **108 × 100** city module. Four named apartment stacks. I-9’s **city spine** cuts the grid northeast; **nine dock fingers** reach the water.

| | |
|---|---|
| AABB | (200, −200) → (1900, 1100) |
| Ground | worn brick (`wiki/ground.md` layer 2, `#5A4338`) |
| Bake lots | **226** of 1862 (`district: "E"`). **217** sit inside the AABB; the north city row at **Y 1140** overruns the box by 40 m |
| Lot field | x **280…1718**, y **−60…1140** |
| Lot Z | city **2.72–15.74** m; house **3.50–13.36** m. Docks ~3–5 m, grid benches ~7–12 m, Tank Hill knuckle ~18 m (`wiki/height.md`) |
| Block module | `lots.block.east`: **ns 108** / **ew 100** — city: big building + sidewalk |
| Lights | mixed **2700 / 4000 K**, **18–24 m**, **15% dead** (`wiki/lights.md`) |
| Trees | scrappy ailanthus. Streets **ES (6)**. Docks **ED (2)**. A few neglected interiors **EL (8)** (`wiki/trees.md`) |

Pads only. **No houses placed** as meshes. KEEP landmarks stay named; neighborhood fill shares interiors (`wiki/housing.md`). All **147** island `city_block` rows live here — west and north do not use this kind.

---

## Street fabric

Mason Ave is the N–S arterial. E 8th / E 12th / E 18th are the signed E–W streets. The generated `e-ns-*` / `e-ew-*` fill sits on the same **108 × 100** module. The grid **stops before the water**; fingers and `e-waterfront` take the last 80–150 m apron.

I-9 does **not** ring the docks. The highway through this district is **`I-9-city`** (South Ramp → airport join). `east-dock-expwy` is an arterial peel, not a second freeway.

### Named (signs + KEEP)

| Id | Class | W | Role |
|---|---|---:|---|
| `mason-ave` | arterial | 12 | N–S spine. x ≈ **760**. Sign (760, 420). Twelfth Mart sits on this curb. Bake: [760, −161] → [760, 1040] |
| `e-8th` | street | 8 | y = **40**. Sign (540, 40). Crosses Mason at [760, 40]. Bake: [201, 40] → [1820, 40] |
| `e-12th` | street | 8 | y = **310**. Sign (880, 310). Crosses Mason at [760, 310]. Bake: [202, 311] → [1821, 310] |
| `e-18th` | street | 8 | y = **640**. Sign (1240, 640). Crosses Mason at [760, 640]. Bake: [240, 640] → [1820, 640] |
| `bodega-st` | street | 8 | x = **380**. Sign (380, 80). Mason Pump is on this line. Bake: [380, −160] → [380, 640] |
| `laundry-line` | street | 8 | y = **180**. Sign (640, 180). Bake: [198, 180] → [1493, 180] |
| `pawn-row` | street | 8 | y = **20**. Sign (320, 20). Short, west of Mason. Bake: [201, 20] → [760, 20] |
| `tank-hill-rd` | street | 8 | Knuckle, not a mountain. Sign (1580, 860). `shoreEnd`. Bake: [1065, 818] → [1760, 860] |

### Generated `e-*` grid (bake)

N–S streets sit near the **108 m** column seams (x ≈ 200, 308, 416, 632, 740, 848, 956, 1064, 1280, 1388, 1496, 1604, 1712, 1820). E–W streets sit near the **100 m** row seams (y ≈ −160, −60, 140, 240, 340, 440, 640, 740, 840, 940, 1040, 1140, 1240, 1340). Named overlays (`mason-ave`, `e-8th`, …) share those seams.

| Prefix | Count | W | What |
|---|---:|---:|---|
| `e-art-ns-*` / `e-ns-*` | 22 | 7 or 12 | N–S grid. Arterials at the west edge (~200), Mason band (~740), mid-east (~1280), dock edge (~1820) |
| `e-art-ew-*` / `e-ew-*` | 19 | 7 or 12 | E–W grid. Arterials at the south edge (~−160), mid (~240), E 18th band (~640), north (~1040) |
| `e-waterfront` | 1 | 9 | Shore arterial. [1603, −95] → [1425, 952]. `shoreEnd`. xmax **1958** |
| `east-dock-expwy` | 1 | 12 | Arterial peel from I-9-city at **[1180, 820]** down to [1784, 341] |
| `e-dock-0`…`e-dock-8` | 9 | 6 | Dock fingers. See below |
| `e-dock-4-bulb` | 1 | 6 | Cul-de-sac bulb on Rust Finger |

North-id and south-id roads that clip the AABB are **edges**, not Mason fabric.

---

## Lot kinds

`data/lots.json` note: *Buildable pads only. No houses placed. `city_block` = big building, `park_court` = park/basketball, `civic` = important building.* East has **no** `res_2house` and **no** `yard` in the district tag.

| Kind | Count | Pad | Raid? | Notes |
|---|---:|---|---|---|
| `city_block` | **147** | **92 × 84** | yes | One door, one `instanceId` `city_block-E-*`, pocket `z − 16`. Sit inside the **108 × 100** cell (16 m left for street + sidewalk) |
| `house` | **62** | **16 × 32** | yes | `instanceId` `house-E-*`. Terrace rows, not the KEEP 14 × 12 Cinderblock House |
| `park_court` | **9** | 92 × 84 | no | Same cell as city blocks. Weeds End is the named neglected lot, not these nine |
| `civic` | **8** | 92 × 84 | no | Gaps for school / assay / tower, not extra shops |
| **E total** | **226** | | | |

City-block interiors (shared templates, different instanceIds):

| `templateId` | Count |
|---|---:|
| `int_apt_walkup` | 57 |
| `int_apt_1bed` | 52 |
| `int_apt_studio` | 38 |

House interiors:

| `templateId` | Count |
|---|---:|
| `int_damaged` | 21 |
| `int_terrace` | 18 |
| `int_brick` | 12 |
| `int_townhouse` | 11 |

Walk-up basement **3.4 m** (22 × 18 air). House basement **2.8 m**. Do not fill with dirt. Bake doors on city blocks face **S**.

Sample `city_block`: `lot-0` (314, −60, z 8.93) `int_apt_walkup` `city_block-E-0`, door (314, −95.3) S.

Sample `house`: `lot-164` (280, 548, z 8.93) `int_townhouse` `house-E-164` — same template as `lot-166` (434, 548); different `instanceId`, different pocket.

---

## Grid (108 × 100)

Column centers (x), step **108**:

`314, 422, 530, 638, 746, 854, 962, 1070, 1178, 1286, 1394, 1502, 1610, 1718` — **14** cols.

Row centers (y), step **100**:

`−60, 40, 140, 240, 340, 440, 540, 640, 740, 840, 940, 1040, 1140` — **13** rows.

14 × 13 = **182** cells. **147** hold `city_block`. The other **35** are park (9), civic (8), I-9 / spine cuts, dock-edge dropouts, and the north overrun.

| Gap band | x | What |
|---|---:|---|
| Park columns | 530, 1070, 1610 | `park_court` at y 40 / 440 / 840 |
| Civic columns | 638, 1394 | `civic` at y 40 / 340 / 640 / 940 |
| West missing | 314 @ y 40, 140, 240 | Bodega / Pawn Row / Mason Pump band |
| East missing | 1502–1718 @ y ≥ 840 | Tank Hill + dock apron; no stacks in the water |

House pads are **not** on the 108 × 100 lattice. They are 16 × 32 stoops on five E–W rows:

| y | n | Read |
|---:|---:|---|
| 348 | 2 | Between E 12th and Laundry Line |
| **548** | **44** | Main terrace. Cinderblock House KEEP sits north of this row at (560, 720) |
| 748 | 2 | Between E 18th and Tank Hill |
| 848 | 8 | Tank Hill band |
| 948 | 6 | North grid, still below the Y 1140 city row |

---

## I-9 city spine

`I-9-city` · `highway` · **w 18** · 28 pts. Not closed.

Joins **`I-9-ring`** at the South Ramp **[460, −280]** and **`I-9-airport`** at **[1480, 1400]**. Diagonal **southwest → northeast** through Mason Flats. Tree keep-out ±**36** m (`wiki/trees.md`). Slope ≤ **6%**.

```
[[460, -280], [491, -156], [515, -59], [520, -40], [594, 138], [612, 180],
 [620, 200], [630, 216], [649, 246], [690, 310], [707, 337], [740, 402],
 [760, 420], [789, 446], [846, 498], [945, 588], [980, 620], [1000, 640],
 [1063, 703], [1096, 736], [1180, 820], [1184, 827], [1187, 831], [1257, 941],
 [1320, 1040], [1400, 1240], [1403, 1247], [1480, 1400]]
```

| Vertex | Why it is here |
|---|---|
| [460, −280] | I-9 South Ramp. Ring + The Cut. Spine begins |
| [690, 310] | Crosses **E 12th** |
| [760, 420] | Crosses **Mason Ave** at the named sign / Twelfth Mart curb |
| [1000, 640] | Crosses **E 18th** |
| [1180, 820] | **Tank Hill Tower** band. `east-dock-expwy` peels southeast |
| [1480, 1400] | Airport join. Leaves the Flats AABB |

The spine is **inland of the 3 m docks**. It does not become a waterfront freeway. City-block cells along the diagonal are the missing 108 × 100 slots — do not pave those pads back over the highway.

---

## Dock fingers

East tip. Wharf deck **3.0 m**, apron **80–150 m** deep (`wiki/height.md`). Lights on the road, not on the water. East Slip Shed (1680, 200) sits on the apron, toward the water, not in it.

`e-waterfront` is the N–S shore arterial. Nine **6 m** fingers run **east from ~1600–1680** toward x **1800–1958**. Spacing ~**88 m** north–south. Names below are invented street labels for the existing `e-dock-*` ids — **not** new KEEP pads.

| Id | Name | y (approx) | End x | Notes |
|---|---|---:|---:|---|
| `e-dock-0` | **Cinder Slip** | 40 | 1907 | E 8th water. South finger |
| `e-dock-1` | **Bodega Finger** | 128 | 1958 | Between E 8th and Laundry Line |
| `e-dock-2` | **Shed Reach** | 216 | 1958 | East Slip Shed (1680, 200) sits on this apron |
| `e-dock-3` | **Twelfth Slip** | 310 | 1958 | E 12th water |
| `e-dock-4` | **Rust Finger** | 392 | 1958 | `culdesac` + `e-dock-4-bulb` at [1680, 392] |
| `e-dock-5` | **Assay Reach** | 480 | 1912 | Flats Assay band (1400, 480) is inland, west of the finger |
| `e-dock-6` | **Line Finger** | 568 | 1853 | Toward Line Drop / E 18th |
| `e-dock-7` | **Eighteenth Slip** | 656 | 1803 | E 18th water |
| `e-dock-8` | **Tank Slip** | 736 | 1751 | Shortest. Tank Hill Rd is the inland climb |

`east-dock-expwy` ties Tank Hill **[1180, 820]** to the mid-fingers (~480–360). Shore ends may meet water. Do not add a tenth finger or an I-10 along the seawall.

---

## KEEP landmarks (do not invent extras)

Nineteen east KEEP ids (`wiki/pois.md`). Neighborhood fill must **leave these footprints**. Apartments = **4** (of 8 island-wide). Units live **inside** the stacks, not as extra footprints. Labs = **1** (Flats Assay).

| Id | Name | x | y | z | w × d | Sit |
|---|---|---:|---:|---:|---|---|
| `e-apt-01` | Bodega Arms | 480 | 420 | 10 | 28 × 20 | Bodega / Mason. `terracedhouse.fbx`. Studio stack |
| `e-apt-02` | Eighth Walk | 720 | 180 | 9 | 28 × 20 | E 8th / Laundry Line. `brickhouse.fbx`. 1-bed stack |
| `e-apt-03` | Line Flats | 980 | 360 | 9 | 28 × 20 | Grid east of Mason. `terracedhouse.fbx`. Studio stack |
| `e-apt-04` | Slip Courts | 1240 | 140 | 7 | 28 × 20 | Dock-side, worn. `damagedhouse.fbx`. Studio stack |
| `e-house-01` | Cinderblock House | 560 | 720 | 12 | 14 × 12 | Named brick, not the 62-house fill. `brickhouse.fbx` |
| `e-school-01` | Mason Ward School | 640 | 540 | 11 | 50 × 40 | Front Mason Ave. No dead lamps on this curb |
| `e-lot-neglected` | Weeds End | 880 | 80 | 8 | 30 × 24 | Vacant near E 8th / Mason. Prefer dead lamps |
| `e-watertower` | Tank Hill Tower | 1100 | 820 | 18 | 16 × 16 | Knuckle at the I-9-city / expwy join |
| `e-pawn` | Pawn Row Exchange | 820 | 260 | 9 | 14 × 12 | Mason / E 12th. Prefer a dead lamp |
| `e-lab-01` | Flats Assay | 1400 | 480 | 8 | 36 × 28 | East of the apartment grid, west of the shed |
| `e-warehouse-01` | East Slip Shed | 1680 | 200 | 5 | 50 × 36 | **Dock tip.** Shed Reach apron |
| `e-garage-01` | Grid Pit | 420 | 80 | 9 | 32 × 24 | West grid, Bodega / Pawn Row |
| `e-convenience-01` | Twelfth Mart | 760 | 400 | 10 | 12 × 10 | Mason curb, south of the avenue sign |
| `e-liquor-01` | Bodega Bottle | 540 | 280 | 9 | 12 × 10 | Bodega band |
| `e-bar-01` | The Rusted Tap | 900 | 500 | 10 | 16 × 12 | Mid-grid taproom |
| `e-gas-01` | Mason Pump | 380 | −40 | 8 | 28 × 20 | Bodega St, south edge of the grid |
| `e-bus-01` | Eighteenth Stop | 1060 | 160 | 8 | 22 × 14 | E 18th / Laundry Line band |
| `e-abandoned-01` | Hollow Storefront | 1280 | 620 | 10 | 14 × 12 | E 18th / Tank Hill. Prefer a dead lamp |
| `e-safehouse-01` | Line Drop | 940 | −40 | 7 | 12 × 10 | South of E 8th. `damagedhouse.fbx` reuse |

No stadium. No subway. No fifth apartment stack.

---

## Still needs work

1. **Houses and stacks are not placed.** 226 pads, 0 district meshes. Fill uses shared templates; do not stamp extra KEEP names. The four apartment KEEP footprints stay **28 × 20** even though city_block pads are **92 × 84**.
2. **KEEP footprints are not reserved in `lots.json`.** Cinderblock House (14 × 12 at 560, 720) sits between house rows 548 and 748 — nearest bake houses are 16 × 32. Mason Ward School (50 × 40) and East Slip Shed (50 × 36) sit on the 92 × 84 civic / city lattice, not custom kinds.
3. **North AABB overrun.** City row **Y 1140** is 40 m past (1900, 1100). Treat it as baked fabric, not a sixth district.
4. **I-9-city cuts the lattice.** Missing 108 × 100 cells along the diagonal are highway, not empty lots to refill.
5. **Rust Finger is the only dock cul-de-sac.** Other fingers may meet water. Do not snap them inland or add a waterfront freeway.
6. **`.uproject` exists; Landscape not imported.** Heightmap, roads, and lots exist as bake. Import is `wiki/unreal.md`.

Do not edit `_gen_*.js`, server, or client from this file.
