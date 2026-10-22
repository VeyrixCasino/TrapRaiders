# Shops + civic — KEEP

Owner: **agent-buildings-shops**. Graybox only. **KEEP pads from `wiki/pois.md` only.** No extras, no stadium, no subway.

Coords: meters, origin island center, **+X east, +Y north, +Z up**. `z` is the ground guess from `wiki/pois.md`. Footprint `w` = X extent, `d` = Y extent. Anchor = footprint center. Unreal: ×100 to cm.

District AABBs and street names: `wiki/README.md`, `CITY_MAP.md`, `wiki/signs.md`. Place the actor on the pad; keep the pad **off the pavement** (`wiki/roads.md`).

Housing, labs, warehouses, garages, abandoned, yards, camps, and safe houses are other agents. Water tower is not this file.

KEEP **gas = 2** (N Peak Pump + E Mason Pump). Do not add a third pump.

---

## Counts (this file)

| Type | N | W | E | S | SE | Total |
|---|---:|---:|---:|---:|---:|---:|
| city hall | 0 | 1 | 0 | 0 | 0 | **1** |
| hospital | 0 | 1 | 0 | 0 | 0 | **1** |
| casino | 0 | 1 | 0 | 0 | 0 | **1** |
| ferry | 0 | 1 | 0 | 0 | 0 | **1** |
| school | 0 | 0 | 1 | 0 | 0 | **1** |
| church | 1 | 0 | 0 | 0 | 0 | **1** |
| police | 0 | 0 | 0 | 1 | 0 | **1** |
| pawn | 0 | 0 | 1 | 0 | 0 | **1** |
| convenience | 0 | 0 | 1 | 1 | 0 | **2** |
| liquor | 0 | 0 | 1 | 1 | 0 | **2** |
| bar | 0 | 0 | 1 | 0 | 0 | **1** |
| motel | 0 | 0 | 0 | 1 | 0 | **1** |
| laundromat | 0 | 0 | 0 | 1 | 0 | **1** |
| gas | 1 | 0 | 1 | 0 | 0 | **2** |
| bus | 0 | 1 | 1 | 1 | 0 | **3** |
| basketball | 0 | 0 | 0 | 1 | 0 | **1** |
| park | 1 | 0 | 0 | 0 | 0 | **1** |
| neglected lot | 0 | 0 | 1 | 0 | 0 | **1** |
| dead lot | 0 | 0 | 0 | 1 | 0 | **1** |
| **all** | **3** | **5** | **8** | **8** | **0** | **24** |

---

## FBX map

Dump files live in `C:\Users\uybuv\Downloads\TrapRaiders`. Import dest: `/Game/Bellhaven/Meshes/Buildings` (`wiki/unreal.md`).

| File | Use on KEEP |
|---|---|
| `cornershop.fbx` | **Twelfth Mart** (`e-convenience-01`), **Overpass Mart** (`s-convenience-01`), **Bodega Bottle** (`e-liquor-01`), **Spur Bottle** (`s-liquor-01`) |

That is the only shop FBX on disk. `wiki/unreal.md` already tags it **East convenience / liquor**; south mart + south bottle reuse the same mesh (same **12 × 10** footprint). `wiki/buildings_fbx.md`: `cornershop.fbx` is a 16-byte near-copy of `cook garage.fbx` — **do not** import the cook file as a second shop. Industrial owns `cook garage.fbx` for Foundry Pit.

No city-hall / hospital / casino / ferry / school / church / police / motel / gas / bus / court FBX in the dump. Those pads are **graybox** (box, canopy, shelter, or empty pad) scaled to the footprint.

**Optional reuse only if a second small storefront is needed on a different block:** `e-pawn` (14 × 12) or `e-bar-01` (16 × 12). Default for both is graybox. Do **not** steal `cornershop.fbx` off Twelfth Mart to dress Pawn Row Exchange — they sit on nearby Mason-grid blocks.

Import options: Static Mesh, Combine Meshes on, Convert Scene on. Door ~200 cm. Same batch rules as `wiki/unreal.md` §8. Scale the mesh so XY matches `w` × `d`.

---

## All KEEP shops / civic

| id | name | district | x | y | z | w | d | mesh |
|---|---|---|---:|---:|---:|---:|---:|---|
| w-cityhall | Port Rook City Hall | W | -720 | 280 | 12 | 50 | 40 | graybox civic |
| w-hospital | Harbor Mercy | W | -640 | 520 | 14 | 70 | 50 | graybox wings |
| w-casino | Pike Lights | W | -1480 | 80 | 6 | 60 | 45 | graybox box |
| w-ferry | Pearl Slip | W | -1760 | 40 | 3 | 40 | 24 | graybox slip |
| e-school-01 | Mason Ward School | E | 640 | 540 | 11 | 50 | 40 | graybox school |
| n-church-01 | Ridgeline Chapel | N | 280 | 1080 | 30 | 28 | 20 | graybox chapel |
| s-police-01 | Foundry Precinct | S | -80 | -280 | 8 | 36 | 28 | graybox precinct |
| e-pawn | Pawn Row Exchange | E | 820 | 260 | 9 | 14 | 12 | graybox shop |
| e-convenience-01 | Twelfth Mart | E | 760 | 400 | 10 | 12 | 10 | `cornershop.fbx` |
| s-convenience-01 | Overpass Mart | S | -200 | -480 | 7 | 12 | 10 | `cornershop.fbx` |
| e-liquor-01 | Bodega Bottle | E | 540 | 280 | 9 | 12 | 10 | `cornershop.fbx` |
| s-liquor-01 | Spur Bottle | S | 40 | -360 | 7 | 12 | 10 | `cornershop.fbx` |
| e-bar-01 | The Rusted Tap | E | 900 | 500 | 10 | 16 | 12 | graybox tap |
| s-motel-01 | Neon Rest | S | 160 | -400 | 7 | 40 | 24 | graybox motel |
| s-laundromat-01 | Suds on Spur | S | 320 | -440 | 7 | 16 | 12 | graybox shop |
| n-gas-01 | Peak Pump | N | -60 | 560 | 20 | 28 | 20 | graybox canopy |
| e-gas-01 | Mason Pump | E | 380 | -40 | 8 | 28 | 20 | graybox canopy |
| w-bus-01 | Civic Way Stop | W | -700 | 80 | 10 | 22 | 14 | graybox shelter |
| e-bus-01 | Eighteenth Stop | E | 1060 | 160 | 8 | 22 | 14 | graybox shelter |
| s-bus-01 | Kiln Stop | S | 200 | -800 | 6 | 22 | 14 | graybox shelter |
| s-basketball-01 | Chainlink Court | S | -80 | -1080 | 5 | 32 | 18 | court pad (no building) |
| n-park-laurel-green | Laurel Green | N | 80 | 1380 | 36 | 160 | 120 | park (no building) |
| e-lot-neglected | Weeds End | E | 880 | 80 | 8 | 30 | 24 | empty lot |
| s-dead-lot | South Rim Lot | S | 80 | -1680 | 3 | 40 | 30 | empty lot |

Unreal location: `(x * 100, y * 100, z * 100)`. Snap Z to landscape after sculpt; authored `z` is the guess. Yaw faces the nearest named street unless noted.

---

## Civic (7)

Large pads. Flatten under the footprint (`wiki/height.md`). Clean west LED on Harbor / Pearl / Civic / Ferry; mixed east on the school; flicker sodium on the precinct.

| id | Faces | Notes |
|---|---|---|
| w-cityhall Port Rook City Hall | Harbor Ave | Civic bench **6–10 m**. Harbor Ave vertex (−720, 260) is 20 m south — sit the south facade on that curb. Player spawn for the local walk is this pad (`wiki/gameplay.md`). |
| w-hospital Harbor Mercy | Pearl St | Pad center is a **Pearl St** vertex (−640, 520). Shift the mesh **north** of the curb so the building is not in the street. Largest shop/civic footprint (**70 × 50**). |
| w-casino Pike Lights | Pike / Harbor | West of the I-9 spine (`wiki/roads.md`). Woods roll around a flat **60 × 45** pad at ~6 m. Face the city (east), not the highway. |
| w-ferry Pearl Slip | Ferry Rd | Ferry Rd **ends on this pad**. Lip **3–4 m**. Harbor Span is the west approach. Apron = pavement: no trees (`wiki/trees.md`). Lights on the curb, not the water. |
| e-school-01 Mason Ward School | Mason Ave | **50 × 40** on the Mason grid. Front the arterial (x = 760). Do **not** put dead streetlights on this frontage (`wiki/lights.md`). |
| n-church-01 Ridgeline Chapel | Oriole Lane | South of Laurel Green on the hill terrace (~30 m). Small nave **28 × 20**. Face downhill / south toward Oriole. |
| s-police-01 Foundry Precinct | Overpass | Overpass **starts** at (−80, −280). Sit the precinct **south** of that curb, into the basin. **36 × 28**. |

---

## Shops (8)

Small retail. `cornershop.fbx` on the four **12 × 10** marts / bottles only.

| id | Faces | Mesh |
|---|---|---|
| e-convenience-01 Twelfth Mart | Mason Ave | `cornershop.fbx`. On the Mason curb (x = 760), just south of the Mason Ave sign. Offset off pavement. |
| s-convenience-01 Overpass Mart | Overpass | `cornershop.fbx`. Same mesh, worn / rust read. |
| e-liquor-01 Bodega Bottle | E 12th | `cornershop.fbx`. ~30 m south of E 12th. |
| s-liquor-01 Spur Bottle | Overpass | `cornershop.fbx`. Next to Neon Rest. Neon Liquor is the street name, not a fifth bottle. |
| e-pawn Pawn Row Exchange | Mason Ave / E 12th | Graybox **14 × 12**. Prefer a dead lamp on this block. Do not take Twelfth Mart’s `cornershop`. |
| e-bar-01 The Rusted Tap | Mason Ave | Graybox **16 × 12** taproom. `cornershop` reuse optional, not required. |
| s-motel-01 Neon Rest | Overpass | Graybox **40 × 24** bar / L. One footprint — not extra rooms as new POIs. |
| s-laundromat-01 Suds on Spur | Overpass | Graybox **16 × 12**. Laundry Line is an **east** street name; this pad is south. |

---

## Gas (2) + bus (3)

No canopy or shelter FBX. Graybox only. KEEP gas is **two**, not three.

| id | Faces | Notes |
|---|---|---|
| n-gas-01 Peak Pump | Oriole Crossing | South-west approach of the deck, **not on the deck** (`wiki/roads.md`). Canopy + kiosk inside **28 × 20**. |
| e-gas-01 Mason Pump | Bodega St | Bodega runs x = 380 past this pad. Same canopy family as Peak Pump, worn. |
| w-bus-01 Civic Way Stop | Harbor Ave | Shelter **22 × 14** south of City Hall. Named Civic Way; the authored XY is the Harbor / civic south pad — do not move it up to Civic Way y = 680. |
| e-bus-01 Eighteenth Stop | Laundry Line | Shelter on Laundry Line (y = 180), not a new E 18th building. |
| s-bus-01 Kiln Stop | Foundry | **On the Foundry curb** (`wiki/roads.md`). Offset the shelter off the arterial. |

---

## Parks / lots / court (4)

No building mesh. One KEEP id each. Dressing stays **inside** the pad.

**n-park-laurel-green — Laurel Green** (160 × 120)  
Club green, not a street. Belvedere Blvd skirts north; Oriole Lane dies south of the park. Tree bump **42** oak/maple (`wiki/trees.md`). **No interior lights** — poles only on the road that skirts (`wiki/lights.md`). Layer 0 grass.

**e-lot-neglected — Weeds End** (30 × 24)  
Vacant Mason-grid lot near E 8th / Mason. Ailanthus **EL (8)**. Prefer dead lamps on this block. No storefront.

**s-dead-lot — South Rim Lot** (40 × 30)  
Far-south empty pad (~3 m). Industrial agent does **not** own this id. Tree cell around it is larger (**140 × 120**, density **5**) — still one KEEP footprint. Lights only if a named road runs the edge.

**s-basketball-01 — Chainlink Court** (32 × 18)  
Open court on **Chainlink**. Fence + graybox hoops / slab. No building. Trees stay industrial-sparse (**1**). Not a stadium.

---

## District read-through

**North — Belvedere Heights.** Ridgeline Chapel, Peak Pump on the Oriole Crossing approach, Laurel Green. Warm even lights. No shops.

**West — Pearl Row / Civic Harbor.** City Hall, Harbor Mercy, Pike Lights, Pearl Slip, Civic Way Stop. Clean LED, civic concrete. Harbor plaza and ferry apron stay clear of trees.

**East — Mason Flats.** School, pawn, Twelfth Mart, Bodega Bottle, Rusted Tap, Mason Pump, Eighteenth Stop, Weeds End. Worn brick. `cornershop.fbx` lands here on the two east retail pads.

**South — Foundry Ward.** Precinct, Overpass Mart, Spur Bottle, Neon Rest, Suds on Spur, Kiln Stop, Chainlink Court, South Rim Lot. Rust dirt, flicker sodium. Same `cornershop.fbx` on the two south retail pads.

**SE — Kiln Spur.** Nothing in this file.

---

## Place in Unreal

1. Import **`cornershop.fbx`** once into `/Game/Bellhaven/Meshes/Buildings`.
2. Spawn **24** actors at the table XY (×100). Snap Z to landscape after sculpt.
3. Instance `cornershop` on the **four** convenience / liquor ids. Scale each to **12 × 10**.
4. Civic / motel / police / school / church = boxes of `w` × `d`. Eave ~8–12 m on City Hall / hospital / school; ~6–8 m on chapel / precinct / motel.
5. Gas = canopy volume + small kiosk **inside** the 28 × 20 pad. Bus = shelter **inside** 22 × 14. Court / park / lots = empty pad or fence volume — still one KEEP id each.
6. Shift Harbor Mercy north of Pearl St and Foundry Precinct south of Overpass so the mesh is not in the road.

---

## Do not

- Invent a third gas, a fifth shop, extra bus stops, or a stadium for the court.
- Place `cornershop.fbx` on City Hall, hospital, casino, ferry, school, church, police, motel, gas, bus, or lots.
- Import `cook garage.fbx` as a second corner shop (industrial garage).
- Move Pearl Slip off the ferry lip, Pike Lights onto I-9, or Peak Pump onto Oriole Crossing’s deck.
- Author housing, labs, warehouses, garages, abandoned, yards, camps, safe houses, or Tank Hill Tower here.
- Add stadium or subway.
