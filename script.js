/* ================================================================
   Zenith Aim — script.js  v2
   Real scenario DB · 3D Warmup Games (Three.js) ·
   Dual-dropdown Sens + FOV converters · Routine Engine
   ================================================================ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   REAL SCENARIO DATABASE  v3
   ─────────────────────────────────────────────────────────────
   AIMLABS:  Voltaic S3 benchmark names (VT ... S3) + classic
             built-in Aimlabs tasks. Search by exact name in-app.
             S3 sources: aimlab-stats.com, voltaic S2 Steam WS
             (S3 appends difficulty level to name).

   KOVAAK'S: Voltaic S5 benchmark names (VT ... S5) + classic
             community scenarios. Search by exact name in-app.
             S5 sources: blog.voltaic.gg KovaaK's S5 post.
   ═══════════════════════════════════════════════════════════════ */
const SCENARIO_DB = {
  aimlabs: {
    tracking: [
      /* BEGINNER */
      { name: 'VT Verttrack Novice S3',      difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Vertical movement tracking. Engage elbow slightly — pure wrist will tire fast.' },
      { name: 'VT Shifttrack Novice S3',     difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Small positional shifts. Resist micro-corrections — stay locked through each shift.' },
      { name: 'VT Jettrack Novice S3',       difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Burst-style tracking. Pre-aim direction, smooth out — never chase the burst.' },
      { name: 'VT Quaketrack Novice S3',     difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Erratic reactive movement. Keep your hand loose — tension causes lag.' },
      { name: 'VT Controltrack Novice S3',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Deliberate control tracking. Smoothness over speed — breathe through corrections.' },
      { name: 'VT Steadytrack Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Continuous steady motion. No twitching — fluid stroke the entire run.' },
      /* INTERMEDIATE */
      { name: 'VT Verttrack Intermediate S3',     difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Vertical tracking steps up. Full arm engagement now — wrist alone breaks down.' },
      { name: 'VT Shifttrack Intermediate S3',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster shifts with more variance. Crosshair slightly ahead of where target will be.' },
      { name: 'VT Jettrack Intermediate S3',      difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Quicker bursts. Anticipate direction — lagging behind means the burst is already over.' },
      { name: 'VT Quaketrack Intermediate S3',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster chaos. Let your grip soften — tension = constant lag behind the target.' },
      { name: 'VT Controltrack Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'This punishes over-correction harder than under. Breathe, commit, stay steady.' },
      { name: 'VT Steadytrack Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Maintain fluid stroke at higher speed. Hesitation shows up clearly here.' },
      /* ADVANCED */
      { name: 'VT Verttrack Advanced S3',    difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Full vertical at elite speed. Demand full arm engagement and a relaxed grip.' },
      { name: 'VT Shifttrack Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Maximum shift variance. Position crosshair slightly ahead of where the target will land.' },
      { name: 'VT Jettrack Advanced S3',     difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Lightning burst tracking. Anticipation is the only skill that works here — reaction is too slow.' },
      { name: 'VT Quaketrack Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite reactive chaos. Top-tier arm control required — stay loose, stay fast.' },
      { name: 'VT Controltrack Advanced S3', difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Precision over speed. Micro-corrections must be completely invisible at this level.' },
      { name: 'VT Steadytrack Advanced S3',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite control tracking. No overcorrection — breathe through it, tense arms fail here.' },
    ],
    flicking: [
      /* BEGINNER */
      { name: 'VT Angleshot Novice S3',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Diagonal-moving targets. Read the trajectory before clicking — predict, not react.' },
      { name: 'VT Popshot Novice S3',     difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Pop-up dynamic targets. Eyes lead the flick — the click is decided before you move.' },
      { name: 'VT Quadshot Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Four medium targets. Clean direct flicks — accuracy unlocks speed, not the other way.' },
      { name: 'VT Wideshot Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Wide spawn range. Start using arm movement for distant targets — don\'t strain the wrist.' },
      { name: 'VT Frogshot Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Linear moving targets. Smooth acceleration into each click — no abrupt jerks.' },
      { name: 'VT Floatshot Novice S3',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Floating arc targets. Micro-adjust mastery starts here — overshooting = missed click.' },
      /* INTERMEDIATE */
      { name: 'VT Angleshot Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster angles. Commit immediately — hesitation at this speed means a miss.' },
      { name: 'VT Popshot Intermediate S3',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Quicker pop-ups. Visual lead increases in importance — hand follows eyes.' },
      { name: 'VT Quadshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster four-target flicks. Direct line to each target — eliminate curved approach paths.' },
      { name: 'VT Wideshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Wider spawns at pace. Full arm mechanics for far targets — wrist only for close ones.' },
      { name: 'VT Frogshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster linear movement. Smooth deceleration into the click — no hard stops.' },
      { name: 'VT Floatshot Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Floating targets at pace. Adjust before the click window closes — no second chances.' },
      /* ADVANCED */
      { name: 'VT Angleshot Advanced S3',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite dynamic clicking. Zero hesitation — commit every flick and own the miss.' },
      { name: 'VT Popshot Advanced S3',    difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Maximum reaction clicking. Eyes lead, hand follows — the click is already decided.' },
      { name: 'VT Quadshot Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Four tight targets at elite pace. Any spray is a failed run at this level.' },
      { name: 'VT Wideshot Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Full arm mechanics demanded. No wrist compensation for wide targets.' },
      { name: 'VT Frogshot Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Fast linear at elite speed. Smooth acceleration into each target — no abrupt jerks.' },
      { name: 'VT Floatshot Advanced S3',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Floating targets at max pace. Overshooting at this level costs the entire run.' },
    ],
    switching: [
      /* BEGINNER */
      { name: 'VT Pokeswitch Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Build decisiveness — the moment you see the next target, go. No hesitation.' },
      { name: 'VT Temposwitch Novice S3',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Find a rhythm — consistent tempo beats bursts of speed followed by pauses.' },
      { name: 'VT Boltswitch Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Dashing targets. Acquire immediately on spawn — pre-aim common spawn areas.' },
      { name: 'VT Dartswitch Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Darting movement. Read trajectory on spawn — chasing from behind always fails.' },
      { name: 'VT Smoothswitch Novice S3',  difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Controlled arc between each target. Find rhythm — don\'t rush, precision first.' },
      { name: 'VT Leapswitch Novice S3',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Leaping targets. Smooth controlled flicks — stability over raw switch speed.' },
      /* INTERMEDIATE */
      { name: 'VT Pokeswitch Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster poke pace. Decisiveness is the only skill — see target, move immediately.' },
      { name: 'VT Temposwitch Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Maintain momentum — find a rhythm and never pause between switches.' },
      { name: 'VT Boltswitch Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster bolts. Immediate acquisition — any delay and the target is already past you.' },
      { name: 'VT Dartswitch Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Fast darters. Acquire the trajectory early — eyes lead the flick.' },
      { name: 'VT Smoothswitch Intermediate S3', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Smooth precise switching. Controlled arc between targets — zero wasted motion.' },
      { name: 'VT Leapswitch Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Leaping targets at pace. Smooth, controlled flicks over raw speed.' },
      /* ADVANCED */
      { name: 'VT Pokeswitch Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Maximum-speed poke switching. Instant commitment — no second-guessing any target.' },
      { name: 'VT Temposwitch Advanced S3',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite speed switching. Dead time between targets = lost score. Stay in constant motion.' },
      { name: 'VT Boltswitch Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite evasive switching. Targets dash fast — immediate acquisition, zero hesitation.' },
      { name: 'VT Dartswitch Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Advanced darters. Read trajectory on spawn — chasing from behind is a failed switch.' },
      { name: 'VT Smoothswitch Advanced S3', difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite stability switching. Invisible micro-corrections and perfect arc transitions.' },
      { name: 'VT Leapswitch Advanced S3',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Advanced stability. Precision over raw speed — smooth flicks only, no slamming.' },
    ],
  },

  kovaaks: {
    tracking: [
      /* BEGINNER */
      { name: 'VT Verttrack Novice S5',       difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Vertical strafes on KovaaK\'s. Engage elbow — wrist alone breaks down fast.' },
      { name: 'VT Shifttrack Novice S5',      difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Positional shifts. Read the next shift before it happens — stay slightly ahead.' },
      { name: 'VT Jettrack Novice S5',        difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Burst tracking. Pre-aim direction — chasing the burst from behind always fails.' },
      { name: 'VT Quaketrack Novice S5',      difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Erratic movement. Keep your grip loose — tension causes constant lag.' },
      { name: 'VT Controltrack Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Deliberate control pace. Smooth stroke — over-correction is punished here.' },
      { name: 'VT Steadytrack Novice S5',     difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Continuous motion. Build the habit of staying locked — no drops in contact.' },
      /* INTERMEDIATE */
      { name: 'VT Verttrack Intermediate S5',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Vertical tracking increases pace. Full arm engagement required now.' },
      { name: 'VT Shifttrack Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'More shift variance. Crosshair slightly ahead of predicted position each time.' },
      { name: 'VT Jettrack Intermediate S5',     difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Quicker bursts. Anticipation beats reaction at this speed — be early.' },
      { name: 'VT Quaketrack Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster chaos. Stay relaxed — tense grip = constant lag behind target.' },
      { name: 'VT Controltrack Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Steady but faster. Over-correction shows clearly — commit and hold.' },
      { name: 'VT Steadytrack Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Fluid stroke at higher speeds. Any hesitation is immediately visible.' },
      /* ADVANCED */
      { name: 'VT Verttrack Advanced S5',    difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite vertical tracking. Relaxed grip + full arm — no other way through this.' },
      { name: 'VT Shifttrack Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Maximum shift variance. Pre-aim each shift landing zone — reaction alone is too slow.' },
      { name: 'VT Jettrack Advanced S5',     difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite burst tracking. Anticipation is everything — reaction cannot keep up.' },
      { name: 'VT Quaketrack Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite reactive chaos. Loose grip, arm-led — the only way to survive this.' },
      { name: 'VT Controltrack Advanced S5', difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Precision at elite pace. Micro-corrections must be completely invisible.' },
      { name: 'VT Steadytrack Advanced S5',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'No overcorrection allowed. Breathe, commit, maintain contact the entire run.' },
    ],
    flicking: [
      /* BEGINNER */
      { name: 'VT Angleshot Novice S5',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Diagonal targets. Read trajectory first — predict, then click.' },
      { name: 'VT Popshot Novice S5',     difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Pop-up targets. Eyes lead hand — flick decision is made before you move.' },
      { name: 'VT Quadshot Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Four targets. Accuracy first — clean flicks build speed naturally.' },
      { name: 'VT Wideshot Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Wide spawn range. Begin using arm for distant targets — wrist only for close.' },
      { name: 'VT Frogshot Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Linear movement. Smooth acceleration — abrupt jerks break the flow.' },
      { name: 'VT Floatshot Novice S5',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Arc targets. Micro-adjust before clicking — overshooting costs every time.' },
      /* INTERMEDIATE */
      { name: 'VT Angleshot Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster angles. Commit immediately — any hesitation at this speed means a miss.' },
      { name: 'VT Popshot Intermediate S5',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Quicker pops. Visual lead is crucial — hand must follow eyes.' },
      { name: 'VT Quadshot Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster four-target pace. Direct line to each target — no curved paths.' },
      { name: 'VT Wideshot Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Wider spawns at pace. Full arm for far targets — never drag wrist across full range.' },
      { name: 'VT Frogshot Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster linear. Smooth deceleration into the click — no hard stops.' },
      { name: 'VT Floatshot Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Floating at pace. Adjust before the window closes — second chances are rare here.' },
      /* ADVANCED */
      { name: 'VT Angleshot Advanced S5',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite dynamic clicking. No hesitation — commit every flick and own the miss.' },
      { name: 'VT Popshot Advanced S5',    difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Max reaction clicking. Eyes lead, hand follows — decision already made before movement.' },
      { name: 'VT Quadshot Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Four tight targets elite pace. Any spray is a failed run — pure precision.' },
      { name: 'VT Wideshot Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Full arm mechanics required. No wrist compensation for wide-range targets.' },
      { name: 'VT Frogshot Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Fast linear at elite speed. Smooth acceleration into each click — no abrupt jerks.' },
      { name: 'VT Floatshot Advanced S5',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Floating at max pace. Any overshoot at this level costs the entire run.' },
    ],
    switching: [
      /* BEGINNER */
      { name: 'VT Pokeswitch Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'See target, go immediately. Decisiveness is the entire skill here.' },
      { name: 'VT Temposwitch Novice S5',   difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Consistent rhythm beats bursts of speed. Find a tempo and hold it.' },
      { name: 'VT Boltswitch Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Dashing targets. Acquire immediately on spawn — pre-aim common areas.' },
      { name: 'VT Dartswitch Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Darting targets. Read trajectory on spawn — chasing from behind always fails.' },
      { name: 'VT Smoothswitch Novice S5',  difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Controlled arc between each switch. Find rhythm — no rushing.' },
      { name: 'VT Leapswitch Novice S5',    difficulty: ['beginner'],     duration: 5, sets: 3, tip: 'Leaping targets. Smooth controlled flicks — stability first, speed follows.' },
      /* INTERMEDIATE */
      { name: 'VT Pokeswitch Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster poke pace. See target, move — no thought between the two.' },
      { name: 'VT Temposwitch Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Maintain momentum — never pause between targets. Rhythm is king.' },
      { name: 'VT Boltswitch Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster bolts. Immediate acquisition — any delay and the target is gone.' },
      { name: 'VT Dartswitch Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Fast darters. Eyes lead the flick — trajectory read before hand starts moving.' },
      { name: 'VT Smoothswitch Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Smooth arcs at pace. Zero wasted motion between targets.' },
      { name: 'VT Leapswitch Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Leaping at pace. Smooth controlled switches — no slamming into targets.' },
      /* ADVANCED */
      { name: 'VT Pokeswitch Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Maximum-speed poking. Instant commitment — no second-guessing any target.' },
      { name: 'VT Temposwitch Advanced S5',  difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite speed switching. Any dead time between targets = lost score. Keep moving.' },
      { name: 'VT Boltswitch Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite evasive switching. Targets dash fast — zero hesitation allowed.' },
      { name: 'VT Dartswitch Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Advanced darters. Chasing from behind is always a failed switch at this speed.' },
      { name: 'VT Smoothswitch Advanced S5', difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Elite stability. Perfect arc transitions — micro-corrections must be invisible.' },
      { name: 'VT Leapswitch Advanced S5',   difficulty: ['advanced'],     duration: 5, sets: 5, tip: 'Advanced stability switching. Precision over raw speed — smooth flicks only.' },
    ],
  },
}
/* ═══════════════════════════════════════════════════════════════
   SENSITIVITY GAME CONSTANTS
   ─────────────────────────────────────────────────────────────
   yaw = degrees per mouse count at DPI=1, sens=1.0
   Formula:
     cm/360 = 914.4 / (fromDPI × yaw × effectiveSens)
     toSens = (fromDPI × fromYaw × effectiveSens) / (toDPI × toYaw)

   YAW VALUES — derived from verified ground truth:
     Roblox 0.06415 @ 800 DPI = 47.51 cm/360
       → robloxYaw = 914.4 / (800 × 47.51 × 0.06415) = 0.37503
     Aimlabs 0.48116 @ 800 DPI = 47.51 cm/360
       → aimlabsYaw = 0.05 (confirmed)
     KovaaK's: Quake/Source m_yaw = 0.022

   RIVALS TWO-TIER:
     effectiveSens = CameraSens × RivalsInGameSlider
     Slider = 1.0 (default) → Rivals ≡ Arsenal
   ═══════════════════════════════════════════════════════════════ */
const SENS_DB = {
  rivals:   { label: 'Roblox Rivals',  yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: true,  sensScale: 0.01 },
  arsenal:  { label: 'Roblox Arsenal', yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: false, sensScale: 1    },
  aimlabs:  { label: 'Aimlabs',        yaw: 0.05,    sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
  kovaaks:  { label: "Kovaak\'s",     yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
  valorant: { label: 'Valorant',       yaw: 0.07,    sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
};

/* ═══════════════════════════════════════════════════════════════
   FOV GAME CONSTANTS
   ─────────────────────────────────────────────────────────────
   Rivals uses a non-standard internal aspect of ~1.464352
   (NOT the standard 16/9 = 1.7778).

   VERIFIED by user ground truth:
     Rivals  103 VFOV → Arsenal  92 VFOV  ✓  (with aspect 1.464352)
     Arsenal  70 VFOV → HFOV 102.447858   ✓
     Rivals   80 VFOV → Arsenal ~69.3°    ✓  (matches Arsenal default 70)

   type 'vertical'   = game FOV setting is Vertical FOV
   type 'horizontal' = game FOV setting is Horizontal FOV
   aspect: internal aspect ratio used to convert VFOV↔HFOV for that game
   ═══════════════════════════════════════════════════════════════ */
const FOV_DB = {
  rivals:  { label: 'Roblox Rivals',  type: 'vertical',   default: 80,  range: [30, 120], aspect: 1.464352 },
  arsenal: { label: 'Roblox Arsenal', type: 'vertical',   default: 70,  range: [30, 120], aspect: 16/9     },
  aimlabs: { label: 'Aimlabs',        type: 'vertical',   default: 70,  range: [1,  150], aspect: 16/9     },
  kovaaks: { label: "Kovaak's",       type: 'horizontal', default: 103, range: [60, 150], aspect: 16/9     },
};

/* ═══════════════════════════════════════════════════════════════
   APP STATE
   ═══════════════════════════════════════════════════════════════ */
const state = {
  trainer: 'aimlabs',
  rank: 'beginner',
  priorities: { tracking: 33, flicking: 34, switching: 33 },
  _playlist: [],
};

/* ═══════════════════════════════════════════════════════════════
   ROUTINE GENERATOR
   Always outputs exactly 9 tasks. If a category has fewer unique
   scenarios than its slot count, tasks repeat (shuffled each time
   so the order still feels fresh).
   ═══════════════════════════════════════════════════════════════ */
function generateRoutine() {
  const { trainer, rank, priorities } = state;
  const db    = SCENARIO_DB[trainer];
  const TOTAL = 9;
  const total = priorities.tracking + priorities.flicking + priorities.switching || 1;

  // Proportional slot counts
  const raw = {
    tracking:  (priorities.tracking  / total) * TOTAL,
    flicking:  (priorities.flicking  / total) * TOTAL,
    switching: (priorities.switching / total) * TOTAL,
  };
  const slots = {
    tracking:  Math.floor(raw.tracking),
    flicking:  Math.floor(raw.flicking),
    switching: Math.floor(raw.switching),
  };

  // Give remainder slots to categories that lost the most to flooring
  let rem = TOTAL - (slots.tracking + slots.flicking + slots.switching);
  ['tracking','flicking','switching']
    .sort((a,b) => (raw[b] - slots[b]) - (raw[a] - slots[a]))
    .forEach((k,i) => { if (i < rem) slots[k]++; });

  // Ensure every non-zero priority category gets at least 1 slot
  ['tracking','flicking','switching'].forEach(t => {
    if (priorities[t] > 0 && slots[t] === 0) {
      const big = Object.keys(slots).reduce((a,b) => slots[a] > slots[b] ? a : b);
      if (slots[big] > 1) { slots[big]--; slots[t]++; }
    }
  });

  // Build playlist — repeat tasks cyclically if pool smaller than slots needed
  const playlist = [];
  for (const type of ['tracking','flicking','switching']) {
    const pool = db[type].filter(s => s.difficulty.includes(rank));
    if (!pool.length || slots[type] === 0) continue;

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < slots[type]; i++) {
      // wrap around with modulo so we never run out of tasks
      playlist.push({ ...shuffled[i % shuffled.length], type });
    }
  }

  return playlist.sort(() => Math.random() - 0.5);
}

/* ═══════════════════════════════════════════════════════════════
   RENDER PLAYLIST
   ═══════════════════════════════════════════════════════════════ */
function renderPlaylist() {
  const playlist = generateRoutine();
  state._playlist = playlist;
  const grid = document.getElementById('taskGrid');
  const trainerLabel = state.trainer === 'aimlabs' ? 'Aimlabs' : "Kovaak's";
  const rankLabel = state.rank.charAt(0).toUpperCase() + state.rank.slice(1);
  const totalMins = playlist.reduce((s,t) => s + t.duration * t.sets, 0);
  const _pmEl = document.getElementById('playlistMeta');
  const _ttEl = document.getElementById('totalTasks');
  const _etEl = document.getElementById('estTime');
  const _nsEl = document.getElementById('navStatus');
  if (_pmEl) _pmEl.textContent = `${trainerLabel} · ${rankLabel} · ${playlist.length} tasks`;
  if (_ttEl) _ttEl.textContent = playlist.length;
  if (_etEl) _etEl.textContent = `${totalMins}m`;
  if (_nsEl) _nsEl.textContent = `${trainerLabel} · ${rankLabel}`;
  const _subEl = document.getElementById('playlistSubtitle');
  if (_subEl) _subEl.textContent = `${trainerLabel} · ${rankLabel} · ~${totalMins} min total`;

  const LABELS = { tracking:'Tracking', flicking:'Flicking', switching:'Switching' };

  grid.innerHTML = '';
  playlist.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = `task-card ${s.type}`;
    card.style.animationDelay = `${i * 0.055}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="card-name">${s.name}</div>
        <div class="card-type">${LABELS[s.type]}</div>
      </div>
      <div class="card-info">
        <div class="card-tip">${s.tip}</div>
        <div class="card-meta-row">
          <span class="card-dur">${s.duration} min</span>
          <span class="card-sets">${s.sets}× sets</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — sessionStorage routing (no # in URL)
   ═══════════════════════════════════════════════════════════════ */
function parsePath() {
  const valid = ['routines','converters','warmup'];
  // Read section set by the folder index.html or landing page
  const stored = sessionStorage.getItem('aimrivals_section');
  if (stored && valid.includes(stored)) {
    sessionStorage.removeItem('aimrivals_section');
    return stored;
  }
  // Also detect from URL path directly (e.g. /routines/)
  const slug = location.pathname.replace(/\/+$/, '').split('/').pop();
  if (valid.includes(slug)) return slug;
  return 'routines';
}

let _currentSection = null;

function showSection(target, fromPopState) {
  const valid = ['routines','converters','warmup'];
  if (!valid.includes(target)) target = 'routines';

  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === target));
  document.querySelectorAll('.section').forEach(s  => s.classList.toggle('active', s.id === target));

  if (target === 'warmup') setTimeout(() => Warmup3D.resize(), 60);

  const repoBase = window.location.origin + '/AimRivals-Upgraded';
  const url = repoBase + '/' + target + '/';

  if (fromPopState) {
    // Browser already changed URL — just sync state
    history.replaceState({ section: target }, '', url);
  } else if (_currentSection === null) {
    // First load — replace so back button goes to previous site, not duplicate
    history.replaceState({ section: target }, '', url);
  } else if (target !== _currentSection) {
    // Tab clicked — push so back button returns to previous tab
    history.pushState({ section: target }, '', url);
  }

  _currentSection = target;
  const titles = { routines:'Routines', converters:'Converters', warmup:'Warmup' };
  document.title = 'Zenith Aim — ' + titles[target];
}

function initNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  window.addEventListener('popstate', e => {
    const section = e.state?.section || location.pathname.replace(/\/+$/, '').split('/').pop();
    const valid   = ['routines', 'converters', 'warmup'];
    showSection(valid.includes(section) ? section : 'routines', true);
  });

  showSection(parsePath());
}

function initTrainerToggle() {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trainer = btn.dataset.trainer;
      renderPlaylist();
    });
  });
}

function initRankSelector() {
  document.querySelectorAll('.rank-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rank-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.rank = btn.dataset.rank;
      renderPlaylist();
    });
  });
}

function initSliders() {
  const sliders  = { tracking: document.getElementById('trackingSlider'), flicking: document.getElementById('flickingSlider'), switching: document.getElementById('switchingSlider') };
  const displays = { tracking: document.getElementById('trackingVal'),    flicking: document.getElementById('flickingVal'),    switching: document.getElementById('switchingVal')    };
  const COLORS   = { tracking: '#f0c800', flicking: '#4a7fff', switching: '#c040ff' };

  function fill(slider, type) {
    slider.style.background = `linear-gradient(to right,${COLORS[type]} ${slider.value}%,rgba(255,255,255,0.07) ${slider.value}%)`;
  }
  Object.keys(sliders).forEach(t => fill(sliders[t], t));

  Object.keys(sliders).forEach(changed => {
    sliders[changed].addEventListener('input', () => {
      const newVal = parseInt(sliders[changed].value, 10);
      const others = Object.keys(sliders).filter(k => k !== changed);
      const otherTotal = others.reduce((s,k) => s + parseInt(sliders[k].value,10), 0);
      const remaining = 100 - newVal;
      if (otherTotal > 0) {
        others.forEach(k => { sliders[k].value = Math.max(0, Math.round(remaining * (parseInt(sliders[k].value,10)/otherTotal))); });
        let sum = newVal + others.reduce((s,k)=>s+parseInt(sliders[k].value,10),0);
        const diff = 100 - sum;
        if (diff !== 0) { const t = others.reduce((a,b)=>parseInt(sliders[a].value,10)>parseInt(sliders[b].value,10)?a:b); sliders[t].value = Math.max(0, parseInt(sliders[t].value,10)+diff); }
      } else {
        const half = Math.floor(remaining/2);
        sliders[others[0]].value = half;
        sliders[others[1]].value = remaining - half;
      }
      Object.keys(sliders).forEach(k => { state.priorities[k] = parseInt(sliders[k].value,10); displays[k].textContent=`${sliders[k].value}%`; fill(sliders[k],k); });
      renderPlaylist();
    });
  });
}

function initCopyPlaylist() {
  document.getElementById('copyPlaylist').addEventListener('click', () => {
    if (!state._playlist.length) return;
    const trainerLabel = state.trainer==='aimlabs'?'Aimlabs':"Kovaak's";
    const rankLabel    = state.rank.charAt(0).toUpperCase()+state.rank.slice(1);
    const ICONS = { tracking:'🎯', flicking:'⚡', switching:'🔀' };
    let text = `⚔ Zenith Aim — ${trainerLabel} · ${rankLabel}\n`;
    text += `${'─'.repeat(28)}\n`;
    state._playlist.forEach((s,i) => { text += `${i+1}. ${ICONS[s.type]} ${s.name} · ${s.sets}×${s.duration}min\n`; });
    text += `${'─'.repeat(28)}\nGenerated by Zenith Aim`;
    navigator.clipboard.writeText(text).then(()=>showToast('📋 Playlist copied!')).catch(()=>showToast('❌ Copy failed'));
  });
}

function initShare() {
  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;
  shareBtn.addEventListener('click', () => {
    const p = new URLSearchParams({ t:state.trainer, r:state.rank, tr:state.priorities.tracking, fl:state.priorities.flicking, sw:state.priorities.switching });
    const url = `${location.origin}${location.pathname}?${p}${location.hash}`;
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Config link copied!')).catch(()=>showToast('❌ Copy failed'));
  });
}

function loadFromURL() {
  const p = new URLSearchParams(location.search);
  if (p.has('t') && ['aimlabs','kovaaks'].includes(p.get('t'))) {
    state.trainer = p.get('t');
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.trainer===state.trainer));
  }
  if (p.has('r') && ['beginner','intermediate','advanced'].includes(p.get('r'))) {
    state.rank = p.get('r');
    document.querySelectorAll('.rank-btn').forEach(b => b.classList.toggle('active', b.dataset.rank===state.rank));
  }
  [['tr','tracking','trackingSlider','trackingVal'],['fl','flicking','flickingSlider','flickingVal'],['sw','switching','switchingSlider','switchingVal']].forEach(([param,key,sliderId,valId]) => {
    if (p.has(param)) { const v=Math.min(100,Math.max(0,parseInt(p.get(param),10))); state.priorities[key]=v; document.getElementById(sliderId).value=v; document.getElementById(valId).textContent=`${v}%`; }
  });
}

/* ═══════════════════════════════════════════════════════════════
   SENSITIVITY CONVERTER — live, single DPI
   ─────────────────────────────────────────────────────────────
   cm/360 = 914.4 / (DPI × fromYaw × effectiveSens)
   toSens = 914.4 / (DPI × toYaw   × cm/360)
          = (fromYaw × effectiveSens) / toYaw   [DPI cancels]

   Higher DPI → higher eDPI → same physical feel → lower sens number.
   e.g. Roblox 0.06415 @ 800 DPI = Aimlabs 0.48116 @ 800 DPI
        Roblox 0.06415 @ 800 DPI = Aimlabs 0.24058 @ 1600 DPI
   The DPI field controls the target DPI. Change it to see what
   sensitivity gives the same feel at a different DPI.
   ═══════════════════════════════════════════════════════════════ */
function initSensConverter() {
  const fromEl     = document.getElementById('sensFrom');
  const toEl       = document.getElementById('sensTo');
  const sensEl     = document.getElementById('rivalsSens');
  const dpiFromEl  = document.getElementById('mouseDPIFrom');
  const dpiToEl    = document.getElementById('mouseDPITo');
  const lockBtn    = document.getElementById('dpiLockBtn');
  const multEl     = document.getElementById('rivalsMultiplier');
  const multRowEl  = document.getElementById('sensMultiplierRow');
  const fromLbl    = document.getElementById('sensFromLabel');
  const toLbl      = document.getElementById('sensResultLabel');
  const rivalsNote = document.getElementById('sensRivalsNote');

  let dpiLocked = false;

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      dpiLocked = !dpiLocked;
      lockBtn.classList.toggle('locked', dpiLocked);
      if (dpiLocked && dpiToEl) dpiToEl.value = dpiFromEl.value;
      recalc();
    });
  }
  if (dpiFromEl) dpiFromEl.addEventListener('input', () => { if (dpiLocked && dpiToEl) dpiToEl.value = dpiFromEl.value; recalc(); });
  if (dpiToEl)   dpiToEl.addEventListener('input',   () => { if (dpiLocked && dpiFromEl) dpiFromEl.value = dpiToEl.value; recalc(); });

  function parseSensInput(raw, isRivals) {
    if (!raw) return NaN;
    const str    = String(raw).trim();
    const hasPct = str.endsWith('%');
    const num    = parseFloat(hasPct ? str.slice(0, -1) : str);
    if (isNaN(num) || num <= 0) return NaN;
    if (!isRivals) return num;
    return hasPct ? num / 100 : num;
  }

  function formatSensOutput(raw, isRivals) {
    return raw.toFixed(5);
  }

  function parseMultiplier(raw) {
    const str    = String(raw || '1').trim();
    const hasPct = str.endsWith('%');
    const num    = parseFloat(hasPct ? str.slice(0, -1) : str);
    if (isNaN(num)) return 1.0;
    if (hasPct)     return Math.max(0.001, num / 100);
    // 0–10 = raw multiplier (1 = 100%), above 10 = treat as percentage (100 = 1.0)
    return num > 10 ? Math.max(0.001, num / 100) : Math.max(0.001, num);
  }

  function recalc() {
    const fg           = SENS_DB[fromEl.value];
    const tg           = SENS_DB[toEl.value];
    const dpiFrom      = parseFloat(dpiFromEl?.value) || NaN;
    const dpiTo        = parseFloat(dpiToEl?.value)   || NaN;
    const isFromRivals = fromEl.value === 'rivals';
    const isToRivals   = toEl.value   === 'rivals';

    if (fromLbl) fromLbl.textContent = fg?.sensLabel || 'Sensitivity';
    if (toLbl)   toLbl.textContent   = isToRivals ? 'Roblox Rivals Camera Sensitivity' : (tg?.label || 'Target') + ' Sensitivity';
    if (multRowEl) multRowEl.style.display = (isFromRivals && !isToRivals) ? 'flex' : 'none';
    if (rivalsNote) rivalsNote.style.display = isToRivals ? 'block' : 'none';

    sensEl.placeholder = isFromRivals ? 'e.g. 0.5' : 'e.g. 0.064';

    const effectiveRaw = parseSensInput(sensEl.value, isFromRivals);

    if (!fg || !tg || isNaN(effectiveRaw) || isNaN(dpiFrom) || dpiFrom <= 0 || isNaN(dpiTo) || dpiTo <= 0) {
      document.getElementById('sensOutput').textContent = '—';
      document.getElementById('sensNote').textContent   = 'Enter your sensitivity and DPI above';
      document.getElementById('sensQuick').style.display = 'none';
      return;
    }

    const _mr    = String(multEl?.value || '1').trim();
    const _mn    = parseFloat(_mr.endsWith('%') ? _mr.slice(0,-1) : _mr);
    const slider = fg.hasMultiplier
      ? Math.max(0.001, isNaN(_mn) ? 1.0 : (_mr.endsWith('%') || _mn > 10 ? _mn / 100 : _mn))
      : 1.0;
    const effectiveSens = effectiveRaw * slider;

    const cm360     = 914.4 / (dpiFrom * fg.yaw * effectiveSens);
    const toSensRaw = 914.4 / (dpiTo   * tg.yaw * cm360);
    const toDisplay = formatSensOutput(toSensRaw, isToRivals);

    document.getElementById('sensOutput').textContent = toDisplay;

    const fromDisplay = isFromRivals ? (effectiveRaw * 100).toFixed(2) + '%' : `${effectiveRaw}`;
    document.getElementById('sensNote').textContent =
      `${fg.label} ${fromDisplay} at ${dpiFrom} DPI = ${tg.label} ${toDisplay} at ${dpiTo} DPI — same aim speed`;
    document.getElementById('sensResult').classList.add('has-result');

    const sqGrid = document.getElementById('sqGrid');
    sqGrid.innerHTML = '';
    Object.entries(SENS_DB).forEach(([key, game]) => {
      const eqRaw = 914.4 / (dpiTo * game.yaw * cm360);
      const eq    = formatSensOutput(eqRaw, key === 'rivals');
      const item  = document.createElement('div');
      item.className = 'sq-item';
      item.innerHTML = `<span class="sq-game">${game.label}</span><span class="sq-val">${eq}</span>`;
      sqGrid.appendChild(item);
    });
    document.getElementById('sensQuick').style.display = 'block';
  }

  [fromEl, toEl, sensEl, multEl].forEach(el => {
    if (el) { el.addEventListener('input', recalc); el.addEventListener('change', recalc); }
  });

  document.getElementById('sensSwapBtn').addEventListener('click', () => {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    recalc();
  });

  const calcBtn = document.getElementById('convertSens');
  if (calcBtn) calcBtn.addEventListener('click', recalc);

  recalc();
}
function initFOVConverter() {
  const fromEl  = document.getElementById('fovFrom');
  const toEl    = document.getElementById('fovTo');
  const inEl    = document.getElementById('robloxVFOV');
  const fromLbl = document.getElementById('fovFromLabel');
  const toLbl   = document.getElementById('fovResultLabel');
  const typeEl  = document.getElementById('fovType');

  const typeName = t => t === 'vertical' ? 'Vertical' : 'Horizontal';

  function updateFovLabels() {
    const fg = FOV_DB[fromEl.value];
    const tg = FOV_DB[toEl.value];
    if (fromLbl) fromLbl.textContent = fg ? typeName(fg.type) + ' FOV (°)' : 'FOV (°)';
    if (toLbl)   toLbl.textContent   = (tg?.label || 'Target') + ' FOV';
    if (typeEl)  typeEl.textContent  = tg ? typeName(tg.type) : '—';
    if (fg && inEl) inEl.value = fg.default;
  }
  fromEl.addEventListener('change', updateFovLabels);
  toEl.addEventListener('change',   updateFovLabels);
  updateFovLabels();

  document.getElementById('fovSwapBtn').addEventListener('click', () => {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    updateFovLabels();
  });

  document.getElementById('convertFOV').addEventListener('click', () => {
    const fg     = FOV_DB[fromEl.value];
    const tg     = FOV_DB[toEl.value];
    const fov    = parseFloat(inEl.value);
    const userAspect = parseFloat(document.getElementById('fovAspect').value);

    if (!fg || !tg || isNaN(fov) || fov <= 0 || fov >= 180 || isNaN(userAspect)) {
      document.getElementById('fovOutput').textContent = 'Invalid';
      return;
    }

    const toRad = d => d * Math.PI / 180;
    const toDeg = r => r * 180 / Math.PI;

    // Each game has its own internal aspect for VFOV<->HFOV conversion
    // Rivals uses 1.464352 (empirically verified), others use 16/9
    const fromAspect = fg.aspect || (16/9);
    const toAspect   = tg.aspect || (16/9);

    // Step 1: normalize input to HFOV radians using source game's aspect
    const hRad = fg.type === 'vertical'
      ? 2 * Math.atan(Math.tan(toRad(fov) / 2) * fromAspect)
      : toRad(fov);

    // Step 2: convert HFOV radians to target game's FOV type using target aspect
    const out = tg.type === 'vertical'
      ? toDeg(2 * Math.atan(Math.tan(hRad / 2) / toAspect))
      : toDeg(hRad);

    // HFOV in standard 16:9 for display reference
    const hfovDeg = toDeg(hRad);

    document.getElementById('fovOutput').textContent = out.toFixed(2) + '°';
    document.getElementById('fovType').textContent   = typeName(tg.type);

    // Write result info into the info box (replaces "put information here")
    const fovNoteEl = document.getElementById('fovNote');
    const fovExtraEl = document.getElementById('fovExtraNote');
    if (fovNoteEl) fovNoteEl.textContent =
      `${fg.label} ${fov}° ${typeName(fg.type)} FOV → ${tg.label} ${out.toFixed(2)}° ${typeName(tg.type)} FOV`;

    // Show HFOV helper row whenever input is VFOV (useful for KovaaK's)
    const hfovRow = document.getElementById('fovHfovRow');
    const hfovOut = document.getElementById('fovHfovOut');
    if (fg.type === 'vertical') {
      hfovOut.textContent = hfovDeg.toFixed(2) + '°';
      hfovRow.style.display = 'block';
    } else {
      hfovRow.style.display = 'none';
    }

    if (fovExtraEl) {
      if (fg.type === 'vertical' && tg.type === 'vertical') {
        fovExtraEl.textContent = 'Both games use Vertical FOV — the number is the same. Use the HFOV above for KovaaK\'s.';
      } else {
        fovExtraEl.textContent = '';
      }
    }

    document.getElementById('fovResult').classList.add('has-result');
    const nb = document.getElementById('fovNoteBox');
    if (nb) nb.style.display = 'block';
  });
}


/* ═══════════════════════════════════════════════════════════════
   3D WARMUP GAMES — Three.js
   Three separate games sharing one renderer & canvas.
   ═══════════════════════════════════════════════════════════════ */
const Warmup3D = (() => {
  // ── Shared three.js state ──
  let renderer, camera, scene;
  let animId   = null;
  let gameMode = 'tracking'; // 'tracking' | 'flicking' | 'switching'

  // ── Input state ──
  let yaw = 0, pitch = 0;
  let pointerLocked = false;
  let mouseSens = 0.0022;

  // ── Touch state ──
  let touchActive = false;
  let lastTouchX = 0, lastTouchY = 0;
  let touchSens = 0.005;
  const isMobile = () => ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  // ── Game timer ──
  let gameRunning = false;
  let score   = 0;
  let hits    = 0;
  let shots   = 0;
  let timeLeft  = 30;
  let bestScore = { tracking: null, flicking: null, switching: null };
  let countdownInt = null;

  // ── Three.js objects ──
  let trackingTarget = null;
  let trackingGlow   = null;
  let trackingLight  = null;
  let trackingT      = 0;

  let flickTargets   = [];
  let flickActive    = -1;

  let switchTargets  = [];
  let switchActive   = 0;

  const raycaster = typeof THREE !== 'undefined' ? new THREE.Raycaster() : null;
  const CENTER    = typeof THREE !== 'undefined' ? new THREE.Vector2(0, 0) : null;

  // ── DOM refs ──
  let canvas, overlay, badge, titleEl, subEl, startBtn, beginBtn;
  let scoreEl, timerEl, accEl, bestEl, scoreLblEl;
  let crosshairEl, hitRingEl, pointerPromptEl;
  let currentTabEl;

  const TIPS = {
    tracking:  'Keep your crosshair ahead of the sphere — predict the path, don\'t just chase.',
    flicking:  'Fix your eyes on the lit target before moving your mouse — eyes lead, hand follows.',
    switching: 'All targets are live — deplete each one\'s health bar to zero. Shoot precisely, no HP regenerates.',
  };

  // ── INIT ──
  function init() {
    canvas          = document.getElementById('warmupCanvas');
    overlay         = document.getElementById('canvasOverlay');
    badge           = document.getElementById('overlayBadge');
    titleEl         = document.getElementById('overlayTitle');
    subEl           = document.getElementById('overlaySub');
    startBtn        = document.getElementById('btnStartGame');
    scoreEl         = document.getElementById('wScore');
    timerEl         = document.getElementById('wTimer');
    accEl           = document.getElementById('wAccuracy');
    bestEl          = document.getElementById('wBest');

    // Load persisted personal bests from Firebase/localStorage
    if (typeof Scores !== 'undefined') {
      Scores.loadBests().then(bests => {
        ['tracking','flicking','switching'].forEach(m => {
          if (bests[m] != null) bestScore[m] = bests[m];
        });
        if (bestEl) bestEl.textContent = bestScore[gameMode] ?? '—';
      }).catch(() => {});
    }
    scoreLblEl      = document.getElementById('wScoreLbl');
    crosshairEl     = document.getElementById('crosshair');
    hitRingEl       = document.getElementById('hitRing');
    pointerPromptEl = document.getElementById('pointerPrompt');

    // Load persistent personal bests
    if (typeof Scores !== 'undefined') {
      Scores.loadBests().then(bests => {
        if (bests.tracking  != null) bestScore.tracking  = bests.tracking;
        if (bests.flicking  != null) bestScore.flicking  = bests.flicking;
        if (bests.switching != null) bestScore.switching = bests.switching;
        if (bestEl) bestEl.textContent = bestScore[gameMode] ?? '—';
      }).catch(() => {});
    }

    // Build Three.js renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x050507);

    // Camera — FPS perspective
    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 200);
    camera.position.set(0, 1.7, 0);
    camera.rotation.order = 'YXZ';

    buildScene();
    resize();

    // Game tab switching
    document.querySelectorAll('.game-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // If game running, stop it silently (no modal) then switch
        if (gameRunning) {
          gameRunning = false;
          mouseHeld = false;
          clearInterval(autoFireInterval);
          clearInterval(countdownInt);
          if (animId) { cancelAnimationFrame(animId); animId = null; }
          document.exitPointerLock();
          crosshairEl.classList.remove('visible');
          pointerPromptEl.classList.remove('visible');
          timerEl.style.color = '';
        }

        document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        gameMode = tab.dataset.game;

        // Full reset of all HUD values
        score = 0; hits = 0; shots = 0;
        scoreEl.textContent    = '0';
        timerEl.textContent    = document.getElementById('gameDuration').value || 30;
        accEl.textContent      = '—';
        timerEl.style.color    = '';
        scoreLblEl.textContent = gameMode === 'tracking' ? 'On Target' : gameMode === 'switching' ? 'Damage' : 'Score';
        bestEl.textContent     = bestScore[gameMode] ?? '—';

        updateOverlayTheme();
        showOverlay(true);
        buildScene();
        renderIdle();
        document.getElementById('tipText').textContent = TIPS[gameMode];

        // Sync leaderboard tab to match game mode (use cache, no extra fetch)
        if (typeof loadLeaderboard === 'function') loadLeaderboard(gameMode, false);
      });
    });

    startBtn.addEventListener('click', startGame);
    document.getElementById('restartGame').addEventListener('click', () => {
      // Silent stop — no modal, just reset
      gameRunning = false;
      mouseHeld = false;
      clearInterval(autoFireInterval);
      clearInterval(countdownInt);
      if (animId) { cancelAnimationFrame(animId); animId = null; }
      document.exitPointerLock();
      crosshairEl.classList.remove('visible');
      pointerPromptEl.classList.remove('visible');
      timerEl.style.color = '';
      score = 0; hits = 0; shots = 0;
      resetHUD();
      buildScene();
      renderIdle();
      showOverlay(true);
    });

    // Fullscreen button
    const fsBtn = document.getElementById('fullscreenBtn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        const wrap = document.getElementById('canvasWrap');
        if (!document.fullscreenElement) {
          wrap.requestFullscreen().catch(() => {});
          fsBtn.textContent = '⛶ Exit';
        } else {
          document.exitFullscreen();
          fsBtn.textContent = '⛶ Fullscreen';
        }
      });
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) fsBtn.textContent = '⛶ Fullscreen';
        setTimeout(() => Warmup3D.resize(), 60);
      });
    }

    // Sensitivity input
    const sensInput = document.getElementById('gameSensitivity');
    if (sensInput) {
      mouseSens = parseFloat(sensInput.value) || 0.0022;
      sensInput.addEventListener('input', e => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) mouseSens = v;
      });
    }

    // Pointer lock
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mozpointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);

    // Use mousedown/mouseup for canvas — enables hold-to-fire in switching
    canvas.addEventListener('mousedown', onCanvasMouseDown);
    canvas.addEventListener('mouseup',   onCanvasMouseUp);
    canvas.addEventListener('click',     onCanvasClick); // fallback for pointer-lock re-acquire

    // Touch support for mobile
    canvas.addEventListener('touchstart',  onTouchStart,  { passive: false });
    canvas.addEventListener('touchmove',   onTouchMove,   { passive: false });
    canvas.addEventListener('touchend',    onTouchEnd,    { passive: false });

    // On mobile, show touch hint instead of pointer lock prompt
    if (isMobile() && pointerPromptEl) {
      pointerPromptEl.textContent = 'Drag to aim · Tap to shoot';
    }

    renderIdle();
  }

  function updateOverlayTheme() {
    const BADGE_LABELS  = { tracking:'🎯 TRACKING', flicking:'⚡ FLICKING', switching:'🔀 SWITCHING' };
    const TITLE_CLASSES = { tracking:'tracking-title', flicking:'flicking-title', switching:'switching-title' };
    const BTN_CLASSES   = { tracking:'tracking-btn',   flicking:'flicking-btn',   switching:'switching-btn'   };
    badge.textContent  = BADGE_LABELS[gameMode];
    badge.className    = `overlay-game-badge ${gameMode}`;
    titleEl.className  = `overlay-title ${TITLE_CLASSES[gameMode]}`;
    startBtn.className = `btn-begin ${BTN_CLASSES[gameMode]}`;
  }

  // ── SCENE BUILDER ──
  function buildScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.055);

    // Lights
    scene.add(new THREE.AmbientLight(0x111122, 0.7));
    const hemi = new THREE.HemisphereLight(0x223344, 0x080810, 0.4);
    scene.add(hemi);

    // Floor grid
    const grid = new THREE.GridHelper(80, 80, 0x1a1a2e, 0x111128);
    grid.position.y = 0;
    scene.add(grid);

    // Ceiling grid (subtle)
    const ceiling = new THREE.GridHelper(80, 80, 0x0a0a18, 0x0a0a14);
    ceiling.position.y = 8;
    scene.add(ceiling);

    // Back wall indicator (subtle)
    const wallGeo = new THREE.PlaneGeometry(60, 12);
    const wallMat = new THREE.MeshBasicMaterial({ color: 0x070712, transparent: true, opacity: 0.5 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 4, -25);
    scene.add(wall);

    // Build game-specific objects
    if (gameMode === 'tracking')  buildTracking();
    if (gameMode === 'flicking')  buildFlicking();
    if (gameMode === 'switching') buildSwitching();
  }

  // ─── TRACKING ───
  function buildTracking() {
    trackingT = 0;
    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.6 : diff === 'hard' ? 0.28 : 0.44;

    const geo  = new THREE.SphereGeometry(R, 24, 24);
    const mat  = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1a4fa3, emissiveIntensity: 0.8, roughness: 0.3, metalness: 0.2 });
    trackingTarget = new THREE.Mesh(geo, mat);
    scene.add(trackingTarget);

    // Glow shell
    const glowGeo  = new THREE.SphereGeometry(R * 1.6, 16, 16);
    const glowMat  = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08, side: THREE.BackSide });
    trackingGlow   = new THREE.Mesh(glowGeo, glowMat);
    scene.add(trackingGlow);

    // Point light at sphere
    trackingLight = new THREE.PointLight(0x3b82f6, 2.5, 12);
    scene.add(trackingLight);
  }

  function updateTracking(delta) {
    if (!trackingTarget) return;
    const diff   = document.getElementById('gameDifficulty').value;
    const spd    = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.4 : 0.9;
    const spread = diff === 'easy' ? 3.5 : diff === 'hard' ? 6   : 5;
    const vspread = diff === 'easy' ? 1.2 : diff === 'hard' ? 2.5 : 2;

    trackingT += delta * spd;

    // Lissajous path
    const x = spread * Math.sin(1.3 * trackingT + 0.4);
    const y = vspread * Math.sin(0.9 * trackingT) + 2.2;
    const z = -10 - 3 * Math.sin(0.6 * trackingT + 1.0);

    trackingTarget.position.set(x, y, z);
    trackingGlow.position.copy(trackingTarget.position);
    trackingLight.position.copy(trackingTarget.position);

    // Check if crosshair is on target (raycast from camera center)
    if (gameRunning && raycaster) {
      raycaster.setFromCamera(CENTER, camera);
      const hits_ = raycaster.intersectObject(trackingTarget);
      const onTarget = hits_.length > 0;
      if (onTarget) {
        score++;
        scoreEl.textContent = score;
        // Pulse material
        trackingTarget.material.emissiveIntensity = 1.2;
      } else {
        trackingTarget.material.emissiveIntensity = 0.8;
      }
    }

    trackingTarget.rotation.y += delta * 0.8;
  }

  // ─── FLICKING ───
  const FLICK_POSITIONS = [
    [-5, 2.5, -12], [ 0, 2.5, -12], [5, 2.5, -12],
    [-5, 0.5, -12], [ 0, 0.5, -12], [5, 0.5, -12],
    [-7, 1.5, -14], [ 7, 1.5, -14],
  ];

  function buildFlicking() {
    flickTargets = [];
    flickActive  = Math.floor(Math.random() * FLICK_POSITIONS.length);

    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.45 : diff === 'hard' ? 0.2 : 0.3;

    FLICK_POSITIONS.forEach((pos, i) => {
      const isActive = i === flickActive;
      const geo = new THREE.SphereGeometry(R, 18, 18);
      const mat = new THREE.MeshStandardMaterial({
        color:            isActive ? 0xf59e0b : 0x2a2a3a,
        emissive:         isActive ? 0xb45309 : 0x080810,
        emissiveIntensity: isActive ? 1.0     : 0.1,
        roughness: 0.4, metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh._flickIdx = i;
      scene.add(mesh);
      flickTargets.push(mesh);

      // Glow shell for active
      if (isActive) {
        const gGeo = new THREE.SphereGeometry(R * 1.8, 12, 12);
        const gMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.1, side: THREE.BackSide });
        const glow = new THREE.Mesh(gGeo, gMat);
        glow.position.set(...pos);
        glow._flickGlow = true;
        scene.add(glow);
      }
    });

    // Light at active target
    const pt = new THREE.PointLight(0xf59e0b, 3, 10);
    pt.position.set(...FLICK_POSITIONS[flickActive]);
    pt._flickLight = true;
    scene.add(pt);
  }

  function activateFlickTarget(idx) {
    // Remove old glow & light
    scene.children = scene.children.filter(c => !c._flickGlow && !c._flickLight);

    flickActive = idx;
    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.45 : diff === 'hard' ? 0.2 : 0.3;

    flickTargets.forEach((mesh, i) => {
      const active = i === flickActive;
      mesh.material.color.setHex(active ? 0xf59e0b : 0x1e1e2a);
      mesh.material.emissive.setHex(active ? 0xb45309 : 0x050508);
      mesh.material.emissiveIntensity = active ? 1.0 : 0.05;
    });

    // New glow
    const gGeo = new THREE.SphereGeometry(R * 1.8, 12, 12);
    const gMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.12, side: THREE.BackSide });
    const glow = new THREE.Mesh(gGeo, gMat);
    glow.position.set(...FLICK_POSITIONS[flickActive]);
    glow._flickGlow = true;
    scene.add(glow);

    // New light
    const pt = new THREE.PointLight(0xf59e0b, 3, 10);
    pt.position.set(...FLICK_POSITIONS[flickActive]);
    pt._flickLight = true;
    scene.add(pt);
  }

  function onFlickClick() {
    if (!gameRunning || flickTargets.length === 0) return;
    shots++;
    raycaster.setFromCamera(CENTER, camera);
    const intersects = raycaster.intersectObjects(flickTargets);
    if (intersects.length > 0) {
      const hitIdx = intersects[0].object._flickIdx;
      if (hitIdx === flickActive) {
        hits++;
        score++;
        scoreEl.textContent = score;
        accEl.textContent   = `${Math.round((hits/shots)*100)}%`;
        flashHitRing();
        // Pick new random target (not same)
        let next;
        do { next = Math.floor(Math.random() * FLICK_POSITIONS.length); } while (next === flickActive && FLICK_POSITIONS.length > 1);
        activateFlickTarget(next);
      }
    }
  }

  // ─── SWITCHING — targets have HP bars, respawn after death, hold LMB to auto-fire ───
  const SWITCH_POSITIONS = [
    [-7,   2.8, -14],
    [-3.8, 1.4, -12],
    [ 0,   3.2, -13],
    [ 3.8, 1.4, -12],
    [ 7,   2.8, -14],
    [-5.5, 0.5, -13],
    [ 5.5, 0.5, -13],
  ];

  let switchHealthBars = [];
  let mouseHeld        = false;   // tracks LMB held state
  let autoFireInterval = null;    // interval for held fire in switching

  function makeHealthBarTexture(hp, maxHp) {
    const W = 128, H = 20;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    c.fillStyle = 'rgba(0,0,0,0.6)';
    c.fillRect(0, 0, W, H);
    const frac = Math.max(0, hp / maxHp);
    const barColor = frac > 0.6 ? '#22c55e' : frac > 0.3 ? '#f59e0b' : '#ef4444';
    c.fillStyle = barColor;
    c.fillRect(2, 4, Math.round((W - 4) * frac), H - 8);
    c.strokeStyle = 'rgba(255,255,255,0.25)';
    c.lineWidth = 1;
    c.strokeRect(2, 4, W - 4, H - 8);
    return new THREE.CanvasTexture(cv);
  }

  function respawnTarget(mesh) {
    mesh._hp    = mesh._maxHp;
    mesh._dead  = false;
    mesh.material.color.setHex(0xa855f7);
    mesh.material.emissive.setHex(0x7c3aed);
    mesh.material.emissiveIntensity = 0.8;
    mesh.material.opacity = 1;
    mesh.material.transparent = false;
    if (mesh._glow)  mesh._glow.visible  = true;
    if (mesh._light) mesh._light.visible = true;
    mesh._barMesh.visible = true;
    const tex = makeHealthBarTexture(mesh._maxHp, mesh._maxHp);
    mesh._barMesh.material.map = tex;
    mesh._barMesh.material.needsUpdate = true;
  }

  function buildSwitching() {
    switchTargets    = [];
    switchHealthBars = [];

    const diff  = document.getElementById('gameDifficulty').value;
    const R     = diff === 'easy' ? 0.44 : diff === 'hard' ? 0.22 : 0.32;
    const maxHp = diff === 'easy' ? 5    : diff === 'hard' ? 15   : 10;

    SWITCH_POSITIONS.forEach((pos, i) => {
      const geo = new THREE.SphereGeometry(R, 20, 20);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xa855f7, emissive: 0x7c3aed, emissiveIntensity: 0.8,
        roughness: 0.35, metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh._switchIdx = i;
      mesh._hp        = maxHp;
      mesh._maxHp     = maxHp;
      mesh._dead      = false;
      scene.add(mesh);
      switchTargets.push(mesh);

      const gGeo = new THREE.SphereGeometry(R * 1.7, 12, 12);
      const gMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.09, side: THREE.BackSide });
      const glow = new THREE.Mesh(gGeo, gMat);
      glow.position.set(...pos);
      mesh._glow = glow;
      scene.add(glow);

      const pt = new THREE.PointLight(0xa855f7, 2.5, 8);
      pt.position.set(...pos);
      mesh._light = pt;
      scene.add(pt);

      const tex    = makeHealthBarTexture(maxHp, maxHp);
      const barGeo = new THREE.PlaneGeometry(R * 3.5, R * 0.7);
      const barMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const bar    = new THREE.Mesh(barGeo, barMat);
      bar.position.set(pos[0], pos[1] + R * 2.2, pos[2]);
      scene.add(bar);
      mesh._barMesh = bar;

      switchHealthBars.push({ mesh, hp: maxHp, maxHp });
    });
  }

  function onSwitchFire() {
    if (!gameRunning || switchTargets.length === 0 || (!pointerLocked && !isMobile())) return;
    shots++;
    raycaster.setFromCamera(CENTER, camera);
    const alive = switchTargets.filter(m => !m._dead);
    const intersects = raycaster.intersectObjects(alive.length ? alive : switchTargets);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit._dead) return;
      hits++;
      hit._hp -= 1;

      const tex = makeHealthBarTexture(hit._hp, hit._maxHp);
      hit._barMesh.material.map = tex;
      hit._barMesh.material.needsUpdate = true;

      const frac = hit._hp / hit._maxHp;
      hit.material.color.setRGB(0.15 + 0.55*(1-frac), 0.2*frac, frac > 0.5 ? 0.85 : 0.2);
      hit.material.emissive.setRGB(0.3*(1-frac), 0.2*frac, frac > 0.5 ? 0.4 : 0.05);

      score++;
      scoreEl.textContent = score;
      accEl.textContent   = `${Math.round((hits/shots)*100)}%`;
      flashHitRing();

      if (hit._hp <= 0) {
        hit._dead = true;
        hit.material.color.setHex(0x2a2a3a);
        hit.material.emissive.setHex(0x050508);
        hit.material.emissiveIntensity = 0.02;
        hit.material.opacity = 0.35;
        hit.material.transparent = true;
        if (hit._glow)  hit._glow.visible  = false;
        if (hit._light) hit._light.visible  = false;
        hit._barMesh.visible = false;

        // Respawn after a short delay (scaled by difficulty)
        const diff = document.getElementById('gameDifficulty').value;
        const delay = diff === 'easy' ? 1200 : diff === 'hard' ? 3000 : 2000;
        setTimeout(() => {
          if (gameRunning) respawnTarget(hit);
        }, delay);
      }
    } else {
      // Miss — penalise accuracy only, no score deduction
    }
  }

  // ── CANVAS CLICK + HOLD HANDLER ──
  function onCanvasMouseDown(e) {
    if (e.button !== 0) return;
    if (!gameRunning) return;
    if (!pointerLocked && !isMobile()) { canvas.requestPointerLock(); return; }

    if (gameMode === 'flicking')  onFlickClick();
    if (gameMode === 'tracking')  { /* tracking is continuous via raycaster in update */ }
    if (gameMode === 'switching') {
      onSwitchFire();
      // Start auto-fire at ~10 shots/sec while held
      clearInterval(autoFireInterval);
      mouseHeld = true;
      autoFireInterval = setInterval(() => {
        if (!mouseHeld || !gameRunning) { clearInterval(autoFireInterval); return; }
        onSwitchFire();
      }, 100);
    }
  }

  function onCanvasMouseUp(e) {
    if (e.button !== 0) return;
    mouseHeld = false;
    clearInterval(autoFireInterval);
  }

  // Legacy single-click handler kept for flicking (pointer lock re-acquire)
  function onCanvasClick() {
    if (!gameRunning) return;
    if (!pointerLocked && !isMobile()) { canvas.requestPointerLock(); return; }
    if (gameMode === 'flicking') onFlickClick();
  }

  // ── POINTER LOCK ──
  function onPointerLockChange() {
    if (isMobile()) return; // mobile uses touch, no pointer lock needed
    pointerLocked = document.pointerLockElement === canvas || document.mozPointerLockElement === canvas;
    crosshairEl.classList.toggle('visible', pointerLocked);
    pointerPromptEl.classList.toggle('visible', gameRunning && !pointerLocked);
  }

  function onMouseMove(e) {
    if (!pointerLocked || !gameRunning) return;
    yaw   -= e.movementX * mouseSens;
    pitch -= e.movementY * mouseSens;
    pitch  = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, pitch));
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
  }

  // ── MOBILE TOUCH CONTROLS ──────────────────────────────────────
  // Left half of screen = look (drag to aim)
  // Right half of screen = fire (tap)
  // No pointer lock needed on mobile
  let _touch = { active: false, id: null, lastX: 0, lastY: 0 };

  function initTouchControls() {
    if (!isMobile()) return;

    // Hide pointer-lock hint on mobile
    const hint = document.querySelector('.canvas-hint');
    if (hint) hint.style.display = 'none';

    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      if (!gameRunning) return;
      Array.from(e.changedTouches).forEach(t => {
        const isRight = t.clientX > canvas.clientWidth / 2;
        if (isRight) {
          // Right side tap = fire
          if (gameMode === 'flicking')  onFlickClick();
          if (gameMode === 'switching') onSwitchFire();
        } else {
          // Left side drag = look
          if (!_touch.active) {
            _touch.active = true;
            _touch.id     = t.identifier;
            _touch.lastX  = t.clientX;
            _touch.lastY  = t.clientY;
          }
        }
      });
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!gameRunning) return;
      Array.from(e.changedTouches).forEach(t => {
        if (t.identifier !== _touch.id) return;
        const dx = t.clientX - _touch.lastX;
        const dy = t.clientY - _touch.lastY;
        _touch.lastX = t.clientX;
        _touch.lastY = t.clientY;
        // Scale touch sensitivity (touch pixels are smaller movement)
        const scale = 0.004;
        yaw   -= dx * scale;
        pitch -= dy * scale;
        pitch  = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, pitch));
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
      });
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
      e.preventDefault();
      Array.from(e.changedTouches).forEach(t => {
        if (t.identifier === _touch.id) {
          _touch.active = false;
          _touch.id     = null;
        }
      });
    }, { passive: false });
  }

  function onMobileTap() {
    if (!gameRunning) return;
    if (gameMode === 'flicking')  onFlickClick();
    if (gameMode === 'switching') onSwitchFire();
  }

  // ── TOUCH HANDLERS ──
  function onTouchStart(e) {
    e.preventDefault();
    if (!gameRunning) {
      // Tap to start if overlay is showing
      const overlay = document.getElementById('canvasOverlay');
      if (overlay && overlay.classList.contains('visible')) return;
      return;
    }
    const t = e.changedTouches[0];
    touchActive = true;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
    // Show crosshair on mobile when game starts
    if (crosshairEl) crosshairEl.classList.add('visible');
    pointerLocked = true; // treat touch as always "locked"
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (!gameRunning || !touchActive) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - lastTouchX;
    const dy = t.clientY - lastTouchY;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;

    // Scale sensitivity by canvas size for consistent feel
    const sens = touchSens * (600 / (canvas.clientWidth || 600));
    yaw   -= dx * sens;
    pitch -= dy * sens;
    pitch  = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, pitch));
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
  }

  function onTouchEnd(e) {
    e.preventDefault();
    if (!gameRunning) return;
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - lastTouchX);
    const dy = Math.abs(t.clientY - lastTouchY);
    touchActive = false;
    // Tap (minimal movement) = shoot
    if (dx < 8 && dy < 8) {
      if (gameMode === 'flicking')  onFlickClick();
      if (gameMode === 'switching') onSwitchFire();
      if (gameMode === 'tracking')  { /* tracking is continuous */ }
      flashHitRing();
    }
  }

  // ── GAME FLOW ──
  function startGame() {
    const duration = parseInt(document.getElementById('gameDuration').value, 10);
    if (isMobile()) {
      pointerLocked = true;
      if (crosshairEl) crosshairEl.classList.add('visible');
      if (pointerPromptEl) pointerPromptEl.style.display = 'none';
    } else {
      canvas.requestPointerLock();
    }
    gameRunning = true;
    score = 0; hits = 0; shots = 0; timeLeft = duration;
    resetHUD(duration);
    buildScene();

    overlay.classList.add('hidden');
    crosshairEl.classList.add('visible');
    canvas.requestPointerLock();

    countdownInt = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 5) timerEl.style.color = '#ef4444';
      if (timeLeft <= 0) stopGame();
    }, 1000);

    if (animId) cancelAnimationFrame(animId);
    let last = null;
    function loop(ts) {
      if (!gameRunning) return;
      const delta = last ? (ts - last) / 1000 : 0;
      last = ts;
      if (gameMode === 'tracking') updateTracking(delta);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);
  }

  function stopGame() {
    gameRunning = false;
    mouseHeld = false;
    clearInterval(autoFireInterval);
    clearInterval(countdownInt);
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    document.exitPointerLock();
    crosshairEl.classList.remove('visible');
    pointerPromptEl.classList.remove('visible');

    // Capture accuracy NOW before anything resets
    const acc = shots > 0 ? `${Math.round((hits/shots)*100)}%` : '—';

    // Update persistent personal best
    if (bestScore[gameMode] === null || score > bestScore[gameMode]) {
      bestScore[gameMode] = score;
      if (typeof Scores !== 'undefined') {
        Scores.saveBest(gameMode, score).catch(() => {});
      }
    }
    bestEl.textContent = bestScore[gameMode] ?? '—';
    timerEl.style.color = '';

    // Show name prompt — pass captured acc so it survives mode switches
    showNameModal(gameMode, score, acc);
  }

  function resetHUD(duration) {
    const d = duration || parseInt(document.getElementById('gameDuration').value, 10);
    scoreEl.textContent  = '0';
    timerEl.textContent  = d;
    accEl.textContent    = '—';
    timerEl.style.color  = '';
    scoreLblEl.textContent = gameMode === 'tracking' ? 'On Target' : gameMode === 'switching' ? 'Damage' : 'Score';
  }

  function flashHitRing() {
    // On mobile, only show the hit ring during flicking
    if (isMobile() && gameMode !== 'flicking') return;
    hitRingEl.classList.remove('flash');
    void hitRingEl.offsetWidth; // reflow
    hitRingEl.classList.add('flash');
  }

  function showOverlay(isReady) {
    updateOverlayTheme();
    titleEl.textContent  = isReady ? 'READY?' : 'ROUND OVER';
    subEl.textContent    = 'Click Begin to lock cursor & start';
    startBtn.textContent = '▶ Begin Warmup';
    overlay.classList.remove('hidden');
  }

  function renderIdle() {
    if (!renderer || !scene) return;
    renderer.render(scene, camera);
  }

  function resize() {
    if (!renderer || !canvas) return;
    const wrap = canvas.parentElement;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderIdle();
  }

  window.addEventListener('resize', resize);

  function _showEndOverlay(mode, finalScore, acc) {
    updateOverlayTheme();
    titleEl.textContent  = 'ROUND OVER';
    const modeMsg = mode === 'tracking' ? 'Tracked well!' : mode === 'switching' ? `Damage dealt: ${finalScore}` : `Accuracy: ${acc}`;
    subEl.textContent    = `Score: ${finalScore}  ·  ${modeMsg}  ·  Best: ${bestScore[mode]}`;
    startBtn.textContent = '▶ Play Again';
    overlay.classList.remove('hidden');
  }

  return { init, resize, _showEndOverlay };
})();

/* ═══════════════════════════════════════════════════════════════
   LEADERBOARD
   ═══════════════════════════════════════════════════════════════ */
let lbCurrentMode = 'tracking';

function showNameModal(mode, finalScore, acc) {
  const bg    = document.getElementById('nameModalBg');
  const badge = document.getElementById('nmBadge');
  const sc    = document.getElementById('nmScore');
  const input = document.getElementById('nmNameInput');
  if (!bg) { Warmup3D._showEndOverlay(mode, finalScore, acc || '—'); return; }

  const BADGE = { tracking:'🎯 TRACKING', flicking:'⚡ FLICKING', switching:'🔀 SWITCHING' };
  badge.textContent    = BADGE[mode] || mode.toUpperCase();
  badge.className      = 'nm-badge nm-badge-' + mode;
  badge.dataset.mode   = mode;
  badge.dataset.score  = finalScore;
  badge.dataset.acc    = acc || '—';
  sc.textContent       = finalScore;

  // Pre-fill: Google display name > saved name > empty
  let prefillName = '';
  if (typeof Auth !== 'undefined' && Auth.isSignedIn()) {
    // Use Firebase display name (e.g. Google account name) directly
    prefillName = Auth.getDisplayName() || '';
  }
  if (!prefillName) prefillName = localStorage.getItem('aimrivals_name') || '';
  input.value = prefillName;

  bg.classList.add('visible');
  setTimeout(() => input.focus(), 100);
}

function hideNameModal() {
  const bg = document.getElementById('nameModalBg');
  if (bg) bg.classList.remove('visible');
}

function showEndOverlay(mode, finalScore, acc) {
  // Read values stored on the badge element — immune to mode switches
  const badge = document.getElementById('nmBadge');
  const m     = mode      || badge?.dataset.mode  || 'tracking';
  const s     = finalScore != null ? finalScore : parseInt(badge?.dataset.score || '0', 10);
  const a     = acc       || badge?.dataset.acc   || '—';
  Warmup3D._showEndOverlay(m, s, a);
}

function renderLeaderboard(entries) {
  const tbody = document.getElementById('lbTableBody');
  if (!tbody) return;
  if (!entries || entries.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="lb-empty">No scores yet — be the first!</td></tr>';
    return;
  }
  const MEDALS = ['🥇','🥈','🥉'];
  const DIFF_COLOR = { beginner:'#4a7fff', intermediate:'#f0c800', advanced:'#ef4444' };
  tbody.innerHTML = entries.map((e, i) => {
    const diff  = (e.difficulty || '').toLowerCase();
    const label = diff ? diff.charAt(0).toUpperCase() + diff.slice(1) : '—';
    const color = DIFF_COLOR[diff] || 'var(--tx-3)';
    return `
    <tr class="lb-row ${i < 3 ? 'lb-top' : ''}">
      <td class="lb-rank-col">${MEDALS[i] || (i+1)}</td>
      <td class="lb-name">${escapeHtml(e.name)}</td>
      <td class="lb-score-col lb-score-val">${e.score}</td>
      <td class="lb-diff-col" style="color:${color};font-size:11px;font-weight:600;text-transform:capitalize">${label}</td>
      <td class="lb-date-col">${e.date || '—'}</td>
    </tr>`;
  }).join('');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])
  );
}

async function loadLeaderboard(mode, forceFetch = false) {
  lbCurrentMode = mode;
  document.querySelectorAll('.lb-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.lbmode === mode)
  );
  const tbody = document.getElementById('lbTableBody');
  if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="lb-loading">Loading…</td></tr>';

  if (typeof Scores === 'undefined') {
    if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="lb-empty">Scores unavailable offline</td></tr>';
    return;
  }
  // Always fetch fresh from network (not just cache) so reloads show real data
  if (forceFetch) await Scores.load();
  const top = await Scores.getTop(mode, 10);
  renderLeaderboard(top);
}

function initLeaderboard() {
  // Show current week range
  const weekLbl = document.getElementById('lbWeekLabel');
  if (weekLbl && typeof Scores !== 'undefined') {
    weekLbl.textContent = `Week of ${Scores.getWeekLabel()} — resets every Monday`;
  }

  // Tab switching
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => loadLeaderboard(tab.dataset.lbmode, true));
  });

  // Submit button
  const submitBtn = document.getElementById('nmSubmit');
  const skipBtn   = document.getElementById('nmSkip');
  const input     = document.getElementById('nmNameInput');
  const bg        = document.getElementById('nameModalBg');
  if (!submitBtn) return;

  async function doSubmit() {
    const badge = document.getElementById('nmBadge');
    const name  = (input?.value || '').trim();
    const mode  = badge?.dataset.mode  || lbCurrentMode;
    const score = parseInt(badge?.dataset.score || '0', 10);
    const acc   = badge?.dataset.acc   || '—';

    // Block submit if no name or reserved placeholder
    if (!name || name.toLowerCase() === 'anonymous') {
      input.style.borderColor = '#ef4444';
      input.placeholder = name.toLowerCase() === 'anonymous' ? 'Please use a real name!' : 'Please enter a name!';
      input.value = '';
      input.focus();
      setTimeout(() => { input.style.borderColor = ''; input.placeholder = 'Your name…'; }, 2500);
      return;
    }

    localStorage.setItem('aimrivals_name', name);
    submitBtn.textContent = 'Saving…';
    submitBtn.disabled = true;

    try {
      if (typeof Scores !== 'undefined') {
        await Scores.submit(mode, score, name, document.getElementById('gameDifficulty')?.value || 'medium');
        await loadLeaderboard(mode);
      }
    } catch(e) { console.warn('Submit failed', e); }

    submitBtn.textContent = 'Saved ✓';
    setTimeout(() => {
      hideNameModal();
      showEndOverlay(mode, score, acc);
      submitBtn.textContent = 'Save Score';
      submitBtn.disabled = false;
    }, 700);
  }

  submitBtn.addEventListener('click', doSubmit);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') doSubmit(); });

  skipBtn?.addEventListener('click', () => {
    const badge = document.getElementById('nmBadge');
    const mode  = badge?.dataset.mode  || lbCurrentMode;
    const score = parseInt(badge?.dataset.score || '0', 10);
    const acc   = badge?.dataset.acc   || '—';
    hideNameModal();
    showEndOverlay(mode, score, acc);
  });

  // Click outside modal to skip
  bg?.addEventListener('click', e => {
    if (e.target === bg) skipBtn?.click();
  });

  // Load initial leaderboard — force network fetch so reload always shows real data
  if (typeof Scores !== 'undefined') {
    loadLeaderboard('tracking', true);
  }
}


let _toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  clearTimeout(_toastTimer);
  el.textContent = msg;
  el.classList.add('show');
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadFromURL();
  initNav();
  initTrainerToggle();
  initRankSelector();
  initSliders();
  initCopyPlaylist();
  initShare();
  initSensConverter();
  initFOVConverter();
  renderPlaylist();
  initLeaderboard();

  // Init 3D warmup only if Three.js loaded
  if (typeof THREE !== 'undefined') {
    Warmup3D.init();
  } else {
    document.getElementById('canvasOverlay').innerHTML = '<div class="overlay-inner"><div class="overlay-title" style="font-size:20px;color:#ef4444">Three.js failed to load</div><div class="overlay-sub">Check your internet connection</div></div>';
  }
});
