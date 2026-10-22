# CHECK LINE C — terrain + roads auditor

**RESULT: PASS (bake contract)**

Ran `_check_c.js` 2026-10-21T21:16:49.676Z. This line still does **not** claim an Unreal Landscape exists.

| item | result | note |
|---|---|---|
| data/ has bake files | PASS | diag_terrain.bmp, diag_terrain.json, height_lo.json, heightmap.r16, housing_templates.json, intersections.json, inv_save.json, keep_pads.json, lights.csv, lots.json, meta.json, names.json, phone_save.json, preview_color.bmp, preview_color.jpg, roads.json, sat_base.bin, satellite.json, satellite.png, satellite_color.png, satellite_color_ui.jpg, satellite_ui.jpg, signs.csv, spawn.json, splat_brick.bmp, splat_dirt.bmp, splat_green.bmp, splat_urban.bmp, traffic.csv, trees.csv |
| heightmap.r16 = 2017×2017×2 | PASS | 8136578 |
| roads are a network not 35 lines | PASS | 146 polylines, 363 crossings |
| intersections exist | PASS | 363 crossings |
| signals + stops present | PASS | {"stop":326,"signal":34,"allway_stop":3} |
| no dangling dead ends | PASS | dangling=0 |
| north hills higher than south basin | PASS | N ridge 49.7 club 36.7 S 6.8 W knoll 39.2 |
| The Cut stays depressed (bridges do not fill) | PASS | cut mid -6.20 bridge xy -6.20 |
| height_lo is baked r16 sample | PASS | size 257 |
| meta counts match files | PASS | {"lights":2498,"trees":2318,"roads":146,"paved":145,"intersections":363,"byType":{"water":1,"highway":3,"bridge":6,"arterial":28,"street":108},"traffic":{"stop":326,"signal":34,"allway_stop":3},"dangling":0,"culdesacs":27,"lots":181,"lotsByKind":{"house":98,"city_block":32,"park_court":23,"civic":9,"yard":10,"res_2house":9}} |
| lots.json pads | PASS | 181 lots |
| city lots fit big buildings | PASS | n=32 min 74 |
| residential lots fit two houses | PASS | n=9 |
| extra house pads | PASS | n=98 |
| parks / courts + civic exist | PASS | parks=23 civic=9 |
| pads keep basement volume | PASS | n=139 depth>=2.5 |
| swim breath before special places | PASS | 10.5s * 1.9 m/s ≈ 20 m — cannot cross The Cut or reach the airfield |

## Still missing for real terrain

No `.uproject`, no Landscape actor, no water mesh, no streetlight / signal meshes. Bake + graph only.
