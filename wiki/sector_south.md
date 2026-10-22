# Foundry Ward / The Kiln — South

Owner: **agent-sector-south**. Units: **meters**. Origin: island center. **+X east, +Y north, +Z up**. Fictional names only. Do not invent KEEP pads. Data from `CITY_MAP.md`, `wiki/pois.md`, `data/lots.json`, `data/roads.json`.

The south playable is the **low brown basin inside the I-9 ring**: industrial yards, worn houses, flicker sodium. **Foundry Ward** is the basin floor. **The Kiln / Kiln Spur** is the east industrial apron that stays inside the same ring.

## AABBs

| Id | Name | MinXY | MaxXY | Ground |
|---|---|---|---|---|
| S | Foundry Ward | (−900, −1800) | (1100, −200) | rust brown, flat 2–10 m |
| SE | Kiln Spur | (800, −1600) | (1800, −400) | industrial / rail 4–8 m |

Bake lots that sit on Kiln Spur still carry `district: "S"` in `data/lots.json` (0 lots tagged `SE`). Treat SE as the east apron of the same ring, not a second city.

Splat: rust dirt / industrial layer **3** (`#7A4A2E`) for both S and SE (`wiki/ground.md`). Blend 80–120 m at W∩S, E∩S, S∩SE. Triple mix at **E/S/SE around (800, −400)**. Trees: dead / snag, almost bare (`wiki/trees.md`). Lights: sparse orange sodium **~2200 K**, intensity **0.55**, **flicker** (`wiki/lights.md`).

## Basin

Lowest dry land on Bellhaven. Floor **2–6 m** inside the ring; rim **8–10 m** under the highway berm so I-9 does not sit on a wall. Far-south dead lot **2–3 m**, barely above beach. Soft noise **< 1 m**; street slopes under **3%** (`wiki/height.md`).

`data/lots.json` south block: **118 m N–S × 108 m E–W** (“industrial yard”). Live S pads span about **x −845…1429**, **y −1801…−263**, **z 2…8.87**. That is the basin plus the Kiln apron, all inside the ring.

---

## I-9 ring

`I-9-ring` · `highway` · **w = 18** · **closed**. Clockwise from the west-spine join.

The ring is the south basin’s wall. **Foundry Ward, Kiln Spur, junkyard, trailer park, tent city, and the far-south dead lot stay inside.** I-9 is not a street through the yards.

Join (spine meets ring): **[−1140, −400]** — just west of the S AABB, south of Pearl Row. `I-9-west` ends on this vertex.

### Ring path (authoring corners)

```
[[-1140, -400], [-1180, -860], [-1140, -1380], [-880, -1840],
 [-200, -1960], [400, -1980], [1000, -1880], [1480, -1520],
 [1640, -1100], [1500, -800], [1340, -720], [1100, -400],
 [800, -260], [460, -280], [100, -240], [-400, -300],
 [-800, -380], [-1140, -400]]
```

Live `data/roads.json` keeps the same loop (37 pts) and densifies the **north rim** from [1100, −400] back to the join so the deck can sit on The Cut.

| Segment | About | Role |
|---|---|---|
| West arc | x ≈ −1180…−880, y ≈ −400…−1840 | Berm west of the yards; woods / harbor stay **outside** |
| South rim | y ≈ −1840…−1980 | Low berm above the dead lot and trailer pads |
| East arc | x ≈ 1480…1640, then back to [1100, −400] | Inland of the 3 m docks; Kiln apron inside |
| North rim | y ≈ −240…−400 | Seam toward Mason Flats / Pearl Row; rides The Cut |

| Crossing | On ring at | Role |
|---|---|---|
| **I-9 South Ramp** | [460, −280] | North-rim deck over The Cut. Sign in Foundry Ward. Local street `overpass` meets the deck. Tent city (`s-tent-city`, −120, −1240) sits **under** the ring / ramp, not on a new highway. |
| **Kiln Overpass** | [1340, −720] | East deck over The Cut. Sign in Kiln Spur. `kiln-rd` stays **inside** the ring. |

`I-9-city` leaves the ring at the South Ramp **[460, −280]** and climbs into Mason Flats (past Mason Ave at [760, 420]) — that is the highway out of the basin toward East, not a second freeway through the yards.

Tree keep-out ±**36 m** from I-9. Project ring points onto the 8–10 m berm except the two Cut decks (hold Z ~ **14–16 m**).

---

## Foundry arterial

`foundry` · `arterial` · **w = 12**. E–W main drag on the basin floor. Sign **Foundry (−60, −820)**.

```
[[-840, -784], [-520, -800], [-280, -810], [-60, -820],
 [200, -830], [480, -850], [720, -870], [1000, -880]]
```

Live polyline starts **[−840.22, −783.77]** and ends **[1000, −880]**. Slight south drift as it runs east. Kiln Stop (`s-bus-01`, 200, −800) sits on this curb. Foundry Pit (`s-garage-01`, −520, −760) and Kiln Assay (`s-lab-01`, −180, −720) face it from the north. Overpass Stacks (`s-apt-01`, −280, −880) sit just south of the curb.

### Kiln Rd (continues Foundry into the spur)

`kiln-rd` · `arterial` · **w = 12**. Same 12 m pavement, new name at the S/SE handoff.

```
[[1000, -880], [1140, -900], [1280, -920], [1420, -980], [1560, -1080]]
```

Sign **Kiln Rd (1280, −920)**. Passes under / along Kiln Overpass. `shoreEnd` at the SE Cut mouth. Rail Bench (`se-lab-01`, 1420, −980) is the only KEEP pad in Kiln Spur. Local **Spur** (1420, −980) → (1600, −1280) peels off toward the rail apron.

### Named south locals (not highways)

| id | Sign | What |
|---|---|---|
| `overpass` | (180, −360) | North-rim street from Foundry Precinct (−80, −280) to I-9 South Ramp [460, −280] |
| `junkyard-cut` | (−480, −1460) | Deep-basin cut to Rook Scrap (−360, −1360) |
| `neon-liquor` | (140, −940) | Drops south from Foundry (−60, −820) past Foundry Bench (220, −980) |
| `chainlink` | (−220, −1280) | N–S toward tent city / Chainlink Court |
| `spur` | (1520, −1180) | Kiln apron only |

Generated fill: a **7 m** N–S / E–W grid on the 118 × 108 industrial module, plus `s-ew--1192` (11 m arterial along y ≈ −1200), `s-frontage` on the Kiln lip, and two diagonals (`s-diag-a`, `s-diag-b`). Cul-de-sac bulbs close stubs that would otherwise dangle at the ring. Do not promote any of these to a named sign.

---

## How S meets East

Mason Flats AABB starts at **Y = −200**, X = 200…1900. Foundry Ward’s north edge is the same **Y = −200**, X = −900…1100. They **touch**, they do not overlap — treat the seam as a full **100 m** splat blend, not a 1 m cut (`wiki/ground.md`).

- **I-9 north rim** (y ≈ −240…−400) sits in the seam. Basin streets stay south of the berm; Mason grid starts north of it.
- **I-9 South Ramp [460, −280]** is the gate. `overpass` feeds it from the basin. `I-9-city` leaves it and is in East by ~[491, −156].
- **Mason Ave** (`mason-ave`) begins at **[760, −160]** — just north of the S max-Y. It does not enter the basin.
- A few generated `s-ns-*` stubs punch the line to y ≈ −160 (near x = 300, 418, 536). Those are curb snaps, not a south extension of the East numbered grid.
- E/S/SE triple corner **(800, −400)**: worn brick (E) mixes with rust dirt (S/SE). Kiln Overpass is east of this corner.

East is dense brick grid and docks. South is yards and worn houses **inside the ring**. Do not continue E 8th / E 12th / E 18th into the basin.

## How S meets West

Pearl Row / Harbor AABB: (−1900, −400) → (−200, 1200). Overlap with Foundry Ward is the rectangle **X −900…−200, Y −400…−200** — the north-west lip of the basin, still inside / against the ring.

- **I-9-west** drops out of the woods and **joins the ring at [−1140, −400]**, just west of S min-X. Harbor stays outside the loop; the basin stays inside.
- **`w-lat-0`** (west arterial) runs **[−1781, −183] → [−215, −253]** along the harbor side of the seam and bulbs at **[−208, −240]** — civic concrete meeting rust dirt, not a Foundry street.
- **Pike** ends near Harbor Pit (`w-garage-01`, −520, −160), north of the overlap. That is West. South of Pike, yards begin.
- West NS locals (`w-lng-4`, etc.) stop around y ≈ −200…−216. South NS locals stop around the same line from the other side.

West is clean LED / brownstone. South is flicker sodium / rust. Blend in the overlap; do not carry Harbor Ave or Civic Way into the Kiln.

---

## Industrial yards

`kind: "yard"` · **205** pads · all **90 × 82** · no interior template · `district: "S"`.

These are the industrial lots the south block size was authored for. They sit on the basin floor and the Kiln apron (x to **1384**, y to **−1760**). Z **2.00…8.56** (median ~7.45). Spread: 33 west-rim, 44 west-mid, 37 center, 48 east-mid, 43 Kiln. Deep basin (y −1500…−1000) holds the most (83). **16** sit on the Foundry band (|y + 820| < 80). **20** sit on the E seam (y > −450, x > 200); **13** on the W seam.

KEEP yards / sheds (named, from `wiki/pois.md` only — do not add footprints):

| id | name | x | y | z | w | d |
|---|---|---:|---:|---:|---:|---:|
| s-warehouse-01 | Ring Shed | −420 | −560 | 7 | 50 | 36 |
| s-warehouse-02 | Chainlink Pit | 80 | −640 | 6 | 48 | 32 |
| s-junkyard | Rook Scrap | −360 | −1360 | 4 | 80 | 60 |
| s-fenced-goods | Chainlink Yard | 400 | −1120 | 5 | 24 | 20 |
| s-power | Basin Substation | 720 | −1320 | 5 | 32 | 24 |
| s-trailer-park | Basin Pads | 280 | −1480 | 4 | 70 | 50 |
| s-tent-city | South Ramp Camp | −120 | −1240 | 4 | 50 | 30 |
| s-dead-lot | South Rim Lot | 80 | −1680 | 3 | 40 | 30 |

Chainlink Pit is the fight club. Tent city is under the I-9 South Ramp. Dead lot is the far-south empty pad. The other **205** yard lots are unnamed industrial pads — chainlink, slag, parked hulks — not extra KEEP buildings.

## Worn houses

`kind: "house"` · **170** pads · all **36 × 32** · `district: "S"`.

There is **no KEEP named house** in Foundry Ward (apartments = 2, houses = 0 in the KEEP table). These 170 lots are the worn dwelling fill: stoops on the industrial module, not Belvedere cottages and not Mason row.

| Interior template | Count |
|---|---:|
| `int_damaged` | 48 |
| `int_brick` | 44 |
| `int_farm` | 41 |
| `int_cottage` | 37 |

Z **2.17…8.75** (median ~7.44). Mixed through the same grid as the yards (not a separate suburb). **17** on the Foundry band. North-rim / seam houses sit higher (~7.5–8.5 m) and lean brick / damaged toward East, farm / cottage toward the west lip. South-rim and Kiln houses drop toward **3 m**.

KEEP people-sinks (units live **inside** these stacks only):

| id | name | x | y | z | note |
|---|---|---:|---:|---:|---|
| s-apt-01 | Overpass Stacks | −280 | −880 | 6 | damaged stack south of Foundry |
| s-apt-02 | Spur Courts | 480 | −520 | 7 | brick stack toward Kiln / north rim |
| s-motel-01 | Neon Rest | 160 | −400 | 7 | north rim, near Overpass |

Also on the floor (KEEP, not extra houses): Kiln Assay, Foundry Bench, Foundry Precinct (−80, −280), Overpass Mart, Suds on Spur, Spur Bottle, Chainlink Court, Foundry Pit, Kiln Stop, Cut Drop, Dead Bay Shop.

Civic fill: **52** pads **48 × 40**. Courts / gaps: **67** pads **40 × 36**. No new names.

---

## Style (south only)

- Ground: rust dirt, packed slag, chainlink. Not manicured green. Not clean west concrete.
- Streets: Foundry / Kiln 12 m arterials; locals 7–8 m; I-9 18 m on the berm.
- Lights: flicker sodium, 32 m, no field scatter on brownfield.
- Trees: dead snags; only marked dead-lot cells rise above industrial 1/cell.
- No stadium. No subway. No extra KEEP footprints. No real-city names on signs.

Signs that belong here: **Foundry, Kiln Rd, Spur, Overpass, Junkyard Cut, Neon Liquor, Chainlink, I-9 South Ramp, Kiln Overpass**.
