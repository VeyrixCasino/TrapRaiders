# Substance research (Bellhaven / Port Rook)

Game catalog. **Not a cook book.**

## Style (overrides the 197-stat spec)

Lead every profile with **rush, euphoria, compulsiveness, enjoyment**.

Negatives go **below**, shorter. The first hit outweighs the later misery in how we write; aftereffects are still scored separately.

Infer like this:

- Snorted: nothing. Slammed: the rush old threads wrote poems about.
- Short MD. Old heads sometimes liked it more than MDPV.
- If it lasts till noon, it wasn’t 3-MMC.

A hated binge can still mean **high compulsiveness**. Do not average “never again” into low euphoria.

Unknown = `null`, not `0`. Do not invent human reports or half-lives.

## Hard bans

- No synthesis, precursors, recipes, yields, glassware steps
- No doses-as-how-to, no injection SOP
- Route notes are NPC flags only (`slam_only`, `vape_fav`, `mislabel`)
- **No opioids** (no fentalogs, nitazenes, etc.)

## Distinctions

- Street / RC-era market vs chemical-literature-only
- Euphoria ≠ reinforcement ≠ compulsiveness ≠ retrospective satisfaction
- Duration of the high ≠ elimination half-life
- Gameplay estimates must be labeled `gameplay_estimate`, never as science

## Output files

Each assignment overwrites its pair (markdown for humans, JSON for merge). Do not invent extra filenames.

| File | Assignment |
|---|---|
| `01_cathinones_mmc_halogen.md` / `.json` | 01 methyl / halogen / methoxy cathinones (also landed as `01_cathinones_mmc`) |
| `02_cathinones_extended_nalkyl.md` / `.json` | 02 extended-chain / N-alkyl cathinones (also landed as `02_cathinones_chain`) |
| `03_cathinones_methylenedioxy.md` / `.json` | 03 methylenedioxy cathinones (also landed as `03_cathinones_md`) |
| `04_pyros_unsubstituted.md` / `.json` | 04 unsubstituted α-pyros (also landed as `04_pyros_alpha`) |
| `05_pyros_methylenedioxy.md` / `.json` | 05 MD-pyros (also landed as `05_pyros_md`) |
| `06_pyros_substituted_unusual.md` / `.json` | 06 substituted / unusual pyros (also landed as `06_pyros_unusual`) |
| `07_08_amphetamines_phenidates.md` / `.json` | 07+08 amps + phenidates |
| `09_10_phenmetrazine_piperazine.md` / `.json` | 09+10 phenmetrazine / aminorex / piperazines |
| `11_12_empathogens.md` / `.json` | 11+12 MDMA + benzofurans |
| `13_dissos_ketamine_type.md` / `.json` | 13 ketamine-likes (also landed as `13_disso_ketamine`) |
| `14_dissos_mxe_oxopce.md` / `.json` | 14 MXE / oxo-PCE (also landed as `14_disso_mxe`) |
| `15_16_dissos_pcp_pce.md` / `.json` | 15+16 PCP / PCE / PCPr / PCMo |
| `17_dissos_diaryl_other.md` / `.json` | 17 diarylethylamines / DXM / N2O |
| `18_20_phenethylamine_psychs.md` / `.json` | 18–20 2C / NBOMe / DOx (also landed as `18_20_pe_psychedelics`) |
| `21_23_tryptamines.md` / `.json` | 21–23 tryptamines |
| `24_lysergamides.md` / `.json` | 24 lysergamides |
| `25_26_sedatives.md` / `.json` | 25+26 benzos / other sedatives (no opioids) |
| `27_28_cannabinoids.md` / `.json` | 27+28 spice + phytocannabinoids |
| `29_deliriants.md` / `.json` | 29 deliriants / atypical |
| `30_taxonomy_expansion.md` / `.json` | 30 missing families |

Schema example: `_schema.json`.

## Dual boards (do not clobber — verifier merges)

Two researchers often wrote the same wall under two names. **Keep both.** Do not copy one over the other.

| Wall | Pair | Fight to resolve |
|---|---|---|
| α-pyros | `04_pyros_alpha` vs `04_pyros_unsubstituted` | α-PVP enjoyment (mid vs implied higher); α-PBP rush rank |
| MD-pyros | `05_pyros_md` vs `05_pyros_methylenedioxy` | MDPPP `slam_only?` — one said no, one left the question |
| bk-MDMA | `03_cathinones_md` vs `03_cathinones_methylenedioxy` | Headliner count vs 27-ID dump |
| ket-likes | `13_disso_ketamine` vs `13_dissos_ketamine_type` | Same FXE≠CanKet merge |
| MXE shelf | `14_disso_mxe` vs `14_dissos_mxe_oxopce` | Same 3DMXE=sticker; HXE dual-owned with Kit K |
| PCP/PCE | `15_16_disso_pcp_pce` vs `15_16_dissos_pcp_pce` | Same mania/cozy/functional ladder |
| diaryls | `17_disso_diaryl_other` vs `17_dissos_diaryl_other` | 17 vs 20 IDs; xenon/MK-801 extras |
| odd pyros | `06_pyros_unusual` vs `06_pyros_substituted_unusual` | Human-report vs names-only cut |
| other stims | `07_10_other_stims` vs `07_08` + `09_10` | Split vs lumped |
| phenethylamine psychs | `18_20_phenethylamine_psychs` vs `18_20_pe_psychedelics` | 116 vs 196 crate size; both keep the same 16 UI names |
| empathogens | two writers → same `11_12_empathogens` | Agree: 5-MAPB closest copy; 6-APB not a clone |
| tryptamines | two writers → same `21_23_tryptamines` | 53 vs 81 IDs; same v1 rack (disk is the 81) |
| sedatives | multiple writers → same `25_26_sedatives` | 11 flooded RC benzos vs 180-name crate; habit ≠ pyro flush |
| N-alkyl cathinones | `02_cathinones_chain` vs `02_cathinones_extended_nalkyl` | NEP/hexen fiend vs 3-MMC mislabel; calibration will pull 86–92 off the pyro mountain |
| MMC wall | `01_cathinones_mmc` vs `01_cathinones_mmc_halogen` | 4-MMC is the one; 3-MMC is the cover band / NEP-mislabel |
| tropanes | landed in `30_taxonomy_expansion` as cocaine 92 / crack 97 on the old 0–100 bar | **Must remap to coke=10 stim ladder** — 92 is not the new coke |

## Markdown shape per compound

```
## Name (aliases)
Status: well_documented | moderately_documented | limited_evidence | chemical_literature_only | identity_uncertain | alias_duplicate | unverified_claim
Market: street | rc_era | literature_only | uncertain
Headline: one-line inference
### The hit
Rush / Euphoria / Enjoyment / Compulsiveness — score 0–100 or unknown, confidence A/B/C/D/U, 1–3 sentences
### The bill
Negatives only if evidenced
NPC line:
Sources:
Gaps:
```
