// DESIGNER-ONLY TOLERANCE LAB (hidden from players in shipping build).
const devConfig = window.BellhavenDrugProfiles;
const drugEngine = window.BellhavenDrugEngine;
let labDrugId='morphine',labClass='All Classes',labTick=18,labExposure=1.0,labRoute='oral',labTol=1.0,labFamilyTol=0.4;
function labPath(obj,path){return path.split('.').reduce((p,k)=>p?.[k],obj)}
function labSet(obj,path,value){const parts=path.split('.');let p=obj;for(let i=0;i<parts.length-1;i++)p=p[parts[i]];p[parts[parts.length-1]]=value}
function labSorted(){return drugEngine.classSorted(devConfig).filter(d=>labClass==='All Classes'||d.class===labClass)}
function renderLab(){
 const entries=labSorted();if(!entries.some(d=>d.id===labDrugId))labDrugId=entries[0]?.id||'';
 const drug=devConfig.drugs.find(d=>d.id===labDrugId);if(!drug){$('labBody').innerHTML='<div class="empty">No profiles in this class</div>';return;}
 const opts=[
 ['gamePotencyIndex','Fictional game potency',.05,4,.05],
 ['timeCourse.riseTicks','Onset rise (ticks)',1,50,1],
 ['timeCourse.decayHalfLifeTicks','Decay half-life (ticks)',1,100,1],
 ['timeCourse.residualTailFactor','Residual tail share',0,.8,.01],
 ['tolerance.gainPerExposure','Tolerance gain / exposure',0,.25,.001],
 ['tolerance.clearanceGainFraction','Tolerance gain on clearance (%)',0,1,.01],
 ['tolerance.highUseThreshold','High-use activation threshold',0,3,.05],
 ['tolerance.surgeGainMultiplier','High-use gain multiplier',.5,4,.05],
 ['tolerance.familyCarryover','Shared family tolerance fraction',0,1,.01],
 ['tolerance.maintenancePlateauGain','Maintenance tolerance gain',0,.05,.001],
 ['tolerance.maintenanceWindowTicks','Maintenance stability window (ticks)',0,100,1],
 ['tolerance.recoveryPerTick','Tolerance recovery / tick',0,.05,.0005],
 ['tolerance.maxTolerance','Individual tolerance cap',1,10,.1],
 ['tolerance.effectSensitivity.reward','Reward tolerance sensitivity',0,2,.05],
 ['tolerance.effectSensitivity.sedation','Sedation tolerance sensitivity',0,2,.05],
 ['tolerance.effectSensitivity.speed','Speed tolerance sensitivity',0,2,.05],
 ['tolerance.effectSensitivity.stamina','Stamina tolerance sensitivity',0,2,.05],
 ['tolerance.effectSensitivity.motorImpairment','Motor impairment sensitivity',0,2,.05],
 ['tolerance.effectSensitivity.physiologicalRisk','Danger tolerance sensitivity',0,1,.05],
 ['dependence.gainPerExposure','Dependence gain / exposure',0,.1,.001],
 ['dependence.maintenanceGainPerTick','Dependence gain during maintenance',0,.02,.0005],
 ['dependence.recoveryPerTick','Dependence recovery / tick',0,.05,.0005],
 ['dependence.withdrawalSensitivity','Withdrawal sensitivity',0,2,.05],
 ['compulsiveness.gainPerReward','Compulsive gain / reward',0,.1,.001],
 ['compulsiveness.recoveryPerTick','Compulsiveness recovery / tick',0,.05,.0005],
 ['compulsiveness.cueSensitivity','Cue sensitivity',0,2,.05],
 ['compulsiveness.earlyRedoseLearningRate','Early-redose habit learning',0,.5,.01],
 ['compulsiveness.habitDecayPerTick','Habit decay / tick',0,.05,.0005]
];
 const sliders=opts.map(([path,label,min,max,step])=>`<div class="lab-control"><div class="row between"><label>${esc(label)}</label><strong class="mono" id="labval-${path.replaceAll('.','-')}">${Number(labPath(drug,path)).toFixed(step<.01?3:step<1?2:0)}</strong></div><input aria-label="${esc(label)}" type="range" data-drugvar="${esc(path)}" min="${min}" max="${max}" step="${step}" value="${labPath(drug,path)}"/></div>`).join('');
 $('labBody').innerHTML=`<div class="card"><div class="section-head"><h2>Drug-specific tuning</h2><span class="tag">${esc(drug.class)}</span></div><div class="row" style="gap:10px;flex-wrap:wrap"><div class="grow"><div class="mini">CLASS FILTER</div><select id="labClassSelect" class="search">${['All Classes',...devConfig.classOrder].map(c=>`<option ${c===labClass?'selected':''}>${esc(c)}</option>`).join('')}</select></div><div class="grow"><div class="mini">DRUG PROFILE</div><select id="labDrugSelect" class="search">${devConfig.classOrder.map(c=>{const group=entries.filter(d=>d.class===c);return group.length?`<optgroup label="${esc(c)}">${group.map(d=>`<option value="${esc(d.id)}" ${d.id===labDrugId?'selected':''}>${esc(d.displayName)}</option>`).join('')}</optgroup>`:''}).join('')}</select></div></div><div class="section-head" style="margin-top:20px"><h3>Live effect curve</h3><span class="meta">Fictional game ticks</span></div><div class="row" style="gap:10px;flex-wrap:wrap"><label>Route <select class="search" id="labRoute">${drug.timeCourse.supportedRouteProfiles.map(r=>`<option value="${r}" ${r===labRoute?'selected':''}>${r}</option>`).join('')}</select></label><label>Exposure <input type="number" id="labDose" class="search" style="width:82px" min="0" max="6" step=".1" value="${labExposure}"></label><label>Specific tolerance <input id="labTol" type="number" min="0" max="4" step=".2" class="search" style="width:70px" value="${labTol}"></label><label>Family tolerance <input id="labFamilyTol" type="number" min="0" max="4" step=".2" class="search" style="width:70px" value="${labFamilyTol}"></label></div><div id="labCurve"></div><div class="divider"></div><div class="section-head"><h3>Independently tunable variables</h3><span class="meta">These changes only affect the local design preview</span></div><div class="lab-grid">${sliders}</div><div class="divider"></div><div class="row" style="flex-wrap:wrap"><button class="btn" id="labDuplicate">Duplicate this profile</button><button class="btn primary" id="labExport">Export all profiles as JSON</button><button class="btn" id="labShowJson">Show selected record JSON</button></div><textarea id="labJson" spellcheck="false" style="display:none;width:100%;height:230px;margin-top:12px;background:#0b1420;color:#c9e6d8;border:1px solid #42566e;border-radius:10px;padding:12px;font:11px/1.5 monospace"></textarea><div class="mini" style="margin-top:12px">Developer-only sandbox. The server owns real exposure, tolerance, hidden composition, and trading results. Changes aren't automatically saved to the project; export and replace Config/DrugProfiles.json.</div></div>`;
 $('labClassSelect').onchange=e=>{labClass=e.target.value;renderLab()};$('labDrugSelect').onchange=e=>{labDrugId=e.target.value;renderLab()};
 $('labRoute').onchange=e=>{labRoute=e.target.value;drawLabCurve()};
 if(!drug.timeCourse.supportedRouteProfiles.includes(labRoute))labRoute=drug.timeCourse.supportedRouteProfiles[0];
 for(const [id,setter] of [['labDose',v=>labExposure=Math.max(0,Number(v)||0)],['labTol',v=>labTol=Math.max(0,Number(v)||0)],['labFamilyTol',v=>labFamilyTol=Math.max(0,Number(v)||0)]])$(id).oninput=e=>{setter(e.target.value);drawLabCurve()};
 $('labBody').querySelectorAll('[data-drugvar]').forEach(input=>input.oninput=e=>{const path=e.target.dataset.drugvar,value=Number(e.target.value);labSet(drug,path,value);$('labval-'+path.replaceAll('.','-')).textContent=value.toFixed(Number(e.target.step)<.01?3:Number(e.target.step)<1?2:0);drawLabCurve()});
 $('labDuplicate').onclick=()=>{let id=drug.id+'-copy',n=2;while(devConfig.drugs.some(d=>d.id===id)){id=drug.id+'-copy-'+n++;}drugEngine.cloneProfile(devConfig,drug.id,id,drug.displayName+' Copy');labDrugId=id;toast('Duplicated profile: '+id);renderLab()};
 $('labExport').onclick=()=>{const data=JSON.stringify(devConfig,null,2);const blob=new Blob([data],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='DrugProfiles.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Downloaded edited DrugProfiles.json')};
 $('labShowJson').onclick=()=>{const t=$('labJson');t.style.display=t.style.display==='none'?'block':'none';t.value=JSON.stringify(drug,null,2)};
 drawLabCurve();
}
function drawLabCurve(){
 const d=devConfig.drugs.find(x=>x.id===labDrugId);if(!d)return;
 const maxTick=Math.max(30,d.timeCourse.decayHalfLifeTicks*3),state={drugTolerance:{[d.id]:labTol},familyTolerance:{[d.class]:labFamilyTol},responseSaturation:devConfig.simulation.responseSaturation};
 const n=90, vals=Array.from({length:n+1},(_,i)=>{const t=i/n*maxTick;return {t,y:drugEngine.response(d,t,state,'reward',labRoute,labExposure)}});
 const maxY=Math.max(.3,...vals.map(x=>x.y));const path=vals.map((x,i)=>`${i?'L':'M'}${(x.t/maxTick*690+20).toFixed(1)},${(175-x.y/maxY*150).toFixed(1)}`).join(' ');
 $('labCurve').innerHTML=`<svg viewBox="0 0 740 215" width="100%" role="img" aria-label="Drug-specific continuous effect curve"><path d="M20 25V175H710" fill="none" stroke="#496077" stroke-width="2"/><path d="${path}" fill="none" stroke="#8df0c8" stroke-width="3" stroke-linecap="round"/><text x="25" y="205" fill="#9cb3c6" font-size="12">0 ticks</text><text x="670" y="205" fill="#9cb3c6" font-size="12">${Math.round(maxTick)} ticks</text><text x="25" y="16" fill="#9cb3c6" font-size="12">Effect intensity</text></svg><div class="mini">Preview onset ${d.timeCourse.riseTicks} ticks · decay ${d.timeCourse.decayHalfLifeTicks} ticks · game potency index ${d.gamePotencyIndex}. Separate character and family tolerances.</div>`;
}
