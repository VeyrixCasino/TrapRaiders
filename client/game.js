const API = "";
const keys = {};
let state = null;
let heightLo = null;
let look = { yaw: 1.2, pitch: -0.15 };
let locked = false;
let showMap = false;
let showInv = false;
let invSel = 0;
let houseNear = null;
let houseReach = 4.5;
let houseBaked = false;
let houseMsg = "";
let houseMsgUntil = 0;
let fly = false;
let mapLots = [];
let mapKeep = [];
let mapCam = { x: 0.5, y: 0.5, scale: 2.2 };
let mapDrag = null;
let mapTip = null;
let satColor = true;
let satVersion = 0;
let satPlacing = false;
let satBusy = false;
const DISTRICT_NAME = {
  N: "Belvedere Heights",
  W: "Pearl Row / Harbor",
  E: "Mason Flats",
  S: "Foundry Ward",
  SE: "Kiln Spur",
};
const KIND_NAME = {
  house: "house",
  res_2house: "duplex",
  city_block: "city block",
  civic: "civic",
  park_court: "park",
  yard: "yard",
  keep: "KEEP",
};

const canvas = document.getElementById("view");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87a0b4);
scene.fog = new THREE.Fog(0x87a0b4, 180, 1400);
const camera = new THREE.PerspectiveCamera(70, 1, 0.4, 4000);
const sun = new THREE.DirectionalLight(0xfff1d0, 1.1);
sun.position.set(200, 400, 120);
const ambient = new THREE.AmbientLight(0x6a7a88, 0.55);
scene.add(sun, ambient);

const PHASE_FOG = { night: 0x5a6880, dawn: 0x9a8aa4, day: 0x87a0b4, dusk: 0x907888 };
const PHASE_AMB = { night: 0x4a5870, dawn: 0x7a6a78, day: 0x6a7a88, dusk: 0x7a6a60 };
const PHASE_AMB_I = { night: 0.34, dawn: 0.44, day: 0.55, dusk: 0.42 };
const PHASE_SUN = { night: 0xa0b0c8, dawn: 0xffd0b8, day: 0xfff1d0, dusk: 0xffc090 };
const PHASE_SUN_I = { night: 0.32, dawn: 0.72, day: 1.1, dusk: 0.68 };

const npcsG = new THREE.Group();
scene.add(npcsG);
const playerMesh = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.4, 1.1, 4, 8),
  new THREE.MeshStandardMaterial({ color: 0xd8c4a0 })
);
scene.add(playerMesh);

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();

function sampleH(x, y) {
  if (!heightLo) return 8;
  const size = heightLo.size, extent = heightLo.extent, half = extent / 2;
  const u = (x + half) / extent;
  const v = 1 - (y + half) / extent;
  const fx = Math.max(0, Math.min(size - 1.001, u * (size - 1)));
  const fy = Math.max(0, Math.min(size - 1.001, v * (size - 1)));
  const x0 = Math.floor(fx), y0 = Math.floor(fy);
  const tx = fx - x0, ty = fy - y0;
  const row0 = heightLo.heights[y0];
  const row1 = heightLo.heights[Math.min(size - 1, y0 + 1)];
  const a = row0[x0], b = row0[Math.min(size - 1, x0 + 1)];
  const c = row1[x0], d = row1[Math.min(size - 1, x0 + 1)];
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

function buildTerrain() {
  const size = heightLo.size;
  const extent = heightLo.extent;
  const geo = new THREE.PlaneGeometry(extent, extent, size - 1, size - 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, sampleH(x, -z));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const tex = new THREE.TextureLoader().load("/data/preview_color.bmp");
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.92 }));
  scene.add(mesh);
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(8000, 8000),
    new THREE.MeshStandardMaterial({ color: 0x1a3a58, roughness: 0.2, metalness: 0.1 })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.2;
  scene.add(water);
}

addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (window.BellPhone && BellPhone.handle(e)) return;
  if (e.code === "KeyM") {
    if (window.BellPhone && BellPhone.isOpen()) BellPhone.close();
    showMap = !showMap;
    document.getElementById("map").classList.toggle("hidden", !showMap);
    if (showMap) {
      document.exitPointerLock();
      centerMapOnPlayer();
    }
  }
  if (e.code === "Tab") {
    e.preventDefault();
    if (window.BellPhone && BellPhone.isOpen()) BellPhone.close();
    showInv = !showInv;
    document.getElementById("inv").classList.toggle("hidden", !showInv);
    if (showInv) renderInv();
  }
  if (showInv && e.code.startsWith("Digit")) invSel = Math.max(0, Math.min(19, Number(e.key) - 1));
  if (!e.repeat && e.code === "KeyE") enterHouse();
  if (!e.repeat && e.code === "KeyF") exitHouse();
  if (!e.repeat && e.code === "KeyG" && window.BellPhone) BellPhone.take();
  if (!e.repeat && e.code === "KeyV") toggleFly();
});
addEventListener("keyup", (e) => { keys[e.code] = false; });
canvas.addEventListener("click", () => {
  if (document.pointerLockElement === canvas) {
    if (window.BellPhone) BellPhone.shoot();
    return;
  }
  canvas.requestPointerLock();
});
document.addEventListener("pointerlockchange", () => { locked = document.pointerLockElement === canvas; });
addEventListener("mousemove", (e) => {
  if (!locked) return;
  look.yaw -= e.movementX * 0.0022;
  look.pitch -= e.movementY * 0.0022;
  look.pitch = Math.max(-1.3, Math.min(1.3, look.pitch));
});

async function api(p, body) {
  const opt = body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {};
  const r = await fetch(API + p, opt);
  return r.json();
}

function flashRaid(text) {
  houseMsg = text || "";
  houseMsgUntil = Date.now() + 2500;
  paintHouseHud();
}

function paintHouseHud() {
  const el = document.getElementById("raid");
  if (!el) return;
  if (houseMsg && Date.now() < houseMsgUntil) {
    el.textContent = houseMsg;
    return;
  }
  if (!state || !state.player) {
    el.textContent = "raid: …";
    return;
  }
  const p = state.player;
  if (p.inside) {
    const lookId = p.templateId || "?";
    el.textContent = `raid: inside ${p.inside}  look ${lookId}  · F exit  (same wallpaper ≠ same stash)`;
    return;
  }
  if (!houseBaked) {
    el.textContent = "raid: street · bake required (lots.json pads have no instanceId)";
    return;
  }
  if (houseNear) {
    el.textContent = `raid: door ${houseNear.instanceId}  look ${houseNear.templateId}  · E enter`;
    return;
  }
  el.textContent = "raid: street · walk a door (E enter / F exit · instance ≠ template)";
}

function applyHousing(h) {
  if (!h) return;
  houseReach = h.doorReach || 4.5;
  houseNear = h.nearDoor || null;
  houseBaked = (h.instances || 0) > 0;
}

async function enterHouse() {
  const r = await api("/api/house/enter", {});
  if (r.player) state.player = r.player;
  if (r.phone) state.phone = r.phone;
  if (r.housing) applyHousing(r.housing);
  if (!r.ok) flashRaid(r.error || "no_entry");
  else if (r.note) flashRaid(r.note);
  paintHouseHud();
}

async function exitHouse() {
  const r = await api("/api/house/exit", {});
  if (r.player) state.player = r.player;
  if (r.housing) applyHousing(r.housing);
  paintHouseHud();
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function paintClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const c = state && state.clock;
  if (!c) {
    el.textContent = "--:--";
    return;
  }
  el.textContent = pad2(c.hour) + ":" + pad2(c.minute);
  if (window.BellPhone) BellPhone.paintClock();
}

function applyPhaseTint(swimming) {
  const phase = (state && state.clock && state.clock.phase) || "day";
  const fogHex = swimming ? 0x0a2a40 : (PHASE_FOG[phase] || PHASE_FOG.day);
  scene.fog.color.set(fogHex);
  scene.background.set(fogHex);
  ambient.color.set(PHASE_AMB[phase] || PHASE_AMB.day);
  ambient.intensity = PHASE_AMB_I[phase] != null ? PHASE_AMB_I[phase] : PHASE_AMB_I.day;
  sun.color.set(PHASE_SUN[phase] || PHASE_SUN.day);
  sun.intensity = PHASE_SUN_I[phase] != null ? PHASE_SUN_I[phase] : PHASE_SUN_I.day;
}

function paintFlyHud() {
  const el = document.getElementById("fly");
  if (!el) return;
  const on = fly || !!(state && state.player && state.player.fly);
  el.classList.toggle("hidden", !on);
}

async function toggleFly() {
  fly = !fly;
  paintFlyHud();
  if (!state || !state.player) return;
  const p = state.player;
  try {
    const r = await api("/api/move", { x: p.x, y: p.y, z: p.z, sprint: false, fly });
    if (r.ok && r.player) state.player = r.player;
    if (r.housing) applyHousing(r.housing);
  } catch { /* local toggle still shown */ }
  paintFlyHud();
}

function renderInv() {
  if (!state) return;
  const box = document.getElementById("slots");
  box.innerHTML = "";
  state.inv.slots.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "slot" + (i === invSel ? " on" : "");
    el.textContent = s ? `${s.id} x${s.count}` : "";
    el.onclick = async () => {
      if (invSel === i) {
        const r = await api("/api/inv/drop", { slot: i });
        document.getElementById("invlog").textContent = JSON.stringify(r);
        if (r.inv) state.inv = r.inv;
      }
      invSel = i;
      renderInv();
    };
    box.appendChild(el);
  });
}

document.getElementById("give").onclick = async (e) => {
  const id = e.target.dataset.item;
  if (!id) return;
  const r = await api("/api/inv/add", { itemId: id, count: 1 });
  document.getElementById("invlog").textContent = JSON.stringify(r);
  if (r.inv) state.inv = r.inv;
  const cheat = await api("/api/inv/set", { slots: [] });
  document.getElementById("invlog").textContent += "\ncheat: " + JSON.stringify(cheat);
  renderInv();
};

function worldToUv(x, y) {
  const ext = heightLo.extent, half = ext / 2;
  return [(x + half) / ext, 1 - (y + half) / ext];
}

function mapLayout() {
  const view = document.getElementById("mapview");
  const img = document.getElementById("mapimg");
  const box = view.getBoundingClientRect();
  const iw = img.naturalWidth || 1400;
  const ih = img.naturalHeight || 1400;
  const fit = Math.min(box.width / iw, box.height / ih);
  const s = fit * mapCam.scale;
  return { view, img, box, iw, ih, s };
}

function applyMapCam() {
  const L = mapLayout();
  const stage = document.getElementById("mapstage");
  const x = L.box.width / 2 - mapCam.x * L.iw * L.s;
  const y = L.box.height / 2 - mapCam.y * L.ih * L.s;
  stage.style.transform = `translate(${x}px,${y}px) scale(${L.s})`;
}

function uvToScreen(u, v) {
  const L = mapLayout();
  return [
    L.box.width / 2 + (u - mapCam.x) * L.iw * L.s,
    L.box.height / 2 + (v - mapCam.y) * L.ih * L.s,
  ];
}

function screenToWorld(clientX, clientY) {
  const L = mapLayout();
  const u = mapCam.x + (clientX - L.box.left - L.box.width / 2) / (L.iw * L.s);
  const v = mapCam.y + (clientY - L.box.top - L.box.height / 2) / (L.ih * L.s);
  const ext = heightLo.extent, half = ext / 2;
  return [u * ext - half, (1 - v) * ext - half];
}

function centerMapOnPlayer() {
  if (!state || !heightLo) return;
  const [u, v] = worldToUv(state.player.x, state.player.y);
  mapCam.x = u;
  mapCam.y = v;
  mapCam.scale = 2.4;
  applyMapCam();
}

function hitPad(x, y) {
  let best = null, area = 1e18;
  const test = (p, kind, name) => {
    const hw = (p.w || 16) / 2, hh = (p.h || 14) / 2;
    if (Math.abs(x - p.x) > hw || Math.abs(y - p.y) > hh) return;
    const a = (p.w || 16) * (p.h || 14);
    if (a >= area) return;
    area = a;
    best = {
      name: name || p.name || p.instanceId || p.id,
      kind: kind || p.kind,
      district: p.district,
      id: p.id,
    };
  };
  for (const p of mapKeep) test(p, "keep", p.name);
  for (const p of mapLots) test(p, p.kind, p.instanceId || p.id);
  return best;
}

function showMapTip(hit) {
  const el = document.getElementById("maptip");
  if (!hit) {
    mapTip = null;
    el.classList.add("hidden");
    return;
  }
  mapTip = hit;
  const dist = DISTRICT_NAME[hit.district] || hit.district || "?";
  const kind = KIND_NAME[hit.kind] || hit.kind || "?";
  el.textContent = `${hit.name}  ·  ${kind}  ·  ${dist}`;
  el.classList.remove("hidden");
}

function satUrl() {
  const base = satColor ? "/data/satellite_color_ui.jpg" : "/data/satellite_ui.jpg";
  return base + "?v=" + (satVersion || 0);
}

function reloadSatImage() {
  const img = document.getElementById("mapimg");
  if (!img) return;
  img.src = satUrl();
}

async function refreshMapLots() {
  try {
    const lotsDoc = await (await fetch("/data/lots.json")).json();
    mapLots = lotsDoc.lots || [];
  } catch { /* keep last */ }
}

function applySatInfo(info) {
  if (!info) return;
  const v = Number(info.version) || 0;
  if (v && v !== satVersion) {
    satVersion = v;
    reloadSatImage();
    refreshMapLots();
  } else if (!satVersion && v) {
    satVersion = v;
    reloadSatImage();
  }
}

function paintMapMode() {
  const color = document.getElementById("mapcolor");
  const gray = document.getElementById("mapgray");
  const place = document.getElementById("mapplace");
  if (color) color.classList.toggle("on", satColor);
  if (gray) gray.classList.toggle("on", !satColor);
  if (place) place.classList.toggle("on", satPlacing);
}

function setMapHint(text) {
  const el = document.getElementById("maphint");
  if (el) el.textContent = text;
}

async function placeHouseAt(x, y, name) {
  if (satBusy || !Number.isFinite(x) || !Number.isFinite(y)) return;
  satBusy = true;
  setMapHint("baking sat…");
  try {
    const r = await api("/api/build/place", {
      kind: "house",
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      w: 16,
      h: 32,
      name: name || undefined,
    });
    if (r.ok && r.lot) {
      mapLots.push(r.lot);
      showMapTip({
        name: r.lot.name || r.lot.instanceId || r.lot.id,
        kind: r.lot.kind,
        district: r.lot.district,
        id: r.lot.id,
      });
    }
    if (r.sat) applySatInfo(r.sat);
    else reloadSatImage();
    setMapHint(r.ok ? "placed · sat rebuilt" : (r.error || "place failed"));
  } catch {
    setMapHint("place failed");
  }
  satBusy = false;
}

function bindMap() {
  const view = document.getElementById("mapview");
  const colorBtn = document.getElementById("mapcolor");
  const grayBtn = document.getElementById("mapgray");
  const placeBtn = document.getElementById("mapplace");
  const dropBtn = document.getElementById("mapdrop");
  if (colorBtn) colorBtn.onclick = () => { satColor = true; paintMapMode(); reloadSatImage(); };
  if (grayBtn) grayBtn.onclick = () => { satColor = false; paintMapMode(); reloadSatImage(); };
  if (placeBtn) placeBtn.onclick = () => { satPlacing = !satPlacing; paintMapMode(); };
  if (dropBtn) {
    dropBtn.onclick = () => {
      if (!state || !state.player) return;
      placeHouseAt(state.player.x, state.player.y, "dropped house");
    };
  }
  paintMapMode();
  view.addEventListener("pointerdown", (e) => {
    mapDrag = { x: e.clientX, y: e.clientY, moved: false, sx: mapCam.x, sy: mapCam.y };
    view.classList.add("drag");
    view.setPointerCapture(e.pointerId);
  });
  view.addEventListener("pointermove", (e) => {
    if (!mapDrag) return;
    const L = mapLayout();
    const dx = e.clientX - mapDrag.x, dy = e.clientY - mapDrag.y;
    if (Math.hypot(dx, dy) > 4) mapDrag.moved = true;
    mapCam.x = mapDrag.sx - dx / (L.iw * L.s);
    mapCam.y = mapDrag.sy - dy / (L.ih * L.s);
    applyMapCam();
  });
  view.addEventListener("pointerup", (e) => {
    view.classList.remove("drag");
    if (mapDrag && !mapDrag.moved && heightLo) {
      const [wx, wy] = screenToWorld(e.clientX, e.clientY);
      if (satPlacing || e.shiftKey) placeHouseAt(wx, wy);
      else showMapTip(hitPad(wx, wy));
    }
    mapDrag = null;
  });
  view.addEventListener("wheel", (e) => {
    e.preventDefault();
    const L = mapLayout();
    const u = mapCam.x + (e.clientX - L.box.left - L.box.width / 2) / (L.iw * L.s);
    const v = mapCam.y + (e.clientY - L.box.top - L.box.height / 2) / (L.ih * L.s);
    const next = Math.max(1, Math.min(14, mapCam.scale * (e.deltaY > 0 ? 0.86 : 1.16)));
    const ratio = next / mapCam.scale;
    mapCam.x = u - (u - mapCam.x) / ratio;
    mapCam.y = v - (v - mapCam.y) / ratio;
    mapCam.scale = next;
    applyMapCam();
  }, { passive: false });
}

function drawMap() {
  const c = document.getElementById("mapdots");
  const img = document.getElementById("mapimg");
  if (!state || !heightLo || !img.naturalWidth) return;
  applyMapCam();
  const view = document.getElementById("mapview");
  const box = view.getBoundingClientRect();
  c.width = box.width;
  c.height = box.height;
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#d8d8d8";
  for (const n of state.npcs) {
    const [u, v] = worldToUv(n.x, n.y);
    const [mx, my] = uvToScreen(u, v);
    if (mx < -4 || my < -4 || mx > c.width + 4 || my > c.height + 4) continue;
    ctx.fillRect(mx - 1.5, my - 1.5, 3, 3);
  }
  const [pu, pv] = worldToUv(state.player.x, state.player.y);
  const [px, py] = uvToScreen(pu, pv);
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-look.yaw);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffe14a";
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(5.5, -6);
  ctx.lineTo(-5.5, -6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function syncNpcs() {
  while (npcsG.children.length < state.npcs.length) {
    const m = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.35, 1.0, 3, 6),
      new THREE.MeshStandardMaterial({ color: 0x8a6a4a })
    );
    npcsG.add(m);
  }
  state.npcs.forEach((n, i) => {
    const m = npcsG.children[i];
    m.visible = !n.dead;
    m.position.set(n.x, n.z + 0.9, -n.y);
  });
}

let last = performance.now();
function loop(now) {
  requestAnimationFrame(loop);
  try {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (!state || !heightLo) {
    renderer.render(scene, camera);
    return;
  }
  const sprint = keys.ShiftLeft || keys.ShiftRight;
  const flyOn = fly || !!state.player.fly;
  const speed = flyOn ? (sprint ? 23.5 : 15.5) : (sprint ? 8.2 : 5.0);
  const f = new THREE.Vector3(Math.sin(look.yaw), 0, Math.cos(look.yaw));
  const r = new THREE.Vector3(f.z, 0, -f.x);
  let dx = 0, dz = 0, rise = 0;
  if (keys.KeyW) { dx += f.x; dz += f.z; }
  if (keys.KeyS) { dx -= f.x; dz -= f.z; }
  if (keys.KeyD) { dx += r.x; dz += r.z; }
  if (keys.KeyA) { dx -= r.x; dz -= r.z; }
  if (flyOn) {
    if (keys.Space) rise += 1;
    if (keys.ControlLeft || keys.ControlRight) rise -= 1;
  }
  const hlen = Math.hypot(dx, dz);
  if (hlen > 0) { dx /= hlen; dz /= hlen; }
  const len = Math.hypot(dx, rise, dz);
  const phoneOpen = window.BellPhone && BellPhone.isOpen();
  if (len > 0 && locked && !showMap && !phoneOpen) {
    dx = (dx / len) * speed * dt;
    rise = (rise / len) * speed * dt;
    dz = (dz / len) * speed * dt;
    const wishX = state.player.x + dx;
    const wishY = state.player.y - dz;
    const wishZ = state.player.z + rise;
    api("/api/move", { x: wishX, y: wishY, z: wishZ, sprint, fly: flyOn }).then((r) => {
      if (r.ok) state.player = r.player;
      if (r.housing) applyHousing(r.housing);
    }).catch(() => {});
  }
  const p = state.player;
  playerMesh.position.set(p.x, p.z + 0.9, -p.y);
  camera.position.set(p.x, p.z + 1.7, -p.y);
  camera.rotation.order = "YXZ";
  camera.rotation.y = look.yaw;
  camera.rotation.x = look.pitch;
  syncNpcs();
  let near = "";
  let best = 4;
  for (const n of state.npcs) {
    const d = Math.hypot(n.x - p.x, n.y - p.y);
    if (d < best) { best = d; near = n.name; }
  }
  document.getElementById("nameplate").textContent = near;
  const br = document.getElementById("breath");
  const fill = document.getElementById("breathfill");
  if (!flyOn && (p.wet || p.swimming || (p.breath != null && p.breath < 10.4))) {
    br.classList.remove("hidden");
    fill.style.width = Math.max(0, Math.min(100, (p.breath / 10.5) * 100)) + "%";
    fill.style.background = p.breath < 3 ? "#d44" : "#3cb4d8";
  } else {
    br.classList.add("hidden");
  }
  applyPhaseTint(!flyOn && p.swimming);
  if (showMap) drawMap();
  paintHouseHud();
  paintFlyHud();
  paintClock();
  renderer.render(scene, camera);
  } catch (err) {
    window.__loopErr = String(err && err.stack || err);
  }
}

let toastTimer = 0;
window.BH = {
  api,
  state: () => state,
  apply(r) {
    if (!r) return;
    if (r.player) state.player = r.player;
    if (r.inv) state.inv = r.inv;
    if (r.phone) state.phone = r.phone;
    if (r.npcs) state.npcs = r.npcs;
    if (r.housing) applyHousing(r.housing);
  },
  yaw: () => look.yaw,
  pitch: () => look.pitch,
  blocked: () => showInv || showMap,
  hasPhone: () => !!(state && state.inv && state.inv.slots.some((s) => s && s.id === "phone")),
  unlock() { try { document.exitPointerLock(); } catch { /* already free */ } },
  openMap() {
    showMap = true;
    document.getElementById("map").classList.remove("hidden");
    document.exitPointerLock();
    centerMapOnPlayer();
  },
  toast(text) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), 1600);
  },
  flashRaid,
};

async function boot() {
  heightLo = await (await fetch("/data/height_lo.json")).json();
  try {
    const lotsDoc = await (await fetch("/data/lots.json")).json();
    mapLots = lotsDoc.lots || [];
  } catch { mapLots = []; }
  try {
    const keepDoc = await (await fetch("/data/keep_pads.json")).json();
    mapKeep = keepDoc.pads || [];
  } catch { mapKeep = []; }
  bindMap();
  buildTerrain();
  state = await api("/api/state");
  applyHousing(state.housing);
  if (window.BellPhone) BellPhone.sync();
  applySatInfo(state.sat);
  paintHouseHud();
  paintClock();
  renderInv();
  setInterval(async () => {
    const s = await api("/api/state");
    state.npcs = s.npcs;
    state.inv = s.inv;
    if (s.clock) state.clock = s.clock;
    if (s.housing) applyHousing(s.housing);
    if (s.phone) state.phone = s.phone;
    if (s.player && s.player.hp != null && state.player) state.player.hp = s.player.hp;
    if (window.BellPhone) BellPhone.sync();
    if (showInv) renderInv();
    paintHouseHud();
    paintClock();
  }, 400);
  setInterval(async () => {
    try {
      const s = await api("/api/state");
      if (s.sat) applySatInfo(s.sat);
    } catch { /* keep last sat */ }
  }, 3000);
  requestAnimationFrame(loop);
}
boot();
