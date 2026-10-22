# Assignment 30 — Taxonomy expansion (what 01–29 still don’t own)

Game catalog research for Bellhaven / TrapRaiders. **Not a cookbook.**

- No recipes, precursors, doses, injection SOP.
- **No opioids.** No fentalogs, nitazenes, kratom, tianeptine, O-DSMT, MT-45, “ibogaine analogs as opioid research.”
- Unknown scores are `null`. Lead with **rush / euphoria / compulsiveness / enjoyment**.
- This file **proposes subclasses with evidence** and full-cards the families nobody else took. It does not steal kits 01–29 already filed.

**House rule for this assignment:** tropanes are the rush kings. Do not file cocaine as “just another DAT stim” next to 4-FA. The snap is the product.

---

## What the original 30-agent map missed

The README 30-agent split covered cathinones, pyros, amps/phenidates/aminorex/piperazines, empathogens, four disso kits, 2C/NBOMe/DOx (+ FLY), tryptamines, lysergamides, benzos/sedatives (25–26, **no file yet**), spice + phytocannabinoids (27–28), and deliriants (29).

`wiki/product_families.md` — the original catalog bible — never listed:

1. **Cocaine / tropanes / crack** (the actual rush legend the pyros keep getting compared to)
2. **The entire cannabinoid wall** (now 27–28)
3. **Deliriants / salvia / amanita / nutmeg** (now 29)
4. **Sedative families beyond “RC benzos are banned”** — GHB, methaqualone, gabapentinoids (25–26 was assigned; still empty)
5. **Plant ethnogens that are not 2C or tryptamines** — mescaline/cactus, khat parents, betel, kanna
6. **Legal-high coke mimics** — dimethocaine, 4-fluorotropacocaine, “Synthacaine”
7. **Aminoindanes except MDAI** — 07–10 explicitly left 2-AI to an extras pass
8. **Eugeroics** — modafinil / flmodafinil
9. **Poppers / solvents** (N2O already in 17)
10. **Common legal psychoactives as game SKUs** — alcohol, nicotine, caffeine
11. **Phenyltropanes** — dichloropane / troparil
12. **Prolintane / propylhexedrine / DMAA** leftover stims

Agents 01–29 still do **not** own the rows below. That is the expansion.

| Proposed subclass | Evidence it existed as a product | Owner proposal |
|---|---|---|
| `tropane_stimulant` | centuries of coca; global street cocaine / crack | **30 (this file)** |
| `phenyltropane` | RC-era dichloropane / troparil bags | **30** |
| `coke_mimic_local_anesthetic` | dimethocaine / 4-F-tropacocaine legal-high era | **30** |
| `aminoindane_stim` | 2-AI + MPA = “Synthacaine”; 07–10 deferred | **30** (MDAI stays 11–12) |
| `camfetamine_adjacent` | UK/EU detections ~2011 | **30** |
| `eugeroic` | diverted modafinil; flmodafinil RC | **30** |
| `khat_parent` | cathinone / cathine / khat leaf | **30** (synthetics stay 01–06) |
| `ghb_family` | street G, GBL, 1,4-BD | **propose 25–26**, cards here until that file exists |
| `methaqualone_family` | Quaalude history; SL-164 / MMQ RC | **propose 25–26**, cards here |
| `gabapentinoid` | pregabalin street; phenibut RC | **propose 25–26**, cards here |
| `mescaline_cactus` | peyote / San Pedro centuries; 18–20 owns TMA/FLY not the cactus | **30** plant card; synthetics stay 18–20 |
| `alkyl_nitrite` | poppers, club crate | **30** |
| `volatile_solvent` | toluene / petrol sniffing — documented, ugly | **30** names + one card |
| `common_legal` | alcohol, nicotine, caffeine as economy SKUs | **30** (game needs them) |
| `arecoline_betel` | global chew | **30** thin |
| `shop_ethnogen` | blue lotus, kanna leftover | **30** thin; kanna also noted in 29 |
| `btcp_benocyclidine` | DAT + PCP-ish research / rare RC | **30** thin |
| `leftover_otc_stim` | prolintane, propylhexedrine, DMAA | **30** |

**Already owned — do not duplicate:** MPA (07–10), piperazines (10), MDAI (11–12), 2-DPMP (07–10), FLY/DragonFLY/TMA (18–20), DXM/N2O (17), spice/THC (27–28), DPH/salvia (29), benzos (25–26 when written).

**Hard no:** opioid analog families, nitazene shopping, kratom-as-opioid-research, precursor lists.

---

## Nomenclature (tropane shelf)

| Print this ID | Also sold / typed as | Not the same as |
|---|---|---|
| **cocaine** | coke, blow, snow, cocaine HCl | crack (same molecule, different door). “Pink cocaine” / tusi (usually ket + dye). |
| **crack** | rock, freebase, base | cocaine powder. Coca paste. |
| **coca_paste** | basuco, pasta base, paco | pharmaceutical cocaine. Crack. |
| **dichloropane** | RTI-111, (−)-2β-carbomethoxy-3β-(3,4-dichlorophenyl)tropane | cocaine. Troparil. |
| **troparil** | WIN 35,065-2, β-CPT, (−)-2β-carbomethoxy-3β-phenyltropane | WIN 35,428 / CFT. Dichloropane. |
| **dimethocaine** | larocaine, DMC (ambiguous!), “synthetic cocaine” | cocaine. 4-F-tropacocaine. **DMC also means dimethylcathinone.** |
| **4-fluorotropacocaine** | 4-F-tropacocaine, pFBT | tropacocaine. Dimethocaine. |
| **Synthacaine** | brand; often MPA + 2-AI | a molecule. Identity_uncertain blend. |
| **2-AI** | 2-aminoindane | MDAI. NM-2-AI. |
| **khat** | *Catha edulis*, gat, qat | mephedrone. Cathinone isolate. |
| **GHB** | G, liquid E, sodium oxybate | GBL. 1,4-BD. |
| **methaqualone** | Quaalude, ludes, Mandrax | SL-164. Mecloqualone. |
| **SL-164** | dicloqualone, “legal lude” | methaqualone. |

---

# Tropanes — rush kings

## Cocaine (coke, blow)

Status: well_documented  
Market: street  
Headline: **The old rush king. Short, bright, greedy. Clearly under 4-MMC on the good. Not the pyro.**

### The hit
Rush **bar 25 / rush_x 1.0 (A)** — The named mundane. Everything else is a multiple of this.  
Euphoria **bar 25 / euphoria_x 1.0 (A)** — Spotlight, not a hug. 4-MMC is 2.4×. α-PVP is 12×.  
Enjoyment **bar 25 / enjoyment_x 1.0 (A)** — People still buy the night.  
Compulsiveness **bar 25 / compulsive_x 1.0 (A)** — Greedy lines. Pyro flush is 12×, not this.

### The bill
Nose, heart, crash, paranoia at the end of a gram, next-day hole. Cardiac and seizure fail-states. Levamisole / aminorex cut is an adulterant story (09 already has aminorex). `redose`. Slam lore exists — flag only, not a method. Oral / “coca tea” is a different, quieter product (see coca leaf).

NPC line: *"The old snap. Pyros already stole this sentence."*

Sources: Clinical cocaine reviews; Erowid cocaine; EUDA cocaine market; Volkow / DAT imaging literature (reinforcement, not a how-to).  
Gaps: Street purity is the hidden slider. Score the myth of a decent gram, not lidocaine dust.

---

## Crack (rock, freebase)

Status: well_documented  
Market: street  
Headline: **Same molecule. Different door. The rush that deletes the future.**

### The hit
Rush **bar 34 / rush_x 1.6 (A)** — Faster than powder. Not 12×.  
Euphoria **bar 27 / euphoria_x 1.15 (A)** — Still coke-class. Under 4-MMC 2.4×.  
Enjoyment **bar 20 / enjoyment_x 0.75 (A)** — The hit is loved. The night is not.  
Compulsiveness **bar 40 / compulsive_x 2.0 (A)** — Greedy pipe. Not pyro flush 12×.

### The bill
Crash is immediate. Paranoia, violence-risk lore, lung, heart. The economy of “another rock” is the fail-state. Same molecule as cocaine — **separate SKU** because the feel and the NPC are different. `smoke` `redose` `paranoia`.

NPC line: *"The king of the hit. The beggar of the next one."*

Sources: Clinical crack / freebase literature; Erowid; ethnography of rock markets.  
Gaps: Do not write a prep card. The door is a flag.

---

## Coca paste (basuco, paco, pasta base)

Status: moderately_documented  
Market: street  
Headline: **The dirty middle. Cheap smoke. Shorter soul than a lab gram.**

### The hit
Rush **62 (B)** — Smoked paste, harsh, fast. Coke-class, not mountain.  
Euphoria **42 (B)** — Spotlight with solvents. Coke-class.  
Enjoyment **36 (B)** — Poverty-market chemical. People use it. They do not write poems.  
Compulsiveness **76 (B)** — Cheap + short = empty night. Greedy, not flush-the-safe.

### The bill
Toxics in the paste, lung, heart, street-kid lore in the Andes / Southern Cone. Not pharmaceutical cocaine.

NPC line: *"Coke before it learned manners."*

Sources: Andean / Southern Cone public-health papers on pasta base / paco; UNODC coca chapters.  
Gaps: Composition varies. Score the product class.

---

## Coca leaf / coca tea

Status: well_documented  
Market: street  
Headline: **The plant. Work chew. Not a line.**

### The hit
Rush **8 (A)** — Almost none.  
Euphoria **28 (B)** — Mild lift, altitude lore, full stomach.  
Enjoyment **42 (B)** — Functional, social, legal in the Andes.  
Compulsiveness **18 (B)** — Habit, not a binge.

NPC line: *"The leaf they should have left as the leaf."*

Sources: Andean ethnography; WHO coca leaf reviews.  
Gaps: Not a Flask brick. Kitchen / cultural crate.

---

## Dichloropane (RTI-111)

Status: moderately_documented  
Market: rc_era  
Headline: **RC cocaine. Longer. Less snap. A meeting, not a lightning bolt.**

### The hit
Rush **55 (B)** — Present, rounded, late vs coke. People who wanted “legal blow” noticed the missing slap.  
Euphoria **58 (B)** — Coke-shaped mood, stretched.  
Enjoyment **52 (B)** — Fine functional stim for some. Disappointing as a party clone.  
Compulsiveness **48 (B)** — Longer duration kills the line-loop. Still a DAT toy.

### The bill
Jaw, duration hangover, “not coke.” Thin but real 2010s RC file. `oral` `redose`.

NPC line: *"Coke that stays for a meeting and forgets the entrance."*

Sources: PsychonautWiki dichloropane; RC forum RTI-111 threads; RTI phenyltropane literature (feel ≠ binding table).  
Gaps: Small chorus. Do not clone cocaine’s 92 rush.

---

## Troparil (WIN 35,065-2, β-CPT)

Status: limited_evidence  
Market: rc_era  
Headline: **Parent phenyltropane. Rare bag. Paper > party.**

### The hit
Rush **42 (C)** · Euphoria **48 (C)** · Enjoyment **44 (C)** · Compulsiveness **36 (C)`

A few vendor-era reports: stim, long, less magic. WIN 35,428 / CFT is the fluoro research cousin — names-only unless a bag appears.

NPC line: *"The textbook coke analog. The street did not RSVP."*

Sources: Phenyltropane reviews; sparse RC mentions.  
Gaps: Almost no clean modern file.

---

## Dimethocaine (larocaine)

Status: moderately_documented  
Market: rc_era  
Headline: **Legal coke that flopped. Numb gums, little soul.**

### The hit
Rush **22 (B)** — Local anesthetic sting. Almost no snap.  
Euphoria **18 (B)** — “I can feel my face and that’s about it.”  
Enjoyment **16 (B)** — The disappointed legal-high.  
Compulsiveness **20 (B)** — They stop when they admit it.

### The bill
Numb, headache, heart flutter, shame. **DMC** on a bag might be dimethylcathinone — `mislabel`.

NPC line: *"They sold the numb. They forgot the point."*

Sources: PsychonautWiki dimethocaine; 2010–12 legal-high forums; forensic detections.  
Gaps: Often cut or mislabeled.

---

## 4-Fluorotropacocaine (4-F-tropacocaine, pFBT)

Status: limited_evidence  
Market: rc_era  
Headline: **Fluoro tropacocaine. Legal-high cousin. Thin file.**

### The hit
Rush **24 (C)** · Euphoria **20 (C)** · Enjoyment **18 (C)** · Compulsiveness **22 (C)`

Same flop family as dimethocaine. Numb > high.

NPC line: *"Another dentist’s idea of a party."*

Sources: EMCDDA / forensic 4-fluorotropacocaine notes; sparse forums.  
Gaps: Tiny chorus.

---

## Tropacocaine

Status: limited_evidence  
Market: uncertain  
Headline: **Coca minor alkaloid. Historical isolate. Not a modern brick.**

### The hit
Scores `null (U)` for recreational feel.

NPC line: *"A footnote in the leaf."*

Sources: Coca alkaloid reviews.  
Gaps: No party file.

---

## Synthacaine (brand)

Status: identity_uncertain  
Market: rc_era  
Headline: **A sticker. Usually MPA + 2-AI. Not a molecule.**

Do not print as its own soul. If the crate needs the joke: MPA is 07–10; 2-AI is below. Bags lied constantly.

NPC line: *"The name on the packet. Not the powder."*

Sources: UK legal-high analyses (MPA + 2-AI mixes); 07–10 note.  
Gaps: Every tin is a different lie.

---

# Other transporter stims 01–29 left on the table

## 2-AI (2-aminoindane)

Status: moderately_documented  
Market: rc_era  
Headline: **The other half of Synthacaine. Light, short, not MDAI.**

### The hit
Rush **36 (B)** — Mild snap if insufflated. Not coke.  
Euphoria **32 (B)** — Functional, a bit warm.  
Enjoyment **36 (B)** — Session candy.  
Compulsiveness **30 (B)** — Short enough to repeat, not a demon.

### The bill
Jaw, nothing-much hangover. 07–10 deferred this backbone on purpose. MDAI (11–12) is the methylenedioxy cousin — **do not merge.**

NPC line: *"Legal dust they poured next to MPA and called it blow."*

Sources: PsychonautWiki 2-AI; legal-high “Synthacaine” analyses; 07–10 extras note.  
Gaps: Mix reports.

---

## NM-2-AI (N-methyl-2-AI)

Status: limited_evidence  
Market: rc_era  
Headline: **Methyl stamp on 2-AI. Detected. Thin poems.**

### The hit
Rush `null (U)` · Euphoria `null (U)` · Enjoyment `null (U)` · Compulsiveness `null (U)` — or infer softly **D** ~ 2-AI if a designer needs a gray bottle: still prefer null.

NPC line: *"Catalog cousin. Don’t invent the night."*

Sources: EMCDDA / vendor lists NM-2-AI.  
Gaps: Empty clean feel.

---

## Camfetamine (N-methyl-3-phenyl-norbornan-2-amine)

Status: limited_evidence  
Market: rc_era  
Headline: **Fencamfamine’s street cousin. UK leftover.**

### The hit
Rush **34 (C)** · Euphoria **36 (C)** · Enjoyment **34 (C)** · Compulsiveness **28 (C)`

2011-ish UK/EU. Amph-shaped, thinner, not loved.

NPC line: *"A norbornane they tried to sell as speed."*

Sources: EMCDDA camfetamine; sparse 2011–13 threads.  
Gaps: Tiny file. Fencamfamine is the old medicine parent — thin, pharmacy.

---

## Prolintane

Status: limited_evidence  
Market: uncertain  
Headline: **Old European stim. Pyrrolidine, not a pyro party.**

### The hit
Rush **30 (C)** · Euphoria **34 (C)** · Enjoyment **32 (C)** · Compulsiveness **28 (C)`

Medicine-cabinet / some RC mention. Do not file as α-PVP.

NPC line: *"A prescription that thought it was interesting."*

Sources: Older clinical prolintane; rare RC notes.  
Gaps: Almost no modern chorus.

---

## Propylhexedrine (Benzedrex)

Status: moderately_documented  
Market: street  
Headline: **The inhaler they should have left in the nose.**

### The hit
Rush **40 (B)** — When abused as a stim: real, dirty.  
Euphoria **38 (B)** — Amph-ish.  
Enjoyment **28 (B)** — Taste / body-load tax kills the night.  
Compulsiveness **42 (B)** — OTC loop exists.

### The bill
Horrible taste, tachycardia, paranoia. OTC inhaler diversion. Flag, not a recipe.

NPC line: *"Cotton in a tube. The tube was not the point they wanted."*

Sources: Erowid propylhexedrine; poison-center notes.  
Gaps: Do not write extraction steps.

---

## DMAA (methylhexanamine, geranamine)

Status: moderately_documented  
Market: uncertain  
Headline: **Pre-workout panic. Not a party brick.**

### The hit
Rush **24 (B)** · Euphoria **22 (B)** · Enjoyment **24 (B)** · Compulsiveness **16 (B)`

Gym legal-stim. Stroke / blood-pressure scare. Not Flask.

NPC line: *"They put it in a tub next to creatine. The heart noticed."*

Sources: FDA DMAA notices; sports-supplement case reports.  
Gaps: “Geranium oil” labeling folklore.

---

## Modafinil

Status: well_documented  
Market: street  
Headline: **Wake. Not a party. The exam drug.**

### The hit
Rush `null (A)` — None.  
Euphoria **28 (A)** — Clean confidence if it works.  
Enjoyment **46 (A)** — People like *getting the work done*. That is the product.  
Compulsiveness **18 (A)** — Daily habit in a subset, not a binge.

NPC line: *"The pill that files the report and skips the rave."*

Sources: Clinical modafinil; Erowid; diversion studies.  
Gaps: Non-responder rate is high — enjoyment is bimodal.

---

## Adrafinil · flmodafinil (CRL-40,940) · fladrafinil

Status: limited_evidence  
Market: rc_era  
Headline: **Modafinil coats and fluoro stamps. Same job, thinner file.**

### The hit
Adrafinil: prodrug rumor, liver-tax talk — enjoyment **32 (C)**, rush `null`.  
Flmodafinil: RC “stronger / shorter moda” — rush `null`, euphoria **30 (C)**, enjoyment **40 (C)**, compulsiveness **16 (C)`.

NPC line: *"Same desk. New sticker."*

Sources: RC eugeroic forums; clinical adrafinil old file.  
Gaps: Flmodafinil human chorus small.

---

## Bupropion (Wellbutrin)

Status: moderately_documented  
Market: uncertain  
Headline: **DAT/NET medicine. Recreational file exists and is mostly a warning.**

### The hit
Rush **16 (C)** · Euphoria **22 (C)** · Enjoyment **18 (C)** · Compulsiveness **14 (C)`

Insufflated “poor man’s coke” lore is **seizure-taxed**. Not a kit.

NPC line: *"They snorted their antidepressant. The seizure came free."*

Sources: Case series of bupropion insufflation / seizures; product monograph.  
Gaps: Do not write a method.

---

## Benocyclidine (BTCP)

Status: limited_evidence  
Market: literature_only  
Headline: **DAT blocker in a PCP costume. Almost no bag.**

### The hit
Scores `null (U)`. Binding tables are not a night. A few research-chem whispers. Do not steal PCP (15–16).

NPC line: *"A paper that looks like two families and lives in neither."*

Sources: BTCP DAT literature; rare vendor mentions.  
Gaps: No feel file.

---

## Khat leaf · cathinone · cathine (norpseudoephedrine)

Status: well_documented  
Market: street  
Headline: **The plant that invented the cathinone wall. Chew, not meow.**

### The hit
Rush **14 (A)** — Slow chew lift.  
Euphoria **42 (A)** — Talk, mood, work, mild.  
Enjoyment **50 (A)** — Cultural session.  
Compulsiveness **34 (A)** — Afternoon habit, not 4-MMC.

Isolated **cathinone** is more amp-like and less documented as a modern bag (`limited`, scores closer to weak amph if needed — prefer thin). **Cathine** is the milder leftover. Synthetics stay in 01–06.

NPC line: *"The leaf. Everything in Flask is a panic about this."*

Sources: WHO khat; Toennes et al. khat alkaloids; EUDA / UK khat notes.  
Gaps: Fresh vs wilted leaf is the hidden slider — no how-to.

---

# Sedative families 25–26 should steal (cards parked here)

25–26 is assigned “benzos / other sedatives (no opioids)” and has **no file yet**. Park the non-benzo sedative subclasses so they are not lost. When 25–26 lands, merge and delete the park.

## GHB (G, sodium oxybate)

Status: well_documented  
Market: street  
Headline: **The melt. Euphoria in a bottle. Compulsive in clubs and beds.**

### The hit
Rush **28 (A)** — Oral melt, not a snap. A warm whoosh if they catch the window.  
Euphoria **80 (A)** — Body, sex, talk, music. Real.  
Enjoyment **78 (A)** — People love the window.  
Compulsiveness **70 (A)** — Redose because it is short. The next cap is how they vanish.

### The bill
Steep dose-response (no how-to — flag `OD` `amnesia`). G-sleep, vomit, combo deaths with alcohol. Withdrawal can be a medical emergency. `oral` `redose`.

NPC line: *"The hug that deletes the last hour."*

Sources: Erowid GHB; EMCDDA GHB/GBL; clinical withdrawal reviews.  
Gaps: Street “G” is GHB or GBL — `mislabel`.

---

## GBL · 1,4-BD

Status: well_documented  
Market: street  
Headline: **The industrial doors into G. Same night, harsher knock.**

### The hit
Score as GHB with **worse stomach and faster crash** — enjoyment **70 (B)**, rush **30 (B)**, compulsiveness **72 (B)**. Not separate souls for UI. Two dusty labels, one mesh.

NPC line: *"The bottle under the sink that thinks it’s G."*

Sources: EMCDDA GBL/1,4-BD; conversion-in-body is a fact, not a recipe.  
Gaps: Do not write conversion steps.

---

## Methaqualone (Quaalude, Mandrax)

Status: well_documented  
Market: street  
Headline: **The lost luxury downer. Euphoria people still brag about.**

### The hit
Rush **22 (B)** — Soft melt.  
Euphoria **78 (B)** — Legendary body + mood. Old heads will not shut up.  
Enjoyment **80 (B)** — The ghost 25–26 will be asked for.  
Compulsiveness **48 (B)** — Liked, lessish fiend than G or coke; still habit-forming.

### The bill
Ataxia, “lude” motor wreck, combo deaths, real scarcity. South African Mandrax (with antihistamine) is a regional SKU variant, not a new molecule.

NPC line: *"The down they keep lying about having."*

Sources: Historical methaqualone; Erowid; SA Mandrax public health.  
Gaps: Modern “ludes” are usually benzos. `mislabel`.

---

## SL-164 (dicloqualone) · methylmethaqualone (MMQ)

Status: limited_evidence  
Market: rc_era  
Headline: **RC ludes. Seized. Almost no honest luxury.**

### The hit
SL-164: enjoyment **36 (C)**, euphoria **34 (C)**, rush `null`, compulsiveness **28 (C)` — “not the real thing.”  
MMQ: thinner, seizure-scare rumor — prefer more nulls if the designer is honest (`limited`).

NPC line: *"They printed Quaalude on the hope."*

Sources: RC qualiude analog reports; forensic SL-164.  
Gaps: Tiny feel. Do not build a 20-analog wall. **No synthesis.**

---

## Phenibut

Status: well_documented  
Market: rc_era  
Headline: **Shop GABA. First night is nice. Fourth night is a hostage.**

### The hit
Rush `null (A)` · Euphoria **48 (B)** · Enjoyment **50 (B)** · Compulsiveness **64 (A)` — daily loop, rebound anxiety. Pleasure mid, fiend higher.

NPC line: *"Legal calm. Illegal withdrawal."*

Sources: Phenibut case series; Erowid; shop-nootropic forums.  
Gaps: Dose-creep stories — no how-to.

---

## Pregabalin (Lyrica) · gabapentin

Status: well_documented  
Market: street  
Headline: **Pharmacy drunk. Euphoria in the wrong amount. Street value real.**

### The hit
Rush `null (A)` · Euphoria **56 (B)** · Enjoyment **54 (B)** · Compulsiveness **58 (B)` for pregabalin. Gabapentin is milder (eu **38**, enjoy **40**, comp **40**).

NPC line: *"The blister that drinks you."*

Sources: UK / EU pregabalin scheduling notes; diversion studies; Erowid.  
Gaps: Opioid-combo deaths exist — flag `OD`, do not research opioid pairing.

---

# Club / legal / leftover ethnogens

## Alcohol (ethanol)

Status: well_documented  
Market: street  
Headline: **The default. Rush is a warm slide. Compulsion is a culture.**

### The hit
Rush **24 (A)** — First drinks are a lift, not a snap.  
Euphoria **62 (A)** — Social engine.  
Enjoyment **74 (A)** — The catalog’s legal enjoyment king next to THC.  
Compulsiveness **60 (A)** — Session + dependence spectrum.

NPC line: *"The one they already have when they swear they don’t do drugs."*

Sources: Entire human record. Game economy needs the SKU.  
Gaps: Not Flask.

---

## Nicotine

Status: well_documented  
Market: street  
Headline: **The small rush they pretend isn’t one.**

### The hit
Rush **48 (A)** — Smoked / vaped: real, tiny, repeatable. Closest “legal snap.”  
Euphoria **36 (A)** — Relief / sharp.  
Enjoyment **50 (A)** — Habit enjoyment more than a night.  
Compulsiveness **92 (A)** — Ceiling for legal chemicals.

NPC line: *"Not a party. A leash."*

Sources: Clinical nicotine; DSM dependence.  
Gaps: 6-methylnicotine pouches are a 2020s shop dodge — names-only until a feel chorus.

---

## Caffeine

Status: well_documented  
Market: street  
Headline: **Work. Jitters. Not a brick.**

### The hit
Rush **10 (A)** · Euphoria **18 (A)** · Enjoyment **40 (A)** · Compulsiveness **44 (A)`

NPC line: *"The stim they already poured."*

---

## Poppers (alkyl nitrites, amyl / isopropyl / isobutyl)

Status: well_documented  
Market: street  
Headline: **Thirty seconds of flush. Club crate. Not a wall.**

### The hit
Rush **58 (A)** — Fast head-rush / flush / sex. Shortest legal-ish snap after nicotine.  
Euphoria **40 (A)** — Body, not mood poetry.  
Enjoyment **48 (A)** — Scene-specific.  
Compulsiveness **36 (B)** — Evening loop, not a week.

### The bill
Headache, drop-attack, methemoglobin / cardiac scare, solvent mix-ups (`OD`). `inhale`.

NPC line: *"A bottle that lasts as long as a chorus."*

Sources: Club-drug reviews; poppers harm notes.  
Gaps: Exact ester on the bottle changes. One SKU class.

---

## Toluene / petrol / solvent sniffing

Status: well_documented  
Market: street  
Headline: **A rush that eats the person. Document, don’t celebrate.**

### The hit
Rush **50 (B)** — Immediate.  
Euphoria **34 (B)** — Drunk / dissociated.  
Enjoyment **16 (B)** — Poverty / youth fail-state, not a treat.  
Compulsiveness **70 (B)** — Nasty loop.

NPC line: *"The bag. There is no punchline."*

Sources: Inhalant-abuse clinical reviews.  
Gaps: Many solvents. **One warning crate**, not a flavor wall.

---

## Mescaline / peyote / San Pedro

Status: well_documented  
Market: street  
Headline: **The cactus. Long, warm, heavy body. 18–20 owns the synthetic cousins.**

### The hit
Rush `null (A)` · Euphoria **68 (A)** · Enjoyment **74 (A)** · Compulsiveness **10 (A)`

Nausea tax, then color and heart. Not a 2C-B party favor — longer, more solemn. TMA / scalines / FLY stay in 18–20. This is the **plant SKU** the original bible skipped.

NPC line: *"The cactus they keep trying to turn into a 2C."*

Sources: Erowid mescaline / cactus; Shulgin; 18–20 TMA notes.  
Gaps: Species / brew strength lottery — no prep.

---

## Arecoline / betel quid

Status: moderately_documented  
Market: street  
Headline: **The other global chew. Stain, sting, mild stim.**

### The hit
Rush **16 (B)** · Euphoria **30 (B)** · Enjoyment **38 (B)** · Compulsiveness **50 (B)` — cultural habit.

NPC line: *"Red teeth. Long afternoon."*

Sources: WHO betel / areca; ethnopharmacology.  
Gaps: Slaked lime / tobacco mixes — the quid is the product.

---

## Blue lotus (*Nymphaea*)

Status: limited_evidence  
Market: uncertain  
Headline: **Shop resin. Mild. Mostly a vibe.**

### The hit
Rush `null (C)` · Euphoria **24 (C)** · Enjoyment **28 (C)** · Compulsiveness **10 (C)`

NPC line: *"A vape-shop hieroglyph."*

Sources: Shop ethnogen reviews; aporphine notes.  
Gaps: Spiked products.

---

# Names-only leftovers (historical RC / papers, no wall)

**Phenyltropanes:** WIN 35,428 (CFT), RTI-113, RTI-177, tesofensine (clinic), brasofensine — literature / trial, not bags.

**Coke-adjacent local anesthetics sold as “legal blow”:** procaine, lidocaine, benzocaine (cuts, not highs). **Levamisole** is a cut, not a SKU (aminorex story in 09).

**Leftover stims:** fencamfamine, mazindol, nomifensine, amfonelic acid, vanoxerine (GBR-12909), diclofensine — medicine / paper. **No analog research program.**

**6-methylnicotine, nicotine pouches** — 2020s shop. Names until reports thicken.

**Methylecgonine / tropane fragments** — forensic, not products. **No precursor talk.**

---

## Kit / mesh proposals (art bible add)

| New mesh | Subclass |
|---|---|
| Powder bag (already stim) | cocaine HCl, dimethocaine, 2-AI, camfetamine |
| Rock / crumb (new) | crack, coca paste |
| Dried leaf / chew | coca, khat, betel |
| Phenyltropane vial | dichloropane, troparil |
| Liquid cap / small bottle | GHB/GBL, poppers |
| Pharmacy downer blister | methaqualone ghost, pregabalin, phenibut |
| Cactus / dried buttons | mescaline plant |
| Warning crate (solvent) | toluene class |

v1 if the game wants the rush king: **cocaine + crack**. Then **GHB** (when 25–26 exists), **alcohol / nicotine** as economy. Dichloropane is the Flask coke stamp. Dimethocaine is the joke crate.

---

## Coverage report (30) — new subclass proposals

| Subclass | Profiled | Thin / null | Names-only | Evidence |
|---|---:|---:|---:|---|
| tropane_stimulant | 4 | 0 | tropacocaine | global street + Andean paste/leaf |
| phenyltropane | 2 | 0 | WIN/CFT/RTI list | RC dichloropane file |
| coke_mimic_local_anesthetic | 2 | 0 | lidocaine cuts | 2010 legal-high flop |
| aminoindane_stim | 1 | 1 | — | Synthacaine analyses; 07–10 deferral |
| camfetamine_adjacent | 1 | fencamfamine | — | EMCDDA 2011 |
| eugeroic | 1 | 3 | — | diverted moda + RC fluoro |
| leftover_otc_stim | 3 | — | mazindol pile | Benzedrex / DMAA / prolintane |
| khat_parent | 1 | isolates | — | WHO khat |
| btcp_benocyclidine | 0 | 1 | — | literature |
| ghb_family | 2 | — | — | street G; park for 25–26 |
| methaqualone_family | 1 | 2 | mecloqualone | history + SL-164 |
| gabapentinoid | 2 | — | — | Lyrica street + phenibut |
| mescaline_cactus | 1 | — | — | plant; synthetics in 18–20 |
| alkyl_nitrite | 1 | ester variants | — | club crate |
| volatile_solvent | 1 | many solvents | — | one warning crate |
| common_legal | 3 | 6-Me-nicotine | — | economy SKUs |
| arecoline_betel | 1 | — | — | global chew |
| shop_ethnogen | 1 | kanna in 29 | — | blue lotus |

**Punchiest lines**

- Cocaine — The snap. Pyros keep trying to steal this sentence.
- Crack — The king of the hit. The beggar of the next one.
- Dichloropane — Coke that stays for a meeting and forgets the entrance.
- Dimethocaine — They sold the numb. They forgot the point.
- 2-AI — Legal dust they poured next to MPA and called it blow.
- GHB — The hug that deletes the last hour.
- Methaqualone — The down they keep lying about having.
- Nicotine — Not a party. A leash.
- Mescaline — The cactus they keep trying to turn into a 2C.
- Poppers — A bottle that lasts as long as a chorus.

**Gaps / ownership hand-offs**

- 25–26 should absorb GHB, methaqualone, gabapentinoids when that pair is written.
- 07–10 already has MPA; this file only takes 2-AI.
- 18–20 already has TMA / FLY; this file only takes the cactus.
- 17 already refused solvents-as-dissos; this file keeps one inhalant warning crate.
- 29 has kanna / ibogaine / salvia; do not double-print.
- Phenyltropane *analog research* stops at documented bags. No RTI catalog.

---

## Original 30-agent map — missing list (return)

What the original 30-agent map (README table + `product_families.md` bible) never assigned a kit:

1. **Tropane stimulants** — cocaine, crack, coca paste, coca leaf  
2. **Phenyltropane RCs** — dichloropane, troparil  
3. **Legal-coke mimics** — dimethocaine, 4-fluorotropacocaine, Synthacaine-as-blend  
4. **Aminoindane stims** (except MDAI) — 2-AI, NM-2-AI  
5. **Khat parent alkaloids** as a plant kit (synthetics were over-covered; the leaf was not)  
6. **GHB / GBL / 1,4-BD** (sedative assignment exists, no cards)  
7. **Methaqualone + RC ludes**  
8. **Gabapentinoids / phenibut**  
9. **Mescaline cactus** as a plant SKU (2C/DOx/FLY were covered)  
10. **Poppers**  
11. **Solvent inhalants** (N2O was covered; toluene-class was not)  
12. **Alcohol / nicotine / caffeine** as first-class game chemicals  
13. **Betel / arecoline**  
14. **Eugeroics**  
15. **OTC leftover stims** — propylhexedrine, DMAA, prolintane  
16. **Whole cannabinoid wall** — now filled by 27–28 (bible had zero spice/THC/HHC)  
17. **Whole deliriant / atypical hall wall** — now filled by 29 (bible had zero)  
18. **Camfetamine / BTCP** footnotes  

What the 30-agent map **did** assign and this file must not reopen: opioid families (banned), full 2C/NBOMe alphabets (18–20 already expanded), pyro/cathinone carbon walks (01–06), ACH/diaryl dissos (13–17).
