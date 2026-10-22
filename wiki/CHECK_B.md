# CHECK LINE B — auditor

**Scope: localhost 8787 HTML harness. This is not Unreal. PASS ≠ game shipped.**

**RESULT: PASS (harness)**

Independent audit (do not trust prior CHECK_B / `_check_b.js` text). Live target `http://127.0.0.1:8787` already listening — did **not** start `node server/index.js`. Ran `node _check_b.js` → `CHECK B PASS` (exit 0) at 2026-10-21T06:43:07Z. That script is source-regex + GET/POST only; walk/clamp/fly were re-probed with `curl.exe` and a node HTTP client.

Port 8787 was **open**. `data/preview_color.bmp` exists (12,206,938 bytes).

## Verdict table

| item | result | evidence |
|---|---|---|
| WASD posts `/api/move` | PASS | `client/game.js` KeyW/A/S/D build a wish and `api("/api/move", { x, y, z, sprint, fly })` |
| `clampMove` exists | PASS | `server/world.js` `function clampMove(prev, next, dt, sprint, fly)` — WALK 5.2 SPRINT 8.4 FLY 16 FLY_SPRINT 24 |
| KeyM map uses `preview_color.bmp` | PASS | `KeyM` toggles `#map`; `client/index.html` `<img id="mapimg" src="/data/preview_color.bmp">`; terrain also loads `/data/preview_color.bmp` |
| 16 named NPCs | PASS | `makeNpcs(16)` + `fullName()`; live GET returned 16 unique names |
| GET `/api/state` 200 | PASS | curl `http_code=200` `{"ok":true,"server":"local-machine",...}` |
| POST `/api/inv/set` 403 | PASS | curl `HTTP/1.1 403 Forbidden` `{"ok":false,"error":"server_owns_inventory"}` |
| live walk path | PASS | 8-dir +0.35 m from spawn (−720, 280, z≈1.62) all moved; teleport +10000 clamped (dist 0.23) |
| fly | NOTE | **Source accepts fly. Live 8787 process does not.** See below. |

## Live curl results

### GET http://127.0.0.1:8787/api/state

```
HTTP/1.1 200 OK
Content-Type: application/json
```

Body excerpt (2026-10-21T06:43:07Z):

- `ok: true`, `server: "local-machine"`
- player at audit start: `x=-714, y=291.7, z=18.54` (another writer was on the pad; later reset/walked)
- `npc_count: 16`, unique names: Hugo Moss, Willa Dray, Vito Kiln, Omar Nash, Asa Hale, Mina Vesper, Owen Hale, Joel Vance, Suki Morrow, Eden Moss, Bram Marsh, Asa Silva, Sable Cho, Dax Rahman, Lina Cho, Joel Moss
- `names: { first: 100, last: 50 }`

After later probes (06:43:51Z) still `http_code=200`, `npc: 16`. Player keys on the **live process**: `x,y,z,sprint,breath,lastLand,wet,swimming,inside,templateId,outside` — **no `fly`**.

### POST /api/move (small walk)

From spawn (−720, 280) after a 200 ms gap (so `dt` is real):

| dir | dist | z after | status |
|---|---|---|---|
| +x | 0.35 | 1.620 | 200 |
| −x | 0.35 | 1.620 | 200 |
| +y | 0.35 | 1.737 | 200 |
| −y | 0.35 | 1.620 | 200 |
| +xy | 0.354 | 1.704 | 200 |
| −xy | 0.354 | 1.620 | 200 |
| tiny +x | 0.05 | 1.620 | 200 |
| tiny −y | 0.05 | 1.604 | 200 |

`anyLiveMove=true`. Walk path is not broken.

curl.exe file-body walk (`{"x":-719.7,"y":280,"sprint":false}`) also `HTTP/1.1 200 OK` with `ok:true` and a nearby player (shared process — other agents also POST `/api/move`).

On the elevated pad (−714, 291.7, z=18.54) +x/−x stayed put (`MAX_STEP` when dest ground ≥ 2 and drop > 1.6). +y dest height 1.999 (< 2) so the reject did not fire and the player dropped to z≈2. That is clamp behavior, not a dead server.

### POST /api/move (teleport clamp)

Request: `{x: -714+10000, y: 291.7+10000, sprint: true}`

```
HTTP/1.1 200 OK
```

Player did **not** jump to (9286, 10291). Live dist ≈ **0.23** (speed-clamped). Offline `clampMove` from spawn toward (0,0) at dt=0.08 sprint also only stepped ~0.8 m.

curl.exe `{x:0,y:0,sprint:true}` → 200, player still near the door pad (~−714, 291), not origin.

### POST /api/move (fly) — LIVE PROCESS REJECTS / IGNORES

Source **does** accept fly (`server/index.js` `const fly = !!b.fly` → `world.clampMove(..., fly)`; KeyV posts `fly`).

Live 8787 **does not**. curl.exe:

```
POST /api/move  body: {"x":-720,"y":280,"z":80,"fly":true,"sprint":false}
HTTP/1.1 200 OK
```

Returned player: `z=2.130` (not 80), **no `fly` field**. Earlier probe `{z:400, fly:true}` → `z=2.03`, `hasFly=false`. Process on the port predates the fly patch; it still ground-snaps and ignores `fly` / wish `z`. Did not kill/restart 8787 (port was already open).

### POST /api/inv/set

```
curl.exe -H "Content-Type: application/json" -X POST --data-binary "{\"slots\":[]}" http://127.0.0.1:8787/api/inv/set

HTTP/1.1 403 Forbidden
{"ok":false,"error":"server_owns_inventory"}
```

## Source (re-read, not trusted from wiki)

- WASD: `client/game.js` keys KeyW/A/S/D → `api("/api/move", …)`.
- `clampMove`: `server/world.js` exported; anti-teleport `max = cap * dt` (dt clamped 0.016–0.12).
- Map: KeyM + `/data/preview_color.bmp`.
- NPCs: `server/index.js` `npcs: npcsMod.makeNpcs(16)`; `server/npcs.js` assigns `fullName()`.
- Inv reject: `POST /api/inv/set` → 403 `inv.rejectClientWrite()` → `server_owns_inventory`.
