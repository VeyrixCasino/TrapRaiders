# Unreal / Cursor integration guide

## Current status (important)

The project/UE build is **not connected**. The delivered plugin is generated source only. HTML/Javascript browser tests pass, but **UnrealBuildTool compilation and in-project widget interactions are unverified**. Cursor should inspect your actual Unreal version before adapting engine APIs.

## Install

1. Extract the downloaded folder to Windows (e.g. `Desktop\\BellhavenSubstancePhone`).
2. Open it in Cursor together with your real Unreal project.
3. Copy `Plugins/BellhavenSubstancePhone` to `<YourGame>/Plugins/BellhavenSubstancePhone` if not already present.
4. Regenerate C++ IDE project files if necessary. Compile and enable the plugin (depends on the built-in `WebBrowser` / `WebBrowserWidget` modules).
5. In your existing in-game phone Blueprint, create `BellhavenSubstancePhoneWidget` as the content of a new **Substance Index** app screen. Do **not** spawn a second physical phone model.
6. Optionally host the combined `BellhavenGameUIWidget` inside the existing inventory, dealer and clients UI tabs as a bridge prototype. Longer-term, port to native UMG/Slate for controller-focused builds if desired.
7. Wire the real inventory and client order state to `SetStateJson`, and wire the Blueprint event `OnUIAction` to your **server-authoritative** trade logic.

## Full UI state JSON

The demo's `BellhavenUI.getDemoState()` returns the expected data shape. The required top-level arrays are `stacks`, `equipped`, `clients`. The example includes a `money`, `streetReputation` and `bagId` as well. Client orders use:

```json
{"id":"customer_id","name":"Example Client","district":"East","cash":300,"trust":25,"order":[{"id":"product_a","qty":2},{"id":"product_b","qty":1}],"favorites":["product_a"],"interests":["product_b"],"carried":[],"lastFeedback":""}
```

**Limit orders to at most 3 distinct product IDs.** Validate item amounts, location and inventory access on the server. The sample UI is **not** an authority for how many items actually exist.

## JS → Unreal intent bridge

`UWebBrowser` officially offers `OnUrlChanged` but not the `SWebBrowser::BindUObject` API on every UE version. The combined widget uses a **same-document URL fragment event** `#bhintent=<percent-encoded-JSON>` to trigger `OnUrlChanged`. `HandleUrlChanged` decodes and validates the event then broadcasts `OnUIAction`. This requires verification against your actual UE version and Chromium Embedded Framework behaviour. A C++ `SWebBrowser` binding can replace this event bridge when appropriate. The standalone phone widget is read-only and only accepts known-character records.

Expected event structure:

```json
{"type":"completeTrade","payload":{"clientId":"camila","requested":[{"id":"oxycodone","qty":2}],"offered":[{"id":"oxycodone","qty":2},{"id":"ketamine","qty":1}],"agreedPayout":170},"requestId":"bh-123"}
```

**Transaction handler must:**
- Check authenticated player and nearby client, requested IDs/quantities, that client has sufficient cash, player ownership/physical accessibility of offered inventory, accepted samples, transaction state and anti-replay request IDs.
- Atomically remove inventory, transfer agreed payment, update client preference records, then broadcast new authoritative UI state.
- Treat `agreedPayout` as **display only**; server calculates actual amount.
- Reject and acknowledge inconsistent/duplicated or impossible requests; avoid duplicate sends when URL fragments change repeatedly.
- Store any sampled-product reactions as persistent **client-specific preferences**; demo simply uses deterministic mock preference checks after completion.
- Never send untested actual hidden composition or numerical risk/chemistry/underlying tolerance profiles to the user interface.

## Separate UI components

- `UBellhavenSubstancePhoneWidget`: compact phone-only index, accessible from in-game phone Blueprint. `SetCatalogEntries` accepts character-known information. Class grouping + right-click/hover already built in.
- `UBellhavenGameUIWidget`: full desktop-style inventory/dealer/clients UI; phone popup available through `OpenSubstancePhone()`. Prototype complete for browser previews; **server state is not connected**.

## Files to edit in Cursor

- Change design: `SourceUI/BellhavenGameUI.template.html`, `SourceUI/lab_integration.js`.
- Change drug-specific tuning: `Config/DrugProfiles.json`.
- Change the mathematical prototype: `SourceUI/drug_engine.js`.
- Rebuild: `python Tools/build_all.py` (updates HTML and C++ raw header).
- Do **not** edit generated `...GameUIHtml.h` or `Preview/BellhavenGameUI.html` directly.

## Production gaps, to be implemented against real Unreal project

- No compiled UE plugin test yet.
- No actual Unreal phone Blueprint wired yet.
- Trade completion, client reactions, inventory mutation and network authority currently use standalone mock data in browser previews.
- UI simulates **volume only**; spatial fit and weight/load penalties need real game integration.
- Clothing condition, stolen item records, evidence, raids, stash property systems and exact client AI are **design proposals**, not shipped features.
- Developer Lab must remain out of shipping game builds; server-side simulation and config should be authoritative.
- `OnUrlChanged` event bridge needs validation on the player's UE build. If necessary use an `SWebBrowser` UObject bridge or an owned URL scheme.
