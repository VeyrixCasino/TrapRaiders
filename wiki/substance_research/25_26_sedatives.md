# 25+26 — Sedatives (not opioids)

Game catalog research for Bellhaven / TrapRaiders. **Not a cookbook.**

- No recipes, precursors, synthesis, glassware, yields.
- No doses-as-how-to. Route notes are NPC flags (`oral_ok`, `slam_only`, `adulterant`, `mislabel`, `fake_tablet`).
- **No opioids.** No nitazenes, no fentalogs, no tianeptine, no kratom.
- Unknown = `null`, never `0`. Do not invent human reports.
- **The hit = Enjoyment / Euphoria** (the warm/relief of the first hour). **Rush is usually null.** **Compulsiveness is HIGH and independent.** Negatives (amnesia, withdrawal) sit below. Do not let the ugly withdrawal erase that people chase the first hour.

Status: `well_documented` | `moderately_documented` | `limited_evidence` | `chemical_literature_only` | `identity_uncertain` | `alias_duplicate`
Market (README): `street` | `rc_era` | `literature_only` | `uncertain`

## Flooded RC benzos vs names-only

EMCDDA monitored 30 new benzos by Feb 2021 and 36 by end of 2023. A handful of those actually sat in fake Xanax/Valium and in toxicology. The rest are Roche codes, metabolites, or one-off detections.

### Flooded (seizures + fake tablets + tox at scale)

| SKU | Wave | Why it counts | Enjoy | Comp | Line |
|---|---|---|---:|---:|---|
| **Etizolam** | flooded | 2011–2020 flood. Scotland fake diazepam. US bars. UN 2020. | 66 | 82 | Japan's prescription. Scotland's fake diazepam. The thieno people actually liked. |
| **Flualprazolam** | flooded | 2018–2021 fake-bar flood. UN 2020. | 56 | 86 | Xanax with a fluorine and no adult supervision. Fake-bar era boss. |
| **Clonazolam** | flooded | 2015–2021 pellets/presses. Blackout flood. DEA temp SI. | 44 | 94 | You wake up three days later holding receipts you don't remember signing. |
| **Flubromazolam** | flooded | 2014–2019+ pellets. Horror-story potency. DEA temp SI. | 36 | 91 | One pellet, two days missing, a fine you can't explain. |
| **Bromazolam** | flooded | 2020–2026 current king. CFSRE/UNODC #1 NPS benzo. | 60 | 84 | Whatever is actually in the fake bar this year. |
| **Diclazepam** | flooded | 2013–2018 'legal Valium.' Still a taper/filler stamp. | 48 | 76 | Valium's longer cousin you take so tomorrow doesn't exist either. |
| **Phenazepam** | flooded | First EU legal-benzo, 2007. Fake tablets. UN 2016. | 46 | 74 | Soviet long-stay. Hangover measured in days. First EU 'legal benzo.' |
| **Desalkylgidazepam** | flooded | 2022+ tox flood. UNODC: outran clonazolam. Often with bromazolam. | 44 | 68 | Gidazepam without the disguise. 2020s pellet filler. |
| **Phenazolam** | flooded | Clobromazolam. Replacement wave 2022–26 as bromazolam heated. | 52 | 82 | Bromazolam plus a chlorine. The replacement the bans invited. |
| **Methylclonazepam** | flooded | UK detections 2020–22 (ACMD n=249). Circulated hard, then faded. | 22 | 60 | Clonazepam plus a methyl. Roche code that leaked. |
| **Flubromazepam** | flooded | 2013+. Long 1,4. CFSRE still scopes it. | 40 | 72 | Phenazepam with a fluoro punch. Duration is a war crime. |

**2022 EU EWS seizure leaders:** bromazolam 157, etizolam 145, flualprazolam 104. After etizolam/flualprazolam went under international control (Nov 2020), the bag moved to flubromazolam / clonazolam / bromazolam. Bromazolam then ate the US tox chart (CFSRE 2023–2025; UNODC 2024–2025). Desalkylgidazepam is the long 1,4 riding shotgun.

### Circulated (real bags / EWS / ACMD — not a flood)

**Gidazepam**, **Cinazepam**, **Adinazolam**, **Bentazepam**, **3-Hydroxyphenazepam**, **Meclonazepam**, **Nifoxipam**, **Fonazepam**, **Cloniprazepam**, **Norfludiazepam**, **Nitemazepam**, **Pyrazolam**, **Flunitrazolam**, **Nitrazolam**, **4'-Chloro-deschloroalprazolam**, **Ethylbromazolam**, **Cyclopropylflualprazolam**, **Deschloroetizolam**, **Metizolam**, **Fluclotizolam**, **Fluetizolam**, **Flubrotizolam**, **Rilmazafone**, **Ethylflualprazolam**.

These showed up as vendor powder, a seizure, or a tox hit. They did not own a year of fake bars. **Pyrazolam** is the important one: first advertised designer (~2012), functional, never a flood.

### Names-only / literature / not a second bottle

**Girisopam**, **Nerisopam**, **Thionordazepam**, **Difludiazepam**, **4'-Chlorodiazepam**, **Flutemazepam**, **Pyclazolam**, **Fluadinazolam**, **Deschloroclotizolam**, **Bretazenil**, **Indiplon**, **Pagoclone**, **Suriclone**, **Necopidem**, **Saripidem**, **Nitromethaqualone**, **Mephenoqualone**, **PPQ**, **PPTQ**, **Cl-PPQ**, **MCPPQ**, **Gaboxadol**, **8-Aminoclonazolam**.

- **4'-Chlorodiazepam (Ro5-4864)** looks like a benzo and binds TSPO. It does not scratch the GABA-A itch. Do not kit as Xanax.
- **8-Aminoclonazolam** is a clonazolam metabolite the lab sees. Alias, not a SKU.
- **Ethylbromazolam / ethylflualprazolam / cyclopropylflualprazolam** are real detections (CFSRE 2025–26; 2026 sleep-candy paper). Feel scores stay `null`.
- **PPQ / PPTQ / Cl-PPQ / MCPPQ / mephenoqualone** are named in a 2026 analog review as late-2025 forum chemicals. No honest feel file. `null`.

## Scoring bible

| Axis | What it is | Sedative default |
|---|---|---|
| **Enjoyment** | First-hour warm/relief | Mid-high on chased benzos (Xanax 68, etiz 66, bromaz 60). Low only when nobody liked the hour. |
| **Euphoria** | Hedonic glow | Below enjoyment. GHB/ludes/reds sit higher. |
| **Rush** | Onset spike | **null** oral benzos. GBL > GHB > propofol > ludes. |
| **Compulsiveness** | Redose / habit | **High anyway.** Clonazolam 94 with enjoyment 44. Independent. |

A hated month can still mean high compulsiveness. Do not average 'never again' into low euphoria.

## Coverage report

**186 named SKUs.** Assignment 25: **93**. Assignment 26: **93**.
Flooded RC benzos: **11**. Circulated: **24**. Names-only: **23**.

### Counts per family

| Family | N |
|---|---|
| Traditional 1,4-benzodiazepines | 33 |
| Traditional 1,5-benzodiazepines | 1 |
| Traditional triazolobenzodiazepines | 4 |
| Traditional imidazo / related medical | 4 |
| Traditional thienodiazepines / thienotriazolos | 4 |
| Traditional oxazolodiazepines | 5 |
| Atypical 2,3-benzodiazepines | 3 |
| Designer 1,4-benzodiazepines | 15 |
| Designer triazolobenzodiazepines | 15 |
| Designer thienodiazepines | 6 |
| Benzo prodrugs / partial agonists / antagonist | 3 |
| Z-drugs | 4 |
| Z-drug relatives (imidazopyridine / cyclopyrrolone pipeline) | 6 |
| Barbiturates | 20 |
| GHB-related | 5 |
| Qualones (methaqualone analogs) | 16 |
| Carbamates | 3 |
| Classic non-barbiturate hypnotics | 10 |
| GABA-B / extrasynaptic GABA agonists | 4 |
| Gabapentinoids | 2 |
| Alpha-2 adrenergic sedatives | 6 |
| Sedating antihistamines | 5 |
| Dual orexin antagonists | 3 |
| Melatonin-receptor agonists | 3 |
| IV anesthetic sedatives | 3 |
| Other documented GABA-adjacent | 3 |
| **Total** | **186** |

### Most compulsive (habit, not 'fun')

| SKU | C | Enjoy | Line |
|---|---|---|---|
| **Clonazolam** | 94 | 44 | You wake up three days later holding receipts you don't remember signing. |
| **Flubromazolam** | 91 | 36 | One pellet, two days missing, a fine you can't explain. |
| **Alprazolam** | 88 | 68 | Not a rush. A hole in the calendar you keep digging. |
| **GBL** | 88 | 76 | Industrial cleaner that becomes the night. Redose or drop. |
| **Flualprazolam** | 86 | 56 | Xanax with a fluorine and no adult supervision. Fake-bar era boss. |
| **GHB** | 86 | 80 | The only downer that feels like a night out — until the clock kills you. |
| **1,4-Butanediol** | 84 | 68 | Slower G. Same coma. Same shake when it leaves. |
| **Bromazolam** | 84 | 60 | Whatever is actually in the fake bar this year. |
| **Phenibut** | 84 | 54 | Sober-feeling courage with a withdrawal that isn't. |
| **Clonazepam** | 82 | 52 | Long fuse. You feel fine until you don't remember the week. |

### Most enjoyed (first hour)

| SKU | Enjoy | C | Line |
|---|---|---|---|
| **Methaqualone** | 84 | 72 | The last sedative people actually missed when it left. |
| **GHB** | 80 | 86 | The only downer that feels like a night out — until the clock kills you. |
| **GBL** | 76 | 88 | Industrial cleaner that becomes the night. Redose or drop. |
| **Alprazolam** | 68 | 88 | Not a rush. A hole in the calendar you keep digging. |
| **1,4-Butanediol** | 68 | 84 | Slower G. Same coma. Same shake when it leaves. |
| **Etizolam** | 66 | 82 | Japan's prescription. Scotland's fake diazepam. The thieno people actually liked. |
| **Temazepam** | 64 | 76 | The sleep cap that used to be a street legend. Hangover still rude. |
| **Nimetazepam** | 62 | 78 | Asia's recreational hypnotic. Erimin-5 was a brand and then a counterfeit industry. |
| **Secobarbital** | 62 | 78 | Reds. The fun barbiturates had before they started finishing people. |
| **Bromazolam** | 60 | 84 | Whatever is actually in the fake bar this year. |

### Gaps

- Hundreds of Roche Ro-codes with binding data but no human market — not SKU'd.
- Inhalant anesthetics (ether/chloroform/isoflurane) — different kit.
- DPH high-dose crawl belongs to assignment 29; scored here only as OTC sleep.
- Lean/purple-drink combos out (opioid). Promethazine scored as antihistamine only.
- Ethylbromazolam / ethylflualprazolam / cyclopropylflualprazolam: detections, no feel file.

### Explicitly out

- opioids
- nitazenes
- fentalogs
- tianeptine (mu-opioid at rec doses)
- kratom / 7-OH-mitragynine
- alprazolam triazolobenzophenone precursor (not a high)

---

## Feel cards — enjoyment first

README shape. Headliners only. Tables below hold the rest.

### Assignment 25 headliners

## Alprazolam (Xanax, bars, zannies, farmapram, kalma)
Status: well_documented
Market: street
Headline: Not a rush. A hole in the calendar you keep digging.
### The hit
Rush **—** (U) — Oral rush is not a thing. The hit is the first hour: shoulders drop, the room gets friendly, you feel like yourself with the volume off.
Euphoria **54** (A) — Warm relief, not MDMA. People chase that hour for years. Do not average the withdrawal into the peak.
Enjoyment **68** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **88** (A) — High. Independent of whether last month was ugly. The bag empties because fear and habit come back.
### The bill
Blackouts, amnesia, next-day glue, dependence, seizure-risk withdrawal. The bill is real and later.
Blackout 82 · amnesia 78 · sedation 68 · impairment 74 · dependence 90 · withdrawal 92.
NPC line: Not a rush. A hole in the calendar you keep digging.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Diazepam (Valium, blues, Vs)
Status: well_documented
Market: street
Headline: The original calm. Muscle melt, memory tax, week-long hangover.
### The hit
Rush **—** (U) — No rush. Muscle melt.
Euphoria **42** (A) — The original calm. First hour is why the brand survived every copy.
Enjoyment **58** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **74** (A) — High maintenance. Week-long hangover does not stop the refill.
### The bill
Amnesia, impairment, long metabolites, ugly withdrawal.
Blackout 48 · amnesia 52 · sedation 62 · impairment 58 · dependence 82 · withdrawal 88.
NPC line: The original calm. Muscle melt, memory tax, week-long hangover.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Temazepam (Restoril, jellies, eggs)
Status: well_documented
Market: street
Headline: The sleep cap that used to be a street legend. Hangover still rude.
### The hit
Rush **—** (U) — No rush. Sleep cap.
Euphoria **48** (B) — UK jelly-era street legend. People liked the night. Hangover still rude.
Enjoyment **64** (B) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **76** (B) — High. Hypnotic habit.
### The bill
Blackout, impairment, next-day drunk.
Blackout 72 · amnesia 70 · sedation 82 · impairment 78 · dependence 80 · withdrawal 78.
NPC line: The sleep cap that used to be a street legend. Hangover still rude.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Etizolam (Depas, etiz, etilaam, etizest)
Status: well_documented
Market: street
Headline: Japan's prescription. Scotland's fake diazepam. The thieno people actually liked.
### The hit
Rush **—** (U) — No pyro spike. Faster knock than Valium, still oral.
Euphoria **50** (A) — The designer people actually enjoyed. Slightly more liked than most benzos. Scotland's fake diazepam era.
Enjoyment **66** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **82** (A) — High. Easy to treat as a daily tool until it is a daily need.
### The bill
Blackouts, fake-tablet dose lottery, sticky withdrawal. Still a flood chemical, not a Wikipedia row.
Blackout 70 · amnesia 68 · sedation 64 · impairment 68 · dependence 84 · withdrawal 86.
NPC line: Japan's prescription. Scotland's fake diazepam. The thieno people actually liked.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Clonazolam (clonitrazolam, clam)
Status: well_documented
Market: street
Headline: You wake up three days later holding receipts you don't remember signing.
### The hit
Rush **—** (U) — No rush. The first twenty minutes can still feel like a strong bar.
Euphoria **28** (A) — Some warmth exists. Then memory leaves. Enjoyment is the hour they remember; the rest of the week they do not.
Enjoyment **44** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **86** (A) — Calendar habit, not pyro flush. People take more because they already forgot they took it.
### The bill
Blackout machine. Receipts, crashes, dependence. DEA-scoped pellet.
Blackout 96 · amnesia 94 · sedation 88 · impairment 90 · dependence 92 · withdrawal 90.
NPC line: You wake up three days later holding receipts you don't remember signing.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Flualprazolam (flualp)
Status: well_documented
Market: street
Headline: Xanax with a fluorine and no adult supervision. Fake-bar era boss.
### The hit
Rush **—** (U) — No rush. Fake-bar era boss after etizolam.
Euphoria **40** (A) — More Xanax-like than clonazolam for a lot of reports. First hour is the product.
Enjoyment **56** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **86** (A) — High. Pressed-tablet host.
### The bill
Blackouts, potency lottery, UN-controlled 2020.
Blackout 88 · amnesia 86 · sedation 78 · impairment 80 · dependence 88 · withdrawal 86.
NPC line: Xanax with a fluorine and no adult supervision. Fake-bar era boss.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Bromazolam (XLI-268, bromaz)
Status: well_documented
Market: street
Headline: Whatever is actually in the fake bar this year.
### The hit
Rush **—** (U) — No rush. Feels like the Xanax stamp on the bag.
Euphoria **44** (A) — Bar-shaped first hour. That is why it replaced flualprazolam on the street.
Enjoyment **60** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **84** (A) — High. Current fake-bar refill loop.
### The bill
Amnesia, impairment, benzo-dope mixes (score the benzo, not the opioid). Withdrawal same family.
Blackout 80 · amnesia 78 · sedation 72 · impairment 76 · dependence 86 · withdrawal 84.
NPC line: Whatever is actually in the fake bar this year.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Flubromazolam (JYI-73, flubro)
Status: well_documented
Market: rc_era
Headline: One pellet, two days missing, a fine you can't explain.
### The hit
Rush **—** (U) — No rush. One pellet is a weekend.
Euphoria **22** (A) — Thin fun. A little warmth, then lights out for a long time.
Enjoyment **36** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **84** (A) — Calendar habit 80–90. Redose because you think nothing happened.
### The bill
Highest blackout/amnesia in the designer rack. Forum horror is the file.
Blackout 97 · amnesia 95 · sedation 92 · impairment 92 · dependence 90 · withdrawal 88.
NPC line: One pellet, two days missing, a fine you can't explain.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Diclazepam (2'-chlorodiazepam, Ro5-3448)
Status: well_documented
Market: rc_era
Headline: Valium's longer cousin you take so tomorrow doesn't exist either.
### The hit
Rush **—** (U) — No rush. Valium's longer cousin.
Euphoria **32** (A) — Calm, not a party. People took it so tomorrow also stayed quiet.
Enjoyment **48** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **76** (A) — High maintenance pull. Taper myth + fake-tablet filler.
### The bill
Long hangover, dependence, metabolites that are their own benzos.
Blackout 58 · amnesia 60 · sedation 66 · impairment 62 · dependence 84 · withdrawal 86.
NPC line: Valium's longer cousin you take so tomorrow doesn't exist either.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Phenazepam (Phenazepam, Soviet xanax)
Status: well_documented
Market: street
Headline: Soviet long-stay. Hangover measured in days. First EU 'legal benzo.'
### The hit
Rush **—** (U) — No rush. Soviet long-stay.
Euphoria **30** (A) — First EU legal benzo. Some relief. Duration is the product.
Enjoyment **46** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **74** (A) — Sticky because it never really leaves.
### The bill
Blackouts measured in days. Internationally controlled 2016.
Blackout 80 · amnesia 78 · sedation 82 · impairment 80 · dependence 86 · withdrawal 88.
NPC line: Soviet long-stay. Hangover measured in days. First EU 'legal benzo.'
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Pyrazolam (SH-I-04)
Status: moderately_documented
Market: rc_era
Headline: Anxiety off. Party never started. The functional RC.
### The hit
Rush **—** (U) — No rush. Functional.
Euphoria **24** (B) — Anxiety off. Party never started. First true designer advertised ~2012.
Enjoyment **42** (B) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **48** (B) — Moderate. Tool, not a toy.
### The bill
Lower sedation than clam. Still a GABA habit if daily.
Blackout 28 · amnesia 34 · sedation 36 · impairment 40 · dependence 52 · withdrawal 54.
NPC line: Anxiety off. Party never started. The functional RC.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Phenazolam (clobromazolam, DM-II-90)
Status: well_documented
Market: street
Headline: Bromazolam plus a chlorine. The replacement the bans invited.
### The hit
Rush **—** (U) — No rush. Bromazolam plus a chlorine.
Euphoria **36** (A) — Replacement-wave bar feel in rumor. Rising 2022-2026 as bromazolam heated.
Enjoyment **52** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **82** (A) — High. Same fake-bar mesh.
### The bill
Blackout/impairment in the clonazolam neighborhood. CFSRE scoped.
Blackout 84 · amnesia 82 · sedation 78 · impairment 80 · dependence 84 · withdrawal 82.
NPC line: Bromazolam plus a chlorine. The replacement the bans invited.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Desalkylgidazepam (bromonordiazepam, desalkyl-gidazepam)
Status: well_documented
Market: street
Headline: Gidazepam without the disguise. 2020s pellet filler.
### The hit
Rush **—** (U) — No rush. Long 1,4.
Euphoria **28** (A) — Functional-ish calm. 2020s pellet/tox filler, often next to bromazolam.
Enjoyment **44** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **68** (A) — Maintenance, not a fiend spike.
### The bill
Long tail. ACMD 2024. UNODC tox: now outruns clonazolam in some sets.
Blackout 40 · amnesia 44 · sedation 58 · impairment 54 · dependence 74 · withdrawal 76.
NPC line: Gidazepam without the disguise. 2020s pellet filler.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

### Assignment 26 headliners

## GHB (G, liquid ecstasy, sodium oxybate, Xyrem, gamma-hydroxybutyrate)
Status: well_documented
Market: street
Headline: The only downer that feels like a night out — until the clock kills you.
### The hit
Rush **50** (A) — Real onset whoosh versus benzos. Still not a stim snap.
Euphoria **74** (A) — The downer that feels like a night out. Euphoria is the point.
Enjoyment **80** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **86** (A) — Redose clock. Miss it and you drop. Hit it and you stay.
### The bill
Coma cliff, amnesia, savage withdrawal. Medical emergency when it leaves.
Blackout 70 · amnesia 55 · sedation 80 · impairment 72 · dependence 88 · withdrawal 96.
NPC line: The only downer that feels like a night out — until the clock kills you.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## GBL (gamma-butyrolactone, BDO's faster cousin)
Status: moderately_documented
Market: street
Headline: Industrial cleaner that becomes the night. Redose or drop.
### The hit
Rush **58** (A) — Faster than the salt. That is the rush score.
Euphoria **70** (A) — Same night as G once it converts.
Enjoyment **76** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **88** (A) — Worse redose trap because it hits quicker.
### The bill
Same withdrawal hell. Industrial-cleaner lore is the NPC tell.
Blackout 74 · amnesia 52 · sedation 82 · impairment 74 · dependence 90 · withdrawal 96.
NPC line: Industrial cleaner that becomes the night. Redose or drop.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Methaqualone (Quaalude, ludes, Mandrax, buttons)
Status: well_documented
Market: street
Headline: The last sedative people actually missed when it left.
### The hit
Rush **32** (A) — Some onset. Not a slam.
Euphoria **78** (A) — The last sedative people actually missed. Highest enjoyment in this file.
Enjoyment **84** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **72** (A) — Real habit. Not clonazolam-shaped amnesia.
### The bill
Impairment, crashy driving, SA Mandrax still lives.
Blackout 50 · amnesia 45 · sedation 70 · impairment 80 · dependence 70 · withdrawal 65.
NPC line: The last sedative people actually missed when it left.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Zolpidem (Ambien, Stilnox, Ambien-walking)
Status: well_documented
Market: street
Headline: Sleeping pill that sends you grocery shopping in your underwear.
### The hit
Rush **—** (U) — No rush. Sleep switch.
Euphoria **40** (A) — Weird disinhibition people chase. Not a benzo hug, still a first hour.
Enjoyment **52** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **62** (A) — Redose / maybe-this-time-I'll-sleep loop.
### The bill
Ambien-walking, amnesia, grocery-store folklore.
Blackout 75 · amnesia 82 · sedation 80 · impairment 70 · dependence 55 · withdrawal 50.
NPC line: Sleeping pill that sends you grocery shopping in your underwear.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Pregabalin (Lyrica, budweisers)
Status: well_documented
Market: street
Headline: Nerve-pill glow. The benzo people take when benzos ran out.
### The hit
Rush **14** (A) — Soft lift, not a pyro.
Euphoria **48** (A) — Nerve-pill glow. The benzo people take when benzos ran out.
Enjoyment **58** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **76** (A) — High diversion pull in UK/EU scenes.
### The bill
Dependence, combo culture — score the molecule, not the opioid mix.
Blackout 20 · amnesia 18 · sedation 45 · impairment 48 · dependence 72 · withdrawal 70.
NPC line: Nerve-pill glow. The benzo people take when benzos ran out.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Phenibut (Anvifen, Noofen, phenylibut)
Status: well_documented
Market: street
Headline: Sober-feeling courage with a withdrawal that isn't.
### The hit
Rush **—** (U) — Delayed. People stack because they think nothing happened.
Euphoria **44** (A) — Sober-feeling courage. That glow is the product.
Enjoyment **54** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **84** (A) — Very high. Withdrawal that is not a rumor.
### The bill
Rebound anxiety, insomnia, days of shake. Rush is null.
Blackout 15 · amnesia 12 · sedation 40 · impairment 35 · dependence 80 · withdrawal 88.
NPC line: Sober-feeling courage with a withdrawal that isn't.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Carisoprodol (Soma)
Status: well_documented
Market: street
Headline: Muscle melt with a smirk. The bottle empties itself.
### The hit
Rush **16** (B) — Mild onset. Muscle smirk.
Euphoria **46** (B) — More liked than most benzos. The bottle empties itself.
Enjoyment **56** (B) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **72** (B) — Combo lore exists — do not write a recipe. Habit is real.
### The bill
Impairment, meprobamate withdrawal underneath.
Blackout 36 · amnesia 32 · sedation 62 · impairment 68 · dependence 74 · withdrawal 72.
NPC line: Muscle melt with a smirk. The bottle empties itself.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Secobarbital (Seconal, reds, red devils)
Status: well_documented
Market: street
Headline: Reds. The fun barbiturates had before they started finishing people.
### The hit
Rush **18** (B) — A little onset versus phenobarbital.
Euphoria **56** (B) — Reds. The fun barbiturates had. More euphoria than any benzo here.
Enjoyment **62** (B) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **78** (B) — High, and the cliff is narrower.
### The bill
OD flag. Withdrawal can kill. Historical street, not a modern flood.
Blackout 58 · amnesia 50 · sedation 86 · impairment 78 · dependence 84 · withdrawal 88.
NPC line: Reds. The fun barbiturates had before they started finishing people.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

## Xylazine (tranq, anestesia de caballo)
Status: well_documented
Market: street
Headline: Nobody asked for this. The bag brought it anyway.
### The hit
Rush **—** (U) — None. Nobody asked for this.
Euphoria **—** (A) — Enjoyment ~null. Not a sought high.
Enjoyment **4** (A) — first-hour warm/relief. Same story as euphoria unless the night was only functional.
Compulsiveness **12** (A) — Low as a product. High as a trapped contaminant.
### The bill
Wounds, hypotension, not naloxone-reversible. Adulterant flag.
Blackout 20 · amnesia 8 · sedation 90 · impairment 70 · dependence 25 · withdrawal 30.
NPC line: Nobody asked for this. The bag brought it anyway.
Sources: EMCDDA/EUDA new benzodiazepines review 2021 + 2024 market chapter; UNODC EWA 2024–25; CFSRE NPS Discovery; ACMD 2024; street feel tagged as rumor.
Gaps: None beyond class unknowns.

---

## Full wall (every documented name)

## Assignment 25 — Benzodiazepines / thienodiazepines / RC sedatives

### Traditional 1,4-benzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Chlordiazepoxide** (Librium) | well_documented | uncertain | medical_not_rc | 38 | 24 | — | 58 | 22 | 28 | 78 | The first benzo. Anxiety off, party never invited. |
| **Diazepam** (Valium, blues, Vs) | well_documented | street | medical_not_rc | 58 | 42 | — | 74 | 48 | 52 | 88 | The original calm. Muscle melt, memory tax, week-long hangover. |
| **Oxazepam** (Serax, Seresta) | well_documented | uncertain | medical_not_rc | 36 | 22 | — | 50 | 20 | 28 | 62 | Slow in, short stay, nobody writes home. |
| **Temazepam** (Restoril, jellies, eggs) | well_documented | street | medical_not_rc | 64 | 48 | — | 76 | 72 | 70 | 78 | The sleep cap that used to be a street legend. Hangover still rude. |
| **Lorazepam** (Ativan, loraz) | well_documented | street | medical_not_rc | 48 | 32 | — | 78 | 58 | 64 | 86 | Hospital calm in a pill. Panic dies, so does the afternoon. |
| **Clonazepam** (Klonopin, Kpins, Rivotril) | well_documented | street | medical_not_rc | 52 | 36 | — | 82 | 55 | 58 | 90 | Long fuse. You feel fine until you don't remember the week. |
| **Nitrazepam** (Mogadon) | well_documented | uncertain | medical_not_rc | 40 | 24 | — | 60 | 62 | 66 | 74 | Old-world sleeping brick. Morning still drunk. |
| **Flunitrazepam** (Rohypnol, roofies, roches) | well_documented | street | medical_not_rc | 44 | 30 | — | 66 | 92 | 94 | 76 | The myth is a movie. The truth is amnesia you volunteered for. |
| **Flurazepam** (Dalmane) | well_documented | uncertain | medical_not_rc | 14 | 6 | — | 48 | 50 | 56 | 72 | Sleep that overstays. Next day is still last night. |
| **Clorazepate** (Tranxene) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 60 | 35 | 40 | 82 | Prodrug Valium. Same ghost, slower knock. |
| **Nordazepam** (nordiazepam, Madar) | well_documented | street | medical_not_rc | 20 | 10 | — | 58 | 32 | 38 | 80 | The metabolite half the wall turns into. Calm with no headline. |
| **Prazepam** (Centrax, Demetrin) | well_documented | uncertain | medical_not_rc | 16 | 8 | — | 50 | 28 | 32 | 76 | Another door into nordazepam. Nobody asks for it by name. |
| **Halazepam** (Paxipam) | well_documented | uncertain | medical_not_rc | 14 | 6 | — | 46 | 26 | 30 | 72 | Withdrawn US anxiolytic. The quiet uncle. |
| **Bromazepam** (Lexotan, Lectopam) | well_documented | street | medical_not_rc | 56 | 40 | — | 74 | 50 | 54 | 84 | Euro-Xanax energy without the triazolo punch. Still sticky. |
| **Medazepam** (Nobrium, Rudotel) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 50 | 24 | 28 | 70 | Daytime 'calm' that still files a dependence claim. |
| **Pinazepam** (Domar) | well_documented | uncertain | medical_not_rc | 16 | 8 | — | 48 | 26 | 30 | 72 | Propargyl-Valium. Regional script, global shrug. |
| **Tetrazepam** (Myolastan) | well_documented | uncertain | medical_not_rc | 24 | 14 | — | 56 | 30 | 34 | 70 | Muscle-relax benzo they pulled after the skin blew up. |
| **Lormetazepam** (Noctamid) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 60 | 68 | 70 | 72 | Euro sleep bomb. Amnesia included, fun not. |
| **Loprazolam** (Dormonoct) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 54 | 60 | 64 | 68 | Another sleeping brick with a fancy ring. |
| **Quazepam** (Doral) | well_documented | uncertain | medical_not_rc | 16 | 6 | — | 50 | 48 | 52 | 70 | Selective sleep benzo. Still steals the morning. |
| **Fludiazepam** (Erispan) | well_documented | uncertain | medical_not_rc | 28 | 16 | — | 64 | 52 | 56 | 78 | Japan's smaller, meaner Valium. |
| **Flutoprazepam** (Restas) | well_documented | uncertain | medical_not_rc | 24 | 14 | — | 58 | 50 | 54 | 76 | Long JP hypnotic. Next-day still signed in. |
| **Nimetazepam** (Erimin, Erimin-5) | well_documented | street | medical_not_rc | 62 | 48 | — | 78 | 78 | 80 | 80 | Asia's recreational hypnotic. Erimin-5 was a brand and then a counterfeit industry. |
| **Delorazepam** (Dadumir, chlordesmethyldiazepam) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 60 | 48 | 52 | 80 | Italian long-stay. Diclazepam's legal dad. |
| **Ethyl loflazepate** (Meilax, Victan) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 54 | 36 | 40 | 76 | Ester-Valium. Long and bureaucratic. |
| **Cinolazepam** (Gerodorm) | well_documented | uncertain | medical_not_rc | 16 | 6 | — | 46 | 44 | 48 | 60 | Central-Europe sleep tablet. No fan club. |
| **Camazepam** (Albego) | well_documented | uncertain | medical_not_rc | 20 | 10 | — | 50 | 28 | 32 | 66 | Carbamate-temazepam. Claimed 'less drowsy.' Dependence didn't read the brochure. |
| **Ketazolam** (Anxon) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 56 | 34 | 38 | 74 | Extra ring on Valium. Same ghost. |
| **Doxefazepam** (Doxans) | well_documented | uncertain | medical_not_rc | 16 | 6 | — | 48 | 42 | 46 | 62 | Italian hypnotic nobody smuggled on purpose. |
| **Metaclazepam** (Talis) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 50 | 30 | 34 | 68 | Withdrawn German anxiolytic. Dusty crate. |
| **Gidazepam** (Gidazepam IC) | moderately_documented | street | circulated | 24 | 12 | — | 62 | 28 | 32 | 74 | Post-Soviet 'daytime' benzo. The street wanted the metabolite instead. |
| **Cinazepam** (Levana) | moderately_documented | street | circulated | 22 | 10 | — | 56 | 40 | 44 | 70 | Ukraine sleep ester. Prodrug to 3-hydroxyphenazepam. |
| **Phenazepam** (Phenazepam, Soviet xanax) | well_documented | street | flooded | 46 | 30 | — | 74 | 80 | 78 | 88 | Soviet long-stay. Hangover measured in days. First EU 'legal benzo.' |

- **Chlordiazepoxide** — 1960 Librium. Long metabolites. Alcohol-detox shelf, not a street rush.
- **Diazepam** — Parent of half the designer wall. Diverted + fake-tablet host. Compulsive maintenance, not a pyro.
- **Oxazepam** — No active metabolites. Liver-safe medical. Recreational reviews: wet cardboard.
- **Temazepam** — UK gel-cap era made it the recreational 1,4. Still a hypnotic, not a rush. High impairment.
- **Lorazepam** — Potent 3-hydroxy. Panic-script favorite. Compulsive because fear returns, not because it was fun.
- **Clonazepam** — Nitro 1,4. Seizure + anxiety script. Slow, sticky dependence. People stay on it because stopping is worse.
- **Nitrazepam** — Classic hypnotic. Hangover sedation. Recreational value near-null; dependence is the hook.
- **Flunitrazepam** — Restricted hypnotic. Blackout/amnesia king of the medical 1,4s. Enjoyment low; the reputation is the product.
- **Flurazepam** — Ultra-long metabolites. Hypnotic with a hangover measured in shifts.
- **Clorazepate** — Converts to nordazepam. Maintenance anxiolytic. No rush, long tail.
- **Nordazepam** — Active metabolite of diazepam/clorazepate/prazepam. Also sold itself. Long and dull.
- **Prazepam** — N-cyclopropylmethyl prodrug. Medical leftover.
- **Halazepam** — N-trifluoroethyl. Pulled from US market. Not a street SKU.
- **Bromazepam** — Pyridyl 1,4. Big outside the US. Some actual like; still not a rush.
- **Medazepam** — N-methyl 1,4 without the 2-keto (until metabolized). Old daytime anxiolytic.
- **Pinazepam** — Italian/Spanish medical. Prodrug-ish to nordazepam.
- **Tetrazepam** — Cyclohexenyl instead of phenyl. EU withdrawal (SJS/TEN). Not a party drug.
- **Lormetazepam** — 3-hydroxy hypnotic. Stronger sleep/amnesia than temazepam for many.
- **Loprazolam** — Imidazo-fused hypnotic. Medical Europe.
- **Quazepam** — Thione + trifluoroethyl. Claimed alpha-1 bias. Hangover still a thing.
- **Fludiazepam** — 2'-fluoro diazepam. JP medical. Potent relative of diazepam.
- **Flutoprazepam** — N-cyclopropylmethyl fluoro. Japan. EMCDDA flagged as possible future NPS.
- **Nimetazepam** — N-methyl nitrazepam. Medical JP/SE Asia + huge fake-tablet scene. More 'liked' than Mogadon.
- **Delorazepam** — 2'-chloro nordazepam. Medical IT. Parent shape of diclazepam.
- **Ethyl loflazepate** — Prodrug to descarboxyloflazepate / norflurazepam-like. FR/JP/ES medical.
- **Cinolazepam** — 3-hydroxy + cyanoethyl. Hypnotic in AT/BG/SK etc.
- **Camazepam** — 3-dimethylcarbamoyl temazepam analog. Old anxiolytic.
- **Ketazolam** — Opens to diazepam in vivo. Medical leftover.
- **Doxefazepam** — EMCDDA listed as possible future NPS. Medical IT.
- **Metaclazepam** — Bromo 2-methoxymethyl. No longer marketed DE/AT.
- **Gidazepam** — Hydrazide prodrug. UA/RU medical. Rec market prefers desalkylgidazepam.
- **Cinazepam** — Succinyl ester of 3-hydroxyphenazepam. Medical UA + EWS 2019.
- **Phenazepam** — USSR 1975 medicine, EWS 2007. Internationally controlled 2016. Blackouts and duration are the product.

### Traditional 1,5-benzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Clobazam** (Onfi, Frisium) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 54 | 28 | 32 | 70 | The 1,5 that claims it's less drunk. Dependence still files. |

- **Clobazam** — Epilepsy/anxiety. Less sedating on paper. Not a recreational headliner.

### Traditional triazolobenzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Alprazolam** (Xanax, bars, zannies) | well_documented | street | medical_not_rc | 68 | 54 | — | 88 | 82 | 78 | 92 | Not a rush. A hole in the calendar you keep digging. |
| **Triazolam** (Halcion) | well_documented | uncertain | medical_not_rc | 38 | 24 | — | 72 | 90 | 92 | 74 | Sleep scalpel. You will not remember agreeing to this. |
| **Estazolam** (ProSom, Nuctalon) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 56 | 58 | 62 | 68 | Triazolo without the Xanax mythology. Still a sleep thief. |
| **Adinazolam** (Deracyn) | moderately_documented | street | circulated | 22 | 12 | — | 58 | 40 | 44 | 62 | Failed antidepressant triazolo that later sat on RC tables. |

- **Alprazolam** — THE short triazolo. Fake-bar host. First hour is warm relief people chase. Compulsiveness is the hole in the calendar, scored on its own.
- **Triazolam** — Ultra-short hypnotic. Infamous amnesia. Restricted/withdrawn in some countries. Compulsive redose because it ends too fast.
- **Estazolam** — Desmethyl-alprazolam shape. Hypnotic. No street cult.
- **Adinazolam** — Never marketed US. EWS 2015. Metabolizes toward alprazolam-like. Underwhelming reviews.

### Traditional imidazo / related medical

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Midazolam** (Versed, Dormicum, Hypnovel) | well_documented | uncertain | medical_not_rc | 40 | 28 | 28 | 52 | 88 | 90 | 58 | The procedure. Lights out, consent optional, memory refunded. |
| **Remimazolam** (Byfavo) | well_documented | uncertain | medical_not_rc | 10 | 6 | 18 | 28 | 70 | 74 | 28 | Soft-on, soft-off anesthesia benzo. No street story yet. |
| **Climazolam** | moderately_documented | uncertain | medical_not_rc | 8 | — | — | 20 | 60 | 64 | 22 | Vet midazolam cousin. Not a human SKU. |
| **Zolazepam** (Telazol component) | moderately_documented | uncertain | medical_not_rc | 12 | 6 | — | 24 | 50 | 54 | 26 | The benzo half of Telazol. The tiletamine half is the story. |

- **Midazolam** — Short imidazo. Oral/IV medical. Rush only if parenteral — still not a 'fun' rush. Amnesia is the feature.
- **Remimazolam** — Esterase-metabolized. Procedural sedation. Recreational-market: literature-adjacent, not a bag.
- **Climazolam** — Veterinary imidazo. Literature/vet only for this catalog.
- **Zolazepam** — Paired with tiletamine in vet. Human rec is rare and stupid.

### Traditional thienodiazepines / thienotriazolos

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Etizolam** (Depas, etiz, etilaam) | well_documented | street | flooded | 66 | 50 | — | 82 | 70 | 68 | 86 | Japan's prescription. Scotland's fake diazepam. The thieno people actually liked. |
| **Clotiazepam** (Rize, Trecalmo, Veratran) | well_documented | uncertain | medical_not_rc | 42 | 28 | — | 58 | 32 | 36 | 68 | Short thieno anxiolytic. Medical JP/EU. No cult. |
| **Bentazepam** (Thiadipona) | moderately_documented | street | circulated | 20 | 10 | — | 52 | 28 | 32 | 72 | Spanish thieno with a liver warning. ACMD still scheduled the name. |
| **Brotizolam** (Lendormin, Dormex) | well_documented | uncertain | medical_not_rc | 22 | 12 | — | 62 | 74 | 76 | 70 | Thieno-Halcion. Sleep, amnesia, clock-out. |

- **Etizolam** — Medical JP/IT. EWS 2011. Fake Valium/Xanax host. The thieno people actually liked. UN 2020. Flood, not a name.
- **Clotiazepam** — No fused triazole. Shorter than diazepam.
- **Bentazepam** — Medical ES. Hepatotoxicity rumor. EWS 2019 / ACMD 2024 list.
- **Brotizolam** — Medical hypnotic (DE/JP/MX). UN controlled. Parent shape of flubrotizolam.

### Traditional oxazolodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Oxazolam** (Serenal) | well_documented | uncertain | medical_not_rc | 14 | 6 | — | 44 | 24 | 28 | 64 | Prodrug ring that becomes a 1,4. Nobody seeks the crate. |
| **Cloxazolam** (Sepazon, Olcadil) | well_documented | uncertain | medical_not_rc | 18 | 8 | — | 50 | 36 | 40 | 72 | Oxazolo-clonazepam cousin. Script, not a scene. |
| **Mexazolam** (Melex, Sedoxil) | well_documented | uncertain | medical_not_rc | 16 | 6 | — | 46 | 28 | 32 | 66 | JP/PT anxiolytic. EMCDDA's 'might show up later' list. |
| **Flutazolam** (Coreminal) | well_documented | uncertain | medical_not_rc | 16 | 6 | — | 44 | 34 | 38 | 62 | JP hypnotic oxazolo. Still waiting to become an NPS headline. |
| **Haloxazolam** (Somelin) | well_documented | uncertain | medical_not_rc | 14 | 4 | — | 42 | 40 | 44 | 60 | Bromo sleep oxazolo. Internationally controlled, culturally forgotten. |

- **Oxazolam** — Opens to a diazepam-like. JP/elsewhere medical.
- **Cloxazolam** — 2'-chloro oxazolo. Medical JP/BR/EU.
- **Mexazolam** — Medical Japan/Portugal.
- **Flutazolam** — Medical Japan. EMCDDA possible-future list.
- **Haloxazolam** — UN 1971 Schedule IV. JP hypnotic.

### Atypical 2,3-benzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Tofisopam** (Grandaxin, Emandaxin) | well_documented | uncertain | medical_not_rc | 20 | 10 | — | 28 | 4 | 6 | 20 | A benzo that isn't. Anxiety maybe. GABA-A mostly no. |
| **Girisopam** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Hungarian 2,3 leftover. Not a downer kit. |
| **Nerisopam** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Same 2,3 shelf. Skip unless the crate is a joke. |

- **Tofisopam** — 2,3-BZD, AMPA-ish / PDE. Not a classic downer. EWS saw it anyway (2018). Low compulsiveness because it doesn't scratch the benzo itch.
- **Girisopam** — Research 2,3-BZD. Not GABA-A sedative in the classic sense.
- **Nerisopam** — Research 2,3-BZD.

### Designer 1,4-benzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Diclazepam** (2'-chlorodiazepam, Ro5-3448) | well_documented | rc_era | flooded | 48 | 32 | — | 76 | 58 | 60 | 86 | Valium's longer cousin you take so tomorrow doesn't exist either. |
| **Flubromazepam** (JYI-42) | well_documented | rc_era | flooded | 40 | 24 | — | 72 | 72 | 70 | 84 | Phenazepam with a fluoro punch. Duration is a war crime. |
| **3-Hydroxyphenazepam** (3-HO-phenazepam) | moderately_documented | rc_era | circulated | 18 | 8 | — | 64 | 62 | 64 | 78 | Phenazepam's metabolite sold as its own pellet. Same week, extra step. |
| **Meclonazepam** ((S)-3-methylclonazepam) | moderately_documented | rc_era | circulated | 22 | 12 | — | 58 | 48 | 52 | 70 | Roche leftover with a malaria footnote. RC era: mid. |
| **Nifoxipam** (3-hydroxy-desmethylflunitrazepam) | moderately_documented | rc_era | circulated | 16 | 8 | — | 60 | 70 | 74 | 68 | Roofie metabolite as a powder. Amnesia without the brand. |
| **Fonazepam** (desmethylflunitrazepam, norflunitrazepam) | moderately_documented | rc_era | circulated | 18 | 8 | — | 56 | 68 | 72 | 66 | Flunitrazepam with the methyl kicked off. Still a blackout machine. |
| **Cloniprazepam** (prazepam-clonazepam hybrid) | moderately_documented | rc_era | circulated | 20 | 10 | — | 62 | 50 | 54 | 74 | Clonazepam wearing prazepam's backpack. Prodrug energy. |
| **Methylclonazepam** (N-methylclonazepam, Ro5-4082) | well_documented | rc_era | flooded | 22 | 12 | — | 60 | 52 | 56 | 72 | Clonazepam plus a methyl. Roche code that leaked. |
| **Norfludiazepam** (desalkylflurazepam, norflurazepam, Ro5-3367) | moderately_documented | rc_era | circulated | 16 | 6 | — | 58 | 46 | 50 | 78 | Flurazepam's long ghost, sold without the parent. |
| **Thionordazepam** (thionordiazepam) | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Sulfur nordazepam. Vendor dust with an ACMD sticker. |
| **Difludiazepam** (Ro07-4065) | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Diazepam with two fluorines. Roche number on a vendor bag. |
| **4'-Chlorodiazepam** (Ro5-4864, 4-chlorodiazepam) | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Looks like a benzo. Binds TSPO. Does not scratch the itch. |
| **Desalkylgidazepam** (bromonordiazepam, desalkyl-gidazepam) | well_documented | street | flooded | 44 | 28 | — | 68 | 40 | 44 | 76 | Gidazepam without the disguise. 2020s pellet filler. |
| **Nitemazepam** (3-hydroxy-nimetazepam) | moderately_documented | rc_era | circulated | 22 | 12 | — | 60 | 64 | 68 | 68 | Erimin's metabolite as a powder. Same sleep, less brand. |
| **Flutemazepam** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Fluoro-temazepam on a Roche spreadsheet. Barely a product. |

- **Diclazepam** — EWS 2013. Metabolizes to delorazepam/lormetazepam/lorazepam. Taper myth + fake-tablet filler. DEA temp SI 2023.
- **Flubromazepam** — EWS 2013. Very long. Blackouts stacked on half-life. CFSRE still scopes it.
- **3-Hydroxyphenazepam** — EWS 2016. Active metabolite + cinazepam product. Also shows in 2025 tox as a marker.
- **Meclonazepam** — EWS 2014. 3-methyl clonazepam. Was researched vs schisto. Mixed vendor reviews.
- **Nifoxipam** — EWS 2015. 3-hydroxy fonazepam. Heavy sleep/amnesia, low 'fun.'
- **Fonazepam** — EWS 2016. Active metabolite sold as NPS.
- **Cloniprazepam** — EWS 2016. N-cyclopropylmethyl clonazepam. ACMD 2024.
- **Methylclonazepam** — EWS 2018. ACMD 2024.
- **Norfludiazepam** — EWS 2017. Metabolite of flurazepam/quazepam/midazolam-adjacent. CFSRE tier 3 as desalkylflurazepam.
- **Thionordazepam** — EWS 2017. ACMD 2024. Thin reports.
- **Difludiazepam** — EWS 2017. ACMD 2024.
- **4'-Chlorodiazepam** — EWS 2016 as 4-chlorodiazepam. Peripheral BZD / TSPO ligand, not classic GABA-A. Do not kit as Xanax.
- **Desalkylgidazepam** — CFSRE 2022+. Aegis 2025 still hitting via 3-hydroxy metabolite. ACMD 2024. Long, functional-ish, not a bar.
- **Nitemazepam** — RC follow-on to nimetazepam.
- **Flutemazepam** — Named in benzo tables; human rec reports thin.

### Designer triazolobenzodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Pyrazolam** (SH-I-04) | moderately_documented | rc_era | circulated | 42 | 24 | — | 48 | 28 | 34 | 54 | Anxiety off. Party never started. The functional RC. |
| **Clonazolam** (clonitrazolam, clam) | well_documented | street | flooded | 44 | 28 | — | 94 | 96 | 94 | 90 | You wake up three days later holding receipts you don't remember signing. |
| **Flubromazolam** (JYI-73, flubro) | well_documented | rc_era | flooded | 36 | 22 | — | 91 | 97 | 95 | 88 | One pellet, two days missing, a fine you can't explain. |
| **Flualprazolam** (flualp) | well_documented | street | flooded | 56 | 40 | — | 86 | 88 | 86 | 86 | Xanax with a fluorine and no adult supervision. Fake-bar era boss. |
| **Bromazolam** (XLI-268, bromaz) | well_documented | street | flooded | 60 | 44 | — | 84 | 80 | 78 | 84 | Whatever is actually in the fake bar this year. |
| **Flunitrazolam** (flunitraz) | moderately_documented | rc_era | circulated | 14 | 6 | — | 78 | 94 | 93 | 80 | Rohypnol that learned triazolo. Amnesia with a microscope. |
| **Nitrazolam** | moderately_documented | rc_era | circulated | 16 | 8 | — | 64 | 72 | 74 | 70 | Nitrazepam in a triazolo jacket. Sleep that lies. |
| **Phenazolam** (clobromazolam, DM-II-90) | well_documented | street | flooded | 52 | 36 | — | 82 | 84 | 82 | 82 | Bromazolam plus a chlorine. The replacement the bans invited. |
| **4'-Chloro-deschloroalprazolam** (4'-Cl-deschloroalprazolam) | moderately_documented | rc_era | circulated | 18 | 8 | — | 60 | 50 | 54 | 64 | Alprazolam with the halogen walked to 4'. Vendor isomer bait. |
| **Ethylbromazolam** | limited_evidence | rc_era | circulated | — | — | — | — | — | — | — | Bromazolam with extra carbon. Half the punch in rumor. |
| **Cyclopropylflualprazolam** | limited_evidence | rc_era | circulated | — | — | — | — | — | — | — | Pressed into 'sleep candy' in 2026. The triazolo that learned packaging. |
| **Pyclazolam** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Pyrazolam's chloro twin. Spreadsheet, not a scene. |
| **Fluadinazolam** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Fluoro-adinazolam. Vendor theory. |
| **Ethylflualprazolam** | limited_evidence | rc_era | circulated | — | — | — | — | — | — | — | Flualprazolam plus a carbon. CFSRE scoped it. Feel file is empty. |
| **8-Aminoclonazolam** (8-aminoclonazolam) | alias_duplicate | literature_only | names_only | — | — | — | — | — | — | — | Clonazolam's metabolite the lab sees. Not a second bottle. |

- **Pyrazolam** — First true designer advertised ~2012. Pyridyl + bromo. Low sedation vs clonazolam. Compulsiveness moderate because it works as a tool, not a toy.
- **Clonazolam** — EWS 2015. Clonazepam x alprazolam. First 20 minutes can still feel like a bar. Then the week is gone. DEA temp SI.
- **Flubromazolam** — EWS 2014. Extreme potency/duration. Forum horror stories. DEA temp SI. Fun is not the point; the point is you take more.
- **Flualprazolam** — EWS 2018. UN 2020. Fake-bar flood after etizolam heat. Bar-shaped first hour.
- **Bromazolam** — EWS 2016. Dominant US NPS benzo ~2023-2026. UN 2024. Current fake-bar king.
- **Flunitrazolam** — EWS 2016. Extreme potency. Thin 'fun,' fat blackout.
- **Nitrazolam** — EWS 2015 / CFSRE 2018. Mid-tier designer.
- **Phenazolam** — EWS as clobromazolam 2018; CFSRE 2022+. Rising 2024–2025 as bromazolam heat lands. Sweden 2016 first seizure. Same kit, nastier stamp.
- **4'-Chloro-deschloroalprazolam** — CFSRE 2022. ACMD 2024. Weaker/odd vs alprazolam.
- **Ethylbromazolam** — CFSRE Q3 2025 tier 3. Newer stamp, thinner reports.
- **Cyclopropylflualprazolam** — Isolated in pressed candies marketed for sleep (2026 paper). New enough that feel-cards are rumor.
- **Pyclazolam** — Named analog. Human rec thin.
- **Fluadinazolam** — Named in analog tables. Not a CFSRE headliner.
- **Ethylflualprazolam** — CFSRE Q3 2026 tier 2. Detected. No honest human feel pile.
- **8-Aminoclonazolam** — CFSRE tier 1 as a marker. Alias of clonazolam exposure, not a distinct SKU.

### Designer thienodiazepines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Deschloroetizolam** (dechloroetizolam) | moderately_documented | rc_era | circulated | 50 | 36 | — | 60 | 36 | 40 | 64 | Etizolam on a diet. Functional, forgettable. |
| **Metizolam** (desmethyletizolam) | moderately_documented | rc_era | circulated | 48 | 34 | — | 58 | 40 | 44 | 66 | Etizolam minus a methyl. Same family, less magic. |
| **Fluclotizolam** | moderately_documented | rc_era | circulated | 42 | 28 | — | 70 | 76 | 74 | 74 | Thieno-clonazolam energy. Short, heavy, easy to overshoot. |
| **Fluetizolam** | moderately_documented | rc_era | circulated | 22 | 12 | — | 64 | 58 | 56 | 68 | Etizolam with a fluorine. ACMD listed; UK detections thin. |
| **Flubrotizolam** (LS-152,574) | moderately_documented | rc_era | circulated | 14 | 6 | — | 72 | 82 | 80 | 74 | Brotizolam's fluoro twin. Sleep that overcommits. |
| **Deschloroclotizolam** | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Clotizolam stripped. Vendor SKU, thin lore. |

- **Deschloroetizolam** — EWS 2014. Weaker etizolam. CFSRE 2021.
- **Metizolam** — EWS 2015. CFSRE 2020.
- **Fluclotizolam** — EWS 2018 as flucotizolam. CFSRE 2021. ACMD 2024. Potent short thieno.
- **Fluetizolam** — CFSRE 2022. ACMD 2024. Replacement-wave thieno.
- **Flubrotizolam** — ACMD 2024. Designer thieno hypnotic. Reports: heavy, amnesic.
- **Deschloroclotizolam** — ACMD 2024. Limited rec-market footprint vs etizolam family.

### Benzo prodrugs / partial agonists / antagonist

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Rilmazafone** (Rhythmy) | moderately_documented | street | circulated | 18 | 8 | — | 50 | 46 | 50 | 60 | Japan's sleeping powder that becomes a benzo in the gut. ACMD still wants it. |
| **Bretazenil** (Ro16-6028) | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Partial-agonist Roche that was supposed to be safer. Never a street bag. |
| **Flumazenil** (Anexate, Romazicon) | well_documented | uncertain | medical_not_rc | — | — | — | 8 | 0 | 0 | 70 | The off switch. Also a seizure if you owed the benzo a debt. |

- **Rilmazafone** — Not a fused BZD until metabolized to rilmazolam-like. JP hypnotic. ACMD 2024.
- **Bretazenil** — ACMD 2024 listed. Partial agonist. Low recreational signal.
- **Flumazenil** — Antagonist, not a sedative. Catalogued because kits need the antidote flag. Withdrawal/seizure risk in dependent NPCs.

## Assignment 26 — Other sedatives (still no opioids)

### Z-drugs

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Zolpidem** (Ambien, Stilnox, Ambien-walking) | well_documented | street | other | 52 | 40 | — | 62 | 75 | 82 | 50 | Sleeping pill that sends you grocery shopping in your underwear. |
| **Zopiclone** (Imovane, Zimovane) | well_documented | street | other | 42 | 28 | — | 64 | 50 | 54 | 66 | Metallic sleep. Hangover with a taste you can't spit out. |
| **Eszopiclone** (Lunesta) | well_documented | uncertain | other | 40 | 26 | — | 60 | 46 | 50 | 62 | Zopiclone's prettier isomer. Same metal, US label. |
| **Zaleplon** (Sonata) | well_documented | uncertain | other | 16 | 8 | — | 44 | 40 | 48 | 38 | Ultra-short. The one you redose because it already left. |

- **Zolpidem** — alpha-1 biased. Not a benzo hug. Compulsive in the 'maybe this time I'll sleep / maybe I'll text' way. Bizarre amnesia is the folklore.
- **Zopiclone** — Euro/CA/AU hypnotic. Dependence real. Fun low. Metallic taste is the NPC tell.
- **Eszopiclone** — S-zopiclone. Medical US. Same dependence family.
- **Zaleplon** — Very short hypnotic. Some rec 'boost' talk; still not fun. Amnesia yes.

### Z-drug relatives (imidazopyridine / cyclopyrrolone pipeline)

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Alpidem** (Ananxyl) | well_documented | uncertain | other | 18 | 10 | — | 40 | 16 | 20 | 42 | Zolpidem's anxiolytic cousin they pulled for livers. |
| **Indiplon** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | The Z that never got a bottle. Paper hypnotic. |
| **Pagoclone** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Partial-agonist cyclopyrrolone. Stutter trial, no street. |
| **Suriclone** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Zopiclone's research sibling. Binder, not a bag. |
| **Necopidem** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Alpidem analog on a patent. Skip. |
| **Saripidem** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Another zolpidem cousin that stayed in the lab. |

- **Alpidem** — Withdrawn (hepatotoxicity). Not a rec-market staple.
- **Indiplon** — Never marketed US. Pipeline corpse.
- **Pagoclone** — Research. Not GABA-full like zopiclone.
- **Suriclone** — Never marketed.
- **Necopidem** — Research imidazopyridine.
- **Saripidem** — Research.

### Barbiturates

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Phenobarbital** (Luminal, pheno) | well_documented | uncertain | other | 14 | 8 | — | 42 | 20 | 22 | 78 | Seizure medicine. Recreational as a wet blanket. |
| **Pentobarbital** (Nembutal, yellow jackets) | well_documented | street | other | 56 | 50 | 16 | 76 | 60 | 52 | 88 | Veterinary exit and old-school knockout. More euphoria than benzos. Narrower cliff. |
| **Secobarbital** (Seconal, reds, red devils) | well_documented | street | other | 62 | 56 | 18 | 78 | 58 | 50 | 88 | Reds. The fun barbiturates had before they started finishing people. |
| **Amobarbital** (Amytal, blue heavens) | well_documented | street | other | 54 | 48 | 14 | 72 | 50 | 46 | 84 | Blues. Interview drug, sleep drug, bad idea drug. |
| **Butalbital** (Fioricet, Fiorinal) | well_documented | street | other | 32 | 24 | — | 68 | 28 | 26 | 76 | The headache combo people refill for the wrong reason. |
| **Thiopental** (Pentothal, sodium pentothal) | well_documented | uncertain | other | 16 | 12 | 28 | 30 | 70 | 64 | 40 | Induction. One arm-brain circuit, then you're not in the room. |
| **Methohexital** (Brevital) | well_documented | uncertain | other | 12 | 8 | 24 | 26 | 62 | 58 | 32 | Shorter pentothal. ECT shelf, not a trap SKU. |
| **Barbital** (Veronal) | well_documented | uncertain | other | 12 | 6 | — | 36 | 18 | 20 | 70 | 1903. The first. Slow, long, museum sleep. |
| **Butabarbital** (Butisol) | well_documented | uncertain | other | 28 | 20 | — | 58 | 32 | 30 | 74 | Intermediate barbiturate. Old bottle, old habit. |
| **Hexobarbital** (Evipan) | well_documented | uncertain | other | 18 | 12 | 16 | 34 | 40 | 36 | 48 | Old induction barbiturate. History book, not a bag. |
| **Primidone** (Mysoline) | well_documented | uncertain | other | 10 | 4 | — | 32 | 12 | 14 | 62 | Turns into phenobarbital in the body. Still not a party. |
| **Mephobarbital** (Mebaral, methylphenobarbital) | well_documented | uncertain | other | 12 | 6 | — | 36 | 16 | 18 | 64 | N-methyl phenobarbital. Epilepsy shelf. |
| **Aprobarbital** (Alurate) | well_documented | uncertain | other | 22 | 16 | — | 50 | 28 | 26 | 68 | Dead brand, live scaffold. Intermediate downer. |
| **Talbutal** (Lotusate) | well_documented | uncertain | other | 24 | 18 | — | 52 | 30 | 28 | 70 | Another intermediate from the bottle era. |
| **Thiamylal** (Surital) | moderately_documented | uncertain | other | 10 | 6 | 20 | 22 | 55 | 50 | 30 | Vet pentothal. Not a human SKU. |
| **Vinylbital** (Optanox) | well_documented | uncertain | other | 20 | 14 | — | 48 | 28 | 26 | 66 | Euro hypnotic barbiturate. Off the shelves, on the list. |
| **Cyclobarbital** (Phanodorm) | well_documented | uncertain | other | 22 | 16 | — | 50 | 30 | 28 | 68 | Old hypnotic. Same cliff, different stamp. |
| **Heptabarbital** (Medomin) | well_documented | uncertain | other | 20 | 14 | — | 46 | 26 | 24 | 64 | Longer-chain barbiturate. Museum bottle. |
| **Allobarbital** (Dial) | well_documented | uncertain | other | 16 | 10 | — | 44 | 22 | 20 | 68 | Diallyl barbiturate. Pre-war sleep. |
| **Butobarbital** (Soneryl, butobarbitone) | well_documented | uncertain | other | 30 | 22 | — | 60 | 34 | 32 | 76 | UK old hypnotic. Intermediate nod. |

- **Phenobarbital** — Long anticonvulsant. Still prescribed. Dependence/withdrawal real; enjoyment near-null. Enzyme-induction NPC flag.
- **Pentobarbital** — Short-intermediate. Historical rec + vet euthanasia lore. More 'liked' than phenobarbital. OD flag high.
- **Secobarbital** — Classic recreational barbiturate. More euphoria than any benzo in this file. Compulsive and lethal-adjacent.
- **Amobarbital** — Intermediate. Historical rec + 'truth serum' folklore.
- **Butalbital** — Diverted from butalbital/APAP/caffeine scripts. Compulsive refill, modest glow.
- **Thiopental** — Ultra-short IV anesthetic. Recreational-market almost nil. Rush is anesthesia, not fun.
- **Methohexital** — Ultra-short. Medical/procedural.
- **Barbital** — First marketed barbiturate. Historical.
- **Butabarbital** — US medical leftover.
- **Hexobarbital** — Historical short-acting.
- **Primidone** — Anticonvulsant. Metabolite phenobarbital + PEMA.
- **Mephobarbital** — Prodrug-ish to phenobarbital.
- **Aprobarbital** — Historical medical.
- **Talbutal** — Historical medical.
- **Thiamylal** — Ultra-short thiobarbiturate. Vet.
- **Vinylbital** — Historical EU.
- **Cyclobarbital** — Historical.
- **Heptabarbital** — Historical.
- **Allobarbital** — Historical. Combo products existed.
- **Butobarbital** — Historical UK medical / some diversion lore.

### GHB-related

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **GHB** (G, liquid ecstasy, sodium oxybate) | well_documented | street | other | 80 | 74 | 50 | 86 | 70 | 55 | 96 | The only downer that feels like a night out — until the clock kills you. |
| **GBL** (gamma-butyrolactone, BDO's faster cousin) | moderately_documented | street | other | 76 | 70 | 58 | 88 | 74 | 52 | 96 | Industrial cleaner that becomes the night. Redose or drop. |
| **1,4-Butanediol** (1,4-BD, BDO) | moderately_documented | street | other | 68 | 62 | 36 | 84 | 68 | 48 | 94 | Slower G. Same coma. Same shake when it leaves. |
| **GHV** (gamma-hydroxyvaleric acid, 4-methyl-GHB) | moderately_documented | rc_era | other | 40 | 32 | 22 | 50 | 40 | 30 | 52 | GHB's methyl cousin. Weaker night, same idea. |
| **GVL** (gamma-valerolactone) | moderately_documented | rc_era | other | 36 | 28 | 24 | 48 | 38 | 28 | 50 | Lactone that becomes GHV. Replacement rumor, not a scene. |

- **GHB** — Medical narcolepsy (Xyrem) + rec/chemsex. ACTUAL enjoyment+euphoria+some rush. Also compulsive redose and savage withdrawal. Steep cliff. Not a benzo.
- **GBL** — Converts to GHB. Faster onset than GHB salt — rush score higher. Same withdrawal hell. Chemsex/club.
- **1,4-Butanediol** — Converts to GHB via ADH. Delayed vs GBL — people stack and fall over. Same dependence family.
- **GHV** — ACMD related-compound. Less potent than GHB in literature. Thin rec-market vs G/GBL.
- **GVL** — Prodrug to GHV. Documented analog, low prevalence.

### Qualones (methaqualone analogs)

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Methaqualone** (Quaalude, ludes, Mandrax) | well_documented | street | other | 84 | 78 | 32 | 72 | 50 | 45 | 65 | The last sedative people actually missed when it left. |
| **Etaqualone** | moderately_documented | rc_era | other | 46 | 40 | 18 | 58 | 36 | 32 | 52 | Ludes' ethyl stamp. 90s German RC, thinner magic. |
| **Mecloqualone** | well_documented | street | other | 40 | 34 | 14 | 54 | 34 | 30 | 50 | Chloro-ludes. Old medicine, later analog. |
| **Methylmethaqualone** (MMQ) | moderately_documented | rc_era | other | 38 | 32 | 16 | 56 | 32 | 28 | 48 | Extra methyl, extra seizure rumor. The convulsive lude. |
| **Mebroqualone** | moderately_documented | rc_era | other | 34 | 28 | 12 | 50 | 30 | 26 | 46 | Bromo-ludes. Vendor analog. |
| **Afloqualone** (Arofuto) | well_documented | uncertain | other | 24 | 16 | — | 36 | 16 | 18 | 32 | JP muscle-relax qualone. Photosensitivity warning, no cult. |
| **SL-164** (dicloqualone) | moderately_documented | rc_era | other | 36 | 30 | 14 | 54 | 34 | 30 | 48 | Dichloro-ludes. RC forums treated it like a rumor that shipped. |
| **Cloroqualone** | well_documented | street | other | 28 | 22 | 10 | 42 | 24 | 22 | 38 | Old antitussive qualone. Weak ludes. |
| **Nitromethaqualone** | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Nitro-ludes on a paper. Barely circulated. |
| **Diproqualone** | well_documented | uncertain | other | 22 | 16 | — | 34 | 16 | 16 | 30 | Combo-tablet qualone. Not the disco. |
| **Mephenoqualone** (mephenaqualone) | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | New-wave ludes. Forum math says a hundred times meaner. Treat as a trap. |
| **PPQ** (2,3-diphenylquinazolin-4-one) | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Diphenyl qualone. 2020s analog, not your dad's lude. |
| **PPTQ** | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | PPQ's methyl stamp. Lab-hot, street-rare. |
| **Cl-PPQ** | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Chloro-PPQ. Same new-wave crate. |
| **MCPPQ** | limited_evidence | literature_only | names_only | — | — | — | — | — | — | — | Methyl-chloro PPQ. Name soup, real potency rumor. |
| **Methoxyqualone** (2-methoxyqualone) | moderately_documented | rc_era | other | 28 | 22 | 10 | 44 | 26 | 24 | 38 | MeO-ludes. Forensic paper, small bag. |

- **Methaqualone** — Highest enjoyment in this whole file. Euphoric, disinhibiting, crashy driving. SA Mandrax still lives. Not a benzo; GABA-A PAM at a different site.
- **Etaqualone** — Early designer qualone. Weaker/shorter lore than parent.
- **Mecloqualone** — Former pharmaceutical + analog lists.
- **Methylmethaqualone** — Late-90s RC. Paradoxical seizure flag vs most downers.
- **Mebroqualone** — Documented analog.
- **Afloqualone** — Medical Japan. Not the ludes fantasy.
- **SL-164** — Designer analog with rec-market reports.
- **Cloroqualone** — Former pharma analog.
- **Nitromethaqualone** — Named analog, thin human footprint.
- **Diproqualone** — Used in some analgesic combos historically.
- **Mephenoqualone** — Late-2010s/2020s analog; 2026 review flags high potency vs methaqualone. Rec-market emerging. OD flag.
- **PPQ** — Emerging designer. Potency claims high; human feel-cards thin.
- **PPTQ** — Literature + emerging analog list.
- **Cl-PPQ** — 2026 analog review.
- **MCPPQ** — 2026 analog review.
- **Methoxyqualone** — Documented analog (forensic 2023).

### Carbamates

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Meprobamate** (Miltown, Equanil) | well_documented | uncertain | other | 40 | 28 | — | 62 | 24 | 22 | 80 | 1950s tranquillizer. Before benzos learned manners. |
| **Carisoprodol** (Soma) | well_documented | street | other | 56 | 46 | 16 | 72 | 36 | 32 | 72 | Muscle melt with a smirk. The bottle empties itself. |
| **Tybamate** (Solacen) | well_documented | uncertain | other | 18 | 12 | — | 40 | 16 | 16 | 52 | Meprobamate cousin. Dead brand. |

- **Meprobamate** — Pre-benzo anxiolytic. Dependence/withdrawal ugly. Still the parent of carisoprodol.
- **Carisoprodol** — Prodrug to meprobamate. Actual recreational like vs most benzos. Compulsive combo lore (ignore recipes). Impairment high.
- **Tybamate** — Historical carbamate.

### Classic non-barbiturate hypnotics

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Chloral hydrate** (Noctec, knockout drops, Mickey Finn) | well_documented | street | other | 16 | 10 | 8 | 40 | 55 | 48 | 58 | Victorian sleep. The original spiked drink. Fun was never the pitch. |
| **Chloralose** (alpha-chloralose) | moderately_documented | uncertain | other | 6 | — | — | 12 | 30 | 24 | 20 | Rodent knockout. Not a human product. |
| **Glutethimide** (Doriden) | well_documented | street | other | 34 | 26 | 10 | 62 | 40 | 36 | 78 | Barbiturate-shaped hypnotic they pulled. Combo lore was the point. |
| **Methyprylon** (Noludar) | well_documented | uncertain | other | 24 | 16 | — | 50 | 32 | 30 | 64 | Doriden's quieter sibling. Same era, same exit. |
| **Ethchlorvynol** (Placidyl, jelly beans) | well_documented | street | other | 36 | 28 | 12 | 64 | 44 | 40 | 76 | Green-gel sleep. Old heads still talk like it was a personality. |
| **Clomethiazole** (chlormethiazole, Heminevrin, Distraneurin) | well_documented | uncertain | other | 30 | 22 | 10 | 66 | 48 | 42 | 82 | Alcohol-detox sleep. Soft then sudden. Dependence copies the thing it treats. |
| **Paraldehyde** | well_documented | uncertain | other | 8 | 4 | — | 24 | 20 | 16 | 44 | Hospital stench hypnotic. You smell it before you feel it. |
| **Ethinamate** (Valmid) | well_documented | uncertain | other | 16 | 10 | — | 36 | 20 | 18 | 48 | Short carbamate-ish sleep from the 50s. |
| **Apronal** (allylisopropylacetylurea, Sedormid) | well_documented | uncertain | other | 10 | 4 | — | 22 | 14 | 12 | 32 | Pre-war urea sleep. Purpura pulled it. |
| **Bromide salts** (potassium bromide, Nervine) | well_documented | uncertain | other | 6 | — | — | 18 | 10 | 12 | 34 | 19th-century calm. Acne, fog, months to clear. |

- **Chloral hydrate** — Oldest hypnotic still occasionally medical. Gastric ruin. Metabolite TCE. Folklore > recreation.
- **Chloralose** — Vet/poison. Documented as a sedative-hypnotic relative.
- **Glutethimide** — 1960s–80s. Nasty OD/withdrawal. Rec with other downers historically.
- **Methyprylon** — Withdrawn hypnotic.
- **Ethchlorvynol** — Withdrawn US. Rec reputation stronger than chloral, weaker than ludes.
- **Clomethiazole** — EU alcohol-withdrawal hypnotic. Rec misuse documented. Respiratory cliff with other downers.
- **Paraldehyde** — Old status-epilepticus / DT drug. Not recreational.
- **Ethinamate** — Historical.
- **Apronal** — Historical. Agranulocytosis/purpura.
- **Bromide salts** — Historical human; still vet anticonvulsant. Bromism flag.

### GABA-B / extrasynaptic GABA agonists

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Phenibut** (Anvifen, Noofen, phenylibut) | well_documented | street | other | 54 | 44 | — | 84 | 15 | 12 | 88 | Sober-feeling courage with a withdrawal that isn't. |
| **4-Fluorophenibut** (F-phenibut, fluorobut) | moderately_documented | rc_era | other | 50 | 40 | — | 80 | 18 | 14 | 86 | Phenibut with a halogen and less patience. |
| **Baclofen** (Lioresal) | well_documented | uncertain | other | 18 | 10 | — | 48 | 12 | 10 | 80 | Spasm pill. Withdrawal can seize you. Not a glow. |
| **Gaboxadol** (THIP) | chemical_literature_only | literature_only | names_only | — | — | — | — | — | — | — | Failed insomnia drug. Weird sleep, not a hug. |

- **Phenibut** — RU medical / US 'nootropic' gray. Delayed onset so people stack. Compulsiveness high, rush null. Aegis 2025 still ~5% of NPS-other.
- **4-Fluorophenibut** — RC GABA-B. Potent/faster rumor vs phenibut. Same compulsive maintenance.
- **Baclofen** — Medical GABA-B. Rec interest as phenibut cousin / GHB analog talk. Withdrawal dangerous. Enjoyment low.
- **Gaboxadol** — Extrasynaptic GABA-A agonist. Lundbeck/Merck corpse. Occasional RC curiosity.

### Gabapentinoids

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Gabapentin** (Neurontin, johnnies, gabbies) | well_documented | street | other | 44 | 34 | — | 64 | 12 | 10 | 58 | Nerve-pill buzz. Prison and porch recreation. Not a benzo, still a habit. |
| **Pregabalin** (Lyrica, budweisers) | well_documented | street | other | 58 | 48 | 14 | 76 | 20 | 18 | 70 | Nerve-pill glow. The benzo people take when benzos ran out. |

- **Gabapentin** — alpha2delta. Diverted. Mild euphoria at rec patterns. Compulsive in some scenes. Combo-with-opioids exists — we still score the molecule, not the cocktail.
- **Pregabalin** — Highest enjoyment in the gabapentinoid rack. Actual euphoria reports. UK/EU diversion scene. Compulsive without being a pyro.

### Alpha-2 adrenergic sedatives

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Xylazine** (tranq, anestesia de caballo) | well_documented | street | adulterant | 4 | — | — | 12 | 20 | 8 | 30 | Nobody asked for this. The bag brought it anyway. |
| **Medetomidine** | well_documented | street | adulterant | 3 | — | — | 10 | 18 | 8 | 28 | Xylazine's meaner vet cousin. Now in the powder. |
| **Dexmedetomidine** (Precedex, Dexdor) | well_documented | uncertain | other | 8 | 4 | — | 16 | 14 | 10 | 24 | ICU calm. You can be woken. You will not party. |
| **Detomidine** (Dormosedan) | moderately_documented | uncertain | other | 4 | — | — | 10 | 16 | 8 | 22 | Horse sedative. ACMD grouped it with xylazine for a reason. |
| **Clonidine** (Catapres) | well_documented | uncertain | other | 10 | 4 | — | 28 | 8 | 6 | 62 | Blood-pressure downer. Withdrawal rebound is the jump-scare. |
| **Tizanidine** (Zanaflex) | well_documented | uncertain | other | 16 | 8 | — | 36 | 10 | 8 | 50 | Spasm pill that drops blood pressure and ambition. |

- **Xylazine** — Vet sedative. Street adulterant. Enjoyment ~null. Wounds, hypotension, not naloxone-reversible. Compulsiveness low as a sought high; high as a trapped contaminant.
- **Medetomidine** — More potent alpha-2. CFSRE 2025 tier 1 miscellaneous. Aegis ~22% of NPS-other 2025. Not a recreational product.
- **Dexmedetomidine** — Active isomer of medetomidine. Medical infusion. Rec-market: almost none as a sought drug.
- **Detomidine** — Vet. Human rec not a scene; adulterant risk class.
- **Clonidine** — Human antihypertensive / ADHD / withdrawal adjunct. Mild sedation. Rebound hypertension. Not fun.
- **Tizanidine** — Muscle relaxant alpha-2. Some diversion. Enjoyment low.

### Sedating antihistamines

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Diphenhydramine** (Benadryl, DPH) | well_documented | street | other | 12 | 6 | — | 35 | 30 | 40 | 28 | Corner-store sleep. High enough and the walls crawl. |
| **Doxylamine** (Unisom) | well_documented | uncertain | other | 10 | 4 | — | 28 | 22 | 28 | 24 | Heavier OTC sleep. Hangover included free. |
| **Hydroxyzine** (Atarax, Vistaril) | well_documented | uncertain | other | 14 | 6 | — | 30 | 10 | 14 | 20 | Script antihistamine for anxiety. Calm-ish. No bar. |
| **Promethazine** (Phenergan, prometh) | well_documented | street | other | 22 | 12 | — | 48 | 18 | 22 | 34 | The purple half of a drink we are not mixing here. Alone: heavy antihistamine. |
| **Cyclizine** (Marezine, Valoid) | well_documented | street | other | 14 | 8 | — | 32 | 16 | 20 | 24 | Motion-sickness deliriant if you insist. Ugly high. |

- **Diphenhydramine** — OTC hypnotic / deliriant at rec excess. Compulsiveness modest (insomnia + some chase delirium). Not GABA.
- **Doxylamine** — OTC hypnotic. Less deliriant lore than DPH, more morning glue.
- **Hydroxyzine** — Medical anxiolytic/hypnotic antihistamine. Low abuse vs GABA downers.
- **Promethazine** — Sedating antihistamine. Rec culture exists; this catalog scores the antihistamine, not opioid combos.
- **Cyclizine** — Documented misuse (esp. with opioids historically). Score the antihistamine only.

### Dual orexin antagonists

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Suvorexant** (Belsomra) | well_documented | uncertain | other | 10 | — | — | 18 | 14 | 18 | 14 | Turns off wake. Does not turn on fun. |
| **Lemborexant** (Dayvigo) | well_documented | uncertain | other | 10 | — | — | 16 | 12 | 16 | 12 | Another wake-off switch. Still not a downer scene. |
| **Daridorexant** (Quviviq) | well_documented | uncertain | other | 10 | — | — | 16 | 12 | 16 | 12 | Shorter DORA. Same thesis: sleep, not a high. |

- **Suvorexant** — DORA hypnotic. Sleep architecture pitch. Recreational-market near-zero. Next-day driving flag.
- **Lemborexant** — DORA. Medical.
- **Daridorexant** — DORA. Medical.

### Melatonin-receptor agonists

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Ramelteon** (Rozerem) | well_documented | uncertain | other | 6 | — | — | 8 | 4 | 6 | 6 | Prescription melatonin with a sales team. Zero bar energy. |
| **Tasimelteon** (Hetlioz) | well_documented | uncertain | other | 4 | — | — | 6 | 4 | 6 | 6 | Non-24 clock drug. Not a high. |
| **Agomelatine** (Valdoxan) | well_documented | uncertain | other | 8 | 4 | — | 10 | 2 | 4 | 8 | Antidepressant that borrowed melatonin. Liver labs, not ludes. |

- **Ramelteon** — MT1/MT2. Negligible abuse in literature.
- **Tasimelteon** — Orphan circadian. No rec market.
- **Agomelatine** — Not a hypnotic of abuse.

### IV anesthetic sedatives

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Propofol** (Diprivan, milk of amnesia) | well_documented | uncertain | other | 40 | 32 | 44 | 50 | 80 | 78 | 36 | White sleep. Short bliss, no air, no second chance unsupervised. |
| **Etomidate** (Amidate) | well_documented | street | other | 28 | 18 | 30 | 46 | 60 | 58 | 36 | Induction drug that learned a street in East Asia. Twitches, then down. |
| **Metomidate** (Hypnodil) | moderately_documented | uncertain | other | 12 | 6 | 16 | 20 | 40 | 36 | 16 | Vet etomidate. Not a human bag. |

- **Propofol** — IV anesthetic. Some rec/occupational abuse with real euphoria+rush. Cliff is apnea. Not a street powder.
- **Etomidate** — Medical IV. Recreational-market reports (CN/elsewhere) + CFSRE 2025 consider-tier. Adrenocortical suppression flag. Not an opioid.
- **Metomidate** — Veterinary relative.

### Other documented GABA-adjacent

| SKU | Status | Market | Flood | Enjoy | Eu | Rush | Comp | Blackout | Amnesia | WD | Line |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Muscimol** (Amanita, pantherine) | well_documented | street | other | 36 | 24 | — | 40 | 35 | 40 | 24 | Mushroom downer. Drunk-delirium, not a bar. The floor tilts. |
| **Kavain** (kava, kavalactones) | well_documented | street | other | 38 | 28 | — | 36 | 8 | 10 | 20 | South Pacific calm. Mouth numb, liver rumor, not a blackout bar. |
| **Etifoxine** (Stresam) | well_documented | uncertain | other | 16 | 8 | — | 22 | 6 | 8 | 18 | French anxiety capsule that isn't a benzo. Rarely missed. |

- **Muscimol** — Amanita principal. GABA-A agonist (not PAM). Rec gummies 2020s. Not a benzo. Confusion/delirium flag.
- **Kavain** — Traditional / supplement. Mild GABA-adjacent. CFSRE consider-tier as kavain. Dependence mild vs benzos.
- **Etifoxine** — TSPO / neurosteroid modulation. FR medical. Low abuse signal.

## Kit notes

- Do not kit benzos as pyros. Rush stays null. The trap is the refill.
- Fake-bar host species: etizolam / flualprazolam → bromazolam → phenazolam. Same mesh, new stamp.
- GHB/GBL is the sedative that actually has a night-out. Also the withdrawal that looks like a medical emergency.
- Methaqualone is the ghost luxury downer. New-wave PPQ names stay `null` until someone writes a real night.
- Xylazine / medetomidine are not products NPCs ask for. They are what was in the other powder.
- Flumazenil is an antagonist SKU for hospital/fail-state, not a high.
- Assignment 29 owns high-dose DPH / amanita delirium. This file keeps the OTC-sleep row.

Flags (no how-to): `blackout` `amnesia` `redose` `fake_tablet` `mislabel` `hangover` `withdrawal_seizure` `coma_cliff` `tranq_wound` `adulterant` `next_day_impair`.

Machine copy: `wiki/substance_research/25_26_sedatives.json`

