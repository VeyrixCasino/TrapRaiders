# _dur_09 — HalfLife is decay, not the fun clock (MDPV vs α-PVP)

Game catalog. **Not a cook book.** No recipes, no doses-as-how-to, no injection SOP.

**Duration ≠ HalfLife.** Designer lock: **Duration** is the one-dose *pleasurable fun window* (minutes). **HalfLife** is gameplay decay for `RemainingExposure` only. They are not equal, not clinical t½, not a dose guide.

This card does **not** edit `GAMEPLAY_STATS_*`.

Literature plasma / urine t½ below is **not-for-dosing**. Do not treat it as a how-to, a bag size, or a catalogue Duration.

---

## The fail this note exists to stop

Two clocks got pasted into each other.

1. **Someone treated t½ as Duration.** Rat parent MDPV falls in ~80–100 minutes. A catalogue D of **48** (or any D ≤ locked α-PVP **90**) is that inversion. Designer fact: MDPV lasts **way longer** than α-PVP on the *fun window*. `GAMEPLAY_RESPONSE.md` already fails D ≤ 90.
2. **Someone treated “I was still going 8 hours later” as HalfLife.** That sentence is leftover stim / aftereffects (and only Duration if they still mean the smile, which they usually do not). It is **not** the decay constant.

Maker B currently prints α-PVP **D 90 / HL 140** and MDPV **D null / HL 100**. The 100 reads like the Anizan rat number dropped into the catalogue. Keep the PVP pair. Replace the MDPV 100 when stats are updated — from this note, not by editing the board here.

---

## Field split (do not collapse)

| Clock | What it is | Catalogue field |
|---|---|---|
| One-dose smile / still-fun plateau | Pleasurable window | **Duration** |
| Empty stim, heart, no sleep, “still going” after the smile | Residual / hang | **AftereffectsPenalty** (and the sleep / paranoia dials). **Not HalfLife.** |
| How fast RemainingExposure halves | Gameplay decay | **HalfLife** (`gameplay_estimate`) |
| Plasma or urine elimination t½ | Lab / case PK | Literature note only. **Not-for-dosing.** Never D. Never a bag. |

Forum writers say “half-life,” “duration,” and “I was still going” as one pile. The engine does not.

`RemainingExposure[i] = PreviousExposure[i] * pow(0.5, ElapsedTime / HalfLife[i])`

That is a decay slider. It is not a fun timer.

---

## Literature t½ — not-for-dosing

No systematic human plasma PK for either SKU. Case crumbs and rat curves exist. **Do not dose from this table. Do not copy it into Duration.**

### MDPV

| Source | What they measured | Number | Use |
|---|---|---|---|
| Anizan / Baumann 2016 (rat, s.c.) | Parent plasma elimination t½ | **78–98 min** (~1.3–1.6 h) | Parent drops fast. **Not-for-dosing.** Not the fun window. |
| Related IP table (same lab family) | Parent plasma t½ | **79–99 min** | Same band. |
| Hambuchen / McClenahan 2021 (comparison sentence) | Racemic MDPV s.c. in SD rats | **~1.3 h** | The number they then compare to α-PVP. |
| Anizan metabolites | 3,4-catechol-PV and 4-OH-3-MeO-PV | Tmax ~3–4 h; t½ **not determined** (still rising / too few points) | Metabolites linger after parent. Can *explain* leftover stim. Still not Duration. |
| WHO / ECDD MDPV review | Human PK | **Absent.** “Data obtained from systematic studies carried in humans are currently absent.” | Do not invent a human t½. |
| Horsley 2018 (cites the rat curve) | Brain/serum presence | Ratio ~2 for ~**120 min** | Tissue presence, not pleasure. |

No clean published **human** MDPV plasma t½ turned up. Blog “3–6 h half-life” lines are not a paper. Leave human t½ **unknown**.

### α-PVP

| Source | What they measured | Number | Use |
|---|---|---|---|
| Hambuchen / McClenahan 2021 (rat, s.c.) | Serum terminal t½ | **~2.1 h** (1.82–2.54 h) | **62% longer than MDPV 1.3 h** in the same design. **Not-for-dosing.** |
| Quesada et al. 2016 *Clin Toxicol* | One acute non-fatal intoxication | **4 h 29 min** plasma estimate | **n=1.** Not a population t½. Not Duration. |
| Namera / Shima 2013 *Forensic Toxicol* | Urinary excretion after an IV suicide attempt | **~22 h** (later window ~40 h) | **Urine, not plasma.** Assay clock. Useless as D or as a gameplay HL. |
| Umebachi 2016 (as cited in reviews) | Still *detectable* in blood | 6 h after inhalation; 20 h after another door in that case | Detectable ≠ t½. Not a how-to. |
| Rojek 2016 (traffic case) | Blood still positive | ~13.5 h later, low tens of ng/mL | Detectability. Not a high. |
| WHO 2015 α-PVP critical review | Human PK | Systematic studies lacking; repeats the urinary 22 h case | Same warning. |

### PK paradox (keep this)

In rats, **α-PVP plasma t½ ≥ MDPV** (~2.1 h vs ~1.3 h). If you copy t½ into Duration you make PVP the long one and **fail the house rule**. Street / vault / old-head fun windows go the other way: **MDPV sits much longer**. That is the teaching example for Duration ≠ HalfLife.

Gameplay Duration follows the fun window. Gameplay HalfLife is decay, not the rat souvenir and not the 8-hour forum sentence.

---

## “I was still going 8 hours later” is not HalfLife

These quotes are the leftover clock. File them as **aftereffects** (or as Duration only if the writer still means the smile — they almost never do). Do **not** set `HalfLife` so that hour eight still looks “on.”

| Quote / clock | Where it lives | Why not HalfLife |
|---|---|---|
| r/Drugs α-PVP first-night: ~1–1.5 h euphoria, **still chewing a lip at hour eight** | Aftereffects. The smile already died. | Residual wake. House already refused to grow PVP Duration past 90 for this. Do not grow HL to 480 either. |
| I-TREND α-PVP: psychological 30–120 min, then come-down **5–10 h**, “cannot be slept off” | Aftereffects / sleep. | Physical leftover after the mental glow drops. |
| Erowid MDPV: after the come-down, **several hours** of stimulation, hard to sleep; post-plateau “sometimes uncomfortable and sometimes pleasurable” | Aftereffects. The “sometimes pleasurable” clause is not a reason to paste 8 h into D *or* HL. | Vault already split plateau vs after-effects (2–48 h). |
| Ross 2012 / DEA: MDPV **intoxication / adverse 6–8 h** | Hospital toxidrome. Aftereffects. | Not the euphoric high. `_dur_07` parked this on HalfLife; **this card moves it off.** Decay ≠ ED clock. |
| PW / Erowid after-effects **2–48 h** | Aftereffects. | Hang, not RemainingExposure’s half-time. |
| “I went 3 days” / Ivory Wave news | Compulsiveness + no sleep. | Binge. `_dur_10` owns that fail. |

`_dur_02` already timed the PVP lip-at-hour-eight night. That night is why HL exists *as a separate dial* from 90 — not a reason to set HL = 480.

---

## Fun window (Duration) — MDPV lasts way longer

This card does not re-litigate the forum pile. Sister notes already timed it. The designer lock is the point:

- **α-PVP Duration stays 90.** Forum bang is often shorter (`vape_fav` 15–45 min). Residual wake is not a reason to move 90. **No hard conflict.** `_dur_02` called 90 fair. Keep it.
- **MDPV Duration must be substantially > 90.** A 48 is inverted. Old-head head-to-heads (Bluelight 609259 / 614858; I-TREND “weaker and shorter”; r/Drugs “lasts a shorter amount of time”) all point the same way: PVP is the short twin.

Sister Duration fight is **180 vs 240**, not 90. Both beat the lock. This card’s pair uses **240** so Duration and HalfLife are visibly different numbers. Floor if a later merge wants the review-shaped 180: still ship it. Do not ship ≤ 90.

| SKU | Fun window used here | Why |
|---|---|---|
| **α-PVP** | **90** locked | Generous one-dose psychological sit. Not the foil snap. Not hour eight. |
| **MDPV** | **240** | One-unit paid glow ~4 h (`_dur_01`, `_dur_10`, Erowid “PeeVee” morning line → late-morning smile gone). **2.67×** 90. Way longer. |

Do not put the 2–7 h *total* or the 6–8 h intoxication into Duration. Those include offset / hospital leftover.

---

## Gameplay pairs (recommend)

Label: `gameplay_estimate`. Independent fields. Do not copy one onto the other.

| SKU | Duration (min) | HalfLife (min) | Why this pair |
|---|---:|---:|---|
| **α-PVP** | **90** | **140** | Duration locked. HL is the house residual-wake decay already on Maker B / `_dur_02`. After 90 min of fun, `0.5^(90/140) ≈ 0.64` still sits on RemainingExposure — smile gone, body not. That is the point of two dials. |
| **MDPV** | **240** | **160** | Duration is the long fun window. HL is decay only, a hair above PVP 140, **not** the 8-hour sentence, **not** the 78–98 min rat t½, **not** equal to 240. After 240 min of fun, `0.5^(240/160) ≈ 0.35` remains. Hour eight is aftereffects, not a second half-life stack. |

### Why MDPV HalfLife 160, not 100, 220, or 480

- **100** (Maker B) is the Anizan rat band pasted into a gameplay field. The label is `gameplay_estimate`, not a science souvenir. Replace it.
- **140** same as PVP would also be legal — literature even says PVP plasma lasts longer. This card nudges MDPV **slightly** up because old-head leftover is meaner, not because of an 8-hour quote.
- **220** (`_dur_01`) is “overnight wired after one dose.” Overnight wired is **aftereffects / sleep**, the exact class this note keeps off HalfLife.
- **> 180 because Ross/DEA 6–8 h** (`_dur_07`) uses the hospital clock as a decay hint. **Rejected here.** 6–8 h “still going” is aftereffects.
- **480** (8 h) would make RemainingExposure the forum sentence. Designer: that sentence is not HalfLife.
- **240** would copy Duration. Sanity fail.

**α-PVP HalfLife stays 140.** Do not replace it with Quesada’s n=1 **269**, Namera’s urine **22 h**, or the lip-at-hour-eight night.

### Bands if a later card fights the point

| Field | Point | Band | Fail |
|---|---:|---|---|
| α-PVP Duration | **90** | lock | Moved off 90 with no hard conflict (there isn’t one) |
| α-PVP HalfLife | **140** | 120–160 | Quesada 269 pasted; urine 22 h; 480 from hour eight |
| MDPV Duration | **240** | **180–260** | ≤ 90 (including 48); ≥ 300 (eats leftover / meth 400) |
| MDPV HalfLife | **160** | **140–180** | = Duration; 80–100 rat paste; 360–480 from “still going 8 hours” |

Confidence: Duration **B** (sister notes agree on direction, fight 180 vs 240). HalfLife **C** (no human plasma t½; decay is a gameplay pick).

---

## What a later stats pass should write

Do not edit the boards from this file. When a maker applies it:

```
α-PVP  Duration = 90     # locked mix. No hard conflict.
α-PVP  HalfLife = 140    # decay / residual wake. gameplay_estimate.
MDPV   Duration = 240    # fun window. Way longer than 90. Not t½.
MDPV   HalfLife = 160    # decay only. Not the 8-hour leftover. gameplay_estimate.
```

Enjoyment = Strength / Duration. Longer MDPV D *lowers* catalogue J. That is correct. Do not shrink D to keep J pretty, and do not shrink D to match HL.

---

## Sources

**Literature t½ (not-for-dosing)**

- Anizan S, et al. Linear pharmacokinetics of MDPV and its metabolites in the rat. *Addict Biol.* 2016. [PMC5362107](https://pmc.ncbi.nlm.nih.gov/articles/PMC5362107/) — parent t½ 78–98 min s.c.; metabolites linger.
- Hambuchen / McClenahan et al. α-PVP PK in male rats ± vaccine. 2021. [PMC8604100](https://pmc.ncbi.nlm.nih.gov/articles/PMC8604100/) — α-PVP t½ ~2.1 h; 62% longer than MDPV 1.3 h.
- Quesada L, et al. Elimination half-life of α-PVP in an acute non-fatal intoxication. *Clin Toxicol.* 2016;54(6):531–532. **n=1**, 4 h 29 min.
- Namera A / Shima N, et al. Urinary excretion time-course of IV α-PVP / α-PBP. *Forensic Toxicol.* 2013. Urinary t½ ~22 h / 40 h. Not plasma.
- WHO / ECDD MDPV review — systematic human PK absent. [ecddrepository PDF](https://ecddrepository.org/sites/default/files/4_13_review.pdf)
- WHO 2015 α-PVP critical review — repeats the urinary case; no controlled human plasma t½.

**Fun window / leftover (not t½)**

- Erowid MDPV duration / effects — plateau vs after-effects 2–48 h. [erowid.org/chemicals/mdpv/mdpv_effects.shtml](https://www.erowid.org/chemicals/mdpv/mdpv_effects.shtml)
- PsychonautWiki MDPV — “unusually long duration”; oral total 2–7 h, peak 1–4 h, after 2–48 h.
- PsychonautWiki A-PVP — smoked total 30–60 min; IN peak 20–45 min; after by route.
- I-TREND / OFDT α-PVP briefing (2015) — psych 30–120 min; come-down 5–10 h; vs MDPV “last shorter.”
- Bluelight [609259](https://www.bluelight.org/community/threads/some-early-a-pvp-alpha-pvp-vs-mdpv-comparisons.609259/) / [614858](https://www.bluelight.org/community/threads/mdpv-vs-a-pvp.614858/) — MDPV greater duration; PVP lesser.
- `_dur_02_apvp_forums.md` — hour-eight lip; 90 is fair.
- `_dur_01_mdpv_forums.md` — D 240 / HL 220. This card keeps 240 and **cuts HL off the overnight-wired number.**
- `_dur_04_pw_erowid.md` / `_dur_07_reviews.md` — D 180 camp. Legal floor. Their 6–8 h → HL move is rejected here.
- `_dur_10_binge_vs_dose.md` — 3-day stories are compulsiveness.

House: `GAMEPLAY_RESPONSE.md` (Duration = fun window; Duration ≠ HalfLife; α-PVP D locked 90; MDPV D must be substantially > 90).

---

## Gaps

- No controlled human plasma t½ for MDPV. α-PVP human plasma is **one** intoxication estimate.
- Rat t½ does not convert to a person. It is here so nobody pastes it into D again.
- Metabolite t½ was not fitted. “Linger” is qualitative.
- Sister notes disagree 180 vs 240 on MDPV Duration. Both are ≫ 90. This pair prints 240 so D and HL cannot be mistaken for each other.

**Call:** α-PVP **90 / 140** stays. MDPV **240 / 160**. Duration is the fun window (MDPV way longer). HalfLife is decay only. Literature t½ is not-for-dosing. “Still going 8 hours later” is aftereffects, not HalfLife.
