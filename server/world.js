const fs = require("fs");
const path = require("path");

const loPath = path.join(__dirname, "..", "data", "height_lo.json");
let lo = { size: 2, extent: 4032, heights: [[0, 0], [0, 0]] };
try {
  lo = JSON.parse(fs.readFileSync(loPath, "utf8"));
} catch {
  /* bake terrain first */
}

function sampleHeight(x, y) {
  const size = lo.size;
  const half = lo.extent / 2;
  const u = (x + half) / lo.extent;
  const v = 1 - (y + half) / lo.extent;
  const fx = Math.max(0, Math.min(size - 1.001, u * (size - 1)));
  const fy = Math.max(0, Math.min(size - 1.001, v * (size - 1)));
  const x0 = Math.floor(fx), y0 = Math.floor(fy);
  const tx = fx - x0, ty = fy - y0;
  const row0 = lo.heights[y0] || lo.heights[0];
  const row1 = lo.heights[Math.min(size - 1, y0 + 1)] || row0;
  const a = row0[x0] ?? 0;
  const b = row0[Math.min(size - 1, x0 + 1)] ?? a;
  const c = row1[x0] ?? a;
  const d = row1[Math.min(size - 1, x0 + 1)] ?? c;
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

const WALK = 5.2;
const SPRINT = 8.4;
const WADE = 2.6;
const SWIM = 1.9;
const FLY = 16;
const FLY_SPRINT = 24;
const MAX_STEP = 1.6;
const BREATH_MAX = 10.5;
const DRY_Z = 1.4;

function clampMove(prev, next, dt, sprint, fly) {
  const t = Math.max(0.016, Math.min(0.12, dt));

  if (fly) {
    const cap = sprint ? FLY_SPRINT : FLY;
    const max = cap * t;
    let dx = next.x - prev.x;
    let dy = next.y - prev.y;
    let wishZ = Number(next.z);
    if (!Number.isFinite(wishZ)) wishZ = prev.z;
    let dz = wishZ - prev.z;
    const len = Math.hypot(dx, dy, dz);
    if (len > max + 0.05) {
      const s = max / len;
      dx *= s;
      dy *= s;
      dz *= s;
    }
    return {
      x: prev.x + dx,
      y: prev.y + dy,
      z: prev.z + dz,
      breath: BREATH_MAX,
      lastLand: prev.lastLand || { x: prev.x, y: prev.y },
      wet: false,
      swimming: false,
      fly: true,
    };
  }

  const zProbe = sampleHeight(next.x, next.y);
  const wet = zProbe < DRY_Z;
  const deep = zProbe < -0.15;
  const cap = deep ? SWIM : wet ? WADE : (sprint ? SPRINT : WALK);
  const max = cap * t;
  let dx = next.x - prev.x;
  let dy = next.y - prev.y;
  const len = Math.hypot(dx, dy);
  if (len > max + 0.05) {
    dx *= max / len;
    dy *= max / len;
  }
  let x = prev.x + dx;
  let y = prev.y + dy;
  let zGround = sampleHeight(x, y);
  let breath = prev.breath == null ? BREATH_MAX : prev.breath;
  let lastLand = prev.lastLand || { x: prev.x, y: prev.y };

  if (zGround >= DRY_Z) {
    breath = Math.min(BREATH_MAX, breath + t * 2.6);
    lastLand = { x, y };
  } else if (zGround >= -0.15) {
    breath = Math.max(0, breath - t * 0.28);
  } else {
    breath = Math.max(0, breath - t * 1.2);
  }

  if (breath <= 0.01) {
    const px = lastLand.x - x;
    const py = lastLand.y - y;
    const L = Math.hypot(px, py) || 1;
    x += (px / L) * Math.min(L, 8);
    y += (py / L) * Math.min(L, 8);
    zGround = sampleHeight(x, y);
    if (zGround < DRY_Z) {
      x = lastLand.x;
      y = lastLand.y;
      zGround = sampleHeight(x, y);
    }
    breath = 0.35;
  }

  let z = zGround;
  if (zGround < 0) z = 0.2;
  if (z < zGround) z = zGround;
  // Landing from fly snaps to ground; skip the walk step reject so we do not stay airborne.
  if (!prev.fly && zGround >= 2 && prev.z - z > MAX_STEP) {
    x = prev.x;
    y = prev.y;
    z = prev.z;
    zGround = sampleHeight(x, y);
  }
  return {
    x, y, z,
    breath: +breath.toFixed(3),
    lastLand,
    wet: zGround < DRY_Z,
    swimming: zGround < -0.15,
    fly: false,
  };
}

module.exports = { sampleHeight, clampMove, WALK, SPRINT, SWIM, FLY, FLY_SPRINT, BREATH_MAX, lo };
