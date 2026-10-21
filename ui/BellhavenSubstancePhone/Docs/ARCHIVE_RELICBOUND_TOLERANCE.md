# Archive only — Relicbound / Trap Raiders tolerance ladder (NOT Bellhaven)

**Historical reference supplied by the developer. Do not import these figures into `Config/DrugProfiles.json`.** The older game used abstract **bag-equivalent weights** and **rooms**. They are *not* opioid conversion ratios, prescribing equivalences, safe-use instructions, dose estimates, or human toxicity measures. Bellhaven replaces this architecture with independent profiles, drug-specific effect onset and decay, and separate dependence, conditioned cravings, tolerance and physiological-risk channels.

## Original historical table (recorded as supplied)

| Drug | Old morphine-equivalent per bag `w` | Old half-life in rooms `H` | Old melt exponent `p` |
|---|---:|---:|---:|
| Codeine | 0.47 | 18 | 0.90 |
| Morphine | 1.00 | 15 | 1.05 |
| Oxy | 1.71 | 20 | 1.40 |
| Heroin | 3.44 | 15 | 1.65 |
| Fentanyl | 9.91 | 7.5 | 1.85 |
| Pink | 31.2 | 5 | 2.05 |

One shared old meter: `T` from 0 to 100. The historical weighted pile was `Q = Σ(whole bag counts × w)`. Old design formula as supplied: `T += (Q/4) × (1 − 2^(−k))`, capped at a remaining-floor term `1.5625`; contributions were banked at `H`, `2H` and `3H` rather than every room. The historical five-Pink example used `Q=156` and ended at `T=38.390625`, with deposits **19.5 + 9.75 + ~9.14** across rooms 5, 10 and 15. The old effect-melt expression was `K = K0 / (1+T/25)^p`. The claimed game-economy shift was Pink → Fentanyl → Heroin → Oxy → Morphine.

The original later *maintenance exception* proposed **no tolerance increase for exactly maintaining an established level**, with tolerance increases mainly associated with overshooting it. That idea was never fully reconciled with the three stamped deposits. Bellhaven treats maintenance as an adjustable design policy with a configurable stability window and explicitly separate continued dependence.

## Useful conceptual lessons retained

1. Distinguish drug potency from *how quickly its benefits diminish as tolerance grows*.
2. Individual substances may produce different tolerance acquisition and recovery trajectories.
3. A shorter subjective effect can lead to more frequent character cravings, even when the biological model's exposure is still present.
4. Consider delayed gain from **exposure clearance** as one possible fictional adaptation mechanic; do not assume all gain occurs immediately at dosing.
5. Stable use and prolonged excessive use should behave differently, but not create instantly exploitable maintenance baselines.
6. The character can develop **multiple independent tolerances/dependences**; Bellhaven must not reuse the old one-meter approach.
7. Onset, decay, potency, subjective reward, dependence and physical danger require different knobs.

## Explicitly rejected for Bellhaven

- Shared universal opioid-only `T = 0..100` meter as the sole tolerance state.
- Drug strengths from the old `w` column.
- The three room-stamp schedule tied to `H`, `2H`, `3H`.
- The old `p` exponent and `K` formula.
- The old Pink / Fentanyl / H / Oxy / Morphine ranking or market pricing assumptions.
- Interpreting any of those numbers as real-world medical potency or mortality figures.

## Current Bellhaven source of truth

- `Config/DrugProfiles.json` — **independent** drug profiles and class interaction matrix.
- `SourceUI/drug_engine.js` — unitless demo engine and pure functions.
- `Docs/TOLERANCE_MODEL.md` — which live fields affect which mechanisms.
- `Tools/test_drug_model.cjs` — tests verifying tuning, profile cloning, independent class recovery, maintenance gating, and cue learning.

This archive is intentionally isolated from live config and runtime code. Reintroduce a historical idea only through a *new, explicitly reviewed Bellhaven parameter*, not by copying its old numbers.
