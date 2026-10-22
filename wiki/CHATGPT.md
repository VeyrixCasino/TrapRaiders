# How ChatGPT (and anyone) sees the Bellhaven wiki

**The public GitHub repo is the access path.** ChatGPT cannot read this PC, `C:\Users\uybuv\Downloads\TrapRaiders`, or `http://127.0.0.1:8787`. Localhost stays invisible when the game is off. That is why the wiki lives on GitHub.

This folder is a **game-design bible**. Catalogue numbers are `gameplay_estimate`. It is not a cookbook: no recipes, no precursors, no yields, no glassware, no doses-as-how-to, no injection SOP. No opioids. Route notes are NPC flags only.

Do not commit or upload secrets (`.env`, tokens, save files).

## Tell ChatGPT this

Repo (public):

https://github.com/VeyrixCasino/TrapRaiders

Wiki folder:

https://github.com/VeyrixCasino/TrapRaiders/tree/master/wiki

Fetch these first (raw):

- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/GAMEPLAY_RESPONSE.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/product_families.md

Then, if needed:

- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/CHATGPT.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/README.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/README.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/CALIBRATION.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/DURATION_VERDICT.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/GAMEPLAY_STATS_A.md
- https://raw.githubusercontent.com/VeyrixCasino/TrapRaiders/master/wiki/substance_research/GAMEPLAY_STATS_B.md

Paste this into a ChatGPT chat or a Custom GPT:

> Fetch the Bellhaven wiki from the public GitHub repo https://github.com/VeyrixCasino/TrapRaiders — start at the raw files wiki/substance_research/GAMEPLAY_RESPONSE.md and wiki/product_families.md. All scores are gameplay_estimate. Do not give recipes or dosing how-to.

## Fallback only (if GitHub is down or a login blocks fetch)

1. Zip `wiki/` (or at least `GAMEPLAY_RESPONSE.md`, `product_families.md`, both GAMEPLAY_STATS, `CALIBRATION.md`, `DURATION_VERDICT.md`, both README files) and attach it to the chat.
2. Paste a file if it is short enough.

A local `/wiki/` page on port 8787 is for the human in a browser on this machine. It still does not let ChatGPT fetch anything.
