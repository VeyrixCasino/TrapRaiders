/**
 * Same-world interiors. templateId is a look. instanceId is the raid target.
 * Enter/exit never loads a level.
 * Client wiring: KeyE → POST /api/house/enter (nearest door within DOOR_REACH, then the phone gate).
 * Client wiring: KeyF → POST /api/house/exit (back to that door's stoop).
 * Two lots may share templateId (int_townhouse). They must never share instanceId.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
let lots = [];
let templates = {};
try {
  const doc = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "lots.json"), "utf8"));
  lots = (doc.lots || []).filter((L) => L.instanceId);
} catch { /* bake first */ }
try {
  const t = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "housing_templates.json"), "utf8"));
  for (const row of t.templates || []) templates[row.id] = row;
} catch { /* optional */ }

const DOOR_REACH = 4.5;

function byInstance(id) {
  return lots.find((L) => L.instanceId === id);
}

function nearestDoor(x, y) {
  let best = null, bestD = DOOR_REACH;
  for (const L of lots) {
    if (!L.door) continue;
    const d = Math.hypot(L.door.x - x, L.door.y - y);
    if (d < bestD) {
      bestD = d;
      best = L;
    }
  }
  return best;
}

function listDoors() {
  return lots.filter((L) => L.door && L.instanceId);
}

function enter(player, allow) {
  if (player.inside) return { ok: false, error: "already_inside" };
  const lot = nearestDoor(player.x, player.y);
  if (!lot) return { ok: false, error: "no_door" };
  if (typeof allow !== "function") return { ok: false, error: "no_entry", instanceId: lot.instanceId, player };
  const gate = allow(lot) || { ok: false, error: "no_entry" };
  if (!gate.ok) return { ok: false, error: gate.error || "no_entry", instanceId: lot.instanceId, player };
  const pocket = lot.pocket || { x: lot.x, y: lot.y, z: lot.z - 16 };
  player.inside = lot.instanceId;
  player.templateId = lot.templateId || null;
  player.outside = { x: lot.door.x, y: lot.door.y, z: lot.z };
  player.x = pocket.x;
  player.y = pocket.y;
  player.z = pocket.z + 0.2;
  return {
    ok: true,
    instanceId: lot.instanceId,
    templateId: lot.templateId,
    sharedLook: !!templates[lot.templateId],
    note: "same process, no load. this instance is not anyone else's townhouse.",
    raid: !!gate.raid,
    player,
  };
}

function exit(player) {
  if (!player.inside) return { ok: false, error: "not_inside" };
  const back = player.outside || { x: player.x, y: player.y, z: player.z };
  player.inside = null;
  player.templateId = null;
  player.x = back.x;
  player.y = back.y;
  player.z = back.z;
  player.outside = null;
  return { ok: true, player };
}

function moveInside(player, next, dt) {
  const lot = byInstance(player.inside);
  if (!lot) return exit(player);
  const t = Math.max(0.016, Math.min(0.12, dt));
  const max = 5.2 * t;
  let dx = next.x - player.x;
  let dy = next.y - player.y;
  const len = Math.hypot(dx, dy);
  if (len > max + 0.05) {
    dx *= max / len;
    dy *= max / len;
  }
  let x = player.x + dx;
  let y = player.y + dy;
  const pocket = lot.pocket || { x: lot.x, y: lot.y, z: lot.z - 16 };
  if (Math.hypot(x - pocket.x, y - pocket.y) > 9) {
    x = player.x;
    y = player.y;
  }
  player.x = x;
  player.y = y;
  player.z = pocket.z + 0.2;
  player.wet = false;
  player.swimming = false;
  return { ok: true, player };
}

function snapshot(player) {
  const byT = {};
  for (const L of lots) byT[L.templateId] = (byT[L.templateId] || 0) + 1;
  const near = player ? nearestDoor(player.x, player.y) : null;
  return {
    instances: lots.length,
    templates: Object.keys(templates).length,
    perTemplate: byT,
    doorReach: DOOR_REACH,
    keys: { enter: "KeyE", exit: "KeyF" },
    bake: lots.length
      ? "ok"
      : "required — lots.json pads have no instanceId/door/pocket",
    nearDoor: near && near.door
      ? {
          instanceId: near.instanceId,
          templateId: near.templateId,
          x: near.door.x,
          y: near.door.y,
        }
      : null,
    rule: "raid the instanceId on the door you opened, never the template",
  };
}

function reloadLots() {
  try {
    const doc = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "lots.json"), "utf8"));
    lots = (doc.lots || []).filter((L) => L.instanceId);
  } catch { /* keep previous */ }
  return lots.length;
}

module.exports = { enter, exit, moveInside, nearestDoor, byInstance, listDoors, snapshot, reloadLots, DOOR_REACH };
