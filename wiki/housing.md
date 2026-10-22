# Housing — many houses, shared interiors, raids without a load

Owner: **lead**. Interiors: `wiki/interiors_house.md`, `wiki/interiors_apt.md`.

Lots of houses. A handful of **interior templates**. Every front door is its **own instance**. Same wallpaper does not mean same stash.

## Template vs instance

| | Template | Instance |
|---|---|---|
| What | Shared mesh + room graph (`int_townhouse`, `int_apt_1bed`, …) | One lot, one door, one stash |
| Count | ~10 | one per house / apt unit |
| Data | `data/housing_templates.json` | `data/lots.json` `instanceId` |
| Who owns it | nobody | the lot owner (or empty) |

Two players can both “own a townhouse.” They own **two instanceIds** that happen to use `int_townhouse`. Raiding one never puts you in the other.

Co-own **one** address = two keys, **one** `instanceId`.

## Why a load screen would kill raids

A raid is a run: door, stairs, basement, leave. A load pops the tension, hides the street, and lets the defender’s world pause. So interiors are **not another map**.

## Same-world pockets (no load)

Each instance has a pocket under its lot:

```
door (lot.x, lot.y − front, lot.z)
        │  trigger, same process
        ▼
pocket (lot.x, lot.y, lot.z − 16)
```

- Same server, same tick, same inventory authority.
- Walking in is `POST /api/house/enter` — position jumps a few meters down, no disconnect, no “Loading Bellhaven.”
- Walking out is `POST /api/house/exit` — back on the stoop.
- Unreal later: World Partition streaming volume on the door. Still one persistent map, not a travel.
- Do **not** share one interior actor between two lots. Duplicate the template into the pocket.

Raid = enter **that** door’s `instanceId`. The other townhouse on the next block is a different pocket even if it looks identical.

## Playtest (localhost, no load)

Client keys (same process, no map change):

| Key | POST | Result |
|---|---|---|
| **E** | `/api/house/enter` | Server picks the nearest door within **4.5 m**. `player.inside` becomes **that** `instanceId`. Position jumps to that lot’s pocket (`z − 16`). |
| **F** | `/api/house/exit` | Back on **that** door’s stoop. `inside` cleared. |

`GET /api/state` → `housing.nearDoor` is the door within **4.5 m** (`instanceId`, `templateId`, `x`, `y`), plus `perTemplate` counts. The HUD line is `instanceId` vs `templateId` so testers can see two `int_townhouse` doors are not one room.

`/api/move` while `player.inside` is set goes through `moveInside`: speed-clamped, stuck to **that** pocket (9 m). You cannot walk from townhouse A’s pocket into townhouse B’s.

### Lot fields (bake)

`data/lots.json` rows that can be raided carry `instanceId`, `templateId`, `door`, and `pocket` (`pocket.z = lot.z − 16`). Park / civic / yard have no template and are not doors. If those fields are missing, `housing.snapshot().bake` is `required` and **E** returns `no_door` — do not invent instanceIds on the client.

## Two townhouses, two pockets

Townhouse A and townhouse B can both use `templateId: int_townhouse`. They stay two raids because:

1. Bake writes two rows: `instanceId` `house-E-164` vs `house-E-166` (both `int_townhouse`). Same look, different ids.
2. Each row has its own `door` and its own `pocket` under **its** pad (`280,548` vs `434,548`).
3. **E** at A’s stoop sets `player.inside = house-E-164` and teleports into A’s pocket only.
4. **E** at B’s stoop sets `player.inside = house-E-166` and teleports into B’s pocket only.
5. `moveInside` looks up `byInstance(player.inside)` — A’s clamp never uses B’s origin.

Same wallpaper. Different stash. Raid the door you opened.

## Basements

Pads are flat **on top** so a house does not sit on a banana. Under the pad is air:

- House basement: **2.8 m** deep, ~8×7 m
- Walk-up / city stack: **3.4 m**
- Landscape r16 is the finished floor only. Do not fill the basement volume with dirt.
- Stairs down are inside the template (`wiki/interiors_house.md`).

## Lots of houses

`data/lots.json` is the pad field (hundreds of `house` lots + city stacks). KEEP POIs in `wiki/buildings_housing.md` were the first 2 mansions / 3 houses / 8 apts — those stay as **named** landmarks. The extra houses are the neighborhood fill and share interiors.

Park / civic / yard lots have no `templateId`.
