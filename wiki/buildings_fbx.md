# Buildings — FBX dump

Owner: **agent-buildings-fbx**. Disk inventory only. Every row below is a real `.fbx` under `C:\Users\uybuv\Downloads\TrapRaiders`. **Do not invent files.** KEEP types come from `wiki/pois.md` / `CITY_MAP.md`. Place only those POIs.

Scan: recursive `*.fbx` / `*.FBX`. **19 files.** All sit in the folder root (no nested meshes). Sizes are bytes on disk. MiB = bytes / 1,048,576.

Import dest for building meshes: `/Game/Bellhaven/Meshes/Buildings`. Props / weapons: `/Game/Bellhaven/Meshes/Props`. Import options: `wiki/unreal.md`.

---

## All 19 on disk

| File | Bytes | MiB | Class | KEEP type | Place at (KEEP ids) |
|---|---:|---:|---|---|---|
| `1.fbx` | 56038332 | 53.44 | building | **house** | unnamed dump; treat as `damagedhouse` until opened — `e-house-01` worn stand-in |
| `abandonedhouse.fbx` | 61004044 | 58.18 | building | **abandoned** | `e-abandoned-01` Hollow Storefront; `s-abandoned-01` Dead Bay Shop |
| `brickhouse.fbx` | 62234700 | 59.35 | building | **house** | `e-house-01` Cinderblock House |
| `cokebrick.fbx` | 1384876 | 1.32 | prop | — | crate. **Not** a lab. Do not place as a KEEP building |
| `cook garage.fbx` | 45420876 | 43.32 | building | **garage** | filename = garage (`w-garage-01` `e-garage-01` `s-garage-01`). Near-copy of `cornershop.fbx` — inspect before using as a second type |
| `cornershop.fbx` | 45420860 | 43.32 | building | **convenience** | `e-convenience-01` Twelfth Mart; `s-convenience-01` Overpass Mart. Reuse for **liquor**: `e-liquor-01` `s-liquor-01` |
| `damagedhouse.fbx` | 56038316 | 53.44 | building | **house** | worn east / south house. Reuse for **safe house**: `e-safehouse-01` Line Drop; `s-safehouse-01` Cut Drop |
| `farmhouse.fbx` | 64377052 | 61.39 | building | **house** | `n-house-01` Cinderlane House; `w-house-01` Silt House |
| `frostedblock.fbx` | 13483756 | 12.86 | prop | — | crate. **Not** a lab. Do not place as a KEEP building |
| `garagebuilding.fbx` | 50208652 | 47.88 | building | **garage** | `w-garage-01` Harbor Pit; `e-garage-01` Grid Pit; `s-garage-01` Foundry Pit |
| `pressedblock.fbx` | 17535916 | 16.72 | prop | — | crate. **Not** a lab. Do not place as a KEEP building |
| `rifles.fbx` | 322428 | 0.31 | weapon | — | weapon mesh. Do not place as world dressing |
| `semidetachedhouse.fbx` | 47388892 | 45.19 | building | **house** | west brownstone stand-in — `w-house-01` if `farmhouse` is used on north |
| `submachinegun.fbx` | 1606668 | 1.53 | weapon | — | weapon mesh. Do not place as world dressing |
| `terracedhouse.fbx` | 61477324 | 58.63 | building | **house** | west / east row. Extra house mesh; can fill an **apartment** pad if `townhouse` does not read as a stack |
| `townhouse (1).fbx` | 50527740 | 48.19 | building | **apartment** | duplicate of `townhouse.fbx` — pick **one**. Do not import both as different buildings |
| `townhouse.fbx` | 50527724 | 48.19 | building | **apartment** | all 8 stacks: `w-apt-01` `w-apt-02` `e-apt-01` `e-apt-02` `e-apt-03` `e-apt-04` `s-apt-01` `s-apt-02` |
| `woodencottage.fbx` | 47967724 | 45.75 | building | **house** | north cottage — `n-house-01` if `farmhouse` is used on west |
| `wrappedblock.fbx` | 15686876 | 14.96 | prop | — | crate. **Not** a lab. Do not place as a KEEP building |

**13** building meshes (including 2 near-duplicate pairs). **4** crate props. **2** weapons.

---

## Near-duplicates (do not treat as extra types)

Three pairs differ by **16 bytes**. Same filename family or same size class. Inspect once; keep one mesh.

| Pair | Bytes | Verdict |
|---|---|---|
| `1.fbx` / `damagedhouse.fbx` | 56038332 / 56038316 | unnamed copy of damaged house → **house** |
| `townhouse.fbx` / `townhouse (1).fbx` | 50527724 / 50527740 | same apartment mesh |
| `cook garage.fbx` / `cornershop.fbx` | 45420876 / 45420860 | names disagree. Prefer filename for first place (`garage` vs `convenience`), then open the FBX before using both |

---

## KEEP type → mesh

Reuse is allowed. A missing dedicated mesh is **not** a license to invent an FBX.

| KEEP type | Count (pois) | On-disk mesh | Notes |
|---|---:|---|---|
| apartment | 8 | `townhouse.fbx` (drop `townhouse (1).fbx`) | people-sink. Units inside the stack, not more footprints |
| house | 3 | `farmhouse.fbx` `woodencottage.fbx` `brickhouse.fbx` `semidetachedhouse.fbx` `terracedhouse.fbx` `damagedhouse.fbx` / `1.fbx` | 6 house files for 3 pads. Pick by district: N cottage/farm, W semi, E brick/damaged |
| abandoned | 2 | `abandonedhouse.fbx` | east + south shops |
| garage | 3 | `garagebuilding.fbx` (`cook garage.fbx` only if it is not the corner-shop mesh) | west / east / south pits |
| convenience | 2 | `cornershop.fbx` | east + south marts |
| liquor | 2 | `cornershop.fbx` (reuse) | no liquor FBX on disk |
| safe house | 2 | `damagedhouse.fbx` (reuse) | no safe-house FBX on disk |
| mansion | 2 | **none** | graybox pad only (`n-mansion-01` `n-mansion-02`) |
| lab | 4 | **none** | crates are **not** labs. Graybox `e-lab-01` `s-lab-01` `s-lab-02` `se-lab-01` |
| warehouse | 3 | **none** | graybox |
| bus | 3 | **none** | graybox shelter |
| gas | 2 | **none** | graybox canopy |
| park | 1 | **none** | Laurel Green is landscape, not a mesh |
| church | 1 | **none** | graybox |
| city hall | 1 | **none** | graybox |
| hospital | 1 | **none** | graybox |
| casino | 1 | **none** | graybox |
| ferry | 1 | **none** | graybox slip |
| school | 1 | **none** | graybox |
| neglected lot | 1 | **none** | empty pad |
| water tower | 1 | **none** | graybox |
| pawn | 1 | **none** | graybox; do not steal `cornershop` if both sit on one block — reuse only if needed |
| bar | 1 | **none** | graybox; `cornershop` reuse optional |
| motel | 1 | **none** | graybox |
| basketball | 1 | **none** | court pad, no mesh |
| laundromat | 1 | **none** | graybox |
| police | 1 | **none** | graybox |
| fenced goods | 1 | **none** | yard, no building FBX |
| junkyard | 1 | **none** | yard |
| trailer park | 1 | **none** | pads |
| tent city | 1 | **none** | camp under I-9 South Ramp |
| power | 1 | **none** | graybox substation |
| dead lot | 1 | **none** | empty pad |

No stadium. No subway. No extra footprints.

---

## Suggested place (one mesh per KEEP building pad)

Houses (3 pads, pick one file each):

| Pad | Mesh |
|---|---|
| `n-house-01` Cinderlane House | `woodencottage.fbx` or `farmhouse.fbx` |
| `w-house-01` Silt House | `semidetachedhouse.fbx` or `farmhouse.fbx` |
| `e-house-01` Cinderblock House | `brickhouse.fbx` |

Unused house files (`terracedhouse.fbx`, leftover farm/cottage, `damagedhouse.fbx` if not on a safe house) stay in Content as extras. Do not drop them as new POIs.

Apartments (8 pads, one file):

| Pads | Mesh |
|---|---|
| `w-apt-01` `w-apt-02` `e-apt-01` `e-apt-02` `e-apt-03` `e-apt-04` `s-apt-01` `s-apt-02` | `townhouse.fbx` |

Other pads that have a file:

| Pads | Mesh |
|---|---|
| `e-abandoned-01` `s-abandoned-01` | `abandonedhouse.fbx` |
| `w-garage-01` `e-garage-01` `s-garage-01` | `garagebuilding.fbx` |
| `e-convenience-01` `s-convenience-01` | `cornershop.fbx` |
| `e-liquor-01` `s-liquor-01` | `cornershop.fbx` |
| `e-safehouse-01` `s-safehouse-01` | `damagedhouse.fbx` |

Everything else in the 57-POI list is graybox until a real mesh exists. Do not invent FBXs for them.

---

## Not buildings

| File | Bytes | Why it is listed |
|---|---:|---|
| `cokebrick.fbx` | 1384876 | graybox crate prop |
| `frostedblock.fbx` | 13483756 | graybox crate prop |
| `pressedblock.fbx` | 17535916 | graybox crate prop |
| `wrappedblock.fbx` | 15686876 | graybox crate prop |
| `rifles.fbx` | 322428 | weapon |
| `submachinegun.fbx` | 1606668 | weapon |

These six are on disk so they are in the inventory. They are **not** KEEP building types. Crate names are not lab recipes.
