/* ================================================================
   AimRivals — script.js  v2
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
    /* ── TRACKING ─────────────────────────────────────────────────── */
    tracking: [
      /* BEGINNER */
      { name: 'VT Spheretrack Novice S3',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Smooth single-sphere tracking. Lock on early and ride the movement — no over-correction.' },
      { name: 'VT Pilltrack Novice S3',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Pill-shaped target gives a bigger surface. Stay centered on the body, not the edges.' },
      { name: 'VT Shifttrack Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Precise tracking with small positional shifts. Resist micro-corrections — stay locked.' },
      { name: 'VT Verttrack Novice S3',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Vertical tracking emphasis. Engage your elbow slightly — pure wrist will tire fast.' },
      { name: 'VT Controltrack Novice S3',  difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Control-focused tracking at novice pace. Smoothness over reaction speed here.' },
      { name: 'Smoothtrack',               difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Classic Aimlabs smooth tracking. No sudden changes — build the habit of constant contact.' },
      { name: 'Bouncetrack',               difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Target bounces at predictable angles. Anticipate the bounce direction rather than reacting late.' },
      { name: 'Sidetrack Hard',            difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Horizontal strafing target. Lock your Y axis and focus purely on the left-right movement.' },
      { name: 'VT Spheretrack Novice S3',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Repeat for consistency. Aim for the same score on every run — consistency beats one good run.' },

      /* INTERMEDIATE */
      { name: 'VT Shifttrack Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster unpredictable shifts. Stay locked through each direction change without chasing.' },
      { name: 'VT Verttrack Intermediate S3',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Full vertical movement at intermediate pace. Use your arm — wrist alone breaks down here.' },
      { name: 'VT Quaketrack Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Fast erratic reactive tracking. Let your hand be loose — tension = lag behind the target.' },
      { name: 'VT Jettrack Intermediate S3',     difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Quick lateral bursts. Pre-aim the direction then smooth out — don\'t chase the burst.' },
      { name: 'VT Controltrack Intermediate S3', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Deliberate control tracking. Breathe — this punishes over-correction harder than under.' },
      { name: 'VT Steadytrack Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Steady continuous motion. Maintain a fluid stroke — no twitching, no hesitation.' },
      { name: 'VT Pilltrack Intermediate S3',    difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster pill target. Center-mass focus — wider hitbox doesn\'t mean you can be sloppy.' },
      { name: 'Multitrack',                     difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Switch between multiple tracked targets. Prioritize the one moving fastest toward you.' },
      { name: 'Ground Plaza Track',             difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Ground-level tracking with depth changes. React to Z-axis movement, not just X/Y.' },

      /* ADVANCED */
      { name: 'VT Steadytrack Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite control tracking. No overcorrection. Breathe through it — tense arms fail here.' },
      { name: 'VT Verttrack Advanced S3',     difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Full vertical at advanced speed. Demand full arm engagement and relaxed grip.' },
      { name: 'VT Quaketrack Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite reactive tracking. Fast, chaotic — top-tier arm control required.' },
      { name: 'VT Jettrack Advanced S3',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Lightning burst tracking. Anticipation is the skill — reaction alone is too slow.' },
      { name: 'VT Controltrack Advanced S3',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced control tracking. Precision over speed — micro-corrections must be invisible.' },
      { name: 'VT Shifttrack Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Maximum shift variance. Position your crosshair slightly ahead of where the target will be.' },
      { name: 'VT Pilltrack Advanced S3',     difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Fast pill tracking at elite level. Sustain perfect center-mass contact the whole run.' },
      { name: 'VT Sphereswitch Advanced S3',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'High-speed sphere targets. Split-second acquisition followed by smooth hold.' },
      { name: 'VT Jettrack Advanced S3',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite burst tracking. Anticipation is the only skill that works — reaction alone is too slow.' },
    ],

    /* ── FLICKING (CLICKING) ─────────────────────────────────────── */
    flicking: [
      /* BEGINNER */
      { name: 'VT Angleshot Novice S3',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Diagonal-moving targets. Read the trajectory before clicking — don\'t react, predict.' },
      { name: 'VT Sixshot Novice S3',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Six medium static targets. Clean direct flicks, not speed — accuracy unlocks speed.' },
      { name: 'VT Waveshot Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Arcing wave-motion targets. Time your click at the apex of the arc, not mid-jump.' },
      { name: 'VT Quadshot Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Four medium targets randomly placed. Flick directly — no spray-and-pray.' },
      { name: 'VT Wideshot Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Wide-spawn static targets. Use arm movement on far targets — don\'t overextend wrist.' },
      { name: 'VT Frogshot Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Targets strafe in straight lines. Smooth approach then snap — don\'t over-flick.' },
      { name: 'Gridshot Ultimate',        difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Iconic Aimlabs scenario. Accuracy-first — a clean miss wastes more time than a slow hit.' },
      { name: 'Microshot',               difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Small static targets. Slow down — wrist isolation only, keep your arm still.' },
      { name: 'Spidershot 180',          difficulty: ['beginner'], duration: 5, sets: 3, tip: '180-degree wide spawns. Build the habit of using your whole arm on distant targets.' },

      /* INTERMEDIATE */
      { name: 'VT Angleshot Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Steeper diagonal angles. Commit the flick fully — hesitation causes micro-corrections.' },
      { name: 'VT Waveshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster wave arcs. Read the peak early and pre-aim — don\'t chase the target mid-jump.' },
      { name: 'VT Wideshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Wider spawns at intermediate speed. Full arm on far targets, wrist only for close ones.' },
      { name: 'VT Frogshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster linear clicking. Smooth approach to each target, then snap precisely.' },
      { name: 'VT Floatshot Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Gradually floating targets. Control the micro-adjustments — don\'t over-flick on slow movers.' },
      { name: 'VT Fiveshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Five medium targets at intermediate pace. Build a consistent rhythm between flicks.' },
      { name: 'VT Quadshot Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Tighter four-target spread. Maximum precision — zero spray tolerance.' },
      { name: 'Multishot 180',               difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Rapid wide-angle static targets. Identify clusters — clear nearest first then work outward.' },
      { name: 'VT Popshot Novice S3',          difficulty: ['intermediate'], duration: 5, sets: 3, tip: 'Popping targets that appear suddenly. React fast but don\'t muscle-memory the spawn point.' },

      /* ADVANCED */
      { name: 'VT Angleshot Advanced S3',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite dynamic clicking. Zero hesitation — commit every flick and own the miss if it happens.' },
      { name: 'VT Popshot Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Maximum reaction dynamic clicking. Eyes lead, hand follows — never the other way.' },
      { name: 'VT Quadshot Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Four tight targets — pure precision at elite pace. Any spray is a failed run.' },
      { name: 'VT Wideshot Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Wide advanced spawns. Full arm mechanics demanded — no compensation with wrist.' },
      { name: 'VT Frogshot Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Fast linear advanced. Smooth acceleration into each target — no abrupt jerks.' },
      { name: 'VT Floatshot Advanced S3',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Floating targets at elite speed. Micro-adjustment mastery — overshooting = failed click.' },
      { name: 'VT Waveshot Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Max-speed wave clicking. Read the arc, pre-aim the apex — pure timing and accuracy.' },
      { name: 'Sixshot Micro',            difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Six tiny targets. Slowdown is allowed — accuracy at small sizes builds elite precision.' },
      { name: 'VT Popshot Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Pop-style elite dynamic clicking. Eyes lead, hand follows — the click is already decided.' },
    ],

    /* ── SWITCHING ───────────────────────────────────────────────── */
    switching: [
      /* BEGINNER */
      { name: 'VT Arcswitch Novice S3',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Bouncing arc targets. Flick to the nearest one each time — don\'t plan ahead too far.' },
      { name: 'VT Sphereswitch Novice S3',  difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Moving sphere targets. Brief track then commit the switch — don\'t hover.' },
      { name: 'VT Pokeswitch Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Rapid poke switching. Build decisiveness — the moment you see the next target, go.' },
      { name: 'VT Smoothswitch Novice S3',  difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Smooth transition switching. Controlled flicks between targets — don\'t rush, find rhythm.' },
      { name: 'VT Pillswitch Novice S3',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Pill-target switching. Wider targets let you focus on the switch timing rather than precision.' },
      { name: 'Multitarget Switch',        difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Classic multi-target format. Click-click-click rhythm. Don\'t camp on any single target.' },
      { name: 'VT Arcswitch Intermediate S3', difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Slightly faster arcs. Momentum carries between switches — use it, don\'t fight it.' },
      { name: 'Reflex Switch',             difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Reaction-focused switching. Eyes move before hands — train the visual lead.' },
      { name: 'Sixshot Switch',            difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Switch between six arranged targets. Build a mental map of the layout early.' },

      /* INTERMEDIATE */
      { name: 'VT Temposwitch Intermediate S3', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Maintain momentum — find a rhythm and never pause between switches.' },
      { name: 'VT Skyswitch Intermediate S3',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Airborne targets that move unpredictably. Eyes always lead the flick.' },
      { name: 'VT Dartswitch Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Fast darting targets. Acquire the trajectory early — don\'t chase from behind.' },
      { name: 'VT Smoothswitch Intermediate S3',difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Smooth precise switching. Controlled arc between targets — zero wasted motion.' },
      { name: 'VT Pokeswitch Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster poke pace. Decisiveness is the skill — see target, go immediately.' },
      { name: 'VT Sphereswitch Intermediate S3',difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Moving spheres at intermediate speed. Track briefly, switch cleanly — don\'t linger.' },
      { name: 'VT Boltswitch Novice S3',        difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Intro to bolt-style fast switching. Acquire immediately on spawn — pre-aim common areas.' },
      { name: 'Spidershot Switch',             difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Wide-angle switching. Arm movement between far targets — don\'t drag with wrist only.' },
      { name: 'VT Leapswitch Intermediate S3',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Leaping targets at intermediate difficulty. Smooth, controlled flicks over raw speed.' },

      /* ADVANCED */
      { name: 'VT Boltswitch Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite evasive switching. Targets dash fast — immediate acquisition, zero hesitation.' },
      { name: 'VT Leapswitch Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced stability switching. Precision over raw speed — smooth flicks only.' },
      { name: 'VT Temposwitch Advanced S3',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite speed switching. Maximum momentum maintenance — dead time between targets = lost score.' },
      { name: 'VT Dartswitch Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced evasive darters. Read trajectory on spawn — chasing from behind fails at this speed.' },
      { name: 'VT Smoothswitch Advanced S3',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite stability switching. Invisible micro-corrections and perfect arc transitions.' },
      { name: 'VT Skyswitch Advanced S3',     difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced airborne targets. 3D prediction demanded — your eyes must arrive before your cursor.' },
      { name: 'VT Pokeswitch Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Maximum-speed poke switching. Instant commitment on every target — no second-guessing.' },
      { name: 'VT DartTS Advanced S3',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Darting targets at advanced pace. Read trajectory on spawn — chasing from behind fails.' },
      { name: 'VT Pillswitch Advanced S3',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced pill switching at elite pace. Center-mass every switch — no edge-grazing.' },
    ],
  },

  kovaaks: {
    /* ── TRACKING ─────────────────────────────────────────────────── */
    tracking: [
      /* BEGINNER */
      { name: 'Smoothbot',              difficulty: ['beginner'], duration: 5, sets: 3, tip: 'The KovaaK\'s tracking foundation. Smooth, predictable movement — build your base here.' },
      { name: 'VT Snake Track Novice S5', difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Thin target strafes and accelerates. Learn to read speed changes, not just direction.' },
      { name: 'VT PGT Novice S5',       difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Precise Goated Tracking. Targets arc smoothly — stay locked on the arc without over-aiming.' },
      { name: 'Floating Point V2',      difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Classic floating tracking. Let the target come to you — over-chasing is the main mistake.' },
      { name: 'controlsphere002',       difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Small sphere reactive tracking. Stay centered — the sphere will drift if you let tension in.' },
      { name: 'VT Ground Novice S5',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Ground-level horizontal strafes. Focus on matching speed — not just following direction.' },
      { name: 'Polygon S1',            difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Multi-angle polygon tracking. Read each new wall before it arrives — predict, don\'t react.' },
      { name: 'Air Angelic 4',         difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Aerial smooth tracking. Loosen grip — tight grip causes oscillation on smooth targets.' },
      { name: 'VT Pilltrack Novice S5', difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Pill-shaped novice target. Aim center-mass — the pill shape rewards proper technique.' },

      /* INTERMEDIATE */
      { name: 'VT Ground Intermediate S5',       difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Ground-level horizontal strafes with varied speeds. React to direction changes early.' },
      { name: 'VT Snake Track Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster acceleration and deceleration on the snake path. Stay smooth through speed changes.' },
      { name: 'VT Aether Intermediate S5',       difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Aerial XYZ movement with fast direction changes. Arms stay fluid — no tension.' },
      { name: 'VT PGT Intermediate S5',          difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Intermediate precise tracking. Arcs become tighter — lead position slightly ahead.' },
      { name: 'smoothbot2',                     difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster smoothbot variant. The speed increase exposes any tension in your grip.' },
      { name: 'Rasp',                           difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Reactive tracking on an unpredictable bot. Embrace the jitter — stay on it regardless.' },
      { name: 'VT Raw Control Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Control tracking with XYZ axis. Patience — smooth corrections only, no over-chasing.' },
      { name: 'Parabolic',                      difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Parabolic motion tracking. Anticipate the arc peak and pre-position your crosshair there.' },
      { name: 'Air Angelic 4 - Hard',           difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Harder aerial tracking. Engage elbow on vertical movement — wrist alone will lose it.' },

      /* ADVANCED */
      { name: 'VT Aether Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Full XYZ reactive tracking. Fast direction changes demand full arm engagement throughout.' },
      { name: 'VT Raw Control Advanced S5', difficulty: ['advanced'], duration: 5, sets: 5, tip: 'XYZ-axis control tracking. Precision and patience — smooth corrections are the whole game.' },
      { name: 'VT Ground Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Maximum-speed ground strafes. React before the direction change completes — not after.' },
      { name: 'VT Snake Track Advanced S5', difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite snake track speed. Speed reading is the skill — your arm must already know where it\'s going.' },
      { name: 'pokeball_hard',             difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Hard reactive tracking with evasive movement. Stay composed — panic leads to over-correction.' },
      { name: 'Air Angelic 4 - Insane',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite aerial tracking. Loose grip + full arm control = the only way to survive this.' },
      { name: 'VT PGT Advanced S5',        difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced precise goated tracking. Every micro-correction visible — keep them invisible.' },
      { name: 'Voltaic Tracking Combo',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Mixed tracking demands. Adapt quickly between smooth and reactive phases within one run.' },
      { name: 'B180T',                    difficulty: ['advanced'], duration: 5, sets: 5, tip: '180-degree reactive tracking. Fast turns — loosen grip completely and let the arm follow.' },
    ],

    /* ── FLICKING (CLICKING) ─────────────────────────────────────── */
    flicking: [
      /* BEGINNER */
      { name: '1wall5targets_pasu',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Classic KovaaK\'s pasu. Diagonally-moving targets — timing and flick accuracy above all.' },
      { name: 'VT Pasu Novice S5',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Pasu diagonals at novice pace. Acquire the target, time the click cleanly — no spray.' },
      { name: 'VT Popcorn Novice S5', difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Targets leap and arc. Prioritize center targets, read jump patterns early.' },
      { name: 'VT Tile Frenzy Novice S5',  difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Static tile targets in a grid. Direct flicks, no hesitation — build clean habits.' },
      { name: 'FuglaaXYZ',           difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Classic dynamic clicking. Track briefly then snap — don\'t fire until confident.' },
      { name: 'Close Fast Strafes',  difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Close-range strafing targets. Short sharp flicks — don\'t use arm on close targets.' },
      { name: 'Patchwerk Atlas',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Mixed target sizes on a wall. Prioritize small targets — they punish flick inaccuracy most.' },
      { name: '6 sphere easy',       difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Six easy static spheres. Accuracy drill — take your time, land every click cleanly.' },
      { name: 'VT 1wtsphere Novice S5', difficulty: ['beginner'], duration: 5, sets: 3, tip: 'One-wall target sphere switching and clicking. Good intro to combined skills.' },

      /* INTERMEDIATE */
      { name: 'VT ww5t Intermediate S5',      difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Wide-wall static clicking. Wide spawns force full arm flicks — accuracy and speed balanced.' },
      { name: 'VT Pasu Intermediate S5',      difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Harder pasu angles. Commit the flick fully — zero hesitation.' },
      { name: 'VT Popcorn Intermediate S5',   difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster popcorn arcs. Read the peak early and pre-aim — don\'t mid-arc chase.' },
      { name: 'VT Tile Frenzy Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster tile switching. Build speed without breaking accuracy — clean > fast.' },
      { name: 'Air No Drift',                 difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Aerial static targets at mid-range. Arm movement required — lock position before clicking.' },
      { name: 'FuglaaXYZ Hard',              difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Harder dynamic clicking. Speed of acquisition is tested — read trajectory on spawn.' },
      { name: 'Patchwerk Atlas 2',           difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Harder mixed-size wall clicking. Small target accuracy is the bottleneck here.' },
      { name: '1wall6targets_pasu',          difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Six pasu targets on one wall. More targets means faster cycling — don\'t slow between flicks.' },
      { name: 'VT 1wtsphere Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Intermediate sphere clicking. Center-mass every flick — edge hits waste time.' },

      /* ADVANCED */
      { name: 'VT Floating Heads Advanced S5', difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Head-sized targets strafe horizontally. Smooth approach, precise timing — no over-flick.' },
      { name: 'VT 1wxts Advanced S5',         difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Small static targets in a diamond. Pure precision flicking — size punishes every error.' },
      { name: 'VT ww5t Advanced S5',          difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced wide-wall clicking. Full arm on far targets, perfect accuracy demanded.' },
      { name: 'VT Pasu Advanced S5',          difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite pasu pace. Zero tolerance for late clicks — pre-aim the diagonal path.' },
      { name: 'VT Popcorn Advanced S5',       difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite arc clicking. Read every jump on spawn — pre-aim the apex before the bot leaves ground.' },
      { name: 'Smoothbot Goated',            difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced tracking-style clicking. Smooth entry into each target then snap — no abrupt motion.' },
      { name: 'Air No Drift Hard',           difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite aerial clicking. Lock arm position before firing — any movement on click = miss.' },
      { name: 'VT Tile Frenzy Advanced S5',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Maximum-speed tile clicking. Perfect rhythm — any micro-pause is a lost point.' },
      { name: 'Close Fast Strafes Hard',   difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite close-range strafing targets. Explosive wrist snaps — arm stays locked in position.' },
    ],

    /* ── SWITCHING ───────────────────────────────────────────────── */
    switching: [
      /* BEGINNER */
      { name: 'VT DotTS Novice S5',     difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Hold left click throughout — static dot targets. Focus on smooth transitions, not speed.' },
      { name: 'VT EddieTS Novice S5',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Diagonally-moving greeble targets. Regular, predictable — find the rhythm early.' },
      { name: 'Ground Plaza TS',        difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Ground-level target switching. Close range — short crisp flicks between targets.' },
      { name: 'popcornTS',             difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Popcorn-style target switching. Bouncing targets — anticipate the next spawn location.' },
      { name: '1w2ts reload',          difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Two-target reload switching. Rhythm is everything — click, switch, click, repeat.' },
      { name: 'VT SkyTS Novice S5',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Airborne novice targets. Look up — train yourself to track targets above the horizon line.' },
      { name: 'VT PillTS Novice S5',   difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Pill-target switching at novice speed. Wider targets teach switching rhythm before precision.' },
      { name: 'popcornTS easy',        difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Easy popcorn switching. Read the bounce angle — each bounce is predictable if you look.' },
      { name: 'VT ArcTS Novice S5',    difficulty: ['beginner'], duration: 5, sets: 3, tip: 'Arc-pattern switching. Flick along the arc shape — don\'t cut across it.' },

      /* INTERMEDIATE */
      { name: 'VT DriftTS Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Targets constantly accelerate and decelerate. Micro-correct after each acquire — stay on it.' },
      { name: 'VT FlyTS Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'XYZ-movement targets. Harder to read — stay calm and track briefly before clicking.' },
      { name: 'VT EddieTS Intermediate S5',difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster diagonal targets. Rhythm speeds up — maintain momentum between every switch.' },
      { name: 'VT DotTS Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Hold-fire intermediate dots. Cleaner entries required — sloppy switches bleed score fast.' },
      { name: 'VT SkyTS Intermediate S5',  difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Intermediate airborne targets. 3D awareness required — don\'t just track X and Y.' },
      { name: 'VT PillTS Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster pill switching. Center-mass accuracy now tested harder — edges no longer forgiven.' },
      { name: 'popcornTS reload',         difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Reload-mechanic popcorn switching. Misses hurt twice — accuracy becomes a must.' },
      { name: '1w2ts hard',              difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Hard two-target switching. Speed required now — build explosive transitions.' },
      { name: 'VT ArcTS Intermediate S5', difficulty: ['intermediate'], duration: 5, sets: 4, tip: 'Faster arc-pattern switching. Speed up the flick arc — no pause at each target.' },

      /* ADVANCED */
      { name: 'VT ControlTS Advanced S5',  difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Small targets with gentle jumps. Pure precision switching — every transition must be clean.' },
      { name: 'VT PentaBounce Advanced S5',difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Targets ricochet in a pentagon. Read the bounce angle early — commit before it arrives.' },
      { name: 'VT DriftTS Advanced S5',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite drifting targets. Micro-corrections between each switch — invisible adjustments only.' },
      { name: 'VT FlyTS Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite XYZ switching. Full 3D prediction demanded — eyes arrive before the cursor.' },
      { name: 'VT SkyTS Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite aerial switching. Loose grip + arm control — the only combination that works here.' },
      { name: 'VT EddieTS Advanced S5',    difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Max-speed diagonal targets. Rhythm never stops — any pause destroys the run.' },
      { name: 'VT PillTS Advanced S5',     difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Advanced pill switching at elite pace. Center-mass every switch — no edge-grazing.' },
      { name: 'VT DotTS Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite dot switching. Hold-fire discipline + max-speed transitions. Zero wasted motion.' },
      { name: 'VT ArcTS Advanced S5',      difficulty: ['advanced'], duration: 5, sets: 5, tip: 'Elite arc-pattern switching at maximum pace. Flow along the arc — no pause at peaks.' },
    ],
  },
};

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
  rivals:  { label: 'Roblox Rivals',  yaw: 0.37503, sensLabel: 'Camera Sensitivity (%)', hasMultiplier: true,  sensScale: 0.01 },
  arsenal: { label: 'Roblox Arsenal', yaw: 0.37503, sensLabel: 'Camera Sensitivity',     hasMultiplier: false, sensScale: 1    },
  aimlabs: { label: 'Aimlabs',        yaw: 0.05,    sensLabel: 'Sensitivity',             hasMultiplier: false, sensScale: 1    },
  kovaaks: { label: "Kovaak's",       yaw: 0.022,   sensLabel: 'Sensitivity',             hasMultiplier: false, sensScale: 1    },
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
  // Check sessionStorage first (set by landing page links)
  const stored = sessionStorage.getItem('aimrivals_section');
  if (stored && valid.includes(stored)) {
    sessionStorage.removeItem('aimrivals_section');
    return stored;
  }
  // Fall back to hash if someone typed it manually
  const fromHash = location.hash.replace(/^#\/?/, '');
  if (valid.includes(fromHash)) return fromHash;
  return 'routines';
}

function showSection(target) {
  const valid = ['routines','converters','warmup'];
  if (!valid.includes(target)) target = 'routines';

  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === target));
  document.querySelectorAll('.section').forEach(s  => s.classList.toggle('active', s.id === target));

  if (target === 'warmup') setTimeout(() => Warmup3D.resize(), 60);

  // Store in history state — no hash, no path change
  history.replaceState({ section: target }, '', location.pathname);

  const titles = { routines:'Routines', converters:'Converters', warmup:'Warmup' };
  document.title = 'AimRivals — ' + titles[target];
}

function initNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  window.addEventListener('popstate', e => {
    if (e.state?.section) showSection(e.state.section);
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
    let text = `⚔ AimRivals — ${trainerLabel} · ${rankLabel}\n`;
    text += `${'─'.repeat(28)}\n`;
    state._playlist.forEach((s,i) => { text += `${i+1}. ${ICONS[s.type]} ${s.name} · ${s.sets}×${s.duration}min\n`; });
    text += `${'─'.repeat(28)}\nGenerated by AimRivals`;
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
  const fromEl    = document.getElementById('sensFrom');
  const toEl      = document.getElementById('sensTo');
  const sensEl    = document.getElementById('rivalsSens');
  const dpiEl     = document.getElementById('mouseDPI');
  const multEl    = document.getElementById('rivalsMultiplier');
  const multRowEl = document.getElementById('sensMultiplierRow');
  const fromLbl   = document.getElementById('sensFromLabel');
  const toLbl     = document.getElementById('sensResultLabel');
  const dpiLbl    = document.getElementById('sensDpiLabel');
  const dpiVal    = document.getElementById('sensDpiVal');

  function recalc() {
    const fg   = SENS_DB[fromEl.value];
    const tg   = SENS_DB[toEl.value];
    const sens = parseFloat(sensEl.value);
    const dpi  = parseFloat(dpiEl.value);

    // Update labels
    if (fromLbl) fromLbl.textContent = fg?.sensLabel || 'Sensitivity';
    if (toLbl)   toLbl.textContent   = (tg?.label || 'Target') + ' Sensitivity';
    if (multRowEl) multRowEl.style.display = fg?.hasMultiplier ? 'flex' : 'none';

    if (!fg || !tg || isNaN(sens) || sens <= 0 || isNaN(dpi) || dpi <= 0) {
      document.getElementById('sensOutput').textContent = '—';
      document.getElementById('sensNote').textContent   = 'Enter your sensitivity and DPI above';
      if (dpiLbl) dpiLbl.textContent = 'at — DPI';
      if (dpiVal) dpiVal.textContent = '— DPI';
      document.getElementById('sensQuick').style.display = 'none';
      return;
    }

    const slider        = fg.hasMultiplier ? Math.max(0.01, parseFloat(multEl?.value) || 1.0) : 1.0;
    const effectiveSens = sens * (fg.sensScale ?? 1) * slider;

    // toSens preserves same physical feel at the entered DPI
    const cm360  = 914.4 / (800 * fg.yaw * effectiveSens); // reference cm/360 at 800 DPI
    const toSensRaw = 914.4 / (dpi * tg.yaw * cm360);
    // If target game uses a scale (e.g. Rivals outputs %) convert back
    const toSens = toSensRaw / (tg.sensScale ?? 1);

    document.getElementById('sensOutput').textContent = toSens.toFixed(5);
    if (dpiLbl) dpiLbl.textContent = `at ${dpi} DPI`;
    if (dpiVal) dpiVal.textContent = `${dpi} DPI`;
    const fromDisplay = `${sens}${fg.sensScale === 0.01 ? '%' : ''}`;
    const toDisplay   = `${toSens.toFixed(5)}${tg.sensScale === 0.01 ? '%' : ''}`;
    document.getElementById('sensNote').textContent =
      `${fg.label} ${fromDisplay}${slider !== 1.0 ? ' × ' + slider + ' multiplier' : ''} at 800 DPI`
      + ` = ${tg.label} ${toDisplay} at ${dpi} DPI — same aim speed`;
    document.getElementById('sensResult').classList.add('has-result');

    // Quick reference grid
    const sqGrid = document.getElementById('sqGrid');
    sqGrid.innerHTML = '';
    Object.values(SENS_DB).forEach(game => {
      const eqRaw = 914.4 / (dpi * game.yaw * cm360);
      const eq    = eqRaw / (game.sensScale ?? 1);
      const suffix = game.sensScale === 0.01 ? '%' : '';
      const item = document.createElement('div');
      item.className = 'sq-item';
      item.innerHTML = `<span class="sq-game">${game.label}</span><span class="sq-val">${eq.toFixed(5)}${suffix}</span>`;
      sqGrid.appendChild(item);
    });
    document.getElementById('sensQuick').style.display = 'block';
  }

  // Live update on every input change — no button press needed
  [fromEl, toEl, sensEl, dpiEl, multEl].forEach(el => {
    if (el) { el.addEventListener('input', recalc); el.addEventListener('change', recalc); }
  });

  document.getElementById('sensSwapBtn').addEventListener('click', () => {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    recalc();
  });

  // Keep the calculate button working too for users who expect it
  const calcBtn = document.getElementById('convertSens');
  if (calcBtn) calcBtn.addEventListener('click', recalc);

  recalc(); // run once on load with defaults
}

/* ═══════════════════════════════════════════════════════════════
   FOV CONVERTER
   ─────────────────────────────────────────────────────────────
   All conversions pipeline through HFOV radians:
     VFOV → hfovRad = 2·atan(tan(toRad(VFOV)/2) · aspect)
     HFOV → hfovRad = toRad(HFOV)
     hfovRad → VFOV = toDeg(2·atan(tan(hfovRad/2) / aspect))
     hfovRad → HFOV = toDeg(hfovRad)

   Verified against user ground truth:
     Arsenal  70 VFOV → HFOV 102.447858 ✓
     Rivals   80 VFOV → HFOV 112.327252 ✓
     Rivals   80 VFOV → Aimlabs 80 VFOV (same type = identity) ✓
     KovaaK's 103 HFOV → Rivals VFOV 70.53° ✓
   ═══════════════════════════════════════════════════════════════ */
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
    scoreLblEl      = document.getElementById('wScoreLbl');
    crosshairEl     = document.getElementById('crosshair');
    hitRingEl       = document.getElementById('hitRing');
    pointerPromptEl = document.getElementById('pointerPrompt');

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
    if (!gameRunning || switchTargets.length === 0 || !pointerLocked) return;
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
    if (!pointerLocked) { canvas.requestPointerLock(); return; }

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
    if (!pointerLocked) { canvas.requestPointerLock(); return; }
    if (gameMode === 'flicking') onFlickClick();
  }

  // ── POINTER LOCK ──
  function onPointerLockChange() {
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

  // ── GAME FLOW ──
  function startGame() {
    const duration = parseInt(document.getElementById('gameDuration').value, 10);
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

    // Update session best
    if (bestScore[gameMode] === null || score > bestScore[gameMode]) {
      bestScore[gameMode] = score;
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

  const saved = localStorage.getItem('aimrivals_name') || '';
  input.value = saved;

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
  tbody.innerHTML = entries.map((e, i) => `
    <tr class="lb-row ${i < 3 ? 'lb-top' : ''}">
      <td class="lb-rank-col">${MEDALS[i] || (i+1)}</td>
      <td class="lb-name">${escapeHtml(e.name)}</td>
      <td class="lb-score-col lb-score-val">${e.score}</td>
      <td class="lb-date-col">${e.date || '—'}</td>
    </tr>
  `).join('');
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
    const name  = (input?.value || '').trim() || 'Anonymous';
    const mode  = badge?.dataset.mode  || lbCurrentMode;
    const score = parseInt(badge?.dataset.score || '0', 10);
    const acc   = badge?.dataset.acc   || '—';

    localStorage.setItem('aimrivals_name', name);
    submitBtn.textContent = 'Saving…';
    submitBtn.disabled = true;

    try {
      if (typeof Scores !== 'undefined') {
        await Scores.submit(mode, score, name);
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
