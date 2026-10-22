# Assignments 18–20 — phenethylamine psychedelics

Game catalog research for Bellhaven / TrapRaiders. **Not a cookbook.**

- No recipes, precursors, yields, glassware, or how-to doses.
- Duration is published-range folklore for designers (short night / long night / multi-day), not a protocol.
- Scores are **0–100 or unknown**. Unknown stays `null`. Do not invent a 50.
- **Enjoyment / euphoria first.** Rush is usually N/A on these. Compulsiveness is usually low — do not invent pyro-style redose.
- **Headliner** = UI / NPC-named SKU. Everything else is researched and marked museum / gray crate.
- Receptor nM is **not** a trip. Especially on NBOMe.

Families owned here: **2C**, **N-benzyl PEAs (NBOMe / NBOH / NBF / NBMD / NB)**, **DOx + Aleph + benzodifurans + long psychedelic amps**.

Not owned: tryptamines, lysergamides, MDMA/MDA rolls, APB/MAPB benzofuran empathogens (5/6-APB are a different kit).

---

## How to read a card

| Field | Meaning |
|---|---|
| Status | `well_documented` / `moderately_documented` / `limited_evidence` / `chemical_literature_only` / `identity_uncertain` / `alias_duplicate` |
| Market | `street` / `rc_era` / `literature_only` / `uncertain` |
| Headliner | `true` = ship in UI. `false` = catalog only. |
| The hit | Enjoyment, euphoria, rush, compulsiveness — each scored independently |
| The bill | Negatives **under** the hit. Still scored. Do not average a bad morning into a weak night. |

### Psychedelic calibration (this subclass only)

| Anchor | Enjoyment | Euphoria | Rush | Compulsiveness |
|---|---|---|---|---|
| 2C-B (festival star) | ~80 | ~74 | null | ~18 |
| 2C-E (heavier 2C) | ~72 | ~68 | null | ~14 |
| 25I-NBOMe (blotter crime) | ~58 | ~52 | ~35 onset slam, not a pleasure rush | ~16 |
| DOM / STP (too long) | ~62 | ~58 | null | ~10 |
| Bromo-DragonFLY | ~55 | ~50 | null | ~8 |
| Literature-only ligand | null | null | null | null |

Rush on oral 2C / DOx is **not a rush**. Come-up is a slow lift, often body-load first. Score `null` unless people actually describe a hit. NBOMe insufflation can slam — that is onset salience, not α-PVP poetry.

Compulsiveness stays low unless reports say they could not stop. Festival 2C-B redose is "another bump because the night is still going," not a binge demon. Rodent self-admin on 2C-C / 2C-P / some NBOMe is **not** human fiending. Do not promote those papers into high redose scores.

---

# 18 — 2C family

2,5-dimethoxy-4-substituted phenethylamines. Shulgin coined "2C" for the two-carbon chain (not the three-carbon DOx amps). Most are 5-HT2A partial agonists, weak or inactive as monoamine releasers. PiHKAL is the parent text; later Trachsel / Shulgin Index / forensic papers add names. **UI still ships eight.** Research lists every substantiated one.

**Tusi / tuci is not 2C-B.** Pink cocktail (ketamine + MDMA + stim + dye). NPCs who ask for "tusi" are asking for a color.

---

## Headliners

### 2C-B (Nexus, Erox, Venus, Bromo, Spectrum, "the real one")

Status: well_documented · Market: street · Headliner: **true**

Headline: **Tactile candy. The star. Also the name they stamp on pink powder that isn't this.**

#### The hit

- **Enjoyment 80 (A)** — The 2C people actually finish happy. Color, touch, music, still able to talk. González 2015 / Mallaroni 2023 are rare human lab data; they match the festival myth.
- **Euphoria 74 (A)** — Warm body + lift, not MDMA hug, not LSD metaphysics. Entactogen-ish in some reports, mixed in others. Do not score it as a roll.
- **Rush null (A)** — Oral come-up is a climb. Nobody writes rush poems.
- **Compulsiveness 18 (B)** — People redose because the night is good, not because they cannot put the bag down. Low.

#### The bill

Nausea on the climb. Jaw, heat, overwhelm if they treat it like a stim. GI is the old psychotherapy dropout reason. MAOI rumor: it can get ugly — flag `interaction`, not a recipe. Aftereffects usually a tired morning, not a pyro crater.

NPC line: *"If they say tusi, check the color. If they say 2C-B, that's the one the old heads actually liked."*

Sources: Shulgin & Carter 1975; PiHKAL; González et al. 2015; Mallaroni et al. 2023; Caudevilla-Gálligo 2012; Dean et al. 2013 J Med Toxicol; US DOJ Nexus bulletin; Rickli/Luethi 5-HT2 profiles.

Gaps: Human PK half-life still thin. "Aphrodisiac" Erox marketing is lore, not a trial.

---

### 2C-C (4-chloro)

Status: well_documented · Market: rc_era · Headliner: **true**

Headline: **2C-B's softer halogen twin. Same party, less voltage.**

#### The hit

- **Enjoyment 70 (B)** · **Euphoria 64 (B)** · **Rush null** · **Compulsiveness 14 (C)**
- Mellow, warm, less sparkle than B. The "I wanted 2C-B and got the quiet one" crate.

#### The bill

Body load still there. Rodent CPP/self-admin exists (Kim 2021) — **do not** turn that into street compulsiveness. Human reports are not binge stories.

NPC line: *"Softer halogen. Fine if you wanted a couch, rude if you wanted 2C-B."*

Sources: PiHKAL; Eshleman 2014; Rickli 2015; Kim 2021 Arch Toxicol (rodent only).

---

### 2C-D (LE-25, DMM-PEA, 2C-M)

Status: well_documented · Market: rc_era · Headliner: **true**

Headline: **Training wheels. Leuner's therapy molecule. Light, short, nobody writes poems.**

#### The hit

- **Enjoyment 58 (B)** · **Euphoria 52 (B)** · **Rush null** · **Compulsiveness 10 (B)**
- Sensory brightener more than a voyage. Hanscarl Leuner ran it as low-dose psycholytic adjunct (LE-25). Lemaire "smart drug" lore is a side quest.

#### The bill

Underwhelming if they paid for 2C-B. Short. Easy to call it "weak" and then overshoot — that's expectation, not a redose demon.

NPC line: *"Starter 2C. You will not tell this story in ten years."*

Sources: Ho 1970; Shulgin 1975; PiHKAL; Schlichting / Leuner psycholytic notes; Passie 2022/2024 history.

---

### 2C-E (Europa)

Status: well_documented · Market: street / rc_era · Headliner: **true**

Headline: **Adult 2C. Heavier head. Not a party favor.**

#### The hit

- **Enjoyment 72 (B)** · **Euphoria 68 (B)** · **Rush null** · **Compulsiveness 14 (B)**
- Deeper than B. More thought, more visual, less candy. People who love it call it the real 2C. People who wanted a rave call it a mistake.

#### The bill

`freakout` flag. Longer night. Rare serious tox in the media pile (Dean 2013) — do not treat as NBOMe-tier, do not treat as harmless. Body load, anxiety if they came for Nexus.

NPC line: *"If 2C-B is candy, this is dinner. Don't serve it as candy."*

Sources: PiHKAL; Dean 2013; Eshleman 2014; Erowid/Bluelight consensus.

---

### 2C-I (4-iodo)

Status: well_documented · Market: rc_era · Headliner: **true**

Headline: **2C-B's sharper twin. Clearer, more stim, the 2000s RC door.**

#### The hit

- **Enjoyment 73 (B)** · **Euphoria 66 (B)** · **Rush null** · **Compulsiveness 16 (B)**
- Cleaner lines, a bit more push. The one that sat next to 2C-B on every early-web vendor sheet.

#### The bill

Stim-edge anxiety. Parent of 25I-NBOMe — NPCs mix the names. The 2C is not the N-bomb.

NPC line: *"Sharper B. Also the molecule they N-benzylated into the blotter that kills."*

Sources: Braun/Shulgin 1977; PiHKAL; EMCDDA 2C-I risk assessment 2003; Rickli 2015.

---

### 2C-P (4-propyl)

Status: well_documented · Market: rc_era · Headliner: **true**

Headline: **Don't start here. The long 2C people warn about.**

#### The hit

- **Enjoyment 68 (B)** · **Euphoria 64 (B)** · **Rush null** · **Compulsiveness 12 (B)**
- Heavy, visual, stretched. The enjoyment is real for people who wanted a long voyage. It is a bad first 2C.

#### The bill

`freakout`. Duration hang. Sold-as-2C-B hospital story exists (severe hallucinations, agitation). Rodent "abuse potential" paper (Kim 2021) again — not a street binge.

NPC line: *"The long one. If they look surprised at sunrise, it was P."*

Sources: PiHKAL; Dean 2013; Kim 2021; forum duration consensus.

---

### 2C-T-2 (4-ethylthio)

Status: well_documented · Market: rc_era · Headliner: **true**

Headline: **Sulfur 2C that actually got sold. Warmer, weirder, still a night.**

#### The hit

- **Enjoyment 70 (B)** · **Euphoria 66 (B)** · **Rush null** · **Compulsiveness 14 (B)**
- The friendly sulfur. Color + body, a little alien, not the scary T.

#### The bill

Sulfur smell jokes. Nausea. Not T-7's reputation, do not steal T-7's body count.

NPC line: *"The sulfur they shipped. T-7 is the other one."*

Sources: PiHKAL; Luethi 2018 2C-T receptor paper; 1990s–2000s RC catalogs / EMCDDA mentions.

---

### 2C-T-7 (Blue Mystic, 7th Heaven, 4-propylthio)

Status: well_documented · Market: street / rc_era · Headliner: **true**

Headline: **The sulfur one with a body count. Beautiful until it isn't.**

#### The hit

- **Enjoyment 71 (B)** · **Euphoria 68 (B)** · **Rush null** · **Compulsiveness 12 (B)**
- People who survived a clean oral night call it lush, visual, long. That is the hit. The bill is why it is famous.

#### The bill

**`OD` flag.** Early-2000s deaths clustered on **snort** in the media table (Dean 2013). Agitation, violence, pulmonary edema, arrest. Oral folklore is "heavy but doable"; do not turn that into a how-to. Just: snort is the fail-state in NPC myth (`snort_fail`). Duration hang. Cross-tol with other 2C/DOx.

NPC line: *"Two sulfur names. T-2 is a night. T-7 is a headline."*

Sources: PiHKAL; Dean 2013 Table 2; Theobald/Maurer MAO metabolism; Luethi 2018; Erowid death reports.

Gaps: How much of the death cluster is identity / poly-drug / route vs molecule is still messy. Do not invent an LD.

---

## Other documented 2C (not UI)

Compact cards. Same rules. Headliner **false**.

### 2C-T (4-methylthio, 2C-T-1)

Status: moderately_documented · Market: literature_only / early experiment · Headliner: false

Headline: **Parent sulfur. Weak, short, museum.**

Enjoyment 48 (C) · Euphoria 44 (C) · Rush null · Compulsiveness 8 (C)

Shulgin's first sulfur 2C. Needs more material, gives less night. Keep on the T-wall so T-2/T-7 have a parent.

NPC: *"The T before the famous T."*

### 2C-T-4 (4-isopropylthio)

Status: moderately_documented · Market: rc_era (thin) · Headliner: false

Headline: **Longer sulfur. A few bags, not a scene.**

Enjoyment 60 (C) · Euphoria 56 (C) · Rush null · Compulsiveness 10 (C)

PiHKAL long-night sulfur. Some early-web mention. Not T-7 famous.

### 2C-T-21 (4-fluoroethylthio)

Status: moderately_documented · Market: rc_era (rare) · Headliner: false

Headline: **Fluoro-sulfur. One ugly media death. Still not a wall.**

Enjoyment 58 (D) · Euphoria 54 (D) · Rush null · Compulsiveness 8 (D)

`OD` rumor from a single "tipped the tongue in the powder" story (Dean 2013). Sparse human feel. Do not build a kit on one headline.

### 2C-N (4-nitro)

Status: moderately_documented · Market: rc_era (thin) · Headliner: false

Headline: **Nitro, weak, forgotten.**

Enjoyment 42 (C) · Euphoria 38 (C) · Rush null · Compulsiveness 6 (C)

Needs a lot, gives a little. Parent of 25N-NBOMe, which is a different crime.

### 2C-F (4-fluoro)

Status: limited_evidence · Market: literature_only · Headliner: false

Headline: **The fluoro that barely works.**

Enjoyment null · Euphoria null · Rush null · Compulsiveness null

PiHKAL: threshold-ish even high. Do not invent a feel.

### 2C-H (2,5-DMPEA)

Status: moderately_documented · Market: literature_only · Headliner: false

Headline: **The blank 2C. Not a trip. The scaffold.**

Enjoyment ~5 (C) if any · Euphoria null · Rush null · Compulsiveness 0 (C)

Unsubstituted 4-position. Weak 5-HT2A. Treat as chemistry, not SKU.

### 2C-O / 2C-O-1 (2,4,5-TMPEA)

Status: moderately_documented · Market: literature_only · Headliner: false

Headline: **Mescaline's isomer. 1931 maybe; later, probably nothing.**

Enjoyment null · Euphoria null

Jansen 1931 said mescaline-like; 1960s–70s follow-ups said inactive. Identity of the old positive is shaky. Museum paradox, not a product.

### 2C-O-4 (4-isopropoxy)

Status: limited_evidence · Market: literature_only · Headliner: false

Headline: **PiHKAL dead end. No trip worth a bag.**

All hit scores null.

### 2C-G / 2C-G-3 / 2C-G-4 / 2C-G-5 / 2C-G-N

Status: moderately_documented (G, G-3, G-5, G-N) / limited (G-4) · Market: literature_only · Headliner: false

Headline: **The long 2Cs. Eighteen to forty-eight hours in the book. Nobody packs this for a club.**

Enjoyment 55–65 (C) where Shulgin notes exist · Rush null · Compulsiveness 6 (C)

Ganesha's phenethylamine cousins. Duration is the mechanic. G-5 is the "still high tomorrow" joke.

### 2C-Se (4-methylseleno)

Status: limited_evidence · Market: literature_only · Headliner: false

Headline: **Selenium 2C. One chapter. Do not stock selenium.**

Scores mostly null. PiHKAL curiosity.

### 2C-iP (4-isopropyl)

Status: limited_evidence · Market: rc_era (late, thin) · Headliner: false

Headline: **Isopropyl 2C. Named, barely bagged.**

Enjoyment 60 (D) · others low-confidence. PsychonautWiki-era reports exist; identity often untested.

### 2C-EF / 2C-TFM / 2C-TFE / 2C-YN / 2C-V / 2C-AL / 2C-CN / 2C-CP / 2C-Bu / 2C-iBu / 2C-tBu / 2C-Ph

Status: limited_evidence or chemical_literature_only · Market: literature_only (a couple RC whispers on EF/TFM/iP) · Headliner: false

Headline: **Later alkyl / haloalkyl / unsaturated stamps. Trachsel and the Index named them. Streets mostly did not.**

Hit scores **null** unless a named trip report exists — and even then confidence D. 2C-TFM is the potent trifluoromethyl rumor; still not a headliner. 2C-iBu (anti-inflammatory research / Eleusis-adjacent) is a pharma side-quest, not a bag.

### Later sulfur 2C-T-3, T-8, T-9, T-13, T-15, T-16, T-17, T-19, T-21.5, T-22, T-25, T-27, T-28, T-30, T-36 (CYB210010)

Status: PiHKAL ones moderately_documented; Trachsel/Cybin mostly chemical_literature_only · Headliner: false

Headline: **Shulgin's sulfur symphony. Two got famous. The rest are sheet music.**

T-8/T-9/T-13/T-15/T-17 have PiHKAL notes (long, often underwhelming or heavy). T-16 and the fluoroethyls are Trachsel chemistry first. T-36 / CYB210010 is a 2024 5-HT2 agonist paper (Varty et al.), not a street drug.

Skip Wikipedia rows with empty substituents and no paper (T-5, T-6, T-10–12, T-14, T-18, T-23, T-24, etc.). Those are **unverified numbering**, not compounds.

### βk-2C-B (bk-2C-B)

Status: moderately_documented · Market: rc_era · Headliner: false

Headline: **2C-B with a ketone. Vendor pellets. Flatter night.**

Enjoyment 48 (C) · Euphoria 42 (C) · Rush null · Compulsiveness 12 (C)

Power et al. 2015 test-purchased it off the internet. Cathinone-shaped 2C. Reports: longer come-up, less magic than B, more body. Do not score it as mephedrone — it is still trying to be a 2C.

### βk-2C-I

Status: limited_evidence · Market: uncertain · Headliner: false

Headline: **Iodo twin of the ketone. Name exists. Feel does not.**

All hit scores null.

### HOT-2 / HOT-7 / HOT-17 (N-hydroxy 2C-T)

Status: limited_evidence · Market: literature_only · Headliner: false

Headline: **Shulgin N-OH sulfur. Book, not a bag.**

PiHKAL entries. Do not invent street feel.

### N-methyl-2C-B / N-ethyl-2C-B / β-methyl-2C-B (BMB)

Status: chemical_literature_only / limited · Headliner: false

Headline: **N-alkyl 2C-B usually kills the trip. That's why NBOMe was a shock.**

Beatrice-logic: small N-alkyl on PEA psychedelics flattens them. Scores null. 25B-NB (plain N-benzyl) is assignment 19.

### psi-2C-T-4 (2,6-dimethoxy)

Status: limited_evidence · Market: literature_only · Headliner: false

Headline: **Wrong methoxy pattern. Shulgin footnote.**

---

# 19 — NBOMe / NBOH / N-benzyl PEAs

N-benzyl 2C. Heim / Elz / Pertz / Nichols lab ligands that leaked onto blotter ~2010–2014. **25I / 25B / 25C are the DEA "N-bomb / Smiles" sheet.** Microgram-scale. Often sold as LSD.

## Receptor data ≠ a trip

Keep these in different drawers.

| Drawer | What it is | What it is not |
|---|---|---|
| Receptor | Sub-nM / low-nM 5-HT2A affinity, high 2A/2C selectivity vs parent 2C (Rickli 2015; Eshleman 2018; Hansen 2014; Heim 2003) | Enjoyment, safety, "more visual" |
| Rodent | Head-twitch, some DAT phosphorylation / CPP on 25B/25D/25E/25H/25N | Human compulsiveness |
| Human | Forum trips + ED clusters + deaths. **No clinical pharmacology as of ~2020** (Jenkins/Gates) | A dose table |

NBOMes are generally **not orally reliable** (first-pass). Blotter / buccal / insufflation is the street fact. Metallic / numb tongue is the LSD discriminant. Bitter blotter. LSD is not.

**`OD` + `sold_as_lsd` on the whole headliner trio.** Users who "know acid" have a false sense of security (Lipow 2022; Zawilska 2020). Seizures, hyperthermia, agitation, rhabdo, kidney injury, excited delirium, suicide/self-harm under the drug. 5-HT2B valvulopathy is a chronic-use *in vitro* worry, not a party anecdote — don't pretend we have a human series.

Compulsiveness stays **low** in humans. People do not N-bomb all weekend like pyros. They take a tab they think is acid and go to the hospital. Rodent "reward" papers stay in the receptor drawer.

---

## Headliners

### 25I-NBOMe (N-bomb, Smiles, Cimbi-5, 2C-I-NBOMe)

Status: well_documented · Market: street (blotter) · Headliner: **true**

Headline: **Never label as LSD. Blotter that can kill. Metallic tongue is the tell.**

#### The hit

- **Enjoyment 58 (B)** — Visuals can be huge. Some reports are glowing, synesthetic, "this is stronger acid." Others are body-load hell with pretty lights. Consistency is the problem (`EuphoriaConsistency` low).
- **Euphoria 52 (B)** — Present when it is a trip and not a medical event. Do not score 20 because of the death pile. The people who liked it, liked the visuals.
- **Rush 35 (C)** — Not a pleasure rush. Insufflated: fast, harsh, slam-into-the-head. Blotter: slower, still ramps harder than LSD.
- **Compulsiveness 16 (B)** — Low. Confusion-redose ("this acid is weak") is a **mislabeled onset**, not fiending.

#### The bill

**`OD` `sold_as_lsd` `seizure` `hyperthermia` `excited_delirium`.** EMCDDA: EU-wide blotter, non-fatal intoxications, deaths. DEA NFLIS peaked ~2014. Vasoconstriction, tachycardia, hypertension. Numb mouth. After: wrecked, sometimes not alive.

NPC line: *"If the tab is bitter and the tongue goes dead, it is not acid. Do not sell it as acid."*

Sources: Heim 2003; Poulie 2020 ACS Chem Neurosci; Zawilska 2020 Front Neurosci; EMCDDA-Europol Joint Report / risk assessment 25I-NBOMe; DEA info sheet; Suzuki/toxicities review PMC4355190; Lawn 2014 J Psychopharmacol; Rickli 2015; NFLIS counts.

Gaps: No controlled human PK. How much of the death rate is mislabel + potency lottery vs intrinsic tox is entangled. Do not invent a percentage.

---

### 25B-NBOMe (Cimbi-36)

Status: well_documented · Market: street (blotter) · Headliner: **true**

Headline: **The other N-bomb. Same blotter crime, same hospital.**

#### The hit

Enjoyment 56 (B) · Euphoria 50 (B) · Rush 32 (C) · Compulsiveness 16 (B)

Bromo twin. Some heads prefer it to I (warmer, less jitter) — thin sample. Cluster poisonings sold as LSD (Clin Toxicol 2022).

#### The bill

Same flags as 25I. Rodent dopamine / CPP (Custodio 2020) stays in the lab drawer.

NPC line: *"B as in bromo, B as in the other tab that wasn't acid."*

---

### 25C-NBOMe (Cimbi-82, Pandora)

Status: well_documented · Market: street (blotter) · Headliner: **true**

Headline: **Same family. Same lie on the blotter. In-vitro tox papers love this one.**

#### The hit

Enjoyment 55 (B) · Euphoria 50 (B) · Rush 32 (C) · Compulsiveness 14 (B)

Bersani 2014 preliminary human-effect summary: hallucinogenic, stimulating, nasty autonomic.

#### The bill

Same `OD` / `sold_as_lsd`. 25C has extra zebrafish / cardiomyocyte / SH-SY5Y cytotoxicity papers — **lab tox, not a ranked street danger table.** Death after 25C+25H (Morini 2017) is a case, not a ranking.

NPC line: *"C is not the safe one. There is no safe one."*

---

## Other N-benzyl with human or forensic ink

| Name | Status | Market | Headliner | Headline | Enjoy | Euph | Rush | Comp | Notes |
|---|---|---|---|---|---|---|---|---|---|
| **25D-NBOMe** | moderately | rc_era | false | Methyl NBOMe. A few bags. Still blotter math. | 50 C | 46 C | 28 D | 12 C | Human dose tables exist in secondary sources; feel poorly separated from I/B/C. |
| **25E-NBOMe** | moderately | rc_era | false | Ethyl NBOMe. Later stamp. | 52 C | 48 C | 28 D | 12 C | Forum + rodent reward paper (Kim 2024). |
| **25H-NBOMe** | limited | rc_era (trace) | false | No 4-sub. Weak cousin. Showed up in mixes. | null | null | null | 10 D | Seen in combo deaths, not a star. |
| **25N-NBOMe** | moderately | rc_era | false | Nitro NBOMe. Named in EU notifications. | 48 D | 44 D | 28 D | 12 C | Seo 2019 rodent DA story. Human feel thin. |
| **25P-NBOMe** | limited | rc_era (thin) | false | Propyl. Long-tail blotter. | 50 D | 46 D | null | 10 D | |
| **25iP-NBOMe** | limited | uncertain | false | Isopropyl name in the EMCDDA analog list. | null | null | null | null | |
| **25T2 / T4 / T7-NBOMe** | limited | rc_era / lit | false | Sulfur NBOMes. Named. Almost no clean trips. | null | null | null | null | Do not inherit T-7's myth automatically. |
| **25F / 25G / 25O / 25T / 25TFM / 25CN-NBOMe** | chemical_literature_only or limited | literature / rare vendor | false | Ligand alphabet. Affinity ≠ bag. | null | null | null | null | |
| **25I-NBOH** | moderately | rc_era | false | Hydroxy cousin. Still blotter. Still not acid. | 54 C | 48 C | 28 D | 14 C | Chile / LatAm blotter mentions; 25I-NBOH metabolism paper (Nielsen 2017). |
| **25B-NBOH / 25C-NBOH** | moderately | rc_era | false | Same hydroxy swap. | 52 C | 46 C | 28 D | 14 C | |
| **25E-NBOH** | limited | forensic | false | Case-report ugly (status epilepticus + other drugs). | null | null | null | null | Pelletier 2024, poly-drug. |
| **25CN-NBOH** | chemical_literature_only | literature | false | Famous as a selective 2A tool. Not a street tab. | null | null | null | null | Receptor drawer only. |
| **25I-NBF / 25B-NBF / 25C-NBF** | limited | rc_era (thin) | false | Fluoro-benzyl. Vendor/forensic names. | null | null | null | 10 D | Weaker rumor than NBOMe. |
| **25x-NBMD (I/B/C/D…)** | chemical_literature_only / limited | literature | false | Methylenedioxy-benzyl ligands. | null | null | null | null | |
| **25B-NB / 25I-NB / 25C-NB** | chemical_literature_only | literature | false | Plain N-benzyl. Glennon 1994. The ancestor, not the product. | null | null | null | null | |
| **2CBFly-NBOMe** | limited | rc_era (rare) | false | NBOMe on the FLY. Nightmare potency rumor. | null | null | null | 8 D | Receptor monster. Human series almost empty. `OD` if it appears. |
| **2CBCB-NBOMe** | chemical_literature_only | literature | false | Rigid cyclobutene NBOMe. Lab. | null | null | null | null | |
| **NBOMe-mescaline / NBOMe-escaline** | chemical_literature_only | literature | false | Heim-era mescaline N-benzyl. | null | null | null | null | |
| **DOM/DOB/DOI-NBOMe** | chemical_literature_only | literature | false | N-benzyl on a DOx. Alpha-methyl usually *hurts* this class. | null | null | null | null | Do not assume they hit like 25x. |
| **C30-NBOMe** | identity_uncertain / limited | designer (rare) | false | Odd 3,4,5-trimethoxy-benzyl. Pharmacology unknown. | null | null | null | null | Wikipedia: appeared as designer, activity unknown. |
| **2C-B-AN** | limited | literature / prodrug talk | false | Cyanobenzyl 2C-B. Elliott 2020 NPS-prodrug paper. | null | null | null | null | Not a fun SKU. |

NB3OMe / NB4OMe positional grids (25B/C/D/E/H/I/N/P/T2/T4/T7/TFM): **chemical_literature_only**. Hansen / Halberstadt SAR. List them in JSON. Do not write feel cards. 3- and 4-methoxybenzyl are the "wrong oxygen" cousins — often much weaker.

Skip from this assignment: N-benzyl **tryptamines** (T-NBOMe, 5-MeO-NBnT), **LSD-NBOMe**, clobenzorex, PEA-NBOMe, 5-APB-NBOMe (wrong family).

---

# 20 — DOx, benzodifurans, long psychedelic amps

Alpha-methyl 2C. Same 2,5-dimethoxy-4-X idea, three-carbon chain. Longer, heavier, more vasoconstrictor myth. **UI: DOM, DOB, DOI, DOC.** Bromo-DragonFLY is a one-off scare SKU.

Duration is the mechanic. A DOx is not a 2C with extra sparkle. It is a 2C that refused to leave.

---

## Headliners

### DOM (STP, 2,5-dimethoxy-4-methylamphetamine)

Status: well_documented · Market: street (historical) · Headliner: **true**

Headline: **STP. The Summer of Love overstayed. Fat tablets lasted into the next life.**

#### The hit

- **Enjoyment 62 (B)** — Real psychedelic, clear phenethylamine head, music, color. Snyder 1967/68 clinical notes exist. People did seek it.
- **Euphoria 58 (B)** — There, not 2C-B candy, not LSD classic. Low-dose "psychic energizer" talk bled over from DOET.
- **Rush null** — Delayed come-up. The danger is people redosing because "nothing happened." That is impatience, not compulsiveness.
- **Compulsiveness 10 (B)** — Low. Nobody STP-binges. They wait, then they are still high on Monday.

#### The bill

`freakout` `duration_trap`. 1967 Haight fat tabs: hospitalizations, tremors, sweat, heart-race, 1–3 day disasters (Baggott 2023; Trout/Daley 2024 origin paper). Owsley/Stanley distribution lore. Side effects nastier than LSD in the old writeups. Not a stimulant; rhesus monkeys would not self-admin (Yanagita 1986).

NPC line: *"Serenity, Tranquility, Peace. The tablet did not read the flyer."*

Sources: Shulgin 1964 bioassay lore; Snyder Science 1967; Snyder Am J Psychiatry 1968; Baggott 2023; Trout & Daley 2024 DTA; PiHKAL; UN Schedule I (STP, DOM).

---

### DOB (brolamfetamine)

Status: well_documented · Market: street / festival vendor · Headliner: **true**

Headline: **Long, heavy, the vasoconstrictor rumor. Festival vendor only.**

#### The hit

Enjoyment 64 (B) · Euphoria 58 (B) · Rush null · Compulsiveness 10 (B)

Deep, visual, stimulant-tinged body. People chase it as "serious." They do not chase it twice in a weekend.

#### The bill

`freakout` `vasoconstriction` `duration_trap`. Very long. Peripheral ischemia stories live more on DragonFLY but DOB wears the same rumor coat. UN Schedule I.

NPC line: *"If they are still patterns at breakfast, it was a DOx. If the hands are cold, they start saying DOB."*

Sources: Shulgin/Sargent/Naranjo 1971; PiHKAL; UN schedules; Hill & Thomas 2011 review.

---

### DOI (2,5-dimethoxy-4-iodoamphetamine)

Status: well_documented (lab) / moderately (street) · Market: literature + rare street · Headliner: **true** (name NPCs know)

Headline: **The lab's favorite. Street rare. Research workhorse.**

#### The hit

Enjoyment 60 (C) · Euphoria 54 (C) · Rush null · Compulsiveness 8 (B)

Human recreational series is thinner than DOM/DOB/DOC. Feel inferred as long DOx: visual, heavy, stimulating. Most of the world's DOI never left a university.

#### The bill

Duration. 5-HT2A tool-compound fame (Glennon/Canal reviews). Anti-inflammatory DOI papers are a side quest, not a product.

NPC line: *"The one in the papers. The bag is usually DOC wearing the name."*

Sources: Coutts 1973; Canal & Morgan 2012; Glennon & Dukat 2024 ACS PTS; PiHKAL.

---

### DOC (4-chloro)

Status: well_documented · Market: rc_era / blotter · Headliner: **true**

Headline: **The DOx that actually got sold after the others got heat.**

#### The hit

Enjoyment 66 (B) · Euphoria 60 (B) · Rush null · Compulsiveness 12 (B)

The 2000s–2010s blotter/powder DOx. Slightly shorter folklore than DOB, still a long night. Clearer than DOM-in-1967 chaos because people knew it was DOC.

#### The bill

`freakout` `duration_trap`. Sometimes sold as acid / DOB. Rodent CPP (Cha 2018) — lab drawer. Vasoconstriction rumor inherited.

NPC line: *"DOC is the one in the envelope. DOI is the one in the PDF."*

Sources: PiHKAL; Erowid/Bluelight DOC era; Cha 2018 Neurosci Lett (rodent); forensic blotter casework.

---

### Bromo-DragonFLY (DOB-DFLY, ABDF)

Status: well_documented (tox) / moderately (fun) · Market: rc_era scare · Headliner: **true** (scare SKU, not a wall)

Headline: **Two days. Delayed come-up. The 2009 crate labeled 2C-B-FLY.**

#### The hit

Enjoyment 55 (C) · Euphoria 50 (C) · Rush null · Compulsiveness 8 (B)

When it is the molecule they meant and the amount is not a death tablet: unique visuals (mescaline-bright + acid-geometry), surprisingly clear head in the pretty reports. Duration is the feature and the curse.

#### The bill

**`OD` `mislabel` `vasoconstriction` `duration_trap`.** Onset can sit for hours — redose trap. Seizures delayed (Wood/Dargan case). Limb ischemia / necrosis / amputation stories. MAO-A inhibition + metabolic stubbornness (2018 tox paper). **2009: material sold as 2C-B-FLY was Bromo-DragonFLY** (Erowid death/hospital cluster). That is the game crate.

NPC line: *"If the bag says FLY and people are still gone on day two, it was the dragon."*

Sources: Erowid 2C-B-FLY 2009 death vault; PMC3550403 delayed seizures; Andreasen DK cases; ScienceDirect 2018 MAO/metabolism; Halberstadt FLY vs DragonFLY behavior paper.

---

## Other DOx and long amps

| Name | Status | Market | Headliner | Headline | Enjoy | Notes |
|---|---|---|---|---|---|---|
| **DOET** (Hecate) | well_documented | literature + tiny street | false | Dow's "psychic energizer." Clinical-ish. Then DOM burned the program. | 60 B | Snyder studied it. Low-dose stimulation-without-trip claim is historical, contested. |
| **DOPR** | moderately | literature | false | Propyl DOx. Longer still. Book, not a scene. | 58 C | PiHKAL long. |
| **DON** | moderately | literature | false | Nitro DOx. Shortest of the famous DOs, still not a 2C. | 52 C | |
| **DOF** | limited | literature | false | Fluoro DOx. Weak. | null | |
| **DOEF** | limited | literature | false | Fluoroethyl. Trachsel. | 55 D | |
| **DOTFM** | limited | literature | false | Trifluoromethyl. Potent-on-paper. | null | Affinity ≠ bag. |
| **2,5-DMA (DOH)** | moderately | literature | false | The unsubstituted parent. Weak, more stim-ish. | 40 C | |
| **DOBU / DOAM / DOiP / DOsB / DOtB / DOHx** | limited / lit | literature | false | Chain-length museum. Bulkier = often less trip, more affinity theater. | null | DOAM high affinity, weak psychedelic — Glennon warning. |
| **Aleph / DOT** | moderately | literature | false | Sulfur DOM. Shorter than DOM in the book. | 58 C | |
| **Aleph-2** | moderately | literature | false | Ethylthio DOx. Shulgin liked this one. | 64 C | The Aleph people remember. |
| **Aleph-4 / Aleph-6 / Aleph-7** | limited–moderate | literature | false | Longer sulfur DOx. Aleph-7 is a thirty-hour threat. | 50–60 D | |
| **TMA-2** | well_documented | historical / rare | false | 2,4,5-trimethoxy amp. Old, real, not a 2C. | 62 B | Shulgin 1964. Ancestor energy. |
| **MEM / MPM** | limited | literature | false | 4-alkoxy DOx. | 48 D | |
| **Ganesha / G-3 / G-5** | moderately | literature | false | Dimethyl-ring DOx. Long. | 58 C | 2C-G's amp cousins. |
| **psi-DOM** | limited | literature | false | 2,6-DOM. Wrong methoxys. | null | |
| **TMA** (3,4,5) | well_documented | historical | false | Alpha-methyl mescaline. 1947–55. Not DOx substitution, still a long psychedelic amp. | 55 B | Hey / Peretz. Include as neighbor, not Kit S. |
| **TMA-6** | limited | literature | false | Another TMA isomer Shulgin tried. | 50 D | |
| **Ariadne (4C-D, dimoxamine)** | moderately | literature / pharma ghost | false | Alpha-ethyl DOM analog. Weirdly functional in lore. | 45 C | Not a party DOx. |
| **Beatrice** (N-methyl-DOM) | limited | literature | false | N-methyl kills it. The lesson NBOMe later broke. | null | |
| **2C-B-FLY** | moderately | rc_era | false | The FLY they meant. Shorter than the dragon. | 68 B | Enjoyment real. The 2009 mislabel is why the crate is cursed. |
| **DOB-FLY** | limited | literature / rare | false | Tetrahydro FLY of DOB. | null | Lab analog. |
| **2C-E-FLY / 2C-I-FLY / 2C-EF-FLY / 2C-T-7-FLY** | chemical_literature_only | literature | false | FLY stamps on other 2C. MAO paper bait. | null | Wagmann/Maurer-type in vitro. |
| **TCB-2** | chemical_literature_only | literature | false | Rigid 2C-B cyclobutene. Tool compound. | null | Not a bag. |
| **TMA-2 / MEM already above** | — | — | — | — | — | — |

3C-E / 3C-P (escaline amps) are historically named long psychedelic amps (PiHKAL). Compact: literature, not Kit S. Do not mix with 2C-B's "3C-B" nickname confusion (people sometimes say 3C-B meaning DOB). **3C-B as a string is identity_uncertain** — resolve to DOB or to 4-bromo-3,5-DMA before shipping a SKU.

---

## Feel comparison (designers)

| SKU | Enjoy | Euph | Rush | Comp | Duration vibe | Fail flag |
|---|---|---|---|---|---|---|
| 2C-B | 80 | 74 | — | 18 | short night | tusi mislabel |
| 2C-C | 70 | 64 | — | 14 | short night | soft |
| 2C-D | 58 | 52 | — | 10 | short | "weak" overshoot |
| 2C-E | 72 | 68 | — | 14 | long night | freakout |
| 2C-I | 73 | 66 | — | 16 | night | name-mix with 25I |
| 2C-P | 68 | 64 | — | 12 | long | freakout |
| 2C-T-2 | 70 | 66 | — | 14 | night | — |
| 2C-T-7 | 71 | 68 | — | 12 | long night | OD / snort_fail |
| 25I-NBOMe | 58 | 52 | 35 | 16 | night | OD sold_as_lsd |
| 25B-NBOMe | 56 | 50 | 32 | 16 | night | OD sold_as_lsd |
| 25C-NBOMe | 55 | 50 | 32 | 14 | night | OD sold_as_lsd |
| DOM | 62 | 58 | — | 10 | 1–3 days if fat | duration_trap |
| DOB | 64 | 58 | — | 10 | very long | vasoconstriction |
| DOI | 60 | 54 | — | 8 | very long | rare bag |
| DOC | 66 | 60 | — | 12 | long | blotter lie |
| Bromo-DragonFLY | 55 | 50 | — | 8 | 2+ days | OD mislabel |
| 2C-B-FLY | 68 | 62 | — | 12 | long night | 2009 mix-up |

---

## Game notes (fictional, separate from research)

- Kit Q mesh: powder / pressed. Eight headliners on the board. Everything else is a gray stamp or a museum crate.
- Kit R mesh: blotter. Only I/B/C face-up. Selling any of them as acid is an NPC-death roll, not a flavor text.
- Kit S mesh: powder / rare blotter. DOM/DOB/DOI/DOC. DragonFLY is a labeled vial with a skull sticker, not a family.
- Tusi uses the **pink pill/powder** mesh and a **lie** tag pointing at 2C-B. Contents are a different assignment.
- Fictional production cost must not be inferred from "2C-P is just one carbon more."

---

## Coverage report

| Bucket | Unique named | Substantial science or multi-source human | Limited / sparse human | Literature-only / ligand | Subjective reports | Human PK | Identity issues |
|---|---|---|---|---|---|---|---|
| **18 2C** | **62** (incl. tusi mislabel record) | 14 | 16 | 31 + 1 alias | ~20 | ~0 measured half-lives (MAO papers ≠ PK) | tusi ≠ 2C-B; empty T-numbers skipped |
| **19 N-benzyl** | **90** | 6 (I/B/C NBOMe + NBOH trio forensic) | 14 | 70 | I/B/C rich; D/E/N/H thin; rest none | none controlled | C30 unknown activity; NB3OMe/NB4OMe grids are SAR-only |
| **20 DOx + FLY + long amps** | **44** | 10 | 14 | 20 | DOM/DOB/DOC/DOET/Aleph-2/TMA-2/2C-B-FLY/BDF | DOM/DOET old clinical, not modern PK | 3C-B name collision; FLY vs DragonFLY; DOI street vs lab |
| **Total this file** | **196** | 30 | 44 | 121 | — | — | — |

Beyond the seed eight 2C + three NBOMe + four DOx: **everything else in this file**.

Duplicates merged: 2C-M = 2C-D; 2C-T-1 = 2C-T; Nexus/Erox/Venus = 2C-B; Cimbi-5 = 25I-NBOMe; Cimbi-36 = 25B-NBOMe; Cimbi-82 = 25C-NBOMe; STP = DOM; brolamfetamine = DOB; DOT = Aleph; 2C-I-NBOMe = 25I-NBOMe.

New vs product_families short lists: the rest of PiHKAL 2C + Trachsel sulfur/alkyl + βk-2C-B + HOT + the NBOMe/NBOH/NBF/NBMD alphabets + Aleph/TMA-2/Ganesha/FLY.

---

## Gaps (do not hide)

1. Almost **no modern human PK** (true half-lives) for 2C / NBOMe / DOx. Duration ≠ elimination.
2. **NBOMe has zero controlled human pharmacology.** Receptor potency cannot rank enjoyment.
3. **2C-C / 2C-P / NBOMe rodent self-admin** must not be laundered into high compulsiveness.
4. **2C-T-7 and DragonFLY death clusters** are real and messy (route, mislabel, poly-drug). No invented lethal threshold.
5. Many **2C-T-xx numbers** on blogs have no published structure — excluded, not filled in.
6. **Tusi** will keep poisoning the 2C-B identity in-world. That is a mislabel flag, not a new molecule.
7. **DOI** is a headliner name and a rare bag. Do not write street lore as if it were 2C-B.
8. Enjoyment scores for anything below the headliner line are **C/D or null**. Sparse trip reports are not a ranking.

---

## Punchiest lines (steal for NPCs)

- 2C-B: *"If they say tusi, check the color."*
- 2C-E: *"If 2C-B is candy, this is dinner."*
- 2C-P: *"Don't start here."*
- 2C-T-7: *"T-2 is a night. T-7 is a headline."*
- 25I-NBOMe: *"Bitter tab, dead tongue — not acid."*
- DOM: *"The tablet did not read the flyer."*
- DOC: *"DOC is in the envelope. DOI is in the PDF."*
- Bromo-DragonFLY: *"If they're still gone on day two, it was the dragon."*
- 2C-B-FLY: *"The FLY they meant. The crate that lied."*
- 2C-H: *"That's the scaffold. Nobody trips on a scaffold."*
