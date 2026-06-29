export interface DiagnosticStep {
  title: string
  description: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  diy: boolean
}

export interface DiagnosticResult {
  summary: string
  possibleCauses: string[]
  steps: DiagnosticStep[]
  estimatedCost: string
  shouldSeeShop: boolean
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  disclaimer: string
}

// Keyword → category mapping
type Category =
  | 'check_engine'
  | 'overheating'
  | 'battery_electrical'
  | 'brakes'
  | 'transmission'
  | 'ac_climate'
  | 'steering'
  | 'suspension'
  | 'starting'
  | 'noise_squeak'
  | 'noise_grind'
  | 'noise_knock'
  | 'fuel_economy'
  | 'oil'
  | 'tire'
  | 'exhaust'
  | 'general'

function detectCategory(problem: string): Category {
  const p = problem.toLowerCase()
  if (/check engine|cel|engine light|obd|p0[0-9]/i.test(p)) return 'check_engine'
  if (/overheat|hot|temperature|steam|coolant|radiator|thermostat/i.test(p)) return 'overheating'
  if (/battery|alternator|electrical|dead|no power|won.t start|won't start|no crank|no start|click/i.test(p)) return 'battery_electrical'
  if (/brake|stopping|pedal|abs|braking/i.test(p)) return 'brakes'
  if (/transmission|gear|shift|slipping|clunk.*gear|jerk.*gear|atf/i.test(p)) return 'transmission'
  if (/air condition|ac|a\/c|heat|hvac|blower|cooling|climate/i.test(p)) return 'ac_climate'
  if (/steer|pull|wander|drift|alignment|power steering/i.test(p)) return 'steering'
  if (/bounce|rough ride|suspension|shock|strut|cv joint|axle|vibrat/i.test(p)) return 'suspension'
  if (/won.t start|hard start|won't start|crank|ignition|starter|stall/i.test(p)) return 'starting'
  if (/squeak|squeal|screech/i.test(p)) return 'noise_squeak'
  if (/grind|grating|metal.*metal/i.test(p)) return 'noise_grind'
  if (/knock|tick|tap|ping|rattle|clunk/i.test(p)) return 'noise_knock'
  if (/mpg|mileage|fuel economy|gas|consumption/i.test(p)) return 'fuel_economy'
  if (/oil|leak|drip|puddle/i.test(p)) return 'oil'
  if (/tire|tyre|flat|pressure|tpms/i.test(p)) return 'tire'
  if (/exhaust|smoke|emission|catalytic|muffler|smell/i.test(p)) return 'exhaust'
  return 'general'
}

const DIAGNOSTICS: Record<Category, DiagnosticResult> = {
  check_engine: {
    summary: 'The Check Engine Light (CEL) indicates your vehicle\'s onboard diagnostic system detected a fault. It can range from a loose gas cap to sensor or emissions issues.',
    possibleCauses: [
      'Loose or faulty gas cap',
      'Oxygen (O2) sensor failure',
      'Catalytic converter issue',
      'Mass airflow (MAF) sensor fault',
      'Spark plug or ignition coil misfire',
      'Evaporative emission system leak',
      'Exhaust Gas Recirculation (EGR) valve fault',
    ],
    steps: [
      { title: 'Check the gas cap first', description: 'Tighten or replace the gas cap — this triggers the CEL in ~10% of cases. Drive a few cycles to see if it clears.', urgency: 'low', diy: true },
      { title: 'Read the OBD-II fault code', description: 'Use an OBD-II scanner (under $30 at AutoZone/O\'Reilly, or borrow one free). The P-code tells you exactly which system failed.', urgency: 'medium', diy: true },
      { title: 'Note any symptoms', description: 'Is the car running rough, misfiring, or losing power? A flashing CEL = active misfire and requires immediate attention. Steady CEL can wait a day.', urgency: 'medium', diy: true },
      { title: 'Inspect spark plugs & coil packs', description: 'If the code is a misfire (P0300–P0308), check and replace worn spark plugs first — they\'re the cheapest fix.', urgency: 'medium', diy: true },
      { title: 'Visit a shop if code points to O2/catalytic/EGR', description: 'These require emissions testing equipment to verify. Ignoring them can damage the catalytic converter ($800–$2500 to replace).', urgency: 'high', diy: false },
    ],
    estimatedCost: 'Gas cap: $5–$20 | Spark plugs: $30–$120 | O2 sensor: $150–$400 | Catalytic converter: $500–$2500',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'A flashing CEL is always critical — pull over safely and stop driving.',
  },

  overheating: {
    summary: 'Overheating is serious and can cause permanent engine damage. Pull over safely, turn off the engine, and do not open the radiator cap on a hot engine.',
    possibleCauses: [
      'Low or leaking coolant',
      'Failed thermostat (stuck closed)',
      'Radiator blockage or leak',
      'Water pump failure',
      'Blown head gasket',
      'Failed cooling fan',
      'Air pocket in cooling system',
    ],
    steps: [
      { title: 'Stop driving immediately', description: 'Continuing to drive an overheating engine can warp the cylinder head or crack the block. Pull over safely, turn on the heater to max (it draws heat from engine), and shut off.', urgency: 'critical', diy: true },
      { title: 'Let it cool — at least 30 minutes', description: 'Never open the radiator cap while hot. Pressurized coolant can cause severe burns. Wait until the temp gauge is back in normal range.', urgency: 'critical', diy: true },
      { title: 'Check coolant level', description: 'Once cool, open the coolant reservoir cap (not radiator) and check level. If empty or low, add pre-mixed coolant or distilled water as a temporary fix.', urgency: 'high', diy: true },
      { title: 'Look for leaks', description: 'Inspect under the car and around hoses, radiator, and water pump for coolant puddles (usually bright green, orange, or pink).', urgency: 'high', diy: true },
      { title: 'Check the cooling fan', description: 'With the car cool, start it and see if the radiator fan(s) kick on when it warms up. A fan that doesn\'t spin when the A/C is on is faulty.', urgency: 'high', diy: false },
      { title: 'See a mechanic before driving again', description: 'Overheating often requires professional diagnosis to rule out a head gasket failure. Look for milky oil or white exhaust smoke — signs of coolant entering the engine.', urgency: 'critical', diy: false },
    ],
    estimatedCost: 'Coolant flush/refill: $80–$150 | Thermostat: $100–$250 | Water pump: $250–$600 | Radiator: $300–$800 | Head gasket: $1000–$3000',
    shouldSeeShop: true,
    urgencyLevel: 'critical',
    disclaimer: 'Do NOT drive an overheating vehicle. Engine damage can be catastrophic and irreversible.',
  },

  battery_electrical: {
    summary: 'Electrical and battery issues are common causes of no-start or intermittent power problems. Most can be diagnosed with a basic multimeter.',
    possibleCauses: [
      'Dead or weak battery (most common)',
      'Failing alternator (not charging battery)',
      'Corroded or loose battery terminals',
      'Bad ground connection',
      'Blown fuse or relay',
      'Faulty starter motor',
    ],
    steps: [
      { title: 'Check battery terminals', description: 'Look for corrosion (white/blue powdery buildup) on battery terminals. Clean with a wire brush and baking soda/water solution. Ensure they\'re tight.', urgency: 'medium', diy: true },
      { title: 'Test the battery voltage', description: 'Use a multimeter. A healthy battery reads 12.6V (at rest). Under 12V means it\'s discharged; under 12.2V may mean it\'s failing.', urgency: 'medium', diy: true },
      { title: 'Jump-start the car', description: 'If battery is dead, jump-start with jumper cables or a jump pack. If it starts fine, drive for 20+ minutes to recharge, then retest voltage.', urgency: 'medium', diy: true },
      { title: 'Test the alternator', description: 'While running, check battery voltage — it should read 13.5–14.5V. Below 13V = alternator isn\'t charging. AutoZone offers free alternator tests.', urgency: 'high', diy: true },
      { title: 'Check fuses and relays', description: 'For accessory-specific failures (windows, radio, lights), check the fuse box. Your owner\'s manual maps which fuse covers what.', urgency: 'medium', diy: true },
      { title: 'Replace battery if over 3–5 years old', description: 'Most batteries last 3–5 years. If yours is in that range and showing weak starts, proactive replacement is cheaper than getting stranded.', urgency: 'medium', diy: true },
    ],
    estimatedCost: 'Battery: $100–$250 | Alternator: $300–$700 | Starter: $250–$600 | Battery terminals: $20–$50',
    shouldSeeShop: false,
    urgencyLevel: 'medium',
    disclaimer: 'If the car won\'t start after jump-starting, have it towed rather than risk getting stranded.',
  },

  brakes: {
    summary: 'Brake issues directly affect your safety. Even minor symptoms like squeaking should be addressed promptly.',
    possibleCauses: [
      'Worn brake pads (most common)',
      'Warped or worn brake rotors',
      'Low or leaking brake fluid',
      'Sticking brake caliper',
      'ABS sensor fault',
      'Rear drum brake issues',
      'Brake booster vacuum leak',
    ],
    steps: [
      { title: 'Check brake pad thickness', description: 'Look through the wheel spokes — pads should be at least 3mm thick (a pencil eraser width). Most pads have a built-in wear indicator that squeals when they\'re thin.', urgency: 'high', diy: true },
      { title: 'Inspect brake fluid level', description: 'Check the reservoir under the hood (usually semi-transparent). Level between MIN/MAX marks is normal. Dark or low fluid is a concern.', urgency: 'high', diy: true },
      { title: 'Note when the noise/issue occurs', description: 'Squealing when braking = worn pads. Grinding = metal-on-metal (urgent). Pulsation/shaking = warped rotors. Pulling to one side = sticking caliper.', urgency: 'high', diy: true },
      { title: 'Check for leaks', description: 'Inspect the ground behind each wheel for brake fluid drips. Any leak in the brake system is a serious safety hazard.', urgency: 'critical', diy: true },
      { title: 'Have rotors measured', description: 'If you hear grinding or feel vibration, rotors may need resurfacing or replacement. A shop can measure rotor thickness ($0–$20).', urgency: 'high', diy: false },
      { title: 'Don\'t delay brake repairs', description: 'Worn pads can damage rotors (turning a $120 job into a $400 one). Any brake issue affecting stopping distance should be repaired immediately.', urgency: 'critical', diy: false },
    ],
    estimatedCost: 'Brake pads (per axle): $80–$200 | Rotors (per axle): $150–$400 | Caliper: $150–$400 | Brake fluid flush: $80–$150',
    shouldSeeShop: true,
    urgencyLevel: 'high',
    disclaimer: 'Brake failure can cause accidents. Do not delay if your stopping distance has increased.',
  },

  transmission: {
    summary: 'Transmission issues range from minor fluid concerns to major mechanical failures. Early diagnosis can save thousands.',
    possibleCauses: [
      'Low or burnt transmission fluid',
      'Faulty shift solenoids',
      'Worn clutch (manual transmission)',
      'Torque converter problem (automatic)',
      'Transmission control module issue',
      'Worn transmission bands or clutch packs',
      'Clogged transmission filter',
    ],
    steps: [
      { title: 'Check transmission fluid', description: 'With the car warm and in Park, check the dipstick (automatic). Fluid should be pink/red and not smell burnt. Dark, brown, or burnt-smelling fluid needs immediate change.', urgency: 'high', diy: true },
      { title: 'Note the exact symptom', description: 'Slipping (RPMs rise, no acceleration) = fluid, clutch pack, or solenoid. Clunking on shifts = mounts or torque converter. Won\'t go into gear = TCM or shift solenoid.', urgency: 'high', diy: true },
      { title: 'Check for fault codes', description: 'Transmission issues often set P07xx or P08xx codes. An OBD-II scanner will tell you exactly which solenoid or sensor is involved.', urgency: 'medium', diy: true },
      { title: 'Avoid hard acceleration until diagnosed', description: 'A slipping or struggling transmission is under stress. Gentle driving reduces the risk of total failure while you get it inspected.', urgency: 'high', diy: true },
      { title: 'Get a transmission flush + filter change', description: 'If fluid is dirty, a professional flush ($150–$300) can resolve many slipping or hesitation issues before they become serious.', urgency: 'high', diy: false },
      { title: 'Get a professional diagnosis', description: 'Transmission rebuilds are expensive ($1500–$4000+). A good shop can tell you if it\'s a cheap solenoid vs. a full rebuild — worth knowing before committing.', urgency: 'high', diy: false },
    ],
    estimatedCost: 'Fluid flush: $150–$300 | Solenoid: $150–$400 | Rebuild: $1500–$4500 | Replacement: $2500–$6000',
    shouldSeeShop: true,
    urgencyLevel: 'high',
    disclaimer: 'Don\'t ignore transmission issues. A $200 fix today can prevent a $4000 rebuild tomorrow.',
  },

  ac_climate: {
    summary: 'A/C and heating problems are usually refrigerant-related, electrical, or a blend door issue. Most are fixable without major expense.',
    possibleCauses: [
      'Low or leaking refrigerant (most common)',
      'Failed A/C compressor',
      'Clogged cabin air filter',
      'Faulty blend door actuator',
      'Broken blower motor or resistor',
      'Refrigerant leak at condenser or hose',
      'Electrical issue in A/C control module',
    ],
    steps: [
      { title: 'Check the cabin air filter first', description: 'A clogged cabin filter reduces airflow significantly. It\'s usually behind the glove box and takes 10 minutes to replace. Replace every 15,000–25,000 miles.', urgency: 'low', diy: true },
      { title: 'Listen for A/C compressor engagement', description: 'Turn on A/C max cold. You should hear a faint click and the idle may change slightly when the compressor clutch engages. No click = compressor or electrical issue.', urgency: 'medium', diy: true },
      { title: 'Check blower motor speeds', description: 'If airflow is weak or only works on certain speed settings, the blower motor resistor may be faulty (cheap and easy DIY fix on most cars).', urgency: 'low', diy: true },
      { title: 'Check for refrigerant leaks', description: 'Look for oily residue around A/C hose fittings or the condenser in front of the radiator. UV dye kits can detect leaks.', urgency: 'medium', diy: false },
      { title: 'Recharge the refrigerant', description: 'If A/C blows warm, low refrigerant is the #1 cause. DIY recharge kits ($40–$60) work for small leaks. A shop can evacuate, check for leaks, and recharge properly.', urgency: 'medium', diy: true },
      { title: 'Have compressor tested if still warm', description: 'If recharge doesn\'t help, the compressor or its clutch may have failed. This requires professional service.', urgency: 'medium', diy: false },
    ],
    estimatedCost: 'Cabin air filter: $15–$30 | Blower resistor: $20–$80 | Recharge: $100–$250 | Compressor: $400–$900',
    shouldSeeShop: false,
    urgencyLevel: 'low',
    disclaimer: 'Refrigerant handling requires certification in many states. Shops can do it properly and check for leaks.',
  },

  steering: {
    summary: 'Steering problems can affect vehicle control and safety. Pulling, wandering, or stiff steering all have distinct causes.',
    possibleCauses: [
      'Uneven tire pressure or worn tires',
      'Wheel alignment out of spec',
      'Low power steering fluid (hydraulic systems)',
      'Failing power steering pump',
      'Worn tie rod ends',
      'Bad ball joints',
      'Electric power steering (EPS) motor fault',
    ],
    steps: [
      { title: 'Check tire pressure on all four tires', description: 'Uneven pressure is the #1 cause of pulling. Inflate all tires to the spec on the door jamb sticker. Check when cold for accuracy.', urgency: 'low', diy: true },
      { title: 'Check power steering fluid', description: 'For hydraulic systems, find the PS fluid reservoir (usually has a steering wheel icon). Low fluid can cause stiffness and whining noise. Top up with the correct fluid type.', urgency: 'medium', diy: true },
      { title: 'Listen for whining under turning', description: 'A whining or groaning sound when turning at low speed = low PS fluid or a failing PS pump. A clunking sound = worn tie rod or ball joint.', urgency: 'medium', diy: true },
      { title: 'Check tire wear pattern', description: 'Uneven wear (more on inside or outside edge) indicates alignment or suspension wear. A vehicle that pulls to one side nearly always has an alignment issue.', urgency: 'medium', diy: true },
      { title: 'Get a wheel alignment', description: 'If the car pulls or steering wheel is off-center, get an alignment ($80–$150). This also prevents accelerated tire wear.', urgency: 'medium', diy: false },
      { title: 'Inspect tie rods and ball joints', description: 'A mechanic can check for play in the steering linkage. Worn tie rods or ball joints can cause wandering and are a safety concern.', urgency: 'high', diy: false },
    ],
    estimatedCost: 'Wheel alignment: $80–$150 | PS fluid: $10–$20 | Tie rod end: $150–$400 | PS pump: $250–$650',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'Worn ball joints or tie rods can cause loss of steering control. Have them inspected promptly.',
  },

  suspension: {
    summary: 'Suspension issues cause rough rides, poor handling, and uneven tire wear. Most are identifiable through specific sounds or handling characteristics.',
    possibleCauses: [
      'Worn shock absorbers or struts',
      'Broken or worn sway bar links',
      'Worn CV joints or axle shafts',
      'Bad wheel bearing',
      'Broken spring',
      'Worn control arm bushings',
      'Damaged strut mount',
    ],
    steps: [
      { title: 'Perform the bounce test', description: 'Push down hard on each corner of the car and release. It should bounce back once. If it bounces 2–3 times, the shocks/struts are worn.', urgency: 'medium', diy: true },
      { title: 'Listen for the exact noise location', description: 'Clunking over bumps = sway bar links or strut mount. Clicking/popping when turning = CV joint. Humming/grinding that changes with speed = wheel bearing.', urgency: 'medium', diy: true },
      { title: 'Inspect CV boots', description: 'Look at the rubber boots on the inner and outer CV joints. If torn or cracked with grease flung around, the CV joint will fail soon. Replacing boots early prevents CV joint replacement.', urgency: 'high', diy: false },
      { title: 'Check sway bar links', description: 'These small links ($15–$40 parts) are the most common cause of clunking over bumps and are inexpensive to replace.', urgency: 'medium', diy: true },
      { title: 'Have wheel bearings tested', description: 'A shop can lift the car and check wheel bearing play. A failing bearing creates a humming noise that changes when you swerve left/right at highway speed.', urgency: 'high', diy: false },
      { title: 'Replace shocks/struts in pairs', description: 'Always replace both fronts or both rears together for even handling. Expect significant improvement in ride quality.', urgency: 'medium', diy: false },
    ],
    estimatedCost: 'Sway bar links: $80–$200 | Shocks/struts (pair): $250–$700 | CV axle: $200–$500 | Wheel bearing: $200–$500',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'Broken springs or failed struts can affect vehicle control. Inspect promptly.',
  },

  starting: {
    summary: 'Hard or no-start conditions have a handful of common culprits. A systematic check can pinpoint the issue quickly.',
    possibleCauses: [
      'Dead or weak battery',
      'Faulty starter motor',
      'Bad ignition switch or relay',
      'Fuel delivery problem (pump or pressure)',
      'Crankshaft/camshaft position sensor fault',
      'Immobilizer or security system issue',
      'Flooded engine',
    ],
    steps: [
      { title: 'Listen carefully when you turn the key', description: 'Click-click-click = weak battery. Single loud click = starter solenoid issue. Nothing at all = battery, fuse, or ignition. Cranks but won\'t fire = fuel/spark issue.', urgency: 'medium', diy: true },
      { title: 'Check battery first', description: 'Test battery voltage (12.6V = good). Try jump-starting. If it starts, drive to charge and test the battery and alternator.', urgency: 'medium', diy: true },
      { title: 'Check the starter fuse and relay', description: 'A blown starter fuse or stuck relay is a cheap fix. Find the fuse box and check for blown fuses. Swap the starter relay with an identical relay nearby to test.', urgency: 'medium', diy: true },
      { title: 'Try the key in a different position', description: 'If the security light stays on, there\'s an immobilizer issue. Try your spare key. Some Toyota/Honda models need the key reprogrammed after the battery dies.', urgency: 'medium', diy: true },
      { title: 'Check for fuel delivery', description: 'Turn the key to ON (don\'t crank). You should hear a faint hum from the fuel pump. No hum = bad pump or relay. You can also test fuel pressure at the rail.', urgency: 'high', diy: false },
      { title: 'Scan for fault codes', description: 'A crank/cam sensor fault will prevent starting. OBD scan usually reveals P0335, P0340, or similar codes pointing to the exact sensor.', urgency: 'medium', diy: true },
    ],
    estimatedCost: 'Battery: $100–$250 | Starter: $250–$600 | Fuel pump: $300–$800 | Crank sensor: $150–$400',
    shouldSeeShop: false,
    urgencyLevel: 'medium',
    disclaimer: 'If unsure, avoid repeated cranking — it can drain the battery completely and flood the engine.',
  },

  noise_squeak: {
    summary: 'Squeaking and squealing sounds usually point to brakes, belts, or rubber components that are dry, worn, or failing.',
    possibleCauses: [
      'Worn brake pad wear indicators (most common)',
      'Dry brake pads/rotors (morning squeal that goes away)',
      'Slipping or worn serpentine/drive belt',
      'Dry suspension bushings or ball joints',
      'Worn CV joint',
      'Loose heat shield on exhaust',
      'Belt tensioner or idler pulley bearing',
    ],
    steps: [
      { title: 'Identify when the squeak happens', description: 'Only when braking = brake pads. Constant squeak that stops when braking = rotor rust or worn pads. Under hood at startup = belt. Over bumps = suspension. Turning = CV joint or bearing.', urgency: 'medium', diy: true },
      { title: 'Check brake pad thickness', description: 'If the squeal happens when slowing down, inspect pad thickness visually. The metal wear indicator is designed to squeal at ~3mm remaining.', urgency: 'high', diy: true },
      { title: 'Inspect the serpentine belt', description: 'With the engine off, look at the belt for cracks, fraying, or glazing. A squealing belt at startup that goes away when warm = belt or tensioner.', urgency: 'medium', diy: true },
      { title: 'Listen with the hood open', description: 'Have someone rev the engine gently while you listen for the squeak source. A stethoscope or long screwdriver against components can help isolate it.', urgency: 'low', diy: true },
      { title: 'Lubricate suspension components', description: 'Dry rubber bushings can squeak. Spray silicone-based lubricant on sway bar end links, strut mounts, and control arm bushings to see if it resolves.', urgency: 'low', diy: true },
    ],
    estimatedCost: 'Brake pads: $80–$200 | Serpentine belt: $80–$200 | Belt tensioner: $100–$250 | Sway bar links: $80–$200',
    shouldSeeShop: false,
    urgencyLevel: 'medium',
    disclaimer: 'Brake squealing should always be investigated — worn pads can quickly damage rotors.',
  },

  noise_grind: {
    summary: 'Grinding sounds are typically metal-on-metal contact, which means something has worn through its protective layer. Investigate immediately.',
    possibleCauses: [
      'Brake pads completely worn — grinding on rotors',
      'Failing wheel bearing',
      'Transmission gear grinding (manual)',
      'CV joint failure',
      'Foreign object trapped in brakes',
      'Worn differential',
    ],
    steps: [
      { title: 'Determine when grinding occurs', description: 'Grinding when braking = dangerously worn brake pads, stop driving immediately. Grinding while moving without braking = wheel bearing or CV joint. Grinding when shifting = clutch or synchro.', urgency: 'critical', diy: true },
      { title: 'Do NOT ignore brake grinding', description: 'If the grinding is from braking, the pads are gone and you\'re damaging rotors with every stop. This is a serious safety issue — book a brake service today.', urgency: 'critical', diy: false },
      { title: 'Check for wheel bearing noise', description: 'A grinding or howling that changes pitch when you swerve at highway speed (louder going left, quieter going right or vice versa) is a classic bad wheel bearing signature.', urgency: 'high', diy: false },
      { title: 'Inspect for debris', description: 'A rock or metal object caught between the brake pad and rotor can grind loudly. Safely inspect the brake area (flashlight through wheel spokes) for visible debris.', urgency: 'medium', diy: true },
      { title: 'See a shop immediately if brake-related', description: 'Metal-on-metal braking dramatically increases stopping distance and can cause brake failure. This is a same-day repair situation.', urgency: 'critical', diy: false },
    ],
    estimatedCost: 'Brake pads + rotors: $250–$600 per axle | Wheel bearing: $200–$500 | CV axle: $200–$500',
    shouldSeeShop: true,
    urgencyLevel: 'critical',
    disclaimer: 'Grinding brakes are a safety emergency. Do not delay repairs.',
  },

  noise_knock: {
    summary: 'Knocking, ticking, or clunking sounds from the engine or drivetrain require prompt attention to prevent serious damage.',
    possibleCauses: [
      'Engine knock (detonation/pre-ignition)',
      'Low oil pressure or low oil level',
      'Worn connecting rod bearings',
      'Collapsed lifter or worn valvetrain',
      'Loose heat shield',
      'Sway bar link or strut mount clunking',
      'Piston slap',
    ],
    steps: [
      { title: 'Check oil level first', description: 'Low oil is the most common cause of knocking, ticking, and rattling from the engine. Check the dipstick — if low, add the correct weight oil immediately.', urgency: 'critical', diy: true },
      { title: 'Use the correct octane fuel', description: 'Engine knock (pinging under acceleration) often means you\'re using lower octane than required. Check your owner\'s manual — some engines require 91+ premium.', urgency: 'medium', diy: true },
      { title: 'Listen to the knock pattern', description: 'Tick at idle that speeds with RPM = valve train or lifter. Deep knock under load = rod bearing (serious). Clunk from underneath over bumps = suspension. Rattle at startup = timing chain.', urgency: 'high', diy: true },
      { title: 'Check oil pressure warning light', description: 'If the oil pressure light is on alongside the knock, stop the engine immediately. Driving with low oil pressure will destroy the engine within minutes.', urgency: 'critical', diy: true },
      { title: 'Have it diagnosed before driving further', description: 'Engine knocking from bearings is a rapidly progressing failure. A mechanic can do an oil pressure test and listen with a stethoscope to pinpoint the source.', urgency: 'high', diy: false },
    ],
    estimatedCost: 'Oil change: $40–$100 | Lifter/valve service: $200–$600 | Rod bearing: $500–$1500 | Engine rebuild: $2000–$6000',
    shouldSeeShop: true,
    urgencyLevel: 'high',
    disclaimer: 'A deep engine knock under load is a pre-failure warning. Stop driving and have it inspected.',
  },

  fuel_economy: {
    summary: 'Sudden drops in fuel economy are usually caused by dirty sensors, a tune-up need, or tires — not a major engine problem.',
    possibleCauses: [
      'Dirty or faulty O2 sensor',
      'Dirty mass airflow (MAF) sensor',
      'Clogged air filter',
      'Dirty fuel injectors',
      'Under-inflated tires',
      'Spark plugs due for replacement',
      'Thermostat stuck open (engine runs cold)',
    ],
    steps: [
      { title: 'Check tire pressure', description: 'Under-inflated tires can reduce MPG by 0.2% per 1 PSI below spec. Inflate all four to the door jamb spec. Simple and free.', urgency: 'low', diy: true },
      { title: 'Replace the air filter', description: 'A clogged engine air filter restricts airflow and tanks MPG. Check it by holding it up to light — if you can\'t see through it, replace it ($15–$30 DIY).', urgency: 'low', diy: true },
      { title: 'Check for a Check Engine Light', description: 'A pending or active CEL from an O2 sensor or MAF sensor can cause rich running (too much fuel). Scan for codes even if the light isn\'t on yet.', urgency: 'medium', diy: true },
      { title: 'Clean the MAF sensor', description: 'A dirty MAF sensor is a common cause of poor economy. Use dedicated MAF cleaner spray ($10) — do NOT use standard carb cleaner. Takes 15 minutes.', urgency: 'low', diy: true },
      { title: 'Schedule a tune-up', description: 'Spark plugs, fuel filter, and PCV valve all affect efficiency. If it\'s been over 60,000 miles, a tune-up often restores lost MPG.', urgency: 'medium', diy: true },
      { title: 'Check coolant temperature sensor', description: 'If the engine takes forever to warm up or the temp gauge reads low, a stuck-open thermostat keeps the engine cold and burns extra fuel.', urgency: 'medium', diy: false },
    ],
    estimatedCost: 'Air filter: $15–$30 | Spark plugs: $30–$120 | O2 sensor: $150–$400 | MAF sensor: $100–$300 | Tune-up: $150–$400',
    shouldSeeShop: false,
    urgencyLevel: 'low',
    disclaimer: 'A sudden severe drop (>20%) in fuel economy warrants a professional scan for sensor faults.',
  },

  oil: {
    summary: 'Oil leaks and oil-related issues should be addressed promptly — oil is your engine\'s lifeblood.',
    possibleCauses: [
      'Worn valve cover gasket',
      'Oil pan gasket leak',
      'Rear main seal leak',
      'Loose or damaged drain plug',
      'Failed oil filter',
      'PCV valve clogging (causes pressure buildup)',
      'Crankshaft front seal',
    ],
    steps: [
      { title: 'Identify the color and location of the leak', description: 'Fresh oil is amber/brown; old oil is black. Locate where it drips from using a clean cardboard sheet overnight. Front of engine = front seal. Rear = main seal. Top = valve cover.', urgency: 'medium', diy: true },
      { title: 'Check oil level frequently', description: 'Until the leak is fixed, check the dipstick every few days. Never let it drop below the MIN mark — running low on oil causes bearing and engine damage.', urgency: 'high', diy: true },
      { title: 'Check the valve cover gasket', description: 'This is the most common leak. It\'s the rubber seal on top of the engine. If you see oil streaks running down the side of the engine, the gasket is likely cracked or brittle.', urgency: 'medium', diy: true },
      { title: 'Tighten or replace the drain plug', description: 'After an oil change, an overtightened or cross-threaded drain plug can strip the oil pan. A loose one will drip. Inspect it first.', urgency: 'medium', diy: true },
      { title: 'Have a rear main seal inspected', description: 'A large oil patch directly under the middle of the car is often the rear main seal — a bigger job ($300–$800) but necessary if severe.', urgency: 'high', diy: false },
    ],
    estimatedCost: 'Valve cover gasket: $100–$350 | Oil pan gasket: $200–$500 | Rear main seal: $300–$800 | Oil change: $40–$100',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'An engine that runs low on oil can fail catastrophically. Monitor and top up until repaired.',
  },

  tire: {
    summary: 'Tire issues directly affect safety, fuel economy, and handling. Most are quick and inexpensive to address.',
    possibleCauses: [
      'Under or over-inflated tires',
      'Flat tire or slow leak',
      'Worn tread (below 2/32")',
      'TPMS sensor fault',
      'Wheel balance issue',
      'Uneven wear from alignment',
      'Damaged sidewall or bubble',
    ],
    steps: [
      { title: 'Check all tire pressures', description: 'Use a tire gauge — the recommended PSI is on the door jamb sticker (not on the tire itself). Check cold (before driving 1 mile).', urgency: 'low', diy: true },
      { title: 'Inspect tread depth', description: 'Use the penny test: insert a penny into the tread with Lincoln\'s head facing down. If you can see all of Lincoln\'s head, tires need replacing.', urgency: 'high', diy: true },
      { title: 'Look for bulges or sidewall damage', description: 'A bubble or bulge in the sidewall means the internal structure is broken — the tire can blow out at any moment. Replace immediately.', urgency: 'critical', diy: true },
      { title: 'Reset or replace the TPMS sensor', description: 'If the TPMS light stays on after inflating tires, try driving above 25 mph for 10 minutes to reset. A faulty sensor needs shop replacement ($50–$150).', urgency: 'low', diy: true },
      { title: 'Get wheels balanced', description: 'Vibration at highway speed (usually 55–70 mph) is typically a wheel balance issue. $15–$25 per wheel at any tire shop.', urgency: 'medium', diy: false },
      { title: 'Rotate tires every 5,000–7,500 miles', description: 'Regular rotation prevents uneven wear and extends tire life. Many shops include it free with oil changes.', urgency: 'low', diy: false },
    ],
    estimatedCost: 'Tire rotation: $20–$60 | Balance: $60–$100 | TPMS sensor: $50–$150 | New tire: $80–$300 each | Full set: $350–$1200',
    shouldSeeShop: false,
    urgencyLevel: 'medium',
    disclaimer: 'A tire with a sidewall bubble should not be driven on — it can blow out without warning.',
  },

  exhaust: {
    summary: 'Exhaust issues can affect performance, emissions, and safety. Blue, black, or white smoke each point to different problems.',
    possibleCauses: [
      'Blue smoke: burning oil (worn rings, valve seals)',
      'White smoke: burning coolant (head gasket)',
      'Black smoke: running rich (fuel/sensor issue)',
      'Exhaust smell in cabin: leak before the muffler',
      'Rattling: loose heat shield or muffler',
      'Catalytic converter failure',
      'Cracked exhaust manifold',
    ],
    steps: [
      { title: 'Identify the smoke color', description: 'Blue/gray smoke on startup or acceleration = burning oil. White steam when cold is normal. Persistent white smoke = coolant leak (head gasket). Black smoke = excess fuel.', urgency: 'high', diy: true },
      { title: 'Check for exhaust smell inside the cabin', description: 'Carbon monoxide is odorless but exhaust smell in the cabin is a warning. Roll down windows and have it inspected immediately — CO poisoning is life-threatening.', urgency: 'critical', diy: true },
      { title: 'Check oil and coolant levels', description: 'If blue smoke and oil is low = burning oil. If white smoke and coolant is low = head gasket suspect. Get a combustion leak test done.', urgency: 'high', diy: true },
      { title: 'Listen for rattle under the car', description: 'A rattle from underneath, especially at idle or on acceleration, is usually a loose heat shield (cheap fix) or broken muffler hanger.', urgency: 'low', diy: true },
      { title: 'Have catalytic converter inspected', description: 'If you fail emissions or smell sulfur/rotten egg odor, the catalytic converter may be failing. OBD codes P0420/P0430 confirm this.', urgency: 'medium', diy: false },
    ],
    estimatedCost: 'Heat shield repair: $50–$150 | Muffler: $150–$400 | Cat converter: $500–$2500 | Exhaust manifold: $200–$600',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'Exhaust fumes inside the cabin are a medical emergency. Do not drive the vehicle.',
  },

  general: {
    summary: 'Based on your description, here are the most common general diagnostic steps to help identify the issue.',
    possibleCauses: [
      'Sensor or diagnostic trouble code (DTC)',
      'Fluid level issue (oil, coolant, brake, transmission)',
      'Worn component due for maintenance',
      'Electrical or fuse issue',
      'Mechanical wear',
    ],
    steps: [
      { title: 'Scan for fault codes', description: 'An OBD-II scanner ($25–$80, or free at AutoZone/O\'Reilly) is the fastest way to identify what\'s wrong. Even without warning lights, codes may be stored.', urgency: 'medium', diy: true },
      { title: 'Check all fluid levels', description: 'Engine oil, coolant, brake fluid, transmission fluid, and power steering fluid. Low fluid in any system can cause symptoms ranging from noise to performance issues.', urgency: 'medium', diy: true },
      { title: 'Note exactly when it happens', description: 'At startup? Under acceleration? Turning? Braking? Over bumps? The pattern is the most important clue — write it down to tell your mechanic.', urgency: 'low', diy: true },
      { title: 'Check for recent maintenance overdue', description: 'Air filter, spark plugs, belts, and tires all have service intervals. If maintenance is overdue, start there — it\'s the cheapest fix.', urgency: 'low', diy: true },
      { title: 'Consider recent changes', description: 'Did symptoms start after fueling up, a temperature change, or a recent repair? New problems after service can mean a loose connection or part.', urgency: 'low', diy: true },
      { title: 'Get a professional inspection', description: 'If the issue persists or you\'re unsure, a diagnostic inspection ($80–$150) at a reputable shop is worth it to get an accurate answer.', urgency: 'medium', diy: false },
    ],
    estimatedCost: 'OBD scan: Free–$80 | Diagnostic inspection: $80–$150 | Basic maintenance: $50–$300',
    shouldSeeShop: true,
    urgencyLevel: 'medium',
    disclaimer: 'When in doubt, a professional inspection is always the safest choice.',
  },
}

export function getDiagnosticResult(problem: string, make: string, model: string, year: string): DiagnosticResult {
  const category = detectCategory(problem)
  const result = { ...DIAGNOSTICS[category] }
  // Personalize the summary with the vehicle
  if (make && model && year) {
    result.summary = `For your ${year} ${make} ${model}: ${result.summary}`
  }
  return result
}
