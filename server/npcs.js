const { fullName } = require("./names");
const { sampleHeight } = require("./world");

const SPAWNS = [
  { x: -720, y: 280 },
  { x: 760, y: 420 },
  { x: -60, y: -820 },
  { x: -1280, y: 240 },
  { x: 480, y: 420 },
  { x: 200, y: -830 },
  { x: -860, y: -80 },
  { x: 1240, y: 140 },
];

function makeNpcs(n) {
  const used = new Set();
  const list = [];
  for (let i = 0; i < n; i++) {
    let name = fullName();
    let guard = 0;
    while (used.has(name) && guard++ < 40) name = fullName();
    used.add(name);
    const s = SPAWNS[i % SPAWNS.length];
    const x = s.x + (Math.random() - 0.5) * 80;
    const y = s.y + (Math.random() - 0.5) * 80;
    list.push({
      id: "npc_" + i,
      name,
      x, y, z: sampleHeight(x, y),
      heading: Math.random() * Math.PI * 2,
      speed: 1.2 + Math.random() * 0.8,
      hp: 100,
      dead: false,
    });
  }
  return list;
}

function tick(npcs, dt) {
  for (const n of npcs) {
    if (n.dead) continue;
    if (Math.random() < 0.02) n.heading += (Math.random() - 0.5) * 1.4;
    n.x += Math.cos(n.heading) * n.speed * dt;
    n.y += Math.sin(n.heading) * n.speed * dt;
    const z = sampleHeight(n.x, n.y);
    if (z < 1.2) {
      n.heading += Math.PI;
      n.x += Math.cos(n.heading) * 2;
      n.y += Math.sin(n.heading) * 2;
    }
    n.z = sampleHeight(n.x, n.y);
  }
}

module.exports = { makeNpcs, tick };
