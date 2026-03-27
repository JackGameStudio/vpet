// sprites.js - Pixel art sprite data for Denshi Pet
// 16x16 sprites = 256 chars each (16 rows × 16 cols)
// Color keys:
//   Lobster: r=#CC2200 R=#FF4400 o=#FF6633 x=#881100 E=#000000
//   Panda:   K=#111111 W=#EEEEEE E=#000000
//   Seal:    S=#888888 s=#AAAAAA w=#CCCCCC z=#666666 E=#000000
//   Egg:     d=#0f380f m=#306230 l=#8bac0f

var _S = {};
var _P = {
  "r":"#CC2200","R":"#FF4400","o":"#FF6633","x":"#881100",
  "K":"#111111","W":"#EEEEEE","E":"#000000",
  "S":"#888888","s":"#AAAAAA","w":"#CCCCCC","z":"#666666",
  "d":"#0f380f","m":"#306230","l":"#8bac0f"
};

function _d(n,str){var o=[];for(var i=0;i<str.length;i++)o.push(_P[str[i]]||null);_S[n]=o;}

// Helper: build a 256-char sprite from 16 row strings (each 16 chars)
function _s(rows){return rows.join('');}

// ================================================================
// 🦞 LOBSTER - NEUTRAL
// Segmented body, 2 big claws, 6 legs, eyes, antennae
// ================================================================
_d("lobster_neutral",_s([
"________________",  //  0: antennae top
"____________rR__",  //  1: antennae + head top
"___________rRRoR",  //  2: eyes
"__________RRRRRRo",  //  3: head
"__________RRRRRRRR",  //  4: body
"__________rRrrrrrR",  //  5: body mid
"___________rRoRRRo",  //  6: claw arms
"xRrrxRx__________",  //  7: legs + shadow
"xRrrRx___________",  //  8: legs
"___________rRoRRRo",  //  9: claw arms
"___________rRoRRRo",  // 10: claw arms
"____________RRRR__",  // 11: tail
"_____________RRR__",  // 12: tail
"______________RR__",  // 13: tail
"_______________rR_",  // 14: tail end
"__________________",  // 15: empty
]));

// ================================================================
// 🦞 LOBSTER - HAPPY (claws raised, smile)
// ================================================================
_d("lobster_happy",_s([
"____________rR__rR",  //  0: claws raised high
"____________rRRoRRRo",  //  1
"___________RRRRRRRRo",  //  2
"___________RRRRRRRRRR",  //  3
"___________rRrrrrrR_",  //  4
"___________rRoRRRo__",  //  5
"rRrrrRx__________",  //  6: claw raised left
"xRrrrRx___________",  //  7
"___________rRoRRRo",  //  8: claw arm
"___________rRoRRRo",  //  9
"____________RRRR__",  // 10: tail
"_____________RRR__",  // 11
"______________RR__",  // 12
"_______________rR_",  // 13
"__________________",  // 14
"__________________",  // 15
]));

// ================================================================
// 🦞 LOBSTER - SAD (claws drooped, frown)
// ================================================================
_d("lobster_sad",_s([
"________________",  //  0
"____________rR__",  //  1
"___________rRRoR",  //  2
"__________RRRRRRo",  //  3
"__________RRRRRRRR",  //  4
"__________rRrrrrrR",  //  5
"___________rRoRRRo",  //  6
"xRrrxRx__________",  //  7
"xRrrRx___________",  //  8
"___________xRrrRx_",  //  9: claw drooped
"___________rRoRRRo",  // 10
"____________RRRR__",  // 11
"_____________RRR__",  // 12
"______________RR__",  // 13
"_______________rR_",  // 14
"__________________",  // 15
]));

// ================================================================
// 🦞 LOBSTER - SICK/ANGRY (dark, X-eyes, frown)
// ================================================================
_d("lobster_sick",_s([
"____________rR__rR",  //  0: angry stance
"___________xRRoRRRo",  //  1: dark red
"__________RRRRRRRRx_",  //  2: dark
"__________RRRRRRRRRR",  //  3
"__________xRrrrrrR__",  //  4: dark
"___________xRoRRRo__",  //  5
"xRxxRx___________",  //  6
"xRxxRx___________",  //  7
"___________xRxxRx_",  //  8: dark claw
"___________xRxxRx_",  //  9
"____________xRRRx_",  // 10
"_____________RRR__",  // 11
"______________RR__",  // 12
"_______________rR_",  // 13
"__________________",  // 14
"__________________",  // 15
]));

// ================================================================
// 🐼 PANDA - NEUTRAL
// Round face, black eye patches, ears, body, limbs
// ================================================================
_d("panda_neutral",_s([
"_____K___K_____",  //  0: ears
"____KWWSWSWWKK_",  //  1: head top
"___KWSSSKWWSEWE",  //  2: eye patches
"___WSSSSSSSSSSK",  //  3: head
"_SSSSSSdSSSSSS__",  //  4: eye patches
"_SSSSSSSSSSSSK__",  //  5: face
"_SSSSSSSSSSSSK__",  //  6: face
"___SSSSSSSSSS___",  //  7: nose area
"___EWSSSSSEW____",  //  8: eyes
"____EWEWEW______",  //  9: nose+mouth
"_____KWKW_______",  // 10: nose
"______KKKK______",  // 11: chin
"_____WG__WG_____",  // 12: arms
"____WG____WG____",  // 13: legs
"___WG______WG___",  // 14: feet
"________________",  // 15
]));

// ================================================================
// 🐼 PANDA - HAPPY (arms raised, smile, blush)
// ================================================================
_d("panda_happy",_s([
"_____K___K_____",
"____KWWSWSWWKK_",
"___KWSSSKWWSEWE",
"___WSSSSSSSSSSK",
"_SSSSSSdSSSSSS__",
"_SSSSSSSSSSSSK__",
"_SSSSSSSSSSSSK__",
"___SSSSSSSSSS___",
"___EWSSSSSEW____",
"____EWSWWWE_____",
"_____SSSSSS_____",
"______KKKK______",
"____WG__WG_____",
"____WG____WG____",
"___WG______WG___",
"________________"
]));

// ================================================================
// 🐼 PANDA - SAD (tears, frown, droopy)
// ================================================================
_d("panda_sad",_s([
"_____K___K_____",
"____KWWSWSWWKK_",
"___KWSSSKWWSEWE",
"___WSSSSSSSSSSK",
"_SSSSSSdSSSSSS__",
"_SSSSSSSSSSSSK__",
"_SSSSSSSSSSSSK__",
"___SSSSSSSSSS___",
"___EWSSSSSEW____",
"____EWEWEW______",
"_____SSSSSS_____",
"______KKKK______",
"_____WG__WG_____",
"____WG____WG____",
"___WG______WG___",
"________________",
]));

// ================================================================
// 🐼 PANDA - SICK/ANGRY (X-eyes, frown, angry ears)
// ================================================================
_d("panda_sick",_s([
"_KK_K___K_KK___",  //  0: angry ears
"_KKWWSWSWWKKK___",  //  1: angry brows
"___KWSSSKWWSEWE",
"___WSSSSSSSSSSK",
"_SSSSSSdSSSSSS__",
"_SSSSSSSSSSSSK__",
"_SSSSSSSSSSSSK__",
"___SSSSSSSSSS___",
"___EWSSSSSEW____",
"____EWEWEW______",
"_____KWKW_______",
"______KKKK______",
"_____WG__WG_____",
"____WG____WG____",
"___WG______WG___",
"________________"
]));

// ================================================================
// 🦭 SEAL - NEUTRAL
// Sleek elongated body, whiskers, flippers
// ================================================================
_d("seal_neutral",_s([
"________________",  //  0
"______SSSS______",  //  1: head top
"_____SwwSSSSSS__",  //  2: head + highlights
"____SzzzzSSSSSS_",  //  3: head
"____SSzzSSSSSSSSSS",  //  4: head/body
"____SSSSSSSSSSSS__",  //  5: body
"SSSSSSSSSSSSSS____",  //  6: body
"SSSSSSSSSSSSSS____",  //  7: body
"_____SSSSSSSS____",  //  8: body lower
"______SSSSSS_____",  //  9: belly
"_______SzSSSSz___",  // 10: whiskers
"_______SSz_SSz___",  // 11: nose bridge
"________SSzSS____",  // 12: nose
"_________SSS_____",  // 13: rear
"________________",  // 14
"________________",  // 15
]));

// ================================================================
// 🦭 SEAL - HAPPY (flippers up, smile)
// ================================================================
_d("seal_happy",_s([
"________________",
"______SSSS______",
"_____SwwSSSSSS__",
"____SzzzzSSSSSS_",
"____SSzzSSSSSSSSSS",
"____SSSSSSSSSSSS__",
"SSSSSSSSSSSSSS____",
"SSSSSSSSSSSSSS____",
"_____SSSSSSSS____",
"______SSSSSS_____",
"_______SzSSSSz___",
"_______SSz_SSz___",
"________SSzSS____",
"_________SSS_____",
"________________",
"________________"
]));

// ================================================================
// 🦭 SEAL - SAD (flippers down, frown)
// ================================================================
_d("seal_sad",_s([
"________________",
"______SSSS______",
"_____SwwSSSSSS__",
"____SzzzzSSSSSS_",
"____SSzzSSSSSSSSSS",
"____SSSSSSSSSSSS__",
"SSSSSSSSSSSSSS____",
"SSSSSSSSSSSSSS____",
"_____SSSSSSSS____",
"______SSSSSS_____",
"_______SzSSSSz___",
"_______SSz_SSz___",
"________SSzSS____",
"_________SSS_____",
"________________",
"________________"
]));

// ================================================================
// 🦭 SEAL - SICK/ANGRY (dark, X-eyes, frown)
// ================================================================
_d("seal_sick",_s([
"________________",
"______SSSS______",
"_____SwwSSSSSS__",
"____SzzzzSSSSSS_",
"____SSzzSSSSSSSSSS",
"____SSSSSSSSSSSS__",
"SSSSSSSSSSSSSS____",
"SSSSSSSSSSSSSS____",
"_____SSSSSSSS____",
"______SSSSSS_____",
"_______SzSSSSz___",
"_______SSz_SSz___",
"________SSzSS____",
"_________SSS_____",
"________________",
"________________"
]));

// ================================================================
// 🥚 EGG - WHOLE
// Oval egg with decorative spots (Game Boy palette)
// ================================================================
_d("egg_whole",_s([
"________________",
"_____eeeeee____",
"____emmmmmme___",
"____emmmmlllme__",
"____emmmmmmllle_",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmlllle_",
"____emmmmmlllme__",
"_____emmmmmme___",
"______emmmmme___",
"_______eeee_____",
"________________",
"________________"
]));

// ================================================================
// 🥚 EGG - CRACK 1 (small crack)
// ================================================================
_d("egg_crack1",_s([
"________________",
"_____eeeeee____",
"____emmmmmme___",
"____emmmmlllme__",
"____emmmmmmllle_",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmmlllle_",
"____emmmmmlllme__",
"_____emmmm1mme__",
"______em11mme___",
"_______e111e____",
"________________",
"________________"
]));

// ================================================================
// 🥚 EGG - CRACK 2 (medium crack)
// ================================================================
_d("egg_crack2",_s([
"________________",
"_____eeeeee____",
"____emmmmmme___",
"____emmmmlllme__",
"____emmmmmmllle_",
"____emmmmmmmmmmme",
"____emmmmmmmmmmme",
"____emmmmmm11mme_",
"____emmmm11mme___",
"_____emmm1l1me___",
"_______e111e____",
"________________",
"________________",
"________________",
"________________",
"________________"
]));

// ================================================================
// 🥚 EGG - CRACK 3 / HATCHING (big crack)
// ================================================================
_d("egg_crack3",_s([
"________________",
"_____eeeeee____",
"_____e1111e_____",
"_____e1mmmm11e__",
"_____e1mmmll11e_",
"______e1mmmlll1e_",
"______e1mmmmmm1e_",
"______e1mmmmmm1__",
"_______e1mmm11___",
"________e1ml1e___",
"_________e11e____",
"___________1e___",
"________________",
"________________",
"________________",
"________________"
]));

window._S = _S;
