# Apartment interiors — units inside the stack

Owner: **agent-interiors-apt**. Templates only. No extra apartment footprints. KEEP names stay fictional.

Coords: meters, **+X east, +Y north, +Z up**. Local origin of every template is **that door’s threshold** (floor, door centerline). Street and gallery doors face **S** (enter **+Y**). Unreal: ×100 to cm.

Units live **inside** the eight KEEP stacks plus `city_block` walk-up lots. Many units share a `templateId`. Each unit has its own `instanceId` and stash. Same wallpaper ≠ same raid.

Data: `data/housing_templates.json`. Pockets: `wiki/housing.md`.

## Same-world pocket (no load)

A raid is a run. The street stays live. There is no “Loading Bellhaven.”

```
unit door (stack.x + local, stack.y − front, stack.z + floor)
        │  E → POST /api/house/enter   (nearest door ≤ 4.5 m)
        ▼
pocket  (stack.x, stack.y, stack.z − 16)
```

- Same process, same tick, same inventory authority. **F** → `/api/house/exit` back on **that** door’s stoop / gallery.
- Duplicate the template into **that** `instanceId`. Do not share one interior actor between two units.
- `moveInside` clamps to **that** pocket (~9 m). A studio pocket cannot walk into the neighbor’s studio.
- **Walk-up exception:** hall, stair, basement, and the units on this core share **one** pocket so a raid walks unit-to-unit without a second enter. Stash is still tagged per unit `instanceId`.

Bake one `{ instanceId, templateId, door, pocket }` per **unit** (and one street door on a walk-up core). `instanceId` examples: `w-apt-01-2C`, `city_block-E-0-u3`. Do not invent ids on the client.

---

## Units per KEEP stack (people-sink)

KEEP envelope is **28 × 20** (`wiki/buildings_housing.md`). Floors of units sit inside that envelope. No new pads.

| Template | Floors of units | Units / floor | Units / KEEP stack |
|---|---:|---:|---:|
| `int_apt_studio` | 4 (G–3) | 6 | **24** |
| `int_apt_1bed` | 4 (G–3) | 4 | **16** |
| `int_apt_walkup` | 3 + basement | 2 per core × 2 cores | **12** |

`city_block` lots are also walk-up stacks (units inside the lot, no extra KEEP footprint). One playable core per lot: walkup **6**, or 3 floors of 1bed **12** / studio **18** when the lot hash picked those templates.

---

## `int_apt_studio` — one room + bath, no basement

| Field | Value |
|---|---|
| id | `int_apt_studio` |
| fbx | `terracedhouse.fbx` |
| kind | apt |
| footprint | **8.0 × 7.0** (X east × Y north) |
| floors | 1 |
| basement | **none** |
| ceiling | **2.55** clear |
| door socket | 0.90 × 2.10, origin, facing **S**, inward swing, trigger 0.80 × 0.40 × 2.20 just inside |

Local bounds: X **−4.00 … +4.00**, Y **0.00 … +7.00**, Z **0.00 … 2.55**.

### Room graph

| Room | Size | Local AABB (min → max) | Opens to |
|---|---|---|---|
| main (live / sleep / cook) | 8.00 × 5.15 usable | X −4.00..+4.00, Y 1.85..7.00 | door, bath, closet |
| kitchen strip | 3.20 × 1.40 | X −4.00..−0.80, Y 5.60..7.00 (north window wall) | main, open |
| sleep alcove | 2.20 × 1.60 | X +1.60..+3.80, Y 5.40..7.00 | main, open |
| bath | 2.20 × 1.85 | X +1.80..+4.00, Y 0.00..1.85 | main (0.70 leaf at X +1.80, Y 0.90) |
| entry closet | 0.80 × 1.85 | X −4.00..−3.20, Y 0.00..1.85 | main, open |

No hall. Door dumps into main. Kitchen is a counter + fridge on the north wall, not a second room.

### KEEP studio floor plate (28 × 20 envelope)

Stair / trash east **4.0 × 20**. Hall spine **24.0 × 2.0** at Y 8.5…10.5. **3** units north of the hall, **3** south. South-bank units rotate 180° so local +Y is still “into the room.” **6 × 4 floors = 24** instanceIds.

Gallery / stair is exterior circulation (still Port Rook). **E** at a unit door enters **that** unit only.

### Stash (this instanceId only)

| Spot | Local (m) | Note |
|---|---|---|
| kitchen sink cabinet | (−2.40, 6.20, 0.20) | false bottom |
| mattress seam | (+2.70, 6.20, 0.35) | under sleep alcove |
| bath vanity | (+3.20, 0.40, 0.80) | |
| closet shelf | (−3.60, 0.90, 1.60) | |

---

## `int_apt_1bed` — living/kitchen, bedroom, bath, no basement

| Field | Value |
|---|---|
| id | `int_apt_1bed` |
| fbx | `brickhouse.fbx` |
| kind | apt |
| footprint | **9.0 × 8.0** |
| floors | 1 |
| basement | **none** |
| ceiling | **2.70** clear |
| door socket | 0.90 × 2.10, origin, facing **S**, inward swing |

Local bounds: X **−5.00 … +4.00**, Y **0.00 … +8.00**, Z **0.00 … 2.70**. Door sits 5 m from the west wall, 4 m from the east.

### Room graph

| Room | Size | Local AABB | Opens to |
|---|---|---|---|
| living_kitchen | 5.40 × 8.00 | X −5.00..+0.40, Y 0.00..8.00 | door, bedroom, bath |
| kitchen L | 2.40 × 3.20 | X −5.00..−2.60, Y 4.80..8.00 (west + north) | living, open |
| bedroom | 3.60 × 5.20 | X +0.40..+4.00, Y 2.80..8.00 | living (0.80 leaf at X +0.40, Y 5.20) |
| bedroom closet | 0.60 × 1.80 | X +0.40..+1.00, Y 6.20..8.00 | bedroom |
| bath | 3.60 × 2.20 | X +0.40..+4.00, Y 0.60..2.80 | living (0.70 leaf at X +0.40, Y 1.70) |

Short of a hall: living is the circulation. Bedroom and bath are east of the living.

### KEEP 1bed floor plate (28 × 20 envelope)

Two-by-two units: X 0–9 and 9–18, Y 0–8 (south) and 10–18 (north). Hall **18 × 2** at Y 8…10. Stair **4 × 20** at X 24…28. Utility / mail **6 × 20** at X 18…24. **4 × 4 floors = 16** instanceIds.

### Stash (this instanceId only)

| Spot | Local (m) | Note |
|---|---|---|
| bedroom closet floor | (+0.70, 7.10, 0.00) | board lift |
| kitchen toe-kick | (−3.80, 5.20, 0.00) | |
| bath vanity | (+2.20, 0.80, 0.80) | |
| sofa underside | (−1.60, 2.40, 0.15) | living |

---

## `int_apt_walkup` — 3 floors, shared stair, basement 3.4 m

| Field | Value |
|---|---|
| id | `int_apt_walkup` |
| fbx | `townhouse.fbx` |
| kind | apt |
| footprint | **12.0 × 10.0** (one core) |
| floors | **3** occupied + basement |
| basement | **3.4** clear, under the pad (air, do not fill r16) |
| ceiling (L1–L3) | **2.80** clear; slab 0.20; floor-to-floor **3.00** |
| street door | 1.20 × 2.20, origin, facing **S** — this is the pocket enter |
| unit door | 0.90 × 2.10 on the hall, **same pocket** (no second load) |

Local bounds (street door): X **−6.00 … +6.00**, Y **0.00 … +10.00**.

| Level | Z floor | Z clear |
|---|---:|---|
| basement | **−3.40** | −3.40 … 0.00 |
| L1 | 0.00 | 0.00 … 2.80 |
| L2 | 3.00 | 3.00 … 5.80 |
| L3 | 6.00 | 6.00 … 8.80 |

### Circulation (raid path, no load)

West bar is stair + hall. East bar is the units. A run never leaves the pocket.

| Space | Size | Local AABB | Notes |
|---|---|---|---|
| street lobby (L1) | 12.00 × 1.80 | X −6.00..+6.00, Y 0.00..1.80 | mail slots on west |
| stair | 2.80 × 10.00 | X −6.00..−3.20, Y 0.00..10.00 | switchback; 2 × 1.50 rise + landing = 3.00 |
| landing / hall | 2.00 × 8.20 | X −3.20..−1.20, Y 1.80..10.00 | both unit doors |
| basement stair | same shaft | continues to Z −3.40 | |

Raid: stoop **E** → lobby → stair → landing → unit S → hall → unit N → up/down → basement cages → **F** on the street door. Neighbor core is a different pocket.

### Units on each floor (2)

Compact one-room + bath. Not a second studio template — same core, same instance space.

| Unit | Size | Stack AABB (L2/L3) | Unit door (stack) |
|---|---|---|---|
| S (south) | 8.80 × 4.00 | X −1.20..+6.00, Y 1.80..5.80 | (−1.20, 3.80, floorZ), enter +X |
| N (north) | 8.80 × 4.20 | X −1.20..+6.00, Y 5.80..10.00 | (−1.20, 7.90, floorZ), enter +X |

L1 units shrink by the lobby (south unit Y 1.80…5.80 still; street does not open into the unit).

Unit-local (origin at **unit** door, +X into the room):

| Room | Size | Unit-local AABB |
|---|---|---|
| main | 6.60 × 4.00 | X 0.00..6.60, Y −2.00..+2.00 |
| bath | 2.00 × 1.80 | X 4.60..6.60, Y −2.00..−0.20 |
| kitchen strip | 2.40 × 1.20 | X 0.40..2.80, Y +0.80..+2.00 (window wall) |

**6 units per core** (2 × 3). Labels `1S 1N 2S 2N 3S 3N`.

### Basement — laundry / cages (3.4 m)

| Space | Size | Local AABB | Notes |
|---|---|---|---|
| laundry | 6.40 × 4.80 | X −1.20..+5.20, Y 0.40..5.20 | 4 machines, 2 tubs. No recipes. |
| cage row | 12.00 × 2.20 | X −6.00..+6.00, Y 7.80..10.00 | **10** wire cages 1.20 × 0.80; six named to the units, four spare |
| open floor | rest of 12 × 10 | | stair dump, carts |

Cage ids follow the unit `instanceId`. Spare cages are empty until assigned.

### Stash

| Spot | Where | Note |
|---|---|---|
| unit kitchen drawer | unit-local (1.40, 1.40, 0.80) | per unit instance |
| unit bath tank | unit-local (5.60, −1.40, 0.40) | per unit |
| unit mattress | unit-local (3.20, 0.20, 0.30) | per unit |
| basement cage | that unit’s cage | lock matches unit key |
| laundry dryer drum | stack (−0.40, 2.20, −2.80) | shared core, contested |

### KEEP walkup: two cores in 28 × 20

| Core | Envelope (stack-local, SW origin) |
|---|---|
| A | X 0…12, Y 0…10 |
| B | X 16…28, Y 0…10 |
| lightwell | X 12…16, Y 0…20 (air / fire escape, not a unit) |
| rear court | Y 10…20 | empty — **no extra footprint** |

Two cores × 6 units = **12** instanceIds. Cores do not share a pocket. Street door per core on the south face.

---

## KEEP map (8 = W2 E4 S2)

No extra stacks. Units inside these eight only, plus `city_block` lots.

| id | name | district | template | fbx (shell) | floors | units |
|---|---|---|---|---|---:|---:|
| w-apt-01 | Rowan Stacks | W Pearl Row | `int_apt_walkup` | `townhouse.fbx` | 3 + B | **12** |
| w-apt-02 | Brine Court | W Pearl Row | `int_apt_1bed` | `semidetachedhouse.fbx` | 4 | **16** |
| e-apt-01 | Bodega Arms | E Mason Flats | `int_apt_studio` | `terracedhouse.fbx` | 4 | **24** |
| e-apt-02 | Eighth Walk | E Mason Flats | `int_apt_1bed` | `brickhouse.fbx` | 4 | **16** |
| e-apt-03 | Line Flats | E Mason Flats | `int_apt_studio` | `terracedhouse.fbx` | 4 | **24** |
| e-apt-04 | Slip Courts | E Mason Flats | `int_apt_studio` | `damagedhouse.fbx` | 4 | **24** |
| s-apt-01 | Overpass Stacks | S Foundry Ward | `int_apt_walkup` | `damagedhouse.fbx` | 3 + B | **12** |
| s-apt-02 | Spur Courts | S Foundry Ward | `int_apt_1bed` | `brickhouse.fbx` | 4 | **16** |

West = nicer walkup + 1beds. East = studio people-sink (three packs) + one 1bed. South = worn walkup + brick 1beds.

KEEP total: **144** unit instanceIds.

---

## `city_block` walk-up lots

`kind: city_block` pads are walk-up stacks, not more named KEEP apartments. Playable interior is the template pocket under the lot, not the whole 92 × 84 pad.

| lot `instanceId` (bake) | XY | lot `templateId` | units inside | basement |
|---|---|---|---:|---|
| `city_block-E-0` | (530, 540) | `int_apt_walkup` | **6** | 3.4 / 22 × 18 air |
| `city_block-E-1` | (530, 1140) | `int_apt_1bed` | **12** (4 × 3) | 3.4 |
| `city_block-E-2` | (1178, 540) | `int_apt_studio` | **18** (6 × 3) | 3.4 |
| `city_block-E-3` | (1502, 540) | `int_apt_walkup` | **6** | 3.4 |

Unit ids: `{lot.instanceId}-u{n}`. One street door on the south face (`lots.json` `door.facing: S`). Studio / 1bed lots still use a 3-floor walk-up **shell**; each unit door is its own pocket. Walkup lots use the shared-hall pocket.

---

## Raid note

Enter **that unit’s** `instanceId` under the stack — no load; walkup hall/stair stays in the same pocket so a run can go door-to-door.

## Do not

- Extra apartment footprints, motel rooms, or trailer interiors (other agents).
- Share one pocket across two KEEP stacks or two walkup cores.
- Real-world city names. Drug recipes. Edit `housing_templates.json` from this file.
