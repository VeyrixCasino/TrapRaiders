# House interiors — templates, not lots

Owner: **agent-interiors-house**. Layouts only. Apartments are `wiki/interiors_apt.md`. Lots / pads stay in `wiki/housing.md` + `data/lots.json`. KEEP named houses stay in `wiki/buildings_housing.md`. **Do not place buildings.**

Many exteriors. Seven interior **templates**. Each lot door is its own **`instanceId`**. Same wallpaper is not the same stash.

Coords: meters. Local interior: **origin at the door threshold**, **+Y into the house**, **+X house-right** when facing in, **+Z up**. World: island center, +X east +Y north +Z up (`wiki/README.md`). Unreal: ×100 to cm.

Data ids match `data/housing_templates.json`. This file does **not** author apt rows.

---

## Template vs instance

| | Template | Instance |
|---|---|---|
| What | Shared room graph + openings (`int_cottage` … `int_damaged`) | One lot, one door, one stash |
| Mesh | Exterior FBX scaled to the lot pad | Duplicate of the template **inside that lot’s pocket** |
| Stash | Named sockets only | Filled per `instanceId` |

Two keys on **one** address = one `instanceId`. Two townhouses on one block = two pockets even if both use `int_townhouse`.

---

## Same-world pocket (no load)

A raid is a run. A load screen hides the street and pauses the defender. Interiors are **not** another map.

```
door  (lot.x, lot.y − front, lot.z)     trigger, same process
        │
        ▼
pocket (lot.x, lot.y, lot.z − 16)       duplicate of the template
```

- Walk in: `POST /api/house/enter` — snap a few meters down, same tick, same inventory authority. No “Loading Bellhaven.”
- Walk out: `POST /api/house/exit` — back on the stoop.
- Unreal later: World Partition streaming volume on the door. Still one persistent map.
- **Never** share one interior actor across two lots.

Street lamps stay live (`wiki/lights.md`: fixture **7.5 m**, district CCT). Front openings look at those lamps. See [Street light openings](#street-light-openings).

---

## Shared build rules

| Field | Value |
|---|---|
| Floor-to-floor | **2.80 m** (L0→L1 and L0→basement) |
| Clear ceiling | **2.50 m** (0.30 m floor structure) |
| Basement depth | **2.80 m** under the pad (air, not filled dirt). Landscape r16 is the finished lot floor only |
| Exterior wall | 0.20 m |
| Partition | 0.15 m |
| Room sizes | **clear** floor, inside plaster |
| Front door | 0.90 × 2.10, leaf swings +X, upper glass 0.70 × 0.55 |
| Door socket | local origin = threshold center. Player after enter: `(0.00, 0.85, 0.00)` facing **+Y** |
| Street wall | local **Y = 0**. Street is **−Y** |
| Rear wall | local **Y = footprint.d** |
| Footprint | `[w, d]` = X extent × Y extent from `housing_templates.json` |

Z of the pocket floor (L0) is `lot.z − 16`. Basement floor is that minus 2.80.

### Stairs (basement — must fit, not a ladder)

Every house template has a **U-return stair**, never a ship ladder, never a hatch-only drop.

| Field | Value |
|---|---|
| Rise | 0.175 m × **16** = 2.80 m |
| Tread | 0.25 m (7 treads per flight) |
| Flight run | 1.75 m |
| Landing | 1.00 × 2.20 |
| Clear width | 1.00 m |
| Headroom | ≥ 2.00 m |
| Handrail | both sides, 0.90 m |
| Stair box | **2.20 × 2.85** in plan, through the well |

Down from L0 is required on all seven. Two-floor templates **stack** the same well up to L1 (one volume, B ↔ L0 ↔ L1). Do not replace the basement run with a ladder to “save space” — the box already fits the 7 m terrace.

Attic (2-floor only): **pull-down stair** 1.20 × 0.70 in the L1 hall, not a vertical ladder. Knee attic, ridge ~1.60 m.

### Stash sockets

Template places the **holes**. `instanceId` owns what is in them. Raid one door, you are not in the next lot.

| Socket | Where | Notes |
|---|---|---|
| `stash_closet` | bedroom closet | first look |
| `stash_basement` | basement corner **farthest from the stair** | main hide |
| `stash_attic` | eave trunk (2-floor only) | skip on 1-floor |

No recipes. Sockets are empty boxes until the instance fills them.

### Street-light openings

Pocket sits **16 m under the lot**. Front rooms must still read the **real** curb lamp for that street (N warm 2700 K, W clean 4000 K LED, E mixed / some dead, S / SE orange flicker).

Each street door and street window is a **hole**, not a sealed box:

```
interior pane (local Y ≈ 0.20)
    → 0.40 m light box
    → vertical shaft 16 m up, same XY as the lot facade opening
    → lot opening (same width × height as the exterior hole)
```

Raid looking out the living window or the door glass sees that lot’s lamp. Side and rear windows shaft to their own facade holes (or stay dark on party walls). Do **not** instance a fake sun in the pocket.

Standard opening sizes:

| Kind | W × H | Sill | Head |
|---|---|---|---|
| Street window | 1.10 × 1.40 | 0.90 | 2.30 |
| Rear window | 1.10 × 1.20 | 1.00 | 2.20 |
| Side window | 0.90 × 1.20 | 1.00 | 2.20 |
| Front door + glass | 0.90 × 2.10 + 0.70 × 0.55 lite | 0 | 2.10 |
| Rear door | 0.80 × 2.00 | 0 | 2.00 |

Party walls (semi +X, terrace ±X) have **no** openings.

---

## Templates (7)

| id | FBX | Floors | Basement | Footprint w×d | Typical fill |
|---|---|---:|---|---|---|
| `int_cottage` | `woodencottage.fbx` | 1 | 2.80 m | 10 × 8 | Belvedere cul-de-sacs; KEEP `n-house-01` Cinderlane House |
| `int_farm` | `farmhouse.fbx` | 2 | 2.80 m | 14 × 10 | Pearl woods lots; KEEP `w-house-01` Silt House. **Not** the 48×36 mansions |
| `int_townhouse` | `townhouse.fbx` | 2 | 2.80 m | 8 × 12 | Pearl Row street fill |
| `int_brick` | `brickhouse.fbx` | 2 | 2.80 m | 10 × 10 | Mason grid; KEEP `e-house-01` Cinderblock House |
| `int_semi` | `semidetachedhouse.fbx` | 2 | 2.80 m | 9 × 11 | Pearl paired lots, party wall +X |
| `int_terrace` | `terracedhouse.fbx` | 2 | 2.80 m | 7 × 12 | Mason / Bodega rows, party walls both long sides |
| `int_damaged` | `damagedhouse.fbx` | 1 | 2.80 m | 9 × 9 | Mason dock courts + Foundry basin fill |

Mansions Wrenhollow / Gullwing are KEEP pads at 48×36 — they do **not** use these room graphs.

Room corners below are **min (X, Y)** on that floor. Z is the finished floor of the level.

---

## `int_cottage` — `woodencottage.fbx`

One floor + basement. Door socket on the 10 m street wall, center.

| | |
|---|---|
| Footprint | 10 × 8 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−5…+5 |
| Stair | U-box `2.20 × 2.85` at `(2.50, 0.20)` — **down only** |
| Attic | none |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.20 × 2.20 | (−1.10, 0.20) | entry |
| living | 5.80 × 4.20 | (−4.80, 0.20) | living |
| stairs | 2.20 × 2.85 | (2.50, 0.20) | stairs (down) |
| kitchen | 3.80 × 3.40 | (1.00, 4.40) | kitchen |
| bedroom | 4.00 × 3.40 | (−4.80, 4.40) | bedroom |
| bath | 1.80 × 2.40 | (−0.80, 4.40) | bath |
| closet | 1.80 × 1.00 | (−0.80, 6.80) | closet → `stash_closet` |

Pack: front 5.80 + 2.20 stair + 2.00 entry overlap on the living/stair split = 10 m with skins. Back 4.00 + 1.80 + 3.80 = 9.60 clear. Depth 4.20 + 3.40 + skins = 8.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (2.50, 0.20) | stairs |
| cellar | 6.40 × 6.80 | (−4.20, 0.40) | basement |
| mechanical | 2.20 × 2.20 | (2.20, 3.20) | basement (furnace) |
| coal corner | 1.40 × 1.40 | (−4.20, 5.80) | basement → `stash_basement` |

### Openings

| Opening | Wall | Center X or Y | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | lite reads the stoop lamp |
| living window A | street Y=0 | X=−3.40 | 1.10 × 1.40 |
| living window B | street Y=0 | X=−1.20 | 1.10 × 1.40 |
| kitchen window | rear Y=8 | X=2.80 | 1.10 × 1.20 |
| kitchen door | rear Y=8 | X=1.60 | 0.80 × 2.00 |
| bedroom window | side X=−5 | Y=6.10 | 0.90 × 1.20 |

Raid path: glass → living → stair → coal corner → out. Closet is the short look.

---

## `int_farm` — `farmhouse.fbx`

Two floors + basement. Door on the 14 m street wall, slightly left of center.

| | |
|---|---|
| Footprint | 14 × 10 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−7…+7 |
| Stair well | U-box `2.20 × 2.85` at `(2.40, 3.00)` — **down + up** |
| Attic | knee, floor z=5.60, hatch in L1 hall |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.40 × 2.80 | (−1.20, 0.20) | entry |
| living | 5.60 × 5.20 | (−6.80, 0.20) | living |
| dining | 4.40 × 4.00 | (2.40, 0.20) | living (eat) |
| stairs | 2.20 × 2.85 | (2.40, 3.00) | stairs |
| bath | 1.80 × 2.00 | (4.70, 4.20) | bath |
| kitchen | 5.40 × 4.20 | (−6.80, 5.60) | kitchen |
| pantry | 1.60 × 2.00 | (−1.40, 5.60) | closet (kitchen) |

### L1 (z = 2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| hall | 2.40 × 5.20 | (−1.20, 2.80) | stairs (landing) |
| bedroom | 5.60 × 5.20 | (−6.80, 0.20) | bedroom (front) |
| closet | 1.60 × 1.80 | (−6.80, 5.40) | closet → `stash_closet` |
| bedroom | 4.00 × 4.20 | (−5.20, 5.40) | bedroom (rear) |
| bedroom | 5.60 × 4.60 | (1.20, 0.20) | bedroom |
| bath | 2.60 × 2.80 | (1.20, 4.80) | bath |
| hatch | 1.20 × 0.70 | (−0.40, 6.40) | attic pull-down |

### Attic (z = 5.60)

Knee walls 0.80 m at eaves, **1.60 m** at ridge. Eave trunk at `(−1.00, 7.60)`, 2.00 × 1.40 → `stash_attic`.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (2.40, 3.00) | stairs |
| cellar | 11.60 × 8.40 | (−6.40, 0.40) | basement |
| mechanical | 2.40 × 2.40 | (3.80, 0.40) | basement |
| far corner | 1.60 × 1.60 | (−6.40, 7.80) | basement → `stash_basement` (under kitchen) |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | |
| living A / B | street Y=0 | X=−5.20, −2.40 | two 1.10 × 1.40 |
| dining window | street Y=0 | X=4.20 | 1.10 × 1.40 |
| L1 front bedroom | street Y=0 | X=−4.00 | 1.10 × 1.40 (upper raid still sees the lamp) |
| kitchen window + door | rear Y=10 | X=−4.00 / −2.20 | |
| side parlor | side X=−7 | Y=2.60 | 0.90 × 1.20 |

---

## `int_townhouse` — `townhouse.fbx`

Two floors + basement. Narrow street face (8 m), deep (12 m). Stair well stacked on house-right.

| | |
|---|---|
| Footprint | 8 × 12 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−4…+4 |
| Stair well | U-box `2.20 × 2.85` at `(1.60, 2.20)` — **down + up** |
| Attic | hatch in L1 hall |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.20 × 2.20 | (−1.10, 0.20) | entry |
| living | 5.40 × 5.80 | (−3.80, 0.20) | living |
| stairs | 2.20 × 2.85 | (1.60, 2.20) | stairs |
| bath | 2.20 × 2.10 | (1.60, 5.10) | bath (powder, under / past stair) |
| kitchen | 5.40 × 5.60 | (−3.80, 6.00) | kitchen |

### L1 (z = 2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| bedroom | 5.40 × 5.20 | (−3.80, 0.20) | bedroom (front) |
| bedroom | 5.40 × 4.40 | (−3.80, 5.40) | bedroom (rear) |
| bath | 2.60 × 2.00 | (−3.80, 9.80) | bath |
| closet | 1.60 × 2.00 | (−1.20, 9.80) | closet → `stash_closet` |
| hall | 2.20 × 6.60 | (1.60, 5.10) | stairs (landing) |
| hatch | 1.20 × 0.70 | (2.00, 8.40) | attic pull-down |

### Attic (z = 5.60)

Eave trunk at `(−1.00, 10.20)`, 2.00 × 1.20 → `stash_attic`.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (1.60, 2.20) | stairs |
| cellar | 7.20 × 10.80 | (−3.60, 0.40) | basement |
| far corner | 1.60 × 1.60 | (−3.60, 9.80) | basement → `stash_basement` (under kitchen) |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | |
| living A / B | street Y=0 | X=−2.60, −0.80 | |
| L1 front bedroom | street Y=0 | X=−1.60 | upper pane still hits the lamp |
| kitchen window + door | rear Y=12 | X=−1.20 / 0.60 | |
| sides | ±X | — | optional; plug when the lot sits mid-block |

---

## `int_brick` — `brickhouse.fbx`

Two floors + basement. Square working-class box.

| | |
|---|---|
| Footprint | 10 × 10 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−5…+5 |
| Stair well | U-box `2.20 × 2.85` at `(2.40, 0.20)` — **down + up** |
| Attic | hatch in L1 hall |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.20 × 2.20 | (−1.10, 0.20) | entry |
| living | 6.20 × 5.00 | (−4.80, 0.20) | living |
| stairs | 2.20 × 2.85 | (2.40, 0.20) | stairs |
| kitchen | 6.20 × 4.40 | (−4.80, 5.20) | kitchen |
| bath | 2.20 × 2.20 | (2.40, 7.40) | bath |

### L1 (z = 2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| bedroom | 5.60 × 4.80 | (−4.80, 0.20) | bedroom (front) |
| bedroom | 5.60 × 4.60 | (−4.80, 5.00) | bedroom (rear) |
| bath | 2.80 × 2.80 | (1.00, 6.80) | bath |
| closet | 1.40 × 1.80 | (1.00, 5.00) | closet → `stash_closet` |
| hall | 2.20 × 4.60 | (2.40, 0.20) | stairs (landing) |
| hatch | 1.20 × 0.70 | (2.60, 4.40) | attic pull-down |

### Attic (z = 5.60)

Eave trunk at `(−2.00, 8.20)`, 2.00 × 1.20 → `stash_attic`.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (2.40, 0.20) | stairs |
| cellar | 8.80 × 8.80 | (−4.40, 0.40) | basement |
| far corner | 1.50 × 1.50 | (−4.40, 7.70) | basement → `stash_basement` |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | |
| living A / B | street Y=0 | X=−3.20, −1.00 | |
| L1 front bedroom | street Y=0 | X=−2.20 | |
| kitchen window + door | rear Y=10 | X=−2.00 / 0.20 | |
| side bedroom | side X=−5 | Y=7.20 | 0.90 × 1.20 |

---

## `int_semi` — `semidetachedhouse.fbx`

Two floors + basement. **Party wall = +X** (house-right). Mirror X on the paired lot so both party faces kiss. No openings on the party wall.

| | |
|---|---|
| Footprint | 9 × 11 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−4.5…+4.5 |
| Stair well | U-box `2.20 × 2.85` at `(1.50, 2.20)` against the party wall — **down + up** |
| Attic | hatch in L1 hall along +X |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.20 × 2.20 | (−1.10, 0.20) | entry |
| living | 5.80 × 5.20 | (−4.30, 0.20) | living |
| stairs | 2.20 × 2.85 | (1.50, 2.20) | stairs |
| kitchen | 5.80 × 5.20 | (−4.30, 5.40) | kitchen |
| bath | 2.20 × 2.20 | (1.50, 8.40) | bath |

### L1 (z = 2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| bedroom | 5.80 × 5.00 | (−4.30, 0.20) | bedroom (front) |
| bedroom | 5.80 × 4.20 | (−4.30, 5.20) | bedroom (rear) |
| bath | 2.20 × 3.20 | (1.50, 7.40) | bath |
| closet | 1.60 × 1.40 | (−4.30, 9.40) | closet → `stash_closet` |
| hall | 2.20 × 5.20 | (1.50, 2.20) | stairs (landing) |
| hatch | 1.20 × 0.70 | (1.80, 6.80) | attic pull-down |

### Attic (z = 5.60)

Eave trunk at `(−2.00, 9.20)`, 2.00 × 1.20 → `stash_attic`.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (1.50, 2.20) | stairs |
| cellar | 8.00 × 9.80 | (−4.10, 0.40) | basement |
| far corner | 1.50 × 1.50 | (−4.10, 8.70) | basement → `stash_basement` |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | |
| living A / B | street Y=0 | X=−2.80, −0.80 | free-side light |
| L1 front bedroom | street Y=0 | X=−1.80 | |
| kitchen window + door | rear Y=11 | X=−2.00 / 0.00 | |
| free-side living | side X=−4.5 | Y=2.60 | 0.90 × 1.20 |
| party +X | X=+4.5 | — | **solid** |

---

## `int_terrace` — `terracedhouse.fbx`

Two floors + basement. Tightest plan. **Party walls both long sides (±X)**. Light only street + rear. The U-stair **must** stay 2.20 × 2.85 — a straight 4 m flight does not fit.

| | |
|---|---|
| Footprint | 7 × 12 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−3.5…+3.5 |
| Stair well | U-box `2.20 × 2.85` at `(1.10, 2.20)` — **down + up** |
| Attic | hatch in L1 hall |

Clear width 6.60 = living **4.40** + stair **2.20**.

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.00 × 2.00 | (−1.00, 0.20) | entry |
| living | 4.40 × 5.40 | (−3.30, 0.20) | living |
| stairs | 2.20 × 2.85 | (1.10, 2.20) | stairs |
| kitchen | 4.40 × 4.80 | (−3.30, 5.60) | kitchen |
| bath | 2.20 × 2.20 | (1.10, 8.20) | bath |

### L1 (z = 2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| bedroom | 4.40 × 5.20 | (−3.30, 0.20) | bedroom (front) |
| bedroom | 4.40 × 4.20 | (−3.30, 5.40) | bedroom (rear) |
| bath | 2.20 × 2.80 | (1.10, 7.40) | bath |
| closet | 1.40 × 1.20 | (−3.30, 9.60) | closet → `stash_closet` |
| hall | 2.20 × 5.20 | (1.10, 5.10) | stairs (landing) |
| hatch | 1.20 × 0.70 | (1.40, 6.40) | attic pull-down |

### Attic (z = 5.60)

Eave trunk at `(−1.20, 10.20)`, 1.80 × 1.10 → `stash_attic`. Tight; still a socket.

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (1.10, 2.20) | stairs |
| cellar | 6.20 × 10.80 | (−3.10, 0.40) | basement |
| far corner | 1.40 × 1.40 | (−3.10, 9.80) | basement → `stash_basement` |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + glass | street Y=0 | X=0 | only street lamp this house gets from the front |
| living window | street Y=0 | X=−1.40 | one pane — keep it a hole |
| L1 front bedroom | street Y=0 | X=−1.40 | |
| kitchen window + door | rear Y=12 | X=−1.20 / 0.40 | rear alley / yard lamp if the lot has one |
| ±X | party | — | **solid** |

---

## `int_damaged` — `damagedhouse.fbx`

One floor + basement. Worn box. Same pocket rules. One street sash is **already gone** so the lot lamp dumps straight into the living room (E mixed / dead, S flicker).

| | |
|---|---|
| Footprint | 9 × 9 |
| Floor-to-floor | 2.80 m |
| Door | `(0, 0, 0)` facing +Y. Street wall Y=0, X=−4.5…+4.5 |
| Stair | U-box `2.20 × 2.85` at `(2.30, 0.20)` — **down only**, even if the rail is half gone |
| Attic | none (roof may sag; do not add a raid loft) |

### L0 (z = 0)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| entry | 2.20 × 2.00 | (−1.10, 0.20) | entry |
| living | 5.50 × 4.40 | (−4.30, 0.20) | living (stained ceiling, broken sash) |
| stairs | 2.20 × 2.85 | (2.30, 0.20) | stairs |
| bedroom | 3.80 × 4.00 | (−4.30, 4.60) | bedroom |
| closet | 1.80 × 1.80 | (−0.50, 4.60) | closet → `stash_closet` |
| bath | 1.80 × 2.40 | (−0.50, 6.40) | bath |
| kitchen | 3.00 × 4.20 | (1.30, 4.60) | kitchen |

### Basement (z = −2.80)

| Room | Size | Corner (X, Y) | Purpose |
|---|---|---|---|
| stair well | 2.20 × 2.85 | (2.30, 0.20) | stairs (not a drop hole) |
| cellar | 7.60 × 7.60 | (−4.00, 0.40) | basement |
| boarded bin | 1.50 × 1.50 | (−4.00, 6.50) | basement → `stash_basement` |

### Openings

| Opening | Wall | Center | Notes |
|---|---|---|---|
| door + cracked glass | street Y=0 | X=0 | lite may be taped; still a hole |
| living window A | street Y=0 | X=−2.80 | **sash missing** — open 1.10 × 1.40 |
| living window B | street Y=0 | X=−1.00 | boarded but shaft remains |
| kitchen window | rear Y=9 | X=2.60 | cracked |
| kitchen door | rear Y=9 | X=1.80 | 0.80 × 2.00, often jammed open |
| bedroom window | side X=−4.5 | Y=6.40 | 0.90 × 1.20 |

Raid path: open sash (street lamp in your face) → closet **or** stair → boarded bin → out. Do not collapse the stair into a ladder because the house looks wrecked.

---

## Raid interest (per template)

| Template | Closet | Basement corner | Attic |
|---|---|---|---|
| `int_cottage` | L0 bedroom closet | coal corner under bedroom | — |
| `int_farm` | L1 front-bedroom closet | under kitchen, far from stair | eave trunk rear ridge |
| `int_townhouse` | L1 rear closet | under kitchen, rear-left | eave trunk rear |
| `int_brick` | L1 hall closet | under kitchen, rear-left | eave trunk rear |
| `int_semi` | L1 rear closet | under kitchen, free-side | eave trunk rear |
| `int_terrace` | L1 rear closet | under kitchen, rear-left | eave trunk (tight) |
| `int_damaged` | L0 closet | boarded bin | — |

Same socket names. Different `instanceId`. The townhouse on the next block is a different pocket.

---

## District lamp through the glass

Front shafts show the **lot’s** street, not a canned HDRI.

| District | What the living pane should read |
|---|---|
| N Belvedere Heights | even warm 2700 K, every pole on |
| W Pearl Row / Harbor | clean 4000 K LED, brighter |
| E Mason Flats | mixed 2700 / 4000 K, ~15% dead — some raids go in dark |
| S Foundry Ward / SE Kiln Spur | dim 2200 K sodium, flicker |

`int_damaged` on E / S is the loudest: missing sash, lamp (or dead pole) sits in the room.

---

## Do not

- Place lots, pads, or meshes. This file is rooms.
- Share one pocket actor across two `instanceId`s.
- Swap the basement U-stair for a ladder.
- Seal street openings. A raid must see the curb lamp.
- Author apartments (`int_apt_*`) here.
- Scale these rooms onto Wrenhollow Manor / Gullwing Estate (48×36).
- Use real-world city names. Invented only: Bellhaven, Port Rook, Belvedere, Pearl Row, Mason Flats, Foundry Ward, Kiln Spur, The Cut.
- Write recipes or lab steps into a stash socket.
