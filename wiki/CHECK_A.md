# CHECK A — independent disk audit

**Scope: Node tree + bake files. This is not an Unreal ship check.**

Auditor: CHECK LINE A. Ran `node _check_a.js` (exit 0, printed `CHECK A PASS`) then **re-measured every file on disk**. Did not trust prior wiki, other agents, or `data/meta.json` until the arrays were parsed.

Workspace: `C:\Users\uybuv\Downloads\TrapRaiders`  
Node: `C:\Program Files\nodejs\node.exe`  
When: 2026-10-21 (local)

## Verdict

**PASS** — bake is not garbage. roads ≥ 80, lots present, heightmap exact size.

## 1. server/*.js

6 files. Line counts from `split(/\r?\n/)`. Class: `> 50` lines = real code.

| file | lines | bytes | class | note |
|---|---|---|---|---|
| `server/housing.js` | 128 | 3836 | **real** | loads `lots.json` + templates; enter/exit by `instanceId` |
| `server/index.js` | 142 | 5125 | **real** | HTTP 8787; `POST /api/inv/set` → 403 `rejectClientWrite()`; house enter/exit; `/api/move` |
| `server/inventory.js` | 100 | 2795 | **real** | `save()` writes `data/inv_save.json`; `rejectClientWrite` present |
| `server/names.js` | 15 | 355 | **stub** | thin loader of `data/names.json` + `fullName()` |
| `server/npcs.js` | 53 | 1318 | **real** | 16 named NPCs, server tick |
| `server/world.js` | 101 | 2845 | **real** | bilinear height sample + `clampMove` |

## 2. client/*

3 files.

| file | lines | bytes | class | note |
|---|---|---|---|---|
| `client/game.js` | 304 | 9883 | **real** | THREE.js view, WASD, KeyM/KeyE/KeyF, inventory HUD |
| `client/index.html` | 39 | 1368 | **stub** | shell only |
| `client/style.css` | 26 | 2270 | **stub** | compact HUD CSS (bytes are not tiny; line-count still stub) |

## 3. data/names.json

Parsed object keys: `first`, `last`.

| pool | count | unique | sample |
|---|---|---|---|
| first | **100** | 100 | Ava, Milo, … Yuli |
| last | **50** | 50 | Vesper, Kiln, … Torres |

## 4. data/heightmap.r16

| check | value |
|---|---|
| exists | yes |
| bytes | **8136578** |
| expected `2017 * 2017 * 2` | 8136578 |
| match | **yes** |

## 5. data/lots.json

| check | value |
|---|---|
| exists | **yes** |
| bytes | 997803 |
| shape | `{ units, note, block, lots[] }` |
| `lots.length` | **1862** |

Kinds counted from the array (not from meta):

| kind | n |
|---|---|
| house | 910 |
| res_2house | 265 |
| park_court | 209 |
| yard | 205 |
| city_block | 147 |
| civic | 126 |

Sample `lot-0`: `city_block` at (314, -60), w/h 92×84, `instanceId` `city_block-E-0`, basement + door + pocket present.

## 6. data/roads.json

| check | value |
|---|---|
| exists | yes |
| bytes | 368945 |
| type | top-level **array** |
| count | **346** (≥ 80) |

Types counted from the array:

| type | n |
|---|---|
| street | 307 |
| arterial | 25 |
| dirt | 6 |
| highway | 4 |
| bridge | 3 |
| water | 1 |

Sample `[0]`: `id=the-cut` `type=water` 20 pts.

## 7. data/intersections.json

| check | value |
|---|---|
| exists | yes |
| bytes | 218889 |
| type | top-level **array** |
| count | **770** |

Control types counted from the array:

| control | n |
|---|---|
| stop | 640 |
| signal | 68 |
| allway_stop | 44 |
| yield | 18 |

Sample `ix-0`: (759.98, -262.35) degree 2, roads `I-9-ring` + `mason-ave`, control `signal`.

## 8. `_check_a.js` contract (script, then re-read source)

| item | result | evidence |
|---|---|---|
| file list ≥ 5 server / ≥ 3 client | PASS | 6 / 3 |
| POST `/api/inv/set` rejected + file save | PASS | `index.js` L88–90 403; `inventory.js` `rejectClientWrite` + `save()` → `inv_save.json` |
| names 100 / 50 | PASS | parsed |
| heightmap.r16 size | PASS | 8136578 |
| intersections.json exists | PASS | 218889 bytes / 770 records |

## Garbage-bake tripwires (this line's job)

| tripwire | threshold | observed | |
|---|---|---|---|
| roads | < 80 → FAIL | 346 | ok |
| lots | missing → FAIL | present, 1862 | ok |
| heightmap size | ≠ 8136578 → FAIL | 8136578 | ok |

**No third check line needed.**
