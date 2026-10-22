# 07–10 Non-cathinone stims

Game catalog research. **Not a cookbook.** No recipes. No doses. No injection SOP. No opioids. No cathinones (other agents own those).

Scores are **independent house-x (coke = 10) or null** — same ruler as `CALIBRATION.md` / `FEEL_GRAPH.md`. Amp sits near 8/12/16/12, meth near 28/21/20/30. This file is allowed to sit a point off `07_08` / `09_10`. Rush / euphoria / compulsiveness / enjoyment first, then the bill. Punchy NPC rumor, not a tox lecture. Unknown is `null`, never 0.

Sources mixed: PsychonautWiki, Erowid vaults, Bluelight / first-wave RC reddit, EMCDDA / UNODC / ACMD, NZ party-pill histories, forensic papers (McLaughlin / Brandt / Luethi / Klare / Maier). **Do not invent SKUs that never had a bag.**

`subclass` in the JSON is the family wall: `amphetamine` | `phenidate` | `phenmetrazine` | `aminorex` | `piperazine`. Do not collapse phenmetrazine into aminorex. DOx / TMA sit as `note_only` — named, not profiled.

---

## Coverage report

| Assignment | Family (`subclass`) | Profiled | Thin | Note-only | Total |
|---|---|---:|---:|---:|---:|
| 07 | amphetamine | 21 | 0 | 8 | 29 |
| 08 | phenidate | 14 | 3 | 0 | 17 |
| 09 | phenmetrazine | 5 | 1 | 0 | 6 |
| 09 | aminorex | 8 | 2 | 0 | 10 |
| 10 | piperazine | 7 | 2 | 0 | 9 |
| **all** | | **55** | **8** | **8** | **71** |

Headliner board (what a dealer actually stocks): **amp, meth, 2-FMA, 4-FA, MPH, EPH, 4F-MPH, 3-FPM, 4-MAR, BZP+TFMPP.**

### Punchiest one-liners

- **4-FA** — MDMA for people who have a shift.
- **2-FMA** — Work. Vyvanse's street cousin. Files the report. Does not throw the party.
- **4F-MPH** — Focus monster. Ritalin that files taxes.
- **3-FPM** — The "clean functional" liar. Still wrecks veins and weekends.
- **3,4-CTMP** — Too much. Nobody finishes the bag happy.
- **EPH** — Short, fiendish, burns the nose, empties the bag.
- **BZP** — The party pill. The hangover is the product.
- **meth** — The one every analog is chasing and none of them catch.
- **4-MAR** — Sixteen hours between meth and MDMA. Satisfied, not fiending.
- **2-DPMP** — Ivory Wave. The stim that does not clock out.
- **4,4'-DMAR** — Sold as ecstasy. Buried people.
- **PMA** — The fake Molly that cooks you.

### Gaps (documented absence, not a shopping list)

- **4-CA / 4-BA** — known neurotoxins; almost no recreational market. Not profiled.
- **Halogen phenidate zoo** (4-Br-MPH, 4F-IPH, 4-Me-IPH, 3-Cl-MPH) — Wikipedia analog tables. No reliable bag + review trail.
- **2-CPM / 4-CPM** — forensic isomers of 3-CPM. Not sold as their own SKU.
- **Fluminorex / clominorex** — 1960s McNeil anorectics. No RC revival.
- **oCPP / pCPP** — not a product line; mCPP is the one that showed up in pills.
- **3-MeO-amp as a stim** (not PMA) — no street circulation found.
- **Aminoindanes (2-AI)** — sat on the same tables (MPA + 2-AI = "Synthacaine"). Different backbone; leave to an extras pass.
- **MDA / MDMA / MDEA / APB** — empathogen assignment, not this wall.
- **Cathinones / pyros** — other agents.
- **Thin / null-score:** 2-FPM (lab isomer, not a bag), methylmorphenate, N-benzyl-EPH, 3,4-DCEP, 3,4-DMAR, N-methylaminorex, MDBZP, DBZP. Names confirmed (seizure / vendor / paper). Reviews too thin to invent scores — those stay null. 2-FEA / 4-FEA / 4-FPM / 3-CPM / HDEP-28 are profiled but thinner than the headliners.

---

## How to read a card

Order is the override: **rush → euphoria → compulsiveness → enjoyment**, then the hangover, the heart, the lie.

Flags: `redose` `oral_ok` `work` `focus` `hangover` `caustic` `vein_wreck` `too_much` `long` `heatstroke` `serotonin_tox` `pulmonary` `mislabel` `adulterant` `paranoia` `OD` `freakout`. Route notes are flags only.

---

## 07 Amphetamine / meth / fluoroamps / stim methoxyamps

Parent: speed and ice. Fluoroamps were the legal-high stand-ins. Methoxyamps that are **stims** (PMA / PMMA) sat in fake-ecstasy pills and killed people. Psychedelic DOx are named at the bottom — not profiled.

### Street parents

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **amphetamine** | 9 / 13 / 11 / 17 | The baseline. Talky, grind, paste or pills. Racemic street speed is dirtier and more jitter than pharma dex. | `redose` `oral_ok` | "Everything else is a remix." |
| **dextroamphetamine** | 7 / 12 / 9 / 15 | Cleaner amph. Focus + mood. The prescription people grind into weekend. | `oral_ok` `work` | "Speed with a doctor voice." |
| **methamphetamine** | 27 / 22 / 31 / 19 | The king. Rush that analogs chase. Euphoria that lasts. Compulsion that eats days. | `redose` `paranoia` | "The one every analog is chasing and none of them catch." |
| **lisdexamfetamine** | 2 / 6 / 3 / 10 | Prodrug. Slow, long, functional. Diverted Vyvanse. Almost no rush. | `oral_ok` `work` | "Homework in a capsule." |
| **phentermine** | 2 / 3 / 3 / 4 | Old diet pill. Dry stim, little magic. Pharmacy leftover, not a party. | `oral_ok` | "The doctor called it appetite. The body called it coffee with a record." |
| **N-ethylamphetamine** | 6 / 8 / 6 / 9 | Old analog / some RC presence. Amph-shaped, thinner, less loved. | `oral_ok` | "Amphetamine that stayed an extra carbon and lost the plot." |
| **fenethylline (Captagon)** | 8 / 11 / 8 / 12 | Theophylline-amp prodrug. Levant / Gulf street myth. Wired, long, military rumor. | `oral_ok` `long` | "The stamp on the war footage." |

### Fluoroamps (the ones that actually sold)

Position rule from forum consensus, not theory: **2- = work**, **3- = more fun / more messy**, **4- = serotonin + stim**. N-methyl usually lengthens and dirties.

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **2-FA** | 5 / 7 / 6 / 10 | Short functional. More recreational than 2-FMA, still not a night out. Some redose because it ends. | `oral_ok` `work` `redose` | "2-FMA's impatient little brother." |
| **2-FMA** | 3 / 5 / 4 / 12 | **Work.** Long, clean-ish, Vyvanse-shaped. Little euphoria, real focus. The fluoroamp people actually finished a shift on. | `oral_ok` `work` `focus` | "Files the report. Does not throw the party." |
| **3-FA** | 8 / 11 / 9 / 13 | More dopamine, more mood, less serotonin than 4-FA. Recreational amph that some used as work anyway. PW called it almost meth-potent; forums split. | `oral_ok` `redose` | "The fun fluoro that still lets you type." |
| **3-FMA** | 6 / 9 / 7 / 10 | Straddles work and roll. Not enough of either. Mid-pack leftover after 2-FMA / 4-FA. | `oral_ok` | "A little taste of both. Optimal for neither." |
| **4-FA** | 7 / 16 / 7 / 18 | **The friendly one.** Mild roll up front, amph grind after. Dutch scene darling. Empathy without the full Molly kidnapping. | `oral_ok` | "MDMA for people who have a shift." |
| **4-FMA** | 7 / 13 / 8 / 12 | Heavier 4-FA. More side effects, more headache/heart talk, longer. Sold as 4-FA after the NL ban. | `mislabel` `redose` | "4-FA's heavier sibling who stayed too long." |
| **2-FEA** | 4 / 5 / 4 / 7 | N-ethyl 2-fluoro. PW page, thin trail. Shorter, milder, not a headliner. | `oral_ok` | Vendor fluoro. |
| **3-FEA** | 5 / 12 / 5 / 11 | Serotonergic. Forum people put it nearer 4-FMA than 3-FA — hug, less grind. | `oral_ok` | "The roll-leaning ethyl." |
| **4-FEA** | 4 / 10 / 4 / 9 | Seen in amph seizures. More entactogen, less spark. Thin compared with 4-FA. | `mislabel` | "What they poured when 4-FA dried." |

Then the bill: fluoroamps still do heart, jaw, wake, and the 4-subs carry **serotonin-depletion / neurotox rumor**. 4-FA picked up stroke / bleed headlines in the Dutch scene after it got big. 2-FMA is the "safe work" story until someone redoses into a two-day heart-rate tax.

### Methoxy / methyl stims (not DOx)

These are **stims with a body-count**, usually sold as something else.

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **PMA** | 3 / 5 / 3 / 2 | Slow, late, hot. Fake ecstasy. People redose because "it didn't hit" — then it does, as heatstroke. | `heatstroke` `OD` `mislabel` `serotonin_tox` | "The fake Molly that cooks you." |
| **PMMA** | 3 / 5 / 3 / 2 | PMA's N-methyl twin. Same scam, same oven. EMCDDA risk-assessed it for a reason. | `heatstroke` `OD` `mislabel` `serotonin_tox` | "PMA that stayed an extra carbon. Still an oven." |
| **4-MA** | 6 / 8 / 6 / 6 | 4-methylamphetamine. EU speed adulterant. Serotonin-heavy, MAOI talk, deaths in the 2010s cut. | `adulterant` `OD` `mislabel` | "Speed that wasn't. The cut that ended nights." |
| **4-MTA** | 3 / 7 / 2 / 4 | "Flatliner." Empathogen more than spark. Slow, long, MAOI + 5-HT — ugly when it goes wrong. | `serotonin_tox` `OD` `long` | "They called it Flatliner. Believe the name." |
| **methiopropamine (MPA)** | 7 / 8 / 11 / 9 | Thiophene meth. UK legal-high workhorse ~2011–16. Amph-like focus, colder, fiendish enough. "Synthacaine" when cut with 2-AI. | `redose` `work` | "Meth's sulfur cousin. Coffee with a seizure rumor." |

### Psychedelic substituted amps — **note only, not profiled**

These are **not** stim SKUs. Long, heavy, visual. Kit S / festival vendor. Do not build a DOx wall.

| Name | Why it's here | Do not |
|---|---|---|
| **DOM (STP)** | The 1967 one. 16–30 hour psychedelic amp. | Full feel card |
| **DOB** | Halogen DOx. Long, mean, body-load legend. | Full feel card |
| **DOI** | Research / blotter cousin. | Full feel card |
| **DOC** | The fourth name that actually got sold. | Full feel card |
| **DOET** | Shulgin, rare bag. | Full feel card |
| **TMA / TMA-2** | Methoxy psychedelic amps, not PMA-style stims. | Full feel card |
| **Bromo-DragonFLY** | One-off scare SKU. High `OD`. Not a family. | Full feel card |

MDA / MDMA / MDEA live on the empathogen board.

---

## 08 Phenidates (+ pipradrol cousins)

Legal-Ritalin wall. DAT/NET blockers, not releasers (Luethi 2017). Coke-shaped compulsion on a study-drug alibi.

Documented as **sold or seized**, not the Wikipedia halogen zoo: MPH, dex-MPH, EPH, IPPH, PPH, 4F-MPH, 4F-EPH, 3,4-CTMP, 3,4-DCEP, 4-Me-TMP, HDMP-28, HDEP-28, N-benzyl-EPH, methylmorphenate. Plus **2-DPMP / D2PM / pipradrol** as the assignment's pipradrol cousins.

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **methylphenidate (MPH)** | 5 / 7 / 8 / 11 | The parent. Dry focus, some mood, anxiety tax. Pharma + abuse since the 60s. | `oral_ok` `focus` `work` | "The prescription they already know." |
| **dexmethylphenidate** | 5 / 7 / 7 / 11 | Focalin. Cleaner MPH. Same wall, less junk isomer. | `oral_ok` `focus` | "Ritalin minus the dead weight." |
| **ethylphenidate (EPH)** | 25 / 15 / 36 / 11 | **Fiendish short.** Recreational phenidate. Nose burn, drip, redose until the bag is a memory. UK 2011–15 star. Scottish slam disaster in the papers. | `redose` `caustic` `vein_wreck` | "Short, fiendish, burns the nose, empties the bag." |
| **isopropylphenidate (IPPH)** | 4 / 6 / 5 / 10 | EPH's polite cousin. Longer, less rush, less uncomfortable. People used it to **work**. | `oral_ok` `work` `focus` | "The one you can finish a sentence on." |
| **propylphenidate (PPH)** | 4 / 5 / 5 / 7 | Chain stamp after IPPH. Pharmacology paper + some vendor. Thinner reviews. | `oral_ok` | Same wall, quieter. |
| **4F-MPH** | 6 / 10 / 9 / 15 | **Focus monster.** Stronger, cleaner, more euphoric than MPH in the reviews. Forced stim at the top. Anxiety if you get greedy. Replaced EPH after the UK ban. | `oral_ok` `focus` `work` `redose` | "Ritalin that files taxes." |
| **4F-EPH** | 12 / 10 / 16 / 9 | Fluoro-EPH. Recreational, caustic, mixed "better/worse than EPH" threads. A death case exists. | `redose` `caustic` | "EPH with a fluorine and a shorter fuse." |
| **3,4-CTMP** | 10 / 5 / 9 / 3 | **Too much.** Super-potent, long, anxious. 5-HT2B pulmonary-hypertension rumor (aminorex-shaped risk). Nobody finishes happy. | `too_much` `pulmonary` `paranoia` `long` | "Skip. The bag wins." |
| **3,4-DCEP** | null / null / null / null | Ethyl twin of CTMP. German seizure (Klare 2017). Almost no trip-report trail. | `too_much` | Seizure sticker. |
| **4-Me-TMP** | 4 / 6 / 5 / 9 | 4-methyl MPH. Milder analog, functional, seized + sold. | `oral_ok` `focus` | "Diet Ritalin with a methyl stamp." |
| **HDMP-28** | 6 / 9 / 7 / 10 | Naphthyl phenidate. Not a typical dry stim — some serotonin, some "mood." Mixed: interesting or pointless. | `oral_ok` | "Ritalin that wandered into a different room." |
| **HDEP-28** | 5 / 6 / 6 / 6 | Ethylnaphthidate. UK test-purchase. Conflicting, often "unpleasant / long." | `long` | Crate bottle. |
| **N-benzyl-EPH** | null / null / null / null | Seized (Klare). Luethi tested it. No street mythology. | — | Lab bag. |
| **methylmorphenate** | null / null / null / null | Morpholine N-swap. In the 2017 NPS pharmacology set. Feel unknown. | — | Paper SKU. |
| **2-DPMP (desoxypipradrol)** | 8 / 7 / 24 / 4 | **Ivory Wave.** Coke-shaped DAT, **days** long. Agitation, paranoia, hallucinations that outlast the weekend. ACMD import ban. | `long` `paranoia` `freakout` `redose` | "The stim that does not clock out." |
| **D2PM** | 4 / 4 / 10 / 3 | Diphenylprolinol. Weaker 2-DPMP cousin. Insomnia 24–96 h in confirmed tox. "Whack" era. | `long` `paranoia` | "Ivory Wave's slower cousin." |
| **pipradrol** | 4 / 4 / 5 / 5 | 1950s Meratran. Parent of the above. Museum medicine. | `long` | The prescription they discontinued for a reason. |

EPH / 4F-EPH / 3,4-CTMP are **caustic** in the nose. Phenidates thermally crack — vape talk is a sucker bet (`vape_fav` does **not** belong here).

---

## 09a Phenmetrazine (phenylmorpholine)

Do **not** file these under aminorex. Different ring, different wall, same "diet pill that escaped."

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **phenmetrazine (Preludin)** | 12 / 14 / 16 / 15 | 1950s–70s diet-pill speed. Beatles lore. Real euphoria, real abuse, pulled. The parent 3-FPM is cosplaying. | `redose` | "The old diet pill that actually slapped." |
| **phendimetrazine** | 4 / 6 / 6 / 7 | N-methyl prodrug. Still prescribed in some places. Slower, thinner Preludin. | `oral_ok` | "Preludin with a seatbelt." |
| **3-FPM** | 6 / 8 / 18 / 7 | **"Clean" liar.** Subtle, functional, less jitters in the brochure. People believed it — then redosed the weekend, slammed it, and wrecked veins. Flu-like inflammation comedown in a chunk of reports. Nerve-damage scare in later threads. | `redose` `work` `vein_wreck` `clean_liar` | "Clean until the bag is gone and the arm isn't." |
| **4-FPM** | 3 / 4 / 4 / 5 | Para positional. Background stim. Forum: caffeine/nootropic, not 3-FPM. Sold, not loved. | `oral_ok` | "3-FPM's quieter twin. Nobody writes home." |
| **2-FPM** | null / null / null / null | Ortho positional. McLaughlin 2016 bought "3-FPM" — the bags were 3-FPM; 2-FPM was the lab isomer. Pharmacology exists. Street feel does not. | — | Isomer on a slide. |
| **3-CPM** | 7 / 8 / 8 / 8 | Chloro 3-FPM. PAL-594. Dopamine-selective releaser on paper. Detected in NPS products (2026 forensic differentiation paper). Thin trip-report trail. | `redose` | "3-FPM with a chlorine and fewer reviews." |

3-FPM is the kit headliner. 4-FPM / 3-CPM are stamp swaps. 2-FPM stays gray.

---

## 09b Aminorex / oxazoline

Separate family. Oxazoline / aminorex / pemoline-cyclazodone cousins. **Pulmonary hypertension** is the family ghost (Menocil).

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **aminorex** | 6 / 7 / 5 / 4 | 1960s Menocil anorectic. Worked. Then a pulmonary-hypertension epidemic. Later: levamisole→aminorex in cut cocaine (usually trace). Not a modern party bag. | `pulmonary` `adulterant` | "The diet pill that invented a lung scandal." |
| **4-MAR** | 12 / 18 / 8 / 19 | **U4Euh / Ice / Euphoria.** 1980s legend. Warm, talky, between meth and MDMA, closer to meth. **Long** (forum 12–16 h, high-end longer). Old heads say it **satisfies** — less "I want more" than meth. Pulmonary-hypertension family risk. | `long` `pulmonary` | "Sixteen hours. Satisfied, not fiending." |
| **4,4'-DMAR** | 8 / 10 / 6 / 3 | "Serotoni." MDMA tablet mimic. Non-selective releaser, 5–10× MDMA on paper. **31 EU deaths 2013–14.** Hyperthermia, serotonin tox, heart. Users who remember 4-MAR wanted a sequel. This was not it. | `OD` `serotonin_tox` `mislabel` `heatstroke` | "Sold as ecstasy. Buried people." |
| **3,4-DMAR** | null / null / null / null | Isomer. Lab / rare 2015 EU detect. Not a product line. | — | Paper twin. |
| **MDMAR** | 6 / 9 / 5 / 7 | MDMA×4-MAR hybrid on paper. cis/trans published. Very little human lore. | `serotonin_tox` | "They printed a hybrid. Almost nobody reordered." |
| **4'F-4-MAR** | 7 / 8 / 6 / 8 | Para-fluoro 4-MAR. Slovenian police + Polish consumer sample (2019). Sold mislabeled ("4-FPO"). Reviews thin; some thought it was a phenmetrazine. | `mislabel` | "4-MAR with a fluorine and a fake name." |
| **N-methylaminorex** | null / null / null / null | EU 2015 mention (Maier review). No feel corpus. | — | Name on a list. |
| **cyclazodone** | 3 / 4 / 5 / 6 | Pemoline-like oxazolidinone. 2017 RC "nootropic." Functional, dry, liver-side-eye (pemoline family). | `work` `oral_ok` | "Smart-drug sticker. Stimulant underneath." |
| **N-methylcyclazodone** | 4 / 4 / 7 / 5 | The one with a confirmed tox case (choreiform storm, tachycardia, rhabdo, liver bump). People treated ADHD with a vendor jar. | `too_much` | "The nootropic that made him dance." |
| **pemoline (Cylert)** | 2 / 3 / 2 / 4 | Real ADHD medicine. Withdrawn — liver. Parent of the cyclazodone story. | `oral_ok` | Pharmacy ghost. |

cis vs trans 4-MAR is a real potency split in the literature. Game: one SKU, maybe a "trans batch" rumor, not two meshes.

---

## 10 Piperazines

NZ built an industry on these. Europe got them as **legal X** and as **MDMA adulterants**. Historical combo is the product; singles are the halves.

| SKU | Rush / euphoria / compulsive / enjoy | Street feel | Flags | NPC line |
|---|---|---|---|---|
| **BZP** | 6 / 8 / 7 / 5 | Amp-like legal high. Wired, long, **nasty hangover** — flu, headache, nausea, 24–48 h. NZ 1999–2008: tens of millions of pills. | `hangover` `oral_ok` `long` | "The party pill. The hangover is the product." |
| **TFMPP** | 2 / 6 / 3 / 5 | Serotonin half. MDMA-lite body, nausea, dysphoria if you take it alone. Almost always meant to be paired. | `oral_ok` | "The hug. Also the nausea." |
| **BZP + TFMPP** | 7 / 11 / 6 / 8 | **The combo.** Designed as legal MDMA. Frenzy / Rapture / Charge. Works-ish. Hangover still BZP's. This is the historical SKU. | `hangover` `oral_ok` `mislabel` | "Legal X. Close enough to sell a country." |
| **mCPP** | 1 / 2 / 1 / 1 | Dirty. Headache, nausea, anxiety, flu. Famous **MDMA adulterant**. Almost nobody likes the pure. | `adulterant` `hangover` | "Nobody asked for this." |
| **MeOPP (pMeOPP)** | 2 / 4 / 2 / 4 | Para-methoxyphenylpiperazine. Milder, some mood. NZ Class C list. Never a star. | `oral_ok` | Session candy. |
| **pFPP** | 2 / 4 / 2 / 4 | Para-fluoro. Mild, mixer. Same NZ ban list. | `oral_ok` | "The fluorinated extra in the jar." |
| **MBZP** | 4 / 5 / 4 / 4 | N-methyl BZP. Weaker BZP. Documented, listed, meh. | `hangover` | Diet BZP. |
| **MDBZP** | null / null / null / 24 | Methylenedioxybenzylpiperazine. Documented analog. Thin feel. | — | Catalog cousin. |
| **DBZP** | null / null / null / null | 1,4-dibenzylpiperazine. Usually a **BZP synthesis leftover**, not a product. | `adulterant` | Impurity with a name. |

After 2008 NZ Class C (BZP, TFMPP, mCPP, MeOPP, pFPP, MBZP) the piperazine wall dies and the country invents the next legal-high generation. In Port Rook this is a **dusty party-pill crate**, not a live Flask wall.

---

## Kit mapping (art / mesh)

| Mesh | SKUs |
|---|---|
| Crystal / powder bag (stim) | amp, meth, fluoroamps, MPA, PMA/PMMA powder, 3-FPM wall, 4-MAR wall |
| Pharma blister / capsule | MPH, dex-MPH, phentermine, lisdex, pemoline, phendimetrazine |
| RC vial / bag (phenidate) | EPH, IPPH, 4F-MPH, 3,4-CTMP, HDMP-28, 2-DPMP |
| Pressed pill (party) | BZP, BZP+TFMPP, Captagon stamp, 4,4'-DMAR-as-Molly, PMA-as-Molly |
| Blotter | DOx note-only (not this stim board) |

Share crystal-bag mesh with cathinone kits A–E / T–V from `product_families.md`. Piperazine pills share the empathogen press.

v1 ship: **4-FA, 2-FMA, 4F-MPH, EPH, 3-FPM, BZP** (hangover tutorial), plus street **amp / meth** if the Kitchen door is open. Everything else is a stamp or a grayed crate.

---

## Scoring notes

House ruler, coke = **10**. Independent, not a forced curve. `null` = not enough documented feel to rate.

Compulsiveness is **wanting the next bump**, not "how strong." 4-MAR can be loved (enjoyment_x 19, meth's neighborhood) and still low-compulsive (8) because old reports say it satiates — `09_10` scored that compulsive much higher; this file disagrees on purpose. 3-FPM is mid-euphoria (8) and high-compulsive (18) because the "clean" story is a liar. 3,4-CTMP can stimulate (rush 10) and still score enjoyment 3. BZP can be a real night and still lose on hangover (enjoyment 5). 4-FA enjoyment 18 sits under 4-MMC's 23 and in meth's neighborhood without being meth. EPH compulsive 36 is the fiend on this wall — short, not a pyro 120.

JSON lives next to this file: `07_10_other_stims.json` (one array, `subclass` splits families: `amphetamine` | `phenidate` | `phenmetrazine` | `aminorex` | `piperazine`).
