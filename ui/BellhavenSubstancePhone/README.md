# Bellhaven — Cursor Handoff (Unreal UI + Drug Designer)

**Deliverable:** UE5 C++ source plugin + self-contained HTML previews + fictional drug-profile tuning system. This folder **is not a full Unreal project** and has **not been compiled with UnrealBuildTool**. No source code was copied to your Windows desktop or pushed into Cursor; this archive is meant to be extracted and opened there.

## Start here — 2-minute review

1. Open `Preview/BellhavenGameUI.html` in Chrome or Edge. It runs offline, with demo items and clients.
2. Use the left tabs: **Inventory**, **Dealer Exchange**, **Clients & Orders**, **Drug Designer Lab**. The **Phone / Substance Index** is also accessible via its button at top right.
3. In the phone, **All Classes is first and selected by default**, grouping **Opioids → Benzodiazepines → Stimulants → Dissociatives**. Hover an item for a **boxed tooltip**; **right-click** it for full details. Normal click also opens details, for touch/controllers.
4. In **Dealer Exchange**, your inventory is on the left, your offer is in the middle, and the customer's order, money, and carried items are on the right. Add each requested item; add any other drug as an **optional extra/sample**; press **Done — Complete Exchange** to complete a demo trade.
5. In **Clients & Orders**, each customer has **up to 3 simultaneously requested product types**, current preferences, trust, a new order generated after each completed exchange, and results of optional extras.
6. Open **Drug Designer Lab**. Filter by **All Classes** or a class; adjust independently tunable values for each substance. **Duplicate this profile** makes a new profile with independent values. **Export all profiles as JSON** produces a proposed updated config for Cursor to review.
7. **The designer lab is intentionally absent from the embedded Unreal client version**. All detailed tuning values stay in `Config/DrugProfiles.json` (server/development data), not in the packaged player UI.

## Files

| Location | Purpose |
|---|---|
| `Preview/BellhavenGameUI.html` | Full interactive **developer** browser prototype. Includes tolerance designer lab. |
| `Preview/BellhavenGameUI_ClientSafe.html` | Game-client version without designer menu/hidden numerical profiles. |
| `Preview/SubstancePhone.html` | Standalone smartphone-style Substance Index prototype. |
| `Preview/*_preview.png` | Screenshot references. |
| `Plugins/BellhavenSubstancePhone/` | Copyable **Unreal Engine 5 C++** plugin for both a standalone phone widget and a full UI widget. |
| `Config/DrugProfiles.json` | **Source of truth** for fictional per-drug tuning. 19 distinct starting records, ordered by class; the previous six-drug Relicbound ladder is archived separately, **not** seeded here. |
| `SourceUI/BellhavenGameUI.template.html` | Maintainable full UI source; rebuild after editing. |
| `SourceUI/drug_engine.js` | Pure unitless simulation logic, usable in dev preview and Node tests. |
| `SourceUI/lab_integration.js` | Developer-only UI for changing parameters, duplicating drugs, inspecting curves. |
| `Tools/build_all.py` | Rebuilds preview HTML and the embedded Unreal C++ HTML header from source and config. |
| `Tools/clone_drug.py` | One-command way to **duplicate** any drug, preserving independent tuning settings. |
| `Tools/make_profiles.py` | **Initial seed generator only**. **Do not run after editing DrugProfiles.json**, or it will overwrite tuned values. |
| `Tools/test_drug_model.cjs` | Automated simulation, clone and validation tests. |
| `Tests/test_ui.py` | Playwright browser interaction tests; also writes screenshots. |
| `Docs/UNREAL_INTEGRATION.md` | Details and limitations of Unreal integration. |
| `Docs/ARCHIVE_RELICBOUND_TOLERANCE.md` | Historical user-supplied Relicbound `w/H/p` values and stamp formula; explicitly **not live** Bellhaven balancing. |
| `Docs/TOLERANCE_MODEL.md` | Field glossary: where every drug's knobs are, how they affect the model, and how to tune. |

## Important design facts preserved

- Equipped/worn clothes **do not consume backpack volume**. Only items physically stowed inside a bag do. All weight counts toward carried burden.
- Bag space uses **volume** in the prototype. Real object **dimensions, aperture, mass limits, and packing geometry still need Unreal implementation**; a rifle must not fit in a tiny fanny pack.
- Equipment, cash and valuables can all be stolen under the eventual authoritative game rules; the prototype is a UI demonstration, not a full loot engine.
- Client interactions: 2–3 product types in an order, extra samples can be offered, sampled items may influence future requests. Demo liking results are **deterministic pseudo-preferences**, not simulated substance effects.
- A sale alone does **not** automatically create police exposure, heat or reputation. These depend on witnessed actions and relationships.
- The index shows **what the character knows**, not actual hidden contents. Unverified records don't reveal hidden purity or composition.
- Every drug has independently adjustable **onset, decay, residual tail, active-versus-clearance tolerance gain, high-use threshold and multiplier, maintenance stability, recovery, effect sensitivities, dependence and conditioned-craving variables**. Existing game asset IDs remain stable when renamed for display.
- Opioids and benzodiazepines use independent withdrawal/dependence profiles; stimulant and dissociative comedowns remain a separate design concern.
- No clinical opioid equivalence, real lethal-dose table, or safe-use calculator is included. All effect tuning is in unitless **fictional game ticks**.

## How to run tests / build

From this folder:

```bash
node Tools/test_drug_model.cjs
python Tools/build_all.py
python Tests/test_ui.py  # requires playwright + chromium; opens page via set_content
```

To duplicate a drug to a new independent record:

```bash
python Tools/clone_drug.py morphine test_opioid "Test Opioid"
python Tools/build_all.py
node Tools/test_drug_model.cjs
```

After adjusting JSON in Cursor, rebuild using `python Tools/build_all.py`; **do not edit generated `Preview/BellhavenGameUI.html` or `BellhavenGameUIHtml.h` directly** or your changes will be lost.

## Recommended Cursor instruction

> Open README.md, Docs/UNREAL_INTEGRATION.md, and Docs/TOLERANCE_MODEL.md first. Inspect my Unreal project source and existing inventory/phone/trading systems before modifying anything. Merge this Bellhaven prototype into the existing game rather than duplicating the phone. Implement the authoritative trading state machine, preserve client-owned and server-owned data boundaries, connect inventory and client order state to the new UI, and compile/test against my UE version. Retain class-first sorting, compact box tooltips, right-click expanded details, optional samples, 2–3 products per client order, and every drug's independent tuning config. Keep developer-only drug numerical profiles on the game server, never in player-client assets. Do not invent exact clinical drug conversions or lethal-dose numbers. Document every changed project file and any missing dependency.

**Next design discussion:** customer generation, purchasing behaviour, delivery preferences, loyalty/trust, discovery and repeat buying. The current client system intentionally provides a functional preview rather than claiming those full simulation rules are already finished.
