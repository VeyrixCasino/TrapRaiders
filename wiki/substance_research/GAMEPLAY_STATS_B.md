# GAMEPLAY_STATS_B — Maker B board

Game catalog. **Not a cook book.** Label: `gameplay_estimate`.

Independent second board. Catalogue only. **Did not read GAMEPLAY_STATS_A.** Did not write engine/calculator code or `GAMEPLAY_RESPONSE.md`.

## Locked architecture v2

| Substance | P | E | R |
|---|---:|---:|---:|
| Caffeine | **0.05** | **5** | **5** |
| Cocaine | **1.00** | **100** | **100** |
| α-PVP | **5.00** | **250** | **350** |

100 is a coke **reference**, not a cap. Other stims/caths/pyros are placed **relative** to these three. α-PVP Duration = **90** (designer mix). Forum often writes a shorter bang; residual wake is `HalfLife` 140, not a reason to change the 90.

## Formula (verbatim)

```
Strength[i] = Weight[i] * Potency[i] * Euphoria[i] * Rush[i]
TotalStrength = SUM(Strength[i])
WeightedDuration = SUM(Strength[i] * Duration[i]) / MAX(SUM(Strength[i]), epsilon)
Enjoyment = TotalStrength / MAX(WeightedDuration, epsilon)
Satisfaction = Enjoyment / (1 + Comedown + Aftereffects)
```

Live Hill / RemainingExposure (engine only — **not** batch Strength):

```
RemainingExposure[i] = PreviousExposure[i] * pow(0.5, ElapsedTime / HalfLife[i])
EffectiveExposure[i] = ActiveExposure[i] * Potency[i] * ToleranceResponse[i]
Activation[i] = pow(EffectiveExposure[i], CurveSharpness) / (pow(ResponseMidpoint, CurveSharpness) + pow(EffectiveExposure[i], CurveSharpness))
CurrentEuphoria[i] = EuphoriaWall[i] * Activation[i]
```

**Batch Strength** uses catalogue E/R **walls**. Enjoyment is uncapped. **Live Hill** is a separate runtime view (engine `CurveSharpness=2`, `ResponseMidpoint=1.0`). Those are **not** per-drug catalogue fields. Duration ≠ HalfLife. Economy ≠ Enjoyment. Do not invent Rush to keep Strength off zero — flag it. No price-from-P. Thin SKUs null. Dissos / psychs / empathogens are class-local, off the stim Strength ladder. Do not auto-rank MDPV or α-PPP above α-PVP.

## Mix sanity (designer lock)

20 α-PVP + 80 caffeine. Locked mix uses caffeine **Duration = 240** (worked example), not this board's catalogue D=150.

| part | W | P | E | R | Strength |
|---|---:|---:|---:|---:|---:|
| α-PVP | 20 | 5.00 | 250 | 350 | **8,750,000** |
| caffeine | 80 | 0.05 | 5 | 5 | **100** |

```
S_αPVP     = 20 × 5 × 250 × 350 = 8,750,000
S_caffeine = 80 × 0.05 × 5 × 5  = 100
S_total    = 8,750,100
Dmix       = (8,750,000 × 90 + 100 × 240) / 8,750,100 ≈ 90.002
J          = 8,750,100 / 90.002 ≈ 97,221
```

Live Hill at qty 0.5 on α-PVP **will** sit near the wall because P=5. That is accepted. Anchors were not moved to make half-bag CurrentE look nicer.

## Headliners (Weight=1 batch + illustrative CurrentE)

CurrentE uses engine Hill (k=2, midpoint=1) for display only.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enjoyment | Sat | CE 0.5 / 1.0 / 2.5 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| **Caffeine** | 0.05 | 5 | 5 | 150 | 180 | 0.05 | 0.02 | 1.25 | 0.008 | 0.008 | 0 / 0.01 / 0.08 |
| **Cocaine** | 1 | 100 | 100 | 50 | 36 | 0.35 | 0.25 | 10000 | 200 | 125 | 20 / 50 / 86.21 |
| **α-PVP** | 5 | 250 | 350 | 90 | 140 | 1.85 | 1.55 | 437500 | 4861.111 | 1104.798 | 215.52 / 240.38 / 248.41 |
| **4-MMC (mephedrone)** | 1.5 | 180 | 125 | 70 | 95 | 0.5 | 0.35 | 33750 | 482.143 | 260.618 | 64.8 / 124.62 / 168.05 |
| **Lisdexamfetamine (Vyvanse)** | 1 | 22 | 8 | 500 | 450 | 0.15 | 0.12 | 176 | 0.352 | 0.277 | 4.4 / 11 / 18.97 |
| **Dextroamphetamine** | 2.1 | 100 | 72 | 280 | 240 | 0.25 | 0.18 | 15120 | 54 | 37.762 | 52.44 / 81.52 / 96.5 |
| **Methamphetamine** | 3 | 155 | 200 | 400 | 340 | 0.65 | 0.55 | 93000 | 232.5 | 105.682 | 107.31 / 139.5 / 152.29 |
| **NEP (N-ethylpentedrone)** | 1.8 | 85 | 75 | 200 | 280 | 0.75 | 0.65 | 11475 | 57.375 | 23.906 | 38.04 / 64.95 / 81 |
| **MDPV** | 4.3 | 220 | 300 | 210 | 180 | 1.7 | 1.45 | 283800 | 1351.429 | 325.645 | 180.87 / 208.71 / 218.11 |
| **α-PPP** | 2.3 | 140 | 180 | 32 | 50 | 0.7 | 0.45 | 57960 | 1811.25 | 842.442 | 79.72 / 117.74 / 135.89 |

### Relative proofs

- **Locks match.** Caffeine 0.05/5/5 · coke 1/100/100 · α-PVP 5/250/350 · α-PVP Duration 90.
- **4-MMC vs coke (batch):** Strength 33750 vs 10000. Enjoyment 482.143 vs 200. Wall E is 180, not 280–360.
- **Homework:** Vyvanse Strength 176 · 2-FMA 230.4 · 4F-MPH 672 vs coke 10,000. Walls stay homework even when P is not tiny.
- **Dex near coke, not meow:** E 100 vs coke 100 vs 4-MMC 180. P 2.1 sits between coke and meth.
- **Meth loses 4-MMC on E wall** (155 vs 180); meth wins P and R.
- **MDPV under PVP:** P 4.3<5 · E 220<250 · R 300<350. α-PPP P 2.3 / E 140 / R 180 is slam-flag, not #1. **MDPV Duration = 210** (`gameplay_estimate`, house sit of the 180–240 band). HalfLife **180**. Retracted 48 must not return. α-PVP stays 90 / 140. Enjoyment 1351.429 · Satisfaction 325.645 (`J = Strength / 210`).

Scored **143**. Null placeholders **101**. Total **244**.

## 1. Everyday / xanthines

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Caffeine** | 0.05 | 5 | 5 | 150 | 180 | 0.05 | 0.02 | 1.25 | 0.008 | 0.008 | Very low rush (homework / grind). Not padded to inflate Strength. | A |
| **Nicotine** | 0.2 | 12 | 28 | 8 | 22 | 0.1 | 0.05 | 67.2 | 8.4 | 7.304 | — | A |

Sources:
- Caffeine: [House everyday SKU](wiki/substance_research/30_taxonomy_expansion.md)
- Caffeine: [PsychonautWiki Caffeine](https://psychonautwiki.org/wiki/Caffeine)
- Nicotine: [House everyday SKU](wiki/substance_research/30_taxonomy_expansion.md)

## 2. Amphetamines

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Amphetamine (racemic)** | 2 | 92 | 80 | 250 | 210 | 0.28 | 0.2 | 14720 | 58.88 | 39.784 | — | A |
| **Dextroamphetamine** | 2.1 | 100 | 72 | 280 | 240 | 0.25 | 0.18 | 15120 | 54 | 37.762 | — | A |
| **Adderall IR** | 2.05 | 98 | 75 | 240 | 210 | 0.26 | 0.18 | 15067.5 | 62.781 | 43.598 | — | B |
| **Lisdexamfetamine (Vyvanse)** | 1 | 22 | 8 | 500 | 450 | 0.15 | 0.12 | 176 | 0.352 | 0.277 | Very low rush (homework / grind). Not padded to inflate Strength. | A |
| **Methamphetamine** | 3 | 155 | 200 | 400 | 340 | 0.65 | 0.55 | 93000 | 232.5 | 105.682 | — | A |
| **Levoamphetamine** | 1.4 | 40 | 32 | 220 | 190 | 0.22 | 0.18 | 1792 | 8.145 | 5.818 | — | C |
| **Phentermine** | 0.8 | 16 | 8 | 300 | 260 | 0.12 | 0.08 | 102.4 | 0.341 | 0.284 | Very low rush (homework / grind). Not padded to inflate Strength. | B |
| **N-Ethylamphetamine** | 1.8 | 62 | 50 | 220 | 190 | 0.25 | 0.18 | 5580 | 25.364 | 17.737 | — | C |
| **Fenethylline (Captagon stamp)** | 1.9 | 70 | 55 | 360 | 300 | 0.3 | 0.22 | 7315 | 20.319 | 13.368 | — | C |
| **2-FA** | 1.3 | 45 | 35 | 180 | 160 | 0.22 | 0.16 | 2047.5 | 11.375 | 8.243 | — | B |
| **2-FMA** | 1.2 | 24 | 8 | 380 | 320 | 0.2 | 0.15 | 230.4 | 0.606 | 0.449 | Very low rush (homework / grind). Not padded to inflate Strength. | A |
| **3-FA** | 2.2 | 125 | 85 | 240 | 200 | 0.3 | 0.22 | 23375 | 97.396 | 64.076 | — | B |
| **3-FMA** | 2 | 95 | 55 | 280 | 230 | 0.28 | 0.2 | 10450 | 37.321 | 25.217 | — | C |
| **4-FA** | 1.8 | 130 | 65 | 300 | 240 | 0.4 | 0.35 | 15210 | 50.7 | 28.971 | — | A |
| **4-FMA** | 2 | 135 | 62 | 360 | 290 | 0.42 | 0.36 | 16740 | 46.5 | 26.124 | — | B |
| **3-FEA** | 1.7 | 105 | 48 | 200 | 170 | 0.28 | 0.2 | 8568 | 42.84 | 28.946 | — | C |
| **PMA** | 1.5 | 38 | 22 | 360 | 400 | 0.9 | 1.2 | 1254 | 3.483 | 1.124 | — | A |
| **PMMA** | 1.5 | 42 | 24 | 360 | 400 | 0.9 | 1.2 | 1512 | 4.2 | 1.355 | — | A |
| **4-MA** | 1.6 | 50 | 40 | 200 | 180 | 0.35 | 0.3 | 3200 | 16 | 9.697 | — | C |
| **Methiopropamine (MPA)** | 1.5 | 40 | 28 | 180 | 160 | 0.22 | 0.16 | 1680 | 9.333 | 6.763 | — | B |

Sources:
- Amphetamine (racemic): [Erowid Amphetamines](https://www.erowid.org/chemicals/amphetamines/amphetamines.shtml)
- Amphetamine (racemic): [House 07 card](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Dextroamphetamine: [Erowid Amphetamines](https://www.erowid.org/chemicals/amphetamines/amphetamines.shtml)
- Dextroamphetamine: [House Dex card](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Adderall IR: [House Dex/amp cards](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Lisdexamfetamine (Vyvanse): [House Vyvanse card](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Methamphetamine: [r/researchchemicals meth vs a-PVP](https://www.reddit.com/r/researchchemicals/comments/6m4bae/methamphetamine_vs_apvp/)
- Methamphetamine: [r/Stims a-PVP rush vs meth/4-MMC](https://www.reddit.com/r/Stims/comments/y4v83f/apvp_rush_compared_to_meth_or_4mmc/)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **2-FEA** | Months on market; no reliable feel chorus. |
| **4-FEA** | Seizure name. Almost no clean solo reports. |
| **PMEA** | Named analog. No feel chorus. |
| **4-MTA** | Scare analog. Thin recreational file. |

## 3. Phenidates

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Methylphenidate (IR)** | 1.4 | 42 | 32 | 180 | 150 | 0.2 | 0.14 | 1881.6 | 10.453 | 7.801 | — | A |
| **Concerta / MPH XR** | 0.9 | 22 | 10 | 480 | 420 | 0.16 | 0.12 | 198 | 0.413 | 0.322 | Very low rush (homework / grind). Not padded to inflate Strength. | A |
| **Dexmethylphenidate** | 1.6 | 48 | 36 | 180 | 150 | 0.2 | 0.14 | 2764.8 | 15.36 | 11.463 | — | B |
| **Ethylphenidate (EPH)** | 2 | 82 | 115 | 38 | 35 | 0.55 | 0.28 | 18860 | 496.316 | 271.211 | — | A |
| **Isopropylphenidate** | 1.1 | 26 | 12 | 260 | 220 | 0.16 | 0.12 | 343.2 | 1.32 | 1.031 | Very low rush (homework / grind). Not padded to inflate Strength. | B |
| **4F-MPH** | 2.4 | 28 | 10 | 400 | 340 | 0.18 | 0.12 | 672 | 1.68 | 1.292 | Very low rush (homework / grind). Not padded to inflate Strength. | A |
| **4F-EPH** | 2.2 | 74 | 100 | 40 | 36 | 0.5 | 0.26 | 16280 | 407 | 231.25 | — | C |
| **3,4-CTMP** | 3.5 | 36 | 75 | 200 | 240 | 0.8 | 0.55 | 9450 | 47.25 | 20.106 | — | B |
| **2-DPMP (desoxypipradrol)** | 3.2 | 55 | 40 | 720 | 800 | 0.7 | 0.6 | 7040 | 9.778 | 4.251 | — | B |

Sources:
- Methylphenidate (IR): [Erowid Methylphenidate](https://www.erowid.org/chemicals/methylphenidate/methylphenidate.shtml)
- Concerta / MPH XR: [House Concerta band](wiki/substance_research/CALIBRATION.md)
- Dexmethylphenidate: [House dexMPH card](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Ethylphenidate (EPH): [PsychonautWiki Ethylphenidate](https://psychonautwiki.org/wiki/Ethylphenidate)
- Ethylphenidate (EPH): [House EPH card](wiki/substance_research/07_08_amphetamines_phenidates.md)
- Isopropylphenidate: [r/researchchemicals 2015 study-drug thread](wiki/substance_research/07_08_amphetamines_phenidates.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **Propylphenidate** | Vendor + paper. Few trip reports. |
| **4-Me-TMP** | Diet Ritalin leftover. No chorus. |
| **HDMP-28** | Odd crate. Thin human file. |
| **HDEP-28** | SERT-odd phenidate. Thin feel. |
| **N-Benzylethylphenidate** | Paper analog. No bag chorus. |
| **Methylmorphenate** | Weak on paper. No human chorus. |
| **3,4-DCEP** | Named analog. No feel trail. |

## 4. Cocaine / tropanes

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Cocaine** | 1 | 100 | 100 | 50 | 36 | 0.35 | 0.25 | 10000 | 200 | 125 | — | A |
| **Crack** | 1.4 | 105 | 160 | 12 | 18 | 0.55 | 0.4 | 23520 | 1960 | 1005.128 | — | A |
| **Coca paste (basuco / paco)** | 1.1 | 70 | 115 | 15 | 22 | 0.5 | 0.4 | 8855 | 590.333 | 310.702 | — | C |

Sources:
- Cocaine: [r/Drugs bath salts vs coke](https://www.reddit.com/r/Drugs/comments/1aqkea/bath_salt_drugs_mephedrone_methcathinone_etc_vs/)
- Cocaine: [r/researchchemicals 4-MMC vs cocaine](https://www.reddit.com/r/researchchemicals/comments/6bdhxt/4mmc_vs_cocaine/)
- Crack: [House crack card](wiki/substance_research/30_taxonomy_expansion.md)
- Crack: [Erowid Cocaine](https://www.erowid.org/chemicals/cocaine/cocaine.shtml)
- Coca paste (basuco / paco): [House coca paste card](wiki/substance_research/30_taxonomy_expansion.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **Dichloropane** | RC-era bag. No reliable feel chorus vs coke. |
| **Troparil** | Research leftover. Thin recreational file. |
| **Dimethocaine** | Legal-high coke mimic. Reports say local-anesthetic more than rush. |
| **4-Fluorotropacocaine** | Legal-high name. No clean feel card. |
| **Synthacaine** | Brand, not a molecule. Often MPA+2-AI. |

## 5. MMC / halogen / methoxy cathinones

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **4-MMC (mephedrone)** | 1.5 | 180 | 125 | 70 | 95 | 0.5 | 0.35 | 33750 | 482.143 | 260.618 | — | A |
| **3-MMC** | 1.35 | 130 | 100 | 65 | 85 | 0.45 | 0.3 | 17550 | 270 | 154.286 | — | B |
| **2-MMC** | 1.2 | 80 | 70 | 40 | 55 | 0.3 | 0.22 | 6720 | 168 | 110.526 | — | C |
| **4-CMC** | 1.4 | 135 | 105 | 60 | 85 | 0.6 | 0.5 | 19845 | 330.75 | 157.5 | — | B |
| **3-CMC** | 1.35 | 120 | 95 | 70 | 90 | 0.5 | 0.4 | 15390 | 219.857 | 115.714 | — | B |
| **4-FMC (flephedrone)** | 1.2 | 68 | 58 | 50 | 65 | 0.3 | 0.22 | 4732.8 | 94.656 | 62.274 | — | B |
| **Methcathinone** | 2 | 115 | 88 | 90 | 100 | 0.4 | 0.3 | 20240 | 224.889 | 132.288 | — | B |
| **Methedrone (bk-PMMA)** | 1.4 | 48 | 35 | 180 | 220 | 0.85 | 1.1 | 2352 | 13.067 | 4.429 | — | B |
| **Mexedrone** | 0.9 | 28 | 18 | 50 | 60 | 0.15 | 0.12 | 453.6 | 9.072 | 7.143 | — | B |
| **3,4-DMMC** | 1.4 | 128 | 90 | 70 | 90 | 0.4 | 0.3 | 16128 | 230.4 | 135.529 | — | C |

Sources:
- 4-MMC (mephedrone): [r/researchchemicals 4-MMC vs cocaine](https://www.reddit.com/r/researchchemicals/comments/6bdhxt/4mmc_vs_cocaine/)
- 4-MMC (mephedrone): [r/Drugs euphoria meow vs meth vs coke](https://www.reddit.com/r/Drugs/comments/3rjfhk/euphoria_mephedrone_vs_methamphetamine_vs_cocaine/)
- 3-MMC: [Bluelight 3-MMC vs 4-MMC](https://www.bluelight.org/community/threads/3-mmc-vs-4-mmc-how-do-they-measure-up.903769/)
- 3-MMC: [r/researchchemicals 3 vs 4 feel](https://www.reddit.com/r/researchchemicals/comments/1e05gb4/3mmc_or_4mmc_what_are_the_differences_in_feeling/)
- 2-MMC: [EUDA EDR synthetic stimulants](https://www.euda.europa.eu/publications/european-drug-report/2026/synthetic-stimulants_en)
- 4-CMC: [House 4-CMC card](wiki/substance_research/01_cathinones_mmc.md)
- 3-CMC: [House 3-CMC card](wiki/substance_research/01_cathinones_mmc.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **2-CMC** | Flood SKU / isomer. No clean feel chorus. |
| **3-FMC** | Positional leftover. Thin human file. |
| **2-FMC** | Positional leftover. Thin human file. |
| **4-BMC** | Rare bromo. Vendor dust. No interpolation from 4-CMC. |
| **3-BMC** | Rare bromo. No human feel trail. |
| **2-BMC** | Name only. No bag chorus. |
| **2,4-DMMC** | Isomer name. No clean solo feel. |
| **2,3-DMMC** | Isomer name. No bag chorus. |
| **3-MeOMC** | Methoxy leftover. Thin. |
| **2-MeOMC** | Methoxy leftover. Thin. |

## 6. Extended-chain / N-alkyl cathinones

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **NEP (N-ethylpentedrone)** | 1.8 | 85 | 75 | 200 | 280 | 0.75 | 0.65 | 11475 | 57.375 | 23.906 | — | A |
| **Hexen (N-ethylhexedrone)** | 1.7 | 62 | 88 | 70 | 85 | 0.85 | 0.4 | 9275.2 | 132.503 | 58.89 | — | A |
| **Pentedrone** | 1.3 | 32 | 38 | 90 | 110 | 0.28 | 0.2 | 1580.8 | 17.564 | 11.868 | — | B |
| **4-MEC** | 1.2 | 52 | 75 | 25 | 50 | 0.35 | 0.4 | 4680 | 187.2 | 106.971 | — | B |
| **Hexedrone** | 1.3 | 38 | 40 | 80 | 100 | 0.28 | 0.2 | 1976 | 24.7 | 16.689 | — | C |
| **Buphedrone** | 1.3 | 45 | 42 | 70 | 90 | 0.28 | 0.2 | 2457 | 35.1 | 23.716 | — | C |
| **NEB** | 1.5 | 75 | 65 | 80 | 100 | 0.32 | 0.24 | 7312.5 | 91.406 | 58.594 | — | C |
| **4-MPD** | 1.3 | 36 | 40 | 80 | 100 | 0.28 | 0.2 | 1872 | 23.4 | 15.811 | — | C |
| **Ethcathinone** | 1.5 | 70 | 55 | 90 | 110 | 0.3 | 0.22 | 5775 | 64.167 | 42.215 | — | C |

Sources:
- NEP (N-ethylpentedrone): [r/researchchemicals NEP vs Hexen rundown](https://www.reddit.com/r/researchchemicals/comments/93dzhf/nep_vs_hexen_the_full_rundown_and_experience_of/)
- NEP (N-ethylpentedrone): [PsychonautWiki NEP](https://psychonautwiki.org/wiki/N-Ethylpentedrone)
- Hexen (N-ethylhexedrone): [r/researchchemicals NEP vs Hexen](https://www.reddit.com/r/researchchemicals/comments/93dzhf/nep_vs_hexen_the_full_rundown_and_experience_of/)
- Hexen (N-ethylhexedrone): [PsychonautWiki N-Ethylhexedrone](https://psychonautwiki.org/wiki/N-Ethylhexedrone)
- Pentedrone: [WHO ECDD pentedrone](https://ecddrepository.org/en/pentedrone)
- Pentedrone: [House pentedrone card](wiki/substance_research/02_cathinones_extended_nalkyl.md)
- 4-MEC: [Erowid four-cathinone study](https://www.erowid.org/chemicals/4_methylethcathinone/4_methylethcathinone.shtml)
- 4-MEC: [House 4-MEC card](wiki/substance_research/02_cathinones_extended_nalkyl.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **3-MEC** | Thin N-alkyl. Cover-band rumor. Do not interpolate a 4-MMC-lite. |
| **4-MEAP** | Thin N-alkyl. A few 2018 posts is not a wall. Do not interpolate hexen-lite. |
| **4-EMC** | Thin N-alkyl. Old-head closest-to-meow rumor. Do not invent a 3-digit meow wall. |
| **2-MEC** | Positional leftover. No chorus. |
| **4-EEC** | Ethyl/ethyl stamp. Thinner copy. No interpolation. |
| **3-EEC** | Thin N-alkyl. No feel chorus. |
| **4-CEC** | Advertised empty. Chloro rumor. No invented 4-MMC-lite. |
| **3-CEC** | Halogen/ethyl leftover. Thin. |
| **N-ethylheptedrone** | Longer N-ethyl. Thin human file. |
| **Heptedrone** | Chain leftover. No chorus. |
| **4-Cl-NEP** | Halogen NEP. No clean feel. |
| **N-isopropylpentedrone** | Literature N-alkyl. No bag feel. |
| **N-butylhexedrone** | Thin N-alkyl. No reports. |
| **N-isobutylhexedrone (NDH)** | Forensic name. No feel. |
| **Benzedrone** | Historical N-benzyl. No modern chorus. |
| **NRG-2** | Packet alias, usually 4-MEC ± extras. Not a molecule. |

## 7. Methylenedioxy cathinones

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Methylone** | 1.4 | 140 | 70 | 90 | 110 | 0.4 | 0.3 | 13720 | 152.444 | 89.673 | — | A |
| **Ethylone** | 1.2 | 100 | 50 | 100 | 120 | 0.35 | 0.28 | 6000 | 60 | 36.81 | — | B |
| **Butylone** | 1.15 | 85 | 46 | 140 | 160 | 0.32 | 0.26 | 4496.5 | 32.118 | 20.328 | — | B |
| **Pentylone** | 1.4 | 90 | 56 | 150 | 170 | 0.45 | 0.35 | 7056 | 47.04 | 26.133 | — | C |
| **Eutylone** | 1.45 | 110 | 62 | 150 | 170 | 0.48 | 0.38 | 9889 | 65.927 | 35.444 | — | B |
| **Ephylone (N-ethylpentylone)** | 1.6 | 75 | 65 | 180 | 200 | 0.7 | 0.6 | 7800 | 43.333 | 18.841 | — | B |
| **Dipentylone** | 1.5 | 68 | 52 | 160 | 180 | 0.5 | 0.4 | 5304 | 33.15 | 17.447 | — | C |

Sources:
- Methylone: [Erowid Methylone](https://www.erowid.org/chemicals/methylone/methylone.shtml)
- Methylone: [House methylone card](wiki/substance_research/03_cathinones_methylenedioxy.md)
- Ethylone: [House ethylone card](wiki/substance_research/03_cathinones_methylenedioxy.md)
- Butylone: [House butylone card](wiki/substance_research/03_cathinones_methylenedioxy.md)
- Pentylone: [House pentylone card](wiki/substance_research/03_cathinones_methylenedioxy.md)
- Eutylone: [House eutylone card](wiki/substance_research/03_cathinones_methylenedioxy.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **Dimethylone** | Vendor filler. No feel chorus. |
| **Dibutylone** | Vendor filler. No feel chorus. |
| **BMDP** | Forensic MD-cath. No human feel. |
| **2,3-Methylone** | Ring isomer. Literature, not a night. |

## 8. Unsubstituted α-pyros

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **α-PPP** | 2.3 | 140 | 180 | 32 | 50 | 0.7 | 0.45 | 57960 | 1811.25 | 842.442 | — | B |
| **α-PBP** | 2.8 | 115 | 110 | 50 | 70 | 0.55 | 0.4 | 35420 | 708.4 | 363.282 | — | B |
| **α-PVP** | 5 | 250 | 350 | 90 | 140 | 1.85 | 1.55 | 437500 | 4861.111 | 1104.798 | — | A |
| **α-PHP** | 4.2 | 210 | 300 | 55 | 85 | 1.2 | 0.9 | 264600 | 4810.909 | 1551.906 | — | A |
| **α-PiHP** | 4.5 | 200 | 320 | 50 | 80 | 1.9 | 1.6 | 288000 | 5760 | 1280 | — | A |
| **α-PEP (PV-8)** | 2.6 | 88 | 84 | 45 | 70 | 0.7 | 0.55 | 19219.2 | 427.093 | 189.819 | — | C |
| **α-PCYP (cyclohexyl)** | 3.8 | 32 | 12 | 200 | 220 | 0.35 | 0.28 | 1459.2 | 7.296 | 4.476 | Very low rush (homework / grind). Not padded to inflate Strength. | B |

Sources:
- α-PPP: [r/researchchemicals α-PPP nasal garbage](https://www.reddit.com/r/researchchemicals/comments/9rwrra/appp_or_alphapyrrolidinopropiophenone/)
- α-PPP: [House α-PPP slam card](wiki/substance_research/04_pyros_unsubstituted.md)
- α-PBP: [r/Stims α-PXP comparison](https://www.reddit.com/r/Stims/comments/2h7nvb/comparison_%CE%B1ppp_%CE%B1pvp_%CE%B1pbp_%CE%B1php_mdpv/)
- α-PBP: [House α-PBP card](wiki/substance_research/04_pyros_unsubstituted.md)
- α-PVP: [r/researchchemicals a-PVP vs crack/meth](https://www.reddit.com/r/researchchemicals/comments/7uonak/can_someone_explain_the_difference_in_effects/)
- α-PVP: [r/Stims how can you enjoy a-PVP](https://www.reddit.com/r/Stims/comments/3lz72l/how_can_you_enjoy_apvp/)
- α-PHP: [r/Stims PXP comparison](https://www.reddit.com/r/Stims/comments/2h7nvb/comparison_%CE%B1ppp_%CE%B1pvp_%CE%B1pbp_%CE%B1php_mdpv/)
- α-PHP: [r/researchchemicals PHP vs PVP](https://www.reddit.com/r/researchchemicals/comments/7uonak/can_someone_explain_the_difference_in_effects/)
- α-PiHP: [r/researchchemicals flushed a-PiHP](https://www.reddit.com/r/researchchemicals/comments/168wgdv/i_flushed_apihp_down_the_toilet_yesterday/)
- α-PiHP: [r/researchchemicals strongest rush / most addictive](https://www.reddit.com/r/researchchemicals/comments/1jv01nd/strongest_rush_and_most_addictive_rcdrug_of_all/)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **α-POP (PV-9)** | Vendor crate. Almost no clean solo reports. |
| **α-PNP (PV-10)** | Bible said skip. One inactive post. |
| **Cyclopentyl α-PCYP analog** | Paper-only. No market SKU. |

## 9. MD-pyros

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **MDPV** | 4.3 | 220 | 300 | 210 | 180 | 1.7 | 1.45 | 283800 | 1351.429 | 325.645 | — | A |
| **MDPHP** | 3.8 | 195 | 260 | 150 | 95 | 1.1 | 0.95 | 192660 | 1284.4 | 421.115 | — | B |
| **MDPPP** | 2.2 | 125 | 80 | 75 | 70 | 0.4 | 0.3 | 22000 | 293.333 | 172.549 | — | B |

Sources:
- MDPV: [r/researchchemicals any pyros stronger than MDPV](https://www.reddit.com/r/researchchemicals/comments/1cr51ir/are_there_any_pyros_stronger_than_mdpv/)
- MDPV: [r/researchchemicals old-timers PHP/PVP/MDPV](https://www.reddit.com/r/researchchemicals/comments/bvtoem/some_of_you_old_timers_i_want_to_hear_your/)
- MDPHP: [House MDPHP card](wiki/substance_research/05_pyros_methylenedioxy.md)
- MDPHP: [PsychonautWiki MDPHP](https://psychonautwiki.org/wiki/MDPHP)
- MDPPP: [Bluelight MDPPP vs MDPV (yoyoman era)](wiki/substance_research/05_pyros_methylenedioxy.md)

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **MDPBP** | One tan-night anecdote (often +caffeine). Too thin to invent MDPV-lite. |
| **MDPiHP** | Forensic twin of MDPHP. Two wreck reports, not a feel table. |
| **MDPEP (MD-PV8)** | Later C7. Users called it a dead end. No invented mid-MDPV. |
| **MDPOP** | Catalog hit. No trip-report shelf. |
| **2,3-MDPV** | Forum bait. Seized samples in the paper were 3,4. |
| **5-DBFPV** | 2014 almost-MD. One Bluelight thread is not enough to emit MDPV-lite numbers. |

## 10. Substituted / unusual pyros

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **4-MePPP (MPPP)** | 1.8 | 52 | 38 | 60 | 80 | 0.25 | 0.18 | 3556.8 | 59.28 | 41.455 | — | B |
| **Pyrovalerone (Centroton / 4-Me-α-PVP)** | 2.4 | 85 | 70 | 90 | 110 | 0.4 | 0.3 | 14280 | 158.667 | 93.333 | — | B |
| **MPHP (PV-4)** | 2.7 | 92 | 78 | 70 | 95 | 0.55 | 0.4 | 19375.2 | 276.789 | 141.943 | — | C |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **MPBP** | Middle 4-Me. Thin feel vs α-PBP. |
| **MOPPP** | Methoxy cousin. One crate, no chorus. |
| **4F-α-PVP** | STRIDA name + vape talk, split reviews. Not enough to invent a PVP-lite. |
| **4Cl-α-PVP** | Halogen pyro zoo. Forensic, not a feel card. |
| **4F-α-PHP** | Halogen pyro zoo. Thin. |
| **4F-PV8** | Halogen pyro zoo. STRIDA blood ≠ a night. |
| **3F-α-PVP** | Loud in one comparison pile. Still a zoo stamp — no invented 3.30/155. |
| **3F-α-PiHP** | Current isomer stamp. Do not print a 3×4 grid or interpolate PiHP. |
| **4F-α-PiHP** | Isomer stamp. Thin feel. |
| **2-Me-α-PiHP** | Swedish casework name. No chorus. |
| **3-Me-α-PiHP** | Casework name. No chorus. |
| **4-Me-α-PiHP** | Casework name. No chorus. |
| **Naphyrone (NRG-1 label)** | Most NRG-1 bags were MDPV / other caths. Genuine naphyrone feel is not a table. |
| **α-PVT** | Thienyl odd crate. Thin. |
| **α-PBT** | Shorter thienyl. Thin. |
| **TH-PVP** | Tetralin sticker. Lab more than bag. |
| **5-PPDI** | Indane. No feel chorus. |
| **5-BPDI** | Indane. No feel chorus. |

## 11. Phenmetrazine / aminorex / piperazines

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **3-FPM** | 1.5 | 50 | 32 | 180 | 160 | 0.3 | 0.22 | 2400 | 13.333 | 8.772 | — | B |
| **Phenmetrazine** | 2 | 95 | 70 | 240 | 200 | 0.35 | 0.25 | 13300 | 55.417 | 34.635 | — | B |
| **4-MAR** | 2.3 | 150 | 55 | 600 | 520 | 0.35 | 0.3 | 18975 | 31.625 | 19.167 | — | B |
| **4,4'-DMAR** | 2 | 55 | 30 | 480 | 520 | 1.1 | 1.4 | 3300 | 6.875 | 1.964 | — | B |
| **Cyclazodone** | 1.2 | 40 | 22 | 300 | 260 | 0.2 | 0.15 | 1056 | 3.52 | 2.607 | — | C |
| **BZP** | 0.8 | 45 | 30 | 360 | 300 | 0.55 | 0.5 | 1080 | 3 | 1.463 | — | B |
| **BZP + TFMPP** | 0.9 | 58 | 32 | 360 | 300 | 0.55 | 0.5 | 1670.4 | 4.64 | 2.263 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **4-FPM** | Quieter twin. Caffeine/nootropic talk, not 3-FPM. |
| **2-FPM** | Lab isomer, not a bag. |
| **mCPP** | Adulterant more than a SKU people hunt. |
| **MDBZP** | Name confirmed. Reviews too thin. |

## 12. Empathogens

Class-local ladder: `empathogen`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **MDMA** | 1 | 100 | 100 | 240 | 200 | 0.45 | 0.4 | 10000 | 41.667 | 22.523 | — | A |
| **MDA** | 1.1 | 82 | 68 | 360 | 300 | 0.5 | 0.42 | 6133.6 | 17.038 | 8.874 | — | A |
| **MDEA** | 0.9 | 52 | 38 | 200 | 180 | 0.3 | 0.25 | 1778.4 | 8.892 | 5.737 | — | B |
| **MBDB** | 0.85 | 48 | 30 | 220 | 190 | 0.28 | 0.22 | 1224 | 5.564 | 3.709 | — | C |
| **5-MAPB** | 1.05 | 88 | 92 | 200 | 170 | 0.35 | 0.28 | 8500.8 | 42.504 | 26.076 | — | B |
| **6-APB** | 1 | 78 | 46 | 480 | 400 | 0.4 | 0.32 | 3588 | 7.475 | 4.346 | — | B |
| **5-APB** | 1.05 | 74 | 52 | 300 | 260 | 0.55 | 0.45 | 4040.4 | 13.468 | 6.734 | — | B |
| **MDAI** | 0.8 | 32 | 14 | 180 | 160 | 0.15 | 0.12 | 358.4 | 1.991 | 1.568 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **6-MAPB** | Rare bags. Do not print a second 5-MAPB legend. |
| **5-EAPB** | N-ethyl stamp. Forum disappointing. Thin. |
| **6-EAPB** | Barely a product. |
| **5-APDB** | Soft, meh. Worse MDAI talk. |
| **6-APDB** | Slightly shittier 6-APB. Thin. |

## 13. Ketamine-type dissociatives

Class-local ladder: `disso`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Ketamine** | 1 | 100 | 100 | 55 | 40 | 0.25 | 0.2 | 10000 | 181.818 | 125.392 | — | A |
| **DCK** | 1.1 | 88 | 66 | 130 | 110 | 0.22 | 0.18 | 6388.8 | 49.145 | 35.103 | — | A |
| **2F-DCK** | 1.05 | 84 | 80 | 80 | 65 | 0.28 | 0.22 | 7056 | 88.2 | 58.8 | — | B |
| **2F-NENDCK (CanKet)** | 1.08 | 78 | 76 | 100 | 85 | 0.28 | 0.22 | 6402.24 | 64.022 | 42.682 | — | B |
| **FXE (genuine 3-FXE)** | 1.1 | 82 | 72 | 90 | 75 | 0.3 | 0.24 | 6494.4 | 72.16 | 46.857 | — | C |
| **HXE** | 0.85 | 52 | 28 | 120 | 100 | 0.18 | 0.14 | 1237.6 | 10.313 | 7.813 | — | B |
| **NENK (ethketamine)** | 0.95 | 42 | 35 | 70 | 60 | 0.22 | 0.18 | 1396.5 | 19.95 | 14.25 | — | C |
| **Tiletamine** | 1 | 40 | 70 | 50 | 45 | 0.4 | 0.35 | 2800 | 56 | 32 | — | C |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **2-MeO-ketamine** | Boring ortho-MeO. Thin reviews. |
| **2-BDCK** | Rare bromo. Rough or empty. |
| **2-TFMDCK** | Hype thread. Almost never a bag. |
| **Tusi / pink cocaine** | Identity trap. A color, usually ketamine ± extras. Not 2C-B. Not cocaine. |
| **street FXE (sticker)** | Identity trap. Street FXE ≠ CanKet / 2F-NENDCK. After ~2022 usually CanKet. |

## 14. MXE / oxo-PCE

Class-local ladder: `disso`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **MXE** | 1.2 | 128 | 80 | 180 | 150 | 0.3 | 0.25 | 12288 | 68.267 | 44.043 | — | A |
| **DMXE** | 1.1 | 94 | 70 | 150 | 130 | 0.32 | 0.26 | 7238 | 48.253 | 30.54 | — | B |
| **MXPr** | 1.05 | 58 | 52 | 90 | 80 | 0.28 | 0.22 | 3166.8 | 35.187 | 23.458 | — | B |
| **MXiPr** | 1.08 | 68 | 58 | 100 | 90 | 0.35 | 0.28 | 4259.52 | 42.595 | 26.132 | — | C |
| **O-PCE** | 1.25 | 76 | 94 | 140 | 160 | 0.55 | 0.45 | 8930 | 63.786 | 31.893 | — | A |
| **MXM** | 1.1 | 72 | 50 | 160 | 140 | 0.25 | 0.2 | 3960 | 24.75 | 17.069 | — | C |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **3-DMXE / 3DMXE (sticker)** | Identity trap. 3-DMXE = DMXE branding. Not a second molecule. |
| **O-PCPr** | Named 2-oxo. Do not invent a personality. |
| **O-PCP** | Named 2-oxo. Thin. |

## 15. PCP family

Class-local ladder: `disso`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **PCP** | 1.2 | 74 | 68 | 300 | 280 | 0.5 | 0.55 | 6038.4 | 20.128 | 9.819 | — | A |
| **3-MeO-PCP** | 1.35 | 112 | 70 | 400 | 360 | 0.7 | 0.65 | 10584 | 26.46 | 11.26 | — | A |
| **3-HO-PCP** | 1.4 | 106 | 52 | 360 | 340 | 0.55 | 0.5 | 7716.8 | 21.436 | 10.456 | — | B |
| **3-Me-PCP** | 1.15 | 84 | 48 | 300 | 270 | 0.35 | 0.3 | 4636.8 | 15.456 | 9.367 | — | B |
| **3-Cl-PCP** | 1.2 | 70 | 45 | 280 | 250 | 0.4 | 0.35 | 3780 | 13.5 | 7.714 | — | C |
| **4-MeO-PCP** | 1 | 48 | 35 | 240 | 220 | 0.3 | 0.25 | 1680 | 7 | 4.516 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **3-F-PCP** | Later fluoro stamp. Thin feel. |
| **3-MeO-PCPy** | Pyrrolidine N-swap. Thin vs 3-MeO-PCP. |
| **3-Me-PCPy** | Pyrrolidine stamp. Thin. |

## 16. PCE / odd N

Class-local ladder: `disso`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **PCE** | 1.15 | 70 | 72 | 240 | 220 | 0.45 | 0.4 | 5796 | 24.15 | 13.054 | — | B |
| **3-MeO-PCE** | 1.25 | 88 | 74 | 240 | 220 | 0.55 | 0.5 | 8140 | 33.917 | 16.545 | — | B |
| **3-HO-PCE** | 1.2 | 52 | 38 | 200 | 190 | 0.3 | 0.25 | 2371.2 | 11.856 | 7.649 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **3-Me-PCE** | Later methyl stamp. Vendor-thin. |
| **3-MeO-PCPr** | N-propyl. Rare. |
| **PCMo / 3-MeO-PCMo** | Morpholine. Weak cough-syrup joke. |
| **TCP** | Thiophene Parke-Davis leftover. Museum. |

## 17. Diarylethylamines / other dissos

Class-local ladder: `disso`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **Diphenidine** | 1.05 | 38 | 32 | 240 | 260 | 0.45 | 0.4 | 1276.8 | 5.32 | 2.876 | — | B |
| **Ephenidine** | 1.1 | 84 | 48 | 300 | 280 | 0.5 | 0.45 | 4435.2 | 14.784 | 7.582 | — | B |
| **MXP (methoxphenidine)** | 1 | 44 | 28 | 280 | 260 | 0.35 | 0.3 | 1232 | 4.4 | 2.667 | — | B |
| **DXM** | 0.7 | 48 | 24 | 240 | 280 | 0.5 | 0.45 | 806.4 | 3.36 | 1.723 | — | A |
| **Nitrous oxide** | 0.55 | 38 | 78 | 1 | 2 | 0.05 | 0.02 | 1630.2 | 1630.2 | 1523.551 | — | A |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **Fluorolintane** | Rare diaryl. One bottle. |

## 18. 2C (named only)

Class-local ladder: `psych`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **2C-B** | 1 | 70 | 26 | 300 | 240 | 0.2 | 0.15 | 1820 | 6.067 | 4.494 | — | A |
| **2C-C** | 0.95 | 56 | 18 | 300 | 240 | 0.18 | 0.14 | 957.6 | 3.192 | 2.418 | — | B |
| **2C-D** | 0.9 | 44 | 16 | 240 | 200 | 0.15 | 0.12 | 633.6 | 2.64 | 2.079 | — | B |
| **2C-E** | 1.1 | 78 | 20 | 480 | 400 | 0.3 | 0.25 | 1716 | 3.575 | 2.306 | — | A |
| **2C-I** | 1.05 | 66 | 28 | 360 | 300 | 0.25 | 0.2 | 1940.4 | 5.39 | 3.717 | — | B |
| **2C-P** | 1.15 | 72 | 18 | 720 | 600 | 0.4 | 0.35 | 1490.4 | 2.07 | 1.183 | — | B |
| **2C-T-2** | 1.05 | 62 | 20 | 420 | 360 | 0.35 | 0.3 | 1302 | 3.1 | 1.879 | — | B |
| **2C-T-7** | 1.1 | 68 | 18 | 480 | 420 | 0.55 | 0.5 | 1346.4 | 2.805 | 1.368 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **2C alphabet (rest)** | No 2C alphabet on this board. Shulgin letters without a bag stay unnamed. |

## 19. NBOMe (three names)

Class-local ladder: `psych`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **25I-NBOMe** | 1.3 | 52 | 22 | 360 | 300 | 0.8 | 1.5 | 1487.2 | 4.131 | 1.252 | — | A |
| **25B-NBOMe** | 1.25 | 55 | 22 | 360 | 300 | 0.8 | 1.4 | 1512.5 | 4.201 | 1.313 | — | B |
| **25C-NBOMe** | 1.25 | 50 | 20 | 360 | 300 | 0.75 | 1.35 | 1250 | 3.472 | 1.12 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **NBOMe alphabet (25N/D/E/…)** | Do not add 25N, 25D, 25E, etc. |

## 20. DOx

Class-local ladder: `psych`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **DOM (STP)** | 1.15 | 74 | 18 | 840 | 720 | 0.45 | 0.4 | 1531.8 | 1.824 | 0.986 | — | A |
| **DOB** | 1.2 | 70 | 16 | 960 | 800 | 0.5 | 0.45 | 1344 | 1.4 | 0.718 | — | B |
| **DOI** | 1.18 | 72 | 16 | 900 | 760 | 0.48 | 0.42 | 1359.36 | 1.51 | 0.795 | — | B |
| **DOC** | 1.15 | 66 | 16 | 780 | 660 | 0.45 | 0.4 | 1214.4 | 1.557 | 0.842 | — | B |

Placeholders (`confidence: D`, `placeholder: true`):

| SKU | gap |
|---|---|
| **Bromo-DragonFLY** | One-off scare SKU. High OD flag. Not a family table. |

## 21. Tryptamines

Class-local ladder: `psych`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **DMT** | 1.15 | 86 | 88 | 10 | 8 | 0.15 | 0.1 | 8703.2 | 870.32 | 696.256 | — | A |
| **5-MeO-DMT** | 1.2 | 88 | 92 | 18 | 12 | 0.35 | 0.3 | 9715.2 | 539.733 | 327.111 | — | A |
| **4-AcO-DMT** | 1.05 | 82 | 38 | 300 | 240 | 0.25 | 0.18 | 3271.8 | 10.906 | 7.627 | — | A |
| **4-HO-MET** | 1 | 78 | 34 | 240 | 200 | 0.2 | 0.15 | 2652 | 11.05 | 8.185 | — | A |
| **4-HO-MiPT** | 1 | 74 | 30 | 280 | 230 | 0.22 | 0.16 | 2220 | 7.929 | 5.745 | — | B |
| **5-MeO-MiPT** | 1 | 68 | 28 | 300 | 250 | 0.25 | 0.18 | 1904 | 6.347 | 4.438 | — | B |

## 22. Lysergamides

Class-local ladder: `psych`. Strength here is not comparable to α-PVP.

| SKU | P | E | R | Dur | HL | CD | AE | Strength | Enj | Sat | rush flag | conf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|:---:|
| **LSD** | 1 | 100 | 32 | 540 | 420 | 0.2 | 0.15 | 3200 | 5.926 | 4.39 | — | A |
| **1P-LSD** | 0.95 | 94 | 30 | 540 | 420 | 0.2 | 0.15 | 2679 | 4.961 | 3.675 | — | A |
| **1cP-LSD** | 0.95 | 92 | 30 | 540 | 420 | 0.2 | 0.15 | 2622 | 4.856 | 3.597 | — | B |
| **ALD-52** | 0.95 | 96 | 30 | 540 | 420 | 0.2 | 0.15 | 2736 | 5.067 | 3.753 | — | B |
| **AL-LAD** | 1 | 84 | 36 | 360 | 280 | 0.18 | 0.14 | 3024 | 8.4 | 6.364 | — | B |
| **ETH-LAD** | 1.05 | 88 | 34 | 420 | 330 | 0.22 | 0.16 | 3141.6 | 7.48 | 5.42 | — | B |

## Null list

Thin rows stay **null**. No structure-inferred walls. No ChatGPT interpolation.

| SKU | gap |
|---|---|
| **2-FEA** | Months on market; no reliable feel chorus. |
| **4-FEA** | Seizure name. Almost no clean solo reports. |
| **PMEA** | Named analog. No feel chorus. |
| **4-MTA** | Scare analog. Thin recreational file. |
| **Propylphenidate** | Vendor + paper. Few trip reports. |
| **4-Me-TMP** | Diet Ritalin leftover. No chorus. |
| **HDMP-28** | Odd crate. Thin human file. |
| **HDEP-28** | SERT-odd phenidate. Thin feel. |
| **N-Benzylethylphenidate** | Paper analog. No bag chorus. |
| **Methylmorphenate** | Weak on paper. No human chorus. |
| **3,4-DCEP** | Named analog. No feel trail. |
| **Dichloropane** | RC-era bag. No reliable feel chorus vs coke. |
| **Troparil** | Research leftover. Thin recreational file. |
| **Dimethocaine** | Legal-high coke mimic. Reports say local-anesthetic more than rush. |
| **4-Fluorotropacocaine** | Legal-high name. No clean feel card. |
| **Synthacaine** | Brand, not a molecule. Often MPA+2-AI. |
| **2-CMC** | Flood SKU / isomer. No clean feel chorus. |
| **3-FMC** | Positional leftover. Thin human file. |
| **2-FMC** | Positional leftover. Thin human file. |
| **4-BMC** | Rare bromo. Vendor dust. No interpolation from 4-CMC. |
| **3-BMC** | Rare bromo. No human feel trail. |
| **2-BMC** | Name only. No bag chorus. |
| **2,4-DMMC** | Isomer name. No clean solo feel. |
| **2,3-DMMC** | Isomer name. No bag chorus. |
| **3-MeOMC** | Methoxy leftover. Thin. |
| **2-MeOMC** | Methoxy leftover. Thin. |
| **3-MEC** | Thin N-alkyl. Cover-band rumor. Do not interpolate a 4-MMC-lite. |
| **4-MEAP** | Thin N-alkyl. A few 2018 posts is not a wall. Do not interpolate hexen-lite. |
| **4-EMC** | Thin N-alkyl. Old-head closest-to-meow rumor. Do not invent a 3-digit meow wall. |
| **2-MEC** | Positional leftover. No chorus. |
| **4-EEC** | Ethyl/ethyl stamp. Thinner copy. No interpolation. |
| **3-EEC** | Thin N-alkyl. No feel chorus. |
| **4-CEC** | Advertised empty. Chloro rumor. No invented 4-MMC-lite. |
| **3-CEC** | Halogen/ethyl leftover. Thin. |
| **N-ethylheptedrone** | Longer N-ethyl. Thin human file. |
| **Heptedrone** | Chain leftover. No chorus. |
| **4-Cl-NEP** | Halogen NEP. No clean feel. |
| **N-isopropylpentedrone** | Literature N-alkyl. No bag feel. |
| **N-butylhexedrone** | Thin N-alkyl. No reports. |
| **N-isobutylhexedrone (NDH)** | Forensic name. No feel. |
| **Benzedrone** | Historical N-benzyl. No modern chorus. |
| **NRG-2** | Packet alias, usually 4-MEC ± extras. Not a molecule. |
| **Dimethylone** | Vendor filler. No feel chorus. |
| **Dibutylone** | Vendor filler. No feel chorus. |
| **BMDP** | Forensic MD-cath. No human feel. |
| **2,3-Methylone** | Ring isomer. Literature, not a night. |
| **α-POP (PV-9)** | Vendor crate. Almost no clean solo reports. |
| **α-PNP (PV-10)** | Bible said skip. One inactive post. |
| **Cyclopentyl α-PCYP analog** | Paper-only. No market SKU. |
| **MDPBP** | One tan-night anecdote (often +caffeine). Too thin to invent MDPV-lite. |
| **MDPiHP** | Forensic twin of MDPHP. Two wreck reports, not a feel table. |
| **MDPEP (MD-PV8)** | Later C7. Users called it a dead end. No invented mid-MDPV. |
| **MDPOP** | Catalog hit. No trip-report shelf. |
| **2,3-MDPV** | Forum bait. Seized samples in the paper were 3,4. |
| **5-DBFPV** | 2014 almost-MD. One Bluelight thread is not enough to emit MDPV-lite numbers. |
| **MPBP** | Middle 4-Me. Thin feel vs α-PBP. |
| **MOPPP** | Methoxy cousin. One crate, no chorus. |
| **4F-α-PVP** | STRIDA name + vape talk, split reviews. Not enough to invent a PVP-lite. |
| **4Cl-α-PVP** | Halogen pyro zoo. Forensic, not a feel card. |
| **4F-α-PHP** | Halogen pyro zoo. Thin. |
| **4F-PV8** | Halogen pyro zoo. STRIDA blood ≠ a night. |
| **3F-α-PVP** | Loud in one comparison pile. Still a zoo stamp — no invented 3.30/155. |
| **3F-α-PiHP** | Current isomer stamp. Do not print a 3×4 grid or interpolate PiHP. |
| **4F-α-PiHP** | Isomer stamp. Thin feel. |
| **2-Me-α-PiHP** | Swedish casework name. No chorus. |
| **3-Me-α-PiHP** | Casework name. No chorus. |
| **4-Me-α-PiHP** | Casework name. No chorus. |
| **Naphyrone (NRG-1 label)** | Most NRG-1 bags were MDPV / other caths. Genuine naphyrone feel is not a table. |
| **α-PVT** | Thienyl odd crate. Thin. |
| **α-PBT** | Shorter thienyl. Thin. |
| **TH-PVP** | Tetralin sticker. Lab more than bag. |
| **5-PPDI** | Indane. No feel chorus. |
| **5-BPDI** | Indane. No feel chorus. |
| **4-FPM** | Quieter twin. Caffeine/nootropic talk, not 3-FPM. |
| **2-FPM** | Lab isomer, not a bag. |
| **mCPP** | Adulterant more than a SKU people hunt. |
| **MDBZP** | Name confirmed. Reviews too thin. |
| **6-MAPB** | Rare bags. Do not print a second 5-MAPB legend. |
| **5-EAPB** | N-ethyl stamp. Forum disappointing. Thin. |
| **6-EAPB** | Barely a product. |
| **5-APDB** | Soft, meh. Worse MDAI talk. |
| **6-APDB** | Slightly shittier 6-APB. Thin. |
| **2-MeO-ketamine** | Boring ortho-MeO. Thin reviews. |
| **2-BDCK** | Rare bromo. Rough or empty. |
| **2-TFMDCK** | Hype thread. Almost never a bag. |
| **Tusi / pink cocaine** | Identity trap. A color, usually ketamine ± extras. Not 2C-B. Not cocaine. |
| **street FXE (sticker)** | Identity trap. Street FXE ≠ CanKet / 2F-NENDCK. After ~2022 usually CanKet. |
| **3-DMXE / 3DMXE (sticker)** | Identity trap. 3-DMXE = DMXE branding. Not a second molecule. |
| **O-PCPr** | Named 2-oxo. Do not invent a personality. |
| **O-PCP** | Named 2-oxo. Thin. |
| **3-F-PCP** | Later fluoro stamp. Thin feel. |
| **3-MeO-PCPy** | Pyrrolidine N-swap. Thin vs 3-MeO-PCP. |
| **3-Me-PCPy** | Pyrrolidine stamp. Thin. |
| **3-Me-PCE** | Later methyl stamp. Vendor-thin. |
| **3-MeO-PCPr** | N-propyl. Rare. |
| **PCMo / 3-MeO-PCMo** | Morpholine. Weak cough-syrup joke. |
| **TCP** | Thiophene Parke-Davis leftover. Museum. |
| **Fluorolintane** | Rare diaryl. One bottle. |
| **2C alphabet (rest)** | No 2C alphabet on this board. Shulgin letters without a bag stay unnamed. |
| **NBOMe alphabet (25N/D/E/…)** | Do not add 25N, 25D, 25E, etc. |
| **Bromo-DragonFLY** | One-off scare SKU. High OD flag. Not a family table. |

## Identity (binding)

- **3-DMXE = DMXE** sticker. Not a second molecule. Row `3-dmxe-sticker` is null.
- **Street FXE ≠ CanKet / 2F-NENDCK**. After ~2022 the bag is usually CanKet. Row `street-fxe-sticker` is null.
- **Naphyrone** packets were often MDPV. Genuine feel stays null.
- **α-PCYP** seized bag is **cyclohexyl**, not cyclopentyl. Homework stim on the pipe. Low R is flagged, not padded.
- **Tusi is a color**, not 2C-B and not cocaine. Usually ketamine ± extras.
- No opioid table. No 2C / NBOMe alphabet. Dissos / psychs stay off the coke Strength ladder. No price-from-P.
