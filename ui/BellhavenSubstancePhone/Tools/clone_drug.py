#!/usr/bin/env python3
"""Copy an existing fictional game profile with a new stable id, without changing original."""
import sys,json,re
from pathlib import Path
file=Path(__file__).resolve().parents[1]/'Config/DrugProfiles.json'
if len(sys.argv)<3:
 print('Usage: python Tools/clone_drug.py <existing_id> <new_id> [Display Name]');sys.exit(2)
source,newid=sys.argv[1:3]; name=' '.join(sys.argv[3:]).strip() or newid.replace('_',' ').title()
if not re.fullmatch('[a-z0-9_-]+',newid):sys.exit('New id must use lowercase letters, digits, _ or -')
cfg=json.loads(file.read_text());item=next((d for d in cfg['drugs'] if d['id']==source),None)
if item is None:sys.exit('Source id not found: '+source)
if any(d['id']==newid for d in cfg['drugs']):sys.exit('New id already exists: '+newid)
obj=json.loads(json.dumps(item));obj['id']=newid;obj['displayName']=name
cfg['drugs'].append(obj);file.write_text(json.dumps(cfg,indent=2)+'\n')
print('Added',newid,'from',source,'- adjust Config/DrugProfiles.json then rebuild')
