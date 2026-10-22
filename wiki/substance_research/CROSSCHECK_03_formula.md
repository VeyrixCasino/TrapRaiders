# CROSSCHECK_03 — formula / architecture (math only)

Cross-check 3 of 5. No feel rescore. Catalogue P/E/R/D/C/A walls left alone.

Checked: [`GAMEPLAY_RESPONSE.md`](GAMEPLAY_RESPONSE.md), [`GAMEPLAY_STATS_A.md`](GAMEPLAY_STATS_A.md) header, [`GAMEPLAY_STATS_B.md`](GAMEPLAY_STATS_B.md) header, [`GAMEPLAY_STATS_B.json`](GAMEPLAY_STATS_B.json) `formula` / `mix_check`, and Strength_W1 = P × E × R on both boards.

---

## Lock (must match)

```
Strength[i]      = W * P * E * R
TotalStrength    = SUM(Strength[i])
WeightedDuration = SUM(Strength[i] * Duration[i]) / MAX(SUM(Strength[i]), epsilon)
Enjoyment        = TotalStrength / MAX(WeightedDuration, epsilon)
Satisfaction     = Enjoyment / (1 + Comedown + Aftereffects)
```

Architecture, not optional:

- Duration ≠ HalfLife
- Economy ≠ Enjoyment (no price-from-P)
- Live Hill ≠ batch Strength
- CurveSharpness / ResponseMidpoint are engine knobs, not per-drug research
- Zero rush stays zero (flag; do not invent R)
- 100 is a coke benchmark, not a cap

Locked mix: **20 α-PVP + 80 caffeine**, caffeine **D = 240** (worked example).

| part | W | P | E | R | D | Strength |
|---|---:|---:|---:|---:|---:|---:|
| α-PVP | 20 | 5 | 250 | 350 | 90 | 8,750,000 |
| caffeine | 80 | 0.05 | 5 | 5 | 240 | 100 |

```
S_total = 8,750,100
Dmix    = (8,750,000 × 90 + 100 × 240) / 8,750,100
        = 787,524,000 / 8,750,100
        = 90.001714…  ≈ 90.002
J       = 8,750,100 / 90.002 ≈ 97,221
        (exact 8,750,100 / 90.001714… = 97,221.48…)
```

---

## Verdict

| Source | Formula text | Locked mix | Architecture notes | Strength_W1 arithmetic |
|---|---|---|---|---|
| `GAMEPLAY_RESPONSE.md` | Pass (canonical) | Pass (8,750,000 + 100, Dmix ≈ 90.002, J ≈ 97,221) | Pass | n/a |
| `GAMEPLAY_STATS_A.md` header | Was missing verbatim block — **fixed** | Was missing — **fixed** (pointer only) | Was thin (no 100-cap / Hill / economy / zero-R) — **fixed** | Pass (134 / 134) |
| `GAMEPLAY_STATS_B.md` header | Batch lines were correct; Hill sat inside the same "verbatim" fence — **split** | **Bug** — used catalogue caffeine D=150 — **fixed** | Pass after adding Economy ≠ Enjoyment | Pass (146 / 146) |
| `GAMEPLAY_STATS_B.json` `formula` | **Bug** — no `MAX(..., epsilon)` — **fixed** | **Bug** — D=150 "exact" 90.000686 / J=97,222.6 — **fixed** | Pass | Pass |

No Strength_W1 row needed a recalculation. Feel scores were not touched. Maker B catalogue caffeine **D=150** stays; only the locked mix example uses **D=240**.

---

## Bugs found

### 1. Board B locked-mix used the wrong Duration (formula bug)

`GAMEPLAY_STATS_B.md` Mix sanity and `GAMEPLAY_STATS_B.json` `mix_check` computed Dmix with this board's catalogue caffeine Duration **150**, not the locked worked-example **240**.

```
wrong:  (8,750,000 × 90 + 100 × 150) / 8,750,100 = 90.0006857…  → printed 90.000686
        J = 8,750,100 / 90.000686 ≈ 97,222.59                 → printed 97,222.6
lock:   (8,750,000 × 90 + 100 × 240) / 8,750,100 = 90.001714…  → 90.002
        J = 8,750,100 / 90.002 ≈ 97,221
```

The B header then called 90.0017 / 97,221 a "designer rounded check (divide by PVP strength only)". That story is false:

| Method | Dmix | J |
|---|---:|---:|
| Lock: Σ(S·D) / ΣS with D_caf=240 | 90.001714 | 97,221.48 |
| Bug: Σ(S·D) / ΣS with D_caf=150 | 90.000686 | 97,222.59 |
| Drop caffeine Strength from the denominator, D_caf=150 | 90.001714 | 97,220.37 (if J uses S_pvp only) |
| Drop caffeine Strength, D_caf=240 | 90.002743 | 97,219.26 |

90.001714 is the **correct** lock (D=240, full ΣS). It is only accidentally close to the drop-denominator D=150 path. J ≈ 97,221 is **TotalStrength / Dmix**, not "divide by PVP strength only."

`mix_check.designer_rounded.note` had that wrong explanation on disk. Replaced with the lock.

### 2. Board B JSON formula dropped epsilon

`GAMEPLAY_STATS_B.json`:

```
was: WeightedDuration = SUM(S*D) / SUM(S)
     Enjoyment        = TotalStrength / WeightedDuration
now: WeightedDuration = SUM(S*D) / MAX(SUM(S), epsilon)
     Enjoyment        = TotalStrength / MAX(WeightedDuration, epsilon)
```

`GAMEPLAY_STATS_B.md` already had the MAX form. Spec and JSON had drifted.

### 3. Board A header did not print the lock

A pointed at `GAMEPLAY_RESPONSE.md` ("epsilon-safe lock") but did not print Strength / TotalStrength / WeightedDuration / Enjoyment / Satisfaction, the 20/80 mix, 100-is-not-a-cap, Economy ≠ Enjoyment, Live Hill ≠ batch Strength, or zero-R. Header now prints them.

### 4. Board B "verbatim" fence mixed Live Hill into batch Strength

B.md put RemainingExposure / EffectiveExposure / Activation / CurrentEuphoria in the same code fence as the product-rating lock. Prose already said Hill is separate; the fence did not. Hill block is now labeled engine-only.

Not a formula error — architecture presentation.

---

## Strength_W1 audit (no feel rescore)

`Strength_W1 = 1 × P × E × R` on every scored row.

| Board | Scored | Null / placeholder | Strength ≠ P×E×R | D copied from HalfLife | Invented R=0 fill |
|---|---:|---:|---:|---:|---:|
| A JSON | 134 | 52 | 0 | 0 | 0 |
| B JSON | 146 | 96 | 0 | 0 | 0 |

Anchors:

| SKU | P | E | R | Strength_W1 |
|---|---:|---:|---:|---:|
| caffeine | 0.05 | 5 | 5 | 1.25 |
| cocaine | 1 | 100 | 100 | 10,000 |
| α-PVP | 5 | 250 | 350 | 437,500 |

B headliner Enjoyment / Satisfaction also match `Strength / D` and `Enjoyment / (1+C+A)` at display precision. Not recored.

Zero-R rule: no scored row has R=0. Low-rush homework on B is flagged in `rushFlag`, not padded. Left alone.

---

## Architecture checklist

| Rule | RESPONSE | A header (after fix) | B header (after fix) |
|---|---|---|---|
| Strength = W×P×E×R | yes | yes | yes |
| TotalStrength = SUM | yes | yes | yes |
| WeightedDuration = Σ(S·D) / MAX(ΣS, ε) | yes | yes | yes (JSON was missing MAX) |
| Enjoyment = TotalStrength / MAX(Dmix, ε) | yes | yes | yes |
| Satisfaction = J / (1+C+A) | yes | yes | yes |
| Duration ≠ HalfLife | yes | yes | yes |
| Economy ≠ Enjoyment | yes | yes | yes (was only "no price-from-P") |
| Live Hill ≠ batch Strength | yes | yes | yes (fence was mixed) |
| Curve params are engine knobs | yes | yes | yes |
| Zero rush stays zero | yes | yes | yes |
| 100 is not a cap | yes | yes | yes |
| Locked mix 8,750,000 + 100, Dmix ≈ 90.002, J ≈ 97,221 | yes | yes | was D=150; now yes |

No PleasureDensity. No MixStrength. No extra Strength multipliers.

---

## Fixes applied (text / mix math only)

- `GAMEPLAY_STATS_A.md` — printed the epsilon-safe lock, architecture one-liner, and locked mix.
- `GAMEPLAY_STATS_B.md` — split Live Hill out of the verbatim fence; mix sanity now uses D_caf=240 and J ≈ 97,221.
- `GAMEPLAY_STATS_B.json` — epsilon-safe formula strings; `mix_check` uses D=240; caffeine note no longer claims the mix uses D=150.
- `GAMEPLAY_RESPONSE.md` — no edit (already the lock).
- No Strength_W1 cells changed. No feel walls moved.

---

## Still not a bug

Maker B catalogue caffeine Duration **150** vs the mix example **240**. Duration is a feel clock. The worked example is a math proof that 80% caffeine cannot drag Dmix. Do not force B's caffeine row to 240 to "match the mix."
