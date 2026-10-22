# Housing — mansions, houses, apartments

Owner: **agent-buildings-housing**. KEEP only. **2 mansions + 3 houses + 8 apartments**. No extra footprints. Units live **inside** apartment stacks.

Coords: meters, origin island center, **+X east, +Y north, +Z up**. `z` is ground guess from `wiki/pois.md`. Footprint `w` = X extent, `d` = Y extent. Anchor = footprint center. Unreal: ×100 to cm.

Local FBX only (folder `C:\Users\uybuv\Downloads\TrapRaiders`). Allowed: `townhouse.fbx`, `terracedhouse.fbx`, `brickhouse.fbx`, `semidetachedhouse.fbx`, `farmhouse.fbx`, `woodencottage.fbx`, `damagedhouse.fbx`. Do **not** place `townhouse (1).fbx` (duplicate of `townhouse.fbx`) or `abandonedhouse.fbx` (abandoned POIs, other agent).

Apartments = **8 (W2 E4 S2)**.

## FBX rules

| File | Use here |
|---|---|
| `farmhouse.fbx` | North mansions (scale to 48×36). West woods house. |
| `woodencottage.fbx` | North cottage house. |
| `townhouse.fbx` | West nicer apartment stack. |
| `semidetachedhouse.fbx` | West brownstone apartment stack. |
| `terracedhouse.fbx` | East row apartments. |
| `brickhouse.fbx` | East house + east/south brick stacks. |
| `damagedhouse.fbx` | Worn east dock courts + south overpass stack. |

Scale the mesh to the KEEP footprint. One actor per id. Combine meshes on import.

## Mansions (2, N)

| id | name | district | x | y | z | w | d | fbx |
|---|---|---|---:|---:|---:|---:|---:|---|
| n-mansion-01 | Wrenhollow Manor | N | -420 | 1520 | 42 | 48 | 36 | `farmhouse.fbx` |
| n-mansion-02 | Gullwing Estate | N | 380 | 1640 | 46 | 48 | 36 | `farmhouse.fbx` |

Belvedere Heights estates. Same mesh, different pads. Scale up to 48×36. Sit on the north ridge plateau (do not bury in the hill).

## Houses (3)

| id | name | district | x | y | z | w | d | fbx |
|---|---|---|---:|---:|---:|---:|---:|---|
| n-house-01 | Cinderlane House | N | -180 | 1180 | 32 | 16 | 14 | `woodencottage.fbx` |
| w-house-01 | Silt House | W | -1180 | 640 | 16 | 18 | 14 | `farmhouse.fbx` |
| e-house-01 | Cinderblock House | E | 560 | 720 | 12 | 14 | 12 | `brickhouse.fbx` |

North cottage on the hills. West house in the peninsula woods (not a civic brownstone). East house is working-class brick on the Mason grid.

## Apartments (8 = W2 E4 S2)

| id | name | district | x | y | z | w | d | fbx |
|---|---|---|---:|---:|---:|---:|---:|---|
| w-apt-01 | Rowan Stacks | W | -980 | 180 | 11 | 28 | 20 | `townhouse.fbx` |
| w-apt-02 | Brine Court | W | -860 | -80 | 9 | 28 | 20 | `semidetachedhouse.fbx` |
| e-apt-01 | Bodega Arms | E | 480 | 420 | 10 | 28 | 20 | `terracedhouse.fbx` |
| e-apt-02 | Eighth Walk | E | 720 | 180 | 9 | 28 | 20 | `brickhouse.fbx` |
| e-apt-03 | Line Flats | E | 980 | 360 | 9 | 28 | 20 | `terracedhouse.fbx` |
| e-apt-04 | Slip Courts | E | 1240 | 140 | 7 | 28 | 20 | `damagedhouse.fbx` |
| s-apt-01 | Overpass Stacks | S | -280 | -880 | 6 | 28 | 20 | `damagedhouse.fbx` |
| s-apt-02 | Spur Courts | S | 480 | -520 | 7 | 28 | 20 | `brickhouse.fbx` |

West stacks are the nicer pair (townhouse + brownstone). East is tight-grid mix (row / brick / worn dock). South is worn basin housing. People-sink: units inside these eight only — no extra apartment footprints.

## Counts

| Type | N | W | E | S | SE | Total |
|---|---:|---:|---:|---:|---:|---:|
| mansion | 2 | 0 | 0 | 0 | 0 | **2** |
| house | 1 | 1 | 1 | 0 | 0 | **3** |
| apartment | 0 | 2 | 4 | 2 | 0 | **8** |
| **housing** | **3** | **3** | **5** | **2** | **0** | **13** |

## Do not place

- Extra houses, cottages, or stacks to fill streets.
- Motel, trailer park, tent city, abandoned storefronts, safe houses (other agents).
- `townhouse (1).fbx`, `abandonedhouse.fbx`, `1.fbx`, shops, garages.
- Stadium, subway.
