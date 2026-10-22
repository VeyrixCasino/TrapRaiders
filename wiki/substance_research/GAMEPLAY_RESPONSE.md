# GAMEPLAY_RESPONSE — canonical scoring spec (LOCKED ARCHITECTURE v2)

Bellhaven / TrapRaiders. **Not a cookbook.** Catalogue numbers are `gameplay_estimate`.

This page owns the math. Makers fill **GameplayProfile** walls. Do **not** invent a different model. Do **not** implement the live server, calculator, tests, economy, or inventory here.

Strength / Enjoyment / Satisfaction are **retrospective product-rating scores** (equations below). WeightedDuration is a **product-rating metric only** — it does not drive live presence. `epsilon` is numerical protection only, not a drug stat.

---

## Locked gameplay anchors (not optional, not to be nerfed)

| Substance | P | E | R | Notes |
|---|---:|---:|---:|---|
| **Caffeine** | **0.05** | **5** | **5** | Desk perk. Tiny walls. |
| **Cocaine** | **1.00** | **100** | **100** | Named mundane stim. 100 is a **benchmark**, not a cap. |
| **α-PVP** | **5.00** | **250** | **350** | House pyro mountain. Designer tried it. D=90 / HL=140. |

Do **not** weaken α-PVP potency to "fix" half-bag Hill saturation. That was an earlier mistake. `P=5 / E=250 / R=350` stands.

House sit-call clocks (do not reopen the 180 vs 240 fight):

| Substance | Duration | HalfLife |
|---|---:|---:|
| **α-PVP** | **90** (locked mix example) | **140** |
| **MDPV** | **210** | **180** |

MDPV lasts way longer than α-PVP. A catalogue D ≤ 90 for MDPV (including a 48) is **wrong — do not ship**. Duration ≠ HalfLife. Residual wake is HalfLife, not a reason to move the 90.

`CurveSharpness` and `ResponseMidpoint` are **engine calibration**, not per-analogue research fields. Do not invent curve overrides for every SKU.

Place every other stim / cath / pyro **relative to these three anchors**. Do not auto-crown MDPV or α-PPP above α-PVP.

---

## Equations (verbatim, epsilon-safe)

```
Strength[i] = Weight[i] * Potency[i] * Euphoria[i] * Rush[i]

TotalStrength = SUM(Strength[i])

WeightedDuration =
    SUM(Strength[i] * Duration[i])
    / MAX(SUM(Strength[i]), epsilon)

Enjoyment = TotalStrength / MAX(WeightedDuration, epsilon)

Satisfaction = Enjoyment / (1 + Comedown + Aftereffects)
```

`epsilon` is numerical protection only, not a drug stat. Do not invent a different model.

Live Hill / RemainingExposure are **engine** concerns, not catalogue personality. Never feed Strength into live euphoria.

---

## Exponential-dominance proof (locked worked example)

**Do not change these numbers.** This is THE example of why the product is "exponential."

Worked example: **20% α-PVP / 80% caffeine**

| Stat | α-PVP | Caffeine |
|---|---:|---:|
| Weight | 20 | 80 |
| Potency | 5 | 0.05 |
| Euphoria | 250 | 5 |
| Rush | 350 | 5 |
| Duration | 90 min | 240 min |

```
S_αPVP     = 20 × 5 × 250 × 350 = 8,750,000
S_caffeine = 80 × 0.05 × 5 × 5  = 100
S_total    = 8,750,100
D_mix      = (8,750,000 × 90 + 100 × 240) / 8,750,100 ≈ 90.002 minutes
J          = 8,750,100 / 90.002 ≈ 97,221
```

20% by weight is ~**99.999%** of pleasurable strength (`8,750,000 / 8,750,100`).

Caffeine's 240 min **must not pull duration**. Strength-weighting keeps `D_mix` at ≈ 90.002 — the mountain's fun window.

Caffeine **still exists in the live engine** with its own half-life. `WeightedDuration` is a **product-rating metric only**.

---

## Twelve principles (designer-locked)

1. **Strength[i] = W × P × E × R.** The product is "exponential." A small Weight of a mountain analogue dominates a large Weight of a weak one.
2. **Duration weighting is by Strength, not mixture %.** 80% caffeine cannot drag a pyro mix to 240 minutes.
3. **Enjoyment = TotalStrength / MAX(WeightedDuration, epsilon).** Uncapped. 100 is not a ceiling.
4. **Satisfaction = Enjoyment / (1 + Comedown + Aftereffects).** Penalties are scalars ≥ 0. They do not lower walls.
5. **Live CurrentEuphoria is the Hill curve.** Never feed Strength into live euphoria.
6. **Duration ≠ HalfLife.** Duration is the pleasurable fun window (minutes). HalfLife is the gameplay decay constant for RemainingExposure only. Label HalfLife `gameplay_estimate`. Not clinical t½. Not a dose guide.
7. **Economy ≠ Enjoyment.** Never derive price from P / E / R.
8. **Compulsiveness ≠ Satisfaction.** A hated binge can still have huge Strength. Do not score C as if it were Satisfaction.
9. **Zero rush stays zero.** Flag for review. Do not invent an R to fill a hole.
10. **ResearchProfile and GameplayProfile stay separate.** Forum quotes do not become extra multipliers. Gameplay numbers do not pretend to be tox science.
11. **Thin / obscure SKUs are null.** Do not infer walls from structure (no 5-DBFPV as "slightly weaker MDPV," no halogen-pyro zoo interpolation).
12. **Engine curves are global.** CurveSharpness and ResponseMidpoint are engine calibration, not catalogue research fields. Dissos / psychs / empathogens / lysergamides / tryptamines keep **class-local** walls. Do not compare MXE Strength to α-PVP Strength as one ladder.

No PleasureDensity. No MixStrength. No extra multipliers beyond the equations above.

---

## ResearchProfile vs GameplayProfile

| | ResearchProfile | GameplayProfile |
|---|---|---|
| Lives in | Family feel cards (`01_…`–`30_…`) | `GAMEPLAY_STATS_*.md` / `.json` |
| Holds | Headline, identity traps, sources, qualitative band, gaps | **P, E, R, D**, plus allowed **HalfLife, onset, C, A, danger, dependence family** |
| Null rule | Unknown stay unknown | Thin SKUs: **all gameplay numbers null**, `confidence: "D"`, `placeholder: true`, one-line why |
| Must not | Recipes, doses-as-how-to, injection SOP, precursor / yield talk | Invent walls from chemistry, curve overrides per SKU, price |

**Five core catalogue fields:** W (runtime), P, E, R, D.

**Also allowed on a GameplayProfile:** HalfLife, onset, ComedownPenalty (`C`), AftereffectsPenalty (`A`), danger, dependence family.

**W** is runtime (mixture share converted to active game quantity). Catalogue examples that prove math may print W=20 / W=80 as in the locked mix, or W=1 for a single-SKU Strength column. Mixture % is not Weight unless you convert to those active units — the locked 20 / 80 example **is** that conversion.

---

## Field split (do not collapse)

| Field | Meaning |
|---|---|
| **W** | Runtime weight / active quantity. Not a personality stat. |
| **P (Potency)** | Coke = **1.00**. Exposure + Strength multiplier. **Not a feel score.** Not a dose. Not a recipe. |
| **E (Euphoria / EuphoriaWall)** | Ceiling used as `Euphoria[i]` in Strength **and** as the live wall. Stims: coke E = 100 is the named mundane, not a cap. |
| **R (Rush / RushWall)** | Ceiling used as `Rush[i]` in Strength. Zero stays zero. |
| **D (Duration)** | Pleasurable fun window in minutes. Used **only** in WeightedDuration. Never residual stim. Never HalfLife. |
| **HalfLife** | Gameplay decay for RemainingExposure only. Independent of D. |
| **C / A** | Satisfaction penalties ≥ 0. Homework can have low walls and a nasty A. Pyros can have huge Strength and huge C+A. |
| **onset** | Optional gameplay come-up minutes. Not a how-to. |
| **ActiveExposure** | Runtime coke-units on the Hill. |
| **ToleranceResponse** | Runtime. Examples use 1. |

E ≠ R ≠ P ≠ D. A short bang can have huge R and modest D. A long functional stim can have mid E and huge D.

---

## Placement rules (stims / caths / pyros)

Score **band first**, then numbers, relative to the three locked anchors.

| Band | How it must read next to the anchors |
|---|---|
| **Homework / prodrug** | Vyvanse, 2-FMA, Concerta. Tiny R. Low E. Strength at W=1 must look like homework next to coke 10,000 and α-PVP 437,500. |
| **Doctor IR** | Dex / Adderall IR / racemic amp. Near coke mood. **Not** 2× coke. **Not** 4-MMC. |
| **Coke** | Locked 1 / 100 / 100. Fun window ~40–60 min. |
| **Meth** | Below 4-MMC on **E**. Can beat coke on R and D. |
| **4-MMC** | Session (Strength and Enjoyment at W=1) is **a lot more than coke**. Do **not** rewrite α-PVP to make that true. On v2 anchors, 4-MMC E sits **between** coke 100 and α-PVP 250. Old coke=10 house band 28–36 (→ 280–360 on a 100-wall) is **retired** by the locked mountain; prove the gap with Strength, not by topping 250. |
| **NEP / hexen** | Colder than meow, greedier, longer. Hexen is diet NEP. |
| **Pyro mountain** | α-PVP is the locked peak. MDPV / α-PPP / PHP / PiHP sit **at or below** that peak. Designer tried α-PVP; do not auto-crown what they have not tried. |
| **Half-bag pyro** | Must not sit in the same **Strength / E / R league** as a full Dex / Vyvanse bag. Do not nerf P=5 to make the Hill look polite. |

Halogens (CMC / FMC) are nastier / less magic than MMC. 3-MMC a step down from 4-MMC. 2-MMC colder.

**Other classes:** ketamine E=100 (disso), MDMA E=100 (empathogen), LSD E=100 (lysergamide), 2C-B / 25I / DOM / 4-AcO-DMT as local benchmarks. Strength formula may be printed class-locally. **Do not** put MXE "above α-PVP."

Identity traps (not extra molecules): **3-DMXE = DMXE** sticker; street **FXE ≠ CanKet / 2F-NENDCK**; **naphyrone** bags often MDPV; **α-PCYP** seized bags are cyclohexyl, not cyclopentyl; **tusi** is a color; **Orange Sunshine = LSD**.

No opioids. Popular 2Cs / NBOMes only. No alphabet dump.

---

## Sanity (makers fail the card if these fire)

- Caffeine is not the locked 0.05 / 5 / 5, or coke is not 1 / 100 / 100, or α-PVP is not 5 / 250 / 350 (or D silently moved off 90 with no forum note).
- Vyvanse E ≥ 80 or R ≥ 25, or homework Strength looks like a party next to coke.
- Dex E ≥ 130, or Dex reads as 2× coke / 4-MMC.
- 4-MMC session Strength / Enjoyment is **not** a lot more than coke — **or** 4-MMC E/R/P is used to rewrite the locked mountain.
- MDPV or α-PPP printed above α-PVP on P, E, or R.
- MDPV Duration is not **210** or is ≤ α-PVP 90 (a 48 is a fail). α-PVP clocks are not 90 / 140.
- An obscure pyro (5-DBFPV, 2,3-MDPV, halogen zoo, BMC, thin N-alkyls) has a confident 3-digit E.
- Duration copied from HalfLife (or the reverse) with no comment.
- Extra multipliers, PleasureDensity, MixStrength, or per-SKU Hill overrides.
- MXE / ket / LSD scored on the stim Strength ladder as if they share it.
- Recipes, doses-as-how-to, injection SOP, price-from-P.

---

## Single-SKU rating (W = 1)

```
Strength_W1  = 1 × P × E × R
Enjoyment    = Strength_W1 / D
Satisfaction = Enjoyment / (1 + C + A)
```

Coke Strength_W1 = 10,000. α-PVP Strength_W1 = 437,500. Caffeine Strength_W1 = 1.25.

Live Hill (engine, not catalogue personality) still uses global CurveSharpness / ResponseMidpoint. Makers do not retune those per analogue.
