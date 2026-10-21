# Bellhaven fictional per-drug simulation — field guide for Cursor

## Where to edit

**Only edit `Config/DrugProfiles.json`.** It contains 19 independent records: **7 opioids, 4 benzodiazepines, 5 stimulants, 3 dissociatives**, one per `id` with stable cross-system identifiers. The designer preview can edit some fields temporarily and export the whole dataset to replace this file. Run `python Tools/build_all.py` after changes.

The first tab in the developer lab is **All Classes**, followed by the four explicit class categories. Ordering within each category is alphabetical.

## Per-substance fields

| JSON path | Effect |
|---|---|
| `id` | **Stable unique game asset key** used by lookup, save data, trade and inventory. Never casually rename an existing shipped ID. |
| `displayName` | UI-facing name; freely editable. |
| `class` | Class used for sorting and shared tolerance. Exactly Opioids, Benzodiazepines, Stimulants, or Dissociatives. |
| `reference` | Name of that family's fictional reference index; **not a medical dose conversion**. |
| `gamePotencyIndex` | Unitless maximum contribution to effect curve; not lethal mass, medication strength, or clinical equivalence. |
| `timeCourse.riseTicks` | Primary onset time. Smaller = faster. |
| `timeCourse.decayHalfLifeTicks` | How fast the effect decays. This **is not a fixed duration**; noticeable duration emerges from curve and tolerance. |
| `timeCourse.residualTailFactor` | Fraction of the simulated effect curve assigned to a slower-decaying tail; **live in `activeExposure`**. |
| `timeCourse.supportedRouteProfiles` | Route-specific allowed options in the game. Edit separately per drug/formulation. |
| `timeCourse.routeProfiles.<route>` | Fictional route onset/exposure scaling. Not real bioavailability guidance. |
| `tolerance.familyCarryover` | Fraction of shared family tolerance impacting this drug. Different per drug. |
| `tolerance.gainPerExposure` | Drug-specific accumulation rate. **Not shared globally**. |
| `tolerance.surgeGainMultiplier` | **Live** multiplier applied to active exposure above `tolerance.highUseThreshold`. |
| `tolerance.highUseThreshold` | Per-drug unitless exposure index that begins additional high-use gain; **live**. |
| `tolerance.clearanceGainFraction` | **Live** 0–1 blend of tolerance gain from ongoing exposure versus the amount that declined since last update. A new, adjustable idea inspired by old delayed banking, **not** the old 3-stamp formula. |
| `tolerance.maintenancePlateauGain` | Gain rate when explicitly tagged as established maintenance. Currently 0, editable per drug. |
| `tolerance.maintenanceWindowTicks` | **Live** stability window: a caller must tag a pattern as maintenance and the exposure must remain approximately steady for this many ticks before plateau gains apply. |
| `tolerance.recoveryPerTick` | Drug-specific tolerance recovery during non-exposure. |
| `tolerance.maxTolerance` | Numeric cap; saturation safeguards. |
| `tolerance.effectSensitivity.reward` | How tolerance blunts rewarding effects. |
| `tolerance.effectSensitivity.sedation` | How tolerance affects sedation. |
| `tolerance.effectSensitivity.physiologicalRisk` | Separate tolerance channel for toxicity; **not a safety guarantee**. |
| `tolerance.effectSensitivity.speed/stamina/motorImpairment` | Distinct response-channel sensitivities. |
| `dependence.gainPerExposure` | Independent drug-specific dependence acquisition. |
| `dependence.maintenanceGainPerTick` | Independent dependence progression even during stable maintenance. |
| `dependence.recoveryPerTick` | Dependence declines gradually after exposure ends. |
| `dependence.withdrawalSensitivity` | 1 for opioid/benzo family in this first pass, 0 for stimulant/dissociative game simplification. |
| `compulsiveness.gainPerReward` | Desire/repetition drive independent of dependence and tolerance. |
| `compulsiveness.cueSensitivity` | **Live** scale factor for the prototype's comedown `cravingPressure()` helper. |
| `compulsiveness.earlyRedoseLearningRate` | **Live** learning rate in `recordEarlyRedose()`; earlier re-dosing on the comedown trains earlier expectations, not physical withdrawal. |
| `compulsiveness.habitDecayPerTick` | **Live** drift of learned craving onset back towards the default late-comedown expectation in `advanceAdaptation()`. |
| `effects` | Unitless per-channel fictional bonuses/impairment definitions. |

**Implementation boundary:** Most exposed knobs now feed at least one prototype calculation; **withdrawalSensitivity**, protective physiological-risk modeling, route behavior, `tolerance.effectSensitivity` beyond reward, and client craving/AI decision making are not all wired to Unreal gameplay. The browser lab is a tuning demonstrator, not a production health/dose model. Comedown thoughts and autonomous actions require separate Unreal authoritative state and dialogue integration.

## Family carryover, dependence, compulsiveness

Character state should be keyed by **drug ID**, not by name. In addition, store `familyTolerance` keyed by class, `dependence` keyed by drug ID, and `compulsiveness` keyed by drug ID. A player can be dependent on both an opioid and a benzo simultaneously. The prototype `advanceAdaptation(config,state,exposures,ticks,maintenanceIds)` demonstrates independent accumulation, optional clearance-weighted tolerance banking, maintenance stability, and partial shared family tolerance. Shared family tolerance now also **recovers** during family abstinence, according to the values in `simulation.familyRecoveryPerTick`.

Never lump independent drug tolerances into a single global value. Don't assume tolerance to reward equals protection from respiratory impairment.

## Interaction matrix

At the bottom of the JSON, `interactions[]` contains named **family pair** rules with channels, caps and saturation. The prototype `interactionAmount(rule,a,b,channel)` yields zero if either exposure is zero and produces negligible impact from a trace. It does **not** calculate real-world relative drug amounts, and should not be used to validate medical safety. Use separate toxicity channels on the server.

## Cloning and versioning

1. `python Tools/clone_drug.py morphine new_drug "New Drug"` — deep copies all knobs to a new, independent stable ID.
2. Edit its class, references, onset, decay, tolerance and dependence settings individually.
3. Run `node Tools/test_drug_model.cjs` and `python Tools/build_all.py`.
4. Version control changes. Migrations must preserve old shipped `id`s or supply a save-data migration.

**Security:** Keep all hidden substance composition, underlying risk state, and full developer tuning data on the authoritative server. The UE-embedded game UI deliberately excludes developer profiles; only the preview includes the Designer Lab and full JSON.


## Latest revision: old Relicbound notes versus Bellhaven

See `Docs/ARCHIVE_RELICBOUND_TOLERANCE.md` for the original six-drug ladder, room stamps, historical `T` equation, and the reasons those numbers are **not** live in Bellhaven. The old data must remain a reference only. **Do not replace the current 19 drug profiles with the six old bag equivalents.**

The configurable Bellhaven adaptation model uses:

- `drugTolerance[drugId]`: independent local adaptation per substance.
- `familyTolerance[class]`: shared but weaker carryover, with per-class recovery in `simulation.familyRecoveryPerTick`.
- `previousActive[drugId]`: last effect-exposure contribution, for optional clearance-weighted gain.
- `maintenanceProgress[drugId]`: stability counter before no-gain maintenance applies.
- `conditionedCue[drugId]`: learned point in the comedown at which cravings become expected. `recordEarlyRedose` modifies it; it does **not** change physical drug removal or withdrawal time.
- `dependence[drugId]`, `compulsiveness[drugId]`: independent and simultaneously active across drugs.

`simulation.familyGainScale` controls how fast per-drug gains contribute to family tolerance. It is shared, while `tolerance.familyCarryover` independently tunes how strongly each drug **receives** shared family tolerance.

**Caution:** `advanceAdaptation` advances one sampled interval at a time; caller sampling rate and tick units must be consistent when tuning. Long `steps` calls are approximations and cannot substitute for per-tick simulation during varying exposure. The Unreal server is not connected and must own every authoritative profile and physiological state.
