/* Bellhaven Design Simulator — FICTIONAL, UNITLESS GAMEPLAY VARIABLES ONLY.
 * No real opioid equivalences, human lethal dose values, or dosing guidance.
 * Individual drug profiles are editable and can be cloned safely. */
(function (root) {
  'use strict';
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const num=(x,d=0)=>x==null || x==='' ? d : (Number.isFinite(Number(x))?Number(x):d);
  const copy=x=>JSON.parse(JSON.stringify(x));
  const profilesById=cfg=>Object.fromEntries(cfg.drugs.map(d=>[d.id,d]));
  function validateConfig(cfg) {
    const errors=[];
    if(!cfg||!Array.isArray(cfg.drugs)||!Array.isArray(cfg.classOrder))return ['Missing drugs[] or classOrder[]'];
    const ids=new Set();
    for(const d of cfg.drugs){
      if(!d.id||ids.has(d.id))errors.push('Duplicate/empty id '+d.id);
      ids.add(d.id);
      if(!cfg.classOrder.includes(d.class))errors.push(d.id+': unknown class');
      if(!d.timeCourse||num(d.timeCourse.riseTicks)<=0||num(d.timeCourse.decayHalfLifeTicks)<=0)errors.push(d.id+': invalid onset/decay');
      if(!d.tolerance||!d.tolerance.effectSensitivity||!d.dependence||!d.compulsiveness)errors.push(d.id+': incomplete adaptation profile');
      if(!d.tolerance)continue;
      for(const f of ['familyCarryover','gainPerExposure','surgeGainMultiplier','maintenancePlateauGain','maintenanceWindowTicks','recoveryPerTick','maxTolerance','highUseThreshold']){
        if(!Number.isFinite(Number(d.tolerance[f]))||Number(d.tolerance[f])<0)errors.push(d.id+': bad tolerance.'+f);
      }
      if(!(num(d.tolerance.clearanceGainFraction,0)>=0&&num(d.tolerance.clearanceGainFraction,0)<=1))errors.push(d.id+': bad clearanceGainFraction');
    }
    return errors;
  }
  function activeExposure(drug,tick,strength=1,route='oral'){
    if(tick<=0||strength<=0)return 0;
    const tc=drug.timeCourse;
    const profile=tc.routeProfiles?.[route]||{onsetScale:1,exposureScale:1};
    const rise=Math.max(.001,num(tc.riseTicks,5)*num(profile.onsetScale,1));
    const half=Math.max(.001,num(tc.decayHalfLifeTicks,20));
    const tail=clamp(num(tc.residualTailFactor,0),0,.95);
    const decay=(1-tail)*Math.pow(2,-tick/half)+tail*Math.pow(2,-tick/(half*3));
    return Math.max(0,strength*num(drug.gamePotencyIndex,1)*num(profile.exposureScale,1)*(1-Math.exp(-tick/rise))*decay);
  }
  function effectiveTolerance(profile,state={},channel='reward'){
    const specific=num(state.drugTolerance?.[profile.id]);
    const family=num(state.familyTolerance?.[profile.class]);
    const sensitivity=num(profile.tolerance.effectSensitivity?.[channel],1);
    return Math.max(0,(specific+family*num(profile.tolerance.familyCarryover,0))*sensitivity);
  }
  function response(profile,tick,state={},channel='reward',route='oral',strength=1){
    const active=activeExposure(profile,tick,strength,route);
    const tolerance=effectiveTolerance(profile,state,channel);
    const k=Math.max(.001,num(state.responseSaturation,.65));
    return active/(active+k*(1+tolerance));
  }
  function interactionAmount(rule,exposureA,exposureB,channel){
    const a=Math.max(0,num(exposureA)),b=Math.max(0,num(exposureB));
    const saturation=Math.max(.001,num(rule.saturation,1));
    if(!a||!b)return 0;
    const channelCap=num(rule.effectChannels?.[channel]);
    return Math.max(0,Math.min(channelCap,num(rule.cap,channelCap)))*(a/(a+saturation))*(b/(b+saturation));
  }
  /* Active data are game exposure indices, sampled at an arbitrary regular cadence.
   * delta-release weighting is a tunable abstraction inspired by the old design;
   * it does NOT reuse Relicbound's Q/4 stamps or 0-100 shared meter. */
  function advanceAdaptation(cfg,old,activeById,steps=1,maintenanceIds=[]){
    const state=copy(old||{}),byId=profilesById(cfg);
    for(const field of ['drugTolerance','familyTolerance','dependence','compulsiveness','conditionedCue','previousActive','maintenanceProgress'])state[field]||={};
    const maintainedIds=new Set(maintenanceIds);
    const classExposure=Object.fromEntries(cfg.classOrder.map(c=>[c,0]));
    const classGain=Object.fromEntries(cfg.classOrder.map(c=>[c,0]));
    const familyScale=num(cfg.simulation?.familyGainScale,.3);
    for(const [id,d] of Object.entries(byId)){
      const exposure=Math.max(0,num(activeById[id]));
      const prev=Math.max(0,num(state.previousActive[id]));
      const t=d.tolerance,dep=d.dependence,cmp=d.compulsiveness;
      classExposure[d.class]+=exposure;
      const steady=exposure>0&&prev>0&&Math.abs(exposure-prev)<=Math.max(.05,prev*.10);
      const progress=maintainedIds.has(id)&&steady?num(state.maintenanceProgress[id])+steps:0;
      state.maintenanceProgress[id]=progress;
      const establishedMaintenance=maintainedIds.has(id)&&progress>=num(t.maintenanceWindowTicks,0);
      const clearance=Math.max(0,prev-exposure);
      const clearanceShare=clamp(num(t.clearanceGainFraction,0),0,1);
      const high=Math.max(0,exposure-num(t.highUseThreshold,1));
      const highUseBonus=high*Math.max(0,num(t.surgeGainMultiplier,1)-1);
      const exposureToBank=(exposure+highUseBonus)*(1-clearanceShare)+clearance*clearanceShare;
      const gain=establishedMaintenance?exposure*num(t.maintenancePlateauGain):num(t.gainPerExposure)*exposureToBank;
      const recovery=exposure===0?num(t.recoveryPerTick)*steps:0;
      state.drugTolerance[id]=clamp(num(state.drugTolerance[id])+gain*steps-recovery,0,num(t.maxTolerance,4));
      classGain[d.class]+=gain*num(t.familyCarryover,0)*familyScale*steps;
      state.dependence[id]=clamp(num(state.dependence[id])+steps*(exposure>0?(num(dep.gainPerExposure)*exposure+(establishedMaintenance?num(dep.maintenanceGainPerTick):0)):-num(dep.recoveryPerTick)),0,num(dep.maxDependence,4));
      state.compulsiveness[id]=clamp(num(state.compulsiveness[id])+steps*(exposure>0?num(cmp.gainPerReward)*exposure:-num(cmp.recoveryPerTick)),0,4);
      // Earlier redosing influences expectations, not actual withdrawal onset.
      const naturalCue=.85,oldCue=num(state.conditionedCue[id],naturalCue);
      state.conditionedCue[id]=clamp(oldCue+steps*num(cmp.habitDecayPerTick)*(naturalCue-oldCue),.20,.95);
      state.previousActive[id]=exposure;
    }
    for(const category of cfg.classOrder){
      const recoveryRate=num(cfg.simulation?.familyRecoveryPerTick?.[category],.002);
      const recovery=classExposure[category]===0?steps*recoveryRate:0;
      state.familyTolerance[category]=clamp(num(state.familyTolerance[category])+classGain[category]-recovery,0,4);
    }
    return state;
  }
  /* normalizedComedownProgress: 0 = peak, 1 = effects ended.
   * Early redosing on the falling side trains earlier expectations, but never at peak. */
  function recordEarlyRedose(cfg,old,id,normalizedComedownProgress){
    const d=profilesById(cfg)[id];if(!d)throw Error('Unknown drug '+id);
    const state=copy(old||{});state.conditionedCue||={};
    const x=clamp(num(normalizedComedownProgress,1),0,1);
    if(x<.2)return state; // Main high, no anticipatory conditioning.
    const current=num(state.conditionedCue[id],.85);
    const learn=clamp(num(d.compulsiveness.earlyRedoseLearningRate,.08),0,1);
    state.conditionedCue[id]=clamp(current+(x-current)*learn,.20,.95);
    return state;
  }
  function cravingPressure(cfg,state,id,normalizedComedownProgress){
    const d=profilesById(cfg)[id];if(!d)throw Error('Unknown drug '+id);
    const phase=clamp(num(normalizedComedownProgress),0,1);
    if(phase<.2)return 0;
    const threshold=num(state?.conditionedCue?.[id],.85);
    const ramp=clamp((phase-threshold)/Math.max(.08,1-threshold),0,1);
    const comp=clamp(num(state?.compulsiveness?.[id]),0,4)/4;
    const cue=num(d.compulsiveness.cueSensitivity,.8);
    return clamp(ramp*(.15+comp*.85)*cue,0,1);
  }
  function findInteraction(cfg,classA,classB){return (cfg.interactions||[]).find(i=>i.families?.includes(classA)&&i.families?.includes(classB))||null;}
  function cloneProfile(cfg,id,newId,newName){
    if(!newId||!/^[-a-z0-9_]+$/.test(newId))throw Error('New id must be lowercase letters, numbers, hyphens or underscores');
    if(cfg.drugs.some(x=>x.id===newId))throw Error('A drug already uses that id');
    const source=cfg.drugs.find(d=>d.id===id);if(!source)throw Error('Missing source '+id);
    const duplicate=copy(source);duplicate.id=newId;duplicate.displayName=newName||source.displayName+' Copy';cfg.drugs.push(duplicate);return duplicate;
  }
  function classSorted(cfg){return [...cfg.drugs].sort((a,b)=>cfg.classOrder.indexOf(a.class)-cfg.classOrder.indexOf(b.class)||a.displayName.localeCompare(b.displayName));}
  const api={activeExposure,effectiveTolerance,response,interactionAmount,advanceAdaptation,recordEarlyRedose,cravingPressure,findInteraction,cloneProfile,classSorted,validateConfig,profilesById};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.BellhavenDrugEngine=api;
})(typeof window!=='undefined'?window:null);
