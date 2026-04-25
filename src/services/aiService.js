// Rule-based AI emergency classifier - runs 100% locally, no API needed

const EMERGENCY_TYPES = {
  flood: { keywords: ['flood','water','rain','submerge','drown','river','overflow','inundation'], icon: '🌊' },
  fire: { keywords: ['fire','burn','smoke','flame','blaze','inferno','arson','ignite'], icon: '🔥' },
  earthquake: { keywords: ['earthquake','quake','tremor','shake','seismic','building collapse','crack','rubble'], icon: '🏚️' },
  medical: { keywords: ['heart attack','stroke','injured','wound','bleeding','unconscious','breathe','medical','hospital','ambulance','sick','pain'], icon: '🏥' },
  violence: { keywords: ['attack','assault','shooting','bomb','threat','violence','riot','gang','weapon'], icon: '⚠️' },
  infrastructure: { keywords: ['bridge','road','power','electricity','gas leak','pipeline','collapse','dam'], icon: '🏗️' },
  cyclone: { keywords: ['cyclone','hurricane','storm','wind','tornado','typhoon'], icon: '🌀' },
  landslide: { keywords: ['landslide','mudslide','avalanche','debris','slope','hill'], icon: '⛰️' },
};

const GUIDANCE = {
  flood: ['Move to higher ground immediately','Avoid walking/driving through floodwater','Turn off utilities at main switches','Do not touch electrical equipment if wet','Call emergency services: 112'],
  fire: ['Evacuate immediately – do not use elevators','Cover nose with wet cloth','Crawl low under smoke','Pull fire alarm if available','Call fire services: 101'],
  earthquake: ['Drop, Cover, Hold On','Stay away from windows and exterior walls','Do not run outside during shaking','Check for gas leaks after shaking stops','Call emergency services: 112'],
  medical: ['Call ambulance: 108','Keep the person still and calm','Apply pressure to bleeding wounds','Do not move if spinal injury suspected','Start CPR if no pulse/breathing'],
  violence: ['Move away from the threat immediately','Seek shelter in a secure building','Call police: 100','Do not confront the attacker','Alert authorities with your location'],
  infrastructure: ['Stay away from damaged structures','Report gas leaks: 1906','Do not use electrical switches near leaks','Evacuate the area','Call emergency: 112'],
  cyclone: ['Stay indoors away from windows','Board up windows if time permits','Store water and food for 72 hours','Follow official evacuation orders','Call NDRF: 011-24363260'],
  landslide: ['Evacuate the area immediately','Stay away from river banks','Watch for unusual sounds (cracking trees, boulders)','Contact local disaster management','Call emergency: 112'],
  unknown: ['Stay calm and assess the situation','Call emergency services: 112','Move to a safe location','Alert people around you','Follow official guidance'],
};

const SAFE_ZONES = [
  { name: 'Central Community Hall', lat: 28.6139, lng: 77.2090, type: 'shelter' },
  { name: 'District Hospital', lat: 28.6200, lng: 77.2150, type: 'medical' },
  { name: 'Police Station Ground', lat: 28.6080, lng: 77.2030, type: 'assembly' },
  { name: 'Government School Campus', lat: 28.6250, lng: 77.1980, type: 'shelter' },
  { name: 'Stadium Emergency Camp', lat: 28.6170, lng: 77.2200, type: 'shelter' },
];

export function classifyEmergency(text) {
  const lower = text.toLowerCase();
  let bestType = 'unknown', bestScore = 0;
  for (const [type, info] of Object.entries(EMERGENCY_TYPES)) {
    const score = info.keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) { bestScore = score; bestType = type; }
  }
  return bestType;
}

export function getPriority(text) {
  const high = ['immediate','urgent','dying','critical','help','sos','emergency','now'];
  const low = ['minor','small','slight','not urgent','stable'];
  const lower = text.toLowerCase();
  if (high.some(k => lower.includes(k))) return 'high';
  if (low.some(k => lower.includes(k))) return 'low';
  return 'medium';
}

export function analyzeEmergency(text) {
  const type = classifyEmergency(text);
  const priority = getPriority(text);
  const guidance = GUIDANCE[type] || GUIDANCE.unknown;
  const nearestSafeZone = SAFE_ZONES[Math.floor(Math.random() * SAFE_ZONES.length)];
  const icon = EMERGENCY_TYPES[type]?.icon || '🆘';
  return { type, priority, guidance, nearestSafeZone, icon, confidence: type !== 'unknown' ? 'high' : 'low' };
}

export function getSafeZones() { return SAFE_ZONES; }

export function getResourceMatch(requestType) {
  const map = {
    medical: ['hospital', 'clinic', 'first_aid', 'medical'],
    food: ['food', 'kitchen', 'distribution', 'relief'],
    shelter: ['shelter', 'camp', 'hall', 'school'],
    water: ['water', 'supply', 'tanker'],
    rescue: ['rescue', 'boat', 'team', 'ngo'],
  };
  return map[requestType] || map.shelter;
}
