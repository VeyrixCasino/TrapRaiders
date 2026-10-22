# CROSSCHECK_05 — GAMEPLAY_STATS_A vs GAMEPLAY_STATS_B headliners

Game catalog. `gameplay_estimate` only. **Not a cookbook.**

Compare only. **Do not merge boards.** A and B stay independent prints.

**MUST-FIX** is reserved for lock mismatches and inverted durations. Every other P/E/R/D scrape is **SIT** — dual-board disagreement, not a ship-blocker.

Headliners in this pass: coke, 4-MMC, Vyvanse, Dex, meth, NEP, hexen, α-PVP, MDPV, α-PPP, α-PHP, MDPHP, EPH, 2-FMA. Caffeine is the third lock (not a headliner) and is scored only as an anchor.

Sources: `GAMEPLAY_STATS_A.md` / `.json`, `GAMEPLAY_STATS_B.md` / `.json`. Spec lock: `GAMEPLAY_RESPONSE.md`. Clock sit: `DURATION_VERDICT.md`.

---

## Anchors (must match exactly on P / E / R / D)

| SKU | A P/E/R/D | B P/E/R/D | Lock | Verdict |
|---|---|---|---|---|
| **caffeine** | 0.05 / 5 / 5 / **240** | 0.05 / 5 / 5 / **150** | P/E/R match. **D does not.** Boxed 20/80 mix in `GAMEPLAY_RESPONSE.md` uses caffeine **D=240**. A already prints that. | **MUST-FIX** B D 150 → **240** |
| **coke** | 1 / 100 / 100 / 50 | 1 / 100 / 100 / 50 | Exact. | match |
| **α-PVP** | 5 / 250 / 350 / 90 | 5 / 250 / 350 / 90 | Exact. HL 140 / 140 also. | match |

Caffeine P/E/R is already the lock on both boards (Strength_W1 = 1.25 either way). The only broken lock in this pass is **B caffeine Duration**. The mix proof still works at 150 (Strength-weighting keeps Dmix ≈ 90), but the boxed example is **240**, and the user lock is P/E/R/**D**. One integer. Move B.

---

## Inverted durations

None on these fourteen.

Designer fail is MDPV D ≤ locked α-PVP **90** (including a 48), or MDPV D **null**.

| Board | MDPV D | MDPV HL | vs α-PVP 90 | Verdict |
|---|---:|---:|---|---|
| A | 210 | 180 | 210 > 90 | sit-call already printed |
| B | **210** | **180** | 210 > 90 | **not null.** No MUST-FIX. |

B is not the retracted 48 and not a hole. House sit **210 / 180** is on both boards. Do not reopen 180 vs 240.

No other pair in this list inverts a locked clock (NEP stays longer than hexen; homework stays long; slam α-PPP stays under 90; MDPHP 150 is on both).

---

## Fight table

Material = an axis off by a lot (~≥25% relative, or a wall gap that changes the read). Close scrapes stay in the table but are not fights.

| SKU | A P / E / R / D | B P / E / R / D | A Str_W1 | B Str_W1 | Material axes | Verdict |
|---|---|---|---:|---:|---|---|
| **coke** | 1 / 100 / 100 / 50 | 1 / 100 / 100 / 50 | 10000 | 10000 | — | **match** (lock) |
| **4-MMC** | 1.4 / 200 / 160 / 75 | 1.5 / 180 / 125 / 70 | 44800 | 33750 | **R** 160 vs 125 | **SIT** |
| **Vyvanse** | 0.45 / 40 / 12 / 480 | 1.0 / 22 / 8 / 500 | 216 | 176 | **P** 0.45 vs 1.0 · **E** 40 vs 22 | **SIT** |
| **Dex** | 1.35 / 112 / 75 / 270 | 2.1 / 100 / 72 / 280 | 11340 | 15120 | **P** 1.35 vs 2.1 | **SIT** |
| **meth** | 2.1 / 165 / 200 / 360 | 3.0 / 155 / 200 / 400 | 69300 | 93000 | **P** 2.1 vs 3.0 | **SIT** |
| **NEP** | 1.5 / 95 / 115 / 210 | 1.8 / 85 / 75 / 200 | 16387.5 | 11475 | **R** 115 vs 75 | **SIT** |
| **hexen** | 1.25 / 70 / 100 / 90 | 1.7 / 62 / 88 / 70 | 8750 | 9275.2 | **P** 1.25 vs 1.7 · **D** 90 vs 70 | **SIT** |
| **α-PVP** | 5 / 250 / 350 / 90 | 5 / 250 / 350 / 90 | 437500 | 437500 | — | **match** (lock) |
| **MDPV** | 4.5 / 230 / 310 / 210 | 4.3 / 220 / 300 / 210 | 320850 | 283800 | — (close; D locked-sit) | **SIT** (no clock fix) |
| **α-PPP** | 2.2 / 150 / 280 / 32 | 2.3 / 140 / 180 / 32 | 92400 | 57960 | **R** 280 vs 180 | **SIT** |
| **α-PHP** | 4.2 / 220 / 300 / 55 | 4.2 / 210 / 300 / 55 | 277200 | 264600 | — | **SIT** (same band) |
| **MDPHP** | 3.6 / 185 / 240 / 150 | 3.8 / 195 / 260 / 150 | 159840 | 192660 | — | **SIT** (same band) |
| **EPH** | 1.8 / 130 / 180 / 50 | 2.0 / 82 / 115 / 38 | 42120 | 18860 | **E** 130 vs 82 · **R** 180 vs 115 · **D** 50 vs 38 | **SIT** |
| **2-FMA** | 0.7 / 42 / 16 / 390 | 1.2 / 24 / 8 / 380 | 470.4 | 230.4 | **P** 0.7 vs 1.2 · **E** 42 vs 24 · **R** 16 vs 8 | **SIT** |

---

## Material fights (SIT — do not merge)

Both boards already agree on band. The fights are integers, not identity.

| SKU | Fight | Same-band proof (why this is SIT, not MUST-FIX) |
|---|---|---|
| **4-MMC** | A rushier (R 160 vs 125). E 200 vs 180 is a scrape, not the fight. | Both E sit between coke 100 and locked PVP 250. Both session Strength >> coke 10000 (44800 / 33750). Meow is still meow. |
| **Vyvanse** | A uses a tiny P and a taller homework E. B uses P=1 and a flatter 22/8. | Both Strength_W1 are homework (216 / 176 vs coke 10000). Both R stay under the sanity cap (R ≥ 25 fails). D 480 vs 500 is noise. |
| **Dex** | A P 1.35 vs B P 2.1. | Both E near coke (112 / 100), both under the Dex E ≥ 130 fail. Neither is 2× coke or 4-MMC. D 270 vs 280 is noise. |
| **meth** | A P 2.1 vs B P 3.0. R is **200 = 200**. | Both E below their own 4-MMC (165<200, 155<180). Both beat coke on R and D. D 360 vs 400 is a scrape. |
| **NEP** | A rushier (R 115 vs 75). | Both colder than meow, both long (~210 / 200). Hexen stays diet NEP on both. |
| **hexen** | B hotter P, shorter D (90 vs 70). | Both under NEP. First-bump diet read is intact. D 70 is short, not inverted vs NEP. |
| **α-PPP** | A slam-R 280 vs B 180. D **32 = 32**. | Both under locked PVP on P, E, and R. Slam flag, not #1. |
| **EPH** | Biggest non-lock gap in the list. A reads coke-shaped walls (130/180/50). B is shorter and thinner (82/115/38). | Both short / fiendish / phenidate. Neither pretends to be a pyro mountain. No lock. No invert. |
| **2-FMA** | Same shape as Vyvanse: A lower P, taller homework E/R. | Both Strength_W1 stay homework (470 / 230 vs coke 10000). Tiny R. Long D. |

---

## Not fights

| SKU | Why it is off the fight list |
|---|---|
| **coke** | Exact P/E/R/D lock. |
| **α-PVP** | Exact P/E/R/D lock. |
| **MDPV** | P/E/R within ~5%. D/HL already 210/180 on **both**. B is not null. |
| **α-PHP** | P 4.2 = 4.2. R 300 = 300. D 55 = 55. E 220 vs 210 is a scrape. |
| **MDPHP** | D 150 = 150 (family clock). P/E/R same band, under MDPV, still a pyro. |

---

## MUST-FIX (this pass)

1. **B caffeine Duration 150 → 240.** Lock is caffeine / coke / α-PVP **P/E/R/D**. Coke and α-PVP already match. The boxed 20 α-PVP / 80 caffeine mix in `GAMEPLAY_RESPONSE.md` is caffeine **D=240**. A already prints 240. B's 150 is the only lock mismatch.

No inverted-duration MUST-FIX. B MDPV D is **210**, HL **180** — do not write 48, do not null it.

Everything else in the fight table **SIT**.
