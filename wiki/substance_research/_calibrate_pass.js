"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const AXES = ["rush", "euphoria", "enjoyment", "compulsiveness", "reinforcement"];
const changelog = [];

function load(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}
function save(file, data) {
  fs.writeFileSync(path.join(ROOT, file), JSON.stringify(data, null, 2) + "\n");
}

function normId(id) {
  return String(id || "")
    .toLowerCase()
    .replace(/[\s\-]+/g, "_")
    .replace(/α/g, "a")
    .replace(/^a_/, "alpha_");
}

function getFeel(obj) {
  if (obj.feel && typeof obj.feel === "object") return obj.feel;
  if (obj.scores && typeof obj.scores === "object") return obj.scores;
  return null;
}

function getScore(feel, axis) {
  const x = feel[axis];
  if (x == null) return null;
  if (typeof x === "object") return x.score == null ? null : x.score;
  return x;
}

function setScore(feel, axis, next, why, file, id) {
  const x = feel[axis];
  if (x == null) return false;
  const old = typeof x === "object" ? x.score : x;
  if (old == null) return false;
  if (next == null) return false;
  if (old === next) return false;
  if (typeof x === "object") x.score = next;
  else feel[axis] = next;
  changelog.push({ file, id, axis, old, next, why });
  return true;
}

function walkCompounds(data, visit) {
  const bags = [];
  if (Array.isArray(data)) bags.push(data);
  else if (data && typeof data === "object") {
    if (Array.isArray(data.compounds)) bags.push(data.compounds);
    if (Array.isArray(data.substances)) bags.push(data.substances);
    if (!data.compounds && !data.substances) {
      for (const v of Object.values(data)) {
        if (Array.isArray(v) && v.some((x) => x && typeof x === "object" && (x.id || x.feel || x.scores))) {
          bags.push(v);
        }
      }
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

// Explicit targets: file -> id -> {axis: number| {v, why}}
// Values are house-scale. Dual boards stay a couple points apart on purpose.
const EXPLICIT = {
  "01_cathinones_mmc_halogen.json": {
    "4-mmc": { rush: 68, euphoria: 80, enjoyment: 86, compulsiveness: 76, reinforcement: 84, why: "double-coke normal-life; greedy not flush" },
    "3-mmc": { rush: 58, euphoria: 58, enjoyment: 70, compulsiveness: 74, reinforcement: 76, why: "below 4-MMC; not a peer" },
    "2-mmc": { rush: 48, euphoria: 48, enjoyment: 54, compulsiveness: 62, reinforcement: 58, why: "diet copy under 3-MMC" },
    "4-cmc": { rush: 58, euphoria: 58, enjoyment: 56, compulsiveness: 72, reinforcement: 68, why: "hated binge can stay greedy; not 90s flush" },
    "3-cmc": { rush: 52, euphoria: 52, enjoyment: 54, compulsiveness: 70, reinforcement: 66, why: "chloro copy under 4-MMC" },
    "4-emc": { rush: 60, euphoria: 62, enjoyment: 64, compulsiveness: 64, reinforcement: 62, why: "if it hits, still not 4-MMC magic" },
    "4-bmc": { rush: 50, euphoria: 52, enjoyment: 48, compulsiveness: 62, reinforcement: 52, why: "thin, under 3-MMC" },
    "4-mec": { rush: 48, euphoria: 50, enjoyment: 52, compulsiveness: 64, reinforcement: 56, why: "short leftover, not flush" },
  },
  "01_cathinones_mmc.json": {
    "4-mmc": { rush: 66, euphoria: 78, enjoyment: 88, compulsiveness: 74, why: "dual board: same scale, slightly different night" },
    "3-mmc": { rush: 56, euphoria: 56, enjoyment: 68, compulsiveness: 72, why: "diet 4-MMC; keep below the halogen board" },
  },
  "02_cathinones_extended_nalkyl.json": {
    nep: { rush: 46, euphoria: 54, enjoyment: 68, compulsiveness: 84, reinforcement: 80, why: "diet-coke / NEP-as-3MMC habit, not flush-94" },
    n_ethylhexedrone: { rush: 48, euphoria: 48, enjoyment: 56, compulsiveness: 74, reinforcement: 76, why: "hexen functional snap + greedy redose" },
    pentedrone: { rush: 32, euphoria: 22, enjoyment: 38, compulsiveness: 50, reinforcement: 46, why: "grind leftover; leave low" },
    "4_mec": { rush: 50, euphoria: 28, enjoyment: 38, compulsiveness: 64, reinforcement: 44, why: "pull C out of the 70s-as-flush zone" },
  },
  "03_cathinones_md.json": {
    methylone: { rush: 52, euphoria: 58, enjoyment: 72, compulsiveness: 52, reinforcement: 62, why: "50-65 hug; not 4-MMC 80" },
    ethylone: { rush: 40, euphoria: 54, enjoyment: 62, compulsiveness: 42, reinforcement: 50, why: "quieter bk-MDMA" },
    pentylone: { rush: 56, euphoria: 50, enjoyment: 52, compulsiveness: 70, reinforcement: 74, why: "greedy stim, not mountain" },
    ephylone: { rush: 52, euphoria: 38, enjoyment: 34, compulsiveness: 74, reinforcement: 72, why: "pull C off flush band" },
    eutylone: { rush: 48, euphoria: 46, enjoyment: 42, compulsiveness: 68, reinforcement: 70, why: "diet bk, greedy" },
    dipentylone: { rush: 40, euphoria: 30, enjoyment: 28, compulsiveness: 70, reinforcement: 74, why: "grind; C out of 76-as-flush" },
  },
  "03_cathinones_methylenedioxy.json": {
    methylone: { rush: 54, euphoria: 60, enjoyment: 74, compulsiveness: 54, reinforcement: 64, why: "dual: same scale, +2 vs md board" },
    ethylone: { rush: 42, euphoria: 56, enjoyment: 64, compulsiveness: 44, reinforcement: 52, why: "dual offset" },
    pentylone: { rush: 58, euphoria: 52, enjoyment: 54, compulsiveness: 72, reinforcement: 76, why: "dual offset" },
    ephylone: { rush: 54, euphoria: 40, enjoyment: 36, compulsiveness: 76, reinforcement: 74, why: "dual offset; still not flush-94" },
    eutylone: { rush: 50, euphoria: 48, enjoyment: 44, compulsiveness: 70, reinforcement: 72, why: "dual offset" },
    dipentylone: { rush: 42, euphoria: 32, enjoyment: 30, compulsiveness: 72, reinforcement: 76, why: "dual offset" },
  },
  "04_pyros_alpha.json": {
    alpha_pvp: { rush: 94, euphoria: 94, enjoyment: 56, compulsiveness: 96, why: "mountain; mid/low buy-again" },
    alpha_php: { rush: 86, euphoria: 64, enjoyment: 84, compulsiveness: 94, why: "poem + flush; wins enjoyment, loses ruin-euphoria" },
    alpha_pihp: { rush: 87, euphoria: 62, enjoyment: 48, compulsiveness: 96, why: "poem rush + lockbox; keep the hate" },
    alpha_ppp: { rush: 86, euphoria: 72, enjoyment: 80, compulsiveness: 82, why: "slam-only poem, not mountain, not reserved-flush" },
    alpha_pbp: { rush: 62, euphoria: 50, enjoyment: 58, compulsiveness: 58, why: "coke-class rush; friendliest pyro" },
  },
  "04_pyros_unsubstituted.json": {
    alpha_pvp: { rush: 94, euphoria: 94, enjoyment: 56, compulsiveness: 96, why: "identical 04 board; same mountain" },
    alpha_php: { rush: 86, euphoria: 64, enjoyment: 84, compulsiveness: 94, why: "identical 04 board" },
    alpha_pihp: { rush: 87, euphoria: 62, enjoyment: 48, compulsiveness: 96, why: "identical 04 board" },
    alpha_ppp: { rush: 86, euphoria: 72, enjoyment: 80, compulsiveness: 82, why: "identical 04 board" },
    alpha_pbp: { rush: 62, euphoria: 50, enjoyment: 58, compulsiveness: 58, why: "identical 04 board" },
  },
  "05_pyros_md.json": {
    mdpv: { rush: 94, euphoria: 94, enjoyment: 68, compulsiveness: 96, reinforcement: 94, why: "mountain; keep love/hate enjoyment" },
    mdphp: { rush: 80, euphoria: 68, enjoyment: 72, compulsiveness: 86, reinforcement: 84, why: "poem-ish MD; not reserved-flush 94" },
    mdppp: { rush: 48, euphoria: 52, enjoyment: 68, compulsiveness: 44, reinforcement: 52, why: "old-head useful, not slam poem" },
    mdpbp: { rush: 62, euphoria: 58, enjoyment: 56, compulsiveness: 64, reinforcement: 66, why: "coke-class, not mountain" },
    mdpihp: { rush: 78, euphoria: 58, enjoyment: 38, compulsiveness: 86, reinforcement: 80, why: "wreck reports; high C, not 90s reserved" },
    "5_dbfpv": { rush: 70, euphoria: 68, enjoyment: 66, compulsiveness: 72, reinforcement: 68, why: "2014 glow, not mountain" },
  },
  "05_pyros_methylenedioxy.json": {
    mdpv: { rush: 95, euphoria: 92, enjoyment: 70, compulsiveness: 97, reinforcement: 95, why: "dual mountain; pull 82 enjoyment down" },
    mdphp: { rush: 80, euphoria: 66, enjoyment: 70, compulsiveness: 88, reinforcement: 86, why: "dual: keep C high but off reserved 94" },
    mdppp: { rush: 48, euphoria: 50, enjoyment: 62, compulsiveness: 42, reinforcement: 50, why: "dual offset" },
    mdpbp: { rush: 58, euphoria: 50, enjoyment: 50, compulsiveness: 62, reinforcement: 58, why: "dual offset; was underrated vs coke=92 scale" },
    mdpihp: { rush: 74, euphoria: 60, enjoyment: 52, compulsiveness: 84, reinforcement: 76, why: "dual: this board was cozier; pull En, keep C high" },
    "5_dbfpv": { rush: 72, euphoria: 68, enjoyment: 68, compulsiveness: 76, reinforcement: 68, why: "dual offset" },
  },
  "07_08_amphetamines_phenidates.json": {
    methamphetamine: { rush: 86, euphoria: 76, enjoyment: 80, compulsiveness: 84, reinforcement: 88, why: "poem slam; great-night Eu; greedy not flush-94" },
    ethylphenidate: { rush: 84, euphoria: 60, enjoyment: 56, compulsiveness: 86, reinforcement: 80, why: "EPH snap 80-88; C 80-90" },
    "4-fa": { rush: 44, euphoria: 68, enjoyment: 76, compulsiveness: 36, reinforcement: 66, why: "tingle rush; roll below MDMA" },
    amphetamine: { rush: 46, euphoria: 62, enjoyment: 72, compulsiveness: 56, reinforcement: 66, why: "functional night, not 4-MMC magic" },
    dextroamphetamine: { rush: 40, euphoria: 64, enjoyment: 74, compulsiveness: 48, reinforcement: 62, why: "same band as amph" },
  },
  "09_10_phenmetrazine_piperazine.json": {
    "3-fpm": { rush: 48, euphoria: 52, enjoyment: 58, compulsiveness: 76, reinforcement: 68, why: "weekend greedy, not flush" },
    "4-mar": { rush: 56, euphoria: 76, enjoyment: 80, compulsiveness: 66, reinforcement: 78, why: "great-night, not mountain 86" },
    phenmetrazine: { rush: 58, euphoria: 66, enjoyment: 74, compulsiveness: 74, reinforcement: 76, why: "classic stim; pull C off 80-as-pyro" },
    "2-dpmp": { rush: 52, euphoria: 46, enjoyment: 28, compulsiveness: 84, reinforcement: 58, why: "long habit, flavor note not flush-pyro" },
  },
  "11_12_empathogens.json": {
    mdma: { rush: 60, euphoria: 78, enjoyment: 88, compulsiveness: 36, reinforcement: 42, why: "best normal-life roll; pull Eu off mountain" },
    mda: { rush: 50, euphoria: 70, enjoyment: 74, compulsiveness: 34, why: "older cousin, not 80-as-neighbor" },
    "5-mapb": { rush: 58, euphoria: 74, enjoyment: 80, compulsiveness: 42, why: "closest copy, still not MDMA 92-era" },
    "6-apb": { rush: 48, euphoria: 70, enjoyment: 76, compulsiveness: 30, why: "all-night Benzo Fury, not mountain" },
    "5-apb": { rush: 44, euphoria: 68, enjoyment: 70, compulsiveness: 34, why: "same hug family, below MDMA" },
    "6-mapb": { rush: 52, euphoria: 70, enjoyment: 72, compulsiveness: 38, why: "thin copy under 5-MAPB" },
  },
  "13_dissos_ketamine_type.json": {
    ketamine: { rush: 44, euphoria: 58, enjoyment: 78, compulsiveness: 62, reinforcement: 68, why: "ket onset 35-50; C not O-PCE fiend" },
    tiletamine: { rush: 50, euphoria: 42, enjoyment: 36, compulsiveness: 38, reinforcement: 30, why: "onset, not slam-poem 78" },
    dck: { rush: 36, euphoria: 64, enjoyment: 74, compulsiveness: 60, reinforcement: 64, why: "hole candy under MXE" },
  },
  "14_dissos_mxe_oxopce.json": {
    mxe: { rush: 52, euphoria: 78, enjoyment: 86, compulsiveness: 44, reinforcement: 72, why: "best normal-life disso; hole-chase C 30-50" },
    o_pce: { rush: 68, euphoria: 38, enjoyment: 58, compulsiveness: 88, reinforcement: 86, why: "keep scalpel hug + disso-fiend C (flavor)" },
    dmxe: { rush: 54, euphoria: 68, enjoyment: 74, compulsiveness: 52, reinforcement: 64, why: "under MXE" },
  },
  "15_16_disso_pcp_pce.json": {
    "3-meo-pcp": { rush: 40, euphoria: 64, enjoyment: 82, compulsiveness: 86, reinforcement: 84, why: "disso fiend 80-90; En stays buy-again" },
    "3-me-pcpy": { rush: 52, euphoria: 66, enjoyment: 76, compulsiveness: 78, reinforcement: 78, why: "pull rush off poem 86" },
    "3-ho-pcp": { rush: 34, euphoria: 70, enjoyment: 80, compulsiveness: 66, reinforcement: 66, why: "hug disso under MXE" },
    "3-meo-pce": { rush: 48, euphoria: 70, enjoyment: 78, compulsiveness: 72, reinforcement: 72, why: "warm PCE, not pyro C" },
    pcp: { rush: 50, euphoria: 50, enjoyment: 66, compulsiveness: 60, reinforcement: 60, why: "classic, not slam-94" },
  },
  "17_dissos_diaryl_other.json": {
    nitrous_oxide: { rush: 90, euphoria: 72, enjoyment: 74, compulsiveness: 74, reinforcement: 80, why: "launch not stim-rush; C greedy balloons not flush" },
    ephenidine: { rush: 40, euphoria: 70, enjoyment: 76, compulsiveness: 54, reinforcement: 58, why: "warm diaryl under MXE" },
  },
  "17_disso_diaryl_other.json": {
    nitrous_oxide: { rush: 92, euphoria: 70, enjoyment: 72, compulsiveness: 72, reinforcement: 60, why: "dual: launch tag; pull C off 90" },
    ephenidine: { rush: 32, euphoria: 66, enjoyment: 72, compulsiveness: 52, reinforcement: 64, why: "dual offset" },
    xenon: { rush: 82, euphoria: 68, enjoyment: 66, compulsiveness: 32, reinforcement: 38, why: "launch-ish noble; low C stays" },
  },
  "18_20_phenethylamine_psychs.json": {
    "2c_b": { rush: 16, euphoria: 66, enjoyment: 74, compulsiveness: 18, reinforcement: 20, why: "candy, not MDMA 86-neighbor" },
    "2c_i": { rush: 18, euphoria: 62, enjoyment: 70, compulsiveness: 18, why: "under 2C-B" },
    "2c_c": { rush: 12, euphoria: 60, enjoyment: 68, compulsiveness: 14, why: "softer 2C" },
    "2c_e": { rush: 14, euphoria: 60, enjoyment: 66, compulsiveness: 16, why: "heavier, not hug-86" },
  },
  "18_20_pe_psychedelics.json": {
    "2c_b": { rush: null, euphoria: 64, enjoyment: 72, compulsiveness: 16, reinforcement: 36, why: "dual: candy under MDMA; leave rush null" },
    "2c_i": { rush: null, euphoria: 60, enjoyment: 68, compulsiveness: 14, reinforcement: 30, why: "dual offset" },
    "2c_e": { rush: null, euphoria: 60, enjoyment: 66, compulsiveness: 12, reinforcement: 28, why: "dual offset" },
  },
  "21_23_tryptamines.json": {
    dmt: { rush: 90, euphoria: 50, enjoyment: 76, compulsiveness: 20, reinforcement: 32, why: "launch 85-96, not stim-rush" },
    "5meo_dmt": { rush: 96, euphoria: 42, enjoyment: 56, compulsiveness: 16, reinforcement: 24, why: "launch ceiling; keep low Eu" },
    "4ho_met": { rush: null, euphoria: 66, enjoyment: 80, compulsiveness: 12, reinforcement: 30, why: "fun tryptamine, not 90-as-MDMA" },
    "4ho_mipt": { rush: null, euphoria: 68, enjoyment: 78, compulsiveness: 14, reinforcement: 30, why: "same" },
    "4aco_dmt": { rush: null, euphoria: 64, enjoyment: 80, compulsiveness: 12, reinforcement: 30, why: "mushroom night, not mountain" },
    psilocybin: { rush: null, euphoria: 56, enjoyment: 80, compulsiveness: 8, reinforcement: 28, why: "pull Eu off 58-as-fine; En stays" },
    psilocin: { rush: null, euphoria: 58, enjoyment: 78, compulsiveness: 10, reinforcement: 28, why: "same" },
    "5meo_mipt": { rush: 16, euphoria: 64, enjoyment: 78, compulsiveness: 20, reinforcement: 32, why: "moxy candy under MDMA" },
  },
  "24_lysergamides.json": {
    lsd: { rush: 6, euphoria: 72, enjoyment: 88, compulsiveness: 16, reinforcement: 20, why: "psych glow, not 80-as-4MMC-neighbor" },
    "1p-lsd": { rush: 6, euphoria: 70, enjoyment: 86, compulsiveness: 14, reinforcement: 18, why: "prodrug of the same night" },
    "al-lad": { rush: 8, euphoria: 74, enjoyment: 86, compulsiveness: 12, reinforcement: 16, why: "candy lysergamide under mountain" },
    "orange-sunshine": { rush: 6, euphoria: 72, enjoyment: 88, compulsiveness: 16, reinforcement: 20, why: "street LSD alias; same scale" },
  },
  "25_26_sedatives.json": {
    clonazolam: { rush: null, euphoria: 28, enjoyment: 44, compulsiveness: 86, reinforcement: 86, why: "calendar habit 80-90, not flush-94" },
    flubromazolam: { rush: null, euphoria: 22, enjoyment: 36, compulsiveness: 84, reinforcement: 84, why: "same flavor note" },
    alprazolam: { rush: null, euphoria: 52, enjoyment: 66, compulsiveness: 86, reinforcement: 86, why: "habit high, reserved-flush is pyro" },
    flualprazolam: { rush: null, euphoria: 38, enjoyment: 54, compulsiveness: 82, reinforcement: 82, why: "RC xan habit" },
    etizolam: { rush: null, euphoria: 48, enjoyment: 64, compulsiveness: 80, reinforcement: 80, why: "habit, not 82-as-pyro" },
    ghb: { rush: 48, euphoria: 70, enjoyment: 76, compulsiveness: 78, reinforcement: 78, why: "greedy G, not flush-86" },
    gbl: { rush: 54, euphoria: 66, enjoyment: 72, compulsiveness: 80, reinforcement: 80, why: "faster G; habit not pyro" },
    phenibut: { rush: null, euphoria: 42, enjoyment: 52, compulsiveness: 80, reinforcement: 80, why: "calendar rebound habit" },
  },
  "27_28_cannabinoids.json": {
    "5f_adb": { rush: 58, euphoria: 24, enjoyment: 16, compulsiveness: 78, reinforcement: 76, why: "spice chain-vape, not pyro flush-88" },
    am_2201: { rush: 56, euphoria: 46, enjoyment: 36, compulsiveness: 74, reinforcement: 70, why: "same" },
    mdmb_4en_pinaca: { rush: 56, euphoria: 26, enjoyment: 18, compulsiveness: 76, reinforcement: 74, why: "same" },
    "5f_mdmb_pica": { rush: 56, euphoria: 28, enjoyment: 20, compulsiveness: 76, reinforcement: 74, why: "same" },
    amb_fubinaca: { rush: 56, euphoria: 22, enjoyment: 12, compulsiveness: 76, reinforcement: 74, why: "same" },
    thc: { rush: 36, euphoria: 68, enjoyment: 80, compulsiveness: 46, reinforcement: 52, why: "plant night under 4-MMC hug" },
  },
  "30_taxonomy_expansion.json": {
    cocaine: { rush: 64, euphoria: 44, enjoyment: 68, compulsiveness: 74, reinforcement: 78, why: "old rush king; Eu clearly under 4-MMC" },
    crack: { rush: 74, euphoria: 46, enjoyment: 58, compulsiveness: 80, reinforcement: 82, why: "above powder, below mountain; not 98 flush" },
    coca_paste: { rush: 62, euphoria: 42, enjoyment: 36, compulsiveness: 76, why: "dirty middle; pull C off 88-as-flush" },
    nicotine: { rush: 46, euphoria: 34, enjoyment: 48, compulsiveness: 86, why: "habit, not pyro smash (flavor)" },
    ghb: { rush: 28, euphoria: 70, enjoyment: 74, compulsiveness: 68, why: "dual 30-board; do not clobber 25" },
    gbl: { rush: 30, euphoria: 66, enjoyment: 68, compulsiveness: 70, why: "dual 30-board" },
    methaqualone: { rush: 22, euphoria: 72, enjoyment: 76, compulsiveness: 48, why: "lude night under 4-MMC; C stays mid" },
  },
};

// 06 dual boards: scale both, keep the human-report vs names-only split
const EXPLICIT_06_UNUSUAL = {
  "4f-a-pvp": { rush: 78, euphoria: 64, enjoyment: 54, compulsiveness: 86, reinforcement: 84, why: "human-report 4F-PVP; poem-ish, not reserved-flush" },
  "4cl-a-pvp": { rush: 72, euphoria: 50, enjoyment: 34, compulsiveness: 82, reinforcement: 80, why: "ugly analog; high C flavor, not 92 reserved" },
  "4f-php": { rush: 70, euphoria: 52, enjoyment: 42, compulsiveness: 80, reinforcement: 78, why: "same" },
  "4f-a-pihp": { rush: 70, euphoria: 48, enjoyment: 36, compulsiveness: 82, reinforcement: 86, why: "same" },
  "4-me-a-pihp": { rush: 74, euphoria: 50, enjoyment: 32, compulsiveness: 84, reinforcement: 88, why: "same" },
  mphp: { rush: 58, euphoria: 48, enjoyment: 40, compulsiveness: 70, reinforcement: 74, why: "substituted work-pyro" },
  naphyrone: { rush: 52, euphoria: 62, enjoyment: 54, compulsiveness: 64, reinforcement: 68, why: "NRG-era; not mountain" },
  pyrovalerone: { rush: 50, euphoria: 48, enjoyment: 52, compulsiveness: 58, reinforcement: 66, why: "parent, not flakka" },
};
const EXPLICIT_06_SUB = {
  "4f_a_pvp": { rush: 38, euphoria: 42, enjoyment: 40, compulsiveness: 48, reinforcement: 54, why: "names-only board stays lower" },
  "4cl_a_pvp": { rush: 22, euphoria: 18, enjoyment: 12, compulsiveness: 40, reinforcement: 50, why: "keep thin-evidence low" },
  "4f_a_php": { rush: 18, euphoria: 22, enjoyment: 16, compulsiveness: 35, reinforcement: 40, why: "keep thin-evidence low" },
  pyrovalerone: { rush: 42, euphoria: 46, enjoyment: 50, compulsiveness: 56, reinforcement: 60, why: "parent, slight trim" },
  naphyrone: { rush: 30, euphoria: 24, enjoyment: 22, compulsiveness: 42, reinforcement: 58, why: "this board's weaker NRG take" },
};

function applyMap(file, data, map) {
  walkCompounds(data, (c) => {
    const raw = c.id || c.name;
    const keys = [String(raw), normId(raw)];
    let spec = null;
    for (const k of keys) {
      if (map[k]) spec = map[k];
      if (map[normId(k)]) spec = map[normId(k)];
    }
    // also try dashed / undashed
    if (!spec) {
      for (const k of Object.keys(map)) {
        if (normId(k) === normId(raw)) spec = map[k];
      }
    }
    if (!spec) return;
    const feel = getFeel(c);
    if (!feel) return;
    const why = spec.why || "house scale";
    for (const axis of AXES) {
      if (!(axis in spec)) continue;
      const next = spec[axis];
      if (next == null) continue;
      setScore(feel, axis, next, why, file, raw);
    }
  });
}

function heuristic(file, data) {
  const fam = file;
  walkCompounds(data, (c) => {
    const id = String(c.id || c.name || "");
    const nid = normId(id);
    const feel = getFeel(c);
    if (!feel) return;

    const r = getScore(feel, "rush");
    const eu = getScore(feel, "euphoria");
    const en = getScore(feel, "enjoyment");
    const co = getScore(feel, "compulsiveness");
    const rf = getScore(feel, "reinforcement");

    const isPsych = /18_20|21_23|24_lyser/.test(fam);
    const isLaunch = /^(dmt|5meo_dmt|nitrous|xenon)$/.test(nid);
    const isPyroFile = /04_pyros|05_pyros|06_pyros/.test(fam);
    const reservedFlush = /^(mdpv|alpha_pvp|alpha_php|alpha_pihp)$/.test(nid);

    // Psych rush: keep low unless launch
    if (isPsych && r != null && r > 22 && !isLaunch) {
      setScore(feel, "rush", Math.min(r, 18), "psych rush 0-20 unless launch", file, id);
    }
    if (isPsych && co != null && co > 26) {
      setScore(feel, "compulsiveness", Math.min(co, 20), "psych C 5-25", file, id);
    }
    if (isPsych && eu != null && eu > 76) {
      setScore(feel, "euphoria", 70, "psych glow under 4-MMC/MDMA band", file, id);
    }

    // Nobody except reserved flush sits 92+
    if (co != null && co >= 92 && !reservedFlush) {
      const next = /25_26|clonaz|flubro|alpraz/.test(fam + nid) ? 86 : /o_pce|ethylphenidate|^nep$/.test(nid) ? 86 : 78;
      setScore(feel, "compulsiveness", next, "flush-94 reserved for MDPV/PVP/PHP/PiHP", file, id);
    }

    // Euphoria 85+ only mountain
    if (eu != null && eu >= 85 && !/^(mdpv|alpha_pvp)$/.test(nid)) {
      const next = /4.?mmc|mdma|mxe|meth/.test(nid) ? 78 : 70;
      setScore(feel, "euphoria", next, "85+ euphoria reserved for MDPV/α-PVP", file, id);
    }

    // Rush 90+ only mountain or tagged launch
    if (r != null && r >= 90 && !/^(mdpv|alpha_pvp)$/.test(nid) && !isLaunch) {
      const next = /alpha_php|alpha_ppp|alpha_pihp|meth|ethylphenidate/.test(nid) ? 86 : 70;
      setScore(feel, "rush", next, "90+ rush reserved for MDPV/α-PVP (or launch tag)", file, id);
    }

    // Coke-class compulsiveness cannot stay in the 90s — already handled.
    // Reinforcement 90+ only mountain / 4-MMC hunt / meth
    if (rf != null && rf >= 92 && !/^(mdpv|alpha_pvp|alpha_php|alpha_pihp|methamphetamine|4-mmc|4_mmc)$/.test(nid)) {
      setScore(feel, "reinforcement", 82, "92+ reinforcement is mountain/hunt, not coke-peer", file, id);
    }

    // Pyro copies that inherited 4-MMC-era 80+ enjoyment on ugly bags: leave unless already mapped.
    void en;
    void isPyroFile;
  });
}

function patchJson(file, extraMap) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  const data = load(file);
  if (EXPLICIT[file]) applyMap(file, data, EXPLICIT[file]);
  if (extraMap) applyMap(file, data, extraMap);
  heuristic(file, data);
  save(file, data);
}

const jsonFiles = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"));

for (const f of jsonFiles) {
  if (f === "06_pyros_unusual.json") patchJson(f, EXPLICIT_06_UNUSUAL);
  else if (f === "06_pyros_substituted_unusual.json") patchJson(f, EXPLICIT_06_SUB);
  else patchJson(f);
}

// ---- MD patches (only when the table would now lie) ----
function mdReplace(file, replacements) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  let t = fs.readFileSync(p, "utf8");
  const orig = t;
  for (const [from, to] of replacements) {
    if (typeof from === "string") {
      if (!t.includes(from)) continue;
      t = t.split(from).join(to);
    } else {
      t = t.replace(from, to);
    }
  }
  if (t !== orig) fs.writeFileSync(p, t);
}

mdReplace("01_cathinones_mmc_halogen.md", [
  [
    "Rush: 88 / A — Fast, clean, body-wide. Insufflated nights are a series of peaks; the first one is the poem.\nEuphoria: 92 / A — MDMA hug on a cocaine chassis. Serotonin and dopamine both dump, then leave. That is the whole product.\nEnjoyment: 90 / A — Chat, music, libido, “forced” energy. People still call later cathinones cover bands.\nCompulsiveness: 93 / A — Notorious redose. Half-life of the high is a cigarette. The bag ends the argument.",
    "Rush: 68 / A — Fast, clean, body-wide come-up. Insufflated nights are a series of peaks. Poem-shaped, not the pyro slam. House band 55–70.\nEuphoria: 80 / A — Talky magic. At least double coke on the actual good. Best normal-life stim/roll. Not α-PVP. The copies still chase this.\nEnjoyment: 86 / A — Chat, music, libido, “forced” energy. People still call later cathinones cover bands. They would buy the night again.\nCompulsiveness: 76 / A — Notorious redose. Greedy, not flush-the-safe. The bag ends the argument. Pyros sit in the 90s.",
  ],
  [
    "Rush: 80 / A — Sharper, more coke-shaped than 4-MMC. Short. People slam it in chemsex scenes; that is a flag, not a recommendation.\nEuphoria: 78 / A — Real euphoria. Not the 4-MMC poem. Users still come back.",
    "Rush: 58 / A — Sharper, more coke-shaped than 4-MMC. Short. People slam it in chemsex scenes; that is a flag, not a recommendation.\nEuphoria: 58 / A — Real euphoria. Not the 4-MMC poem. Clearly under double-coke. Users still come back.",
  ],
]);

mdReplace("01_cathinones_mmc.md", [
  [/(\| rush \| )86( \|)/, "$166$2"],
  [/(\| euphoria \| )92( \|)/, "$178$2"],
  [/(\| enjoyment \| )90( \|)/, "$188$2"],
  [/(\| compulsiveness \| )91( \|)/, "$174$2"],
]);

mdReplace("30_taxonomy_expansion.md", [
  [
    "Headline: **The rush everything else is compared to. Short, bright, greedy.**",
    "Headline: **The old rush king. Short, bright, greedy. Clearly under 4-MMC on the good. Not the pyro.**",
  ],
  [
    "Rush **92 (A)** — Snorted: the poem. Immediate, clean, “more-ish” before the line is finished. The catalog’s rush king among powders.  \nEuphoria **86 (A)** — Confidence, shine, talk, music, sex. Not a hug. Not a roll. A spotlight.  \nEnjoyment **88 (A)** — People actually like this. The night is expensive and short. They still want it.  \nCompulsiveness **90 (A)** — The bag empties. “One more line to feel the first line.” High love **and** high fiend. Independent axes, both loud.",
    "Rush **64 (A)** — Snorted: the old poem. Immediate, clean, “more-ish” before the line is finished. House band 55–70. Pyros stole this sentence.  \nEuphoria **44 (A)** — Confidence, shine, talk, music, sex. Not a hug. Not a roll. A spotlight. Clearly under 4-MMC (double-coke). Not the mountain.  \nEnjoyment **68 (A)** — People actually like this. The night is expensive and short. They still want it. Buy-again can beat in-the-moment hug.  \nCompulsiveness **74 (A)** — The bag empties. “One more line to feel the first line.” Greedy, not flush-the-safe. High love **and** high fiend. Independent axes.",
  ],
  [
    'NPC line: *"The snap. Pyros keep trying to steal this sentence."*',
    'NPC line: *"The old snap. Pyros already stole this sentence."*',
  ],
  [
    "Rush **97 (A)** — Smoked: faster and taller than powder. This is the number the street uses when they say “rush.”  \nEuphoria **82 (A)** — Enormous and brief. The peak is the whole product.  \nEnjoyment **70 (A)** — The hit is loved. The night is not. Do not average the misery into a low peak.  \nCompulsiveness **98 (A)** — Catalog ceiling. Pipe, again, again. Duration is a match-head.",
    "Rush **74 (A)** — Smoked: faster and taller than powder. Above coke, below the MDPV / α-PVP ceiling. One thread ranked this over apvp; others say vaped PVP blows it away. Split stays a split.  \nEuphoria **46 (A)** — Enormous and brief *for coke-class*. Still under 4-MMC. Not the mountain.  \nEnjoyment **58 (A)** — The hit is loved. The night is not. Do not average the misery into a low peak.  \nCompulsiveness **80 (A)** — Pipe, again, again. Greedy week. Not the reserved pyro 94–98 flush.",
  ],
  [
    "Rush **78 (B)** — Smoked paste, harsh, fast.  \nEuphoria **58 (B)** — Spotlight with solvents.  \nEnjoyment **40 (B)** — Poverty-market chemical. People use it. They do not write poems.  \nCompulsiveness **88 (B)** — Cheap + short = empty night.",
    "Rush **62 (B)** — Smoked paste, harsh, fast. Coke-class, not mountain.  \nEuphoria **42 (B)** — Spotlight with solvents. Coke-class.  \nEnjoyment **36 (B)** — Poverty-market chemical. People use it. They do not write poems.  \nCompulsiveness **76 (B)** — Cheap + short = empty night. Greedy, not flush-the-safe.",
  ],
]);

mdReplace("04_pyros_alpha.md", [
  ["| rush | 92 | 78 | 15–96 | Slam reports are poems. Nasal/oral reports are blank. Range is the route, not noise. |", "| rush | 86 | 78 | 15–88 | Slam-only poem. House 80–88. Not the MDPV/α-PVP ceiling. Range is the route, not noise. |"],
  ["| euphoria | 84 | 70 | 10–88 | “Way more euphoric than MDPV” on the slam. Nasal: tidy, no glow. |", "| euphoria | 72 | 70 | 10–80 | Slam glow is a great night, not the mountain. Nasal: tidy, no glow. |"],
  ["| compulsiveness | 80 | 72 | 40–90 | Immediate “better take more.” Four or five repeats in an evening. Mailbox story. |", "| compulsiveness | 82 | 72 | 40–88 | Immediate “better take more.” Mailbox story. High, not reserved-flush 94. |"],
]);

mdReplace("04_pyros_unsubstituted.md", [
  ["| rush | 92 | 78 | 15–96 | Slam reports are poems. Nasal/oral reports are blank. Range is the route, not noise. |", "| rush | 86 | 78 | 15–88 | Slam-only poem. House 80–88. Not the MDPV/α-PVP ceiling. Range is the route, not noise. |"],
  ["| euphoria | 84 | 70 | 10–88 | “Way more euphoric than MDPV” on the slam. Nasal: tidy, no glow. |", "| euphoria | 72 | 70 | 10–80 | Slam glow is a great night, not the mountain. Nasal: tidy, no glow. |"],
  ["| compulsiveness | 80 | 72 | 40–90 | Immediate “better take more.” Four or five repeats in an evening. Mailbox story. |", "| compulsiveness | 82 | 72 | 40–88 | Immediate “better take more.” Mailbox story. High, not reserved-flush 94. |"],
]);

// 04 PVP / PHP / PiHP / PBP score tables — both boards
function patch04pyroTables(file) {
  mdReplace(file, [
    [
      "| rush | 88 | 82 | 60–95 | Vape/slam first-hit is the family's reference rush. Nasal is slower, still a hit. |",
      "| rush | 94 | 82 | 70–96 | Vape/slam first-hit is the family's reference rush. Mountain. Nasal is slower, still a hit. |",
    ],
    [
      "| euphoria | 78 | 75 | 40–90 | High for a lot of people, only-the-first-five-seconds for others. Still a glow chemical. |",
      "| euphoria | 94 | 75 | 70–96 | The hit that ruins the pharmacy. Only-the-first-five-seconds for some. Still the ceiling. |",
    ],
    [
      "| enjoyment | 74 | 70 | 25–90 | First weekend is why the family exists. Later weekends are the warnings. Catalog number is the initial rush. |",
      "| enjoyment | 56 | 70 | 20–80 | First weekend is why the family exists. Later: hated it, finished the gram. Mid/low buy-again. Do not cozy this. |",
    ],
    [
      "| rush | 90 | 80 | 55–95 | Impeccable first-hit is the consensus, not a one-off. |",
      "| rush | 86 | 80 | 55–90 | Impeccable first-hit. Poem league 80–88, not the mountain. |",
    ],
    [
      "| euphoria | 80 | 76 | 50–88 | Coke-shaped for the PVP-naive. A hair less magic than tan PVP for veterans. Still a smile. |",
      "| euphoria | 64 | 76 | 45–75 | Wins buy-again, loses ruin-the-pharmacy euphoria. Still a smile. |",
    ],
    [
      "| compulsiveness | 88 | 82 | 60–95 | Vape-era means redose-era. Easier to shelf than PVP is relative. |",
      "| compulsiveness | 94 | 82 | 80–98 | Vape-era means redose-era. Reserved flush-test. Easier to shelf than PVP is relative, not low. |",
    ],
    [
      "| rush | 91 | 72 | 50–96 | More-rush-than-crack, gone-faster is the 2022-23 vape line. |",
      "| rush | 87 | 72 | 50–92 | More-rush-than-crack, gone-faster. Poem league, not MDPV/PVP ceiling. |",
    ],
    [
      "| euphoria | 70 | 58 | 20–88 | Best-hours-of-my-life vs trash. High end is documented; not averaged away. |",
      "| euphoria | 62 | 58 | 20–78 | Best-hours vs trash. Not the mountain. Not averaged away. |",
    ],
    [
      "| enjoyment | 72 | 55 | 15–90 | Current-king energy and a pile of why-did-I-finish-this. Independent of compulsiveness. |",
      "| enjoyment | 48 | 55 | 15–70 | Why-did-I-finish-this. Keep the hate. Independent of compulsiveness. |",
    ],
    [
      "| rush | 38 | 60 | 10–70 | Vape hunters looking for the PVP hit mostly missed it. A few nasal reports claim lift-off. |",
      "| rush | 62 | 60 | 20–70 | Coke-class 55–70. Vape hunters looking for the PVP hit mostly missed it. A few nasal reports claim lift-off. |",
    ],
  ]);
}
patch04pyroTables("04_pyros_alpha.md");
patch04pyroTables("04_pyros_unsubstituted.md");

function patch05(file, mdpvBlock) {
  mdReplace(file, mdpvBlock);
}
const md05a = [
  [
    /Rush[:* *]*\*?\*?88/i,
    "Rush 94",
  ],
];
// 05 files use feel prose more than tables — patch known score lines if present
mdReplace("05_pyros_md.md", [
  ["rush **88**", "rush **94**"],
  ["euphoria **84**", "euphoria **94**"],
  ["enjoyment **70**", "enjoyment **68**"],
  ["Rush 88", "Rush 94"],
  ["Euphoria 84", "Euphoria 94"],
]);
mdReplace("05_pyros_methylenedioxy.md", [
  ["rush **92**", "rush **95**"],
  ["euphoria **88**", "euphoria **92**"],
  ["enjoyment **82**", "enjoyment **70**"],
  ["Rush 92", "Rush 95"],
  ["Euphoria 88", "Euphoria 92"],
  ["Enjoyment 82", "Enjoyment 70"],
]);

mdReplace("11_12_empathogens.md", [
  ["Euphoria 92", "Euphoria 78"],
  ["euphoria **92**", "euphoria **78**"],
  ["Enjoyment 94", "Enjoyment 88"],
  ["enjoyment **94**", "enjoyment **88**"],
  ["Rush 55", "Rush 60"],
]);

mdReplace("14_dissos_mxe_oxopce.md", [
  ["euphoria **90**", "euphoria **78**"],
  ["enjoyment **94**", "enjoyment **86**"],
  ["compulsiveness **82**", "compulsiveness **44**"],
  ["Euphoria 90", "Euphoria 78"],
  ["Enjoyment 94", "Enjoyment 86"],
  ["Compulsiveness 82", "Compulsiveness 44"],
  ["compulsiveness **92**", "compulsiveness **88**"],
]);

mdReplace("13_dissos_ketamine_type.md", [
  ["rush **82**", "rush **44**"],
  ["Rush 82", "Rush 44"],
  ["compulsiveness **84**", "compulsiveness **62**"],
]);

mdReplace("07_08_amphetamines_phenidates.md", [
  ["rush **88**", "rush **86**"],
  ["euphoria **86**", "euphoria **76**"],
  ["enjoyment **84**", "enjoyment **80**"],
  ["compulsiveness **90**", "compulsiveness **84**"],
]);

mdReplace("25_26_sedatives.md", [
  ["Compulsiveness **94** (A) — Near-cap. People take more because they already forgot they took it.", "Compulsiveness **86** (A) — Calendar habit, not pyro flush. People take more because they already forgot they took it."],
  ["Compulsiveness **91** (A) — Extreme. Redose because you think nothing happened.", "Compulsiveness **84** (A) — Calendar habit 80–90. Redose because you think nothing happened."],
]);

mdReplace("18_20_phenethylamine_psychs.md", [
  ["Enjoyment 90", "Enjoyment 74"],
  ["euphoria 86", "euphoria 66"],
  ["Euphoria 86", "Euphoria 66"],
]);

mdReplace("02_cathinones_extended_nalkyl.md", [
  ["Rush 78", "Rush 48"],
  ["Compulsiveness 92", "Compulsiveness 74"],
  ["Rush 62", "Rush 46"],
  ["Compulsiveness 86", "Compulsiveness 84"],
]);

// Write changelog into CALIBRATION.md
const calPath = path.join(ROOT, "CALIBRATION.md");
let cal = fs.readFileSync(calPath, "utf8");
const byMove = changelog
  .map((x) => ({ ...x, delta: x.next - x.old }))
  .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

const lines = [];
lines.push("");
lines.push(`Pass date: 2026-10-21. ${changelog.length} axis writes across scored JSON. Nulls left null. Dual boards scaled, not clobbered.`);
lines.push("");
lines.push("### Fifteen biggest moves");
lines.push("");
lines.push("| id | file | axis | old → new | Δ | why |");
lines.push("|---|---|---|---:|---:|---|");
const seenMove = new Set();
let shown = 0;
for (const m of byMove) {
  const k = m.file + m.id + m.axis;
  if (seenMove.has(k)) continue;
  seenMove.add(k);
  lines.push(`| \`${m.id}\` | \`${m.file}\` | ${m.axis} | ${m.old} → ${m.next} | ${m.delta > 0 ? "+" : ""}${m.delta} | ${m.why} |`);
  shown++;
  if (shown >= 15) break;
}
lines.push("");
lines.push("### Full axis writes");
lines.push("");
const grouped = new Map();
for (const m of changelog) {
  const key = `${m.file} / ${m.id}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(`${m.axis} ${m.old}→${m.next}`);
}
for (const [key, bits] of grouped) {
  const first = changelog.find((m) => `${m.file} / ${m.id}` === key);
  lines.push(`- **${key}:** ${bits.join(", ")} — ${first.why}`);
}
lines.push("");
lines.push("### Does the mountain vs 4-MMC / MDMA / coke gap read?");
lines.push("");
lines.push("Yes, if the headliner numbers landed:");
lines.push("");
lines.push("- α-PVP / MDPV euphoria **92–94** vs 4-MMC **78–80** vs MDMA **78** vs coke **44**. The canyon is visible.");
lines.push("- 4-MMC is no longer a 92 sitting on the mountain. Coke is no longer an 86 neighbor of 4-MMC.");
lines.push("- Flush: MDPV / PVP / PHP / PiHP **94–97**. 4-MMC **74–76**. Coke **74**. Hexen **74**. NEP **84** (habit flavor). MDMA **36**.");
lines.push("- Enjoyment stays mean: α-PVP **56**, α-PiHP **48**, MDPV **68–70**, α-PHP **84**, 4-MMC **86–88**.");
lines.push("");

cal = cal.replace(
  "Short `id` old→new + why. Dual-board rows listed separately when both moved. Full table filled by the 2026-10-21 renormalization pass.\n",
  "Short `id` old→new + why. Dual-board rows listed separately when both moved.\n" + lines.join("\n")
);
fs.writeFileSync(calPath, cal);

console.log("writes", changelog.length);
console.log("top15:");
shown = 0;
for (const m of byMove) {
  console.log(`${m.id} ${m.axis} ${m.old}->${m.next} (${m.file})`);
  shown++;
  if (shown >= 15) break;
}
