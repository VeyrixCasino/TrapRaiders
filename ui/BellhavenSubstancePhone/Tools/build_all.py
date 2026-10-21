from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
src=(root/'SourceUI/BellhavenGameUI.template.html').read_text()
config=json.loads((root/'Config/DrugProfiles.json').read_text())
engine=(root/'SourceUI/drug_engine.js').read_text()
lab=(root/'SourceUI/lab_integration.js').read_text()
# Insert developer-only page without changing player-facing phone/index.
src=src.replace('<button class="nav" data-page="phone">','<button class="nav" data-page="lab"><span>⚗</span><b class="text">Drug Designer Lab</b></button>\n  <button class="nav" data-page="phone">',1)
src=src.replace('</main></div>\n<div id="tooltip"', '<section id="labScreen" class="hidden"><div class="section-head"><h2>Drug Profiles · Designer Lab</h2><span class="tag warn">DEVELOPER ONLY — DO NOT SHIP</span></div><p class="meta" style="margin-bottom:14px">Tune and clone profiles independently. All drug classes sort first; every drug has its own tolerance, dependence, craving and decay settings.</p><div id="labBody"></div></section>\n</main></div>\n<div id="tooltip"',1)
src=src.replace('</style></head>', '.lab-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.lab-control{background:#0e1926;border:1px solid var(--edge);border-radius:11px;padding:11px}.lab-control label{font-size:11px;color:#b4c6d8}.lab-control input{width:100%;accent-color:var(--mint)}.search{color:var(--fg)}@media(max-width:800px){.lab-grid{grid-template-columns:1fr}}</style></head>',1)
# Additional records visible to the phone catalogue in demo. Do not expose hidden details.
insertion='''\nfor(const def of window.BellhavenDrugProfiles.drugs){
 if(!products[def.id]) products[def.id]={id:def.id,name:def.displayName,category:'Products',drugClass:def.class,unit:'game unit',weight:.01,volume:.025,value:80,icon:'◈',verified:false,claimedAs:def.displayName,reference:def.reference,potency:'Unverified',onset:'Unknown',routes:[],description:'Unverified catalogue record. No hidden composition disclosed.',effects:'Unconfirmed',risks:'Unknown composition and individual response'};
}
'''
src=src.replace('const catalog={...products,', insertion+'const catalog={...products,',1)
src=src.replace("['inventory','dealer','clients'].forEach", "['inventory','dealer','clients','lab'].forEach",1)
src=src.replace("clients:['Clients & Orders','Persistent tastes, multi-product requests and transaction history']", "clients:['Clients & Orders','Persistent tastes, multi-product requests and transaction history'],lab:['Designer Lab','Tune individual drug tolerance, dependence, onset and decay']",1)
src=src.replace('function render(){if(page===\'inventory\')', 'function render(){if(page===\'lab\')renderLab();if(page===\'inventory\')',1)
src=src.replace("const CATEGORIES=['All'",lab+"\nconst CATEGORIES=['All'",1) if False else src
# Insert lab script after helper definitions so esc/$ are available, before first event bindings.
src=src.replace("$('inventorySearch').addEventListener",lab+"\n$('inventorySearch').addEventListener",1)
# Inject standalone engine + config before main IIFE; careful to encode tags.
config_json=json.dumps(config,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
boot='<script>window.BellhavenDrugProfiles='+config_json+';</script>\n<script>'+engine+'</script>\n'
src=src.replace('<script>\n(function(){',boot+'<script>\n(function(){',1)
# Add link to design screen after header if missing
assert 'labScreen' in src and 'lab-control' in src and 'DrugProfiles' in src
(root/'Preview/BellhavenGameUI.html').write_text(src)
# Generate C++ raw string literal containing all bytes of standalone offline page.
hdr=root/'Plugins/BellhavenSubstancePhone/Source/BellhavenSubstancePhone/Private/BellhavenGameUIHtml.h'
# Never embed server-only tolerance parameters into a shipping game client.
client_stub={'schemaVersion':1,'classOrder':config['classOrder'],'drugs':[],'interactions':[]}
client_boot='<script>window.BellhavenDrugProfiles='+json.dumps(client_stub,separators=(',',':'))+';</script>'
client_src=src.replace('<script>window.BellhavenDrugProfiles='+config_json+';</script>',client_boot)
client_src=client_src.replace('<button class="nav" data-page="lab"><span>⚗</span><b class="text">Drug Designer Lab</b></button>\n  ', '')
# Strip internal numeric editor from shipping client; not merely from the navigation.
client_src=client_src.replace(lab+'\n','')
client_src=client_src.replace('<script>'+engine+'</script>\n','')
client_src=client_src.replace('<section id="labScreen" class="hidden"><div class="section-head"><h2>Drug Profiles · Designer Lab</h2><span class="tag warn">DEVELOPER ONLY — DO NOT SHIP</span></div><p class="meta" style="margin-bottom:14px">Tune and clone profiles independently. All drug classes sort first; every drug has its own tolerance, dependence, craving and decay settings.</p><div id="labBody"></div></section>', '')
client_src=client_src.replace("['inventory','dealer','clients','lab'].forEach", "['inventory','dealer','clients'].forEach")
client_src=client_src.replace("if(page==='lab')renderLab();", "")
client_src=client_src.replace("clients:['Clients & Orders','Persistent tastes, multi-product requests and transaction history'],lab:['Designer Lab','Tune individual drug tolerance, dependence, onset and decay']", "clients:['Clients & Orders','Persistent tastes, multi-product requests and transaction history']")
assert 'labDrugId=' not in client_src and '<section id="labScreen"' not in client_src

(root/'Preview/BellhavenGameUI_ClientSafe.html').write_text(client_src)
hdr.write_text('#pragma once\n\nnamespace BellhavenGameUIHtml\n{\n    inline const TCHAR* GetHtml()\n    {\n        return TEXT(R"BELLHAVENHTML('+client_src+')BELLHAVENHTML");\n    }\n}\n')
print('Generated',len(src),'bytes developer preview and',len(client_src),'bytes Unreal-safe client UI')
