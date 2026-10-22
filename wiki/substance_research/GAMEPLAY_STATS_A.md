# GAMEPLAY_STATS_A — Maker A GameplayProfile

All numbers are `gameplay_estimate`. Not science. Not a dose table. Not engine code.
Spec: [`GAMEPLAY_RESPONSE.md`](GAMEPLAY_RESPONSE.md). Equations are the epsilon-safe lock.
Do not compare class-local Strength (disso / psych / empathogen / lysergamide) to α-PVP.

## Equations (verbatim, epsilon-safe)

```
Strength[i] = Weight[i] * Potency[i] * Euphoria[i] * Rush[i]
TotalStrength = SUM(Strength[i])
WeightedDuration = SUM(Strength[i] * Duration[i]) / MAX(SUM(Strength[i]), epsilon)
Enjoyment = TotalStrength / MAX(WeightedDuration, epsilon)
Satisfaction = Enjoyment / (1 + Comedown + Aftereffects)
```

100 is a coke **benchmark**, not a cap. Duration ≠ HalfLife. Economy ≠ Enjoyment. Live Hill ≠ batch Strength. `CurveSharpness` / `ResponseMidpoint` are engine knobs, not per-drug research. Zero rush stays zero (flag; do not invent R).

Locked mix (20 α-PVP + 80 caffeine, caffeine D=240): Strength 8,750,000 + 100. Dmix ≈ 90.002. J ≈ 97,221.

## Locked anchors

| Substance | P | E | R | D | Strength_W1 |
|---|---:|---:|---:|---:|---:|
| caffeine | 0.05 | 5 | 5 | 240 | 1.25 |
| cocaine | 1.00 | 100 | 100 | 50 | 10000 |
| α-PVP | 5.00 | 250 | 350 | 90 | 437500 |

## Calibration (Maker A)

- Band first, then P/E/R/D relative to the three anchors.
- 4-MMC Strength_W1 = 44800 (4.5× coke). E=200 sits between coke 100 and locked PVP 250.
- Homework Strength stays homework (Vyvanse 216, 2-FMA 470, Concerta 134).
- MDPV / α-PPP sit below α-PVP on P, E, and R.
- House sit-call clocks: **α-PVP D=90 / HL=140**. **MDPV D=210 / HL=180**. Do not ship MDPV D=48. Do not reopen 180 vs 240.
- Thin SKUs are null. No structure-inferred walls.
- HalfLife ≠ Duration. C/A are Satisfaction penalties only.

**Counts:** 187 rows · **133 scored** · **54 null/placeholder**

## 1. Classical stimulants (locked anchors live here)

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| caffeine | 0.05 | 5 | 5 | 240 | 360 | 0.05 | 0.1 | 1.25 | A | LOCKED ANCHOR 0.05/5/5. D=240 matches the boxed 20/80 mix. Strength_W1=1.25. |
| cocaine | 1 | 100 | 100 | 50 | 40 | 0.5 | 0.4 | 10000 | A | LOCKED ANCHOR 1/100/100. Fun window ~40–60. Strength_W1=10000. |
| crack | 1 | 110 | 160 | 12 | 15 | 0.9 | 0.6 | 17600 | A | Same molecule, different door. Bigger snap, tiny D. Strength_W1=17600. |
| amphetamine (racemic) | 1.2 | 105 | 78 | 240 | 360 | 0.35 | 0.55 | 9828 | A | Doctor/street-speed. Near coke mood, not 2× coke, not 4-MMC. Strength_W1=9828. |
| dextroamphetamine (Dexedrine) | 1.35 | 112 | 75 | 270 | 400 | 0.3 | 0.5 | 11340 | A | Speed with a doctor voice. E<130. Strength_W1=11340 ≈ coke, not 4-MMC. |
| Adderall IR | 1.25 | 108 | 76 | 240 | 380 | 0.32 | 0.5 | 10260 | A | Dex-leaning mix. Same doctor-IR band. Strength_W1=10260. |
| lisdexamfetamine (Vyvanse) | 0.45 | 40 | 12 | 480 | 720 | 0.2 | 0.8 | 216 | A | Homework / prodrug. Tiny rush. Strength_W1=216 vs coke 10000 vs PVP 437500. |
| methamphetamine | 2.1 | 165 | 200 | 360 | 720 | 0.8 | 1.5 | 69300 | A | Meth band. E below 4-MMC (200). Beats coke on R and D. Strength_W1=69300. |
| methylphenidate IR (Ritalin) | 0.7 | 48 | 30 | 150 | 240 | 0.25 | 0.45 | 1008 | B | Dry focus. Homework-adjacent. Strength_W1=1008. |
| methylphenidate XR (Concerta) | 0.35 | 32 | 12 | 480 | 700 | 0.15 | 0.55 | 134.4 | A | Homework XR. Strength_W1=134. |

## 2. MMC cathinones

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 4-MMC (mephedrone) | 1.4 | 200 | 160 | 75 | 110 | 0.7 | 1.1 | 44800 | A | 4-MMC band. E=200 is a lot more than coke 100 and below locked PVP 250. Strength_W1=44800 (4.5× coke). Enjoyment ≈597 vs coke 200. Greedy... |
| 3-MMC | 1.2 | 145 | 130 | 60 | 90 | 0.65 | 0.8 | 22620 | A | Step down from 4-MMC. If it lasts till noon it was not this. Strength_W1=22620. |
| 2-MMC | 0.95 | 110 | 90 | 55 | 80 | 0.5 | 0.55 | 9405 | B | Colder / thinner. Often the 3-MMC stamp. Strength_W1=9405. |

## 3. Halogen MMC (CMC / FMC / BMC)

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 4-CMC (clephedrone) | 1.2 | 140 | 125 | 70 | 100 | 0.9 | 1.3 | 21000 | B | Nastier / less magic than 4-MMC. Strength_W1=21000. |
| 3-CMC | 1.15 | 125 | 115 | 65 | 95 | 0.8 | 1 | 16531.25 | B | More DA, less hug. Strength_W1=16531. |
| 2-CMC | — | — | — | — | — | — | — | — | D | Ortho-chloro barely reported. Labs mix the three chloros. |
| 4-FMC (flephedrone) | 0.85 | 70 | 60 | 60 | 90 | 0.5 | 0.6 | 3570 | C | Old legal-high leftover. Strength_W1=3570. |
| 3-FMC | — | — | — | — | — | — | — | — | D | Positional fluoro. Thin dedicated reports. |
| 2-FMC | — | — | — | — | — | — | — | — | D | Ortho-fluoro. Almost no feel corpus. |
| 4-BMC (brephedrone) | — | — | — | — | — | — | — | — | D | Rare vendor dust. Do not invent a 4-MMC-minus-ten. |
| 3-BMC | — | — | — | — | — | — | — | — | D | Museum bromo. No reliable feel trail. |
| 2-BMC | — | — | — | — | — | — | — | — | D | Name-only bromo. No bag chorus. Do not invent a 4-BMC-lite. |

## 4. N-alkyl / chain cathinones

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| NEP (N-ethylpentedrone) | 1.5 | 95 | 115 | 210 | 480 | 0.8 | 1 | 16387.5 | A | Colder than meow, greedier, longer. Strength_W1=16387.5. Enjoyment ~78 vs 4-MMC ~597. |
| hexen (N-ethylhexedrone) | 1.25 | 70 | 100 | 90 | 180 | 1 | 0.9 | 8750 | A | Diet NEP. First bump is the poem. Strength_W1=8750. |
| pentedrone | 0.9 | 30 | 35 | 120 | 200 | 0.4 | 0.5 | 945 | B | Cold work stim. Strength_W1=945. |
| hexedrone | 0.8 | 40 | 35 | 90 | 160 | 0.35 | 0.45 | 1120 | C | Weaker N-methyl parent of hexen. Strength_W1=1120. |
| buphedrone | 0.7 | 38 | 32 | 90 | 150 | 0.3 | 0.4 | 851.2 | C | Weaker chain stamp. Strength_W1=851. |
| NEB (N-ethylbuphedrone) | 0.85 | 50 | 45 | 100 | 170 | 0.45 | 0.5 | 1912.5 | C | Gentle, moreish, ceiling. Strength_W1=1912. |
| 4-MEC | 0.85 | 65 | 75 | 40 | 80 | 0.55 | 0.7 | 4143.75 | B | Diet meow. Short empty spike. Strength_W1=4144. |
| 4-EMC | — | — | — | — | — | — | — | — | D | Thin N-alkyl. Old-head closest-to-meow rumor. Do not interpolate a 3-digit 4-MMC-lite. |
| 3,4-DMMC | 0.9 | 72 | 65 | 70 | 110 | 0.45 | 0.55 | 4212 | C | Old headshop leftover. Strength_W1=4212. |
| 4-MPD | 0.85 | 35 | 40 | 100 | 180 | 0.4 | 0.5 | 1190 | C | Cold work cousin. Strength_W1=1190. |
| mexedrone | 0.5 | 22 | 18 | 60 | 100 | 0.2 | 0.35 | 198 | B | Hyped flop. Strength_W1=198. |
| 3-MEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 2-MEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 4-EEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 3-EEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 4-CEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 3-CEC | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |
| 4-MEAP | — | — | — | — | — | — | — | — | D | N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite. |

## 5. Methylenedioxy cathinones (bk-MDMA)

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| methylone (bk-MDMA) | 1 | 140 | 80 | 90 | 150 | 0.45 | 0.7 | 11200 | A | Short roll. Still on coke wall (cathinone), not MDMA's class-local 100. Strength_W1=11200. |
| ethylone | 0.85 | 100 | 65 | 100 | 160 | 0.4 | 0.6 | 5525 | B | Weaker methylone. Strength_W1=5525. |
| butylone | 0.8 | 88 | 55 | 150 | 220 | 0.35 | 0.55 | 3872 | B | Longer, flatter. Strength_W1=3872. |
| pentylone | 1.05 | 82 | 72 | 120 | 200 | 0.5 | 0.7 | 6199.2 | C | More stim than hug. Strength_W1=6199. |
| eutylone | 1.15 | 90 | 85 | 150 | 240 | 0.55 | 0.8 | 8797.5 | B | Later wave. More stim than hug. Strength_W1=8798. |
| ephylone (N-ethylpentylone) | 1.3 | 78 | 88 | 180 | 280 | 0.7 | 1 | 8923.2 | B | Nastier. News-seizure energy. Strength_W1=8923. |
| dipentylone | 1 | 65 | 60 | 120 | 200 | 0.45 | 0.6 | 3900 | C | Weaker than 3-MMC in checking-desk talk. Strength_W1=3900. |

## 6. Odd / methoxy cathinones

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| methedrone (bk-PMMA) | 0.7 | 35 | 25 | 180 | 300 | 0.4 | 0.8 | 612.5 | C | PMMA-adjacent scare. Strength_W1=612.5. |

## 7. Unsubstituted α-pyros

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| α-PPP | 2.2 | 150 | 280 | 32 | 70 | 1.4 | 1.2 | 92400 | B | Forum slam-only poem. Below locked PVP on P/E/R. Strength_W1=92400. |
| α-PBP | 2.4 | 130 | 160 | 50 | 90 | 1 | 1 | 49920 | B | Split bag. Not the mountain. Strength_W1=49920. |
| α-PVP (flakka) | 5 | 250 | 350 | 90 | 140 | 2.5 | 3 | 437500 | A | LOCKED ANCHOR 5/250/350. D=90 / HL=140 sit-call. Strength_W1=437500. Do not nerf P. |
| α-PHP (PV-7) | 4.2 | 220 | 300 | 55 | 150 | 2 | 2.2 | 277200 | A | Liked pyro. Below locked PVP on all three walls. Strength_W1=277200. |
| α-PiHP | 4.4 | 210 | 290 | 50 | 140 | 2.3 | 2.6 | 267960 | A | Diet PVP. Below the lock. Strength_W1=267960. |
| α-PEP (PV-8) | 2.8 | 145 | 175 | 70 | 130 | 1.2 | 1.4 | 71050 | C | Stretched, weaker. Strength_W1=71050. |
| α-POP (PV-9) | — | — | — | — | — | — | — | — | D | Vendor crate. Almost no clean solo feel. Do not invent a slightly weaker PV-8. |
| α-PCYP | 2.2 | 60 | 22 | 150 | 240 | 0.4 | 0.5 | 2904 | C | DAT said stronger than flakka. The pipe said homework stim. Seized bags are cyclohexyl. Strength_W1=2904. |

## 8. MD-pyros

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| MDPPP | 1.8 | 120 | 140 | 75 | 80 | 0.8 | 0.9 | 30240 | C | Short MD. Old heads sometimes liked it more than MDPV (useful). Strength_W1=30240. |
| MDPBP | 2.6 | 140 | 165 | 50 | 95 | 1.1 | 1.2 | 60060 | C | Middle MD. Catalog cousin. Strength_W1=60060. |
| MDPV | 4.5 | 230 | 310 | 210 | 180 | 2.4 | 2.8 | 320850 | A | Ivory Wave. NOT above locked α-PVP. Strength_W1=320850. House sit-call D=210 / HL=180. Do not ship D=48. |
| MDPHP | 3.6 | 185 | 240 | 150 | 170 | 1.8 | 2 | 159840 | A | Current MD workhorse. Still a pyro, not a roll. Strength_W1=159840. |
| MDPiHP | 3.4 | 175 | 225 | 150 | 160 | 1.7 | 1.9 | 133875 | C | Iso twin of MDPHP. Strength_W1=133875. |
| MDPEP (MD-PV8) | 2.5 | 120 | 140 | 80 | 150 | 1.1 | 1.3 | 42000 | C | C7 later wave. Dead-end reviews. Strength_W1=42000. |
| MDPOP (MD-PV9) | — | — | — | — | — | — | — | — | D | Catalog hit. No trip-report shelf. |
| 5-DBFPV (3-desoxy-MDPV) | — | — | — | — | — | — | — | — | D | 2014 almost-MD. Handful of posts. Do not invent a slightly weaker MDPV. |
| 2,3-MDPV | — | — | — | — | — | — | — | — | D | Ring-position isomer bait. Barely a product. |

## 9. 4-methyl / Centroton pyros

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 4-MePPP (MPPP) | 1.1 | 60 | 55 | 60 | 100 | 0.4 | 0.45 | 3630 | C | Weak German parent-series. Strength_W1=3630. |
| pyrovalerone (Centroton) | 1.6 | 80 | 70 | 90 | 150 | 0.5 | 0.55 | 8960 | C | 1960s medicine name. Milder than flakka. Strength_W1=8960. |
| MPHP (PV-4) | 2 | 105 | 115 | 70 | 130 | 0.8 | 0.9 | 24150 | C | Old Centroton wall. Strength_W1=24150. |
| MPBP | — | — | — | — | — | — | — | — | D | Old catalog cousin. No reliable modern feel chorus. |
| MOPPP (4-MeO-α-PPP) | — | — | — | — | — | — | — | — | D | Methoxy cousin. Literature leftover. |

## 10. Substituted / unusual pyros

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| naphyrone (NRG-1) | — | — | — | — | — | — | — | — | D | Identity trap. Most NRG-1 bags were not naphyrone (often MDPV). |
| α-PVT | — | — | — | — | — | — | — | — | D | Sulfur-ring odd crate. |
| α-PBT | — | — | — | — | — | — | — | — | D | Thienyl cousin. Forensic name, not a chorus. |
| TH-PVP | — | — | — | — | — | — | — | — | D | Tetralin pyro. Museum shelf. |
| 5-PPDI | — | — | — | — | — | — | — | — | D | Indane pyro. Dusty vendor SKU. |
| 5-BPDI | — | — | — | — | — | — | — | — | D | Indane pyro. Same dusty shelf. |
| 4F-α-PVP | — | — | — | — | — | — | — | — | D | Fluoro stamp. Not enough H2H to invent a 3-digit E. |
| 4Cl-α-PVP | — | — | — | — | — | — | — | — | D | Chloro stamp. Forensic, not a ranked night. |
| 4-Me-α-PVP | — | — | — | — | — | — | — | — | D | Name also points at pyrovalerone. Not a second mountain. |
| 4F-α-PHP | — | — | — | — | — | — | — | — | D | Fluoro PHP. n too thin to interpolate off PHP. |
| 4F-PV8 | — | — | — | — | — | — | — | — | D | STRIDA copycat. No confident feel table. |
| 3F-α-PiHP | — | — | — | — | — | — | — | — | D | Current isomer stamp. Do not print a 3×4 grid. |
| 4F-α-PiHP | — | — | — | — | — | — | — | — | D | Fluoro PiHP. Seized; feel not triangulated. |
| 2-Me-α-PiHP | — | — | — | — | — | — | — | — | D | Swedish casework isomer. No forum mountain. |
| 3-Me-α-PiHP | — | — | — | — | — | — | — | — | D | Swedish casework isomer. No forum mountain. |
| 4-Me-α-PiHP | — | — | — | — | — | — | — | — | D | Swedish casework isomer. No forum mountain. |

## 11. Phenidates

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| ethylphenidate (EPH) | 1.8 | 105 | 120 | 50 | 80 | 0.9 | 0.7 | 22680 | A | Short, fiendish, coke-shaped. Not a 4-MMC session. Strength_W1=22680 (2.3× coke, half of 4-MMC). |
| isopropylphenidate (IPPH) | 1.1 | 48 | 20 | 240 | 360 | 0.2 | 0.4 | 1056 | B | Study-drug winner. Strength_W1=1056. |
| 4F-MPH | 1.5 | 65 | 40 | 360 | 540 | 0.25 | 0.55 | 3900 | A | Focus monster. Strength_W1=3900. |
| 3,4-CTMP | 2.8 | 45 | 80 | 360 | 600 | 0.8 | 1.2 | 10080 | B | Too much. High P, low E. Strength_W1=10080. |
| HDMP-28 | 1.3 | 62 | 45 | 180 | 280 | 0.4 | 0.5 | 3627 | C | Naphthyl phenidate. Strength_W1=3627. |
| 4-Me-TMP | 0.85 | 46 | 22 | 210 | 320 | 0.2 | 0.4 | 860.2 | C | Diet Ritalin. Strength_W1=860. |

## 12. Fluoroamphetamines

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 2-FMA | 0.7 | 42 | 16 | 390 | 600 | 0.2 | 0.6 | 470.4 | A | Homework. Vyvanse's street cousin. Strength_W1=470. |
| 2-FA | 1.1 | 62 | 40 | 150 | 240 | 0.3 | 0.45 | 2728 | B | Impatient 2-FMA. Strength_W1=2728. |
| 3-FA | 1.4 | 108 | 80 | 210 | 320 | 0.4 | 0.5 | 12096 | B | Fun fluoro that still lets you type. Strength_W1=12096. |
| 4-FA | 1.1 | 145 | 70 | 300 | 420 | 0.5 | 0.9 | 11165 | A | Mild roll + stim. More than coke on E, under 4-MMC. Strength_W1=11165. |
| 4-FMA | 1.15 | 125 | 70 | 360 | 500 | 0.55 | 0.85 | 10062.5 | B | Heavier 4-FA. Strength_W1=10062. |

## 13. Phenmetrazine / aminorex / piperazine

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 3-FPM | 1.2 | 70 | 50 | 180 | 280 | 0.4 | 0.7 | 4200 | B | Clean-functional liar. Strength_W1=4200. |
| 4-FPM | 0.55 | 32 | 18 | 150 | 240 | 0.15 | 0.3 | 316.8 | C | Caffeine/nootropic, not 3-FPM. Strength_W1=317. |
| 3-CPM | — | — | — | — | — | — | — | — | D | Chloro 3-FPM. Detected; trail too thin. |
| 4-MAR | 1.9 | 155 | 120 | 720 | 960 | 0.4 | 0.8 | 35340 | B | U4Euh legend. E below 4-MMC. Long D. Strength_W1=35340. |
| BZP | 0.4 | 50 | 35 | 300 | 480 | 0.3 | 1.2 | 700 | B | NZ party pill. Hangover is the product. Strength_W1=700. |

## 14. Leftover stims / blends

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| khat leaf | 0.08 | 30 | 12 | 180 | 300 | 0.1 | 0.2 | 28.8 | B | Parent of the cathinone wall. Strength_W1=28.8. |
| modafinil | 0.22 | 22 | 6 | 480 | 720 | 0.1 | 0.25 | 29.04 | B | Wake drug. Strength_W1=29. |
| dimethocaine | 0.2 | 28 | 22 | 40 | 70 | 0.3 | 0.25 | 123.2 | C | Legal-high coke mimic. Strength_W1=123. |
| Synthacaine (blend) | — | — | — | — | — | — | — | — | D | Brand, not a molecule. Often MPA + 2-AI. |
| 2-AI | — | — | — | — | — | — | — | — | D | Sat in Synthacaine mixes. Thin solo chorus. |

## 15. Ketamine-likes (disso wall, ket E=100)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| ketamine | 1 | 100 | 70 | 50 | 80 | 0.3 | 0.5 | 7000 | A | CLASS-LOCAL ket wall E=100. Not on the stim Strength ladder. |
| DCK | 1.3 | 95 | 55 | 150 | 240 | 0.25 | 0.4 | 6792.5 | B | Ket wall. Longer, cleaner, polite onset. |
| 2F-DCK | 1.05 | 82 | 80 | 70 | 120 | 0.3 | 0.45 | 6888 | B | Ket clone. Batch lottery. |
| 2F-NENDCK (CanKet) | 1.25 | 78 | 75 | 120 | 200 | 0.3 | 0.45 | 7312.5 | B | Street FXE ≠ this. |
| FXE (3-FXE, genuine) | 1.15 | 88 | 72 | 90 | 150 | 0.3 | 0.4 | 7286.4 | C | Genuine 3-fluoro. Street bags after ~2022 are usually CanKet. |
| HXE | 0.7 | 62 | 35 | 120 | 200 | 0.2 | 0.3 | 1519 | B | Warm, weak, couch. |
| NENK | 0.8 | 42 | 35 | 90 | 150 | 0.25 | 0.35 | 1176 | C | Old ethketamine. Not O-PCE. |
| tiletamine | 1.4 | 48 | 95 | 40 | 80 | 0.4 | 0.6 | 6384 | C | Vet-shelf. Telazol is this plus zolazepam. |
| 2-MeO-ketamine | — | — | — | — | — | — | — | — | D | Boring ortho-MeO. Not MXE. |
| 2-BDCK | — | — | — | — | — | — | — | — | D | Bromo-DCK. Rare / rough. |
| street FXE (sticker) | — | — | — | — | — | — | — | — | D | Identity trap. After ~2022 usually CanKet / 2F-NENDCK. |

## 16. MXE / oxo-PCE (disso wall)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| MXE | 2.2 | 145 | 80 | 180 | 300 | 0.4 | 0.55 | 25520 | A | Ket wall, NOT the pyro ladder. The legend. Do not print above α-PVP. |
| DMXE | 1.7 | 112 | 88 | 150 | 250 | 0.35 | 0.5 | 16755.2 | B | Closest living cousin. 3-DMXE is this sticker. |
| 3-DMXE / 3DMXE (sticker) | — | — | — | — | — | — | — | — | D | Identity trap. 3-DMXE = DMXE branding. |
| MXPr | 1.3 | 68 | 55 | 90 | 160 | 0.3 | 0.4 | 4862 | B | The disappointment. Billed as next MXE. |
| MXiPr | 1.5 | 75 | 62 | 100 | 180 | 0.35 | 0.45 | 6975 | C | Polarizing. |
| O-PCE | 2.6 | 72 | 110 | 90 | 180 | 0.8 | 0.7 | 20592 | A | Scalpel. Air left the room. Little hug. |

## 17. PCP / PCE (disso wall)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| PCP | 3.2 | 68 | 75 | 300 | 600 | 0.5 | 0.9 | 16320 | A | Walk-around manic. Long. Class-local. |
| 3-MeO-PCP | 5.5 | 108 | 85 | 360 | 720 | 0.6 | 1 | 50490 | A | God-mode. Class-local — P is not vs coke. |
| 3-HO-PCP | 6 | 102 | 65 | 360 | 720 | 0.45 | 0.8 | 39780 | B | Warm-numb. Still a disso. |
| 3-Me-PCP | 3.8 | 82 | 60 | 300 | 600 | 0.35 | 0.6 | 18696 | B | Functional. Finish a sentence. |
| 3-Cl-PCP | 4.2 | 72 | 65 | 240 | 480 | 0.35 | 0.55 | 19656 | C | Heavy, stoning. |
| 4-MeO-PCP | 1.8 | 52 | 45 | 240 | 480 | 0.3 | 0.5 | 4212 | C | First RC PCP. Weaker. |
| PCE | 2.8 | 62 | 70 | 240 | 480 | 0.45 | 0.7 | 12152 | C | Older, stimulating. |
| 3-MeO-PCE | 4.5 | 88 | 80 | 240 | 500 | 0.55 | 0.8 | 31680 | B | Twitchier 3-MeO-PCP cousin. |
| 3-HO-PCE | 5 | 58 | 45 | 240 | 480 | 0.3 | 0.5 | 13050 | C | Pure disso, little magic. |
| 3-F-PCP | — | — | — | — | — | — | — | — | D | Later fluoro. n too thin. |
| 3-MeO-PCPy | — | — | — | — | — | — | — | — | D | Pyrrolidine N-swap. Thin vs 3-MeO-PCP. |
| 3-Me-PCE | — | — | — | — | — | — | — | — | D | Later methyl stamp. Vendor-thin. |
| 3-MeO-PCMo | — | — | — | — | — | — | — | — | D | Morpholine. Weak. |
| TCP | — | — | — | — | — | — | — | — | D | Thiophene leftover. Museum. |
| 3,4-MD-PCP | — | — | — | — | — | — | — | — | D | MD leftover. Museum. |

## 18. Diarylethylamines / other dissos

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| diphenidine | 1.15 | 42 | 35 | 240 | 400 | 0.35 | 0.6 | 1690.5 | B | Steep, dumb, long. |
| ephenidine | 1.3 | 82 | 45 | 300 | 480 | 0.3 | 0.55 | 4797 | B | Cosmic, forced. |
| MXP | 0.95 | 48 | 32 | 300 | 480 | 0.25 | 0.5 | 1459.2 | B | Sold as MXE replacement. Flop. |
| fluorolintane | — | — | — | — | — | — | — | — | D | Rare diaryl. One bottle. |
| DXM | 0.12 | 52 | 28 | 240 | 400 | 0.4 | 0.8 | 174.72 | A | Cheap platters. Class-local. |
| nitrous oxide | 0.02 | 38 | 85 | 1 | 2 | 0.05 | 0.1 | 64.6 | A | Balloons. Huge R, tiny D. |

## 19. Empathogens (MDMA wall, MDMA E=100)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| MDMA | 1 | 100 | 70 | 210 | 360 | 0.4 | 0.9 | 7000 | A | CLASS-LOCAL MDMA E=100. Not on the stim Strength ladder. |
| MDA | 1.15 | 94 | 52 | 300 | 480 | 0.35 | 0.8 | 5621.2 | A | Longer, more visual, less hug. |
| MDEA | 0.8 | 58 | 38 | 180 | 300 | 0.25 | 0.5 | 1763.2 | B | Quiet cousin. |
| 5-MAPB | 1.05 | 88 | 72 | 180 | 300 | 0.35 | 0.7 | 6652.8 | A | Closest MDMA copy after the drought. |
| 6-APB | 1.25 | 82 | 38 | 420 | 600 | 0.3 | 0.75 | 3895 | A | All-night Benzo Fury. |
| 5-APB | 1.15 | 78 | 48 | 300 | 480 | 0.35 | 0.7 | 4305.6 | B | Same hug family, mongier. |
| MDAI | 0.48 | 32 | 14 | 150 | 240 | 0.15 | 0.3 | 215.04 | B | Street: weak mixer. |
| 5-EAPB | 0.85 | 48 | 32 | 180 | 300 | 0.25 | 0.4 | 1305.6 | C | Forum: disappointing. |
| 6-APDB | 0.88 | 52 | 32 | 300 | 480 | 0.25 | 0.45 | 1464.32 | C | Slightly shittier 6-APB. |
| 5-APDB | 0.65 | 38 | 18 | 180 | 300 | 0.2 | 0.35 | 444.6 | C | Soft, meh. |
| 6-MAPB | — | — | — | — | — | — | — | — | D | Rare bags. Human file too thin. |
| 6-EAPB | — | — | — | — | — | — | — | — | D | Later stamp. Barely a product. |

## 20. 2C / NBOMe / DOx (class-local)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 2C-B | 1 | 100 | 22 | 300 | 420 | 0.15 | 0.3 | 2200 | A | CLASS-LOCAL 2C-B E=100. tusi is a color, not this. |
| 2C-C | 0.7 | 78 | 14 | 300 | 420 | 0.12 | 0.25 | 764.4 | B | Mellow halogen. |
| 2C-I | 1.1 | 94 | 32 | 360 | 500 | 0.18 | 0.35 | 3308.8 | A | Sharper twin of 2C-B. |
| 2C-E | 1.35 | 90 | 28 | 480 | 640 | 0.2 | 0.45 | 3402 | A | Adult 2C. |
| 2C-D | 0.5 | 58 | 14 | 240 | 360 | 0.1 | 0.2 | 406 | B | Training wheels. |
| 2C-P | 1.9 | 84 | 18 | 720 | 960 | 0.2 | 0.55 | 2872.8 | A | Long. Don't start here. |
| 2C-T-2 | 1.15 | 72 | 18 | 360 | 500 | 0.2 | 0.4 | 1490.4 | B | Sulfur 2C. |
| 2C-T-7 | 1.4 | 78 | 22 | 480 | 640 | 0.25 | 0.5 | 2402.4 | B | The scary sulfur. |
| tusi / pink cocaine (color) | — | — | — | — | — | — | — | — | D | Identity trap. A color, usually ketamine ± extras. Not 2C-B. Not cocaine. |
| 25I-NBOMe | 1 | 100 | 38 | 360 | 500 | 0.2 | 0.4 | 3800 | A | CLASS-LOCAL 25I E=100. Never label as LSD. |
| 25B-NBOMe | 1.08 | 94 | 34 | 360 | 500 | 0.2 | 0.4 | 3451.68 | B | Same blotter fail-state. |
| 25C-NBOMe | 0.88 | 84 | 28 | 300 | 420 | 0.18 | 0.35 | 2069.76 | B | Same three that got the DEA sheet. |
| DOM (STP) | 1 | 100 | 18 | 960 | 1440 | 0.2 | 0.5 | 1800 | A | CLASS-LOCAL DOM E=100. |
| DOB | 2.2 | 94 | 18 | 1080 | 1600 | 0.25 | 0.55 | 3722.4 | B | Long, mean. |
| DOI | 1.8 | 88 | 18 | 960 | 1440 | 0.22 | 0.5 | 2851.2 | B | Research / blotter cousin. |
| DOC | 1.7 | 88 | 22 | 720 | 1080 | 0.22 | 0.5 | 3291.2 | B | The fourth name that actually got sold. |
| Bromo-DragonFLY | 3.5 | 68 | 14 | 1440 | 2160 | 0.3 | 0.7 | 3332 | C | One-off scare SKU. |

## 21. Tryptamines (class-local)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 4-AcO-DMT | 1 | 100 | 18 | 300 | 420 | 0.15 | 0.3 | 1800 | A | CLASS-LOCAL oral tryptamine E=100. |
| 4-HO-MET | 1.05 | 94 | 22 | 240 | 360 | 0.12 | 0.25 | 2171.4 | A | Playful. |
| 4-HO-MiPT | 0.95 | 88 | 18 | 240 | 360 | 0.12 | 0.25 | 1504.8 | B | Same family. |
| 5-MeO-MiPT | 1.4 | 82 | 28 | 240 | 360 | 0.18 | 0.35 | 3214.4 | B | Body-heavy. |
| 5-MeO-DMT | 6 | 78 | 90 | 15 | 25 | 0.2 | 0.4 | 42120 | A | Fast, heavy. |
| DMT | 5 | 88 | 95 | 8 | 12 | 0.1 | 0.2 | 41800 | A | Short bang. Class-local. |

## 22. Lysergamides (LSD wall, LSD E=100)

_Class-local wall. Strength_W1 is not on the stim ladder._

| Name | P | E | R | D | HL | C | A | Str_W1 | Conf | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| LSD | 1 | 100 | 12 | 540 | 720 | 0.1 | 0.35 | 1200 | A | CLASS-LOCAL LSD E=100. Not a stim. |
| 1P-LSD | 0.8 | 98 | 12 | 540 | 720 | 0.1 | 0.35 | 940.8 | A | RC-door prodrug of LSD. |
| 1cP-LSD | 0.82 | 98 | 12 | 540 | 720 | 0.1 | 0.35 | 964.32 | A | Same movie as LSD. |
| ALD-52 | 0.88 | 98 | 12 | 540 | 720 | 0.1 | 0.35 | 1034.88 | B | 1-acyl prodrug of LSD. Orange Sunshine was not this. |
| AL-LAD | 0.7 | 90 | 18 | 420 | 600 | 0.1 | 0.3 | 1134 | B | Warmer / shorter rumor. Not a 1-acyl clone. |
| ETH-LAD | 1.15 | 94 | 18 | 480 | 660 | 0.12 | 0.35 | 1945.8 | B | Heavier analogue, not an LSD clone. |
| Orange Sunshine (alias) | — | — | — | — | — | — | — | — | D | Identity trap. Orange Sunshine = LSD. |

## NULL / thin list

- **2-CMC** (`2-cmc`): Ortho-chloro barely reported. Labs mix the three chloros.
- **3-FMC** (`3-fmc`): Positional fluoro. Thin dedicated reports.
- **2-FMC** (`2-fmc`): Ortho-fluoro. Almost no feel corpus.
- **4-BMC (brephedrone)** (`4-bmc`): Rare vendor dust. Do not invent a 4-MMC-minus-ten.
- **3-BMC** (`3-bmc`): Museum bromo. No reliable feel trail.
- **2-BMC** (`2-bmc`): Name-only bromo. No bag chorus. Do not invent a 4-BMC-lite.
- **4-EMC** (`4-emc`): Thin N-alkyl. Old-head closest-to-meow rumor. Do not interpolate a 3-digit 4-MMC-lite.
- **3-MEC** (`3-mec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **2-MEC** (`2-mec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **4-EEC** (`4-eec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **3-EEC** (`3-eec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **4-CEC** (`4-cec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **3-CEC** (`3-cec`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **4-MEAP** (`4-meap`): N-alkyl / ring stamp with thin dedicated head-to-heads. Do not interpolate a 4-MMC-lite.
- **α-POP (PV-9)** (`alpha-pop`): Vendor crate. Almost no clean solo feel. Do not invent a slightly weaker PV-8.
- **MDPOP (MD-PV9)** (`mdpop`): Catalog hit. No trip-report shelf.
- **5-DBFPV (3-desoxy-MDPV)** (`5-dbfpv`): 2014 almost-MD. Handful of posts. Do not invent a slightly weaker MDPV.
- **2,3-MDPV** (`23-mdpv`): Ring-position isomer bait. Barely a product.
- **MPBP** (`mpbp`): Old catalog cousin. No reliable modern feel chorus.
- **MOPPP (4-MeO-α-PPP)** (`moppp`): Methoxy cousin. Literature leftover.
- **naphyrone (NRG-1)** (`naphyrone`): Identity trap. Most NRG-1 bags were not naphyrone (often MDPV).
- **α-PVT** (`alpha-pvt`): Sulfur-ring odd crate.
- **α-PBT** (`alpha-pbt`): Thienyl cousin. Forensic name, not a chorus.
- **TH-PVP** (`th-pvp`): Tetralin pyro. Museum shelf.
- **5-PPDI** (`5-ppdi`): Indane pyro. Dusty vendor SKU.
- **5-BPDI** (`5-bpdi`): Indane pyro. Same dusty shelf.
- **4F-α-PVP** (`4f-alpha-pvp`): Fluoro stamp. Not enough H2H to invent a 3-digit E.
- **4Cl-α-PVP** (`4cl-alpha-pvp`): Chloro stamp. Forensic, not a ranked night.
- **4-Me-α-PVP** (`4me-alpha-pvp`): Name also points at pyrovalerone. Not a second mountain.
- **4F-α-PHP** (`4f-alpha-php`): Fluoro PHP. n too thin to interpolate off PHP.
- **4F-PV8** (`4f-pv8`): STRIDA copycat. No confident feel table.
- **3F-α-PiHP** (`3f-alpha-pihp`): Current isomer stamp. Do not print a 3×4 grid.
- **4F-α-PiHP** (`4f-alpha-pihp`): Fluoro PiHP. Seized; feel not triangulated.
- **2-Me-α-PiHP** (`2me-alpha-pihp`): Swedish casework isomer. No forum mountain.
- **3-Me-α-PiHP** (`3me-alpha-pihp`): Swedish casework isomer. No forum mountain.
- **4-Me-α-PiHP** (`4me-alpha-pihp`): Swedish casework isomer. No forum mountain.
- **3-CPM** (`3-cpm`): Chloro 3-FPM. Detected; trail too thin.
- **Synthacaine (blend)** (`synthacaine`): Brand, not a molecule. Often MPA + 2-AI.
- **2-AI** (`2-ai`): Sat in Synthacaine mixes. Thin solo chorus.
- **2-MeO-ketamine** (`2-meo-ketamine`): Boring ortho-MeO. Not MXE.
- **2-BDCK** (`2-bdck`): Bromo-DCK. Rare / rough.
- **street FXE (sticker)** (`street-fxe-sticker`): Identity trap. After ~2022 usually CanKet / 2F-NENDCK.
- **3-DMXE / 3DMXE (sticker)** (`3-dmxe-sticker`): Identity trap. 3-DMXE = DMXE branding.
- **3-F-PCP** (`3-f-pcp`): Later fluoro. n too thin.
- **3-MeO-PCPy** (`3-meo-pcpy`): Pyrrolidine N-swap. Thin vs 3-MeO-PCP.
- **3-Me-PCE** (`3-me-pce`): Later methyl stamp. Vendor-thin.
- **3-MeO-PCMo** (`3-meo-pcmo`): Morpholine. Weak.
- **TCP** (`tcp`): Thiophene leftover. Museum.
- **3,4-MD-PCP** (`34-md-pcp`): MD leftover. Museum.
- **fluorolintane** (`fluorolintane`): Rare diaryl. One bottle.
- **6-MAPB** (`6-mapb`): Rare bags. Human file too thin.
- **6-EAPB** (`6-eapb`): Later stamp. Barely a product.
- **tusi / pink cocaine (color)** (`tusi`): Identity trap. A color, usually ketamine ± extras. Not 2C-B. Not cocaine.
- **Orange Sunshine (alias)** (`orange-sunshine`): Identity trap. Orange Sunshine = LSD.

## Headliner Strength_W1 (stim wall)

| SKU | P | E | R | D | Strength_W1 |
|---|---:|---:|---:|---:|---:|
| caffeine | 0.05 | 5 | 5 | 240 | 1.25 |
| amphetamine (racemic) | 1.2 | 105 | 78 | 240 | 9828 |
| dextroamphetamine (Dexedrine) | 1.35 | 112 | 75 | 270 | 11340 |
| lisdexamfetamine (Vyvanse) | 0.45 | 40 | 12 | 480 | 216 |
| cocaine | 1 | 100 | 100 | 50 | 10000 |
| methamphetamine | 2.1 | 165 | 200 | 360 | 69300 |
| 4-MMC (mephedrone) | 1.4 | 200 | 160 | 75 | 44800 |
| 3-MMC | 1.2 | 145 | 130 | 60 | 22620 |
| NEP (N-ethylpentedrone) | 1.5 | 95 | 115 | 210 | 16387.5 |
| hexen (N-ethylhexedrone) | 1.25 | 70 | 100 | 90 | 8750 |
| α-PPP | 2.2 | 150 | 280 | 32 | 92400 |
| α-PVP (flakka) | 5 | 250 | 350 | 90 | 437500 |
| α-PHP (PV-7) | 4.2 | 220 | 300 | 55 | 277200 |
| α-PiHP | 4.4 | 210 | 290 | 50 | 267960 |
| MDPV | 4.5 | 230 | 310 | 210 | 320850 |
| MDPHP | 3.6 | 185 | 240 | 150 | 159840 |
| ethylphenidate (EPH) | 1.8 | 105 | 120 | 50 | 22680 |
| 4-FA | 1.1 | 145 | 70 | 300 | 11165 |
| 2-FMA | 0.7 | 42 | 16 | 390 | 470.4 |
| 4F-MPH | 1.5 | 65 | 40 | 360 | 3900 |
