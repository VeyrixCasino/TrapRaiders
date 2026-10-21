import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
# These numbers are fictional abstract simulation coefficients and not dose conversions.
items=[
 ('morphine','Morphine','Opioids','Morphine',1.0, 9,23,.055,.015,.25,.018),
 ('codeine','Codeine','Opioids','Morphine',.6,11,17,.037,.009,.35,.012),
 ('oxycodone','Oxycodone','Opioids','Morphine',1.25,10,24,.068,.018,.31,.017),
 ('heroin','Heroin','Opioids','Morphine',1.3,5,15,.083,.020,.42,.027),
 ('hydromorphone','Hydromorphone','Opioids','Morphine',1.5,8,19,.061,.016,.33,.022),
 ('fentanyl','Fentanyl','Opioids','Morphine',1.8,3,12,.074,.022,.36,.026),
 ('u47700','U-47700','Opioids','Morphine',1.6,5,14,.080,.020,.40,.025),
 ('alprazolam','Alprazolam','Benzodiazepines','Alprazolam',1.0,8,22,.049,.016,.23,.015),
 ('diazepam','Diazepam','Benzodiazepines','Alprazolam',.78,13,42,.035,.012,.30,.009),
 ('lorazepam','Lorazepam','Benzodiazepines','Alprazolam',.94,10,29,.042,.015,.28,.013),
 ('clonazepam','Clonazepam','Benzodiazepines','Alprazolam',.91,14,37,.040,.014,.29,.012),
 ('cocaine','Cocaine','Stimulants','Stimulant Game Index',1.1,4,11,.064,.009,.30,.025),
 ('crack','Crack Cocaine','Stimulants','Stimulant Game Index',1.22,2,7,.076,.008,.34,.033),
 ('meth','Methamphetamine','Stimulants','Stimulant Game Index',1.3,5,37,.070,.010,.25,.025),
 ('amphetamine','Amphetamine','Stimulants','Stimulant Game Index',.77,9,26,.043,.010,.25,.016),
 ('mdma','MDMA','Stimulants','Stimulant Game Index',1.0,9,23,.062,.012,.26,.020),
 ('ketamine','Ketamine','Dissociatives','Dissociative Game Index',1.0,5,16,.046,.007,.20,.018),
 ('pcp','PCP','Dissociatives','Dissociative Game Index',1.4,7,30,.067,.009,.32,.023),
 ('dxm','Dextromethorphan','Dissociatives','Dissociative Game Index',.64,11,35,.038,.011,.24,.015),
]
config={
 'schemaVersion':1,
 'disclaimer':'Fictional unitless gameplay profiles. No clinical potency or lethal-dose values. Developer-only config; do not expose hidden substance contents to players.',
 'classOrder':['Opioids','Benzodiazepines','Stimulants','Dissociatives'],
 'simulation':{'tickLabel':'game tick','responseSaturation':0.65,'toleranceRecoveryMultiplier':1.0,'interactionSaturation':0.9,'effectVisibilityThreshold':0.1,'developerDebugOnly':True,'familyGainScale':0.30,'familyRecoveryPerTick':{'Opioids':0.0024,'Benzodiazepines':0.0022,'Stimulants':0.0028,'Dissociatives':0.0026}},
 'drugs':[],
 'interactions':[
  {'id':'opioid-benzo','families':['Opioids','Benzodiazepines'],'effectChannels':{'sedation':0.22,'motorImpairment':0.15,'physiologicalStress':0.38},'cap':0.38,'saturation':0.95},
  {'id':'opioid-stim','families':['Opioids','Stimulants'],'effectChannels':{'perceivedAlertness':0.1,'physiologicalStress':0.19,'motorImpairment':0.08},'cap':0.20,'saturation':1.1},
  {'id':'benzo-stim','families':['Benzodiazepines','Stimulants'],'effectChannels':{'motorImpairment':0.12,'physiologicalStress':0.13},'cap':0.16,'saturation':1.0},
  {'id':'stim-dissociative','families':['Stimulants','Dissociatives'],'effectChannels':{'perceptionUncertainty':0.21,'physiologicalStress':0.15},'cap':0.23,'saturation':1.15},
  {'id':'opioid-dissociative','families':['Opioids','Dissociatives'],'effectChannels':{'motorImpairment':0.23,'physiologicalStress':0.28},'cap':0.31,'saturation':1.0},
  {'id':'benzo-dissociative','families':['Benzodiazepines','Dissociatives'],'effectChannels':{'sedation':0.16,'motorImpairment':0.18},'cap':0.24,'saturation':1.0}
 ]
}
for id,name,cl,ref,pot,rise,decay,gain,dep,cross,crave in items:
 profile={
  'id':id,'displayName':name,'class':cl,'reference':ref,
  'gamePotencyIndex':pot,
  'timeCourse':{'riseTicks':rise,'decayHalfLifeTicks':decay,'residualTailFactor':0.15,
   'supportedRouteProfiles':['oral','intranasal','smoking','iv'],
   'routeProfiles':{
    'oral':{'onsetScale':1.35,'exposureScale':0.75},
    'intranasal':{'onsetScale':0.8,'exposureScale':0.83},
    'smoking':{'onsetScale':0.48,'exposureScale':0.84},
    'iv':{'onsetScale':0.24,'exposureScale':1.0}}
   },
  'tolerance':{
   'familyCarryover':cross,'gainPerExposure':gain,'surgeGainMultiplier':1.7,
   'maintenancePlateauGain':0.0,'maintenanceWindowTicks':40,'clearanceGainFraction':round(.10+cross*.25,3),'highUseThreshold':1.0,
   'recoveryPerTick':round(gain*0.055,5),'maxTolerance':4.0,
   'effectSensitivity':{'reward':1.0,'speed':0.7,'stamina':0.7,'sedation':0.45,'motorImpairment':0.35,'physiologicalRisk':0.2}
  },
  'dependence':{'gainPerExposure':dep,'maintenanceGainPerTick':round(dep*0.12,5),
                'recoveryPerTick':round(dep*.055,5),'maxDependence':4.0,
                'withdrawalSensitivity':1.0 if cl in ['Opioids','Benzodiazepines'] else 0.0},
  'compulsiveness':{'gainPerReward':crave,'recoveryPerTick':round(crave*.025,5),
                    'cueSensitivity':.8,'earlyRedoseLearningRate':.09,'habitDecayPerTick':.002},
  'effects':({'painResponse':.8,'sedation':.6,'motorImpairment':.25,'physiologicalStress':.38} if cl=='Opioids' else
    {'sedation':.8,'motorImpairment':.55,'memoryImpairment':.4,'physiologicalStress':.2} if cl=='Benzodiazepines' else
    {'perceivedAlertness':.85,'speed':.18,'stamina':.2,'physiologicalStress':.38} if cl=='Stimulants' else
    {'perceptionUncertainty':.8,'motorImpairment':.6,'physiologicalStress':.22})
 }
 if id in ('codeine','oxycodone','alprazolam','diazepam','lorazepam','clonazepam','amphetamine','mdma','dxm'):
  profile['timeCourse']['supportedRouteProfiles']=['oral']
 elif id in ('fentanyl','u47700'):
  profile['timeCourse']['supportedRouteProfiles']=['intranasal','smoking','iv']
 elif id in ('ketamine','cocaine'):
  profile['timeCourse']['supportedRouteProfiles']=['intranasal']
 elif id=='pcp':
  profile['timeCourse']['supportedRouteProfiles']=['smoking']
 elif id=='crack':
  profile['timeCourse']['supportedRouteProfiles']=['smoking']
 config['drugs'].append(profile)
(root/'Config/DrugProfiles.json').write_text(json.dumps(config,indent=2)+'\n')
print('Created',len(config['drugs']),'fictional tunable profiles')
