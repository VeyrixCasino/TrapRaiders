/**
 * Bellhaven Mobile. The client draws the phone. This module is the only writer
 * for prices, trades, photos, houses, heat, and guns.
 * DrugProfiles.json stays here. Players get id, display name, class, and their price.
 */
const fs = require("fs");
const path = require("path");
const inv = require("./inventory");
const housing = require("./housing");
const world = require("./world");

const SAVE = path.join(__dirname, "..", "data", "phone_save.json");
const PROFILES = path.join(__dirname, "..", "ui", "BellhavenSubstancePhone", "Config", "DrugProfiles.json");
const PLAYER = "local";
const BASE = { Opioids: 80, Benzodiazepines: 45, Stimulants: 70, Dissociatives: 55 };

let drugs = [];
let db = null;
let seq = 1;
let heatAcc = 0;

function uid(prefix) {
  seq += 1;
  return prefix + Date.now().toString(36) + seq;
}

function loadDrugs() {
  try {
    const doc = JSON.parse(fs.readFileSync(PROFILES, "utf8"));
    const rows = Array.isArray(doc.drugs) ? doc.drugs : [];
    drugs = rows
      .filter((d) => d && d.id && d.displayName)
      .map((d) => ({ id: String(d.id), name: String(d.displayName), klass: String(d.class || "") }));
  } catch {
    drugs = [];
  }
  for (const d of drugs) inv.register(d.id, { name: d.name, stack: true });
  inv.register("mask", { name: "Mask", stack: false });
  inv.register("gun_pistol", { name: "Pistol", stack: false });
}

function fresh() {
  return {
    prices: {},
    photos: [],
    contacts: [],
    messages: [],
    packages: [],
    loop: [],
    calls: [],
    owners: {},
    npcHome: {},
    armed: {},
    ownerHome: {},
    stash: {},
    clients: [],
    seen: [],
    bodies: [],
    harbor: 0,
    wick: 0,
    heat: 0,
    mask: false,
    burned: false,
    heatMarks: {},
    defender: null,
  };
}

function loadDb() {
  try {
    const raw = JSON.parse(fs.readFileSync(SAVE, "utf8"));
    db = { ...fresh(), ...raw, heatMarks: raw.heatMarks || {} };
  } catch {
    db = fresh();
  }
  db.defender = null;
}

function save() {
  const copy = { ...db, defender: null };
  fs.writeFileSync(SAVE, JSON.stringify(copy));
}

function drugById(id) {
  return drugs.find((d) => d.id === id);
}

function ensurePrices() {
  for (const d of drugs) {
    if (!Number.isFinite(db.prices[d.id])) db.prices[d.id] = BASE[d.klass] || 50;
  }
}

function assignHomes(npcs) {
  const doors = housing.listDoors()
    .filter((L) => L.kind === "house" || L.kind === "res_2house")
    .slice()
    .sort((a, b) => String(a.instanceId).localeCompare(String(b.instanceId)));
  let n = 0;
  for (const npc of npcs) {
    if (db.npcHome[npc.id] && housing.byInstance(db.npcHome[npc.id])) continue;
    while (n < doors.length && db.owners[doors[n].instanceId]) n += 1;
    if (n >= doors.length) break;
    const lot = doors[n++];
    db.owners[lot.instanceId] = npc.id;
    db.npcHome[npc.id] = lot.instanceId;
    if (npc.id.slice(4) % 10 < 3) {
      db.armed[lot.instanceId] = true;
      db.ownerHome[lot.instanceId] = Number(npc.id.slice(4)) % 2 === 0;
      if (!db.stash[lot.instanceId]) db.stash[lot.instanceId] = [{ id: "gun_pistol", rounds: 8 }];
    }
  }
}

function makeOrder() {
  const pool = drugs.slice();
  const count = Math.min(pool.length, 1 + Math.floor(Math.random() * 3));
  const order = [];
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * pool.length);
    const d = pool.splice(j, 1)[0];
    order.push({ id: d.id, qty: 1 + Math.floor(Math.random() * 2) });
  }
  return order;
}

function ensureClients(npcs) {
  if (db.clients.length >= 4) {
    for (const c of db.clients) {
      const n = npcs.find((x) => x.id === c.npcId);
      if (n) c.name = n.name;
    }
    return;
  }
  db.clients = [];
  for (let i = 0; i < 4 && i < npcs.length; i++) {
    const n = npcs[i];
    db.clients.push({
      id: "client_" + n.id,
      npcId: n.id,
      name: n.name,
      trust: 20,
      order: drugs.length ? makeOrder() : [],
      lastFeedback: "",
    });
  }
}

function boot(state) {
  loadDrugs();
  loadDb();
  ensurePrices();
  if (state.player.hp == null) state.player.hp = 100;
  assignHomes(state.npcs);
  ensureClients(state.npcs);
  for (const p of db.photos) {
    const n = state.npcs.find((x) => x.id === p.who);
    if (n) p.name = n.name;
  }
  save();
}

function pushMsg(from, text) {
  db.messages.unshift({ id: uid("m"), from, text, unread: true, at: Date.now() });
  db.messages = db.messages.slice(0, 40);
}

function pushLoop(text) {
  db.loop.unshift({ id: uid("l"), text, unread: true, at: Date.now() });
  db.loop = db.loop.slice(0, 40);
}

function addHeat(n, line) {
  db.heat = Math.min(100, db.heat + n);
  if (line) pushLoop(line);
  if (db.heat >= 40 && !db.heatMarks.mid) {
    db.heatMarks.mid = true;
    pushLoop("The block is awake.");
  }
  if (db.heat >= 70 && !db.heatMarks.high) {
    db.heatMarks.high = true;
    db.burned = true;
    pushLoop("You're made. Somebody can picture your door.");
  }
}

function tick(dt) {
  if (!db) return;
  heatAcc += dt;
  if (heatAcc < 20) return;
  heatAcc = 0;
  if (db.heat <= 0) return;
  db.heat = Math.max(0, db.heat - 1);
  if (db.heat < 40) db.heatMarks.mid = false;
  if (db.heat < 70) db.heatMarks.high = false;
}

function hasMask(invState) {
  return db.mask && inv.countOf(invState, "mask") > 0;
}

function photoFresh(p) {
  return !!(p && p.homeInstanceId && db.owners[p.homeInstanceId] === p.who);
}

function canEnter(state, lot) {
  const owner = db.owners[lot.instanceId];
  if (owner === PLAYER) {
    if (inv.countOf(state.inv, "key_house") < 1) return { ok: false, error: "no_key" };
    return { ok: true, raid: false };
  }
  if (!hasMask(state.inv)) return { ok: false, error: "no_mask" };
  const shot = db.photos.find((p) => p.homeInstanceId === lot.instanceId && photoFresh(p));
  if (!shot) return { ok: false, error: "no_photo" };
  return { ok: true, raid: true };
}

function killPlayer(state, reason) {
  const player = state.player;
  const spot = { x: player.x, y: player.y };
  const removed = inv.removeItem(state.inv, "gun_pistol");
  if (player.inside) housing.exit(player);
  if (removed.ok && removed.slot) {
    db.bodies.unshift({
      id: uid("body"),
      x: spot.x,
      y: spot.y,
      rounds: removed.slot.rounds || 0,
      gun: true,
    });
    db.bodies = db.bodies.slice(0, 8);
  }
  const land = player.lastLand || { x: -720, y: 280 };
  player.x = land.x;
  player.y = land.y;
  player.z = world.sampleHeight(land.x, land.y);
  player.hp = 100;
  player.inside = null;
  player.templateId = null;
  player.outside = null;
  db.defender = null;
  addHeat(20, reason || "You got dropped. The gun stayed where you fell.");
  save();
  return { killed: true, hp: 100 };
}

function hurtPlayer(state, amount, reason) {
  const player = state.player;
  player.hp = Math.max(0, (player.hp == null ? 100 : player.hp) - amount);
  if (player.hp <= 0) return killPlayer(state, reason);
  save();
  return { killed: false, hp: player.hp };
}

function afterRaid(state, instanceId) {
  const ownerId = db.owners[instanceId];
  const owner = state.npcs.find((n) => n.id === ownerId);
  const name = owner ? owner.name : "the owner";
  addHeat(15, "Door kicked. " + (housing.byInstance(instanceId) ? instanceId : "a house") + ".");
  let note = "Raid. Mask on. This door only.";
  if (db.armed[instanceId] && db.ownerHome[instanceId] && db.stash[instanceId] && db.stash[instanceId].length) {
    const gun = db.stash[instanceId].shift();
    db.defender = {
      id: "owner_" + instanceId,
      name,
      hp: 100,
      dead: false,
      instanceId,
      rounds: gun.rounds || 8,
    };
    const hit = hurtPlayer(state, 50, name + " was home.");
    note = hit.killed
      ? name + " was home. One to the chest put you down."
      : name + " was home. One to the chest. Look up if you want the head.";
    if (!hit.killed) save();
    return { note, player: state.player };
  }
  save();
  return { note, player: state.player };
}

function inFront(player, target, yaw, reach) {
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist > reach || dist < 0.15) return false;
  const fx = Math.sin(yaw);
  const fy = -Math.cos(yaw);
  return (dx / dist) * fx + (dy / dist) * fy >= 0.55;
}

function payoutOf(order) {
  let total = 0;
  for (const line of order) total += line.qty * (db.prices[line.id] || 0);
  return total;
}

function offersMatch(order, offered) {
  if (!Array.isArray(order) || !Array.isArray(offered)) return false;
  if (order.length < 1 || order.length > 3 || offered.length !== order.length) return false;
  const seen = new Set();
  for (let i = 0; i < order.length; i++) {
    const o = order[i];
    const g = offered[i];
    if (!g || g.id !== o.id || Number(g.qty) !== o.qty) return false;
    if (seen.has(o.id)) return false;
    seen.add(o.id);
  }
  return true;
}

function cashRoom(invState) {
  let room = 0;
  let empty = 0;
  for (const s of invState.slots) {
    if (!s) empty += 1;
    else if (s.id === "cash") room += 99 - s.count;
  }
  return room + empty * 99;
}

function remember(id, name, note) {
  if (!db.contacts.some((c) => c.id === id)) db.contacts.push({ id, name, note });
}

function action(state, b) {
  const type = b && b.type;
  const player = state.player;
  if (inv.countOf(state.inv, "phone") < 1) return { ok: false, error: "no_phone" };
  if (type === "photo") {
    const yaw = Number(b.yaw);
    if (!Number.isFinite(yaw)) return { ok: false, error: "no_one" };
    let best = null;
    let bestD = 8;
    for (const n of state.npcs) {
      if (n.dead) continue;
      const dist = Math.hypot(n.x - player.x, n.y - player.y);
      if (!inFront(player, n, yaw, 8) || dist >= bestD) continue;
      best = n;
      bestD = dist;
    }
    if (!best) return { ok: false, error: "no_one" };
    const home = db.npcHome[best.id] || null;
    const rec = { id: uid("ph"), who: best.id, name: best.name, homeInstanceId: home, at: Date.now() };
    db.photos.unshift(rec);
    db.photos = db.photos.slice(0, 12);
    remember(best.id, best.name, home ? "pictured" : "no house");
    pushMsg("Camera", "Picture of " + best.name + (home ? "." : ". No house on file."));
    save();
    return { ok: true };
  }
  if (type === "price") {
    const d = drugById(b.id);
    const price = Math.floor(Number(b.price));
    if (!d) return { ok: false, error: "unknown_item" };
    if (!Number.isFinite(price) || price < 5 || price > 500) return { ok: false, error: "bad_price" };
    db.prices[d.id] = price;
    save();
    return { ok: true };
  }
  if (type === "trade") {
    const requestId = typeof b.requestId === "string" ? b.requestId : "";
    if (requestId.length < 4 || requestId.length > 80) return { ok: false, error: "bad_request" };
    if (db.seen.includes(requestId)) return { ok: false, error: "replay" };
    const client = db.clients.find((c) => c.id === b.clientId);
    if (!client) return { ok: false, error: "no_client" };
    const npc = state.npcs.find((n) => n.id === client.npcId);
    if (!npc || npc.dead || player.inside) return { ok: false, error: "too_far" };
    if (Math.hypot(npc.x - player.x, npc.y - player.y) > 8) return { ok: false, error: "too_far" };
    if (!offersMatch(client.order, b.offered)) return { ok: false, error: "bad_offer" };
    for (const line of client.order) {
      if (!drugById(line.id) || inv.countOf(state.inv, line.id) < line.qty) return { ok: false, error: "short" };
    }
    const total = payoutOf(client.order);
    if (total < 1) return { ok: false, error: "bad_price" };
    if (cashRoom(state.inv) < total) return { ok: false, error: "full" };
    for (const line of client.order) inv.take(state.inv, line.id, line.qty);
    const paid = inv.add(state.inv, "cash", total);
    if (!paid.ok) return { ok: false, error: paid.error || "full" };
    db.seen.push(requestId);
    db.seen = db.seen.slice(-200);
    client.trust = Math.min(100, client.trust + 5);
    client.lastFeedback = "paid";
    client.order = makeOrder();
    remember(client.npcId, client.name, "customer");
    pushMsg(client.name, "Paid $" + total + ".");
    db.packages.unshift({ id: uid("pkg"), label: client.name + " · $" + total, status: "receipt" });
    db.packages = db.packages.slice(0, 20);
    save();
    return { ok: true, payout: total };
  }
  if (type === "harbor" || type === "wick") {
    const amount = Math.floor(Number(b.amount));
    if (amount !== 50) return { ok: false, error: "bad_amount" };
    const key = type === "harbor" ? "harbor" : "wick";
    if (b.dir === "in") {
      if (inv.countOf(state.inv, "cash") < amount) return { ok: false, error: "short" };
      inv.take(state.inv, "cash", amount);
      db[key] += amount;
    } else if (b.dir === "out") {
      if (db[key] < amount) return { ok: false, error: "short" };
      if (cashRoom(state.inv) < amount) return { ok: false, error: "full" };
      const added = inv.add(state.inv, "cash", amount);
      if (!added.ok) return { ok: false, error: added.error || "full" };
      db[key] -= amount;
    } else return { ok: false, error: "bad_amount" };
    save();
    return { ok: true };
  }
  if (type === "claim") {
    const lot = housing.nearestDoor(player.x, player.y);
    if (!lot) return { ok: false, error: "no_door" };
    const cur = db.owners[lot.instanceId];
    if (cur && cur !== PLAYER) return { ok: false, error: "already_owned" };
    db.owners[lot.instanceId] = PLAYER;
    for (const [npcId, inst] of Object.entries(db.npcHome)) {
      if (inst === lot.instanceId) delete db.npcHome[npcId];
    }
    save();
    return { ok: true, instanceId: lot.instanceId };
  }
  if (type === "collect") {
    const pkg = db.packages.find((p) => p.id === b.packageId);
    if (!pkg) return { ok: false, error: "missing" };
    if (pkg.status === "kept") return { ok: false, error: "missing" };
    pkg.status = "kept";
    save();
    return { ok: true };
  }
  if (type === "read") {
    const box = b.box === "messages" ? db.messages : b.box === "loop" ? db.loop : b.box === "calls" ? db.calls : null;
    if (!box) return { ok: false, error: "bad_box" };
    for (const row of box) row.unread = false;
    save();
    return { ok: true };
  }
  if (type === "call") {
    const c = db.contacts.find((x) => x.id === b.contactId);
    if (!c) return { ok: false, error: "no_one" };
    db.calls.unshift({ id: uid("call"), name: c.name, unread: true, at: Date.now() });
    db.calls = db.calls.slice(0, 20);
    pushMsg(c.name, "Call placed.");
    save();
    return { ok: true };
  }
  if (type === "mask") {
    if (inv.countOf(state.inv, "mask") < 1) {
      db.mask = false;
      save();
      return { ok: false, error: "no_mask" };
    }
    db.mask = !db.mask;
    save();
    return { ok: true, mask: db.mask };
  }
  return { ok: false, error: "bad_action" };
}

function hit(state, b) {
  const slot = state.inv.slots.find((s) => s && s.id === "gun_pistol");
  if (!slot) return { ok: false, error: "no_gun" };
  if (!slot.rounds) return { ok: false, error: "empty" };
  slot.rounds -= 1;
  inv.persist(state.inv);
  const yaw = Number(b.yaw);
  const pitch = Number(b.pitch);
  const zone = pitch < -0.2 ? "head" : "chest";
  const dmg = zone === "head" ? 100 : 50;
  const player = state.player;
  addHeat(25, zone === "head" ? "Shot fired. Head." : "Shot fired.");

  if (player.inside) {
    const def = db.defender;
    if (!def || def.dead || def.instanceId !== player.inside || b.targetId !== def.id) {
      save();
      return { ok: false, error: "miss", rounds: slot.rounds };
    }
    def.hp = Math.max(0, def.hp - dmg);
    if (def.hp <= 0) {
      def.dead = true;
      db.stash[player.inside] = db.stash[player.inside] || [];
      db.stash[player.inside].push({ id: "gun_pistol", rounds: def.rounds || 0 });
      addHeat(20, def.name + " is down. The gun is in the room.");
      db.defender = null;
    }
    save();
    return { ok: true, zone, killed: !db.defender, rounds: slot.rounds, hp: player.hp };
  }

  const target = state.npcs.find((n) => n.id === b.targetId && !n.dead);
  if (!target || !Number.isFinite(yaw) || !inFront(player, target, yaw, 14)) {
    save();
    return { ok: false, error: "miss", rounds: slot.rounds };
  }
  target.hp = Math.max(0, (target.hp == null ? 100 : target.hp) - dmg);
  if (target.hp <= 0) {
    target.dead = true;
    target.hp = 0;
    addHeat(20, target.name + " is down.");
  }
  save();
  return { ok: true, zone, killed: target.dead, rounds: slot.rounds, hp: player.hp };
}

function take(state) {
  const player = state.player;
  if (player.inside) {
    const pile = db.stash[player.inside];
    if (!pile || !pile.length) return { ok: false, error: "empty" };
    if (state.inv.slots.some((s) => s && s.id === "gun_pistol")) return { ok: false, error: "have_one" };
    const item = pile[0];
    const added = inv.add(state.inv, "gun_pistol", 1);
    if (!added.ok) return { ok: false, error: added.error || "full" };
    const slot = state.inv.slots.find((s) => s && s.id === "gun_pistol");
    if (slot) slot.rounds = item.rounds || 8;
    pile.shift();
    inv.persist(state.inv);
    save();
    return { ok: true };
  }
  let best = null;
  let bestD = 2.2;
  for (const body of db.bodies) {
    if (!body.gun) continue;
    const d = Math.hypot(body.x - player.x, body.y - player.y);
    if (d < bestD) { best = body; bestD = d; }
  }
  if (!best) return { ok: false, error: "empty" };
  if (state.inv.slots.some((s) => s && s.id === "gun_pistol")) return { ok: false, error: "have_one" };
  const added = inv.add(state.inv, "gun_pistol", 1);
  if (!added.ok) return { ok: false, error: added.error || "full" };
  const slot = state.inv.slots.find((s) => s && s.id === "gun_pistol");
  if (slot) slot.rounds = best.rounds || 0;
  best.gun = false;
  inv.persist(state.inv);
  save();
  return { ok: true };
}

function publicOrder(order) {
  return (order || []).map((line) => {
    const d = drugById(line.id);
    return { id: line.id, qty: line.qty, name: d ? d.name : line.id, price: db.prices[line.id] || 0 };
  });
}

function snapshot(state) {
  if (!db) return null;
  const player = state.player;
  const mine = [];
  for (const [instanceId, owner] of Object.entries(db.owners)) {
    if (owner !== PLAYER) continue;
    const lot = housing.byInstance(instanceId);
    mine.push({ instanceId, templateId: lot ? lot.templateId : null });
  }
  const gun = state.inv.slots.find((s) => s && s.id === "gun_pistol");
  const near = housing.nearestDoor(player.x, player.y);
  let nearDoor = null;
  if (near) {
    const owner = db.owners[near.instanceId] || null;
    nearDoor = {
      instanceId: near.instanceId,
      templateId: near.templateId || null,
      mine: owner === PLAYER,
      taken: !!owner && owner !== PLAYER,
    };
  }
  const stash = player.inside && db.stash[player.inside] ? db.stash[player.inside].length : 0;
  const defender = db.defender && player.inside === db.defender.instanceId && !db.defender.dead
    ? { id: db.defender.id, name: db.defender.name, hp: db.defender.hp }
    : null;
  return {
    heat: db.heat,
    burned: db.burned,
    mask: hasMask(state.inv),
    harbor: db.harbor,
    wick: db.wick,
    hp: player.hp == null ? 100 : player.hp,
    gun: gun ? { rounds: gun.rounds || 0 } : null,
    homes: mine,
    nearDoor,
    stash,
    defender,
    photos: db.photos.map((p) => ({
      id: p.id,
      who: p.who,
      name: p.name,
      homeInstanceId: p.homeInstanceId,
      fresh: photoFresh(p),
    })),
    contacts: db.contacts.map((c) => ({ id: c.id, name: c.name, note: c.note || "" })),
    messages: db.messages.map((m) => ({ id: m.id, from: m.from, text: m.text, unread: !!m.unread })),
    loop: db.loop.map((m) => ({ id: m.id, text: m.text, unread: !!m.unread })),
    calls: db.calls.map((m) => ({ id: m.id, name: m.name })),
    packages: db.packages.map((p) => ({ id: p.id, label: p.label, status: p.status })),
    prices: drugs.map((d) => ({ id: d.id, name: d.name, klass: d.klass, price: db.prices[d.id] || 0 })),
    clients: db.clients.map((c) => {
      const npc = state.npcs.find((n) => n.id === c.npcId);
      const dist = npc && !player.inside ? Math.hypot(npc.x - player.x, npc.y - player.y) : 999;
      return {
        id: c.id,
        name: c.name,
        trust: c.trust,
        near: dist <= 8 && npc && !npc.dead,
        order: publicOrder(c.order),
        payout: payoutOf(c.order),
      };
    }),
    badges: {
      messages: db.messages.filter((m) => m.unread).length,
      loop: db.loop.filter((m) => m.unread).length,
      harbor: db.packages.filter((p) => p.status === "receipt").length,
    },
  };
}

module.exports = { boot, tick, canEnter, afterRaid, action, hit, take, snapshot };
