/**
 * Debug place: append a pad to lots.json, then rebake the satellite
 * in-process. Does not spawn _gen_terrain.js.
 */
const fs = require("fs");
const path = require("path");
const sat = require("../_gen_sat");
const world = require("./world");

const ROOT = path.join(__dirname, "..");
const LOTS_PATH = path.join(ROOT, "data", "lots.json");

const KIND_TPL = {
  house: "int_townhouse",
  res_2house: "int_semi",
  city_block: "int_apt_walkup",
  civic: "int_brick",
  park_court: null,
  yard: null,
  keep: null,
};

function readLotsDoc() {
  if (!fs.existsSync(LOTS_PATH)) {
    return { units: "meters", note: "Buildable pads.", lots: [] };
  }
  return JSON.parse(fs.readFileSync(LOTS_PATH, "utf8"));
}

function nextLotId(lots) {
  let max = -1;
  for (const L of lots) {
    const m = String(L.id || "").match(/^lot-(\d+)$/);
    if (m) max = Math.max(max, +m[1]);
  }
  return max + 1;
}

function makeLot(body) {
  const x = Number(body.x);
  const y = Number(body.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { ok: false, error: "need_xy" };
  }
  const kind = String(body.kind || "house");
  const w = Math.max(6, Number(body.w) || 16);
  const h = Math.max(6, Number(body.h) || 32);
  const district = String(body.district || sat.districtAt(x, y));
  const z = +world.sampleHeight(x, y).toFixed(2);
  const doc = readLotsDoc();
  const lots = Array.isArray(doc.lots) ? doc.lots : [];
  const n = nextLotId(lots);
  const id = "lot-" + n;
  const templateId = KIND_TPL[kind] || null;
  const instanceId = kind + "-" + district + "-placed-" + n;
  const lot = {
    id,
    kind,
    x: +x.toFixed(2),
    y: +y.toFixed(2),
    w: +w.toFixed(2),
    h: +h.toFixed(2),
    district,
    z,
    placed: true,
    templateId,
    instanceId,
    door: { x: +x.toFixed(2), y: +(y - h / 2 + 0.6).toFixed(2), facing: "S" },
    pocket: { x: +x.toFixed(2), y: +y.toFixed(2), z: +(z - 16).toFixed(2) },
  };
  if (body.name) lot.name = String(body.name);
  lots.push(lot);
  doc.lots = lots;
  fs.writeFileSync(LOTS_PATH, JSON.stringify(doc, null, 2));
  const baked = sat.bakeSatellite({ live: true });
  return {
    ok: true,
    lot,
    sat: {
      version: baked.version,
      url: baked.url || "/data/satellite_color_ui.jpg",
      urlGray: baked.urlGray,
    },
  };
}

function lotsMtime() {
  try { return fs.statSync(LOTS_PATH).mtimeMs; }
  catch { return 0; }
}

function satMtime() {
  try { return fs.statSync(path.join(ROOT, "data", "satellite.json")).mtimeMs; }
  catch { return 0; }
}

function maybeBakeIfLotsNewer() {
  if (lotsMtime() <= satMtime()) return sat.satSnapshot();
  return sat.bakeSatellite({ live: true });
}

module.exports = { makeLot, lotsMtime, satMtime, maybeBakeIfLotsNewer };
