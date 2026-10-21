/* Bellhaven Mobile. Up opens. Arrows move. Down closes only on the bottom row. */
const GRID = [
  ["contacts", "messages", "camera"],
  ["harbor", "corner", "wick"],
  ["properties", "boxly", "loop"],
  ["outlet"],
];
const DOCK = ["call", "compass", "settings"];
const TITLES = {
  contacts: "Contacts",
  messages: "Messages",
  camera: "Camera",
  harbor: "Harbor",
  corner: "Corner",
  wick: "Wick",
  properties: "Properties",
  boxly: "Boxly",
  loop: "Loop",
  outlet: "Outlet",
  call: "Phone",
  settings: "Settings",
};

let open = false;
let screen = "home";
let area = "grid";
let row = 0;
let col = 0;
let dock = 0;
let idx = 0;
let note = "";
let rows = [];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function clockText() {
  const s = window.BH && BH.state();
  const c = s && s.clock;
  if (!c) return "--:--";
  let h = c.hour;
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return h + ":" + pad2(c.minute) + " " + ap;
}

function phoneState() {
  const s = window.BH && BH.state();
  return (s && s.phone) || null;
}

function paintClock() {
  const s = window.BH && BH.state();
  const c = s && s.clock;
  const hud = document.getElementById("clock");
  if (hud && c) hud.textContent = pad2(c.hour) + ":" + pad2(c.minute);
  const el = document.getElementById("phone-time");
  if (el) el.textContent = clockText();
  paintVitals();
}

function paintVitals() {
  const el = document.getElementById("vitals");
  if (!el) return;
  const p = phoneState();
  if (!p || (p.hp >= 100 && !p.gun && !p.heat)) {
    el.classList.add("hidden");
    return;
  }
  const bits = [];
  if (p.hp < 100) bits.push("HP " + p.hp);
  if (p.gun) bits.push("GUN " + p.gun.rounds);
  if (p.heat) bits.push("HEAT " + p.heat);
  el.textContent = bits.join("  ");
  el.classList.remove("hidden");
}

function paintBadges() {
  const p = phoneState();
  const badges = (p && p.badges) || {};
  document.querySelectorAll(".badge").forEach((el) => {
    const n = badges[el.dataset.badge] || 0;
    el.textContent = n > 9 ? "9+" : String(n);
    el.classList.toggle("hidden", n < 1);
  });
}

function paintHomeFocus() {
  document.querySelectorAll("#phonehome .app, #phonedock .app").forEach((el) => {
    let on = false;
    if (screen === "home" && area === "grid" && el.dataset.row != null) {
      on = Number(el.dataset.row) === row && Number(el.dataset.col) === col;
    }
    if (screen === "home" && area === "dock" && el.dataset.dock != null) {
      on = Number(el.dataset.dock) === dock;
    }
    el.classList.toggle("on", on);
  });
}

function rowsFor(app, p) {
  const back = { kind: "back", label: "Back" };
  if (!p) return [back, { kind: "info", label: "No signal" }];
  if (app === "contacts") {
    const list = p.contacts.map((c) => ({ kind: "info", label: c.name, sub: c.note }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "Nobody yet" }]);
  }
  if (app === "messages") {
    const list = p.messages.map((m) => ({ kind: "info", label: m.from, sub: m.text }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "No messages" }]);
  }
  if (app === "camera") {
    const shots = (p.photos || []).map((ph) => ({
      kind: "info",
      label: ph.name,
      sub: ph.fresh ? ph.homeInstanceId : "stale",
    }));
    return [back, { kind: "photo", label: "Take the picture", sub: "Whoever you're looking at" }].concat(shots);
  }
  if (app === "harbor") {
    return [
      back,
      { kind: "info", label: "Harbor $" + p.harbor },
      { kind: "harbor", dir: "in", label: "Deposit $50" },
      { kind: "harbor", dir: "out", label: "Withdraw $50" },
    ];
  }
  if (app === "corner") {
    const list = (p.clients || []).map((c) => ({
      kind: "trade",
      client: c,
      label: c.name + (c.near ? "" : " · too far"),
      sub: c.order.map((o) => o.qty + " " + o.name).join(", ") + " · $" + c.payout,
    }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "No customers" }]);
  }
  if (app === "wick") {
    return [
      back,
      { kind: "info", label: "Wick $" + p.wick },
      { kind: "wick", dir: "in", label: "Move $50 in" },
      { kind: "wick", dir: "out", label: "Cash out $50" },
    ];
  }
  if (app === "properties") {
    const owned = (p.homes || []).map((h) => ({ kind: "info", label: h.instanceId, sub: h.templateId || "yours" }));
    const door = p.nearDoor;
    let claim = { kind: "claim", label: "Claim the door in front of you", sub: door ? door.instanceId : "Walk up to a door" };
    if (door && door.mine) claim = { kind: "info", label: door.instanceId, sub: "Yours. The key opens it." };
    if (door && door.taken) claim = { kind: "info", label: door.instanceId, sub: "Already owned." };
    const made = p.burned ? [{ kind: "info", label: "You're made", sub: "A picture of your door can move." }] : [];
    return [back, claim].concat(owned, made);
  }
  if (app === "boxly") {
    const list = (p.packages || []).map((pkg) => ({ kind: "collect", id: pkg.id, label: pkg.label, sub: pkg.status }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "No drops" }]);
  }
  if (app === "loop") {
    const list = (p.loop || []).map((m) => ({ kind: "info", label: m.text }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "Quiet block" }]);
  }
  if (app === "outlet") {
    const list = (p.prices || []).map((d) => ({
      kind: "price",
      id: d.id,
      price: d.price,
      label: d.name + "  $" + d.price,
      sub: d.klass + " · ← → price",
    }));
    return [back].concat(list);
  }
  if (app === "call") {
    const list = (p.contacts || []).map((c) => ({ kind: "call", id: c.id, label: c.name, sub: "Call" }));
    const log = (p.calls || []).map((c) => ({ kind: "info", label: c.name, sub: "called" }));
    return [back].concat(list.length ? list : [{ kind: "info", label: "No contacts" }], log);
  }
  if (app === "settings") {
    return [
      back,
      { kind: "info", label: (p.mask ? "Mask on" : "Mask off") + " · HP " + p.hp, sub: "Heat " + p.heat + (p.burned ? " · made" : "") },
      { kind: "mask", label: p.mask ? "Take the mask off" : "Put the mask on" },
    ];
  }
  return [back];
}

function render() {
  const home = document.getElementById("phonehome");
  const sheet = document.getElementById("phoneapp");
  const dockEl = document.getElementById("phonedock");
  if (!home || !sheet) return;
  paintClock();
  paintBadges();
  const onHome = screen === "home";
  home.classList.toggle("hidden", !onHome);
  dockEl.classList.toggle("hidden", !onHome);
  sheet.classList.toggle("hidden", onHome);
  paintHomeFocus();
  if (onHome) return;
  document.getElementById("phoneapp-title").textContent = TITLES[screen] || screen;
  document.getElementById("phonenote").textContent = note;
  rows = rowsFor(screen, phoneState());
  if (idx > rows.length - 1) idx = rows.length - 1;
  if (idx < 0) idx = 0;
  const list = document.getElementById("phoneapp-list");
  list.innerHTML = "";
  rows.forEach((r, i) => {
    const el = document.createElement("div");
    el.className = "prow" + (i === idx ? " on" : "");
    el.dataset.i = String(i);
    const b = document.createElement("b");
    b.textContent = r.label;
    el.appendChild(b);
    if (r.sub) {
      const s = document.createElement("span");
      s.textContent = r.sub;
      el.appendChild(s);
    }
    list.appendChild(el);
  });
  const on = list.querySelector(".on");
  if (on) on.scrollIntoView({ block: "nearest" });
}

function show() {
  open = true;
  screen = "home";
  area = "grid";
  row = 0;
  col = 0;
  dock = 0;
  note = "";
  if (window.BH) BH.unlock();
  document.getElementById("phone").classList.remove("hidden");
  render();
}

function close() {
  open = false;
  screen = "home";
  document.getElementById("phone").classList.add("hidden");
}

async function act(body) {
  const r = await BH.api("/api/phone/action", body);
  BH.apply(r);
  note = r.ok ? "" : (r.error || "no");
  render();
  return r;
}

async function activate() {
  const r = rows[idx];
  if (!r) return;
  if (r.kind === "back") {
    screen = "home";
    note = "";
    render();
    return;
  }
  if (r.kind === "photo") return act({ type: "photo", yaw: BH.yaw() });
  if (r.kind === "harbor") return act({ type: "harbor", dir: r.dir, amount: 50 });
  if (r.kind === "wick") return act({ type: "wick", dir: r.dir, amount: 50 });
  if (r.kind === "claim") return act({ type: "claim" });
  if (r.kind === "collect") return act({ type: "collect", packageId: r.id });
  if (r.kind === "call") return act({ type: "call", contactId: r.id });
  if (r.kind === "mask") return act({ type: "mask" });
  if (r.kind === "trade") {
    if (!r.client.near) {
      note = "too_far";
      render();
      return;
    }
    return act({
      type: "trade",
      clientId: r.client.id,
      offered: r.client.order.map((o) => ({ id: o.id, qty: o.qty })),
      requestId: "t" + Date.now().toString(36) + Math.random().toString(16).slice(2),
    });
  }
}

function openApp(id) {
  if (id === "compass") {
    close();
    BH.openMap();
    return;
  }
  screen = id;
  rows = rowsFor(id, phoneState());
  idx = rows.length > 1 ? 1 : 0;
  note = "";
  if (id === "messages" || id === "loop" || id === "call") {
    act({ type: "read", box: id === "call" ? "calls" : id });
    return;
  }
  render();
}

function move(code, repeated) {
  if (screen !== "home") {
    if (code === "ArrowUp") idx = Math.max(0, idx - 1);
    if (code === "ArrowDown") {
      if (idx < rows.length - 1) {
        idx += 1;
        render();
      } else if (!repeated) close();
      return;
    }
    if (code === "ArrowLeft") {
      const r = rows[idx];
      if (r && r.kind === "price") {
        act({ type: "price", id: r.id, price: Math.max(5, r.price - 5) });
        return;
      }
      screen = "home";
    }
    if (code === "ArrowRight") {
      const r = rows[idx];
      if (r && r.kind === "price") act({ type: "price", id: r.id, price: Math.min(500, r.price + 5) });
    }
    if (code === "Enter" || code === "Space") activate();
    render();
    return;
  }
  if (code === "ArrowLeft") {
    if (area === "grid") col = Math.max(0, col - 1);
    else dock = Math.max(0, dock - 1);
  }
  if (code === "ArrowRight") {
    if (area === "grid") col = Math.min(GRID[row].length - 1, col + 1);
    else dock = Math.min(DOCK.length - 1, dock + 1);
  }
  if (code === "ArrowUp") {
    if (area === "dock") {
      area = "grid";
      row = GRID.length - 1;
      col = Math.min(dock, GRID[row].length - 1);
    } else if (row > 0) {
      row -= 1;
      col = Math.min(col, GRID[row].length - 1);
    }
  }
  if (code === "ArrowDown") {
    if (area === "grid" && row < GRID.length - 1) {
      row += 1;
      col = Math.min(col, GRID[row].length - 1);
    } else if (area === "grid") {
      area = "dock";
      dock = Math.min(col, DOCK.length - 1);
    } else if (!repeated) {
      close();
      return;
    }
  }
  if (code === "Enter" || code === "Space") {
    openApp(area === "dock" ? DOCK[dock] : GRID[row][col]);
    return;
  }
  render();
}

function handle(e) {
  if (!window.BH) return false;
  const arrow = e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight";
  const go = arrow || e.code === "Enter" || e.code === "Space";
  if (!open) {
    if (e.code === "ArrowUp" && !e.repeat && !BH.blocked()) {
      e.preventDefault();
      if (!BH.hasPhone()) {
        BH.toast("need a burner");
        return true;
      }
      show();
      return true;
    }
    return false;
  }
  if (!go) {
    if (e.code === "KeyE") {
      e.preventDefault();
      return true;
    }
    return false;
  }
  e.preventDefault();
  if ((e.code === "Enter" || e.code === "Space") && e.repeat) return true;
  move(e.code, e.repeat);
  return true;
}

document.getElementById("phonehome").addEventListener("click", (e) => {
  const el = e.target.closest(".app");
  if (!el || !open) return;
  openApp(el.dataset.app);
});
document.getElementById("phonedock").addEventListener("click", (e) => {
  const el = e.target.closest(".app");
  if (!el || !open) return;
  openApp(el.dataset.app);
});
document.getElementById("phoneapp-list").addEventListener("click", (e) => {
  const el = e.target.closest(".prow");
  if (!el) return;
  idx = Number(el.dataset.i);
  activate();
});

window.BellPhone = {
  handle,
  isOpen: () => open,
  close,
  paintClock,
  sync() {
    paintClock();
    if (open) render();
  },
  async take() {
    const r = await BH.api("/api/combat/take", {});
    BH.apply(r);
    if (!r.ok) BH.toast(r.error || "empty");
    else BH.toast("gun");
  },
  async shoot() {
    const p = phoneState();
    if (!p || !p.gun || p.gun.rounds < 1 || !BH.state()) return;
    const s = BH.state();
    let targetId = null;
    if (s.player.inside && p.defender) targetId = p.defender.id;
    else {
      const yaw = BH.yaw();
      const fx = Math.sin(yaw);
      const fy = -Math.cos(yaw);
      let best = 14;
      for (const n of s.npcs) {
        if (n.dead) continue;
        const dx = n.x - s.player.x;
        const dy = n.y - s.player.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 14 || dist < 0.15) continue;
        const dot = (dx / dist) * fx + (dy / dist) * fy;
        if (dot < 0.55 || dist >= best) continue;
        best = dist;
        targetId = n.id;
      }
    }
    if (!targetId) return;
    const r = await BH.api("/api/combat/hit", { targetId, yaw: BH.yaw(), pitch: BH.pitch() });
    BH.apply(r);
    const zone = r.zone === "head" ? "head" : "chest";
    BH.flashRaid(r.ok ? (r.killed ? zone + " · down" : zone) : (r.error || "miss"));
  },
};
