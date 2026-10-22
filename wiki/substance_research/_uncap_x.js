"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const XMAX = 15;

function bar(x) {
  if (x == null) return null;
  return Math.round((100 * Math.log10(1 + x)) / Math.log10(1 + XMAX));
}

function load(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}
function save(file, data) {
  fs.writeFileSync(path.join(ROOT, file), JSON.stringify(data, null, 2) + "\n");
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

function applyX(host, xs) {
  host.rush_x = xs.rush;
  host.euphoria_x = xs.eu;
  host.enjoyment_x = xs.en;
  host.compulsive_x = xs.co;
  const map = [
    ["rush", xs.rush],
    ["euphoria", xs.eu],
    ["enjoyment", xs.en],
    ["compulsiveness", xs.co],
  ];
  for (const [k, x] of map) {
    const b = bar(x);
    if (host[k] == null) {
      host[k] = { score: b, x };
    } else if (typeof host[k] === "object") {
      host[k].score = b;
      host[k].x = x;
    } else {
      host[k] = b;
    }
  }
}

function patchFile(file, byId) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  const data = load(file);
  walk(data, (c) => {
    const spec = byId[c.id] || byId[c.name];
    if (!spec) return;
    const host = c.feel || c.scores;
    if (!host) return;
    applyX(host, spec);
  });
  save(file, data);
}

const L = {
  coke: { rush: 1.0, eu: 1.0, en: 1.0, co: 1.0 },
  crack: { rush: 1.6, eu: 1.15, en: 0.75, co: 2.0 },
  mmcH: { rush: 1.4, eu: 2.5, en: 2.2, co: 2.3 },
  mmcA: { rush: 1.3, eu: 2.3, en: 2.4, co: 2.1 },
  pvp: { rush: 12, eu: 12, en: 0.65, co: 12 },
  php: { rush: 6.5, eu: 4.5, en: 2.2, co: 10 },
  pihp: { rush: 7, eu: 3.8, en: 0.55, co: 11 },
  ppp: { rush: 2.8, eu: 2.0, en: 1.8, co: 2.4 },
  pbp: { rush: 1.1, eu: 0.7, en: 0.85, co: 0.8 },
  mdpvA: { rush: 10, eu: 10, en: 0.85, co: 11.5 },
  mdpvB: { rush: 10, eu: 9.5, en: 0.95, co: 11.8 },
  mdma: { rush: 0.9, eu: 2.2, en: 2.5, co: 0.45 },
  methA: { rush: 2.8, eu: 2.1, en: 2.0, co: 3.0 },
  methB: { rush: 3.0, eu: 2.2, en: 2.1, co: 3.2 },
  nepA: { rush: 0.5, eu: 0.7, en: 1.1, co: 3.2 },
  hexA: { rush: 0.55, eu: 0.55, en: 0.7, co: 2.0 },
  nepB: { rush: 0.55, eu: 0.8, en: 1.0, co: 3.0 },
  hexB: { rush: 0.6, eu: 0.6, en: 0.75, co: 2.1 },
};

patchFile("30_taxonomy_expansion.json", { cocaine: L.coke, crack: L.crack });
patchFile("01_cathinones_mmc_halogen.json", { "4-mmc": L.mmcH });
patchFile("01_cathinones_mmc.json", { "4-mmc": L.mmcA });
patchFile("04_pyros_alpha.json", {
  alpha_pvp: L.pvp,
  alpha_php: L.php,
  alpha_pihp: L.pihp,
  alpha_ppp: L.ppp,
  alpha_pbp: L.pbp,
});
patchFile("04_pyros_unsubstituted.json", {
  alpha_pvp: L.pvp,
  alpha_php: L.php,
  alpha_pihp: L.pihp,
  alpha_ppp: L.ppp,
  alpha_pbp: L.pbp,
});
patchFile("05_pyros_md.json", { mdpv: L.mdpvA });
patchFile("05_pyros_methylenedioxy.json", { mdpv: L.mdpvB });
patchFile("11_12_empathogens.json", { mdma: L.mdma });
patchFile("07_08_amphetamines_phenidates.json", { methamphetamine: L.methA });
patchFile("07_10_other_stims.json", { methamphetamine: L.methB });
patchFile("02_cathinones_extended_nalkyl.json", { nep: L.nepA, n_ethylhexedrone: L.hexA });
patchFile("02_cathinones_chain.json", { nep: L.nepB, n_ethylhexedrone: L.hexB });

function mdReplace(file, pairs) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  let t = fs.readFileSync(p, "utf8");
  const orig = t;
  for (const [from, to] of pairs) {
    if (typeof from === "string") {
      if (t.includes(from)) t = t.split(from).join(to);
    } else t = t.replace(from, to);
  }
  if (t !== orig) fs.writeFileSync(p, t);
}

mdReplace("01_cathinones_mmc_halogen.md", [
  [
    "Rush: 68 / A — Fast, clean, body-wide come-up. Insufflated nights are a series of peaks. Poem-shaped, not the pyro slam. House band 55–70.\nEuphoria: 80 / A — Talky magic. At least double coke on the actual good. Best normal-life stim/roll. Not α-PVP. The copies still chase this.\nEnjoyment: 86 / A — Chat, music, libido, “forced” energy. People still call later cathinones cover bands. They would buy the night again.\nCompulsiveness: 76 / A — Notorious redose. Greedy, not flush-the-safe. The bag ends the argument. Pyros sit in the 90s.",
    "Rush: bar 31 / rush_x 1.4 — Come-up, not the pyro slam. ×coke, not a 0–100 intensity.\nEuphoria: bar 45 / euphoria_x 2.5 — Talky magic. At least double coke. Best normal-life stim/roll. Not α-PVP (12×).\nEnjoyment: bar 42 / enjoyment_x 2.2 — They would buy the night again.\nCompulsiveness: bar 43 / compulsive_x 2.3 — Greedy redose, not flush-the-safe (PVP is 12×).",
  ],
  [
    "Rush: 88 / A — Fast, clean, body-wide. Insufflated nights are a series of peaks; the first one is the poem.\nEuphoria: 92 / A — MDMA hug on a cocaine chassis. Serotonin and dopamine both dump, then leave. That is the whole product.\nEnjoyment: 90 / A — Chat, music, libido, “forced” energy. People still call later cathinones cover bands.\nCompulsiveness: 93 / A — Notorious redose. Half-life of the high is a cigarette. The bag ends the argument.",
    "Rush: bar 31 / rush_x 1.4 — Come-up, not the pyro slam.\nEuphoria: bar 45 / euphoria_x 2.5 — At least double coke. Not the mountain.\nEnjoyment: bar 42 / enjoyment_x 2.2 — Buy the night again.\nCompulsiveness: bar 43 / compulsive_x 2.3 — Greedy, not flush-the-safe.",
  ],
]);

mdReplace("30_taxonomy_expansion.md", [
  [
    "Rush **64 (A)** — Snorted: the old poem. Immediate, clean, “more-ish” before the line is finished. House band 55–70. Pyros stole this sentence.  \nEuphoria **44 (A)** — Confidence, shine, talk, music, sex. Not a hug. Not a roll. A spotlight. Clearly under 4-MMC (double-coke). Not the mountain.  \nEnjoyment **68 (A)** — People actually like this. The night is expensive and short. They still want it. Buy-again can beat in-the-moment hug.  \nCompulsiveness **74 (A)** — The bag empties. “One more line to feel the first line.” Greedy, not flush-the-safe. High love **and** high fiend. Independent axes.",
    "Rush **bar 25 / rush_x 1.0 (A)** — The named mundane. Everything else is a multiple of this.  \nEuphoria **bar 25 / euphoria_x 1.0 (A)** — Spotlight, not a hug. 4-MMC is 2.4×. α-PVP is 12×.  \nEnjoyment **bar 25 / enjoyment_x 1.0 (A)** — People still buy the night.  \nCompulsiveness **bar 25 / compulsive_x 1.0 (A)** — Greedy lines. Pyro flush is 12×, not this.",
  ],
  [
    "Rush **92 (A)** — Snorted: the poem. Immediate, clean, “more-ish” before the line is finished. The catalog’s rush king among powders.  \nEuphoria **86 (A)** — Confidence, shine, talk, music, sex. Not a hug. Not a roll. A spotlight.  \nEnjoyment **88 (A)** — People actually like this. The night is expensive and short. They still want it.  \nCompulsiveness **90 (A)** — The bag empties. “One more line to feel the first line.” High love **and** high fiend. Independent axes, both loud.",
    "Rush **bar 25 / rush_x 1.0 (A)** — The named mundane. Everything else is a multiple of this.  \nEuphoria **bar 25 / euphoria_x 1.0 (A)** — Spotlight, not a hug. 4-MMC is 2.4×. α-PVP is 12×.  \nEnjoyment **bar 25 / enjoyment_x 1.0 (A)** — People still buy the night.  \nCompulsiveness **bar 25 / compulsive_x 1.0 (A)** — Greedy lines. Pyro flush is 12×, not this.",
  ],
  [
    "Rush **74 (A)** — Smoked: faster and taller than powder. Above coke, below the MDPV / α-PVP ceiling. One thread ranked this over apvp; others say vaped PVP blows it away. Split stays a split.  \nEuphoria **46 (A)** — Enormous and brief *for coke-class*. Still under 4-MMC. Not the mountain.  \nEnjoyment **58 (A)** — The hit is loved. The night is not. Do not average the misery into a low peak.  \nCompulsiveness **80 (A)** — Pipe, again, again. Greedy week. Not the reserved pyro 94–98 flush.",
    "Rush **bar 34 / rush_x 1.6 (A)** — Faster than powder. Not 12×.  \nEuphoria **bar 27 / euphoria_x 1.15 (A)** — Still coke-class. Under 4-MMC 2.4×.  \nEnjoyment **bar 20 / enjoyment_x 0.75 (A)** — The hit is loved. The night is not.  \nCompulsiveness **bar 40 / compulsive_x 2.0 (A)** — Greedy pipe. Not pyro flush 12×.",
  ],
]);

function patch04tables(file) {
  mdReplace(file, [
    [
      "| rush | 88 | 82 | 60–95 | Vape/slam first-hit is the family’s reference rush. Nasal is slower, still a hit. |",
      "| rush | bar 93 / x 12 | 82 | — | Uncapped ×coke. User body. Display bar uses xmax=15. |",
    ],
    [
      "| rush | 94 | 82 | 70–96 | Vape/slam first-hit is the family's reference rush. Mountain. Nasal is slower, still a hit. |",
      "| rush | bar 93 / x 12 | 82 | — | Uncapped ×coke. User body. |",
    ],
    [
      "| euphoria | 78 | 75 | 40–90 | High for a lot of people, “only the first five seconds” for others. Still a glow chemical. |",
      "| euphoria | bar 93 / x 12 | 75 | — | Cabinet-ruin glow. 5× 4-MMC. Not a neighbor of 80. |",
    ],
    [
      "| euphoria | 94 | 75 | 70–96 | The hit that ruins the pharmacy. Only-the-first-five-seconds for some. Still the ceiling. |",
      "| euphoria | bar 93 / x 12 | 75 | — | Cabinet-ruin glow. 5× 4-MMC. |",
    ],
    [
      "| enjoyment | 74 | 70 | 25–90 | First weekend is why the family exists. Later weekends are why people write warnings. Initial rush is the catalog number. |",
      "| enjoyment | bar 18 / x 0.65 | 70 | — | Hated it, finished the gram. Independent of euphoria_x 12. |",
    ],
    [
      "| enjoyment | 56 | 70 | 20–80 | First weekend is why the family exists. Later: hated it, finished the gram. Mid/low buy-again. Do not cozy this. |",
      "| enjoyment | bar 18 / x 0.65 | 70 | — | Hated it, finished the gram. |",
    ],
    [
      "| compulsiveness | 96 | 90 | 80–99 | Definition of the family. Erowid, I-TREND, rats, every roundup. Independent of whether they still liked it. |",
      "| compulsiveness | bar 93 / x 12 | 90 | — | Flush-the-bag. 4-MMC greed is 2.2×, not this. |",
    ],
  ]);
}
patch04tables("04_pyros_alpha.md");
patch04tables("04_pyros_unsubstituted.md");

mdReplace("07_08_amphetamines_phenidates.md", [
  [
    "- **Rush 88 / A** — The poem. Fast routes write the myth. Oral / snorted is a long high, not the same flash (NIDA). Score the SKU for the myth it sells; flag the route. No SOP.\n- **Euphoria 86 / A** — The analog wall exists because this mood is the target. Lasts. Makes chores holy and then makes days disappear.",
    "- **Rush bar 48 / rush_x 2.8 (A)** — Poem slam vs coke 1.0. Not α-PVP 12×. Flag the route. No SOP.\n- **Euphoria bar 41 / euphoria_x 2.1 (A)** — Great night of a normal life. After PVP this reads as caffeine.",
  ],
  [
    "- **Compulsiveness 90 / A** — Runs. Redose before the blood even falls. The bag loses.",
    "- **Compulsiveness bar 50 / compulsive_x 3.0 (A)** — Greedy week. Not pyro flush 12×.",
  ],
]);

mdReplace("07_10_other_stims.md", [
  [
    "| **methamphetamine** | 88 / 86 / 90 / 84 | The king. Rush that analogs chase. Euphoria that lasts. Compulsion that eats days. Smoked/IV lore is the myth; oral still slaps. | `redose` `paranoia` | \"The one every analog is chasing and none of them catch.\" |",
    "| **methamphetamine** | bar 50/42/41/52 · x 3.0/2.2/2.1/3.2 | Poem vs coke, not the pyro mountain. After PVP: caffeine. | `redose` `paranoia` | \"Clean and long until a pyro happens.\" |",
  ],
]);

mdReplace("11_12_empathogens.md", [
  ["**Enjoyment 88 / A** — The night people compare every RC to.", "**Enjoyment bar 45 / enjoyment_x 2.5 (A)** — The night people compare every RC to. ×coke, not a 92-next-to-PVP."],
]);

console.log("bars", {
  coke: bar(1),
  mmc: bar(2.4),
  forty: "x~2 => " + bar(2),
  half: bar(6),
  pvp: bar(12),
  mdpv: bar(10),
});
