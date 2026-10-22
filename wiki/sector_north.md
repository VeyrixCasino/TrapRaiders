# Belvedere Heights (N)

Owner: **agent-sector-north**. Units: **meters**. Origin: island center. **+X east, +Y north, +Z up**. Unreal: ×100 to cm.

Hills, cul-de-sacs, two-house lots, parks, two named mansions, and a club terrace. All names invented. No apartments, no stadium, no subway. Do not add KEEP footprints.

| | |
|---|---|
| AABB | (−900, 400) → (900, 1900) |
| Ground | manicured green (`wiki/ground.md` layer 0) |
| Bake lots | **583** of 1862 (`district: "N"`) |
| Lot field | x −860…820, y **680…1832** (south 280 m of the AABB is roads, not pads) |
| Lot Z | **8.25–50.44** m (avg 24.6). Ridge pads ~50 m; Oriole approach ~8–10 m |
| Block module | `lots.block.north`: **wind 170** / **lng 250** — two-house lots + yards |
| Lights | warm **2700 K**, even, 28 m (`wiki/lights.md`) |
| Trees | oak / maple canopy on estates, hills, Laurel Green (`wiki/trees.md`) |

Pads only. **No houses placed.** KEEP landmarks stay named; neighborhood fill shares interiors (`wiki/housing.md`).

---

## Street fabric

I-9 does **not** loop the north island. The west spine stays west of the ridge. North is collectors, winding locals, and cul-de-sac bulbs. Every paved stub ends in a snap or a **12 m** bulb (`wiki/roads.md`). One-side lighting on the bulbs.

### Named (signs + KEEP)

| Id | Class | W | Role |
|---|---|---:|---|
| `belvedere-blvd` | arterial | 12 | E–W ridge collector. Sign (−180, 1520). Skirts Laurel Green on the north. |
| `belvedere-blvd-bulb` | street | 6 | East end of the boulevard. |
| `northridge` | arterial (bake w 10) | 10 | Far-north collector. Sign (−40, 1860). Ivy Gate peels off. |
| `country-club-rd` | street | 8 | East club loop. Sign (710, 1620). Crestwood branches here. |
| `north-parkway` | arterial | 12 | Generated climb from the city benches toward the terrace. |
| `crestwood-dr` | street | 8 | Cul-de-sac from Country Club. Sign (620, 1710). |
| `laurel-crest` | street | 8 | Cul-de-sac south from Belvedere Blvd. Sign (−420, 1380). Wrenhollow sits on this stem. |
| `ivy-gate` | street | 8 | Cul-de-sac from Northridge. Sign (−710, 1780). |
| `fairway` | street | 8 | Cul-de-sac from Belvedere Blvd. Sign (480, 1480). |
| `oriole-lane` | street | 8 | From Oriole Crossing, dies south of Laurel Green. Sign (80, 720). |
| `oriole-lane-bulb` | street | 6 | Lane end. |
| `oriole-crossing` | bridge | 10 | North bulge of The Cut. Peak Pump is on the **south-west approach**, not the deck. |

Named cul-de-sacs sit on the **32–38 m** club terrace. Collectors first; bulbs branch off.

### Generated `n-*` (56 ids in `data/roads.json`)

| Prefix | Count | W | What |
|---|---:|---:|---|
| `n-wind-0`…`n-wind-7` | 8 (+ 2 end bulbs) | 7 | E–W winding streets on the **170 m** wind module |
| `n-lng-0`…`n-lng-6` | 7 (+ 5 end bulbs) | 7 | N–S long streets on the **250 m** lng module |
| `n-stem-0`…`n-stem-11` | 12 | 6 | Cul-de-sac stems off collectors |
| `n-bulb-0`…`n-bulb-11` | 12 | 6 | Cul-de-sac bulbs (loop back to the stem) |
| `n-dirt-0`…`n-dirt-5` | 6 (+ 4 dirt bulbs) | 4 | Hill tracks / service dirt. Yield onto pavement |

East-grid and west-peninsula ids that clip the AABB (`e-art-*`, `e-ns-*`, `w-lng-*`, `civic-way`, `pearl-st`) are **edges**, not Belvedere fabric. Do not rename them as north streets.

---

## Lot kinds

`data/lots.json` note: *Buildable pads only. No houses placed. `res_2house` = two dwellings, `park_court` = park, `civic` = important building.* North has **no** `city_block` and **no** `yard`. There is **no** `mansion` kind — the two estates are KEEP actors on the ridge, not a lot type.

| Kind | Count | Pad | Raid? | Notes |
|---|---:|---|---|---|
| `house` | **328** | 40 × 36 | yes | One door, one `instanceId` `house-N-*`, pocket `z − 16` |
| `res_2house` | **145** | 56 × 48 | yes (one id) | Two-house lot. Bake still writes **one** door / **one** `instanceId` `res_2house-N-*` |
| `park_court` | **80** | 40 × 36 | no | `templateId` / `instanceId` / `pocket` null. `basement.allowed` false |
| `civic` | **30** | 40 × 36 | no | Same as park. Gaps for chapel / club, not shops |
| **N total** | **583** | | | |

Raid templates on the 473 house + two-house pads (shared interiors, different instanceIds):

| `templateId` | Count |
|---|---:|
| `int_brick` | 133 |
| `int_farm` | 119 |
| `int_cottage` | 112 |
| `int_townhouse` | 109 |

House basement **2.8 m** deep, ~9 × 8 m air under the pad. Do not fill with dirt. Every N door in the bake faces **S** (even park / civic rows that should not be doors).

Sample `house` (ridge, near Wrenhollow): `lot-369` (−428, 1544, z 42.58) `int_townhouse` `house-N-369`, door (−428, 1528.9) S, pocket z 26.58.

Sample `res_2house`: `lot-227` (−860, 1064, z 25.15) `int_brick` `res_2house-N-227`, pad 56 × 48, one south door.

---

## Hills and club terrace

North ridge is the high ground of Bellhaven (`wiki/height.md`). Land 2–62 m; crest **~55 m**, slightly west of center near (−200, 1600). Hold a **200–400 m** plateau — do not spike a single vertex.

| Band | Y | Lot Z (bake) | Read |
|---|---|---|---|
| Oriole approach | AABB 400–680 | **no lots** | Peak Pump + Oriole Crossing. Ground guess ~20 m at the pumps, canal below |
| South face | 680–800 | 8–20, avg ~11 | First pads. Climb starts |
| Mid slope | 800–1200 | avg ~14 | Cinderlane House band. Chapel sits here in KEEP, but bake pads are ~12–15 m |
| Club terrace | 1200–1600 | avg **32.7**, p50 32.9 | Laurel Green shelf. Cul-de-sacs. Slope should stay **< 2%** |
| Ridge | 1600–1900 | avg 36.8, pads to **50.4** | Wrenhollow / Gullwing plateau. Northridge / Ivy Gate saddles 40–48 m |

Highest bake pad: `lot-462` park_court (−188, 1640, **50.44**) next to `lot-441` house (−236, 1640, **50.39**) `int_townhouse`. South face of the ridge is walkable; no playable cliffs. West woods blend 28 → 40 m over ~200 m — no cliff on the district line.

**Club terrace** is a height flatten, not a lot. Laurel Green (80, 1380) is the named green on that shelf. Belvedere Blvd skirts north; Oriole Lane dies south. Do not pave the park.

Pads are locally benched so a house does not sit on a banana. Landscape r16 is the finished floor only.

---

## KEEP landmarks (do not invent extras)

Six north KEEP ids (`wiki/pois.md`). Neighborhood fill must **leave these footprints**.

| Id | Name | x | y | z | w × d | Sit |
|---|---|---:|---:|---:|---|---|
| `n-mansion-01` | Wrenhollow Manor | −420 | 1520 | 42 | 48 × 36 | Laurel Crest / Belvedere. Ridge plateau. Same farmhouse mesh as Gullwing, different pad. |
| `n-mansion-02` | Gullwing Estate | 380 | 1640 | 46 | 48 × 36 | Country Club / Fairway side. Ridge plateau. |
| `n-house-01` | Cinderlane House | −180 | 1180 | 32 | 16 × 14 | Cottage on the mid-hill. Named landmark, not the whole 328-house fill. |
| `n-park-laurel-green` | Laurel Green | 80 | 1380 | 36 | 160 × 120 | Club green. No building, no interior lights. |
| `n-church-01` | Ridgeline Chapel | 280 | 1080 | 30 | 28 × 20 | South of Laurel Green, face downhill / south toward Oriole. |
| `n-gas-01` | Peak Pump | −60 | 560 | 20 | 28 × 20 | Oriole Crossing approach. **Not on the deck.** South of the lot field. |

No N apartments. Housing KEEP in this district is **2 mansions + 1 house**.

---

## Still needs work

1. **Houses are not placed.** 583 pads, 0 meshes. Fill uses shared templates; do not stamp extra KEEP names.
2. **KEEP footprints are not reserved in `lots.json`.** Laurel Green’s 160 × 120 sits on house / `res_2house` pads (no `park_court` within 120 m). Wrenhollow / Gullwing have no 48 × 36 mansion pad — nearest are 40 × 36 `house` / park. Ridgeline Chapel’s nearest pad is `park_court` `lot-609`, not civic. Peak Pump is **~120 m** south of the first lot row (Y 680).
3. **`res_2house` is one raid.** Kind means two dwellings, but each pad has one `instanceId`, one south door, one pocket. Second stoop / second instance is not baked.
4. **Every N door faces S**, including park and civic rows that should not be raid doors (`housing.md`: park / civic have no template). Cul-de-sac and north-facing lots need real facings later.
5. **Club terrace is sculpt, not a lot.** Flatten 32–38 m in Unreal; do not invent a civic “club” KEEP. Civic pads are anonymous 40 × 36 gaps.
6. **South AABB is empty of pads** (Y 400–680). Oriole Crossing + Peak Pump live there. Do not flood that band with house lots.
7. **`.uproject` exists; Landscape not imported.** Heightmap, roads, and lots exist as bake. Import is `wiki/unreal.md`.

Do not edit `_gen_*.js`, server, or client from this file.
