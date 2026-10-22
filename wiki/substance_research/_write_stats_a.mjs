import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const STIM = "stim_coke100";
const DISSO = "disso_ket100";
const EMP = "empathogen_mdma100";
const PE = "psych_2cb100";
const NBOME = "nbome_25i100";
const DOX = "dox_dom100";
const TRYPT = "trypt_4aco100";
const LYS = "lysergamide_lsd100";

const SECTIONS = {
  1: "Classical stimulants (locked anchors live here)",
  2: "MMC cathinones",
  3: "Halogen MMC (CMC / FMC / BMC)",
  4: "N-alkyl / chain cathinones",
  5: "Methylenedioxy cathinones (bk-MDMA)",
  6: "Odd / methoxy cathinones",
  7: "Unsubstituted α-pyros",
  8: "MD-pyros",
  9: "4-methyl / Centroton pyros",
  10: "Substituted / unusual pyros",
  11: "Phenidates",
  12: "Fluoroamphetamines",
  13: "Phenmetrazine / aminorex / piperazine",
  14: "Leftover stims / blends",
  15: "Ketamine-likes (disso wall, ket E=100)",
  16: "MXE / oxo-PCE (disso wall)",
  17: "PCP / PCE (disso wall)",
  18: "Diarylethylamines / other dissos",
  19: "Empathogens (MDMA wall, MDMA E=100)",
  20: "2C / NBOMe / DOx (class-local)",
  21: "Tryptamines (class-local)",
  22: "Lysergamides (LSD wall, LSD E=100)",
};

function row(o) {
  const placeholder = !!o.placeholder;
  const P = o.P ?? null, E = o.E ?? null, R = o.R ?? null;
  const Strength_W1 = !placeholder && P != null && E != null && R != null
    ? Math.round(P * E * R * 10000) / 10000
    : null;
  return {
    name: o.name, slug: o.slug, family: o.family, wall: o.wall ?? STIM, section: o.section,
    P, E, R, D: o.D ?? null, HalfLife: o.HalfLife ?? null, C: o.C ?? null, A: o.A ?? null,
    onset: o.onset ?? null, danger: o.danger ?? null, dependence: o.dependence ?? null,
    Strength_W1, confidence: o.confidence ?? (placeholder ? "D" : "C"),
    placeholder, notes: o.notes.startsWith("gameplay_estimate") ? o.notes : "gameplay_estimate. " + o.notes,
    sources: o.sources ?? [],
  };
}
function n(name, slug, family, section, why, extra = {}) {
  return row({ name, slug, family, section, placeholder: true, confidence: "D", notes: why, ...extra });
}

const rows = [
  row({ name: "caffeine", slug: "caffeine", family: "xanthine", section: 1, P: 0.05, E: 5, R: 5, D: 240, HalfLife: 360, C: 0.05, A: 0.10, confidence: "A", onset: 15, dependence: "xanthine",
    notes: "LOCKED ANCHOR 0.05/5/5. D=240 matches the boxed 20/80 mix. Strength_W1=1.25.",
    sources: ["https://psychonautwiki.org/wiki/Caffeine"] }),
  row({ name: "cocaine", slug: "cocaine", family: "tropane", section: 1, P: 1.00, E: 100, R: 100, D: 50, HalfLife: 40, C: 0.50, A: 0.40, confidence: "A", onset: 3, danger: "cardio", dependence: "stim_redose",
    notes: "LOCKED ANCHOR 1/100/100. Fun window ~40–60. Strength_W1=10000.",
    sources: ["https://psychonautwiki.org/wiki/Cocaine", "https://www.reddit.com/r/researchchemicals/comments/6bdhxt/4mmc_vs_cocaine/"] }),
  row({ name: "crack", slug: "crack", family: "tropane", section: 1, P: 1.00, E: 110, R: 160, D: 12, HalfLife: 15, C: 0.90, A: 0.60, confidence: "A", onset: 1, danger: "cardio", dependence: "stim_redose",
    notes: "Same molecule, different door. Bigger snap, tiny D. Strength_W1=17600.",
    sources: ["https://psychonautwiki.org/wiki/Cocaine"] }),
  row({ name: "amphetamine (racemic)", slug: "amphetamine", family: "amphetamine", section: 1, P: 1.20, E: 105, R: 78, D: 240, HalfLife: 360, C: 0.35, A: 0.55, confidence: "A", onset: 20, dependence: "stim_redose",
    notes: "Doctor/street-speed. Near coke mood, not 2× coke, not 4-MMC. Strength_W1=9828.",
    sources: ["https://psychonautwiki.org/wiki/Amphetamine"] }),
  row({ name: "dextroamphetamine (Dexedrine)", slug: "dexedrine", family: "amphetamine", section: 1, P: 1.35, E: 112, R: 75, D: 270, HalfLife: 400, C: 0.30, A: 0.50, confidence: "A", onset: 25, dependence: "stim_redose",
    notes: "Speed with a doctor voice. E<130. Strength_W1=11340 ≈ coke, not 4-MMC.",
    sources: ["https://erowid.org/pharms/amphetamine/"] }),
  row({ name: "Adderall IR", slug: "adderall-ir", family: "amphetamine", section: 1, P: 1.25, E: 108, R: 76, D: 240, HalfLife: 380, C: 0.32, A: 0.50, confidence: "A", onset: 25, dependence: "stim_redose",
    notes: "Dex-leaning mix. Same doctor-IR band. Strength_W1=10260." }),
  row({ name: "lisdexamfetamine (Vyvanse)", slug: "vyvanse", family: "amphetamine_prodrug", section: 1, P: 0.45, E: 40, R: 12, D: 480, HalfLife: 720, C: 0.20, A: 0.80, confidence: "A", onset: 60, dependence: "stim_functional",
    notes: "Homework / prodrug. Tiny rush. Strength_W1=216 vs coke 10000 vs PVP 437500.",
    sources: ["https://psychonautwiki.org/wiki/Lisdexamfetamine"] }),
  row({ name: "methamphetamine", slug: "methamphetamine", family: "amphetamine", section: 1, P: 2.10, E: 165, R: 200, D: 360, HalfLife: 720, C: 0.80, A: 1.50, confidence: "A", onset: 8, danger: "paranoia", dependence: "stim_binge",
    notes: "Meth band. E below 4-MMC (200). Beats coke on R and D. Strength_W1=69300.",
    sources: ["https://psychonautwiki.org/wiki/Methamphetamine", "https://erowid.org/chemicals/meth/"] }),
  row({ name: "methylphenidate IR (Ritalin)", slug: "methylphenidate-ir", family: "phenidate", section: 1, P: 0.70, E: 48, R: 30, D: 150, HalfLife: 240, C: 0.25, A: 0.45, confidence: "B", onset: 20, dependence: "stim_functional",
    notes: "Dry focus. Homework-adjacent. Strength_W1=1008." }),
  row({ name: "methylphenidate XR (Concerta)", slug: "concerta", family: "phenidate", section: 1, P: 0.35, E: 32, R: 12, D: 480, HalfLife: 700, C: 0.15, A: 0.55, confidence: "A", onset: 45, dependence: "stim_functional",
    notes: "Homework XR. Strength_W1=134." }),

  row({ name: "4-MMC (mephedrone)", slug: "4-mmc", family: "cathinone_mmc", section: 2, P: 1.40, E: 200, R: 160, D: 75, HalfLife: 110, C: 0.70, A: 1.10, confidence: "A", onset: 8, dependence: "cath_redose",
    notes: "4-MMC band. E=200 is a lot more than coke 100 and below locked PVP 250. Strength_W1=44800 (4.5× coke). Enjoyment ≈597 vs coke 200. Greedy redose, not flush-the-bag.",
    sources: ["https://psychonautwiki.org/wiki/Mephedrone", "https://www.reddit.com/r/researchchemicals/comments/6bdhxt/4mmc_vs_cocaine/"] }),
  row({ name: "3-MMC", slug: "3-mmc", family: "cathinone_mmc", section: 2, P: 1.20, E: 145, R: 130, D: 60, HalfLife: 90, C: 0.65, A: 0.80, confidence: "A", onset: 8, dependence: "cath_redose",
    notes: "Step down from 4-MMC. If it lasts till noon it was not this. Strength_W1=22620.",
    sources: ["https://psychonautwiki.org/wiki/3-MMC"] }),
  row({ name: "2-MMC", slug: "2-mmc", family: "cathinone_mmc", section: 2, P: 0.95, E: 110, R: 90, D: 55, HalfLife: 80, C: 0.50, A: 0.55, confidence: "B", onset: 10, dependence: "cath_redose",
    notes: "Colder / thinner. Often the 3-MMC stamp. Strength_W1=9405." }),

  row({ name: "4-CMC (clephedrone)", slug: "4-cmc", family: "cathinone_halogen", section: 3, P: 1.20, E: 140, R: 125, D: 70, HalfLife: 100, C: 0.90, A: 1.30, confidence: "B", onset: 10, danger: "hangover", dependence: "cath_redose",
    notes: "Nastier / less magic than 4-MMC. Strength_W1=21000." }),
  row({ name: "3-CMC", slug: "3-cmc", family: "cathinone_halogen", section: 3, P: 1.15, E: 125, R: 115, D: 65, HalfLife: 95, C: 0.80, A: 1.00, confidence: "B", onset: 10, dependence: "cath_redose",
    notes: "More DA, less hug. Strength_W1=16531." }),
  n("2-CMC", "2-cmc", "cathinone_halogen", 3, "Ortho-chloro barely reported. Labs mix the three chloros."),
  row({ name: "4-FMC (flephedrone)", slug: "4-fmc", family: "cathinone_halogen", section: 3, P: 0.85, E: 70, R: 60, D: 60, HalfLife: 90, C: 0.50, A: 0.60, confidence: "C",
    notes: "Old legal-high leftover. Strength_W1=3570." }),
  n("3-FMC", "3-fmc", "cathinone_halogen", 3, "Positional fluoro. Thin dedicated reports."),
  n("2-FMC", "2-fmc", "cathinone_halogen", 3, "Ortho-fluoro. Almost no feel corpus."),
  n("4-BMC (brephedrone)", "4-bmc", "cathinone_halogen", 3, "Rare vendor dust. Do not invent a 4-MMC-minus-ten."),
  n("3-BMC", "3-bmc", "cathinone_halogen", 3, "Museum bromo. No reliable feel trail."),

  row({ name: "NEP (N-ethylpentedrone)", slug: "nep", family: "cathinone_nalkyl", section: 4, P: 1.50, E: 95, R: 115, D: 210, HalfLife: 480, C: 0.80, A: 1.00, confidence: "A", onset: 6, dependence: "cath_habit",
    notes: "Colder than meow, greedier, longer. Strength_W1=16387.5. Enjoyment ~78 vs 4-MMC ~597.",
    sources: ["https://psychonautwiki.org/wiki/NEP"] }),
  row({ name: "hexen (N-ethylhexedrone)", slug: "hexen", family: "cathinone_nalkyl", section: 4, P: 1.25, E: 70, R: 100, D: 90, HalfLife: 180, C: 1.00, A: 0.90, confidence: "A", onset: 5, dependence: "cath_redose",
    notes: "Diet NEP. First bump is the poem. Strength_W1=8750.",
    sources: ["https://psychonautwiki.org/wiki/N-Ethylhexedrone"] }),
  row({ name: "pentedrone", slug: "pentedrone", family: "cathinone_nalkyl", section: 4, P: 0.90, E: 30, R: 35, D: 120, HalfLife: 200, C: 0.40, A: 0.50, confidence: "B",
    notes: "Cold work stim. Strength_W1=945." }),
  row({ name: "hexedrone", slug: "hexedrone", family: "cathinone_nalkyl", section: 4, P: 0.80, E: 40, R: 35, D: 90, HalfLife: 160, C: 0.35, A: 0.45, confidence: "C",
    notes: "Weaker N-methyl parent of hexen. Strength_W1=1120." }),
  row({ name: "buphedrone", slug: "buphedrone", family: "cathinone_nalkyl", section: 4, P: 0.70, E: 38, R: 32, D: 90, HalfLife: 150, C: 0.30, A: 0.40, confidence: "C",
    notes: "Weaker chain stamp. Strength_W1=851." }),
  row({ name: "NEB (N-ethylbuphedrone)", slug: "neb", family: "cathinone_nalkyl", section: 4, P: 0.85, E: 50, R: 45, D: 100, HalfLife: 170, C: 0.45, A: 0.50, confidence: "C",
    notes: "Gentle, moreish, ceiling. Strength_W1=1912." }),
  row({ name: "4-MEC", slug: "4-mec", family: "cathinone_nalkyl", section: 4, P: 0.85, E: 65, R: 75, D: 40, HalfLife: 80, C: 0.55, A: 0.70, confidence: "B", onset: 5,
    notes: "Diet meow. Short empty spike. Strength_W1=4144." }),
  row({ name: "4-EMC", slug: "4-emc", family: "cathinone_nalkyl", section: 4, P: 1.00, E: 80, R: 75, D: 70, HalfLife: 110, C: 0.50, A: 0.60, confidence: "C",
    notes: "Old-head closest N-alkyl rumor. Thin n. Strength_W1=6000." }),
  row({ name: "3,4-DMMC", slug: "34-dmmc", family: "cathinone_nalkyl", section: 4, P: 0.90, E: 72, R: 65, D: 70, HalfLife: 110, C: 0.45, A: 0.55, confidence: "C",
    notes: "Old headshop leftover. Strength_W1=4212." }),
  row({ name: "4-MPD", slug: "4-mpd", family: "cathinone_nalkyl", section: 4, P: 0.85, E: 35, R: 40, D: 100, HalfLife: 180, C: 0.40, A: 0.50, confidence: "C",
    notes: "Cold work cousin. Strength_W1=1190." }),
  row({ name: "mexedrone", slug: "mexedrone", family: "cathinone_nalkyl", section: 4, P: 0.50, E: 22, R: 18, D: 60, HalfLife: 100, C: 0.20, A: 0.35, confidence: "B",
    notes: "Hyped flop. Strength_W1=198." }),
  ...["3-MEC","2-MEC","4-EEC","3-EEC","4-CEC","3-CEC","4-MEAP"].map(x =>
    n(x, x.toLowerCase(), "cathinone_nalkyl", 4, "N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.")),

  row({ name: "methylone (bk-MDMA)", slug: "methylone", family: "cathinone_md", section: 5, P: 1.00, E: 140, R: 80, D: 90, HalfLife: 150, C: 0.45, A: 0.70, confidence: "A", onset: 15,
    notes: "Short roll. Still on coke wall (cathinone), not MDMA's class-local 100. Strength_W1=11200.",
    sources: ["https://psychonautwiki.org/wiki/Methylone"] }),
  row({ name: "ethylone", slug: "ethylone", family: "cathinone_md", section: 5, P: 0.85, E: 100, R: 65, D: 100, HalfLife: 160, C: 0.40, A: 0.60, confidence: "B",
    notes: "Weaker methylone. Strength_W1=5525." }),
  row({ name: "butylone", slug: "butylone", family: "cathinone_md", section: 5, P: 0.80, E: 88, R: 55, D: 150, HalfLife: 220, C: 0.35, A: 0.55, confidence: "B",
    notes: "Longer, flatter. Strength_W1=3872." }),
  row({ name: "pentylone", slug: "pentylone", family: "cathinone_md", section: 5, P: 1.05, E: 82, R: 72, D: 120, HalfLife: 200, C: 0.50, A: 0.70, confidence: "C",
    notes: "More stim than hug. Strength_W1=6199." }),
  row({ name: "eutylone", slug: "eutylone", family: "cathinone_md", section: 5, P: 1.15, E: 90, R: 85, D: 150, HalfLife: 240, C: 0.55, A: 0.80, confidence: "B",
    notes: "Later wave. More stim than hug. Strength_W1=8798." }),
  row({ name: "ephylone (N-ethylpentylone)", slug: "ephylone", family: "cathinone_md", section: 5, P: 1.30, E: 78, R: 88, D: 180, HalfLife: 280, C: 0.70, A: 1.00, confidence: "B", danger: "OD",
    notes: "Nastier. News-seizure energy. Strength_W1=8923." }),
  row({ name: "dipentylone", slug: "dipentylone", family: "cathinone_md", section: 5, P: 1.00, E: 65, R: 60, D: 120, HalfLife: 200, C: 0.45, A: 0.60, confidence: "C",
    notes: "Weaker than 3-MMC in checking-desk talk. Strength_W1=3900." }),
  row({ name: "methedrone (bk-PMMA)", slug: "methedrone", family: "cathinone_methoxy", section: 6, P: 0.70, E: 35, R: 25, D: 180, HalfLife: 300, C: 0.40, A: 0.80, confidence: "C", danger: "heatstroke",
    notes: "PMMA-adjacent scare. Strength_W1=612.5." }),

  row({ name: "α-PPP", slug: "alpha-ppp", family: "pyro_alpha", section: 7, P: 2.20, E: 150, R: 280, D: 40, HalfLife: 70, C: 1.40, A: 1.20, confidence: "B", onset: 1, dependence: "pyro_slam",
    notes: "Forum slam-only poem. Below locked PVP on P/E/R. Strength_W1=92400." }),
  row({ name: "α-PBP", slug: "alpha-pbp", family: "pyro_alpha", section: 7, P: 2.40, E: 130, R: 160, D: 50, HalfLife: 90, C: 1.00, A: 1.00, confidence: "B", onset: 3, dependence: "pyro_redose",
    notes: "Split bag. Not the mountain. Strength_W1=49920." }),
  row({ name: "α-PVP (flakka)", slug: "alpha-pvp", family: "pyro_alpha", section: 7, P: 5.00, E: 250, R: 350, D: 90, HalfLife: 180, C: 2.50, A: 3.00, confidence: "A", onset: 2, danger: "paranoia", dependence: "pyro_flush",
    notes: "LOCKED ANCHOR 5/250/350. D=90 locked (boxed mix). Strength_W1=437500. Do not nerf P.",
    sources: ["https://psychonautwiki.org/wiki/A-PVP", "https://www.euda.europa.eu/publications/joint-reports/pvp_en"] }),
  row({ name: "α-PHP (PV-7)", slug: "alpha-php", family: "pyro_alpha", section: 7, P: 4.20, E: 220, R: 300, D: 70, HalfLife: 150, C: 2.00, A: 2.20, confidence: "A", onset: 2, dependence: "pyro_vape",
    notes: "Liked pyro. Below locked PVP on all three walls. Strength_W1=277200.",
    sources: ["https://psychonautwiki.org/wiki/A-PHP"] }),
  row({ name: "α-PiHP", slug: "alpha-pihp", family: "pyro_alpha", section: 7, P: 4.40, E: 210, R: 290, D: 60, HalfLife: 140, C: 2.30, A: 2.60, confidence: "A", onset: 2, dependence: "pyro_flush",
    notes: "Diet PVP. Below the lock. Strength_W1=267960." }),
  row({ name: "α-PEP (PV-8)", slug: "alpha-pep", family: "pyro_alpha", section: 7, P: 2.80, E: 145, R: 175, D: 70, HalfLife: 130, C: 1.20, A: 1.40, confidence: "C",
    notes: "Stretched, weaker. Strength_W1=71050." }),
  n("α-POP (PV-9)", "alpha-pop", "pyro_alpha", 7, "Vendor crate. Almost no clean solo feel. Do not invent a slightly weaker PV-8."),
  row({ name: "α-PCYP", slug: "alpha-pcyp", family: "pyro_alpha", section: 7, P: 2.20, E: 60, R: 22, D: 150, HalfLife: 240, C: 0.40, A: 0.50, confidence: "C",
    notes: "DAT said stronger than flakka. The pipe said homework stim. Seized bags are cyclohexyl. Strength_W1=2904." }),

  row({ name: "MDPPP", slug: "mdppp", family: "pyro_md", section: 8, P: 1.80, E: 120, R: 140, D: 40, HalfLife: 80, C: 0.80, A: 0.90, confidence: "C",
    notes: "Short MD. Old heads sometimes liked it more than MDPV (useful). Strength_W1=30240." }),
  row({ name: "MDPBP", slug: "mdpbp", family: "pyro_md", section: 8, P: 2.60, E: 140, R: 165, D: 50, HalfLife: 95, C: 1.10, A: 1.20, confidence: "C",
    notes: "Middle MD. Catalog cousin. Strength_W1=60060." }),
  row({ name: "MDPV", slug: "mdpv", family: "pyro_md", section: 8, P: 4.50, E: 230, R: 310, D: null, HalfLife: null, C: 2.40, A: 2.80, confidence: "A", onset: 3, danger: "paranoia", dependence: "pyro_flush",
    notes: "Ivory Wave. NOT above locked α-PVP (5/250/350). Strength_W1=321525 < 437500. pending duration research, longer than α-PVP. Do not ship D=48.",
    sources: ["https://psychonautwiki.org/wiki/MDPV", "https://www.euda.europa.eu/publications/risk-assessments/mdpv_en"] }),
  row({ name: "MDPHP", slug: "mdphp", family: "pyro_md", section: 8, P: 3.60, E: 185, R: 240, D: 80, HalfLife: 170, C: 1.80, A: 2.00, confidence: "A", onset: 3, dependence: "pyro_redose",
    notes: "Current MD workhorse. Still a pyro, not a roll. Strength_W1=159840." }),
  row({ name: "MDPiHP", slug: "mdpihp", family: "pyro_md", section: 8, P: 3.40, E: 175, R: 225, D: 75, HalfLife: 160, C: 1.70, A: 1.90, confidence: "C",
    notes: "Iso twin of MDPHP. Strength_W1=133875." }),
  row({ name: "MDPEP (MD-PV8)", slug: "mdpep", family: "pyro_md", section: 8, P: 2.50, E: 120, R: 140, D: 80, HalfLife: 150, C: 1.10, A: 1.30, confidence: "C",
    notes: "C7 later wave. Dead-end reviews. Strength_W1=42000." }),
  n("MDPOP (MD-PV9)", "mdpop", "pyro_md", 8, "Catalog hit. No trip-report shelf."),
  n("5-DBFPV (3-desoxy-MDPV)", "5-dbfpv", "pyro_md", 8, "2014 almost-MD. Handful of posts. Do not invent a slightly weaker MDPV."),
  n("2,3-MDPV", "23-mdpv", "pyro_md", 8, "Ring-position isomer bait. Barely a product."),

  row({ name: "4-MePPP (MPPP)", slug: "4-meppp", family: "pyro_4me", section: 9, P: 1.10, E: 60, R: 55, D: 60, HalfLife: 100, C: 0.40, A: 0.45, confidence: "C",
    notes: "Weak German parent-series. Strength_W1=3630." }),
  row({ name: "pyrovalerone (Centroton)", slug: "pyrovalerone", family: "pyro_4me", section: 9, P: 1.60, E: 80, R: 70, D: 90, HalfLife: 150, C: 0.50, A: 0.55, confidence: "C",
    notes: "1960s medicine name. Milder than flakka. Strength_W1=8960." }),
  row({ name: "MPHP (PV-4)", slug: "mphp", family: "pyro_4me", section: 9, P: 2.00, E: 105, R: 115, D: 70, HalfLife: 130, C: 0.80, A: 0.90, confidence: "C",
    notes: "Old Centroton wall. Strength_W1=24150." }),
  n("MPBP", "mpbp", "pyro_4me", 9, "Old catalog cousin. No reliable modern feel chorus."),
  n("MOPPP (4-MeO-α-PPP)", "moppp", "pyro_4me", 9, "Methoxy cousin. Literature leftover."),

  n("naphyrone (NRG-1)", "naphyrone", "pyro_unusual", 10, "Identity trap. Most NRG-1 bags were not naphyrone (often MDPV)."),
  ...[
    ["α-PVT","alpha-pvt","Sulfur-ring odd crate."],
    ["α-PBT","alpha-pbt","Thienyl cousin. Forensic name, not a chorus."],
    ["TH-PVP","th-pvp","Tetralin pyro. Museum shelf."],
    ["5-PPDI","5-ppdi","Indane pyro. Dusty vendor SKU."],
    ["5-BPDI","5-bpdi","Indane pyro. Same dusty shelf."],
    ["4F-α-PVP","4f-alpha-pvp","Fluoro stamp. Not enough H2H to invent a 3-digit E."],
    ["4Cl-α-PVP","4cl-alpha-pvp","Chloro stamp. Forensic, not a ranked night."],
    ["4-Me-α-PVP","4me-alpha-pvp","Name also points at pyrovalerone. Not a second mountain."],
    ["4F-α-PHP","4f-alpha-php","Fluoro PHP. n too thin to interpolate off PHP."],
    ["4F-PV8","4f-pv8","STRIDA copycat. No confident feel table."],
    ["3F-α-PiHP","3f-alpha-pihp","Current isomer stamp. Do not print a 3×4 grid."],
    ["4F-α-PiHP","4f-alpha-pihp","Fluoro PiHP. Seized; feel not triangulated."],
    ["2-Me-α-PiHP","2me-alpha-pihp","Swedish casework isomer. No forum mountain."],
    ["3-Me-α-PiHP","3me-alpha-pihp","Swedish casework isomer. No forum mountain."],
    ["4-Me-α-PiHP","4me-alpha-pihp","Swedish casework isomer. No forum mountain."],
  ].map(([name, slug, why]) => n(name, slug, "pyro_unusual", 10, why)),

  row({ name: "ethylphenidate (EPH)", slug: "ethylphenidate", family: "phenidate", section: 11, P: 1.80, E: 130, R: 180, D: 50, HalfLife: 80, C: 0.90, A: 0.70, confidence: "A", onset: 3, dependence: "stim_redose",
    notes: "Short, fiendish, coke-shaped. Strength_W1=42120.", sources: ["https://psychonautwiki.org/wiki/Ethylphenidate"] }),
  row({ name: "isopropylphenidate (IPPH)", slug: "isopropylphenidate", family: "phenidate", section: 11, P: 1.10, E: 48, R: 20, D: 240, HalfLife: 360, C: 0.20, A: 0.40, confidence: "B",
    notes: "Study-drug winner. Strength_W1=1056." }),
  row({ name: "4F-MPH", slug: "4f-mph", family: "phenidate", section: 11, P: 1.50, E: 65, R: 40, D: 360, HalfLife: 540, C: 0.25, A: 0.55, confidence: "A", onset: 30, dependence: "stim_functional",
    notes: "Focus monster. Strength_W1=3900.", sources: ["https://psychonautwiki.org/wiki/4F-MPH"] }),
  row({ name: "3,4-CTMP", slug: "34-ctmp", family: "phenidate", section: 11, P: 2.80, E: 45, R: 80, D: 360, HalfLife: 600, C: 0.80, A: 1.20, confidence: "B", danger: "too_much",
    notes: "Too much. High P, low E. Strength_W1=10080." }),
  row({ name: "HDMP-28", slug: "hdmp-28", family: "phenidate", section: 11, P: 1.30, E: 62, R: 45, D: 180, HalfLife: 280, C: 0.40, A: 0.50, confidence: "C",
    notes: "Naphthyl phenidate. Strength_W1=3627." }),
  row({ name: "4-Me-TMP", slug: "4-me-tmp", family: "phenidate", section: 11, P: 0.85, E: 46, R: 22, D: 210, HalfLife: 320, C: 0.20, A: 0.40, confidence: "C",
    notes: "Diet Ritalin. Strength_W1=860." }),

  row({ name: "2-FMA", slug: "2-fma", family: "fluoroamp", section: 12, P: 0.70, E: 42, R: 16, D: 390, HalfLife: 600, C: 0.20, A: 0.60, confidence: "A", onset: 30, dependence: "stim_functional",
    notes: "Homework. Vyvanse's street cousin. Strength_W1=470.", sources: ["https://psychonautwiki.org/wiki/2-FMA"] }),
  row({ name: "2-FA", slug: "2-fa", family: "fluoroamp", section: 12, P: 1.10, E: 62, R: 40, D: 150, HalfLife: 240, C: 0.30, A: 0.45, confidence: "B",
    notes: "Impatient 2-FMA. Strength_W1=2728." }),
  row({ name: "3-FA", slug: "3-fa", family: "fluoroamp", section: 12, P: 1.40, E: 108, R: 80, D: 210, HalfLife: 320, C: 0.40, A: 0.50, confidence: "B",
    notes: "Fun fluoro that still lets you type. Strength_W1=12096." }),
  row({ name: "4-FA", slug: "4-fa", family: "fluoroamp", section: 12, P: 1.10, E: 145, R: 70, D: 300, HalfLife: 420, C: 0.50, A: 0.90, confidence: "A", onset: 30,
    notes: "Mild roll + stim. More than coke on E, under 4-MMC. Strength_W1=11165.", sources: ["https://psychonautwiki.org/wiki/4-FA"] }),
  row({ name: "4-FMA", slug: "4-fma", family: "fluoroamp", section: 12, P: 1.15, E: 125, R: 70, D: 360, HalfLife: 500, C: 0.55, A: 0.85, confidence: "B",
    notes: "Heavier 4-FA. Strength_W1=10062." }),

  row({ name: "3-FPM", slug: "3-fpm", family: "phenmetrazine", section: 13, P: 1.20, E: 70, R: 50, D: 180, HalfLife: 280, C: 0.40, A: 0.70, confidence: "B", dependence: "stim_redose",
    notes: "Clean-functional liar. Strength_W1=4200." }),
  row({ name: "4-FPM", slug: "4-fpm", family: "phenmetrazine", section: 13, P: 0.55, E: 32, R: 18, D: 150, HalfLife: 240, C: 0.15, A: 0.30, confidence: "C",
    notes: "Caffeine/nootropic, not 3-FPM. Strength_W1=317." }),
  n("3-CPM", "3-cpm", "phenmetrazine", 13, "Chloro 3-FPM. Detected; trail too thin."),
  row({ name: "4-MAR", slug: "4-mar", family: "aminorex", section: 13, P: 1.90, E: 155, R: 120, D: 720, HalfLife: 960, C: 0.40, A: 0.80, confidence: "B", danger: "pulmonary",
    notes: "U4Euh legend. E below 4-MMC. Long D. Strength_W1=35340." }),
  row({ name: "BZP", slug: "bzp", family: "piperazine", section: 13, P: 0.40, E: 50, R: 35, D: 300, HalfLife: 480, C: 0.30, A: 1.20, confidence: "B",
    notes: "NZ party pill. Hangover is the product. Strength_W1=700." }),

  row({ name: "khat leaf", slug: "khat", family: "khat_parent", section: 14, P: 0.08, E: 30, R: 12, D: 180, HalfLife: 300, C: 0.10, A: 0.20, confidence: "B",
    notes: "Parent of the cathinone wall. Strength_W1=28.8." }),
  row({ name: "modafinil", slug: "modafinil", family: "eugeroic", section: 14, P: 0.22, E: 22, R: 6, D: 480, HalfLife: 720, C: 0.10, A: 0.25, confidence: "B",
    notes: "Wake drug. Strength_W1=29." }),
  row({ name: "dimethocaine", slug: "dimethocaine", family: "coke_mimic", section: 14, P: 0.20, E: 28, R: 22, D: 40, HalfLife: 70, C: 0.30, A: 0.25, confidence: "C",
    notes: "Legal-high coke mimic. Strength_W1=123." }),
  n("Synthacaine (blend)", "synthacaine", "blend", 14, "Brand, not a molecule. Often MPA + 2-AI."),
  n("2-AI", "2-ai", "aminoindane", 14, "Sat in Synthacaine mixes. Thin solo chorus."),

  row({ name: "ketamine", slug: "ketamine", family: "disso_ket", section: 15, wall: DISSO, P: 1.00, E: 100, R: 70, D: 50, HalfLife: 80, C: 0.30, A: 0.50, confidence: "A", onset: 2,
    notes: "CLASS-LOCAL ket wall E=100. Not on the stim Strength ladder.", sources: ["https://psychonautwiki.org/wiki/Ketamine"] }),
  row({ name: "DCK", slug: "dck", family: "disso_ket", section: 15, wall: DISSO, P: 1.30, E: 95, R: 55, D: 150, HalfLife: 240, C: 0.25, A: 0.40, confidence: "B",
    notes: "Ket wall. Longer, cleaner, polite onset." }),
  row({ name: "2F-DCK", slug: "2f-dck", family: "disso_ket", section: 15, wall: DISSO, P: 1.05, E: 82, R: 80, D: 70, HalfLife: 120, C: 0.30, A: 0.45, confidence: "B",
    notes: "Ket clone. Batch lottery." }),
  row({ name: "2F-NENDCK (CanKet)", slug: "2f-nendck", family: "disso_ket", section: 15, wall: DISSO, P: 1.25, E: 78, R: 75, D: 120, HalfLife: 200, C: 0.30, A: 0.45, confidence: "B",
    notes: "Street FXE ≠ this." }),
  row({ name: "FXE (3-FXE, genuine)", slug: "fxe", family: "disso_ket", section: 15, wall: DISSO, P: 1.15, E: 88, R: 72, D: 90, HalfLife: 150, C: 0.30, A: 0.40, confidence: "C",
    notes: "Genuine 3-fluoro. Street bags after ~2022 are usually CanKet." }),
  row({ name: "HXE", slug: "hxe", family: "disso_ket", section: 15, wall: DISSO, P: 0.70, E: 62, R: 35, D: 120, HalfLife: 200, C: 0.20, A: 0.30, confidence: "B",
    notes: "Warm, weak, couch." }),
  row({ name: "NENK", slug: "nenk", family: "disso_ket", section: 15, wall: DISSO, P: 0.80, E: 42, R: 35, D: 90, HalfLife: 150, C: 0.25, A: 0.35, confidence: "C",
    notes: "Old ethketamine. Not O-PCE." }),
  row({ name: "tiletamine", slug: "tiletamine", family: "disso_ket", section: 15, wall: DISSO, P: 1.40, E: 48, R: 95, D: 40, HalfLife: 80, C: 0.40, A: 0.60, confidence: "C",
    notes: "Vet-shelf. Telazol is this plus zolazepam." }),
  n("2-MeO-ketamine", "2-meo-ketamine", "disso_ket", 15, "Boring ortho-MeO. Not MXE.", { wall: DISSO }),
  n("2-BDCK", "2-bdck", "disso_ket", 15, "Bromo-DCK. Rare / rough.", { wall: DISSO }),
  n("street FXE (sticker)", "street-fxe-sticker", "disso_ket", 15, "Identity trap. After ~2022 usually CanKet / 2F-NENDCK.", { wall: DISSO }),

  row({ name: "MXE", slug: "mxe", family: "disso_mxe", section: 16, wall: DISSO, P: 2.20, E: 145, R: 80, D: 180, HalfLife: 300, C: 0.40, A: 0.55, confidence: "A",
    notes: "Ket wall, NOT the pyro ladder. The legend. Do not print above α-PVP.", sources: ["https://psychonautwiki.org/wiki/Methoxetamine"] }),
  row({ name: "DMXE", slug: "dmxe", family: "disso_mxe", section: 16, wall: DISSO, P: 1.70, E: 112, R: 88, D: 150, HalfLife: 250, C: 0.35, A: 0.50, confidence: "B",
    notes: "Closest living cousin. 3-DMXE is this sticker." }),
  n("3-DMXE / 3DMXE (sticker)", "3-dmxe-sticker", "disso_mxe", 16, "Identity trap. 3-DMXE = DMXE branding.", { wall: DISSO }),
  row({ name: "MXPr", slug: "mxpr", family: "disso_mxe", section: 16, wall: DISSO, P: 1.30, E: 68, R: 55, D: 90, HalfLife: 160, C: 0.30, A: 0.40, confidence: "B",
    notes: "The disappointment. Billed as next MXE." }),
  row({ name: "MXiPr", slug: "mxipr", family: "disso_mxe", section: 16, wall: DISSO, P: 1.50, E: 75, R: 62, D: 100, HalfLife: 180, C: 0.35, A: 0.45, confidence: "C",
    notes: "Polarizing." }),
  row({ name: "O-PCE", slug: "o-pce", family: "disso_mxe", section: 16, wall: DISSO, P: 2.60, E: 72, R: 110, D: 90, HalfLife: 180, C: 0.80, A: 0.70, confidence: "A",
    notes: "Scalpel. Air left the room. Little hug." }),

  row({ name: "PCP", slug: "pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 3.20, E: 68, R: 75, D: 300, HalfLife: 600, C: 0.50, A: 0.90, confidence: "A", danger: "mania",
    notes: "Walk-around manic. Long. Class-local." }),
  row({ name: "3-MeO-PCP", slug: "3-meo-pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 5.50, E: 108, R: 85, D: 360, HalfLife: 720, C: 0.60, A: 1.00, confidence: "A", danger: "mania",
    notes: "God-mode. Class-local — P is not vs coke." }),
  row({ name: "3-HO-PCP", slug: "3-ho-pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 6.00, E: 102, R: 65, D: 360, HalfLife: 720, C: 0.45, A: 0.80, confidence: "B",
    notes: "Warm-numb. Still a disso." }),
  row({ name: "3-Me-PCP", slug: "3-me-pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 3.80, E: 82, R: 60, D: 300, HalfLife: 600, C: 0.35, A: 0.60, confidence: "B",
    notes: "Functional. Finish a sentence." }),
  row({ name: "3-Cl-PCP", slug: "3-cl-pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 4.20, E: 72, R: 65, D: 240, HalfLife: 480, C: 0.35, A: 0.55, confidence: "C",
    notes: "Heavy, stoning." }),
  row({ name: "4-MeO-PCP", slug: "4-meo-pcp", family: "disso_pcp", section: 17, wall: DISSO, P: 1.80, E: 52, R: 45, D: 240, HalfLife: 480, C: 0.30, A: 0.50, confidence: "C",
    notes: "First RC PCP. Weaker." }),
  row({ name: "PCE", slug: "pce", family: "disso_pce", section: 17, wall: DISSO, P: 2.80, E: 62, R: 70, D: 240, HalfLife: 480, C: 0.45, A: 0.70, confidence: "C",
    notes: "Older, stimulating." }),
  row({ name: "3-MeO-PCE", slug: "3-meo-pce", family: "disso_pce", section: 17, wall: DISSO, P: 4.50, E: 88, R: 80, D: 240, HalfLife: 500, C: 0.55, A: 0.80, confidence: "B", danger: "mania",
    notes: "Twitchier 3-MeO-PCP cousin." }),
  row({ name: "3-HO-PCE", slug: "3-ho-pce", family: "disso_pce", section: 17, wall: DISSO, P: 5.00, E: 58, R: 45, D: 240, HalfLife: 480, C: 0.30, A: 0.50, confidence: "C",
    notes: "Pure disso, little magic." }),
  n("3-F-PCP", "3-f-pcp", "disso_pcp", 17, "Later fluoro. n too thin.", { wall: DISSO }),
  n("3-MeO-PCPy", "3-meo-pcpy", "disso_pcp", 17, "Pyrrolidine N-swap. Thin vs 3-MeO-PCP.", { wall: DISSO }),
  n("3-Me-PCE", "3-me-pce", "disso_pce", 17, "Later methyl stamp. Vendor-thin.", { wall: DISSO }),
  n("3-MeO-PCMo", "3-meo-pcmo", "disso_pce", 17, "Morpholine. Weak.", { wall: DISSO }),
  n("TCP", "tcp", "disso_pce", 17, "Thiophene leftover. Museum.", { wall: DISSO }),
  n("3,4-MD-PCP", "34-md-pcp", "disso_pce", 17, "MD leftover. Museum.", { wall: DISSO }),

  row({ name: "diphenidine", slug: "diphenidine", family: "disso_diaryl", section: 18, wall: DISSO, P: 1.15, E: 42, R: 35, D: 240, HalfLife: 400, C: 0.35, A: 0.60, confidence: "B",
    notes: "Steep, dumb, long." }),
  row({ name: "ephenidine", slug: "ephenidine", family: "disso_diaryl", section: 18, wall: DISSO, P: 1.30, E: 82, R: 45, D: 300, HalfLife: 480, C: 0.30, A: 0.55, confidence: "B",
    notes: "Cosmic, forced." }),
  row({ name: "MXP", slug: "mxp", family: "disso_diaryl", section: 18, wall: DISSO, P: 0.95, E: 48, R: 32, D: 300, HalfLife: 480, C: 0.25, A: 0.50, confidence: "B",
    notes: "Sold as MXE replacement. Flop." }),
  n("fluorolintane", "fluorolintane", "disso_diaryl", 18, "Rare diaryl. One bottle.", { wall: DISSO }),
  row({ name: "DXM", slug: "dxm", family: "disso_other", section: 18, wall: DISSO, P: 0.12, E: 52, R: 28, D: 240, HalfLife: 400, C: 0.40, A: 0.80, confidence: "A",
    notes: "Cheap platters. Class-local." }),
  row({ name: "nitrous oxide", slug: "nitrous", family: "disso_other", section: 18, wall: DISSO, P: 0.02, E: 38, R: 85, D: 1, HalfLife: 2, C: 0.05, A: 0.10, confidence: "A",
    notes: "Balloons. Huge R, tiny D." }),

  row({ name: "MDMA", slug: "mdma", family: "empathogen", section: 19, wall: EMP, P: 1.00, E: 100, R: 70, D: 210, HalfLife: 360, C: 0.40, A: 0.90, confidence: "A", onset: 30,
    notes: "CLASS-LOCAL MDMA E=100. Not on the stim Strength ladder.", sources: ["https://psychonautwiki.org/wiki/MDMA"] }),
  row({ name: "MDA", slug: "mda", family: "empathogen", section: 19, wall: EMP, P: 1.15, E: 94, R: 52, D: 300, HalfLife: 480, C: 0.35, A: 0.80, confidence: "A",
    notes: "Longer, more visual, less hug." }),
  row({ name: "MDEA", slug: "mdea", family: "empathogen", section: 19, wall: EMP, P: 0.80, E: 58, R: 38, D: 180, HalfLife: 300, C: 0.25, A: 0.50, confidence: "B",
    notes: "Quiet cousin." }),
  row({ name: "5-MAPB", slug: "5-mapb", family: "empathogen", section: 19, wall: EMP, P: 1.05, E: 88, R: 72, D: 180, HalfLife: 300, C: 0.35, A: 0.70, confidence: "A",
    notes: "Closest MDMA copy after the drought." }),
  row({ name: "6-APB", slug: "6-apb", family: "empathogen", section: 19, wall: EMP, P: 1.25, E: 82, R: 38, D: 420, HalfLife: 600, C: 0.30, A: 0.75, confidence: "A",
    notes: "All-night Benzo Fury." }),
  row({ name: "5-APB", slug: "5-apb", family: "empathogen", section: 19, wall: EMP, P: 1.15, E: 78, R: 48, D: 300, HalfLife: 480, C: 0.35, A: 0.70, confidence: "B", danger: "heart",
    notes: "Same hug family, mongier." }),
  row({ name: "MDAI", slug: "mdai", family: "empathogen", section: 19, wall: EMP, P: 0.48, E: 32, R: 14, D: 150, HalfLife: 240, C: 0.15, A: 0.30, confidence: "B",
    notes: "Street: weak mixer." }),
  row({ name: "5-EAPB", slug: "5-eapb", family: "empathogen", section: 19, wall: EMP, P: 0.85, E: 48, R: 32, D: 180, HalfLife: 300, C: 0.25, A: 0.40, confidence: "C",
    notes: "Forum: disappointing." }),
  row({ name: "6-APDB", slug: "6-apdb", family: "empathogen", section: 19, wall: EMP, P: 0.88, E: 52, R: 32, D: 300, HalfLife: 480, C: 0.25, A: 0.45, confidence: "C",
    notes: "Slightly shittier 6-APB." }),
  row({ name: "5-APDB", slug: "5-apdb", family: "empathogen", section: 19, wall: EMP, P: 0.65, E: 38, R: 18, D: 180, HalfLife: 300, C: 0.20, A: 0.35, confidence: "C",
    notes: "Soft, meh." }),
  n("6-MAPB", "6-mapb", "empathogen", 19, "Rare bags. Human file too thin.", { wall: EMP }),
  n("6-EAPB", "6-eapb", "empathogen", 19, "Later stamp. Barely a product.", { wall: EMP }),

  row({ name: "2C-B", slug: "2c-b", family: "psych_2c", section: 20, wall: PE, P: 1.00, E: 100, R: 22, D: 300, HalfLife: 420, C: 0.15, A: 0.30, confidence: "A",
    notes: "CLASS-LOCAL 2C-B E=100. tusi is a color, not this.", sources: ["https://psychonautwiki.org/wiki/2C-B"] }),
  row({ name: "2C-C", slug: "2c-c", family: "psych_2c", section: 20, wall: PE, P: 0.70, E: 78, R: 14, D: 300, HalfLife: 420, C: 0.12, A: 0.25, confidence: "B", notes: "Mellow halogen." }),
  row({ name: "2C-I", slug: "2c-i", family: "psych_2c", section: 20, wall: PE, P: 1.10, E: 94, R: 32, D: 360, HalfLife: 500, C: 0.18, A: 0.35, confidence: "A", notes: "Sharper twin of 2C-B." }),
  row({ name: "2C-E", slug: "2c-e", family: "psych_2c", section: 20, wall: PE, P: 1.35, E: 90, R: 28, D: 480, HalfLife: 640, C: 0.20, A: 0.45, confidence: "A", notes: "Adult 2C." }),
  row({ name: "2C-D", slug: "2c-d", family: "psych_2c", section: 20, wall: PE, P: 0.50, E: 58, R: 14, D: 240, HalfLife: 360, C: 0.10, A: 0.20, confidence: "B", notes: "Training wheels." }),
  row({ name: "2C-P", slug: "2c-p", family: "psych_2c", section: 20, wall: PE, P: 1.90, E: 84, R: 18, D: 720, HalfLife: 960, C: 0.20, A: 0.55, confidence: "A", notes: "Long. Don't start here." }),
  row({ name: "2C-T-2", slug: "2c-t-2", family: "psych_2c", section: 20, wall: PE, P: 1.15, E: 72, R: 18, D: 360, HalfLife: 500, C: 0.20, A: 0.40, confidence: "B", notes: "Sulfur 2C." }),
  row({ name: "2C-T-7", slug: "2c-t-7", family: "psych_2c", section: 20, wall: PE, P: 1.40, E: 78, R: 22, D: 480, HalfLife: 640, C: 0.25, A: 0.50, confidence: "B", danger: "OD", notes: "The scary sulfur." }),
  n("tusi / pink cocaine (color)", "tusi", "mislabel", 20, "Identity trap. A color, usually ketamine ± extras. Not 2C-B. Not cocaine.", { wall: PE }),
  row({ name: "25I-NBOMe", slug: "25i-nbome", family: "nbome", section: 20, wall: NBOME, P: 1.00, E: 100, R: 38, D: 360, HalfLife: 500, C: 0.20, A: 0.40, confidence: "A", danger: "OD",
    notes: "CLASS-LOCAL 25I E=100. Never label as LSD." }),
  row({ name: "25B-NBOMe", slug: "25b-nbome", family: "nbome", section: 20, wall: NBOME, P: 1.08, E: 94, R: 34, D: 360, HalfLife: 500, C: 0.20, A: 0.40, confidence: "B", danger: "OD", notes: "Same blotter fail-state." }),
  row({ name: "25C-NBOMe", slug: "25c-nbome", family: "nbome", section: 20, wall: NBOME, P: 0.88, E: 84, R: 28, D: 300, HalfLife: 420, C: 0.18, A: 0.35, confidence: "B", danger: "OD", notes: "Same three that got the DEA sheet." }),
  row({ name: "DOM (STP)", slug: "dom", family: "dox", section: 20, wall: DOX, P: 1.00, E: 100, R: 18, D: 960, HalfLife: 1440, C: 0.20, A: 0.50, confidence: "A", notes: "CLASS-LOCAL DOM E=100." }),
  row({ name: "DOB", slug: "dob", family: "dox", section: 20, wall: DOX, P: 2.20, E: 94, R: 18, D: 1080, HalfLife: 1600, C: 0.25, A: 0.55, confidence: "B", notes: "Long, mean." }),
  row({ name: "DOI", slug: "doi", family: "dox", section: 20, wall: DOX, P: 1.80, E: 88, R: 18, D: 960, HalfLife: 1440, C: 0.22, A: 0.50, confidence: "B", notes: "Research / blotter cousin." }),
  row({ name: "DOC", slug: "doc", family: "dox", section: 20, wall: DOX, P: 1.70, E: 88, R: 22, D: 720, HalfLife: 1080, C: 0.22, A: 0.50, confidence: "B", notes: "The fourth name that actually got sold." }),
  row({ name: "Bromo-DragonFLY", slug: "bromo-dragonfly", family: "dox", section: 20, wall: DOX, P: 3.50, E: 68, R: 14, D: 1440, HalfLife: 2160, C: 0.30, A: 0.70, confidence: "C", danger: "OD", notes: "One-off scare SKU." }),

  row({ name: "4-AcO-DMT", slug: "4-aco-dmt", family: "tryptamine", section: 21, wall: TRYPT, P: 1.00, E: 100, R: 18, D: 300, HalfLife: 420, C: 0.15, A: 0.30, confidence: "A", notes: "CLASS-LOCAL oral tryptamine E=100." }),
  row({ name: "4-HO-MET", slug: "4-ho-met", family: "tryptamine", section: 21, wall: TRYPT, P: 1.05, E: 94, R: 22, D: 240, HalfLife: 360, C: 0.12, A: 0.25, confidence: "A", notes: "Playful." }),
  row({ name: "4-HO-MiPT", slug: "4-ho-mipt", family: "tryptamine", section: 21, wall: TRYPT, P: 0.95, E: 88, R: 18, D: 240, HalfLife: 360, C: 0.12, A: 0.25, confidence: "B", notes: "Same family." }),
  row({ name: "5-MeO-MiPT", slug: "5-meo-mipt", family: "tryptamine", section: 21, wall: TRYPT, P: 1.40, E: 82, R: 28, D: 240, HalfLife: 360, C: 0.18, A: 0.35, confidence: "B", notes: "Body-heavy." }),
  row({ name: "5-MeO-DMT", slug: "5-meo-dmt", family: "tryptamine", section: 21, wall: TRYPT, P: 6.00, E: 78, R: 90, D: 15, HalfLife: 25, C: 0.20, A: 0.40, confidence: "A", danger: "freakout", notes: "Fast, heavy." }),
  row({ name: "DMT", slug: "dmt", family: "tryptamine", section: 21, wall: TRYPT, P: 5.00, E: 88, R: 95, D: 8, HalfLife: 12, C: 0.10, A: 0.20, confidence: "A", notes: "Short bang. Class-local." }),

  row({ name: "LSD", slug: "lsd", family: "lysergamide", section: 22, wall: LYS, P: 1.00, E: 100, R: 12, D: 540, HalfLife: 720, C: 0.10, A: 0.35, confidence: "A",
    notes: "CLASS-LOCAL LSD E=100. Not a stim.", sources: ["https://psychonautwiki.org/wiki/LSD"] }),
  row({ name: "1P-LSD", slug: "1p-lsd", family: "lysergamide", section: 22, wall: LYS, P: 0.80, E: 98, R: 12, D: 540, HalfLife: 720, C: 0.10, A: 0.35, confidence: "A", notes: "RC-door prodrug of LSD." }),
  row({ name: "1cP-LSD", slug: "1cp-lsd", family: "lysergamide", section: 22, wall: LYS, P: 0.82, E: 98, R: 12, D: 540, HalfLife: 720, C: 0.10, A: 0.35, confidence: "A", notes: "Same movie as LSD." }),
  row({ name: "ALD-52", slug: "ald-52", family: "lysergamide", section: 22, wall: LYS, P: 0.88, E: 98, R: 12, D: 540, HalfLife: 720, C: 0.10, A: 0.35, confidence: "B", notes: "1-acyl prodrug of LSD. Orange Sunshine was not this." }),
  row({ name: "AL-LAD", slug: "al-lad", family: "lysergamide", section: 22, wall: LYS, P: 0.70, E: 90, R: 18, D: 420, HalfLife: 600, C: 0.10, A: 0.30, confidence: "B", notes: "Warmer / shorter rumor. Not a 1-acyl clone." }),
  row({ name: "ETH-LAD", slug: "eth-lad", family: "lysergamide", section: 22, wall: LYS, P: 1.15, E: 94, R: 18, D: 480, HalfLife: 660, C: 0.12, A: 0.35, confidence: "B", notes: "Heavier analogue, not an LSD clone." }),
  n("Orange Sunshine (alias)", "orange-sunshine", "lysergamide", 22, "Identity trap. Orange Sunshine = LSD.", { wall: LYS }),
];

function fmt(v) {
  if (v == null) return "—";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  return String(v);
}

const scored = rows.filter(r => !r.placeholder);
const nulls = rows.filter(r => r.placeholder);

const jsonRows = rows.map(({ section, ...rest }) => rest);
fs.writeFileSync(path.join(OUT, "GAMEPLAY_STATS_A.json"), JSON.stringify(jsonRows, null, 2) + "\n");

const lines = [
  "# GAMEPLAY_STATS_A — Maker A GameplayProfile",
  "",
  "All numbers are `gameplay_estimate`. Not science. Not a dose table. Not engine code.",
  "Spec: [`GAMEPLAY_RESPONSE.md`](GAMEPLAY_RESPONSE.md). Equations are the epsilon-safe lock.",
  "Do not compare class-local Strength (disso / psych / empathogen / lysergamide) to α-PVP.",
  "",
  "## Locked anchors",
  "",
  "| Substance | P | E | R | D | Strength_W1 |",
  "|---|---:|---:|---:|---:|---:|",
  "| caffeine | 0.05 | 5 | 5 | 240 | 1.25 |",
  "| cocaine | 1.00 | 100 | 100 | 50 | 10000 |",
  "| α-PVP | 5.00 | 250 | 350 | 90 | 437500 |",
  "",
  "## Calibration (Maker A)",
  "",
  "- Band first, then P/E/R/D relative to the three anchors.",
  "- 4-MMC Strength_W1 = 44800 (4.5× coke). E=200 sits between coke 100 and locked PVP 250.",
  "- Homework Strength stays homework (Vyvanse 216, 2-FMA 470, Concerta 134).",
  "- MDPV / α-PPP sit below α-PVP on P, E, and R.",
  "- **MDPV Duration is null** — pending duration research, longer than α-PVP. Do not ship 48.",
  "- Thin SKUs are null. No structure-inferred walls.",
  "- HalfLife ≠ Duration. C/A are Satisfaction penalties only.",
  "",
  `**Counts:** ${rows.length} rows · **${scored.length} scored** · **${nulls.length} null/placeholder**`,
  "",
];

for (let sec = 1; sec <= 22; sec++) {
  const chunk = rows.filter(r => r.section === sec);
  if (!chunk.length) continue;
  lines.push(`## ${sec}. ${SECTIONS[sec]}`, "");
  if (sec >= 15) lines.push("_Class-local wall. Strength_W1 is not on the stim ladder._", "");
  lines.push("| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|");
  for (const r of chunk) {
    let note = r.notes.replace(/^gameplay_estimate\. /, "");
    if (note.length > 140) note = note.slice(0, 137) + "...";
    lines.push(`| ${r.name} | ${fmt(r.P)} | ${fmt(r.E)} | ${fmt(r.R)} | ${fmt(r.D)} | ${fmt(r.HalfLife)} | ${fmt(r.C)} | ${fmt(r.A)} | ${fmt(r.Strength_W1)} | ${r.confidence} | ${note} |`);
  }
  lines.push("");
}

lines.push("## NULL / thin list", "");
for (const r of nulls) {
  lines.push(`- **${r.name}** (\`${r.slug}\`): ${r.notes.replace(/^gameplay_estimate\. /, "")}`);
}
lines.push("");
lines.push("## Headliner Strength_W1 (stim wall)", "");
const want = ["caffeine","amphetamine","dexedrine","vyvanse","cocaine","methamphetamine","4-mmc","3-mmc","nep","hexen","alpha-ppp","alpha-pvp","alpha-php","alpha-pihp","mdpv","mdphp","ethylphenidate","4-fa","2-fma","4f-mph"];
const by = Object.fromEntries(rows.map(r => [r.slug, r]));
lines.push("| SKU | P | E | R | D | Strength_W1 |");
lines.push("|---|---:|---:|---:|---:|---:|");
for (const slug of want) {
  const r = by[slug];
  lines.push(`| ${r.name} | ${fmt(r.P)} | ${fmt(r.E)} | ${fmt(r.R)} | ${fmt(r.D)} | ${fmt(r.Strength_W1)} |`);
}
lines.push("");

fs.writeFileSync(path.join(OUT, "GAMEPLAY_STATS_A.md"), lines.join("\n"));
console.log("scored", scored.length, "null", nulls.length, "total", rows.length);
const mdpv = by.mdpv;
console.log("MDPV D", mdpv.D, "note", mdpv.notes.includes("pending duration research"));
