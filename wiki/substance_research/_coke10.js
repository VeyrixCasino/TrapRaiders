"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

const FILES = [
  "01_cathinones_mmc.json",
  "01_cathinones_mmc_halogen.json",
  "02_cathinones_chain.json",
  "02_cathinones_extended_nalkyl.json",
  "03_cathinones_md.json",
  "03_cathinones_methylenedioxy.json",
  "04_pyros_alpha.json",
  "04_pyros_unsubstituted.json",
  "05_pyros_md.json",
  "05_pyros_methylenedioxy.json",
  "06_pyros_unusual.json",
  "06_pyros_substituted_unusual.json",
  "07_08_amphetamines_phenidates.json",
  "07_10_other_stims.json",
];

function load(f) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8"));
}
function save(f, d) {
  fs.writeFileSync(path.join(ROOT, f), JSON.stringify(d, null, 2) + "\n");
}

function walk(data, visit) {
  const bags = [];
  if (Array.isArray(data)) bags.push(data);
  else if (data && typeof data === "object") {
    if (Array.isArray(data.compounds)) bags.push(data.compounds);
    if (Array.isArray(data.substances)) bags.push(data.substances);
    for (const v of Object.values(data)) {
      if (Array.isArray(v) && v.some((x) => x && (x.id || x.feel || x.scores))) bags.push(v);
    }
  }
  const seen = new Set();
  for (const bag of bags) {
    for (const c of bag) {
      if (!c || typeof c !== "object" || seen.has(c)) continue;
      seen.add(c);
      visit(c);
    }
  }
}

function stamp(host, xs) {
  host.rush_x = xs.r;
  host.euphoria_x = xs.e;
  host.enjoyment_x = xs.n;
  host.compulsive_x = xs.c;
  const pairs = [
    ["rush", xs.r],
    ["euphoria", xs.e],
    ["enjoyment", xs.n],
    ["compulsiveness", xs.c],
  ];
  for (const [k, x] of pairs) {
    if (x == null) continue;
    if (host[k] == null) host[k] = { score: x, x };
    else if (typeof host[k] === "object") {
      host[k].score = x;
      host[k].x = x;
    } else host[k] = x;
  }
}

function bumpOldX(host) {
  const keys = ["rush_x", "euphoria_x", "enjoyment_x", "compulsive_x"];
  let bumped = false;
  for (const k of keys) {
    if (typeof host[k] === "number" && host[k] > 0 && host[k] <= 20) {
      host[k] = Math.round(host[k] * 10 * 10) / 10;
      bumped = true;
    }
  }
  if (!bumped) return;
  const map = [
    ["rush", "rush_x"],
    ["euphoria", "euphoria_x"],
    ["enjoyment", "enjoyment_x"],
    ["compulsiveness", "compulsive_x"],
  ];
  for (const [axis, xk] of map) {
    const x = host[xk];
    if (x == null) continue;
    if (host[axis] && typeof host[axis] === "object") {
      host[axis].score = x;
      host[axis].x = x;
    } else if (typeof host[axis] === "number") host[axis] = x;
  }
}

const EXPLICIT = {
  "4-mmc": { r: 14, e: 24, n: 23, c: 22 },
  "3-mmc": { r: 12, e: 15, n: 16, c: 20 },
  methylone: { r: 8, e: 14, n: 16, c: 10 },
  nep: { r: 5, e: 7, n: 11, c: 32 },
  n_ethylhexedrone: { r: 6, e: 6, n: 7, c: 20 },
  pentedrone: { r: 4, e: 3, n: 5, c: 8 },
  "4_mec": { r: 8, e: 4, n: 5, c: 12 },
  "4-mec": { r: 8, e: 4, n: 5, c: 12 },
  alpha_pvp: { r: 120, e: 120, n: 7, c: 120 },
  alpha_php: { r: 65, e: 45, n: 22, c: 100 },
  alpha_pihp: { r: 70, e: 38, n: 6, c: 110 },
  alpha_ppp: { r: 28, e: 20, n: 18, c: 24 },
  alpha_pbp: { r: 11, e: 7, n: 9, c: 8 },
  mdpv: { r: 100, e: 100, n: 9, c: 115 },
  mdphp: { r: 50, e: 40, n: 18, c: 70 },
  amphetamine: { r: 8, e: 12, n: 16, c: 12 },
  methamphetamine: { r: 28, e: 21, n: 20, c: 30 },
  ethylphenidate: { r: 26, e: 14, n: 12, c: 34 },
};

// dual-board tiny offsets (same band)
const OFFSET = {
  "01_cathinones_mmc.json": {
    "4-mmc": { r: 13, e: 23, n: 24, c: 21 },
    "3-mmc": { r: 11, e: 14, n: 16, c: 19 },
  },
  "05_pyros_methylenedioxy.json": {
    mdpv: { r: 100, e: 95, n: 10, c: 118 },
    mdphp: { r: 50, e: 38, n: 17, c: 72 },
  },
  "02_cathinones_chain.json": {
    nep: { r: 6, e: 8, n: 10, c: 30 },
    n_ethylhexedrone: { r: 6, e: 6, n: 8, c: 21 },
    pentedrone: { r: 4, e: 3, n: 5, c: 8 },
  },
  "07_10_other_stims.json": {
    methamphetamine: { r: 30, e: 22, n: 21, c: 32 },
    amphetamine: { r: 8, e: 12, n: 16, c: 12 },
    ethylphenidate: { r: 24, e: 14, n: 12, c: 34 },
  },
};

for (const file of FILES) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) continue;
  const data = load(file);
  walk(data, (c) => {
    const host = c.feel || c.scores;
    if (!host) return;
    const id = c.id;
    const spec = (OFFSET[file] && OFFSET[file][id]) || EXPLICIT[id];
    if (spec) stamp(host, spec);
    else bumpOldX(host);
  });
  save(file, data);
}

console.log("coke10 stim/cath/pyro pass done");
