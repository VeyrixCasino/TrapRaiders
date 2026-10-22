# Pearl Row / Harbor (W)

Owner: **agent-sector-west**. Units: **meters**. Origin: island center. **+X east, +Y north, +Z up**. Unreal: ×100 to cm.

Island: **Bellhaven**. City: **Port Rook**. Fictional names only. Do not invent KEEP pads.

AABB: **(−1900, −400) → (−200, 1200)**. Clean urban concrete plus peninsula woods. Upper-middle. Lights: cool **4000 K** LED, **22 m**, intensity **1.25**, no dead lamps (`wiki/lights.md`). Splat layer 1 (`#B9B6AE`). Street oaks on the civic grid; dense oak/maple on the west woods (`wiki/trees.md`).

Ground: harbor tip **3–4 m**, civic bench **6–10 m**, woods **12–28 m**. Highest knoll **~28 m** at (−1400, 600). Player spawn is **Port Rook City Hall (−720, 280)**.

Bake lots (`data/lots.json`, district `W`): **559** pads. Block module **lat 170 / lng 210** (two-house / brownstone). No `city_block` rows — west density is house + duplex, not east-style 108×100 stacks.

| kind | n | typical pad | z range |
|---|---:|---|---|
| `house` | 350 | 38 × 34 | 8.6–39.0 |
| `res_2house` | 120 | 54 × 46 | 9.0–36.8 |
| `park_court` | 53 | court / green gap | 9.0–33.7 |
| `civic` | 36 | 38 × 34 (KEEP civic is larger) | 11.1–31.2 |

Interior templates on raidable W pads: `int_townhouse` 113, `int_brick` 128, `int_semi` 120, `int_cottage` 109. Park / civic have no door.

---

## KEEP (do not add)

| id | name | x | y | z | w | d |
|---|---|---:|---:|---:|---:|---:|
| w-cityhall | Port Rook City Hall | −720 | 280 | 12 | 50 | 40 |
| w-hospital | Harbor Mercy | −640 | 520 | 14 | 70 | 50 |
| w-casino | Pike Lights | −1480 | 80 | 6 | 60 | 45 |
| w-ferry | Pearl Slip | −1760 | 40 | 3 | 40 | 24 |
| w-apt-01 | Rowan Stacks | −980 | 180 | 11 | 28 | 20 |
| w-apt-02 | Brine Court | −860 | −80 | 9 | 28 | 20 |
| w-house-01 | Silt House | −1180 | 640 | 16 | 18 | 14 |
| w-garage-01 | Harbor Pit | −520 | −160 | 8 | 32 | 24 |
| w-bus-01 | Civic Way Stop | −700 | 80 | 10 | 22 | 14 |

Nine KEEP. Apartments = **2** (nicer pair). No lab, no gas, no stadium, no subway.

---

## Coast arterial

`west-coast` is the peninsula **coast arterial** (`arterial`, width **9 m**, 87 pts). It is not I-9.

South start **[−1390, −360]** near the I-9 west/ring join, then west along the shore: **[−1780, −184]**, out to the lip **[−1954, 36]**, past Harbor Span at y ≈ 160, north along the water **[−1954, 806]**, then inland-north to **[−1078, 1312]** (leaves the W AABB toward Belvedere woods).

`west-inner` (`arterial`, width **8 m**, 85 pts) runs the same peninsula one block inland: **[−1432, −315] → [−1008, 1205]**. Casino / knoll sit between inner arterial and the I-9 spine.

Named Harbor Ave (`harbor-ave`, `arterial`, width **10 m**) is the **civic** coast connector, not the long shore run:

```
[[-1760, 160], [-1560, 200], [-1280, 240], [-900, 240], [-720, 260], [-310, 190]]
```

Sign (−1280, 240). East end is **Cut Bridge**. West end is the Harbor Span approach / Ferry Rd.

---

## Harbor + ferry

The Cut’s **west mouth** opens at the harbor. Canal polyline (`the-cut`, water width **50 m** in the bake) enters at **[−1880, 720]**, follows Waterfront south to **[−1840, 160]** (**Harbor Span**), then turns inland **[−1560, 200] → [−1400, 280] → [−900, 240]** under Harbor Ave.

**Harbor Span** — `harbor-span` · `bridge` · width **12**. Deck at y ≈ 160. Bake pts first **[−1920, 166]** → last **[−1760, 160]**. Do not fill The Cut.

**Pearl Slip** (w-ferry) sits on the east approach at **(−1760, 40)**, lip **3 m**. **Ferry Rd** (`ferry-rd`, street, width 8) drops from the span to the slip:

```
[[-1840, 160], [-1760, 80], [-1760, 40]]
```

Sign (−1760, 80). Apron is pavement: no trees, lights on the curb not the water.

**Waterfront** (`waterfront`, street, width 8) is the north-bank harbor street: **[−1880, 720] → [−1840, 160]** (sign −1820, 520). It is the west-mouth towpath, not a second arterial.

**Pike Lights** (casino) is inland of the slip, **west of I-9-west**, pad (−1480, 80). Face the city (east), not the highway. **Pike** (`pike`, street, width 8) is the south civic local: **[−1280, −80] → [−520, −160]**, sign (−980, −80). Brine Court and Harbor Pit sit on this band. Bake ends in a cul-de-sac bulb (`pike-bulb`).

---

## Civic + brownstones

Civic floor is the flat **6–10 m** bench around City Hall / Harbor Mercy / Civic Way Stop. Harbor Ave vertex (−720, 260) is the City Hall south curb. Harbor Mercy sits on a **Pearl St** vertex (−640, 520) — shift the mesh north of the curb. Civic Way Stop is the Harbor Ave south pad at (−700, 80); do not slide it up to Civic Way y = 680.

**Pearl St** (`pearl-st`, street, width 8): **[−980, 400] → [−540, 560]**, sign (−720, 480). Bake continues to a bulb (`pearl-st-bulb`). Rowan Stacks is south of this line; Harbor Mercy is on it.

**Civic Way** (`civic-way`, street, width 8): **[−720, 680] → [120, 610]**, sign (−540, 680). East end is **Oriole Crossing** (north bulge of The Cut). This is the north civic collector toward Belvedere, not a harbor street.

Brownstones are the **120 `res_2house`** pads (54 × 46) plus the two nicer stacks:

- **Rowan Stacks** — `townhouse` walk-up at (−980, 180), Harbor Ave / Pearl band.
- **Brine Court** — `semidetached` brownstone stack at (−860, −80), Pike band.

`int_semi` / `int_townhouse` / `int_brick` fill the civic laterals. **Silt House** (−1180, 640) is the one woods house (not a civic brownstone), on the knoll slope near park_court lot-993.

Grid laterals (bake `w-lat-0`…`w-lat-7`): E–W, roughly y **−200 / 0 / 90 / 280 / 440 / 610 / 780 / 950**. **0, 3, 6** are arterials (width **10**); the rest are streets (width **7**). Longs `w-lng-0`…`w-lng-5` are N–S streets (width **7**) near x **−1680 / −1470 / −1240 / −1040 / −840 / −620**. Twenty-seven `w-spur-*` stubs (width **6**) end in bulbs where they do not snap.

---

## The Cut bridges (W connections)

Pearl Row owns the **west-mouth** and **central** crossings. Decks are painted; the canal stays depressed (`wiki/roads.md`, `wiki/height.md`).

| Bridge | id | width | On The Cut at | West-side streets |
|---|---|---:|---|---|
| **Harbor Span** | `harbor-span` | 12 | [−1840, 160] | Ferry Rd, Waterfront, Harbor Ave west end, `west-coast` |
| **Cut Bridge** | `cut-bridge` | 12 | [−310, 190] | Harbor Ave east end. Deck **[−319, 82] → [−310, 352]**. Pearl Row north, Pike / basin south. Sign (−310, 190), district W. |
| **Oriole Crossing** | `oriole-crossing` | 10 (bake) | [120, 610] | Civic Way east end. Deck sits in Belvedere; Peak Pump is the SW approach, not on the deck. |

I-9 South Ramp and Kiln Overpass are **not** west crossings. Do not add a fourth named bridge.

`cut-bridge-bulb` is the south stub so Cut Bridge does not dangle.

---

## I-9 west

The only highway. **I-9-west** spine (`highway`, bake width **18 m**, 26 pts, `shoreEnd`) runs **north → south through the west woods**, then joins the south ring.

Bake polyline (north → join):

```
[[-1520, 1680], [-1480, 1320], … [-1600, 200], [-1540, -80], [-1280, -280], [-1140, -400]]
```

- Stays **west of** Pike Lights (−1480, 80) and **west of** the 28 m knoll (−1400, 600).
- Does **not** cut the 55 m north ridge. North of the W AABB it is only a woods approach.
- **24 / 26** vertices sit inside the W AABB. First in-AABB point ≈ **[−1490, 1140]**; last is the join.
- **Join** with **I-9-ring**: **[−1140, −400]** — SW corner of the W AABB, where Pearl Row meets Foundry’s north rim.
- Landscape berm under the west arc **10–16 m**. Tree keep-out ±**36 m**. Casino faces east, away from the fence.

`west-coast` / `w-lat-0` pick up local traffic near that join; they are streets, not a second freeway. No I-10. No harbor freeway.

---

## Read-through

Harbor mouth (Pearl Slip + Harbor Span) → Ferry Rd / Waterfront → Harbor Ave civic bench (City Hall, Civic Way Stop, Rowan Stacks) → Pearl St (Harbor Mercy) and Pike (Brine Court, Harbor Pit) → Cut Bridge at x = −310. Civic Way is the north exit to Oriole Crossing. I-9-west is the woods bypass, joining the ring at (−1140, −400). Brownstone lots fill the 170 × 210 module between those streets. Woods and Silt House stay off the civic floor.
