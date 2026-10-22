# Roads — Port Rook / Bellhaven

Owner: **agent-roads**. Units: **meters**. Origin: island center. **+X east, +Y north, +Z up**. Unreal: ×100 to cm; each polyline below is a **Spline Component** point list, in order.

Z is not stored here. Project street / I-9 points onto the landscape (`wiki/height.md`). **Do not** project bridge decks or I-9 Cut crossings — leave the canal depressed and carry the deck over.

**No extra highways.** The only highway is **I-9** (west spine + south-basin ring). Everything else is a street, cul-de-sac, or a named bridge deck.

Sign corners in `wiki/signs.md` sit on these centerlines. KEEP pads in `wiki/pois.md` stay off the pavement.

The named polylines below are the **sign / KEEP subset**. The live network is generated (`_gen_roads.js` + `_gen_graph.js`) and written to `data/roads.json` — hundreds of streets, not these lines alone.

## Network rules (enforced by `_gen_graph.js`)

- Every crossing of two paved centerlines becomes an **intersection** (`data/intersections.json`, `data/traffic.csv`).
- No dangling dead ends. A stub either **snaps / extends** onto another road or ends in a **cul-de-sac bulb**. Shore ends (docks, ferry) may meet water.
- Traffic control:
  - `signal` — 4-way in East/West, arterial×arterial, highway×arterial
  - `allway_stop` — 4-way locals outside the city
  - `stop` — T-junctions and highway×street (stop on the minor)
  - `yield` — dirt onto pavement
- Bridges do **not** fill The Cut. Decks are painted; the canal stays depressed.

Preview dots: amber = signal, red = stop, pale = yield.

---

## Hierarchy

| Class | `type` | Width (m) | What |
|---|---|---|---|
| Highway | `highway` | **16** | I-9 only. Shoulder ~4 m each side. Tree keep-out ±**36** m (`wiki/trees.md`). |
| Arterial | `arterial` | **12** | Mason Ave, Foundry, Kiln Rd, Belvedere Blvd |
| Street | `street` | **8** | Numbered east grid, north collectors, west locals, south locals |
| Cul-de-sac | `street` | **8** | North bulbs; bulb radius **12** m |
| Bridge deck | `bridge` | match the road | Cut Bridge, Oriole Crossing, Harbor Span |
| Canal | (water) | **40–70** water | The Cut. Not a road. Banks 12–20 m (`wiki/height.md`) |

I-9 South Ramp and Kiln Overpass are **I-9 deck** over The Cut (same highway), not a second or third freeway.

---

## I-9

Ring around the south basin (Foundry Ward + Kiln Spur **inside** the red ring) and a spine **up the west**. No north-island loop. No east-dock freeway.

West spine stays in the woods, **west of** the casino pad (−1480, 80) and **west of** the 28 m knoll (−1400, 600). It does not cut the 55 m north ridge. The ring rides the 8–10 m south berm; east side is inland of the 3 m docks.

Join point (spine meets ring): **[−1140, −400]**.

### I-9 West Spine — `I-9-west` · `highway` · not closed

North → south, then into the ring.

```
[[-1400, 1700], [-1460, 1280], [-1520, 900], [-1580, 520], [-1600, 160], [-1540, -80], [-1280, -280], [-1140, -400]]
```

### I-9 South Ring — `I-9-ring` · `highway` · **closed**

Clockwise from the join. Foundry / Kiln / junkyard / trailer park / tent city / dead lot stay **inside**. Crosses The Cut on the north rim and again on the east.

```
[[-1140, -400], [-1180, -860], [-1140, -1380], [-880, -1840], [-200, -1960], [400, -1980], [1000, -1880], [1480, -1520], [1640, -1100], [1500, -800], [1340, -720], [1100, -400], [800, -260], [460, -280], [100, -240], [-400, -300], [-800, -380], [-1140, -400]]
```

| Crossing | On ring at | Role |
|---|---|---|
| **Kiln Overpass** | [1340, −720] | I-9 east deck over The Cut |
| **I-9 South Ramp** | [460, −280] | I-9 north-rim deck over The Cut |

Closed loop in Unreal: `set_closed_loop(true)` on `I-9-ring`. Spine and ring share the join vertex; they are one highway, two spline actors.

---

## The Cut

Canal, **NW → SE**. Inland water, mouths open to the ocean. Bed −4…−8 m, surface ~0 (`wiki/height.md`). Carve this polyline as the water centerline (Landscape hydro / a water spline). Width **40–70 m**, wider at both mouths.

West mouth at the harbor (Harbor Span). North bulge at Oriole Crossing. SE mouth past Kiln Spur, around (1400, −900).

### The Cut — `the-cut` · water · not closed

```
[[-1880, 720], [-1840, 400], [-1840, 160], [-1560, 200], [-1400, 280], [-900, 240], [-640, 250], [-310, 190], [-160, 280], [-20, 450], [120, 610], [240, 360], [360, 40], [460, -280], [780, -500], [1080, -640], [1340, -720], [1400, -900], [1600, -1140], [1780, -1380]]
```

| Vertex | Why it is here |
|---|---|
| [−1840, 160] | Harbor Span |
| [−1400, 280] | West woods, south of the knoll |
| [−310, 190] | Cut Bridge |
| [120, 610] | Oriole Crossing (north bulge) |
| [460, −280] | I-9 South Ramp |
| [1340, −720] | Kiln Overpass |
| [1400, −900] | SE mouth |

Do not fill the trench to “make roads easier.” Roads cross on the three bridges and the two I-9 decks.

---

## Bridges (3)

These are the only named **bridge** splines. Short decks, perpendicular to The Cut, sign sitting on the deck. Elevate over water; do not sculpt a land fill.

### Harbor Span — `harbor-span` · `bridge` · width 12

West harbor mouth. Ferry pad (−1760, 40) and Ferry Rd sit on the east approach.

```
[[-1920, 160], [-1840, 160], [-1760, 160]]
```

### Cut Bridge — `cut-bridge` · `bridge` · width 12

Central crossing. Pearl Row north, basin / Pike south.

```
[[-310, 110], [-310, 190], [-310, 270]]
```

### Oriole Crossing — `oriole-crossing` · `bridge` · width 8

North bulge. Continues Oriole Lane across The Cut. Peak Pump (−60, 560) is on the south-west approach, not on the deck.

```
[[80, 700], [120, 610], [150, 530]]
```

### I-9 decks over The Cut (not extra highways)

Same `highway` width as I-9. Use these only if the ring spline needs a separate non-projected span mesh. They are **I-9**, not new roads.

**I-9 South Ramp** deck:

```
[[400, -240], [460, -280], [520, -320]]
```

**Kiln Overpass** deck:

```
[[1280, -680], [1340, -720], [1400, -760]]
```

---

## East grid — Mason Flats

AABB (200, −200) → (1900, 1100). Worn brick benches 6–12 m. Mason Ave is the N–S spine. E 8th / E 12th / E 18th are E–W. Docks stay at the east tip; the grid stops before the water.

### Mason Ave — `mason-ave` · `arterial`

x = **760**. Sign (760, 420). Twelfth Mart (760, 400) is on this curb.

```
[[760, -160], [760, 40], [760, 180], [760, 310], [760, 420], [760, 640], [760, 1050]]
```

### E 8th — `e-8th` · `street`

y = **40**. Sign (540, 40). Crosses Mason at [760, 40].

```
[[240, 40], [380, 40], [540, 40], [760, 40], [1100, 40], [1500, 40], [1820, 40]]
```

### E 12th — `e-12th` · `street`

y = **310**. Sign (880, 310). Crosses Mason at [760, 310].

```
[[240, 310], [540, 310], [760, 310], [880, 310], [1240, 310], [1580, 310], [1820, 310]]
```

### E 18th — `e-18th` · `street`

y = **640**. Sign (1240, 640). Crosses Mason at [760, 640].

```
[[240, 640], [760, 640], [1100, 640], [1240, 640], [1580, 640], [1820, 640]]
```

### East locals (grid, not highways)

| id | Sign | Polyline |
|---|---|---|
| `bodega-st` | (380, 80) | `[[380, -80], [380, 80], [380, 310], [380, 420], [380, 640]]` |
| `laundry-line` | (640, 180) | `[[240, 180], [640, 180], [760, 180], [1100, 180], [1500, 180]]` |
| `tank-hill-rd` | (1580, 860) | `[[1100, 820], [1340, 840], [1580, 860], [1760, 860]]` |
| `pawn-row` | (320, 20) | `[[240, 20], [320, 20], [540, 20], [760, 20]]` |

---

## North cul-de-sacs — Belvedere Heights

AABB (−900, 400) → (900, 1900). Cul-de-sacs sit on the **32–38 m** club terrace (`wiki/height.md`). Collectors first; bulbs branch off. One-side lighting on the bulbs (`wiki/lights.md`).

Laurel Green pad (80, 1380) is park, not a street. Skirts only.

### Collectors (not highways)

**Belvedere Blvd** — `belvedere-blvd` · `arterial` · sign (−180, 1520)

```
[[-820, 1470], [-560, 1500], [-420, 1520], [-180, 1520], [80, 1520], [380, 1540], [620, 1520], [860, 1480]]
```

**Northridge** — `northridge` · `street` · sign (−40, 1860)

```
[[-780, 1830], [-400, 1855], [-40, 1860], [280, 1850], [620, 1820]]
```

**Country Club Rd** — `country-club-rd` · `street` · sign (710, 1620)

```
[[380, 1580], [540, 1600], [710, 1620], [800, 1680], [740, 1760]]
```

### Cul-de-sacs

Each ends in a **12 m** bulb (loop back to the stem). Last point repeats the bulb center so the spline closes the circle.

**Crestwood Dr** — `crestwood-dr` · from Country Club · sign (620, 1710)

```
[[710, 1620], [660, 1660], [620, 1710], [642, 1732], [620, 1750], [598, 1732], [620, 1710]]
```

**Laurel Crest** — `laurel-crest` · from Belvedere Blvd · sign (−420, 1380)

```
[[-420, 1520], [-420, 1450], [-420, 1380], [-398, 1360], [-420, 1342], [-442, 1360], [-420, 1380]]
```

**Ivy Gate** — `ivy-gate` · from Northridge · sign (−710, 1780)

```
[[-560, 1850], [-640, 1815], [-710, 1780], [-732, 1760], [-710, 1742], [-688, 1760], [-710, 1780]]
```

**Fairway** — `fairway` · from Belvedere Blvd · sign (480, 1480)

```
[[520, 1520], [500, 1500], [480, 1480], [500, 1460], [480, 1442], [460, 1460], [480, 1480]]
```

**Oriole Lane** — `oriole-lane` · from Oriole Crossing, dead-ends south of Laurel Green · sign (80, 720)

```
[[120, 610], [80, 720], [40, 860], [20, 980], [40, 1020], [10, 1040], [-10, 1000], [20, 980]]
```

---

## South — Foundry / Kiln

Inside the I-9 ring. Foundry Ward (−900, −1800) → (1100, −200). Kiln Spur (800, −1600) → (1800, −400). Streets on the 3–8 m floor; I-9 berm is outside.

### Foundry — `foundry` · `arterial` · sign (−60, −820)

E–W main drag through the basin. Kiln Stop (200, −800) is on this curb.

```
[[-850, -780], [-520, -800], [-280, -810], [-60, -820], [200, -830], [480, -850], [720, -870], [1000, -880]]
```

### Kiln Rd — `kiln-rd` · `arterial` · sign (1280, −920)

Continues Foundry into Kiln Spur. Passes under / along Kiln Overpass, stays **inside** the ring.

```
[[1000, -880], [1140, -900], [1280, -920], [1420, -980], [1560, -1080]]
```

### South locals (not highways)

| id | Sign | Polyline |
|---|---|---|
| `spur` | (1520, −1180) | `[[1420, -980], [1520, -1180], [1600, -1280]]` |
| `overpass` | (180, −360) | `[[-80, -280], [180, -360], [400, -300], [460, -280]]` |
| `junkyard-cut` | (−480, −1460) | `[[-640, -1380], [-480, -1460], [-360, -1360], [-200, -1320]]` |
| `neon-liquor` | (140, −940) | `[[-60, -820], [140, -940], [220, -980]]` |
| `chainlink` | (−220, −1280) | `[[-220, -1080], [-220, -1280], [-120, -1240], [80, -1280]]` |

`overpass` is the local street that meets I-9 South Ramp. Tent city (−120, −1240) sits under the ring / ramp structure, not on a new highway.

---

## West locals (approaches, not highways)

Pearl Row / Harbor. These exist so Harbor Span and Cut Bridge have streets on both ends. Still not highways.

| id | Sign | Polyline |
|---|---|---|
| `harbor-ave` | (−1280, 240) | `[[-1760, 160], [-1560, 200], [-1280, 240], [-900, 240], [-720, 260], [-310, 190]]` |
| `pearl-st` | (−720, 480) | `[[-980, 400], [-720, 480], [-640, 520], [-540, 560]]` |
| `civic-way` | (−540, 680) | `[[-720, 680], [-540, 680], [-310, 660], [80, 640], [120, 610]]` |
| `ferry-rd` | (−1760, 80) | `[[-1840, 160], [-1760, 80], [-1760, 40]]` |
| `pike` | (−980, −80) | `[[-1280, -80], [-980, -80], [-860, -80], [-520, -160]]` |
| `waterfront` | (−1820, 520) | `[[-1880, 720], [-1820, 520], [-1840, 400], [-1840, 160]]` |

---

## Connectors

Named polylines in `_gen_roads.js` that force district joins when snap / extend / bulb cannot reach. Arterial unless noted. Not highways.

| id | Joins |
|---|---|
| `n-to-e` | Belvedere / north collectors → Mason Flats east grid |
| `w-to-e` | Pike / west basin lip → east grid west edge (stays west of The Cut) |
| `s-to-ring` | Foundry → I-9 ring west arc |
| `s-to-e` | South basin → Mason Ave / east grid south edge (also crosses I-9 ring) |
| `w-to-harbor` | West coast / west-inner → I-9-west and harbor-ave |
| `w-to-coast` | `w-lat-4` onto west-coast (21 m miss, heading into water) |
| `cut-south` | Pike / basin → Cut Bridge south bank |
| `cut-north` | Cut Bridge north bank → civic-way |

Harbor Span already meets west-coast / harbor-ave. Oriole Crossing meets north-parkway / Oriole Lane and the east grid.

---

## Unreal spline notes

`TrapRaiders/data/roads.json` (when written) should emit one object per id above.

```
FVector(x * 100, y * 100, z * 100)
```

- `I-9-ring`: `closed = true`.
- `I-9-west`: `closed = false`; last point = ring join.
- `the-cut`: water / landscape carve only. Do not spawn `BP_RoadSpline`.
- Bridges: authored Z ~ **10–14 m** so the deck clears the 40–70 m water. Skip landscape project.
- I-9 Cut vertices [460, −280] and [1340, −720]: hold Z ~ **14–16 m** (overpass). Other I-9 points project onto the 8–16 m berm.
- Streets: project to ground after spawn.
- Graybox mesh: flat strip `width_m * 100` × 20 cm thick.
- Lights sample these centerlines and offset 2.5–3.5 m to the curb (`wiki/lights.md`).
- Trees: density 0 inside I-9 ±36 m and The Cut ±28 m.

Do not add an I-10, a north belt, an east waterfront freeway, or any other highway.
