const fs = require("fs");
const path = require("path");

const SAVE = path.join(__dirname, "..", "data", "inv_save.json");
const SLOTS = 20;
const MAX_STACK = 99;
const CATALOG = {
  cash: { name: "Cash", stack: true },
  bag_empty: { name: "Zip Bag", stack: true },
  brick_wrap: { name: "Wrap Roll", stack: true },
  key_house: { name: "House Key", stack: false },
  phone: { name: "Burner Phone", stack: false },
};

function empty() {
  return { slots: Array.from({ length: SLOTS }, () => null), version: 1 };
}

function load() {
  try {
    const raw = JSON.parse(fs.readFileSync(SAVE, "utf8"));
    if (!raw.slots || raw.slots.length !== SLOTS) return empty();
    return raw;
  } catch {
    return empty();
  }
}

function save(inv) {
  fs.writeFileSync(SAVE, JSON.stringify(inv, null, 2));
}

function snapshot(inv) {
  return JSON.parse(JSON.stringify(inv));
}

function add(inv, itemId, count) {
  const def = CATALOG[itemId];
  if (!def) return { ok: false, error: "unknown_item" };
  count = Math.max(1, Math.min(MAX_STACK, Math.floor(Number(count) || 1)));
  if (!def.stack) {
    count = 1;
    if (inv.slots.some((s) => s && s.id === itemId)) {
      return { ok: false, error: "have_one", inv: snapshot(inv) };
    }
  }
  if (def.stack) {
    for (const slot of inv.slots) {
      if (slot && slot.id === itemId && slot.count < MAX_STACK) {
        const room = MAX_STACK - slot.count;
        const take = Math.min(room, count);
        slot.count += take;
        count -= take;
        if (count <= 0) {
          save(inv);
          return { ok: true, inv: snapshot(inv) };
        }
      }
    }
  }
  for (let i = 0; i < inv.slots.length; i++) {
    if (!inv.slots[i]) {
      inv.slots[i] = { id: itemId, count };
      if (itemId === "gun_pistol") inv.slots[i].rounds = 12;
      save(inv);
      return { ok: true, inv: snapshot(inv) };
    }
  }
  return { ok: false, error: "full", inv: snapshot(inv) };
}

function move(inv, from, to) {
  from = Math.floor(from);
  to = Math.floor(to);
  if (from < 0 || to < 0 || from >= SLOTS || to >= SLOTS) return { ok: false, error: "bad_slot" };
  const a = inv.slots[from];
  const b = inv.slots[to];
  if (!a) return { ok: false, error: "empty", inv: snapshot(inv) };
  if (b && b.id === a.id && CATALOG[a.id]?.stack) {
    const room = MAX_STACK - b.count;
    const take = Math.min(room, a.count);
    b.count += take;
    a.count -= take;
    if (a.count <= 0) inv.slots[from] = null;
  } else {
    inv.slots[from] = b;
    inv.slots[to] = a;
  }
  save(inv);
  return { ok: true, inv: snapshot(inv) };
}

function drop(inv, slot) {
  slot = Math.floor(slot);
  if (slot < 0 || slot >= SLOTS || !inv.slots[slot]) return { ok: false, error: "empty" };
  inv.slots[slot] = null;
  save(inv);
  return { ok: true, inv: snapshot(inv) };
}

function rejectClientWrite() {
  return { ok: false, error: "server_owns_inventory" };
}

function countOf(inv, itemId) {
  let n = 0;
  for (const slot of inv.slots) if (slot && slot.id === itemId) n += slot.count;
  return n;
}

function take(inv, itemId, count) {
  count = Math.max(1, Math.floor(Number(count) || 1));
  if (countOf(inv, itemId) < count) return { ok: false, error: "short", inv: snapshot(inv) };
  let left = count;
  for (const slot of inv.slots) {
    if (!slot || slot.id !== itemId || left <= 0) continue;
    const n = Math.min(slot.count, left);
    slot.count -= n;
    left -= n;
  }
  for (let i = 0; i < inv.slots.length; i++) {
    if (inv.slots[i] && inv.slots[i].count <= 0) inv.slots[i] = null;
  }
  save(inv);
  return { ok: true, inv: snapshot(inv) };
}

function removeItem(inv, itemId) {
  const i = inv.slots.findIndex((s) => s && s.id === itemId);
  if (i < 0) return { ok: false, error: "missing", inv: snapshot(inv) };
  const slot = inv.slots[i];
  inv.slots[i] = null;
  save(inv);
  return { ok: true, slot, inv: snapshot(inv) };
}

function persist(inv) {
  save(inv);
  return snapshot(inv);
}

function register(id, def) {
  if (!CATALOG[id]) CATALOG[id] = def;
}

module.exports = {
  CATALOG, SLOTS, load, add, move, drop, snapshot, rejectClientWrite,
  countOf, take, removeItem, persist, register,
};
