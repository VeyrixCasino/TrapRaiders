const http = require("http");
const fs = require("fs");
const path = require("path");
const inv = require("./inventory");
const world = require("./world");
const npcsMod = require("./npcs");
const names = require("./names");
const housing = require("./housing");
const clock = require("./clock");
const phone = require("./phone");
const sat = require("../_gen_sat");
const build = require("./build");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT || 8787);

const state = {
  player: {
    x: -720, y: 280, z: world.sampleHeight(-720, 280), sprint: false, fly: false,
    breath: world.BREATH_MAX, lastLand: { x: -720, y: 280 }, wet: false, swimming: false,
    inside: null, templateId: null, hp: 100,
  },
  inv: inv.load(),
  npcs: npcsMod.makeNpcs(16),
};

let lastMove = Date.now();

function json(res, code, body) {
  const data = JSON.stringify(body);
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 1e6) req.destroy(); });
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); }
      catch { resolve({}); }
    });
  });
}

function mime(file) {
  if (file.endsWith(".html")) return "text/html";
  if (file.endsWith(".js")) return "text/javascript";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".json")) return "application/json";
  if (file.endsWith(".bmp")) return "image/bmp";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".csv")) return "text/csv";
  return "application/octet-stream";
}

function publicState() {
  return {
    ok: true,
    server: "local-machine",
    player: state.player,
    inv: inv.snapshot(state.inv),
    catalog: inv.CATALOG,
    npcs: state.npcs,
    names: { first: names.pool.first.length, last: names.pool.last.length },
    world: { extent: world.lo.extent, size: world.lo.size },
    housing: housing.snapshot(state.player),
    clock: clock.snapshot(),
    sat: sat.satSnapshot(),
    phone: phone.snapshot(state),
  };
}

setInterval(() => {
  npcsMod.tick(state.npcs, 0.1);
  phone.tick(0.1);
}, 100);
setInterval(() => {
  try {
    if (build.lotsMtime() > build.satMtime()) {
      sat.bakeSatellite({ live: true });
      housing.reloadLots();
    }
  } catch (e) {
    console.error("sat watch", e && e.message);
  }
}, 4000);

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    });
    return res.end();
  }

  const url = new URL(req.url, "http://127.0.0.1");

  if (req.method === "GET" && url.pathname === "/api/state") return json(res, 200, publicState());
  if (req.method === "GET" && url.pathname === "/api/clock") return json(res, 200, { ok: true, clock: clock.snapshot() });
  if (req.method === "GET" && url.pathname === "/api/inv") return json(res, 200, { ok: true, inv: inv.snapshot(state.inv), catalog: inv.CATALOG });
  if (req.method === "GET" && url.pathname === "/api/names") return json(res, 200, names.pool);

  if (req.method === "POST" && url.pathname === "/api/inv/set") {
    return json(res, 403, inv.rejectClientWrite());
  }
  if (req.method === "POST" && url.pathname === "/api/inv/add") {
    const b = await readBody(req);
    return json(res, 200, inv.add(state.inv, b.itemId, b.count));
  }
  if (req.method === "POST" && url.pathname === "/api/inv/move") {
    const b = await readBody(req);
    return json(res, 200, inv.move(state.inv, b.from, b.to));
  }
  if (req.method === "POST" && url.pathname === "/api/inv/drop") {
    const b = await readBody(req);
    return json(res, 200, inv.drop(state.inv, b.slot));
  }
  // KeyE → enter that door's instanceId (no load). KeyF → exit to the stoop.
  if (req.method === "POST" && url.pathname === "/api/house/enter") {
    const r = housing.enter(state.player, (lot) => phone.canEnter(state, lot));
    if (r.ok && r.raid) Object.assign(r, phone.afterRaid(state, r.instanceId));
    return json(res, 200, {
      ...r,
      housing: housing.snapshot(state.player),
      phone: phone.snapshot(state),
      player: state.player,
    });
  }
  if (req.method === "POST" && url.pathname === "/api/phone/action") {
    const b = await readBody(req);
    const r = phone.action(state, b);
    return json(res, 200, { ...r, phone: phone.snapshot(state), inv: inv.snapshot(state.inv), player: state.player });
  }
  if (req.method === "POST" && url.pathname === "/api/combat/hit") {
    const b = await readBody(req);
    const r = phone.hit(state, b);
    return json(res, 200, { ...r, phone: phone.snapshot(state), inv: inv.snapshot(state.inv), player: state.player, npcs: state.npcs });
  }
  if (req.method === "POST" && url.pathname === "/api/combat/take") {
    const r = phone.take(state);
    return json(res, 200, { ...r, phone: phone.snapshot(state), inv: inv.snapshot(state.inv), player: state.player });
  }
  if (req.method === "POST" && url.pathname === "/api/house/exit") {
    const r = housing.exit(state.player);
    return json(res, 200, { ...r, housing: housing.snapshot(state.player) });
  }
  if (req.method === "POST" && url.pathname === "/api/build/place") {
    const b = await readBody(req);
    const r = build.makeLot(b);
    if (r.ok) housing.reloadLots();
    return json(res, r.ok ? 200 : 400, r);
  }
  if (req.method === "POST" && url.pathname === "/api/move") {
    const b = await readBody(req);
    const now = Date.now();
    const dt = (now - lastMove) / 1000;
    lastMove = now;
    const fly = !!b.fly;
    if (state.player.inside) {
      housing.moveInside(state.player, { x: Number(b.x), y: Number(b.y) }, dt);
      state.player.sprint = !!b.sprint;
      state.player.fly = fly;
      return json(res, 200, { ok: true, player: state.player, housing: housing.snapshot(state.player) });
    }
    const next = world.clampMove(state.player, { x: Number(b.x), y: Number(b.y), z: Number(b.z) }, dt, !!b.sprint, fly);
    state.player = { ...state.player, ...next, sprint: !!b.sprint, fly };
    return json(res, 200, { ok: true, player: state.player, housing: housing.snapshot(state.player) });
  }

  let file = url.pathname === "/" ? "/client/index.html" : url.pathname;
  if (file.startsWith("/data/")) file = file;
  else if (file.startsWith("/client/")) file = file;
  else if (file.startsWith("/ui/")) file = file;
  else file = "/client" + file;
  const abs = path.normalize(path.join(ROOT, file));
  if (!abs.startsWith(ROOT)) return json(res, 403, { error: "no" });
  fs.readFile(abs, (err, buf) => {
    if (err) return json(res, 404, { error: "missing", path: file });
    res.writeHead(200, {
      "Content-Type": mime(abs),
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(buf);
  });
});

phone.boot(state);

server.listen(PORT, "127.0.0.1", () => {
  console.log("Bellhaven local server  http://127.0.0.1:" + PORT);
  console.log("Inventory is server-side. Client /api/inv/set is rejected.");
});
