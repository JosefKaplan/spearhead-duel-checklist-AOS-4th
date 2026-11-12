/*! Spearhead Duel — GENERATED FILE, DO NOT EDIT.
 *  Source: src/app.jsx  ·  Rebuild: npm run build  ·  Transpiled by TypeScript 5.9.3 (JSX -> React.createElement, ES2017) */
const { useState, useEffect } = React;
// ============================================================================
//  Spearhead Duel — Warhammer Age of Sigmar 4th ed. Spearhead two-player helper
//  Warscroll data transcribed from the official GW Spearhead PDFs/cards.
// ============================================================================
const btn = (bg, col, extra = {}) => (Object.assign({ background: bg, color: col, border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }, extra));
const ARMIES = {
    vigilant: {
        name: "Vigilant Brotherhood", faction: "Stormcast Eternals",
        color: "#f0b429", bg: "#0e1025", accent: "#1a2040", emoji: "⚡",
        general: "Lord-Vigilant on Gryph-stalker",
        units: ["Lord-Veritant", "3 Prosecutors (Fly, Reinforcements)", "5 Liberators (Reinforcements)"],
        reinforcements: [
            { id: "lib", name: "Liberators", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "pro", name: "Prosecutors", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "sc", name: "Storm Charge", timing: "Once Per Battle · Your Charge Phase", opb: true,
                desc: "Pick a friendly unit not in combat, then that unit can use Charge abilities this turn even if it used a Run ability.",
                tip: "Use on Prosecutors to run across the board then still charge!" },
            { id: "sa", name: "Shield of Azyr", timing: "Once Per Turn · Your Hero Phase", opb: false,
                desc: "Pick a friendly unit, then that unit has Ward (5+) until the start of your next turn.",
                tip: "Usable every turn — best on your General or a unit about to take heavy fire." }
        ],
        regimentAbilities: [
            { id: "swn", name: "Strike Where Needed", timing: "Once Per Battle · Reaction: you declared a Retreat ability", opb: true,
                desc: "No mortal damage is inflicted on that unit by that Retreat. That unit can still use Charge abilities this turn even though it used a Retreat ability.",
                tip: "★ Top pick! Retreat AND charge in the same turn on the small Spearhead board." },
            { id: "bog", name: "Blaze of Glory", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Pick a friendly unit in combat. Until end of phase, each time a model in that unit is slain, make a vengeance roll (D6). On a 4+, inflict 1 mortal damage on an enemy unit in combat with it.",
                tip: "Best on Liberators or Prosecutors when they're being wiped — make the enemy pay!" }
        ],
        enhancements: [
            { id: "hs", name: "Hallowed Scrolls", timing: "Passive", opb: false,
                desc: "Your general has Ward (5+).", tip: "Keeps the Lord-Vigilant alive — good for survivability." },
            { id: "mt", name: "Morrda's Talon", timing: "Passive", opb: false,
                desc: "Your general's Hallowed Greataxe has Crit (Mortal).", tip: "Extra damage from your general — good for aggressive play." },
            { id: "qd", name: "Quicksilver Draught", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Your general has Strike-first this phase.",
                tip: "Use to ensure your General wins a key combat before enemies can swing back." },
            { id: "np", name: "Null Pendant", timing: "Once Per Battle · End of Any Turn", opb: true,
                desc: "Roll a dice for each enemy unit contesting the same objective as your general. On a 2+, subtract that roll from the enemy unit's control score this turn.",
                tip: "Swing objective control when the enemy swarms your key point." }
        ],
        tips: [
            "⚡ Prosecutors: Heralds of Righteousness (passive) — roll 1 extra dice on charge rolls (3D6 added together instead of 2D6)",
            "🛡 Lord-Vigilant: Deliver Judgement (OPB · Combat) — pick a non-Hero within 12\", it fights twice (Strike-last after 1st fight)",
            "🗺 Lord-Vigilant: Plan the Attack (Hero Phase) — pick uncontrolled objective, +1 to hit in combat for friendlies vs enemies contesting it",
            "✨ Lord-Veritant: Cleansing Fires (Hero Phase) — visible enemy within 12\", chant D6: on 3+ roll a dice per model, each 5+ = 1 mortal damage",
            "🐦 Lord-Veritant: Ward (5+) while Gryph-crow token is on the battlefield — don't lose it!",
            "📌 Liberators: +3 control score on objectives wholly in friendly territory",
            "📌 Liberators' Warhammer & Grandhammer both have Crit (Mortal)"
        ]
    },
    gnawfeast: {
        name: "Gnawfeast Clawpack", faction: "Skaven",
        color: "#c8920a", bg: "#0c0900", accent: "#1c1400", emoji: "🐀",
        general: "Clawlord on Gnaw-beast",
        units: ["Grey Seer", "Warlock Engineer", "10 Clanrats (Reinforcements)", "10 Clanrats (Reinforcements)", "3 Rat Ogors"],
        reinforcements: [
            { id: "cr1", name: "Clanrats (unit 1)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "cr2", name: "Clanrats (unit 2)", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "lv", name: "The Lurking Vermintide", timing: "Once Per Battle · Deployment Phase", opb: true,
                desc: "Pick a friendly undeployed unit, then set it up in reserve in the tunnels below. If it hasn't used Gnawhole Ambush by the end of battle round 3, it is destroyed!",
                tip: "Use on a Clanrat unit to deploy from a corner later for surprise objective grabs." },
            { id: "ga", name: "Gnawhole Ambush", timing: "Your Movement Phase (from tunnels)", opb: false,
                desc: "Pick a friendly unit in the tunnels below, then set it up wholly within 6\" of a battlefield corner and more than 9\" from all enemy units.",
                tip: "Deploy at the best moment — ideally onto an unguarded objective!" }
        ],
        regimentAbilities: [
            { id: "wb", name: "Warpstone-Laced Bullets", timing: "Once Per Battle · Your Shooting Phase", opb: true,
                desc: "Pick a ranged weapon a friendly unit is armed with, then that weapon has Crit (Mortal) this phase.",
                tip: "★ Top pick! Use on the Warlock Engineer's Warplock Musket or the Clawlord's Ratling Pistol." },
            { id: "tq", name: "Too Quick to Hit-Hit", timing: "Passive", opb: false,
                desc: "No mortal damage is inflicted on friendly units when they use Retreat abilities.",
                tip: "Lets you safely retreat out of bad combats and reposition Clanrats." }
        ],
        enhancements: [
            { id: "csv", name: "Cloak of Stitched Victories", timing: "Passive", opb: false,
                desc: "Your general has Ward (5+).", tip: "Keeps your Clawlord alive. Tempting but offensive picks may be stronger." },
            { id: "skc", name: "Skryre Connections", timing: "Passive", opb: false,
                desc: "Your general's Ratling Pistol has an Attacks characteristic of 2D6 instead of D6.",
                tip: "Wildly unpredictable but potentially devastating — high ceiling!" },
            { id: "wch", name: "Warpstone Charm", timing: "Passive", opb: false,
                desc: "Subtract 1 from save rolls for enemy units in combat with your general.",
                tip: "Makes your Clawlord punch through armour more reliably — strong offensive choice." },
            { id: "lsh", name: "Lead the Seething Horde", timing: "Reaction: You declared Call for Reinforcements", opb: false,
                desc: "Instead of normal set-up rules, the replacement Clanrat unit can be set up wholly within 13\" of this unit and not in combat.",
                tip: "Reinforce Clanrats mid-board near the action instead of on the board edge — very powerful!" }
        ],
        tips: [
            "🐀 Clanrats: Seething Swarm (passive, end of any turn) — return D3 slain models! Do this every turn.",
            "🐀 Use Clanrats to swarm objectives and tie enemies in combat — numbers = control score",
            "💪 Rat Ogors: Unleashed Warp-Fury (OPB · Combat) — self-inflict D3 mortals, then +1 Attacks to all melee weapons this phase",
            "🔫 Warlock Engineer: MORE-MORE WARP ENERGY! (Reaction to Shoot if not moved) — roll D6: 2+ = Musket Damage becomes 3; 1 = take D3 mortals",
            "🧙 Grey Seer: Will of the Horned Rat (Hero Phase) — pick friendly within 13\", on 3+ add roll to control score",
            "🧙 Grey Seer: Wither (Hero Phase) — pick visible enemy within 13\", cast 2D6, on 6+ inflict D3 mortal damage",
            "⚠️ Clawlord: Cornered Rat (passive) — while damaged, +3 Attacks on Warpforged Halberd. Gets scarier as he takes wounds!"
        ]
    },
    crixxit: {
        name: "Crixxit's Kill-Pack", faction: "Skaven (Clans Eshin)",
        color: "#9b59b6", bg: "#070510", accent: "#120d22", emoji: "🗡️",
        general: "Deathmaster Crixxit",
        units: ["Deathmaster", "5 Gutter Runners (Reinforcements)", "5 Gutter Runners (Reinforcements)", "10 Night Runners (Reinforcements)"],
        rosterNote: "Plus the named general, Deathmaster Crixxit.",
        reinforcements: [
            { id: "gr1", name: "Gutter Runners (unit 1)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "gr2", name: "Gutter Runners (unit 2)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "nr", name: "Night Runners", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "cs", name: "Cloaked in Shadow", timing: "Once Per Turn (Army) · Any Combat Phase", opb: false,
                desc: "Pick a friendly Hero to use this ability, then pick a DIFFERENT friendly unit with 2 or more models as the target. Make a shadow-travel roll of D6. On a 3+, remove the Hero and set them up wholly within 6\" of the target — they can be set up in combat with enemy units already in combat.",
                tip: "★ Teleport Crixxit or the Deathmaster next to a friendly unit (even into an ongoing fight). The Master of Shadows enhancement makes it a 2+." }
        ],
        regimentAbilities: [
            { id: "ss", name: "Way of the Skittering Shade", timing: "Once Per Battle · Your Movement Phase", opb: true,
                desc: "Pick a friendly unit wholly within 6\" of a battlefield edge, then remove it and set it up again wholly within 3\" of a battlefield edge and more than 6\" from all enemy units.",
                tip: "Teleport a unit across the board — great for surprise objective grabs or a Cloaked in Shadow combo." },
            { id: "fc", name: "Way of the Fiendish Claw", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Pick a friendly Hero, then that Hero has Strike-First for the rest of the turn.",
                tip: "★ Give Crixxit Strike-First on top of his 13 attacks for a lethal first swing." }
        ],
        enhancements: [
            { id: "ma", name: "Murderous Acrobatics", timing: "Passive", opb: false,
                desc: "When your general uses the Charge ability, they can pass through enemy models.",
                tip: "Lets Crixxit reach his target through a screen of enemy models." },
            { id: "jas", name: "Just Another Shadow", timing: "Passive", opb: false,
                desc: "While your general is wholly within the combat range of a friendly unit that has 3 or more models, your general has Ward (4+).",
                tip: "Keep Crixxit near Night/Gutter Runners for a 4+ ward — strong survivability!" },
            { id: "ms", name: "Master of Shadows", timing: "Passive", opb: false,
                desc: "When your general uses the Cloaked in Shadow ability, add 1 to the shadow-travel roll (succeeds on 2+ instead of 3+).",
                tip: "★ Makes Cloaked in Shadow almost automatic — pairs perfectly with the battle trait." },
            { id: "ds", name: "Death Screech", timing: "Any Combat Phase", opb: false,
                desc: "Pick an enemy unit within 6\" of your general, then roll a dice. On a 3+, subtract 1 from hit rolls for that unit's attacks for the rest of the turn.",
                tip: "Reduces incoming damage to Crixxit — useful when he's in a dangerous fight." }
        ],
        tips: [
            "🗡️ Deathmaster Crixxit: The Blades of Thirteen Cuts — 13 attacks, Hit 2+, Crit (Mortal)",
            "🎯 Crixxit: Go-Go, Hunt Them Down (Hero Phase) — pick Gutter Runners within 12\", on 3+ +1 to their charge rolls",
            "🛡 Deathmaster: Shadowy Killers — attacks against him FAIL on unmodified hit rolls of 1-4 (only hit on 5+!)",
            "⚔️ Deathmaster: Weeping Blade — Anti-Hero (+1 Rend), Crit (Mortal) — your dedicated hero-killer",
            "💣 Gutter Runners: Bomb Rats (Charge Phase) — if the unit still has its Bomb Rat token, enemy within 9\": on 3+ 1 mortal, on 1-2 lose the token",
            "🌑 Cloaked in Shadow (battle trait): teleport a Hero within 6\" of a FRIENDLY unit (2+ models) — even into combat",
            "💨 Night Runners: Smoke Bombs — if in combat, on 4+ immediately Retreat as if it were your movement phase"
        ]
    },
    sentinels: {
        name: "Sentinels of Embergard", faction: "Cities of Sigmar",
        color: "#5b9bd5", bg: "#0a0f18", accent: "#13202e", emoji: "🛡️",
        general: "Jorvan Kreel",
        units: ["Mallus Forgepriest", "5 Freeguild Gallants", "5 Freeguild Grenadiers (Reinforcements)", "5 Freeguild Grenadiers (Reinforcements)", "Thexa token"],
        reinforcements: [
            { id: "gren1", name: "Freeguild Grenadiers (unit 1)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "gren2", name: "Freeguild Grenadiers (unit 2)", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "rd", name: "Ranger Doctrines", timing: "Once Per Turn (Army) · Reaction: you declared a Fight ability for your general OR a friendly non-Hero unit wholly within 12\" of your general", opb: false,
                desc: "Immediately after that Fight ability resolves, pick a point on the battlefield within 6\" of Jorvan Kreel (your general). Remove the unit using this ability and set it up again within 1\" of that point and not in combat.",
                tip: "★ Strike, then vanish — fight and teleport out of combat to safety or onto an objective." }
        ],
        regimentAbilities: [
            { id: "cqd", name: "Close-Quarters Drill", timing: "Passive", opb: false,
                desc: "Friendly units' ranged weapons have Shoot in Combat, but you must subtract 1 from hit rolls for their shooting attacks while they are in combat.",
                tip: "★ Excellent on Freeguild Grenadiers — keep firing even when tied up (at −1 to hit)." },
            { id: "ctb", name: "Come and Take It, Blaggards!", timing: "Passive", opb: false,
                desc: "Add 5 to the control scores of friendly non-Hero units while they are in combat with any enemy units that have 6 or more models or a Health characteristic of 3 or more.",
                tip: "Wins objectives even while your infantry is being ground down by a big or elite enemy unit." }
        ],
        enhancements: [
            { id: "tk", name: "Throwing Knives", timing: "Any Shooting Phase", opb: false,
                desc: "Pick a visible enemy unit within 10\" of your general, then roll a dice. On a 3+, inflict 1 mortal damage on the target.",
                tip: "Chip damage to finish off a wounded unit or Hero." },
            { id: "tr", name: "Trained Ranger", timing: "Once Per Battle · Your Movement Phase", opb: true,
                desc: "Pick a friendly unit wholly within 6\" of a battlefield edge. Remove it and set it up again wholly within 3\" of a battlefield edge and more than 6\" from all enemy units.",
                tip: "Redeploy a unit across the board to grab an objective or reposition." },
            { id: "hbe", name: "Hot-Blooded Endurance", timing: "Passive", opb: false,
                desc: "Your general can use Charge abilities even if they used a Run or Retreat ability in the same turn, and no mortal damage is inflicted on them by Retreat abilities.",
                tip: "★ Keeps Jorvan slippery — disengage and still charge back in." },
            { id: "bk", name: "Blade of the Kraken", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Double the Attacks characteristic of your general's melee weapons for the rest of the turn.",
                tip: "12 Ranger Blade attacks in a turn — save it for a decisive combat." }
        ],
        tips: [
            "🛡 Mallus Forgepriest: Consecrate the Land (D6, 3+) — friendly units contesting a chosen objective within 12\" gain Ward (5+)",
            "🏃 Jorvan Kreel: Veteran Skirmishers — pick a unit within 12\", on 3+ +2\" Move this turn (that unit can't Run)",
            "🐆 Thexa the Ash Panther: pass the Thexa token to an enemy within 6\" at end of turn; a unit holding it takes D3 mortal, then Jorvan takes the token back",
            "🛡 Freeguild Gallants: Unbreachable Will — if they didn't charge, −1 Rend to an enemy in combat with them",
            "🔫 Freeguild Grenadiers: Ruin-sweeper Arsenal (10\", Rend 2, Wound 2+) and they return as Reinforcements; Cinder and Ash chips mortals at end of turn",
            "⚔️ Jorvan Kreel: Ranger Blades — 6 attacks, Hit 3+, Wound 4+, Rend 1, Damage 2"
        ]
    },
    warpspark: {
        name: "Warpspark Clawpack", faction: "Skaven (Clans Skryre)",
        color: "#8fd14f", bg: "#070d05", accent: "#101b0a", emoji: "☢️",
        general: "Grey Seer",
        units: ["10 Clanrats (Reinforcements)", "10 Clanrats (Reinforcements)", "3 Stormfiends", "Warp Lightning Cannon"],
        reinforcements: [
            { id: "wc1", name: "Clanrats (unit 1)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "wc2", name: "Clanrats (unit 2)", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "tca", name: "Always Three Clawsteps Ahead", timing: "Once Per Phase · Enemy Movement Phase", opb: false,
                desc: "Pick a friendly unit that is not in combat, then that unit can use the Normal Move ability as if it were your movement phase.",
                tip: "★ Reposition during the enemy's turn — snatch objectives late or slip away from a charge." }
        ],
        regimentAbilities: [
            { id: "wla", name: "Warpstone-Laced Armour", timing: "Once Per Battle · Reaction: opponent declared an Attack targeting your Stormfiends", opb: true,
                desc: "Your Stormfiends unit has Ward (5+) for the rest of the turn.",
                tip: "Save it for a big incoming volley or combat swing against the Stormfiends." },
            { id: "esr", name: "Endless Swarm of Rats", timing: "Passive", opb: false,
                desc: "When a friendly Clanrats unit uses its Seething Swarm ability, you can return D6 slain models instead of D3.",
                tip: "★ Doubles your Clanrat regeneration — brutal for holding objectives all game." }
        ],
        enhancements: [
            { id: "sl", name: "Skitterleap", timing: "Your Hero Phase", opb: false,
                desc: "Make a casting roll of 2D6. On a 6+, remove your general and set them up again more than 6\" from all enemy units. They can't use Move abilities in the following movement phase.",
                tip: "Escape a bad spot or jump the Grey Seer onto a key objective." },
            { id: "sm", name: "Skilled Manipulator", timing: "Passive", opb: false,
                desc: "Your general has Ward (4+) while they are within 1\" of any friendly Clanrats units.",
                tip: "★ Keep the Grey Seer hugging a Clanrat blob for a reliable 4+ ward." },
            { id: "sa", name: "Scurry Away", timing: "Any Combat Phase", opb: false,
                desc: "Roll a dice. On a 3+, this unit can immediately use the Retreat ability as if it were your movement phase; if it does, no mortal damage is inflicted on it.",
                tip: "Bail the Grey Seer out of a combat before it gets pinned and killed." },
            { id: "cwl", name: "Cage of Warp Lightning", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Pick a visible enemy unit within 6\" of your general and roll a dice. On a 2+, that enemy unit has Strike-last this phase. On a 1, inflict 1 mortal damage on your general.",
                tip: "Shut down a dangerous enemy unit's swing — usually worth the small risk." }
        ],
        tips: [
            "🧙 Grey Seer: Will of the Horned Rat (Hero Phase) — pick friendly within 13\", on 3+ add roll to control score",
            "🧙 Grey Seer: Wither (Hero Phase) — visible enemy within 13\", cast 2D6, on 6+ inflict D3 mortal damage",
            "🐀 Clanrats: Seething Swarm (end of any turn) — return D3 slain models (D6 with Endless Swarm of Rats!)",
            "💥 Stormfiends: Ratling Cannons (3D6 shots, 15\"), Windlaunchers (Rend 2, D3 dmg), and Shock Gauntlets that explode into D6 hits on a crit",
            "🎯 Warp Lightning Cannon: Warp Lightning Blast (2D6 attacks, 20\") — each hit is a guaranteed 1 mortal, all at one target",
            "⚡ Battle trait works in the ENEMY movement phase — reposition Clanrats/artillery when they least expect it"
        ]
    },
    helforge: {
        name: "Helforge Host", faction: "Helsmiths of Hashut",
        color: "#cc7a33", bg: "#140b04", accent: "#241408", emoji: "🐂",
        general: "War Despot",
        units: ["5 Infernal Cohort — Hashutite Spears (Reinforcements)", "5 Infernal Cohort — Hashutite Spears + Gong Carrier (Reinforcements)", "Tormentor Bombard", "Dominator Engine — Immolation Cannons"],
        reinforcements: [
            { id: "coh1", name: "Infernal Cohort (Hashutite Spears)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "coh2", name: "Infernal Cohort (+ Gong Carrier)", note: "Within 6\" of board edge, in friendly territory, not in combat" },
            { id: "dom", name: "Dominator Engine", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "hdp", name: "Harness Daemonic Power", timing: "Start of each of your hero phases", opb: false,
                desc: "Remove all daemonic power points (DPP) from your units. Gain DPP equal to the current battle round number PLUS 1, then allocate them to friendly units (max 3 each). Unallocated DPP are lost. Many warscroll abilities get stronger the more DPP a unit holds.",
                tip: "★ The whole army revolves around this — pile DPP onto the unit you want to go off this turn. Use coloured dice to track each unit's points." }
        ],
        regimentAbilities: [
            { id: "ga", name: "Grinding Advance", timing: "Once Per Battle · Deployment Phase", opb: true,
                desc: "Pick up to 2 friendly Infernal Cohort units, then each can immediately move up to 3\", but they can't use Charge abilities in the first battle round.",
                tip: "Get your spear wall up the board early to claim mid-table objectives fast." },
            { id: "sb", name: "Suppressive Bombardment", timing: "Once Per Turn · Your Shooting Phase", opb: false,
                desc: "Pick an enemy Infantry unit that took damage this turn from a friendly Tormentor Bombard's shooting. Until the start of your next turn, it rolls 1 fewer dice on charge rolls (minimum 1).",
                tip: "Pairs with the Bombard to blunt a key enemy unit's charge." }
        ],
        enhancements: [
            { id: "sp", name: "Scroll of Petrification", timing: "Once Per Battle · Any Hero Phase", opb: true,
                desc: "For the rest of the turn, your general has Ward (2+) but cannot use abilities or be the target of friendly abilities.",
                tip: "Turn the War Despot to stone to survive a turn of focused fire or a brutal combat." },
            { id: "cd", name: "Chalice of Darkness", timing: "Once Per Battle · Your Shooting Phase", opb: true,
                desc: "Pick a visible enemy unit within 12\" of your general, then inflict D3 mortal damage on it.",
                tip: "A bit of guaranteed ranged damage — good for finishing a wounded unit or Hero." },
            { id: "to", name: "Talisman of Obsidian", timing: "Passive", opb: false,
                desc: "Ignore the first damage point allocated to your general in each phase.",
                tip: "★ Steady survivability — soaks a wound every phase, all game." },
            { id: "abh", name: "Amulet of Burning Hate", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "For the rest of the turn, your general's attacks score critical hits on unmodified hit rolls of 5+.",
                tip: "★ Roughly doubles the Despot's Crit (Mortal) output — nasty on the charge." }
        ],
        tips: [
            "⚡ Daemonic Power: each turn you get DPP = battle round number + 1 — stack up to 3 on one unit to supercharge it",
            "👑 War Despot: Black-Hearted Conqueror — friendly units near him (within 6\", +3\" per DPP) with 0 DPP count as having 1 DPP",
            "🔥 Dominator Engine: Daemonic Strength — +1\" Move and +1 Attack to its weapons PER daemonic power point (up to +3)",
            "💥 Tormentor Bombard: Torrent of Ruinous Energy (30\", 4 attacks, Anti-Cavalry & Anti-Infantry +1 Rend)",
            "💥 Bombard: Ruinous Bombardment (1/turn) — after it shoots one unit, hit that unit + 1 extra per DPP: on 3+, −3 control",
            "🛡 Infernal Cohort: Daemonic Resilience — Ward 6+ at 1 DPP, Ward 5+ at 2, and ignore a wound each phase at 3 DPP",
            "🔔 Gong Carrier: once per battle, remove the Gong token to return D3 slain models to that Cohort"
        ]
    },
    obrTithe: {
        name: "Tithe-Reaper Echelon", faction: "Ossiarch Bonereapers",
        color: "#79c9a0", bg: "#081210", accent: "#12211a", emoji: "💀",
        general: "Mortisan Soulreaper",
        noReinforcements: true,
        units: ["10 Mortek Guard", "10 Mortek Guard (Reserve Contingent)", "5 Kavalos Deathriders", "Gothizzar Harvester"],
        reinforcements: [
            { id: "reserve", reserve: true, name: "Mortek Guard (Reserve Contingent)", note: "Not set up at start. From battle round 3, Contingent Arrival: set up wholly within 3\" of a battlefield edge and more than 6\" from all enemies." }
        ],
        battleTraits: [
            { id: "oc", name: "Ossiarch Commands", timing: "Battle Trait · 2 command points each battle round", opb: false,
                desc: "At the start of the battle round you get 2 Ossiarch command points (each Ossiarch Command costs 1). The same unit can't use more than one Ossiarch Command per phase; unspent points are lost at the end of the round. Your Commands are: your chosen regiment ability, plus Reknit Construct (Soulreaper), Nadirite Assault (Mortek Guard) and Deathrider Wedge (Deathriders).",
                tip: "★ Only 2 points a round — plan them. Nadirite Assault and Deathrider Wedge are the big swings." },
            { id: "rc", name: "Reserve Contingent", timing: "Battle Trait", opb: false,
                desc: "One Mortek Guard unit isn't set up during deployment. From the third battle round onwards it can use Contingent Arrival (your movement phase): set it up wholly within 3\" of a battlefield edge and more than 6\" from all enemy units.",
                tip: "A late-game body to grab an objective or plug a hole." }
        ],
        regimentAbilities: [
            { id: "ir", name: "Impenetrable Ranks", timing: "Once Per Battle · Ossiarch Command · Any Combat Phase", opb: true,
                desc: "Pick a friendly unit to use this ability. Until the end of the phase, add 1 to ward rolls for that unit.",
                tip: "★ Mortek Guard already have Ward (6+) — this makes the anvil genuinely hard to shift." },
            { id: "rr", name: "Re-form Ranks", timing: "Once Per Battle · Ossiarch Command · Your Movement Phase", opb: true,
                desc: "Pick a friendly Mortek Guard unit in combat. That unit can use a Retreat ability this phase without any mortal damage being inflicted on it.",
                tip: "Peel a Mortek block off a bad fight and reset your line." }
        ],
        enhancements: [
            { id: "enw", name: "Empower Nadirite Weapons", timing: "Your Hero Phase", opb: false,
                desc: "Pick a visible friendly Mortek Guard unit wholly within 12\" of your general, then make a casting roll of 2D6. On 5+, until the start of your next turn, add 1 to the Rend of that unit's melee weapons.",
                tip: "Turns a Mortek block into a real threat, not just an anvil." },
            { id: "md", name: "Murderous Drive", timing: "Passive", opb: false,
                desc: "Your general's Soulreaper Scythe has Crit (2 Hits).",
                tip: "More reliable damage from the Soulreaper in melee." },
            { id: "ucm", name: "Unstoppable Commander", timing: "Your Movement Phase", opb: false,
                desc: "Pick a friendly Mortek Guard unit wholly within 12\" of your general, then roll a dice. On 2+, add 3\" to that unit's Move characteristic this phase.",
                tip: "Mortek Guard only move 4\" — this gets them onto an objective they'd never reach." },
            { id: "mp", name: "Marrowpact", timing: "Passive", opb: false,
                desc: "Each time your general uses a Fight ability, after all of their attacks have been resolved, Heal (X) your general, where X is the number of damage points allocated by those attacks.",
                tip: "★ Lets the Soulreaper wade in and self-sustain off the damage it deals." }
        ],
        tips: [
            "💀 Relentless anvil: Mortek Guard have Anti-charge (+1 Rend) — punish anything that charges them",
            "⚔️ Nadirite Assault (Ossiarch Command): Mortek Guard melee weapons get Crit (2 Hits) this phase",
            "🐎 Deathrider Wedge (Ossiarch Command): Deathriders Fly over Infantry on the charge, D3 mortal on a unit they passed (2+)",
            "🦴 Gothizzar Harvester: Bone Harvest — gain a bone-tithe point per enemy slain in combat (max 6)",
            "🦴 Harvester: Repair Construct (end of turn) — spend bone-tithe points to return Mortek Guard models (4+ each)",
            "✨ Mortisan Soulreaper: Drain Vitality (spell, 18\") — on 6+, enemy has −1 to hit until your next turn"
        ]
    },
    obrMortisan: {
        name: "Mortisan Elite", faction: "Ossiarch Bonereapers",
        color: "#c7b17a", bg: "#100e08", accent: "#211d12", emoji: "☠️",
        general: "Mortisan Ossifector",
        noReinforcements: true,
        units: ["3 Immortis Guard", "3 Necropolis Stalkers", "2 Morghast Archai (Heralds of Nagash)"],
        reinforcements: [
            { id: "morghast", reserve: true, name: "Morghast Archai (Heralds of Nagash)", note: "Not set up at start. From battle round 2, Dread Descent: set up anywhere more than 6\" from all enemies." }
        ],
        battleTraits: [
            { id: "rd", name: "Relentless Discipline", timing: "Once Per Phase (Army) · usable in any phase", opb: false,
                desc: "Pick a friendly unit and make a discipline roll of D6 (+1 if it's wholly within 12\" of your general). On 4+, pick one: +2\" Move (movement phase), +1 to charge rolls (charge phase), +1 to wound rolls (combat phase), or Ward (5+) (combat phase).",
                tip: "★ The core OBR engine — once in EVERY phase: +2\" in movement, +1 charge in the charge phase, +1 wound or Ward 5+ in combat." },
            { id: "hon", name: "Heralds of Nagash / Dread Descent", timing: "Battle Trait", opb: false,
                desc: "Your Morghast Archai aren't deployed at the start. From battle round 2, Dread Descent lets you set them up anywhere more than 6\" from all enemy units.",
                tip: "Drop the Morghast onto a weak flank or an unguarded objective." }
        ],
        regimentAbilities: [
            { id: "pc", name: "Peerless Cohesion", timing: "Once Per Turn (Army) · Reaction: you declared Relentless Discipline", opb: false,
                desc: "You can use the Relentless Discipline ability a second time this phase, but you must pick a different target.",
                tip: "★ Doubles your buff output each hero phase — buff two units instead of one." },
            { id: "ig", name: "Immaculate Generalship", timing: "Passive", opb: false,
                desc: "Add 1 to discipline rolls you make.",
                tip: "Makes Relentless Discipline far more reliable (effectively 3+ near the general)." }
        ],
        enhancements: [
            { id: "ss", name: "Shard Storm", timing: "Your Hero Phase", opb: false,
                desc: "Pick a visible enemy within 12\" of your general, cast 2D6. On 7+, roll a dice per model in the target; each 5+ inflicts 1 mortal damage.",
                tip: "A horde-shredder — great into big infantry units." },
            { id: "los", name: "Lode of Saturation", timing: "Passive", opb: false,
                desc: "Subtract 1 from the Rend of melee weapons used for combat attacks that target your general.",
                tip: "Keeps the Ossifector alive against rend-heavy melee." },
            { id: "mc", name: "Mend Constructs", timing: "Your Hero Phase", opb: false,
                desc: "Pick a friendly unit wholly within 12\" of your general, cast 2D6. On 6+, Heal (D3) the target.",
                tip: "Top up your elite constructs — every wound saved matters at this model count." },
            { id: "hot", name: "Helm of Tyranny", timing: "Once Per Battle · End of Your Turn", opb: true,
                desc: "Pick an enemy unit within 12\" of your general and roll a dice. On 3+, subtract 3 from that unit's control score for the rest of the turn.",
                tip: "Swing an objective your way at the moment scoring is checked." }
        ],
        tips: [
            "☠️ Elite & few: every model counts — lean on Ward (6+) everywhere and Relentless Discipline's Ward (5+)",
            "🛡 Immortis Guard: Soulbound Protectors — your general has Ward (5+) while within their combat range",
            "⚔️ Necropolis Stalkers: Switch Aspects — Blade-parry (−1 to hit against them) or Destroyer (no ward vs their attacks)",
            "👼 Morghast Archai: Spirit Weapons hit like a truck (3 attacks, 2+ wound, Rend 2, Damage 3)",
            "✨ Mortisan Ossifector: Refined Creations (5+) — a friendly unit's melee weapons get Crit (2 Hits) until your next turn"
        ]
    },
    obrKavalos: {
        name: "Kavalos Vanguard", faction: "Ossiarch Bonereapers",
        color: "#5fb0c4", bg: "#08131a", accent: "#122430", emoji: "🐎",
        general: "Liege-Kavalos",
        units: ["5 Kavalos Deathriders", "5 Kavalos Deathriders", "8 Teratic Cohort (Reinforcements)"],
        reinforcements: [
            { id: "teratic", name: "Teratic Cohort", note: "Within 6\" of board edge, in friendly territory, not in combat" }
        ],
        battleTraits: [
            { id: "kl", name: "Kavalos Lance", timing: "Once Per Turn (Army) · Your Hero Phase", opb: false,
                desc: "Pick a friendly unit, then for the rest of the turn it can pass across enemy models as if it had Fly.",
                tip: "★ Set up a charge that ignores screens — get the Deathriders where they hurt." },
            { id: "cf", name: "Calculated Feint", timing: "Passive", opb: false,
                desc: "No mortal damage is inflicted on friendly Cavalry units by Retreat abilities.",
                tip: "Disengage your Deathriders freely to line up a better charge." }
        ],
        regimentAbilities: [
            { id: "fr", name: "Feigned Retreat", timing: "Once Per Battle · Your Movement Phase", opb: true,
                desc: "For the rest of the turn, friendly units can use Charge abilities even if they used a Retreat ability in the same turn.",
                tip: "★ Pairs with Calculated Feint — retreat out of a bad fight and slam back in somewhere better, damage-free." },
            { id: "rco", name: "Reinforced Constructs", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Pick a friendly unit, then the target has Ward (5+) for the rest of the turn.",
                tip: "Protect the unit about to take the alpha strike." }
        ],
        enhancements: [
            { id: "ma", name: "Mighty Archaeossian", timing: "Passive", opb: false,
                desc: "Your general has Ward (5+).",
                tip: "Keeps the Liege-Kavalos alive at the front of the wedge." },
            { id: "mb", name: "Murderous Blade", timing: "Passive", opb: false,
                desc: "Your general's Commander's Blade has Crit (2 Hits).",
                tip: "★ More output from the Liege, who already hits hard on the charge." },
            { id: "ic", name: "Imperious Commander", timing: "Your Movement Phase", opb: false,
                desc: "Pick a visible friendly unit wholly within 12\" of your general, then roll a dice. On 3+, add 2\" to the target's Move characteristic for the rest of the turn.",
                tip: "Extra reach on your cavalry to threaten more of the board." },
            { id: "cs", name: "Cold Savagery", timing: "Any Combat Phase", opb: false,
                desc: "If your general has not charged this turn and is in combat, pick a visible friendly unit wholly within 12\" of them and roll a dice. On 3+, add 1 to the Rend of the target's melee weapons (including Companion weapons) for the rest of the turn.",
                tip: "Turn a Deathrider charge from strong into brutal." }
        ],
        tips: [
            "🐎 Fast & hard-hitting: Deathriders Move 10\" and the Liege leads the wedge",
            "⚔️ Kavalos Deathriders: Wheel About — if they charged, on 3+ move up to their Move through enemies (can't end in combat)",
            "🐕 Teratic Cohort: Bone-deep Savagery — must move 3\" into/stay in combat; use them to pin enemies for the charge",
            "👑 Liege-Kavalos: Signal the Advance (Hero Phase) — friendly within 12\", on 3+ +1 to charge rolls",
            "⚔️ Liege-Kavalos: Commander's Blade has Charge (+1 Damage) — always try to hit on the charge"
        ]
    },
    bloodwind: {
        name: "Bloodwind Legion", faction: "Slaves to Darkness",
        color: "#c0392b", bg: "#100708", accent: "#200d10", emoji: "👁️",
        general: "Chaos Lord",
        noReinforcements: true,
        units: ["Chaos Chariot", "5 Chaos Warriors", "5 Chaos Warriors", "5 Chaos Knights"],
        reinforcements: [
            { id: "knights", reserve: true, name: "Chaos Knights (Dreaded Arrival)", note: "Not set up at start. From battle round 2, set up wholly within your territory, within 1\" of a battlefield edge and more than 6\" from all enemies." }
        ],
        battleTraits: [
            { id: "eotg", name: "Eye of the Gods", timing: "Once Per Turn · End of Any Turn", opb: false,
                desc: "Pick ONE friendly unit that is either (a) contesting an objective not controlled by your opponent and not in combat, or (b) destroyed an enemy unit this turn. Roll a D6 on the Eye of the Gods table — that unit gains the matching passive ability, and keeps all abilities gained in previous turns. Gaining the same ability twice is not cumulative.",
                tip: "★ The army's engine — try to trigger it EVERY turn. 1: nothing · 2: Ward (6+) · 3: +1 run rolls · 4: −1 to wound vs it · 5: +1 Rend melee · 6: pick any." },
            { id: "da", name: "Dreaded Arrival", timing: "Battle Trait · Your Movement Phase (from round 2)", opb: false,
                desc: "Your Chaos Knights unit is not set up during deployment. From the second battle round onwards, set it up wholly within your territory, within 1\" of a battlefield edge and more than 6\" from all enemy units.",
                tip: "Hold the Knights back, then drop them where the enemy is weakest." }
        ],
        regimentAbilities: [
            { id: "db", name: "The Dread Banner", timing: "Once Per Battle · Start of the First Battle Round", opb: true,
                desc: "Pick a friendly Chaos Warriors unit, then you can immediately roll on the Eye of the Gods table for that unit.",
                tip: "A free blessing from turn one — front-loads a buff onto your key unit." },
            { id: "fc", name: "Fierce Conquerors", timing: "Passive", opb: false,
                desc: "Add 3 to the control scores of friendly Chaos Warriors units.",
                tip: "★ Turns both 5-model Chaos Warrior units into serious objective-holders." }
        ],
        enhancements: [
            { id: "mok", name: "Mark of Khorne", timing: "Passive", opb: false,
                desc: "Add 1 to the Rend characteristic of your general's melee weapons if they charged in the same turn.",
                tip: "Reaperblade at Rend 2 on the charge — rewards aggression." },
            { id: "mos", name: "Mark of Slaanesh", timing: "Passive", opb: false,
                desc: "Your general has Strike-first.",
                tip: "★ 5 attacks with Crit (Mortal) swinging first, every combat, no roll needed." },
            { id: "mot", name: "Mark of Tzeentch", timing: "Once Per Battle · Your Movement Phase", opb: true,
                desc: "Pick a friendly unit on the battlefield (you cannot pick your general). Remove it and set it up again wholly within 6\" of your general and more than 6\" from all enemy units. It cannot use Move abilities for the rest of the phase.",
                tip: "Teleport Chaos Warriors onto an objective, or rescue a stranded unit." },
            { id: "mon", name: "Mark of Nurgle", timing: "Passive", opb: false,
                desc: "Subtract 1 from wound rolls for combat attacks that target your general.",
                tip: "Keeps the Chaos Lord swinging in the thick of it." }
        ],
        tips: [
            "👁️ EYE OF THE GODS TABLE — 1: Snubbed by the Gods (no effect) · 2: Ward of Tzeentch (Ward 6+) · 3: Grace of Slaanesh (+1 run rolls) · 4: Blessing of Nurgle (−1 to wound vs this unit) · 5: Fury of Khorne (+1 Rend melee) · 6: Champion of Chaos (pick ANY ability from the table)",
            "👑 Chaos Lord: Favoured of the Pantheon (Hero Phase) — roll a dice, on 4+ roll on the Eye of the Gods table for himself",
            "👑 Chaos Lord: Iron-Willed Champion (Any Combat Phase) — pick a friendly unit within 12\" (not himself), on 2+ that unit gets +1 to hit this phase",
            "🐎 Chaos Knights: Impaling Charge — +1 Rend on Cursed Lances if they charged (Rend 2 AND Charge +1 Damage)",
            "⚔️ Chaos Warriors: Bringers of Desolation — +1 to wound vs enemies contesting an objective you do NOT control",
            "🏇 Chaos Chariot: Devastating Charge (Charge Phase) — if it charged, enemy within 1\", on 2+ inflict D3 mortal damage",
            "⚠️ No unit here has the Reinforcements keyword — this army cannot Call for Reinforcements"
        ]
    },
    yndrasta: {
        name: "Yndrasta's Spearhead", faction: "Stormcast Eternals",
        color: "#8fb3ff", bg: "#0a0e1f", accent: "#151d3a", emoji: "🦅",
        general: "Yndrasta, the Celestial Spear",
        noReinforcements: true,
        units: ["5 Vanquishers", "5 Vanquishers", "Knight-Vexillor", "3 Annihilators", "Stormstrike Chariot"],
        reinforcements: [
            { id: "ynd", reserve: true, name: "Yndrasta (Scions of the Storm)", note: "Not set up at start. From battle round 3, Lightning-Strike Arrival (your movement phase): set up anywhere on the battlefield more than 6\" from all enemy units." },
            { id: "ann", reserve: true, name: "Annihilators (Scions of the Storm)", note: "Not set up at start. From battle round 3, Lightning-Strike Arrival (your movement phase): set up anywhere on the battlefield more than 6\" from all enemy units." }
        ],
        battleTraits: [
            { id: "sots", name: "Scions of the Storm", timing: "Battle Trait · Lightning-Strike Arrival: your movement phase, from battle round 3", opb: false,
                desc: "Yndrasta and your Annihilators unit are not set up during the deployment phase. From the third battle round onwards, each can use Lightning-Strike Arrival in your movement phase: set it up anywhere on the battlefield more than 6\" from all enemy units.",
                tip: "Your general starts off the table — you fight rounds 1–2 without her. Plan where she and the Annihilators will drop." }
        ],
        regimentAbilities: [
            { id: "dtb", name: "Drive Them Back", timing: "End of Any Turn", opb: false,
                desc: "Pick any number of friendly units that are both contesting an objective and in combat. Each of those units can make a pile-in move. For each unit that did so, pick an enemy unit within 1\" of it and roll a dice. On a 4+, inflict 1 mortal damage on that enemy unit.",
                tip: "Steady chip damage every turn while you grind on objectives." },
            { id: "dttl", name: "Defend to the Last", timing: "Passive", opb: false,
                desc: "Friendly units have Ward (6+) while they are contesting an objective you control.",
                tip: "★ Great for the Vanquishers and Knight-Vexillor holding your objectives." }
        ],
        enhancements: [
            { id: "tph", name: "The Prime Huntress", timing: "Passive", opb: false,
                desc: "The Damage characteristic of Thengavar is 2D6 for attacks that target a Monster.",
                tip: "Only matters against enemy Monsters — check what your opponent brought." },
            { id: "swtr", name: "Strike with the Tempest's Rage", timing: "Your Movement Phase (as printed on the card)", opb: false,
                desc: "Your general has Strike-first if they charged in the same turn.",
                tip: "Yndrasta charging in after her Lightning-Strike Arrival swings first." },
            { id: "dzr", name: "Dazzling Radiance", timing: "Once Per Battle · Your Movement Phase", opb: true,
                desc: "Pick your general to use this ability if they were set up this phase. You can return 1 slain model to each friendly unit wholly within 12\" of your general.",
                tip: "★ Combo with Lightning-Strike Arrival: drop Yndrasta beside battered Vanquishers in round 3." },
            { id: "hcs", name: "Hawk of the Celestial Skies", timing: "Once Per Battle · Any Combat Phase", opb: true,
                desc: "Until the end of the phase, add 1 to hit rolls for attacks made by friendly units while they are wholly within 12\" of your general.",
                tip: "Save it for the turn your whole force is in one big fight." }
        ],
        tips: [
            "🦅 Yndrasta arrives from round 3 via Lightning-Strike Arrival — anywhere more than 6\" from enemies",
            "🎯 Yndrasta: Thengavar — 12\", 1 attack, Wound 2+, Rend 2, Damage 4, Shoot in Combat (2D6 damage vs Monsters with The Prime Huntress)",
            "🛡 Yndrasta: Champion of Sigmar (OPB · Combat) — Ward (5+) this phase",
            "🚩 Knight-Vexillor: Banner of the Reforged (Hero Phase) — Heal (D3) a unit wholly within 12\" and +3 control until your next turn; he has Control 5 himself",
            "⚡ Vanquishers: Lightning Strikes — +1 Damage with Celestial Greatswords vs units with 5+ models",
            "☄️ Annihilators: Force of a Falling Star — if they charged with an unmodified 8+, a target within 1\" gets Strike-last this turn",
            "🏇 Stormstrike Chariot: Azyr Unleashed — if it charged, enemy within 1\", on 2+ D3 mortal damage",
            "⚠️ No unit here has the Reinforcements keyword — losses are permanent"
        ]
    }
};
const BASE_LISTS = {
    roundStart: [
        { id: "ud", label: "Determine the UNDERDOG — the player with fewer VP (tied, e.g. round 1 = no underdog)" },
        { id: "pr", label: "Who goes first: round 1 the Attacker decides; later rounds roll for PRIORITY — winner decides (tie: whoever went first last round decides)" },
        { id: "tw", label: "Draw the TWIST card and apply it immediately" },
        { id: "bt", label: "Draw BATTLE TACTIC cards up to a hand of 3 (from round 2 you may discard any first)" },
        { id: "sb", label: "Use any 'Start of Battle Round' abilities (active player first)" },
        { id: "nt", label: "⚠️ Seizing the initiative: if the player who went 2nd last round wins priority and goes first, they draw no tactic cards (unless underdog by 5+ VP)", dim: true }
    ],
    hero: [
        { id: "hs", label: "Resolve any 'Start of Turn' abilities" },
        { id: "ha", label: "Use your HERO PHASE abilities — spells, prayers and 'Your Hero Phase' warscroll abilities" },
        { id: "hm", label: "Spearhead has no unbinding and no miscasts — spells and prayers resolve like any other ability", dim: true },
        { id: "hc", label: "No command points in Spearhead — commands come from your battle tactic cards (use OR score, never both)", dim: true }
    ],
    movement: [
        { id: "rf", label: "CALL FOR REINFORCEMENTS (once per turn): a destroyed Reinforcements unit sets up wholly in your territory, wholly within 6\" of a battlefield edge, not in combat — see the Reinforce tab" },
        { id: "mv", label: "NORMAL MOVE: up to the Move characteristic; can't move into combat (units already in combat must Retreat instead)" },
        { id: "rn", label: "RUN: Move + D6\", can't move into combat — that unit can't Shoot or Charge later this turn" },
        { id: "rt", label: "RETREAT (units in combat): take D3 mortal damage, move up to Move through combat ranges but not ending in combat — no Shoot or Charge afterwards" }
    ],
    shooting: [
        { id: "el", label: "SHOOT with units that didn't Run or Retreat — units in combat can only use Shoot in Combat weapons" },
        { id: "sh", label: "Targets must be in range and visible; each model fires all of its ranged weapons" },
        { id: "trr", label: "Cover: −1 to hit vs units behind or wholly on terrain (unless they charged or have Fly). Obscuring (large F&J / S&B terrain): can't be shot if behind or wholly on it, unless it has Fly", dim: true }
    ],
    charge: [
        { id: "ch", label: "CHARGE: unit not in combat that didn't Run or Retreat — roll 2D6\", move through combat ranges, must end within ½\" of a visible enemy unit" },
        { id: "cx", label: "'Roll an additional dice' = 3D6 added together; 'roll 1 fewer dice' = 1D6", dim: true }
    ],
    combat: [
        { id: "cn", label: "First: non-Fight combat-phase abilities — active player, then opponent" },
        { id: "fi", label: "FIGHT: alternate picking units, starting with the active player — every unit in combat (or that charged) must fight if able" },
        { id: "pi", label: "Each Fight: pile in up to 3\" (no further from the target), then attack with ALL melee weapons" },
        { id: "sf", label: "Strike-first units fight before all others, Strike-last after all others; a unit with both has neither", dim: true }
    ],
    endTurn: [
        { id: "oc", label: "OBJECTIVE CONTROL: models ON an objective (even partially) contest it; higher total control score takes it — and keeps it until the opponent takes it" },
        { id: "v1", label: "+1 VP — you control at least 1 objective" },
        { id: "v2", label: "+1 VP — you control 2 or more objectives" },
        { id: "v3", label: "+1 VP — you control MORE objectives than your opponent" },
        { id: "v4", label: "+1 VP per BATTLE TACTIC completed this turn (plus any twist-card VP)" }
    ]
};
// item flags: need = only if this regiment ability / enhancement was chosen;
// when = "any" (also usable in the opponent's turn) | "enemy" (only in the opponent's turn);
// minRound / onlyRound = round gating
const ARMY_EXTRAS = {
    vigilant: {
        hero: [
            { id: "v_pa", label: "🗺 Lord-Vigilant: Plan the Attack — pick an objective you don't control; +1 to hit this turn for friendly combat attacks vs enemies contesting it" },
            { id: "v_cf", label: "✨ Lord-Veritant: Cleansing Fires — visible enemy within 12\", chant D6: on 3+ roll a dice per model in it, each 5+ = 1 mortal damage" },
            { id: "v_sa", label: "🛡 Shield of Azyr (once per turn): a friendly unit has Ward (5+) until the start of your next turn" }
        ],
        movement: [
            { id: "v_rn", label: "⚡ Want a unit to Run AND still charge? Storm Charge (once per battle, charge phase) allows it" },
            { id: "v_swn", need: "swn", label: "🔄 Strike Where Needed (once per battle): a unit that Retreats takes no mortal damage and can still Charge this turn" }
        ],
        charge: [
            { id: "v_sc", label: "⚡ STORM CHARGE (once per battle): a unit not in combat can Charge even though it Ran this turn" },
            { id: "v_hr", label: "🪽 Prosecutors: Heralds of Righteousness — their charge roll is 3D6 instead of 2D6" }
        ],
        combat: [
            { id: "v_dj", when: "any", label: "⚖️ Lord-Vigilant: Deliver Judgement (once per battle) — a non-Hero unit wholly within 12\" fights twice this phase (Strike-last after the first)" },
            { id: "v_bog", need: "bog", when: "any", label: "🔥 Blaze of Glory (once per battle): pick a friendly unit in combat — each model slain this phase, D6 4+ = 1 mortal damage back" },
            { id: "v_qd", need: "qd", when: "any", label: "⚡ Quicksilver Draught (once per battle): your general has Strike-first this phase" }
        ],
        endTurn: [
            { id: "v_np", need: "np", when: "any", label: "📿 Null Pendant (once per battle): roll per enemy unit on your general's objective — 2+ subtracts the roll from its control score" }
        ]
    },
    gnawfeast: {
        hero: [
            { id: "g_wh", label: "🧙 Grey Seer: Will of the Horned Rat — friendly unit wholly within 13\", roll: on 3+ add the roll to its control score until your next turn" },
            { id: "g_wi", label: "🧙 Grey Seer: Wither — visible enemy within 13\", casting roll 2D6: on 6+ D3 mortal damage" }
        ],
        movement: [
            { id: "g_ga", label: "🕳️ GNAWHOLE AMBUSH: a unit in the tunnels sets up wholly within 6\" of a battlefield corner, more than 9\" from all enemies" },
            { id: "g_lv", onlyRound: 3, label: "⚠️ Lurking Vermintide: a unit still in the tunnels at the END of this round is destroyed — bring it in now!" },
            { id: "g_lsh", need: "lsh", label: "🐀 Lead the Seething Horde: a replacement Clanrats unit can set up wholly within 13\" of your general (not in combat) instead of at the edge" }
        ],
        shooting: [
            { id: "g_mw", label: "🔫 Warlock Engineer: More-More Warp Energy! (if it hasn't moved) — 2+: Warplock Musket Damage 3 this phase; 1: D3 mortal damage to itself" },
            { id: "g_sic", label: "🔫 The Clawlord's Ratling Pistol and the Rat Ogors' Warpfire Gun have Shoot in Combat" },
            { id: "g_skc", need: "skc", label: "🔫 Skryre Connections: the Ratling Pistol has 2D6 attacks" },
            { id: "g_wb", need: "wb", label: "☢️ Warpstone-Laced Bullets (once per battle): pick a ranged weapon — it has Crit (Mortal) this phase" }
        ],
        combat: [
            { id: "g_wf", when: "any", label: "💪 Rat Ogors: Unleashed Warp-Fury (once per battle) — take D3 mortal damage, then +1 Attacks to their melee weapons this phase" },
            { id: "g_cr", when: "any", label: "🐀 Clawlord: Cornered Rat — while damaged, +3 Attacks on the Warpforged Halberd" },
            { id: "g_wch", need: "wch", when: "any", label: "💚 Warpstone Charm: −1 to save rolls for enemy units in combat with your general" }
        ],
        endTurn: [
            { id: "g_ss", when: "any", label: "🐀 Clanrats: Seething Swarm (end of ANY turn) — return D3 slain models to each Clanrats unit" }
        ]
    },
    crixxit: {
        hero: [
            { id: "c_gg", label: "🎯 Crixxit: Go-Go, Hunt Them Down — visible Gutter Runners wholly within 12\", roll: on 3+ +1 to their charge rolls this turn" }
        ],
        movement: [
            { id: "c_pos", label: "🗡️ Keep a friendly unit with 2+ models near the fighting — Cloaked in Shadow can teleport a Hero next to it in the combat phase" },
            { id: "c_ss", need: "ss", label: "🌫️ Way of the Skittering Shade (once per battle): unit wholly within 6\" of an edge → set up wholly within 3\" of an edge, more than 6\" from enemies" }
        ],
        shooting: [
            { id: "c_nr", label: "🎯 Night Runners: Slings and Poisoned Stars — 10\", Crit (Auto-wound), Shoot in Combat" }
        ],
        charge: [
            { id: "c_br", label: "💣 Gutter Runners: Bomb Rats (once per turn) — if the unit still has its token, enemy within 9\": 3+ = 1 mortal damage, 1–2 = lose the token" },
            { id: "c_ma", need: "ma", label: "🤸 Murderous Acrobatics: your general can pass through enemy models when charging" }
        ],
        combat: [
            { id: "c_cis", when: "any", label: "🌑 CLOAKED IN SHADOW (once per turn): a Hero + a different friendly unit with 2+ models — D6 3+ (2+ with Master of Shadows): set the Hero up within 6\" of it, even into combat" },
            { id: "c_sk", when: "any", label: "🛡 Deathmaster: Shadowy Killers — attacks against him fail on unmodified hit rolls of 1–4" },
            { id: "c_sb", when: "any", label: "💨 Night Runners: Smoke Bombs (once per turn) — if in combat, on 4+ Retreat at once as if it were your movement phase" },
            { id: "c_fc", need: "fc", when: "any", label: "🗡️ Way of the Fiendish Claw (once per battle): a friendly Hero has Strike-first for the rest of the turn" },
            { id: "c_ds", need: "ds", when: "any", label: "😱 Death Screech: enemy within 6\" of your general, 3+ = −1 to hit for its attacks this turn" }
        ]
    },
    sentinels: {
        hero: [
            { id: "s_vs", label: "🏃 Jorvan Kreel: Veteran Skirmishers — friendly unit wholly within 12\", 3+ = +2\" Move this turn (it can't Run)" },
            { id: "s_cl", label: "🛡 Mallus Forgepriest: Consecrate the Land — objective within 12\", chant D6: on 3+ friendly units contesting it have Ward (5+) this turn" }
        ],
        movement: [
            { id: "s_tr", need: "tr", label: "🧭 Trained Ranger (once per battle): unit wholly within 6\" of an edge → set up wholly within 3\" of an edge, more than 6\" from enemies" }
        ],
        shooting: [
            { id: "s_rs", label: "🔫 Freeguild Grenadiers: Ruin-sweeper Arsenal — 10\", Wound 2+, Rend 2" },
            { id: "s_cqd", need: "cqd", label: "🎯 Close-Quarters Drill: your ranged weapons can Shoot in Combat (−1 to hit while in combat)" },
            { id: "s_tk", need: "tk", when: "any", label: "🗡️ Throwing Knives: visible enemy within 10\" of your general, 3+ = 1 mortal damage" }
        ],
        charge: [
            { id: "s_hbe", need: "hbe", label: "🔥 Hot-Blooded Endurance: Jorvan can Charge even after Running or Retreating (no Retreat mortal damage)" }
        ],
        combat: [
            { id: "s_rd", when: "any", label: "🗡️ RANGER DOCTRINES (once per turn): after your general or a non-Hero within 12\" fights, set that unit up within 1\" of a point within 6\" of Jorvan, not in combat" },
            { id: "s_uw", when: "any", label: "🛡 Freeguild Gallants: Unbreachable Will — if they didn't charge, pick an enemy in combat: −1 Rend for its attacks on them this turn" },
            { id: "s_bk", need: "bk", when: "any", label: "🐙 Blade of the Kraken (once per battle): double your general's melee Attacks for the rest of the turn" }
        ],
        endTurn: [
            { id: "s_tx", when: "any", label: "🐆 Thexa: Jorvan has the token → give it to an enemy within 6\"; an enemy holding it takes D3 mortal damage, then Jorvan takes it back" },
            { id: "s_ca", when: "any", label: "🔥 Grenadiers: Cinder and Ash (once per turn) — enemies on their terrain feature/objective, 3+ = 1 mortal damage each" }
        ]
    },
    warpspark: {
        hero: [
            { id: "w_wh", label: "🧙 Grey Seer: Will of the Horned Rat — friendly unit wholly within 13\", 3+ = add the roll to its control score until your next turn" },
            { id: "w_wi", label: "🧙 Grey Seer: Wither — visible enemy within 13\", casting roll 2D6: 6+ = D3 mortal damage" },
            { id: "w_sl", need: "sl", label: "🌀 Skitterleap: casting roll 2D6, 6+ = set your general up anywhere more than 6\" from enemies (it can't move next movement phase)" }
        ],
        movement: [
            { id: "w_tca", when: "enemy", label: "⚡ ALWAYS THREE CLAWSTEPS AHEAD (once per phase, enemy movement phase): a unit not in combat can make a Normal Move" }
        ],
        shooting: [
            { id: "w_wlc", label: "🎯 Warp Lightning Cannon: Warp Lightning Blast — 2D6 attacks at ONE enemy unit, each hit = 1 mortal damage" },
            { id: "w_sf", label: "💥 Stormfiends: Ratling Cannons (3D6 shots) + Windlaunchers (Rend 2, D3) at 15\"" },
            { id: "w_wla", need: "wla", when: "enemy", label: "🛡 Warpstone-Laced Armour (once per battle): when the Stormfiends are attacked — Ward (5+) for the rest of the turn" }
        ],
        combat: [
            { id: "w_sg", when: "any", label: "⚡ Stormfiends: Shock Gauntlets — each critical hit scores D6 hits (roll to wound for each)" },
            { id: "w_wla2", need: "wla", when: "any", label: "🛡 Warpstone-Laced Armour (once per battle): when the Stormfiends are attacked — Ward (5+) for the rest of the turn" },
            { id: "w_sm", need: "sm", when: "any", label: "🐀 Skilled Manipulator: your general has Ward (4+) while within 1\" of a Clanrats unit" },
            { id: "w_sa", need: "sa", when: "any", label: "🐀 Scurry Away: your general rolls 3+ to Retreat right now, taking no mortal damage" },
            { id: "w_cwl", need: "cwl", when: "any", label: "⚡ Cage of Warp Lightning (once per battle): visible enemy within 6\" — 2+ Strike-last this phase, 1 = 1 mortal damage to your general" }
        ],
        endTurn: [
            { id: "w_ss", when: "any", label: "🐀 Clanrats: Seething Swarm (end of ANY turn) — return D3 slain models (D6 with Endless Swarm of Rats)" }
        ]
    },
    helforge: {
        hero: [
            { id: "h_dpp", label: "⚡ HARNESS DAEMONIC POWER (start of your hero phase, mandatory): clear all DPP, gain battle round + 1 DPP, give out max 3 per unit" },
            { id: "h_gong", when: "any", label: "🔔 Infernal Cohort: Strike the Gongs (once per battle, any hero phase) — remove the Gong Carrier token to return D3 slain models" },
            { id: "h_sp", need: "sp", when: "any", label: "🗿 Scroll of Petrification (once per battle, any hero phase): your general has Ward (2+) but can't use or be targeted by friendly abilities this turn" }
        ],
        shooting: [
            { id: "h_tb", label: "💥 Tormentor Bombard: Torrent of Ruinous Energy — 30\", Anti-Cavalry & Anti-Infantry (+1 Rend); +1 to hit vs 5+ model units more than 12\" away" },
            { id: "h_rb", label: "💥 Ruinous Bombardment (once per turn): if all its attacks hit one unit — that unit + 1 more per DPP within 6\": 3+ = −3 control this turn" },
            { id: "h_de", label: "🔥 Dominator Engine: Immolation Cannons — 8\", 5 attacks (+1 per DPP), Shoot in Combat" },
            { id: "h_sbb", need: "sb", label: "💥 Suppressive Bombardment (once per turn): an Infantry unit damaged by the Bombard rolls 1 fewer charge dice until your next turn" },
            { id: "h_cd", need: "cd", label: "🍷 Chalice of Darkness (once per battle): visible enemy within 12\" of your general takes D3 mortal damage" }
        ],
        combat: [
            { id: "h_ds", when: "any", label: "🔥 Dominator Engine: Daemonic Strength — +1\" Move and +1 Attacks on ALL its weapons per DPP" },
            { id: "h_dr", when: "any", label: "🛡 Infernal Cohort: Daemonic Resilience — 1 DPP Ward (6+), 2 DPP Ward (5+), 3 DPP Ward (5+) and ignore the first damage point each phase" },
            { id: "h_abh", need: "abh", when: "any", label: "🔥 Amulet of Burning Hate (once per battle): your general crits on 5+ for the rest of the turn" }
        ]
    },
    obrTithe: {
        roundStart: [
            { id: "t_cp", label: "💠 Gain 2 Ossiarch command points (unspent ones are lost at the end of the round)" }
        ],
        hero: [
            { id: "t_dv", label: "✨ Mortisan Soulreaper: Drain Vitality — visible enemy within 18\", casting roll 2D6: 6+ = −1 to hit for its attacks until your next turn" },
            { id: "t_enw", need: "enw", label: "⚔️ Empower Nadirite Weapons: Mortek Guard wholly within 12\" of your general, casting roll 5+ = +1 Rend on their melee weapons until your next turn" }
        ],
        movement: [
            { id: "t_rk", label: "🦴 Reknit Construct (Ossiarch Command, 1 CP): unit wholly within 12\", not in combat — Heal (D3), or if undamaged return models worth up to D3 Health" },
            { id: "t_ca", minRound: 3, label: "🔁 CONTINGENT ARRIVAL (round 3+): set up the reserve Mortek Guard wholly within 3\" of a battlefield edge, more than 6\" from enemies" },
            { id: "t_ucm", need: "ucm", label: "🏃 Unstoppable Commander: Mortek Guard wholly within 12\" of your general, 2+ = +3\" Move this phase" },
            { id: "t_rr", need: "rr", label: "🔄 Re-form Ranks (once per battle, Ossiarch Command): a Mortek Guard unit in combat Retreats without mortal damage" }
        ],
        shooting: [
            { id: "t_dh", label: "🦴 Gothizzar Harvester: Death's Head Maw — 12\", 4 attacks" }
        ],
        charge: [
            { id: "t_dw", label: "🐎 Deathrider Wedge (Ossiarch Command, 1 CP): Deathriders pass over enemy Infantry; after charging, an enemy they crossed takes D3 mortal damage on 2+" }
        ],
        combat: [
            { id: "t_na", when: "any", label: "⚔️ Nadirite Assault (Ossiarch Command, 1 CP): a Mortek Guard unit's melee weapons have Crit (2 Hits) this phase" },
            { id: "t_bh", when: "any", label: "🦴 Gothizzar Harvester: Bone Harvest — +1 bone-tithe point per enemy model slain in combat with it (max 6)" },
            { id: "t_mp", need: "mp", when: "any", label: "🩸 Marrowpact: after your general fights, Heal it by the damage it just dealt" },
            { id: "t_ir", need: "ir", when: "any", label: "🛡 Impenetrable Ranks (once per battle, Ossiarch Command): +1 to ward rolls for a unit this phase" }
        ],
        endTurn: [
            { id: "t_rc", when: "any", label: "🦴 Harvester: Repair Construct (end of ANY turn) — Mortek Guard within 6\": roll per bone-tithe point, 4+ returns a model, then reset to 0" }
        ]
    },
    obrMortisan: {
        hero: [
            { id: "m_rc", label: "✨ Mortisan Ossifector: Refined Creations — visible friendly unit wholly within 12\", casting roll 5+ = Crit (2 Hits) on its melee weapons until your next turn" },
            { id: "m_ss", need: "ss", label: "💥 Shard Storm: visible enemy within 12\", casting roll 7+ = roll per model, each 5+ = 1 mortal damage" },
            { id: "m_mc", need: "mc", label: "🩹 Mend Constructs: visible friendly unit wholly within 12\", casting roll 6+ = Heal (D3)" }
        ],
        movement: [
            { id: "m_dd", minRound: 2, label: "👼 DREAD DESCENT (round 2+): set up the Morghast Archai anywhere more than 6\" from all enemies" },
            { id: "m_rdm", label: "💠 RELENTLESS DISCIPLINE (once per phase): discipline roll D6 (+1 within 12\" of your general) — 4+ = +2\" Move for a unit" }
        ],
        charge: [
            { id: "m_rdc", label: "💠 RELENTLESS DISCIPLINE (once per phase): 4+ = +1 to charge rolls for a unit this phase" }
        ],
        combat: [
            { id: "m_rdf", when: "any", label: "💠 RELENTLESS DISCIPLINE (once per phase): 4+ = +1 to wound OR Ward (5+) for a unit this phase (Peerless Cohesion: a second, different unit)" },
            { id: "m_sa", when: "any", label: "⚔️ Necropolis Stalkers: Switch Aspects — Blade-parry (−1 to hit vs them) or Destroyer (no ward rolls vs their attacks)" },
            { id: "m_sp", when: "any", label: "🛡 Immortis Guard: your general has Ward (5+) while within their combat range" }
        ],
        endTurn: [
            { id: "m_hot", need: "hot", label: "👑 Helm of Tyranny (once per battle, end of your turn): enemy within 12\" of your general, 3+ = −3 control this turn — before scoring!" }
        ]
    },
    obrKavalos: {
        hero: [
            { id: "k_kl", label: "🕊️ KAVALOS LANCE (once per turn): a friendly unit can pass across enemy models as if it had Fly this turn" },
            { id: "k_sa", label: "📣 Liege-Kavalos: Signal the Advance — visible friendly unit wholly within 12\", 3+ = +1 to charge rolls this turn" }
        ],
        movement: [
            { id: "k_bs", when: "any", label: "🐕 Teratic Cohort: Bone-deep Savagery (ANY movement phase) — move 3\"; must move into combat if it can, and must stay in combat if it was" },
            { id: "k_fr", need: "fr", label: "🔄 Feigned Retreat (once per battle): your units can Charge this turn even after Retreating" },
            { id: "k_ic", need: "ic", label: "🏃 Imperious Commander: visible friendly unit wholly within 12\" of your general, 3+ = +2\" Move this turn" }
        ],
        combat: [
            { id: "k_wa", label: "🐎 Kavalos Deathriders: Wheel About — if they charged, 3+ = move up to their Move through enemy combat ranges (not ending in combat)" },
            { id: "k_cs", need: "cs", when: "any", label: "⚔️ Cold Savagery: your general in combat and didn't charge — friendly unit wholly within 12\", 3+ = +1 Rend melee (incl. Companion) this turn" },
            { id: "k_rco", need: "rco", when: "any", label: "🛡 Reinforced Constructs (once per battle): a friendly unit has Ward (5+) for the rest of the turn" }
        ]
    },
    bloodwind: {
        roundStart: [
            { id: "b_db", need: "db", onlyRound: 1, label: "🚩 The Dread Banner (start of round 1): roll on the Eye of the Gods table for a Chaos Warriors unit" }
        ],
        hero: [
            { id: "b_fp", label: "👑 Chaos Lord: Favoured of the Pantheon — roll a dice, 4+ = roll on the Eye of the Gods table for him" }
        ],
        movement: [
            { id: "b_da", minRound: 2, label: "🐴 DREADED ARRIVAL (round 2+): set up the Chaos Knights wholly in your territory, within 1\" of a battlefield edge, more than 6\" from enemies" },
            { id: "b_mot", need: "mot", label: "🔮 Mark of Tzeentch (once per battle): a friendly unit (not the general) sets up again wholly within 6\" of the general, more than 6\" from enemies" },
            { id: "b_obj", label: "👁️ Park a unit on an objective your opponent doesn't control (and out of combat) to trigger Eye of the Gods at the end of the turn" }
        ],
        charge: [
            { id: "b_dc", label: "🏇 Chaos Chariot: Devastating Charge — if it charged, enemy within 1\", 2+ = D3 mortal damage" }
        ],
        combat: [
            { id: "b_ic", label: "🐎 Chaos Knights: Impaling Charge — Cursed Lances get +1 Rend if they charged (plus Charge +1 Damage)" },
            { id: "b_mok", need: "mok", label: "🩸 Mark of Khorne: +1 Rend on your general's melee weapons if they charged this turn" },
            { id: "b_mos", need: "mos", when: "any", label: "💜 Mark of Slaanesh: your general has Strike-first" },
            { id: "b_bd", when: "any", label: "⚔️ Chaos Warriors: Bringers of Desolation — +1 to wound vs units contesting an objective you don't control" },
            { id: "b_iw", when: "any", label: "👑 Chaos Lord: Iron-willed Champion — friendly unit wholly within 12\" (not him), 2+ = +1 to hit this phase" }
        ],
        endTurn: [
            { id: "b_eotg", when: "any", label: "👁️ EYE OF THE GODS (once per turn, end of ANY turn): a unit on an objective your opponent doesn't control (not in combat), or that destroyed a unit this turn, rolls D6 on the table" }
        ]
    },
    yndrasta: {
        hero: [
            { id: "y_kv", label: "🚩 Knight-Vexillor: Banner of the Reforged — friendly unit wholly within 12\": Heal (D3) and +3 control until your next turn" }
        ],
        movement: [
            { id: "y_lsa", minRound: 3, label: "🌩️ LIGHTNING-STRIKE ARRIVAL (round 3+): set up Yndrasta and/or the Annihilators anywhere more than 6\" from all enemies" },
            { id: "y_dz", need: "dzr", minRound: 3, label: "✨ Dazzling Radiance (once per battle): Yndrasta was set up this phase → return 1 slain model to each friendly unit wholly within 12\" of her" }
        ],
        shooting: [
            { id: "y_th", label: "🎯 Yndrasta: Thengavar — 12\", Wound 2+, Rend 2, Damage 4, Shoot in Combat" },
            { id: "y_tph", need: "tph", label: "🎯 The Prime Huntress: Thengavar does 2D6 damage against Monsters" },
            { id: "y_sb", label: "🏹 Stormstrike Chariot: Great Stormbow — 18\", 2 attacks" }
        ],
        charge: [
            { id: "y_fs", label: "☄️ Annihilators: Force of a Falling Star — charged with an unmodified 8+? An enemy within 1\" has Strike-last this turn" },
            { id: "y_au", label: "🏇 Stormstrike Chariot: Azyr Unleashed — if it charged, enemy within 1\", 2+ = D3 mortal damage" }
        ],
        combat: [
            { id: "y_tr", need: "swtr", label: "🌪️ Strike with the Tempest's Rage: Yndrasta has Strike-first if she charged this turn" },
            { id: "y_ls", when: "any", label: "⚡ Vanquishers: Lightning Strikes — +1 Damage vs units with 5+ models" },
            { id: "y_cs", when: "any", label: "🛡 Yndrasta: Champion of Sigmar (once per battle) — Ward (5+) this phase" },
            { id: "y_hcs", need: "hcs", when: "any", label: "🦅 Hawk of the Celestial Skies (once per battle): +1 to hit for friendly units wholly within 12\" of your general this phase" }
        ],
        endTurn: [
            { id: "y_dtb", need: "dtb", when: "any", label: "⚔️ Drive Them Back (end of ANY turn): units contesting an objective AND in combat pile in; each then picks an enemy within 1\", 4+ = 1 mortal damage" }
        ]
    }
};
function needOk(item, player) { return !item.need || (!!player && (player.regiment === item.need || player.enhancement === item.need)); }
function roundOk(item, round) {
    if (item.onlyRound && round !== item.onlyRound)
        return false;
    if (item.minRound && round < item.minRound)
        return false;
    return true;
}
function getOwnExtras(phaseId, armyKey, player, round) {
    const list = (ARMY_EXTRAS[armyKey] && ARMY_EXTRAS[armyKey][phaseId]) || [];
    return list.filter(i => i.when !== "enemy" && needOk(i, player) && roundOk(i, round));
}
function getChecklist(phaseId, armyKey, player, round) {
    return [...(BASE_LISTS[phaseId] || []).map(i => (Object.assign({}, i))), ...getOwnExtras(phaseId, armyKey, player, round)];
}
function getOppList(phaseId, armyKey, player, round) {
    const list = (ARMY_EXTRAS[armyKey] && ARMY_EXTRAS[armyKey][phaseId]) || [];
    return list.filter(i => (i.when === "any" || i.when === "enemy") && needOk(i, player) && roundOk(i, round));
}
const TURN_PHASES = [
    { id: "hero", label: "Hero Phase", short: "Hero", icon: "✨" },
    { id: "movement", label: "Movement", short: "Move", icon: "👣" },
    { id: "shooting", label: "Shooting", short: "Shoot", icon: "🏹" },
    { id: "charge", label: "Charge", short: "Charge", icon: "💨" },
    { id: "combat", label: "Combat", short: "Fight", icon: "⚔️" },
    { id: "endTurn", label: "End of Turn", short: "End", icon: "🏆" }
];
const ROUND_START = { id: "roundStart", label: "Round Start", icon: "🎲" };
const other = id => (id === "p1" ? "p2" : "p1");
const pName = id => (id === "p1" ? "Player 1" : "Player 2");
const blankPlayer = () => ({ armyKey: null, regiment: null, enhancement: null, vp: 0, reinf: {}, used: {} });
const UNIT_CARDS = {
    vigilant: [
        { name: "Lord-Vigilant on Gryph-stalker", role: "GENERAL", kw: "Hero, Cavalry",
            move: '12"', save: "3+", health: 8, control: 2,
            melee: [
                { n: "Hallowed Greataxe", a: 5, hit: "3+", wnd: "3+", rnd: 2, dmg: 2, ab: "–" },
                { n: "Gryph-stalker's Beak and Talons", a: 3, hit: "4+", wnd: "3+", rnd: 1, dmg: 2, ab: "Companion" }
            ],
            abilities: [
                { name: "Deliver Judgement", t: "Once Per Battle · Any Combat Phase", d: "Pick a friendly non-Hero unit wholly within 12\". It can use 2 Fight abilities this phase (Strike-last after the first)." },
                { name: "Plan the Attack", t: "Your Hero Phase", d: "Pick an objective you don't control. +1 to hit for friendly combat attacks vs enemies contesting it, rest of turn." }
            ] },
        { name: "Lord-Veritant", role: "UNIT", kw: "Hero, Priest, Infantry",
            move: '5"', save: "3+", health: 6, control: 2,
            melee: [
                { n: "Staff of Abjuration", a: 1, hit: "3+", wnd: "3+", rnd: 1, dmg: 3, ab: "–" },
                { n: "Judgement Blade", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: "D3", ab: "Anti-Wizard (+1 Rend), Anti-Priest (+1 Rend)" }
            ],
            abilities: [
                { name: "Cleansing Fires", t: "Your Hero Phase", d: "Pick visible enemy within 12\", chant D6. On 3+, roll a dice per model in target; each 5+ = 1 mortal damage." },
                { name: "Sense Unholy Sorcery", t: "Passive", d: "Gryph-crow is a token. This unit has Ward (5+) while it's on the battlefield. Unmodified ward roll of 1 removes the Gryph-crow." }
            ] },
        { name: "Prosecutors", role: "UNIT", kw: "Infantry, Fly, Reinforcements",
            move: '12"', save: "3+", health: 2, control: 1,
            ranged: [{ n: "Stormcall Javelin", rng: '10"', a: 1, hit: "3+", wnd: "3+", rnd: 1, dmg: "D3", ab: "–" }],
            melee: [{ n: "Stormcall Javelin", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" }],
            abilities: [
                { name: "Heralds of Righteousness", t: "Passive", d: "When you make a charge roll for this unit, roll 1 additional dice." },
                { name: "Skirmishers", t: "Passive", d: "This unit has a coherency range of 2\"." }
            ] },
        { name: "Liberators", role: "UNIT", kw: "Infantry, Reinforcements",
            move: '5"', save: "3+", health: 2, control: 1,
            melee: [
                { n: "Warhammer", a: 2, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "Crit (Mortal)" },
                { n: "Grandhammer", a: 2, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "Crit (Mortal)" }
            ],
            abilities: [{ name: "Stalwart Defenders", t: "Passive", d: "Add 3 to this unit's control score while it contests an objective wholly within friendly territory." }],
            note: "4 Liberators with Warhammer, 1 with Grandhammer." }
    ],
    gnawfeast: [
        { name: "Clawlord on Gnaw-beast", role: "GENERAL", kw: "Hero, Cavalry, Ward (6+)",
            move: '9"', save: "4+", health: 7, control: 2,
            ranged: [{ n: "Ratling Pistol", rng: '10"', a: "D6", hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "Crit (Auto-wound), Shoot in Combat" }],
            melee: [
                { n: "Warpforged Halberd", a: 5, hit: "3+", wnd: "4+", rnd: 1, dmg: 2, ab: "–" },
                { n: "Gnaw-beast's Chisel Fangs", a: 4, hit: "4+", wnd: "3+", rnd: 1, dmg: "D3", ab: "Companion" }
            ],
            abilities: [{ name: "Cornered Rat", t: "Passive", d: "While this unit is damaged, add 3 to the Attacks characteristic of its Warpforged Halberd." }] },
        { name: "Grey Seer", role: "UNIT", kw: "Hero, Wizard, Infantry",
            move: '6"', save: "6+", health: 5, control: 2,
            melee: [{ n: "Warpstone Staff", a: 3, hit: "4+", wnd: "4+", rnd: 1, dmg: "D3", ab: "–" }],
            abilities: [
                { name: "Will of the Horned Rat", t: "Your Hero Phase", d: "Pick a friendly unit wholly within 13\", roll a dice. On 3+, add the roll to that unit's control score until your next turn." },
                { name: "Wither", t: "Your Hero Phase", d: "Pick a visible enemy within 13\", cast 2D6. On 6+, inflict D3 mortal damage on the target." }
            ] },
        { name: "Warlock Engineer", role: "UNIT", kw: "Hero, Infantry",
            move: '6"', save: "5+", health: 5, control: 2,
            ranged: [{ n: "Warplock Musket", rng: '24"', a: 2, hit: "3+", wnd: "3+", rnd: 2, dmg: "D3", ab: "Crit (Auto-wound)" }],
            melee: [{ n: "Warpforged Dagger", a: 3, hit: "4+", wnd: "4+", rnd: "–", dmg: 2, ab: "–" }],
            abilities: [{ name: "More-More Warp Energy!", t: "Reaction: declared Shoot & hasn't moved this turn", d: "Roll a dice. On 2+, set this weapon's Warplock Musket Damage to 3 this phase. On 1, inflict D3 mortal damage on this unit." }] },
        { name: "Clanrats", role: "UNIT", kw: "Infantry, Reinforcements",
            move: '6"', save: "5+", health: 1, control: 1,
            melee: [{ n: "Rusty Blade", a: 2, hit: "4+", wnd: "5+", rnd: "–", dmg: 1, ab: "–" }],
            abilities: [{ name: "Seething Swarm", t: "End of Any Turn", d: "You can return D3 slain models to this unit." }],
            note: "Two units of 10 in this Spearhead." },
        { name: "Rat Ogors", role: "UNIT", kw: "Infantry",
            move: '6"', save: "5+", health: 4, control: 1,
            ranged: [{ n: "Warpfire Gun", rng: '10"', a: "2D6", hit: "2+", wnd: "4+", rnd: 2, dmg: 1, ab: "Shoot in Combat" }],
            melee: [{ n: "Claws, Blades and Fangs", a: 5, hit: "4+", wnd: "3+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [{ name: "Unleashed Warp-Fury", t: "Once Per Battle · Any Combat Phase", d: "Inflict D3 mortal damage on this unit. Then, add 1 to the Attacks of its melee weapons this phase." }],
            note: "2 Rat Ogors with Claws/Blades/Fangs; 1 also armed with a Warpfire Gun." }
    ],
    crixxit: [
        { name: "Deathmaster Crixxit", role: "GENERAL", kw: "Hero, Infantry, Ward (5+)",
            move: '7"', save: "5+", health: 6, control: 2,
            melee: [{ n: "The Blades of Thirteen Cuts", a: 13, hit: "2+", wnd: "4+", rnd: 1, dmg: 1, ab: "Crit (Mortal)" }],
            abilities: [{ name: "Go-Go, Hunt Them Down", t: "Your Hero Phase", d: "Pick a visible friendly Gutter Runners unit wholly within 12\" of this unit, then roll a dice. On a 3+, add 1 to charge rolls for the target for the rest of the turn." }] },
        { name: "Deathmaster", role: "UNIT", kw: "Hero, Infantry, Ward (6+)",
            move: '7"', save: "5+", health: 5, control: 2,
            melee: [{ n: "Weeping Blade", a: 5, hit: "3+", wnd: "4+", rnd: 1, dmg: "D3", ab: "Anti-Hero (+1 Rend), Crit (Mortal)" }],
            abilities: [{ name: "Shadowy Killers", t: "Passive", d: "If the unmodified hit roll for an attack that targets this unit is 1–4, the attack fails and the attack sequence ends." }] },
        { name: "Gutter Runners", role: "UNIT", kw: "Infantry, Reinforcements, Ward (6+)",
            move: '7"', save: "6+", health: 1, control: 1,
            melee: [{ n: "Eshin Specialist Blades", a: 3, hit: "3+", wnd: "4+", rnd: 1, dmg: 1, ab: "Crit (Mortal)" }],
            abilities: [{ name: "Bomb Rats", t: "Once Per Turn (Army) · Your Charge Phase", d: "Only usable if this unit has its Bomb Rat token. Pick an enemy unit within 9\" and roll a dice. On a 3+, inflict 1 mortal damage on the target; on a 1-2, remove this unit's Bomb Rat token." }],
            note: "Two units of 5; each starts with 1 Bomb Rat token." },
        { name: "Night Runners", role: "UNIT", kw: "Infantry, Reinforcements, Ward (6+)",
            move: '7"', save: "6+", health: 1, control: 1,
            ranged: [{ n: "Slings and Poisoned Stars", rng: '10"', a: 2, hit: "4+", wnd: "4+", rnd: "–", dmg: 1, ab: "Crit (Auto-wound), Shoot in Combat" }],
            melee: [{ n: "Poisoned Blades", a: 2, hit: "4+", wnd: "5+", rnd: "–", dmg: 1, ab: "Crit (Mortal)" }],
            abilities: [{ name: "Smoke Bombs", t: "Once Per Turn (Army) · Any Combat Phase", d: "Only usable if this unit is in combat. Roll a dice. On a 4+, this unit can immediately use the Retreat ability as if it were your movement phase." }] }
    ],
    sentinels: [
        { name: "Jorvan Kreel", role: "GENERAL", kw: "Hero, Infantry",
            move: '6"', save: "4+", health: 5, control: 2,
            melee: [{ n: "Ranger Blades", a: 6, hit: "3+", wnd: "4+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [
                { name: "Veteran Skirmishers", t: "Your Hero Phase", d: "Pick a friendly unit wholly within 12\" of this unit, then roll a dice. On a 3+, for the rest of the turn add 2\" to the target's Move characteristic, but it cannot use Run abilities." },
                { name: "Prowling Ash Panther", t: "End of Any Turn", d: "If this unit has the Thexa token, give it to an enemy unit within 6\". If an enemy unit has the Thexa token, inflict D3 mortal damage on it. Then, give this unit the Thexa token." }
            ] },
        { name: "Mallus Forgepriest", role: "UNIT", kw: "Hero, Priest, Infantry",
            move: '5"', save: "4+", health: 5, control: 2,
            melee: [{ n: "Sigmarite Warhammer", a: 4, hit: "4+", wnd: "3+", rnd: 1, dmg: "D3", ab: "–" }],
            abilities: [{ name: "Consecrate the Land", t: "Your Hero Phase (prayer)", d: "Pick an objective within 12\" of this unit, then make a chanting roll of D6. On a 3+, for the rest of the turn friendly units have Ward (5+) while contesting that objective." }] },
        { name: "Freeguild Gallants", role: "UNIT", kw: "Infantry",
            move: '5"', save: "3+", health: 2, control: 1,
            melee: [{ n: "Weapons of Gallantry", a: 2, hit: "3+", wnd: "4+", rnd: 1, dmg: 1, ab: "–" }],
            abilities: [{ name: "Unbreachable Will", t: "Any Combat Phase", d: "If this unit has not charged this turn, pick an enemy unit in combat with it. For the rest of the turn, subtract 1 from the Rend of that unit's weapons for attacks that target this unit." }] },
        { name: "Freeguild Grenadiers", role: "UNIT", kw: "Infantry, Reinforcements",
            move: '5"', save: "4+", health: 1, control: 1,
            ranged: [{ n: "Ruin-sweeper Arsenal", rng: '10"', a: 1, hit: "4+", wnd: "2+", rnd: 2, dmg: 1, ab: "–" }],
            melee: [{ n: "Grenadier Bardich", a: 2, hit: "4+", wnd: "4+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [{ name: "Cinder and Ash", t: "Once Per Turn (Army) · End of Any Turn", d: "Pick up to 1 terrain feature and up to 1 objective this unit is contesting, then pick any enemy units also contesting them. Roll a dice for each target — on a 3+, inflict 1 mortal damage on it." }],
            note: "Two units of 5." }
    ],
    warpspark: [
        { name: "Grey Seer", role: "GENERAL", kw: "Hero, Wizard, Infantry",
            move: '6"', save: "6+", health: 5, control: 2,
            melee: [{ n: "Warpstone Staff", a: 3, hit: "4+", wnd: "4+", rnd: 1, dmg: "D3", ab: "–" }],
            abilities: [
                { name: "Will of the Horned Rat", t: "Your Hero Phase", d: "Pick a friendly unit wholly within 13\", roll a dice. On 3+, add the roll to that unit's control score until your next turn." },
                { name: "Wither", t: "Your Hero Phase", d: "Pick a visible enemy within 13\", cast 2D6. On 6+, inflict D3 mortal damage on the target." }
            ],
            note: "Same Grey Seer warscroll as the Gnawfeast list." },
        { name: "Clanrats", role: "UNIT", kw: "Infantry, Reinforcements",
            move: '6"', save: "5+", health: 1, control: 1,
            melee: [{ n: "Rusty Blade", a: 2, hit: "4+", wnd: "5+", rnd: "–", dmg: 1, ab: "–" }],
            abilities: [{ name: "Seething Swarm", t: "End of Any Turn", d: "You can return D3 slain models to this unit (D6 with Endless Swarm of Rats)." }],
            note: "Two units of 10." },
        { name: "Stormfiends", role: "UNIT", kw: "Infantry",
            move: '6"', save: "4+", health: 6, control: 2,
            ranged: [
                { n: "Ratling Cannons", rng: '15"', a: "3D6", hit: "4+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" },
                { n: "Windlaunchers", rng: '15"', a: 3, hit: "4+", wnd: "3+", rnd: 2, dmg: "D3", ab: "–" }
            ],
            melee: [
                { n: "Shock Gauntlets", a: 4, hit: "4+", wnd: "2+", rnd: 1, dmg: 2, ab: "–" },
                { n: "Clubbing Blows", a: 4, hit: "4+", wnd: "2+", rnd: "–", dmg: 2, ab: "–" }
            ],
            abilities: [{ name: "Shock Gauntlets", t: "Passive", d: "Each time an attack made with this unit's Shock Gauntlets scores a critical hit, that attack scores D6 hits instead of 1 (make a wound roll for each hit)." }],
            note: "1 with Shock Gauntlets; 1 with Windlaunchers + Clubbing Blows; 1 with Ratling Cannons + Clubbing Blows." },
        { name: "Warp Lightning Cannon", role: "UNIT", kw: "War Machine",
            move: '3"', save: "4+", health: 8, control: 2,
            ranged: [{ n: "Warp Lightning Blast", rng: '20"', a: "2D6", hit: "4+", wnd: "–", rnd: "–", dmg: "see", ab: "See ability" }],
            melee: [{ n: "Crew's Teeth and Knives", a: "D6", hit: "4+", wnd: "5+", rnd: "–", dmg: 1, ab: "–" }],
            abilities: [{ name: "Warp Lightning Blast", t: "Passive", d: "Each attack with this weapon in a phase must target the SAME enemy unit. Each hit inflicts 1 mortal damage on the target and the attack sequence ends." }] }
    ],
    helforge: [
        { name: "War Despot", role: "GENERAL", kw: "Hero, Infantry",
            move: '4"', save: "3+", health: 6, control: 2,
            melee: [{ n: "Daemonflame Glaive", a: 5, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "Crit (Mortal)" }],
            abilities: [{ name: "Black-Hearted Conqueror", t: "Passive", d: "While this unit has any DPP, friendly units with 0 DPP count as having 1 DPP while wholly within 6\" of and visible to it. Add 3\" to this range for each DPP this unit has." }] },
        { name: "Dominator Engine (Immolation Cannons)", role: "UNIT", kw: "War Machine, Reinforcements",
            move: '6"', save: "2+", health: 10, control: 2,
            ranged: [{ n: "Immolation Cannons", rng: '8"', a: 5, hit: "2+", wnd: "4+", rnd: 1, dmg: "D3", ab: "Shoot in Combat" }],
            melee: [{ n: "Horns and Pummelling Strikes", a: 3, hit: "4+", wnd: "3+", rnd: 1, dmg: "D3", ab: "–" }],
            abilities: [{ name: "Daemonic Strength", t: "Passive (DPP)", d: "For each daemonic power point this unit has: add 1\" to its Move, and add 1 to the Attacks characteristic of its weapons." }] },
        { name: "Tormentor Bombard", role: "UNIT", kw: "War Machine",
            move: '4"', save: "3+", health: 8, control: 2,
            ranged: [{ n: "Torrent of Ruinous Energy", rng: '30"', a: 4, hit: "3+", wnd: "3+", rnd: 1, dmg: "D3", ab: "Anti-Cavalry (+1 Rend), Anti-Infantry (+1 Rend)" }],
            melee: [{ n: "Artillerist Weapons", a: 3, hit: "4+", wnd: "4+", rnd: "–", dmg: 1, ab: "–" }],
            abilities: [
                { name: "Calculated Trajectory", t: "Passive", d: "Add 1 to hit rolls for this unit's shooting attacks that target an enemy unit with 5+ models that is more than 12\" away." },
                { name: "Ruinous Bombardment", t: "Once Per Turn (Army) · Your Shooting Phase", d: "If this unit shot and all its attacks hit one unit, that unit is the target; also pick enemy units within 6\" of it equal to this unit's DPP. Roll a dice per target — on 3+, subtract 3 from that unit's control score for the rest of the turn." }
            ] },
        { name: "Infernal Cohort (Hashutite Spears)", role: "UNIT", kw: "Infantry, Reinforcements",
            move: '4"', save: "3+", health: 1, control: 1,
            melee: [{ n: "Hashutite Spear", a: 2, hit: "3+", wnd: "4+", rnd: "–", dmg: 1, ab: "Anti-charge (+1 Rend)" }],
            abilities: [
                { name: "Daemonic Resilience", t: "Passive (DPP)", d: "1 DPP: Ward (6+). 2 DPP: Ward (5+). 3 DPP: Ward (5+) and ignore the first damage point allocated to this unit in each phase." },
                { name: "Strike the Gongs", t: "Once Per Battle · Any Hero Phase", d: "The unit's Gong Carrier (if any) is a token. Remove it to return D3 slain models to this unit." }
            ],
            note: "One unit has a Gong Carrier (for Strike the Gongs)." }
    ],
    obrTithe: [
        { name: "Mortisan Soulreaper", role: "GENERAL", kw: "Hero, Wizard, Infantry, Ward (6+)",
            move: '5"', save: "4+", health: 5, control: 2,
            melee: [{ n: "Soulreaper Scythe", a: 3, hit: "4+", wnd: "3+", rnd: 2, dmg: 2, ab: "–" }],
            abilities: [
                { name: "Drain Vitality", t: "Your Hero Phase (spell)", d: "Pick a visible enemy within 18\", cast 2D6. On 6+, subtract 1 from hit rolls for that unit's attacks until your next turn." },
                { name: "Reknit Construct", t: "Ossiarch Command · Your Movement Phase", d: "Pick a friendly unit wholly within 12\" and not in combat. Heal (D3); if undamaged, instead return slain models with combined Health D3 or less." }
            ] },
        { name: "Mortek Guard", role: "UNIT", kw: "Infantry, Ward (6+)",
            move: '4"', save: "4+", health: 1, control: 1,
            melee: [{ n: "Nadirite Spear", a: 2, hit: "3+", wnd: "4+", rnd: "–", dmg: 1, ab: "Anti-charge (+1 Rend)" }],
            abilities: [{ name: "Nadirite Assault", t: "Ossiarch Command · Any Combat Phase", d: "Until end of phase, this unit's melee weapons have Crit (2 Hits)." }] },
        { name: "Kavalos Deathriders", role: "UNIT", kw: "Cavalry, Ward (6+)",
            move: '10"', save: "4+", health: 3, control: 1,
            melee: [
                { n: "Nadirite Spear", a: 3, hit: "3+", wnd: "4+", rnd: 1, dmg: 1, ab: "Charge (+1 Damage)" },
                { n: "Kavalos Steed's Hooves and Teeth", a: 2, hit: "5+", wnd: "3+", rnd: "–", dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Deathrider Wedge", t: "Ossiarch Command · Your Charge Phase", d: "This phase, models can pass across enemy Infantry as if they had Fly. After charging, pick an enemy unit it passed across and roll a dice — on 2+, inflict D3 mortal damage." }] },
        { name: "Gothizzar Harvester", role: "UNIT", kw: "Monster, Ward (6+)",
            move: '6"', save: "4+", health: 10, control: 5,
            ranged: [{ n: "Death's Head Maw", rng: '12"', a: 4, hit: "4+", wnd: "4+", rnd: 1, dmg: 1, ab: "–" }],
            melee: [
                { n: "Soulcrusher Bludgeons", a: 6, hit: "4+", wnd: "2+", rnd: 2, dmg: 2, ab: "–" },
                { n: "Ossified Hooves and Tail", a: 4, hit: "4+", wnd: "3+", rnd: 1, dmg: 2, ab: "–" }
            ],
            abilities: [
                { name: "Bone Harvest", t: "Passive", d: "Each time an enemy model in combat with this unit is slain, gain 1 bone-tithe point (max 6)." },
                { name: "Repair Construct", t: "End of Any Turn", d: "Pick a friendly Mortek Guard unit within 6\", roll a dice per bone-tithe point. For each 4+, return 1 slain model, then reset bone-tithe points to 0." }
            ] }
    ],
    obrMortisan: [
        { name: "Mortisan Ossifector", role: "GENERAL", kw: "Hero, Wizard, Infantry, Ward (6+)",
            move: '5"', save: "4+", health: 5, control: 2,
            melee: [{ n: "Ossified Talons", a: 3, hit: "4+", wnd: "4+", rnd: "–", dmg: 2, ab: "–" }],
            abilities: [{ name: "Refined Creations", t: "Your Hero Phase (spell)", d: "Pick a friendly unit wholly within 12\", cast 2D6. On 5+, that unit's melee weapons have Crit (2 Hits) until the start of your next turn." }] },
        { name: "Immortis Guard", role: "UNIT", kw: "Infantry, Ward (6+)",
            move: '5"', save: "3+", health: 4, control: 1,
            melee: [{ n: "Dread Halberd", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [{ name: "Soulbound Protectors", t: "Passive", d: "Your general has Ward (5+) while within this unit's combat range." }] },
        { name: "Necropolis Stalkers", role: "UNIT", kw: "Infantry, Ward (6+)",
            move: '6"', save: "4+", health: 4, control: 1,
            melee: [{ n: "Stalker Blades", a: 4, hit: "3+", wnd: "3+", rnd: 2, dmg: 1, ab: "–" }],
            abilities: [{ name: "Switch Aspects", t: "Any Combat Phase", d: "Pick one for the rest of the turn — Blade-parry: −1 to hit rolls for attacks targeting this unit; Destroyer: ward rolls can't be made against damage from this unit's attacks." }] },
        { name: "Morghast Archai", role: "UNIT", kw: "Infantry, Fly, Ward (6+)",
            move: '10"', save: "3+", health: 6, control: 2,
            melee: [{ n: "Spirit Weapons", a: 3, hit: "3+", wnd: "2+", rnd: 2, dmg: 3, ab: "–" }],
            abilities: [{ name: "Heralds of Nagash", t: "Passive", d: "Add 1 to discipline rolls for this unit while it is not wholly within 12\" of your general." }],
            note: "Deploys via Dread Descent from battle round 2 (anywhere >6\" from enemies)." }
    ],
    obrKavalos: [
        { name: "Liege-Kavalos", role: "GENERAL", kw: "Hero, Cavalry, Ward (6+)",
            move: '10"', save: "3+", health: 7, control: 2,
            melee: [
                { n: "Commander's Blade", a: 5, hit: "3+", wnd: "4+", rnd: 1, dmg: 2, ab: "Charge (+1 Damage)" },
                { n: "Kavalos Steed's Hooves, Teeth and Barbed Tails", a: 4, hit: "5+", wnd: "3+", rnd: "–", dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Signal the Advance", t: "Your Hero Phase", d: "Pick a visible friendly unit wholly within 12\", roll a dice. On 3+, add 1 to charge rolls for that unit for the rest of the turn." }] },
        { name: "Kavalos Deathriders", role: "UNIT", kw: "Cavalry, Ward (6+)",
            move: '10"', save: "4+", health: 3, control: 1,
            melee: [
                { n: "Kavalos Blade", a: 3, hit: "3+", wnd: "4+", rnd: 1, dmg: 1, ab: "–" },
                { n: "Kavalos Steed's Hooves and Teeth", a: 2, hit: "5+", wnd: "3+", rnd: "–", dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Wheel About", t: "Any Combat Phase", d: "If this unit charged this turn, roll a dice. On 3+, it can move up to its Move characteristic, passing through enemy combat ranges but not ending in combat." }] },
        { name: "Teratic Cohort", role: "UNIT", kw: "Beast, Ward (6+), Reinforcements",
            move: '7"', save: "5+", health: 1, control: 1,
            melee: [{ n: "Cohort Weapons", a: 2, hit: "3+", wnd: "4+", rnd: 1, dmg: 1, ab: "–" }],
            abilities: [{ name: "Bone-deep Savagery", t: "Any Movement Phase", d: "This unit can move 3\". If it can move into combat, it must; if it was in combat at the start of the move, it must end that move in combat." }] }
    ],
    bloodwind: [
        { name: "Chaos Lord", role: "GENERAL", kw: "Hero, Infantry",
            move: '5"', save: "3+", health: 6, control: 2,
            melee: [{ n: "Reaperblade", a: 5, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "Crit (Mortal)" }],
            abilities: [
                { name: "Favoured of the Pantheon", t: "Your Hero Phase", d: "Roll a dice. On a 4+, you can roll on the Eye of the Gods table for this unit." },
                { name: "Iron-willed Champion", t: "Any Combat Phase", d: "Pick a friendly unit wholly within 12\" of this unit (not this unit) and roll a dice. On a 2+, add 1 to hit rolls for attacks made by the target unit this phase." }
            ] },
        { name: "Chaos Chariot", role: "UNIT", kw: "War Machine",
            move: '10"', save: "4+", health: 7, control: 2,
            melee: [
                { n: "Chaos War-flail", a: 6, hit: "3+", wnd: "3+", rnd: "–", dmg: 1, ab: "–" },
                { n: "Driver's Lashing Whip", a: 2, hit: "4+", wnd: "4+", rnd: "–", dmg: 1, ab: "–" },
                { n: "Warhorses' Trampling Hooves", a: 4, hit: "5+", wnd: "3+", rnd: "–", dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Devastating Charge", t: "Your Charge Phase", d: "If this unit charged this phase, pick an enemy unit within 1\" of it and roll a dice. On a 2+, inflict D3 mortal damage on the target." }] },
        { name: "Chaos Warriors", role: "UNIT", kw: "Infantry",
            move: '5"', save: "3+", health: 2, control: 1,
            melee: [{ n: "Rune-etched Halberd", a: 2, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" }],
            abilities: [{ name: "Bringers of Desolation", t: "Passive", d: "Add 1 to wound rolls for combat attacks made by this unit that target an enemy unit contesting an objective you do not control." }],
            note: "Two units of 5 in this Spearhead." },
        { name: "Chaos Knights", role: "UNIT", kw: "Cavalry",
            move: '10"', save: "3+", health: 4, control: 1,
            melee: [
                { n: "Cursed Lance", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "Charge (+1 Damage)" },
                { n: "Chaos Steed's Trampling Hooves", a: 2, hit: "5+", wnd: "3+", rnd: "–", dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Impaling Charge", t: "Passive", d: "Add 1 to the Rend characteristic of this unit's Cursed Lances if it charged in the same turn." }] }
    ],
    yndrasta: [
        { name: "Yndrasta, the Celestial Spear", role: "GENERAL", kw: "Hero, Infantry, Fly, Ward (6+)",
            move: '12"', save: "3+", health: 8, control: 2,
            ranged: [{ n: "Thengavar", rng: '12"', a: 1, hit: "3+", wnd: "2+", rnd: 2, dmg: 4, ab: "Shoot in Combat" }],
            melee: [{ n: "Blade of the High Heavens", a: 5, hit: "3+", wnd: "3+", rnd: 2, dmg: 3, ab: "–" }],
            abilities: [{ name: "Champion of Sigmar", t: "Once Per Battle · Any Combat Phase", d: "This unit has Ward (5+) this phase." }],
            note: "Starts in reserve — arrives via Lightning-Strike Arrival from battle round 3." },
        { name: "Vanquishers", role: "UNIT", kw: "Infantry",
            move: '5"', save: "3+", health: 2, control: 1,
            melee: [{ n: "Celestial Greatsword", a: 2, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" }],
            abilities: [{ name: "Lightning Strikes", t: "Passive", d: "Add 1 to the Damage characteristic of this unit's Celestial Greatsword for attacks that target an enemy unit that has 5 or more models." }],
            note: "Two units of 5." },
        { name: "Knight-Vexillor", role: "UNIT", kw: "Hero, Infantry",
            move: '5"', save: "3+", health: 6, control: 5,
            melee: [{ n: "Sigmarite Warblade", a: 4, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [{ name: "Banner of the Reforged", t: "Your Hero Phase", d: "Pick a friendly unit wholly within 12\" of this unit. Heal (D3) the target. In addition, add 3 to that unit's control score until the start of your next turn." }] },
        { name: "Annihilators", role: "UNIT", kw: "Infantry",
            move: '4"', save: "2+", health: 3, control: 1,
            melee: [{ n: "Meteoric Hammer", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: 2, ab: "–" }],
            abilities: [{ name: "Force of a Falling Star", t: "Any Charge Phase", d: "If this unit charged this phase and the unmodified charge roll was 8+, pick an enemy unit within 1\" of it. The target has Strike-last this turn." }],
            note: "Starts in reserve — arrives via Lightning-Strike Arrival from battle round 3." },
        { name: "Stormstrike Chariot", role: "UNIT", kw: "War Machine",
            move: '10"', save: "3+", health: 10, control: 2,
            ranged: [{ n: "Great Stormbow", rng: '18"', a: 2, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" }],
            melee: [
                { n: "Stormstrike Axe", a: 3, hit: "3+", wnd: "3+", rnd: 1, dmg: 1, ab: "–" },
                { n: "Glyph-chargers' Beaks and Claws", a: 6, hit: "4+", wnd: "3+", rnd: 1, dmg: 1, ab: "Companion" }
            ],
            abilities: [{ name: "Azyr Unleashed", t: "Any Charge Phase", d: "If this unit charged this phase, pick an enemy unit within 1\" of it and roll a dice. On a 2+, inflict D3 mortal damage on the target." }] }
    ]
};
const FNJ = {
    setup: [
        "Roll off — the winner chooses to be the Attacker or the Defender.",
        "Attacker picks their regiment ability + enhancement, then the Defender does the same.",
        "Defender chooses the battlefield side: Aqshy (Fire) or Ghyran (Life) — each has its own twist deck.",
        "Defender picks one of the deployment maps and assigns which territory is whose (territories split lengthways or diagonally).",
        "Terrain: Defender then Attacker each set up 1 large + 1 small feature — wholly in their own territory, more than 6\" from other terrain, more than 3\" from the long edges and enemy territory, and never on an objective.",
        "Deployment: the Attacker sets up ALL their units first (wholly in own territory, more than 6\" from enemy territory), then the Defender sets up all of theirs.",
        "The battle lasts 4 battle rounds."
    ],
    terrain: [
        { n: "Large Terrain Feature", d: "Has Cover, Obscuring and Unstable." },
        { n: "Small Terrain Feature", d: "Has Cover and Unstable." },
        { n: "Cover", d: "−1 to hit rolls for attacks against a unit behind or wholly on the feature — unless that unit charged this turn or has Fly." },
        { n: "Obscuring", d: "A unit behind or wholly on the feature can't be targeted by shooting attacks — unless it has Fly." },
        { n: "Unstable", d: "Models can move across it, but can't be set up on, or end a move on, any part more than 1\" tall." },
        { n: "Behind terrain (rules update)", d: "When a unit is targeted by an attack, if you can't draw a straight line from the closest point of the attacker's base to the closest point of a target model's base without crossing a terrain feature, the target counts as behind that terrain feature for that attack." }
    ],
    round: [
        "1. Who goes first? Round 1: the Attacker decides. Later rounds: priority roll — the winner decides (on a tie, whoever went first last round decides).",
        "2. Determine the underdog (fewest VP; tied = no underdog).",
        "3. Draw the twist card and apply it immediately.",
        "4. Draw battle tactic cards back up to a hand of 3 (you may discard any first).",
        "5. Use any Start of Battle Round abilities (active player first).",
        "⚠️ Seizing the initiative: if the player who went 2nd last round wins priority and chooses to go first, they draw NO tactic cards this round — unless they're the underdog by 5+ VP."
    ],
    scoring: [
        "+1 VP — you control at least 1 objective",
        "+1 VP — you control 2 or more objectives",
        "+1 VP — you control more objectives than your opponent",
        "+1 VP — for each battle tactic you completed this turn",
        "Scored at the end of each of your turns. Most VP after round 4 wins; a tie is a draw."
    ],
    aqshy: [
        { n: "Ring of Fire", d: "Underdog (or roll-off winner) picks 1 objective: it can't be contested or controlled this round, and at the end of each turn it deals D3 mortal damage to each unit on it." },
        { n: "Let the Blood Flow", d: "+1 VP per enemy unit you destroy this turn. The underdog picks 1 friendly unit: +1 to hit in combat this round." },
        { n: "Bloodmarked", d: "Underdog picks 1 unit in each army (or each player picks an enemy unit). +1 VP at end of round if the enemy's marked unit is destroyed this round." },
        { n: "Reclaim Aqshy", d: "Underdog picks 2 objectives (or each player picks 1). +1 VP per turn for each of those you control." },
        { n: "Mount the Attack", d: "+1 VP per turn per objective you control that the enemy held at the start of your turn. Underdog picks a unit: its melee weapons gain Charge (+1 Damage) this round." },
        { n: "Wreathed in Smoke", d: "Underdog (or winner) picks 1 objective: until end of round, only unmodified 6s hit units contesting it." }
    ],
    ghyran: [
        { n: "Reclaim Ghyran", d: "Underdog picks 2 objectives (or each player picks 1). +1 VP per turn for each of those you control." },
        { n: "Alarielle's Blessing", d: "Underdog picks: Shield of Thorns (a unit gains Ward 6+, or +1 to ward rolls if it already wards) OR Rain of Jade (Heal D3 on up to 3 units)." },
        { n: "Take the Land", d: "+1 VP per turn if your units contesting the large terrain feature in enemy territory have a higher combined control score than the enemy's (FAQ: control scores, not model counts). Underdog: +1 to wound vs units contesting a large terrain feature." },
        { n: "Grasping Vines", d: "Underdog (or winner) picks an enemy unit: halve its Move and roll 1 fewer dice on its charge rolls this round." },
        { n: "The Grandfather's Blessing", d: "Underdog picks: Nurgle's Rot (−1 to save rolls for an enemy unit this round) OR Eroding Miasma (an enemy unit can't make ward rolls this round)." },
        { n: "Lifespring", d: "Underdog (or winner) picks 1 objective: +1 VP per turn if you control it, and Heal 1 on each unit contesting it at end of each turn." }
    ],
    tactics: [
        { n: "War of Attrition", t: "End of turn: enemy units died this turn AND more enemy than friendly units died.", c: "Stand Guard (enemy hero phase) — a friendly unit gains Strike-First this turn." },
        { n: "Raid", t: "A friendly unit is wholly in enemy territory and not in combat.", c: "Steel Defence (reaction to enemy Attack) — ignore Rend vs the targeted unit this phase." },
        { n: "Take the Flanks", t: "Friendly units within 3\" of each short battlefield edge.", c: "Redeploy (enemy movement phase) — a non-combat unit moves up to D6\" (not into combat)." },
        { n: "Take Without Warning", t: "Gain an objective the enemy held at start of turn, and none of your units contesting it fought this turn.", c: "Fight to the Last (reaction to enemy Attack) — the targeted unit gains Ward 5+ this phase." },
        { n: "Hold Ground", t: "Your units contesting the large terrain feature in your territory have a higher combined control score than the enemy's (FAQ: control scores, not model counts).", c: "Rise to the Challenge (any combat phase) — Heal D6 on a friendly Hero." },
        { n: "Cut Off the Head", t: "Enemy general slain this turn (or slain earlier and any enemy unit died this turn).", c: "Counter-Charge (enemy charge phase) — a non-combat unit can Charge." },
        { n: "The Ignax Dais", t: "Control the Ignax objective at end of turn.", c: "Forward to Victory (reaction: you Charge) — re-roll the charge roll." },
        { n: "The Behemat Dais", t: "Control the Behemat objective at end of turn.", c: "Scroll of Arcane Bolt (any hero phase) — a Hero hits a visible enemy within 12\" for D3 mortal on a 2+." },
        { n: "The Dracothion Dais", t: "Control the Dracothion objective at end of turn.", c: "Go to Ground (reaction: enemy Shoots) — targeted unit only hit on unmodified 6s this phase, but has Strike-Last this turn." },
        { n: "Raze", t: "A friendly unit within 3\" of the long battlefield edge in enemy territory.", c: "Inspiring Presence (any hero phase) — roll a dice, add it to a Hero's control score for the turn." },
        { n: "Attack on Two Fronts", t: "Control 2 objectives the enemy held at the start of your turn.", c: "Call Reinforcements (any movement phase) — replace a destroyed 5+ model Infantry/Cavalry unit with D3 models anywhere more than 6\" from enemies." },
        { n: "Do Not Waver", t: "A friendly unit fought this turn and no friendly units died.", c: "Fall Back and Rally (reaction: you Retreat) — no mortal damage from the Retreat; roll per slain model, return 1 on each 5+." }
    ]
};
const SNB = {
    intro: "Sand & Bone moves Spearhead to Shyish, the Realm of Death. The round sequence and victory points are the same as Fire & Jade (see 📜 Core) — the board, terrain, mystical terrain and card decks change.",
    setup: [
        "Roll off — the winner chooses who is the Attacker and who is the Defender.",
        "The Attacker picks their regiment ability and enhancement, then the Defender does the same.",
        "The Defender chooses the board side: Dolorum (the green side) or Ossia (the purple side).",
        "The Defender picks a deployment map and which territory is whose. On Ossia, a Crypt of Blood is now set up in the middle of the battlefield.",
        "Terrain: the Defender picks Terrain Group A (Large Wall + Small Fence) or B (Small Wall + Large Fence) and sets it up; the Attacker sets up the other group. Each piece wholly in your territory, more than 6\" from other terrain, more than 3\" from the long edges and enemy territory, never on an objective.",
        "Deployment: the Attacker sets up all their units first, then the Defender — wholly in their own territory, more than 6\" from enemy territory. The battle lasts 4 battle rounds."
    ],
    objectives: [
        { n: "Contesting", d: "Objectives are printed on the board and some are larger than others. A model standing on one (wholly or partially) is contesting it." },
        { n: "Named objectives", d: "Two objectives are named — the Dais of Blood and the Dais of the Necropolis. Battle tactic cards refer to them, so check which is which before you deploy." }
    ],
    terrain: [
        { n: "Walls & fences", d: "Large Wall / Large Fence: Cover, Obscuring, Unstable. Small Wall / Small Fence: Cover, Unstable." },
        { n: "Behind terrain", d: "If you can't draw a straight line from the attacker's base to the closest point of a target model's base without crossing a terrain feature, the target counts as behind it for that attack." },
        { n: "Crypt of Blood (Ossia)", d: "Large mystical terrain in the middle of the Ossia board: Cover, Unstable and Unholy. UNHOLY DRAUGHT (once per turn per army, any combat phase): pick a friendly unit within 6\" and roll a dice (+1 if you're the underdog). 4+ = +1 to hit for its combat attacks for the rest of the turn; otherwise it takes D3 mortal damage." },
        { n: "Icon of Nulahmia (Dolorum)", d: "Small mystical terrain — it only enters play through the Haunted Locus twist. Cover, Unstable and Inspiring. VEILED PROMISES (once per turn per army, end of any turn): pick a friendly unit within 6\" and roll a dice (+1 if you're the underdog). 4+ = +3 control for the rest of the turn; otherwise −3 control." }
    ],
    dolorumTwists: [
        { n: "Savage Mourning", d: "Each player scores 1 VP at the end of their turn for each friendly unit in combat. The underdog also scores 1 extra VP at the end of their turn if more of their units than enemy units have been destroyed." },
        { n: "Survivor's Grief", d: "Each player scores 1 VP at the end of their turn for each unit from their Spearhead that has been destroyed or replaced this battle (replacement units themselves don't count). The underdog (or roll-off winner) picks a friendly unit that can Charge this round even after Running or Retreating." },
        { n: "Banish Your Fears", d: "1 extra VP at the end of your turn for each objective you control that your opponent controlled at the start of your turn. The underdog picks a friendly unit: its melee weapons gain Anti-charge (+1 Rend) this round." },
        { n: "Overpowering Grief", d: "The underdog (or roll-off winner) picks an objective: it's no longer controlled by either player and can't be controlled this round." },
        { n: "Haunted Locus", d: "The underdog (or roll-off winner) places the Icon of Nulahmia anywhere more than 3\" from other terrain, more than 3\" from all units and not touching an objective. From then on, Veiled Promises can be used (see Terrain)." },
        { n: "Darkened Skies", d: "The underdog (or roll-off winner) picks an objective. For the rest of the round it counts as contested by an extra unit of theirs with a fixed control score of 1 — enemies on it need a higher total to take it." }
    ],
    ossiaTwists: [
        { n: "Disciplined Conquest", d: "The underdog picks 2 objectives (no underdog: each player picks 1, active player first). Score 2 extra VP at the end of your turn if you control both." },
        { n: "Invincible Redoubts", d: "The underdog (or roll-off winner) picks one: Precision Strike — a friendly unit has Strike-first while wholly within its own territory this round; or Dissent in the Ranks — an enemy unit has Strike-last while wholly within your territory this round." },
        { n: "Co-ordinated Bombardment", d: "The underdog (or roll-off winner) picks an objective: enemy units contesting it subtract 1 from hit rolls for the rest of the round." },
        { n: "Secured Supply Lines", d: "The underdog picks 2 terrain features (no underdog: each player picks a different one). 1 extra VP at the end of your turn if you control both. The underdog can also give a friendly unit Ward (5+) while it contests either of them this round." },
        { n: "Will of the Necropolis", d: "The underdog (or roll-off winner) picks one: Adaptable Defence — ignore all modifiers to save rolls (good and bad) for a friendly unit this round; or Broken Will — an enemy unit has a maximum control score of 1 this round." },
        { n: "Uncompromising Invasion", d: "1 extra VP at the end of your turn for each objective not wholly within your territory that you control and no enemy unit contests. The underdog can pick a friendly unit and add D6 to its control score this round." }
    ],
    tactics: [
        { n: "Dig Two Graves", t: "Models were slain both in your territory and in enemy territory this turn.", c: "Counter-Charge (enemy charge phase) — a friendly unit not in combat can Charge as if it were your charge phase." },
        { n: "War of Attrition", t: "Enemy units were destroyed this turn, and more enemy than friendly units were destroyed.", c: "Speed of Death (end of any turn) — remove a friendly unit that is in combat and set it up again more than 6\" from all enemies." },
        { n: "Hold Ground", t: "You control the large terrain feature in your territory.", c: "Frantic Scramble (any combat phase) — a friendly unit in combat can move 3\", even into combat." },
        { n: "Raze", t: "A friendly unit is within 3\" of the long battlefield edge in enemy territory.", c: "Determined Effort (any charge phase) — a friendly unit not in combat adds D3 to its charge rolls this turn." },
        { n: "Morbid Consecration", t: "You control an objective not wholly within your territory (not the Dais of Blood or the Dais of the Necropolis).", c: "Final Breath (your hero phase) — bring back a destroyed, not-yet-replaced unit with up to 4 Health in total (or one model with Health − 4 damage on it), more than 6\" from enemies." },
        { n: "Attack on Two Fronts", t: "You control 2 objectives your opponent controlled at the start of the turn.", c: "Translucent Flesh (reaction: opponent declared an attack) — attacks on that unit this phase fail on unmodified hit or wound rolls of 1–3." },
        { n: "Desolate Landscapes", t: "A friendly unit fought this turn and is on the battlefield but not contesting an objective.", c: "Aura of Ending (your hero phase) — a friendly Hero contesting an objective: roll for each enemy unit contesting it, 4+ = 2 mortal damage." },
        { n: "Take Without Warning", t: "You took an objective your opponent held at the start of the turn, and none of your units contesting it fought this turn.", c: "Monument of Living Bone (any hero phase) — a terrain feature in your territory also counts as an objective for the rest of the turn." },
        { n: "The Dais of the Necropolis", t: "You control the Dais of the Necropolis at the end of your turn.", c: "Grind Them to Dust (any combat phase) — a friendly unit fights twice; after the first it takes D3 mortal damage and has Strike-last for the rest of the turn." },
        { n: "The Grip of Death", t: "You control 2 objectives not wholly within your territory.", c: "Re-form the Line! (enemy movement phase) — a unit in combat Retreats as if it were your movement phase; otherwise return slain models (if undamaged, 5+ each) or Heal (if damaged, 5+ per damage point)." },
        { n: "Raid", t: "A friendly unit is wholly within enemy territory and not in combat.", c: "Terrifying Assault (any charge phase) — a friendly unit in combat picks an enemy unit in combat with it: subtract a D6 roll from its control score this turn." },
        { n: "The Dais of Blood", t: "You control the Dais of Blood at the end of your turn.", c: "Unleash Bloodlust (enemy combat phase) — +1 Attacks on a friendly unit's melee weapons this turn, but its control score is capped at 1 for the rest of the round." }
    ]
};
const COA = {
    intro: "City of Ash is fought in the ruins of Embergard (Aqshy) and is built around Relics — treasures with powerful abilities that either player can use. The round sequence and victory points are the same as Fire & Jade (see 📜 Core).",
    setup: [
        "Roll off — the winner chooses who is the Attacker and who is the Defender.",
        "The Attacker picks their regiment ability and enhancement, then the Defender does the same.",
        "The Defender chooses the board side: Shattered Crossroads or Ashen Bastion.",
        "The Defender picks a deployment map and which territory is whose.",
        "Terrain: the Defender sets up 1 Ruined Manor wholly within their territory on a corner of a rectangular objective, then the Attacker does the same. Those objectives become fortified objectives.",
        "Starting relics: the Defender picks one and sets it up wholly within their territory, then the Attacker sets up the other in theirs. Ashen Bastion = Battered Barricade + Inconspicuous Manhole. Shattered Crossroads = Barrel of Emberstone + Crate of Aqua Ghyranis.",
        "Deployment: the Attacker sets up all their units first, then the Defender — wholly in their own territory, more than 6\" from enemy territory. The battle lasts 4 battle rounds."
    ],
    objectives: [
        { n: "Shattered Crossroads", d: "4 small rectangular objectives + the junction (the large circle in the middle — the whole circle counts). Roads cross the board; the junction counts as part of the roads." },
        { n: "Ashen Bastion", d: "4 small circular objectives + the ruin (the large rectangle in the middle — the whole rectangle counts, walls included)." },
        { n: "Contesting", d: "A model standing on an objective (wholly or partially) contests it. For rectangles the whole rectangle is the objective, not just the circle in the middle." },
        { n: "Named objectives", d: "The small objectives are Ghal Maraz (hammer), the Twin-Tailed Comet, the High Star and the Great Wheel — some tactic cards name them." },
        { n: "Fortified objectives", d: "An objective with a Ruined Manor on it. While every model in a unit is contesting it, that unit is in Cover." }
    ],
    terrain: [
        { n: "Ruined Manors", d: "City of Ash uses only 2 terrain features, both large Ruined Manors. They have Cover (−1 to hit unless the target charged this turn or has Fly) and Unstable — NO Obscuring." },
        { n: "Relics as terrain", d: "Relics are contested and controlled like terrain features (so you lose control as soon as you stop contesting one) and are Unstable. They do not count as terrain features for other abilities." }
    ],
    relics: [
        { n: "💥 Barrel of Emberstone", d: "Once per turn (army), your hero phase: a friendly unit within 3\" gets +1 to wound rolls for the rest of the turn." },
        { n: "💧 Crate of Aqua Ghyranis", d: "Passive: units (both sides!) have Ward (5+) while wholly within 6\" of it." },
        { n: "🗡️ Ulguan Steel Caltrops", d: "Once per turn (army), your combat phase — mandatory: if any units (friendly or enemy) that charged this turn are within 3\", roll a D3 for each; on 2+ that unit takes mortal damage equal to the roll." },
        { n: "🛡️ Battered Barricade", d: "Passive: units wholly within 3\" can't be targeted by shooting attacks unless the attacker is within their combat range." },
        { n: "🕳️ Inconspicuous Manhole", d: "Once per turn (army), your movement phase: a friendly unit wholly within 3\" is removed and set up again wholly within your territory, more than 6\" from all enemies." },
        { n: "Placing relics", d: "Always wholly on the battlefield, more than 3\" from enemy units and more than 6\" from other relics. Many twist cards make the underdog (or roll-off winner) place another relic." }
    ],
    campaign: [
        "Hidden in the Ashes: 3 linked battles — 1 Smouldering Skirmish (Ashen Bastion), 2 Blazing Blockade (Shattered Crossroads), 3 Final Conflagration (Ashen Bastion).",
        "Before battle 1, roll off: the winner picks a Spearhead army for the whole campaign, then the opponent does. Armies start every battle at full strength; keep a running total of VP.",
        "Campaign pre-battle: no board choice — the Defender picks territories, then terrain and starting relics as normal. Deployment flips: the Defender sets up everything first, then the Attacker (more than 6\" from enemy territory). The Defender decides who takes the first turn.",
        "Battle 1: the starting relics are the Battered Barricade and the Ulguan Steel Caltrops (a twist that would place the Caltrops places the Manhole instead).",
        "Battle 2: if the totals differ, the player with FEWER total VP chooses Attacker/Defender, and the player with MORE total VP picks the 2 starting relics.",
        "Battle 3: the player with more total VP is the Defender. The Barrel of Emberstone starts in the centre of the board; the leader picks the other starting relic, which the Defender sets up in their territory.",
        "Result: control the Barrel at the end AND more total VP = major victory · control it with fewer total VP = minor victory · nobody controls it but you have more total VP = minor victory · anything else = draw."
    ]
};
const CORE = {
    turn: [
        "Each turn: Start of Turn → Hero → Movement → Shooting → Charge → Combat → End of Turn. Only the active player's units act — except reactions, 'Any …' and 'Enemy …' abilities, and both sides fighting in combat.",
        "Hero phase: use 'Your Hero Phase' abilities, including spells and prayers.",
        "Movement: Normal Move (up to Move; can't move into combat — units already in combat must Retreat) · Run (Move + D6\"; no Shoot or Charge afterwards) · Retreat (only units in combat: D3 mortal damage, move out of combat; no Shoot or Charge afterwards) · Call for Reinforcements once per turn.",
        "Shooting: units that didn't Run or Retreat. Units in combat can only use Shoot in Combat weapons. Each model fires all its ranged weapons at targets in range and visible to it.",
        "Charge: a unit not in combat that didn't Run or Retreat rolls 2D6 and moves up to that far through combat ranges — it must end within ½\" of a visible enemy unit.",
        "Combat: both sides fight (see ⚔️ Combat).",
        "End of turn: check objective control, then the active player scores VP. 4 battle rounds; most VP wins, a tie is a draw."
    ],
    objectives: [
        "Objectives are printed on the board — the whole circle (or rectangle) is the objective, not just the symbol in the middle.",
        "A model standing on an objective, even partially, is contesting it. Spearhead does NOT use Matched Play's 3\" contesting range.",
        "Control is checked after deployment and at the end of every turn: add up the control scores of each side's units contesting it — the higher total takes control. A unit's control score can't drop below 1.",
        "Control sticks: an objective stays yours until your opponent gains control of it, even if you walk away.",
        "A unit on two objectives only counts for one when working out control — the active player picks for their units first, then the opponent.",
        "Terrain features (Take the Land, Hold Ground and similar) are contested and controlled the same way, using control scores — but control of terrain is lost as soon as you stop contesting it."
    ],
    combat: [
        "Charge rolls are 2D6. 'Roll an additional dice' makes it 3D6 (all added together); 'roll 1 fewer dice' makes it 1D6.",
        "Combat phase: first, non-Fight combat-phase abilities — active player, then the opponent.",
        "Then the players alternate picking a unit to Fight, starting with the active player. Every unit in combat must fight if it can; a unit that charged this turn can also fight.",
        "Fight: pile in up to 3\" (each model ending no further from the unit it's fighting), then attack with ALL its melee weapons against units in combat with it.",
        "Strike-first units fight before everyone else; Strike-last units fight after everyone else; a unit with both has neither.",
        "Attack sequence: hit → wound → save (minus Rend) → damage. Unmodified 1s always fail; an unmodified 6 to hit is a critical hit and triggers Crit abilities.",
        "Ward saves are rolled for each damage point after saves, mortal damage included. If a unit has several ward saves, only the best applies.",
        "Combat range is 3\": units within 3\" of a visible enemy unit are in combat."
    ],
    cards: [
        "Twist cards: one is drawn at the start of every battle round (round 1 included) and applies straight away. The underdog usually makes its choices.",
        "Underdog: the player with fewer VP at the start of the round. Tied (e.g. round 1) = no underdog — usually you roll off instead.",
        "Battle tactic cards: a hand of 3, topped up at the start of each round (from round 2 you may discard first). Each card is EITHER scored as a tactic at the end of your turn OR used for its command — never both. Used commands are discarded.",
        "You can use several commands on the same unit in the same phase. Spearhead has no command points and no Advanced Rules commands (no All-out Attack, Rally…) — your commands come from your tactic cards.",
        "Seizing the initiative: if the player who went second last round wins priority and goes first, they draw no tactic cards that round — unless they're the underdog by 5+ VP.",
        "Call for Reinforcements: once per turn in your movement phase, set up a destroyed REINFORCEMENTS unit again wholly within friendly territory, wholly within 6\" of a battlefield edge and not in combat. Each unit only once; replacements can't be replaced.",
        "Replacement units are brand-new units — they can use their once-per-battle warscroll abilities again.",
        "Wizards and Priests: Spearhead doesn't use the Magic rules — no unbinding and no miscasts. A spell or prayer just needs its roll to reach the number on the ability."
    ]
};
function RSectionLabel({ children, color }) {
    return React.createElement("div", { style: { color, fontSize: 13, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", margin: "6px 0 10px" } }, children);
}
function ROrdered({ items, color, title }) {
    return React.createElement("div", { style: { marginBottom: 18 } },
        React.createElement(RSectionLabel, { color: color }, title),
        items.map((t, i) => (React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: 9 } },
            React.createElement("span", { style: { color, fontWeight: "bold", fontSize: 13, flexShrink: 0 } },
                i + 1,
                "."),
            React.createElement("span", { style: { fontSize: 13, lineHeight: 1.5, color: "#ddd" } }, t)))));
}
function RPlain({ items, color, title }) {
    return React.createElement("div", { style: { marginBottom: 18 } },
        React.createElement(RSectionLabel, { color: color }, title),
        items.map((t, i) => (React.createElement("div", { key: i, style: { fontSize: 13, lineHeight: 1.5, color: "#ddd", marginBottom: 8 } }, t))));
}
function RDefs({ items, color, title }) {
    return React.createElement("div", { style: { marginBottom: 18 } },
        React.createElement(RSectionLabel, { color: color }, title),
        items.map((it, i) => (React.createElement("div", { key: i, style: { background: "#12131c", border: "1px solid #23242e", borderRadius: 8, padding: "10px 12px", marginBottom: 8 } },
            React.createElement("div", { style: { color, fontWeight: "bold", fontSize: 13.5, marginBottom: 3 } }, it.n),
            React.createElement("div", { style: { color: "#ccc", fontSize: 12.5, lineHeight: 1.45 } }, it.d)))));
}
function RTactics({ items, color }) {
    return React.createElement("div", null,
        React.createElement(RSectionLabel, { color: color }, "Battle Tactic Cards (12)"),
        React.createElement("div", { style: { color: "#888", fontSize: 11.5, marginBottom: 12, lineHeight: 1.5 } }, "Each card: either score the TACTIC for a VP at the end of your turn, OR use its COMMAND for an immediate effect \u2014 not both."),
        items.map((it, i) => (React.createElement("div", { key: i, style: { background: "#12131c", border: "1px solid #23242e", borderRadius: 8, padding: "10px 12px", marginBottom: 8 } },
            React.createElement("div", { style: { color, fontWeight: "bold", fontSize: 13.5, marginBottom: 4 } }, it.n),
            React.createElement("div", { style: { fontSize: 12.5, lineHeight: 1.45, color: "#ddd", marginBottom: 4 } },
                React.createElement("span", { style: { color: "#8fd14f", fontWeight: "bold" } }, "Tactic: "),
                it.t),
            React.createElement("div", { style: { fontSize: 12.5, lineHeight: 1.45, color: "#ddd" } },
                React.createElement("span", { style: { color: "#ff9e3d", fontWeight: "bold" } }, "Command: "),
                it.c)))));
}
function RulesOverlay({ onClose }) {
    const PACKS = [
        { id: "core", l: "📜 Core", c: "#cfd3e6", sections: [{ id: "turn", l: "🔄 Turn" }, { id: "obj", l: "🎯 Objectives" }, { id: "fight", l: "⚔️ Combat" }, { id: "cards", l: "🃏 Cards & more" }] },
        { id: "fnj", l: "🔥 Fire & Jade", c: "#f0b429", sections: [{ id: "setup", l: "🎬 Setup" }, { id: "terrain", l: "🌲 Terrain" }, { id: "twists", l: "🔥 Twists" }, { id: "tactics", l: "🃏 Tactics" }] },
        { id: "snb", l: "💀 Sand & Bone", c: "#9b8cc4", sections: [{ id: "setup", l: "🎬 Setup" }, { id: "obj", l: "🎯 Obj." }, { id: "terrain", l: "🌲 Terrain" }, { id: "twists", l: "💀 Twists" }, { id: "tactics", l: "🃏 Tactics" }] },
        { id: "coa", l: "🏚️ City of Ash", c: "#e8834a", sections: [{ id: "setup", l: "🎬 Setup" }, { id: "obj", l: "🎯 Obj." }, { id: "terrain", l: "🌲 Terrain" }, { id: "relics", l: "💎 Relics" }, { id: "camp", l: "🏕️ Camp." }] }
    ];
    const [pack, setPack] = useState("core");
    const [sec, setSec] = useState("turn");
    const P = PACKS.find(p => p.id === pack) || PACKS[0];
    const accent = P.c;
    const pick = id => { const np = PACKS.find(p => p.id === id); setPack(id); setSec(np.sections[0].id); };
    const box = (text, bg, bd) => React.createElement("div", { style: { color: "#aaa", fontSize: 12.5, lineHeight: 1.55, marginBottom: 14, background: bg, border: `1px solid ${bd}`, borderRadius: 8, padding: "10px 12px" } }, text);
    return (React.createElement("div", { style: { position: "fixed", inset: 0, background: "#05060c", zIndex: 50, display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto", fontFamily: "system-ui,sans-serif", color: "#fff" } },
        React.createElement("div", { style: { background: "#12131c", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${accent}33` } },
            React.createElement("div", null,
                React.createElement("div", { style: { color: accent, fontWeight: "bold", fontSize: 15 } }, "\uD83D\uDCD6 Spearhead Rules"),
                React.createElement("div", { style: { color: "#777", fontSize: 11 } }, "Core rules and battlepack reference")),
            React.createElement("button", { onClick: onClose, style: btn(accent, "#000", { padding: "7px 12px", fontSize: 13 }) }, "Close \u2715")),
        React.createElement("div", { style: { display: "flex", gap: 5, padding: "10px 10px", background: "#0d0d15" } }, PACKS.map(p => (React.createElement("button", { key: p.id, onClick: () => pick(p.id), style: { flex: 1, padding: "9px 3px", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 10.5, lineHeight: 1.2, background: pack === p.id ? p.c + "22" : "#16161f", color: pack === p.id ? p.c : "#888", border: `1px solid ${pack === p.id ? p.c : "#2a2a35"}` } }, p.l)))),
        React.createElement("div", { style: { display: "flex", background: "#0a0b12", borderBottom: "1px solid #222", overflowX: "auto" } }, P.sections.map(s => (React.createElement("button", { key: s.id, onClick: () => setSec(s.id), style: { flex: 1, minWidth: 62, background: "none", border: "none", borderBottom: sec === s.id ? `2px solid ${accent}` : "2px solid transparent", color: sec === s.id ? accent : "#666", padding: "9px 4px", cursor: "pointer", fontSize: 11, fontWeight: sec === s.id ? "bold" : "normal" } }, s.l)))),
        React.createElement("div", { style: { overflowY: "auto", padding: "14px 14px 40px", flex: 1 } },
            pack === "core" && React.createElement(React.Fragment, null,
                sec === "turn" && React.createElement(React.Fragment, null,
                    React.createElement(RPlain, { items: FNJ.round, color: accent, title: "Start of every battle round" }),
                    React.createElement(ROrdered, { items: CORE.turn, color: accent, title: "Each player's turn" }),
                    React.createElement(RPlain, { items: FNJ.scoring, color: accent, title: "Victory points" })),
                sec === "obj" && React.createElement(RPlain, { items: CORE.objectives, color: accent, title: "Objectives & control" }),
                sec === "fight" && React.createElement(RPlain, { items: CORE.combat, color: accent, title: "Charge & combat" }),
                sec === "cards" && React.createElement(RPlain, { items: CORE.cards, color: accent, title: "Cards, reinforcements & magic" })),
            pack === "fnj" && React.createElement(React.Fragment, null,
                sec === "setup" && React.createElement(ROrdered, { items: FNJ.setup, color: accent, title: "Pre-battle sequence" }),
                sec === "terrain" && React.createElement(RDefs, { items: FNJ.terrain, color: accent, title: "Terrain rules" }),
                sec === "twists" && React.createElement(React.Fragment, null,
                    React.createElement(RDefs, { items: FNJ.aqshy, color: "#ff7a45", title: "\uD83D\uDD25 Aqshy twists \u2014 Realm of Fire" }),
                    React.createElement(RDefs, { items: FNJ.ghyran, color: "#5fc46b", title: "\uD83C\uDF3F Ghyran twists \u2014 Realm of Life" }),
                    React.createElement("div", { style: { color: "#666", fontSize: 11, fontStyle: "italic", lineHeight: 1.5 } }, "Only the deck for the board side you're playing on is used \u2014 one card each battle round.")),
                sec === "tactics" && React.createElement(RTactics, { items: FNJ.tactics, color: accent })),
            pack === "snb" && React.createElement(React.Fragment, null,
                sec === "setup" && React.createElement(React.Fragment, null,
                    box(SNB.intro, "#14121c", "#2a2536"),
                    React.createElement(ROrdered, { items: SNB.setup, color: accent, title: "Pre-battle sequence" })),
                sec === "obj" && React.createElement(RDefs, { items: SNB.objectives, color: accent, title: "Objectives" }),
                sec === "terrain" && React.createElement(RDefs, { items: SNB.terrain, color: accent, title: "Terrain & mystical terrain" }),
                sec === "twists" && React.createElement(React.Fragment, null,
                    React.createElement(RDefs, { items: SNB.dolorumTwists, color: "#7fbf7f", title: "\uD83D\uDC80 Dolorum twists (green side)" }),
                    React.createElement(RDefs, { items: SNB.ossiaTwists, color: "#b59ad9", title: "\uD83C\uDFDC\uFE0F Ossia twists (purple side)" })),
                sec === "tactics" && React.createElement(RTactics, { items: SNB.tactics, color: accent })),
            pack === "coa" && React.createElement(React.Fragment, null,
                sec === "setup" && React.createElement(React.Fragment, null,
                    box(COA.intro, "#1c130c", "#3a2a1a"),
                    React.createElement(ROrdered, { items: COA.setup, color: accent, title: "Pre-battle sequence" })),
                sec === "obj" && React.createElement(RDefs, { items: COA.objectives, color: accent, title: "Objectives & board sides" }),
                sec === "terrain" && React.createElement(RDefs, { items: COA.terrain, color: accent, title: "Terrain" }),
                sec === "relics" && React.createElement(RDefs, { items: COA.relics, color: accent, title: "The 5 relics" }),
                sec === "camp" && React.createElement(RPlain, { items: COA.campaign, color: accent, title: "Hidden in the Ashes \u2014 campaign" })))));
}
function StatBox({ label, val, color }) {
    return (React.createElement("div", { style: { flex: 1, textAlign: "center", padding: "6px 2px", background: "#0008", borderRadius: 6 } },
        React.createElement("div", { style: { color, fontWeight: "bold", fontSize: 17 } }, val),
        React.createElement("div", { style: { color: "#888", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3px", marginTop: 1 } }, label)));
}
function WeaponTable({ title, weapons, ranged, color }) {
    return (React.createElement("div", { style: { marginTop: 10 } },
        React.createElement("div", { style: { color, fontSize: 11, fontWeight: "bold", textTransform: "uppercase", marginBottom: 4 } }, title),
        React.createElement("div", { style: { overflowX: "auto" } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11.5, minWidth: ranged ? 320 : 280 } },
                React.createElement("thead", null,
                    React.createElement("tr", { style: { color: "#888" } },
                        React.createElement("th", { style: { textAlign: "left", padding: "3px 4px", fontWeight: "normal" } }, "Weapon"),
                        ranged && React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "Rng"),
                        React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "A"),
                        React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "Hit"),
                        React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "Wnd"),
                        React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "Rnd"),
                        React.createElement("th", { style: { padding: "3px 3px", fontWeight: "normal" } }, "Dmg"))),
                React.createElement("tbody", null, weapons.map((w, i) => (React.createElement("tr", { key: i, style: { borderTop: "1px solid #2a2a3a", color: "#ddd" } },
                    React.createElement("td", { style: { padding: "4px", fontWeight: "bold" } },
                        w.n,
                        w.ab && w.ab !== "–" && React.createElement("div", { style: { color: "#f0b42999", fontSize: 10, fontWeight: "normal", marginTop: 1 } }, w.ab)),
                    ranged && React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.rng || "–"),
                    React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.a),
                    React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.hit || "–"),
                    React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.wnd || "–"),
                    React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.rnd),
                    React.createElement("td", { style: { textAlign: "center", padding: "4px 3px" } }, w.dmg)))))))));
}
function UnitRow({ unit, color, accent, bg }) {
    const [open, setOpen] = useState(false);
    return (React.createElement("div", { style: { marginBottom: 8, borderRadius: 10, overflow: "hidden", border: `1px solid ${open ? color : "#2a2a3a"}` } },
        React.createElement("div", { onClick: () => setOpen(!open), style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 13px", cursor: "pointer", background: open ? color + "22" : accent } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontWeight: "bold", color: open ? color : "#ddd", fontSize: 14 } }, unit.name),
                React.createElement("div", { style: { color: "#777", fontSize: 11, marginTop: 1 } }, unit.kw)),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                unit.role === "GENERAL" && React.createElement("span", { style: { background: color, color: "#000", fontSize: 9, fontWeight: "bold", padding: "2px 6px", borderRadius: 4 } }, "GENERAL"),
                React.createElement("span", { style: { color, fontSize: 16 } }, open ? "−" : "+"))),
        open && (React.createElement("div", { style: { padding: "12px 13px", background: bg } },
            React.createElement("div", { style: { display: "flex", gap: 6 } },
                React.createElement(StatBox, { label: "Move", val: unit.move, color: color }),
                React.createElement(StatBox, { label: "Health", val: unit.health, color: color }),
                React.createElement(StatBox, { label: "Save", val: unit.save, color: color }),
                React.createElement(StatBox, { label: "Control", val: unit.control, color: color })),
            unit.ranged && React.createElement(WeaponTable, { title: "Ranged Weapons", weapons: unit.ranged, ranged: true, color: color }),
            unit.melee && React.createElement(WeaponTable, { title: "Melee Weapons", weapons: unit.melee, color: color }),
            React.createElement("div", { style: { marginTop: 12 } }, (unit.abilities || []).map((ab, i) => (React.createElement("div", { key: i, style: { marginBottom: 8, paddingLeft: 10, borderLeft: `2px solid ${color}66` } },
                React.createElement("div", { style: { color, fontWeight: "bold", fontSize: 12.5 } }, ab.name),
                React.createElement("div", { style: { color: "#888", fontSize: 10.5, marginBottom: 2 } }, ab.t),
                React.createElement("div", { style: { color: "#ccc", fontSize: 12.5, lineHeight: 1.4 } }, ab.d))))),
            unit.note && React.createElement("div", { style: { marginTop: 6, color: "#999", fontSize: 11.5, fontStyle: "italic" } },
                "\uD83D\uDCCE ",
                unit.note)))));
}
function SLabel({ children }) {
    return React.createElement("div", { style: { color: "#999", fontSize: 12, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", margin: "20px 0 10px" } }, children);
}
function AbilCard({ ab, used, onToggle, color, accent }) {
    return (React.createElement("div", { style: { background: used ? "#111" : accent, border: `1px solid ${used ? "#333" : color + "55"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, opacity: used ? 0.55 : 1 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } },
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { color: used ? "#666" : color, fontWeight: "bold", fontSize: 14, marginBottom: 2 } }, ab.name),
                React.createElement("div", { style: { color: "#777", fontSize: 11, marginBottom: 6 } }, ab.timing),
                React.createElement("div", { style: { color: used ? "#666" : "#bbb", fontSize: 13, lineHeight: 1.4 } }, ab.desc),
                ab.tip && !used && React.createElement("div", { style: { marginTop: 5, color: "#f0b42988", fontSize: 12, fontStyle: "italic" } },
                    "\uD83D\uDCA1 ",
                    ab.tip)),
            onToggle && (React.createElement("button", { onClick: onToggle, style: btn(used ? "#2a2a2a" : color, used ? "#666" : "#000", { padding: "6px 10px", fontSize: 12, flexShrink: 0 }) }, used ? "Undo" : "Used ✓")))));
}
function SetupSection({ n, title, subtitle, color }) {
    return (React.createElement("div", { style: { margin: "22px 0 10px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8 } },
            React.createElement("span", { style: { background: color, color: "#000", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: "bold", flexShrink: 0 } }, n),
            React.createElement("span", { style: { color, fontWeight: "bold", fontSize: 16 } }, title)),
        React.createElement("div", { style: { color: "#888", fontSize: 12, marginTop: 3, paddingLeft: 30 } }, subtitle)));
}
function ChoiceCard({ item, selected, onSelect, color, accent }) {
    return (React.createElement("div", { onClick: onSelect, style: { background: selected ? color + "22" : accent, border: `2px solid ${selected ? color : "#2a2a3a"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer" } },
        React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
            React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: selected ? color : "transparent", border: `2px solid ${selected ? color : "#555"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#000" } }, selected ? "●" : ""),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 } },
                    React.createElement("div", { style: { color: selected ? color : "#ddd", fontWeight: "bold", fontSize: 14, marginBottom: 2 } }, item.name),
                    React.createElement("div", { style: { color: item.opb ? "#f0b42999" : "#4a9b4a99", fontSize: 11, flexShrink: 0, marginTop: 2 } }, item.opb ? "Once Per Battle" : "Passive/Repeatable")),
                React.createElement("div", { style: { color: "#777", fontSize: 11, marginBottom: 5 } }, item.timing),
                React.createElement("div", { style: { color: "#bbb", fontSize: 13, lineHeight: 1.4 } }, item.desc),
                item.tip && React.createElement("div", { style: { marginTop: 6, color: "#f0b42999", fontSize: 12, fontStyle: "italic" } },
                    "\uD83D\uDCA1 ",
                    item.tip)))));
}
const EOTG_UNITS = ["Chaos Lord (General)", "Chaos Chariot", "Chaos Warriors — unit A", "Chaos Warriors — unit B", "Chaos Knights"];
const EOTG_BLESSINGS = [
    { id: "tz", n: "Tzeentch", e: "Ward 6+", c: "#4a90d9" },
    { id: "sl", n: "Slaanesh", e: "+1 run", c: "#c471a5" },
    { id: "nu", n: "Nurgle", e: "−1 wound", c: "#7a9a3a" },
    { id: "kh", n: "Khorne", e: "+1 Rend", c: "#c0392b" }
];
function EyeOfGodsTracker({ eotg, onToggle, color, accent }) {
    return (React.createElement("div", { style: { background: accent, border: `1px solid ${color}55`, borderRadius: 10, padding: "12px", marginBottom: 16 } },
        React.createElement("div", { style: { color, fontWeight: "bold", fontSize: 13, marginBottom: 3 } }, "\uD83D\uDC41\uFE0F Eye of the Gods \u2014 blessings gained"),
        React.createElement("div", { style: { color: "#888", fontSize: 11, marginBottom: 11, lineHeight: 1.45 } }, "Tap to record a blessing. Units keep every blessing they gain; the same one twice isn't cumulative. Rolled a 6 (Champion of Chaos)? Tick whichever you picked. Rolled a 1? Nothing."),
        EOTG_UNITS.map((u, i) => (React.createElement("div", { key: i, style: { marginBottom: 9 } },
            React.createElement("div", { style: { color: "#ccc", fontSize: 11.5, fontWeight: "bold", marginBottom: 4 } }, u),
            React.createElement("div", { style: { display: "flex", gap: 5 } }, EOTG_BLESSINGS.map(b => {
                const key = `eotg:${i}:${b.id}`;
                const on = !!eotg[key];
                return (React.createElement("button", { key: b.id, onClick: () => onToggle(key), style: { flex: 1, padding: "6px 2px", borderRadius: 6, cursor: "pointer", lineHeight: 1.3, background: on ? b.c + "33" : "#14141c", color: on ? b.c : "#5f5f6b", border: `1px solid ${on ? b.c : "#2a2a35"}` } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: "bold" } },
                        on ? "✓ " : "",
                        b.n),
                    React.createElement("div", { style: { fontSize: 9, opacity: 0.9 } }, b.e)));
            }))))),
        React.createElement("div", { style: { color: "#666", fontSize: 10, fontStyle: "italic", marginTop: 2 } }, "D6 roll \u2192 2 Tzeentch \u00B7 3 Slaanesh \u00B7 4 Nurgle \u00B7 5 Khorne \u00B7 6 any")));
}
// ── Auto-save ────────────────────────────────────────────────────────────────
// The current game is kept in this browser's localStorage so a reload, a locked
// phone or a discarded tab does not lose it. Nothing leaves the device.
// Bump the version in SAVE_KEY whenever the saved shape changes: old saves are
// then ignored instead of being misread.
const SAVE_KEY = "spearhead-duel:game:v1";
const TAB_IDS = ["checklist", "abilities", "units", "reinforce"];
function validSavedGame(s) {
    const isObj = v => !!v && typeof v === "object" && !Array.isArray(v);
    const isInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!isObj(s) || s.v !== 1)
        return false;
    if (!["select", "setup", "game"].includes(s.view))
        return false;
    if (!["p1", "p2"].includes(s.setupStep) || !["p1", "p2"].includes(s.firstPlayer))
        return false;
    if (!["roundStart", "turn", "gameover"].includes(s.stage))
        return false;
    if (!isInt(s.round, 1, 4) || !isInt(s.turnSlot, 0, 1) || !isInt(s.phaseIdx, 0, TURN_PHASES.length - 1))
        return false;
    if (!isObj(s.checked) || !TAB_IDS.includes(s.tab) || !isObj(s.players))
        return false;
    for (const pid of ["p1", "p2"]) {
        const p = s.players[pid];
        if (!isObj(p) || !isObj(p.reinf) || !isObj(p.used) || !isInt(p.vp, 0, 999))
            return false;
        if (p.armyKey === null)
            continue;
        // Object.keys: only real armies count (not inherited names like "constructor").
        if (typeof p.armyKey !== "string" || !Object.keys(ARMIES).includes(p.armyKey))
            return false;
        const A = ARMIES[p.armyKey];
        if (!A.regimentAbilities.some(r => r.id === p.regiment))
            return false;
        if (!A.enhancements.some(e => e.id === p.enhancement))
            return false;
    }
    if (s.view === "game" && !(s.players.p1.armyKey && s.players.p2.armyKey))
        return false;
    if (s.view === "setup" && !s.players[s.setupStep].armyKey)
        return false;
    return true;
}
function loadSavedGame() {
    try {
        const raw = window.localStorage.getItem(SAVE_KEY);
        if (!raw)
            return null;
        const s = JSON.parse(raw);
        return validSavedGame(s) ? s : null;
    }
    catch (e) {
        return null;
    } // storage blocked, or the save is corrupt: start fresh
}
function storeSavedGame(state) {
    try {
        // Nothing chosen yet: there is no game to keep.
        if (state.view === "select" && state.setupStep === "p1")
            window.localStorage.removeItem(SAVE_KEY);
        else
            window.localStorage.setItem(SAVE_KEY, JSON.stringify(Object.assign({ v: 1 }, state)));
    }
    catch (e) { /* private mode / storage full: the app simply works without saving */ }
}
const BOOT_SAVE = loadSavedGame();
function App() {
    const sv = BOOT_SAVE;
    const [view, setView] = useState(sv ? sv.view : "select");
    const [setupStep, setSetupStep] = useState(sv ? sv.setupStep : "p1");
    const [players, setPlayers] = useState(sv ? sv.players : { p1: blankPlayer(), p2: blankPlayer() });
    const [round, setRound] = useState(sv ? sv.round : 1);
    const [stage, setStage] = useState(sv ? sv.stage : "roundStart");
    const [firstPlayer, setFirstPlayer] = useState(sv ? sv.firstPlayer : "p1");
    const [turnSlot, setTurnSlot] = useState(sv ? sv.turnSlot : 0);
    const [phaseIdx, setPhaseIdx] = useState(sv ? sv.phaseIdx : 0);
    const [checked, setChecked] = useState(sv ? sv.checked : {});
    const [tab, setTab] = useState(sv ? sv.tab : "checklist");
    const [showRules, setShowRules] = useState(false);
    // Keep new hooks BELOW this line: tests/smoke.cjs reads the eleven above by position.
    const [restored, setRestored] = useState(!!sv && sv.view === "game");
    useEffect(() => {
        storeSavedGame({ view, setupStep, players, round, stage, firstPlayer, turnSlot, phaseIdx, checked, tab });
    }, [view, setupStep, players, round, stage, firstPlayer, turnSlot, phaseIdx, checked, tab]);
    const aId = stage === "turn" ? (turnSlot === 0 ? firstPlayer : other(firstPlayer)) : firstPlayer;
    const opId = other(aId);
    const ap = players[aId];
    const op = players[opId];
    const oa = op && op.armyKey ? ARMIES[op.armyKey] : null;
    const armyKey = ap.armyKey;
    const a = armyKey ? ARMIES[armyKey] : null;
    const turnPhase = TURN_PHASES[phaseIdx];
    const checklist = a && stage === "turn" ? getChecklist(turnPhase.id, armyKey, ap, round) : [];
    const oppList = a && oa && stage === "turn" ? getOppList(turnPhase.id, op.armyKey, op, round) : [];
    const bothArmies = !!(players.p1.armyKey && players.p2.armyKey);
    const roundStartItems = bothArmies ? [...BASE_LISTS.roundStart, ...["p1", "p2"].flatMap(pid => getOwnExtras("roundStart", players[pid].armyKey, players[pid], round).map(i => (Object.assign(Object.assign({}, i), { id: pid + ":" + i.id, label: ARMIES[players[pid].armyKey].emoji + " " + pName(pid) + " — " + i.label }))))] : [];
    const chosenReg = a ? a.regimentAbilities.find(r => r.id === ap.regiment) : null;
    const chosenEnh = a ? a.enhancements.find(e => e.id === ap.enhancement) : null;
    const underdog = players.p1.vp === players.p2.vp ? null : (players.p1.vp < players.p2.vp ? "p1" : "p2");
    const toggleCheck = id => setChecked(p => (Object.assign(Object.assign({}, p), { [id]: !p[id] })));
    const toggleReinf = id => setPlayers(p => (Object.assign(Object.assign({}, p), { [aId]: Object.assign(Object.assign({}, p[aId]), { reinf: Object.assign(Object.assign({}, p[aId].reinf), { [id]: !p[aId].reinf[id] }) }) })));
    const toggleAb = id => setPlayers(p => (Object.assign(Object.assign({}, p), { [aId]: Object.assign(Object.assign({}, p[aId]), { used: Object.assign(Object.assign({}, p[aId].used), { [id]: !p[aId].used[id] }) }) })));
    const setVP = (pid, delta) => setPlayers(p => (Object.assign(Object.assign({}, p), { [pid]: Object.assign(Object.assign({}, p[pid]), { vp: Math.max(0, p[pid].vp + delta) }) })));
    const doSelect = key => {
        const A = ARMIES[key];
        setPlayers(p => (Object.assign(Object.assign({}, p), { [setupStep]: Object.assign(Object.assign({}, blankPlayer()), { armyKey: key, regiment: A.regimentAbilities[0].id, enhancement: A.enhancements[0].id }) })));
        setView("setup");
    };
    const updateSetup = patch => setPlayers(p => (Object.assign(Object.assign({}, p), { [setupStep]: Object.assign(Object.assign({}, p[setupStep]), patch) })));
    const finishSetup = () => { if (setupStep === "p1") {
        setSetupStep("p2");
        setView("select");
    }
    else {
        startGame();
    } };
    const startGame = () => {
        setRound(1);
        setStage("roundStart");
        setFirstPlayer("p1");
        setTurnSlot(0);
        setPhaseIdx(0);
        setChecked({});
        setTab("checklist");
        setPlayers(p => ({ p1: Object.assign(Object.assign({}, p.p1), { vp: 0, reinf: {}, used: {} }), p2: Object.assign(Object.assign({}, p.p2), { vp: 0, reinf: {}, used: {} }) }));
        setView("game");
    };
    const doReset = () => { setView("select"); setSetupStep("p1"); setPlayers({ p1: blankPlayer(), p2: blankPlayer() }); setRestored(false); };
    const goPhase = i => { setPhaseIdx(i); setChecked({}); };
    const beginTurn = () => { setStage("turn"); setTurnSlot(0); setPhaseIdx(0); setChecked({}); setTab("checklist"); };
    const prevInTurn = () => { if (phaseIdx > 0) {
        setPhaseIdx(phaseIdx - 1);
        setChecked({});
    } };
    const advance = () => {
        if (phaseIdx < TURN_PHASES.length - 1) {
            setPhaseIdx(phaseIdx + 1);
            setChecked({});
            return;
        }
        if (turnSlot === 0) {
            setTurnSlot(1);
            setPhaseIdx(0);
            setChecked({});
            setTab("checklist");
        }
        else if (round < 4) {
            setRound(round + 1);
            setStage("roundStart");
            setTurnSlot(0);
            setPhaseIdx(0);
            setChecked({});
            setTab("checklist");
        }
        else {
            setStage("gameover");
        }
    };
    if (view === "select")
        return React.createElement(React.Fragment, null,
            showRules && React.createElement(RulesOverlay, { onClose: () => setShowRules(false) }),
            React.createElement(SelectView, { step: setupStep, players: players, onSelect: doSelect, onRules: () => setShowRules(true), onBack: setupStep === "p2" ? () => { setSetupStep("p1"); setView("setup"); } : null }));
    if (view === "setup")
        return (React.createElement(SetupView, { army: ARMIES[players[setupStep].armyKey], player: players[setupStep], onChange: updateSetup, stepLabel: pName(setupStep), isLast: setupStep === "p2", onBack: () => setView("select"), onNext: finishSetup }));
    const themeBg = stage === "turn" ? a.bg : "#0a0a14";
    const themeAccent = stage === "turn" ? a.accent : "#15151f";
    const themeColor = stage === "turn" ? a.color : "#9aa0b5";
    return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", background: themeBg, minHeight: "100vh", color: "#fff", maxWidth: 480, margin: "0 auto" } },
        showRules && React.createElement(RulesOverlay, { onClose: () => setShowRules(false) }),
        React.createElement("div", { style: { background: themeAccent, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${themeColor}44` } },
            React.createElement("button", { onClick: () => { setView("setup"); setSetupStep("p1"); }, style: btn("none", "#aaa", { fontSize: 13, padding: "4px 8px" }) }, "\u2190 Setup"),
            React.createElement("div", { style: { textAlign: "center" } }, stage === "turn"
                ? React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { color: a.color, fontWeight: "bold", fontSize: 15 } },
                        a.emoji,
                        " ",
                        a.name),
                    React.createElement("div", { style: { color: "#888", fontSize: 11 } },
                        pName(aId),
                        " \u00B7 Turn ",
                        turnSlot + 1,
                        " of 2"))
                : React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { color: "#cfd3e6", fontWeight: "bold", fontSize: 15 } },
                        "\uD83C\uDFB2 Battle Round ",
                        round),
                    React.createElement("div", { style: { color: "#888", fontSize: 11 } }, stage === "gameover" ? "Game Over" : "Round Start"))),
            React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
                React.createElement("button", { onClick: () => setShowRules(true), title: "Spearhead rules", style: btn("none", "#f0b429", { fontSize: 16, padding: "4px 6px" }) }, "\uD83D\uDCD6"),
                React.createElement("button", { onClick: doReset, style: btn("none", "#777", { fontSize: 12, padding: "4px 8px" }) }, "New Game"))),
        restored && (React.createElement("div", { style: { background: "#12261a", borderBottom: "1px solid #1f5c36", padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } },
            React.createElement("div", { style: { color: "#86efac", fontSize: 12 } }, "\u21BA Saved game restored \u2014 carry on where you left off."),
            React.createElement("button", { onClick: () => setRestored(false), "aria-label": "Dismiss", style: btn("none", "#86efac", { fontSize: 13, padding: "2px 6px" }) }, "\u2715"))),
        React.createElement("div", { style: { background: "#111", padding: "10px 14px", borderBottom: "1px solid #222" } },
            React.createElement("div", null,
                React.createElement("div", { style: { color: "#666", fontSize: 10, marginBottom: 5 } }, "BATTLE ROUND"),
                React.createElement("div", { style: { display: "flex", gap: 5 } }, [1, 2, 3, 4].map(r => (React.createElement("div", { key: r, style: { width: 26, height: 26, borderRadius: "50%", background: r === round ? themeColor : r < round ? "#2a2a2a" : "transparent", border: `2px solid ${r <= round ? themeColor : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", color: r === round ? "#000" : r < round ? "#555" : "#444", fontWeight: "bold", fontSize: 11 } }, r < round ? "✓" : r))))),
            React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, ["p1", "p2"].map(pid => {
                const pl = players[pid];
                const pa = ARMIES[pl.armyKey];
                const isActive = stage === "turn" && pid === aId;
                return (React.createElement("div", { key: pid, style: { flex: 1, background: isActive ? pa.color + "22" : "#181820", border: `1px solid ${isActive ? pa.color : "#262630"}`, borderRadius: 8, padding: "7px 9px" } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } },
                        React.createElement("span", { style: { color: pa.color, fontSize: 11, fontWeight: "bold" } },
                            pa.emoji,
                            " ",
                            pName(pid)),
                        underdog === pid && React.createElement("span", { style: { color: "#7dff7d", fontSize: 9, fontWeight: "bold" } }, "UNDERDOG"),
                        isActive && React.createElement("span", { style: { color: pa.color, fontSize: 9, fontWeight: "bold" } }, "\u25CF ACTIVE")),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
                        React.createElement("button", { onClick: () => setVP(pid, -1), style: btn("#2a2a2a", "#aaa", { padding: "1px 9px", fontSize: 15 }) }, "\u2212"),
                        React.createElement("span", { style: { color: pa.color, fontWeight: "bold", fontSize: 21 } }, pl.vp),
                        React.createElement("button", { onClick: () => setVP(pid, 1), style: btn(pa.color + "33", pa.color, { padding: "1px 9px", fontSize: 15 }) }, "+")),
                    React.createElement("div", { style: { color: "#777", fontSize: 9, textAlign: "center", marginTop: 2 } }, pa.name)));
            }))),
        stage === "gameover" && (React.createElement("div", { style: { padding: "40px 20px", textAlign: "center" } },
            React.createElement("div", { style: { fontSize: 48, marginBottom: 10 } }, "\uD83C\uDFC6"),
            players.p1.vp === players.p2.vp
                ? React.createElement("div", { style: { fontSize: 22, fontWeight: "bold", color: "#f0b429" } }, "It's a Draw!")
                : React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { fontSize: 13, color: "#888" } }, "Victory!"),
                    React.createElement("div", { style: { fontSize: 24, fontWeight: "bold", color: (players.p1.vp > players.p2.vp ? ARMIES[players.p1.armyKey].color : ARMIES[players.p2.armyKey].color), marginTop: 4 } }, players.p1.vp > players.p2.vp ? pName("p1") : pName("p2")),
                    React.createElement("div", { style: { color: "#aaa", fontSize: 14, marginTop: 6 } },
                        ARMIES[(players.p1.vp > players.p2.vp ? players.p1 : players.p2).armyKey].name,
                        " wins ",
                        Math.max(players.p1.vp, players.p2.vp),
                        "\u2013",
                        Math.min(players.p1.vp, players.p2.vp))),
            React.createElement("button", { onClick: doReset, style: Object.assign(Object.assign({}, btn("#f0b429", "#000")), { marginTop: 28, padding: "13px 26px", fontSize: 15, borderRadius: 8 }) }, "\u2694\uFE0F New Game"))),
        stage === "roundStart" && (React.createElement("div", { style: { padding: "14px 14px 36px" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
                React.createElement("span", { style: { fontSize: 20 } }, "\uD83C\uDFB2"),
                React.createElement("h2", { style: { color: "#cfd3e6", margin: 0, fontSize: 18 } },
                    "Round ",
                    round,
                    " \u2014 Round Start")),
            React.createElement("div", { style: { color: "#888", fontSize: 12, marginBottom: 14 } }, "Shared steps for both players before the first turn."),
            roundStartItems.map(item => (React.createElement("div", { key: item.id, onClick: () => !item.dim && toggleCheck(item.id), style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", marginBottom: 7, borderRadius: 8, background: item.dim ? "transparent" : (checked[item.id] ? "#0c1a0c" : "#15151f"), border: `1px solid ${item.dim ? "transparent" : (checked[item.id] ? "#2a5a2a" : "#252535")}`, cursor: item.dim ? "default" : "pointer", opacity: item.dim ? 0.5 : 1 } },
                !item.dim && React.createElement("div", { style: { width: 21, height: 21, borderRadius: 4, flexShrink: 0, marginTop: 1, background: checked[item.id] ? "#4caf50" : "transparent", border: `2px solid ${checked[item.id] ? "#4caf50" : "#444"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#000" } }, checked[item.id] ? "✓" : ""),
                React.createElement("span", { style: { fontSize: 13, lineHeight: 1.45, color: checked[item.id] ? "#666" : item.dim ? "#777" : "#ddd", textDecoration: checked[item.id] ? "line-through" : "none", paddingLeft: item.dim ? 31 : 0 } }, item.label)))),
            React.createElement("div", { style: { color: "#999", fontSize: 12, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", margin: "22px 0 8px" } }, "Who takes the first turn?"),
            React.createElement("div", { style: { color: "#777", fontSize: 12, marginBottom: 10 } }, "Winner of the priority roll decides."),
            React.createElement("div", { style: { display: "flex", gap: 8 } }, ["p1", "p2"].map(pid => {
                const pa = ARMIES[players[pid].armyKey];
                const sel = firstPlayer === pid;
                return (React.createElement("button", { key: pid, onClick: () => setFirstPlayer(pid), style: { flex: 1, padding: "12px 8px", borderRadius: 10, cursor: "pointer", fontWeight: "bold", background: sel ? pa.color + "22" : "#181820", color: sel ? pa.color : "#999", border: `2px solid ${sel ? pa.color : "#2a2a3a"}`, fontSize: 13 } },
                    React.createElement("div", { style: { fontSize: 18 } }, pa.emoji),
                    sel ? "● " : "",
                    pName(pid)));
            })),
            React.createElement("button", { onClick: beginTurn, style: Object.assign(Object.assign({}, btn(ARMIES[players[firstPlayer].armyKey].color, "#000")), { width: "100%", marginTop: 20, padding: "14px", fontSize: 15, borderRadius: 8 }) },
                "Begin ",
                pName(firstPlayer),
                "'s Turn \u2192"))),
        stage === "turn" && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", background: "#0d0d18", borderBottom: "1px solid #222", overflowX: "auto" } }, TURN_PHASES.map((p, i) => (React.createElement("button", { key: p.id, onClick: () => goPhase(i), style: { flex: 1, background: "none", border: "none", borderBottom: i === phaseIdx ? `2px solid ${a.color}` : "2px solid transparent", color: i === phaseIdx ? a.color : "#555", padding: "7px 2px", cursor: "pointer", fontSize: 10.5, minWidth: 50, fontWeight: i === phaseIdx ? "bold" : "normal", textAlign: "center" } },
                React.createElement("div", null, p.icon),
                React.createElement("div", { style: { marginTop: 2 } }, p.short))))),
            React.createElement("div", { style: { display: "flex", background: "#0a0a14", borderBottom: "1px solid #222" } }, [{ id: "checklist", l: "✅ Checklist" }, { id: "abilities", l: "⚡ Abilities" }, { id: "units", l: "📋 Units" }, { id: "reinforce", l: "🔁 Reinforce" }].map(t => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), style: { flex: 1, background: "none", border: "none", borderBottom: tab === t.id ? `2px solid ${a.color}` : "2px solid transparent", color: tab === t.id ? a.color : "#555", padding: "9px 3px", cursor: "pointer", fontSize: 11.5, fontWeight: tab === t.id ? "bold" : "normal" } }, t.l)))),
            React.createElement("div", { style: { padding: "14px 14px 36px" } },
                tab === "checklist" && React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } },
                        React.createElement("span", { style: { fontSize: 20 } }, turnPhase.icon),
                        React.createElement("h2", { style: { color: a.color, margin: 0, fontSize: 18 } }, turnPhase.label)),
                    checklist.map(item => (React.createElement("div", { key: item.id, onClick: () => !item.dim && toggleCheck(item.id), style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", marginBottom: 7, borderRadius: 8, background: item.dim ? "transparent" : (checked[item.id] ? "#0c1a0c" : a.accent), border: `1px solid ${item.dim ? "transparent" : (checked[item.id] ? "#2a5a2a" : "#252535")}`, cursor: item.dim ? "default" : "pointer", opacity: item.dim ? 0.5 : 1 } },
                        !item.dim && React.createElement("div", { style: { width: 21, height: 21, borderRadius: 4, flexShrink: 0, marginTop: 1, background: checked[item.id] ? "#4caf50" : "transparent", border: `2px solid ${checked[item.id] ? "#4caf50" : "#444"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#000" } }, checked[item.id] ? "✓" : ""),
                        React.createElement("span", { style: { fontSize: 13, lineHeight: 1.45, color: checked[item.id] ? "#666" : item.dim ? "#777" : "#ddd", textDecoration: checked[item.id] ? "line-through" : "none", paddingLeft: item.dim ? 31 : 0 } }, item.label)))),
                    oppList.length > 0 && React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { color: oa.color, fontSize: 11.5, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.4px", margin: "16px 0 8px" } },
                            oa.emoji,
                            " ",
                            pName(opId),
                            " (",
                            oa.name,
                            ") can also use"),
                        oppList.map(item => {
                            const k = "op:" + item.id;
                            return (React.createElement("div", { key: k, onClick: () => toggleCheck(k), style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", marginBottom: 7, borderRadius: 8, background: checked[k] ? "#0c1a0c" : oa.accent, border: `1px dashed ${checked[k] ? "#2a5a2a" : oa.color + "88"}`, cursor: "pointer" } },
                                React.createElement("div", { style: { width: 21, height: 21, borderRadius: 4, flexShrink: 0, marginTop: 1, background: checked[k] ? "#4caf50" : "transparent", border: `2px solid ${checked[k] ? "#4caf50" : "#444"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#000" } }, checked[k] ? "✓" : ""),
                                React.createElement("span", { style: { fontSize: 13, lineHeight: 1.45, color: checked[k] ? "#666" : "#ddd", textDecoration: checked[k] ? "line-through" : "none" } }, item.label)));
                        })),
                    React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 20 } },
                        phaseIdx > 0 && React.createElement("button", { onClick: prevInTurn, style: btn("#222", "#aaa", { padding: "12px 16px", fontSize: 14, borderRadius: 8, minWidth: 80 }) }, "\u2190 Back"),
                        React.createElement("button", { onClick: advance, style: btn(a.color, "#000", { flex: 1, padding: "13px", fontSize: 15, borderRadius: 8 }) }, phaseIdx < TURN_PHASES.length - 1 ? "Next Phase →" : turnSlot === 0 ? (pName(opId) + "'s Turn →") : round < 4 ? ("End Round → Round " + (round + 1) + " →") : "Finish Game 🏆"))),
                tab === "abilities" && React.createElement(React.Fragment, null,
                    React.createElement(SLabel, null, "Battle Traits"),
                    a.battleTraits.map(bt => (React.createElement(AbilCard, { key: bt.id, ab: bt, used: ap.used[bt.id], onToggle: bt.opb ? () => toggleAb(bt.id) : null, color: a.color, accent: a.accent }))),
                    React.createElement(SLabel, null,
                        "Regiment Ability ",
                        React.createElement("span", { style: { color: "#888", fontSize: 11, fontWeight: "normal" } }, "(chosen)")),
                    chosenReg && React.createElement(AbilCard, { ab: chosenReg, used: ap.used[chosenReg.id], onToggle: chosenReg.opb ? () => toggleAb(chosenReg.id) : null, color: a.color, accent: a.accent }),
                    React.createElement(SLabel, null,
                        "General's Enhancement ",
                        React.createElement("span", { style: { color: "#888", fontSize: 11, fontWeight: "normal" } }, "(chosen)")),
                    chosenEnh && React.createElement(AbilCard, { ab: chosenEnh, used: ap.used[chosenEnh.id], onToggle: chosenEnh.opb ? () => toggleAb(chosenEnh.id) : null, color: a.color, accent: a.accent }),
                    React.createElement(SLabel, null, "Unit Abilities & Tips"),
                    a.tips.map((t, i) => (React.createElement("div", { key: i, style: { background: a.accent, border: "1px solid #252535", borderRadius: 8, padding: "10px 12px", marginBottom: 6, fontSize: 13, lineHeight: 1.4, color: "#ccc" } }, t)))),
                tab === "units" && React.createElement(React.Fragment, null,
                    React.createElement("h2", { style: { color: a.color, margin: "0 0 4px", fontSize: 18 } }, "\uD83D\uDCCB Unit Lookup"),
                    React.createElement("div", { style: { color: "#888", fontSize: 12, marginBottom: 14 } }, "Tap any unit to see its full warscroll \u2014 stats, weapons & abilities."),
                    armyKey === "bloodwind" && React.createElement(EyeOfGodsTracker, { eotg: ap.used, onToggle: toggleAb, color: a.color, accent: a.accent }),
                    (UNIT_CARDS[armyKey] || []).map((u, i) => (React.createElement(UnitRow, { key: i, unit: u, color: a.color, accent: a.accent, bg: a.bg })))),
                tab === "reinforce" && React.createElement(React.Fragment, null,
                    React.createElement("h2", { style: { color: a.color, margin: "0 0 8px", fontSize: 18 } }, "\uD83D\uDD01 Reinforcements & Reserves"),
                    React.createElement("div", { style: { background: "#111", borderRadius: 8, padding: "10px 12px", marginBottom: 14, fontSize: 13, color: "#888", lineHeight: 1.6 } },
                        React.createElement("strong", { style: { color: "#aaa" } }, "How it works:"),
                        " Once per turn, in your ",
                        React.createElement("strong", null, "Movement Phase"),
                        ", bring back a destroyed unit with the ",
                        React.createElement("em", null, "Reinforcements"),
                        " keyword (wholly within 6\" of the board edge, in friendly territory, not in combat). Each unit can be reinforced once per game. Some armies use special reserve rules instead (see each unit's note).",
                        armyKey === "gnawfeast" && ap.enhancement === "lsh" && (React.createElement("div", { style: { marginTop: 8, padding: "6px 8px", background: a.accent, borderRadius: 6, color: a.color } }, "\u26A1 Lead the Seething Horde active! Place the unit within 13\" of your General instead."))),
                    (a.noReinforcements || a.reinforcements.length === 0) && (React.createElement("div", { style: { background: a.accent, border: `1px solid ${a.color}66`, borderRadius: 10, padding: "14px", fontSize: 13, color: "#ccc", lineHeight: 1.55, marginBottom: 12 } },
                        "\u26A0\uFE0F ",
                        React.createElement("strong", { style: { color: a.color } }, "No Reinforcements."),
                        " No unit in this army has the ",
                        React.createElement("em", null, "Reinforcements"),
                        " keyword, so this force can't Call for Reinforcements. Every model you lose is gone for good.",
                        a.reinforcements.length > 0 ? " The units listed below start in reserve and arrive later instead." : "")),
                    a.reinforcements.map(r => (React.createElement("div", { key: r.id, style: { background: ap.reinf[r.id] ? "#111" : a.accent, border: `2px solid ${ap.reinf[r.id] ? "#333" : a.color}`, borderRadius: 10, padding: "13px 15px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, opacity: ap.reinf[r.id] ? 0.5 : 1 } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontWeight: "bold", color: ap.reinf[r.id] ? "#555" : a.color, marginBottom: 3 } }, r.name),
                            React.createElement("div", { style: { color: "#777", fontSize: 11.5, lineHeight: 1.4 } },
                                ap.reinf[r.id] ? (r.reserve ? "✅ Arrived. " : "⚠️ Used this game. ") : (r.reserve ? "⏳ In reserve. " : "✅ Available. "),
                                r.note)),
                        React.createElement("button", { onClick: () => toggleReinf(r.id), style: btn(ap.reinf[r.id] ? "#2a2a2a" : a.color, ap.reinf[r.id] ? "#666" : "#000", { padding: "8px 12px", fontSize: 12, flexShrink: 0 }) }, ap.reinf[r.id] ? "Undo" : (r.reserve ? "Mark Arrived" : "Mark Used"))))))))));
}
function SelectView({ step, players, onSelect, onBack, onRules }) {
    const otherId = step === "p1" ? "p2" : "p1";
    const otherPick = players[otherId] && players[otherId].armyKey ? ARMIES[players[otherId].armyKey] : null;
    return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", background: "#0a0a14", minHeight: "100vh", padding: "24px 16px", color: "#fff" } },
        React.createElement("div", { style: { maxWidth: 420, margin: "0 auto" } },
            React.createElement("h1", { style: { textAlign: "center", fontSize: 24, margin: "0 0 4px" } }, "\u2694\uFE0F Spearhead Duel"),
            React.createElement("p", { style: { textAlign: "center", color: "#888", fontSize: 14, margin: "0 0 18px" } }, "Warhammer Age of Sigmar \u00B7 4th ed."),
            React.createElement("div", { style: { background: "#15151f", border: "1px solid #2a2a3a", borderRadius: 10, padding: "10px 14px", marginBottom: 18, textAlign: "center" } },
                React.createElement("div", { style: { color: "#f0b429", fontWeight: "bold", fontSize: 15 } },
                    pName(step),
                    " \u2014 choose your army"),
                otherPick && React.createElement("div", { style: { color: "#888", fontSize: 12, marginTop: 3 } },
                    pName(otherId),
                    ": ",
                    otherPick.emoji,
                    " ",
                    otherPick.name)),
            Object.entries(ARMIES).map(([key, a]) => (React.createElement("div", { key: key, onClick: () => onSelect(key), style: { background: a.bg, border: `2px solid ${a.color}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14, cursor: "pointer", boxShadow: `0 0 20px ${a.color}22` } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
                    React.createElement("span", { style: { fontSize: 36 } }, a.emoji),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: "bold", fontSize: 17, color: a.color } }, a.name),
                        React.createElement("div", { style: { color: "#999", fontSize: 13, marginTop: 2 } }, a.faction),
                        React.createElement("div", { style: { color: "#777", fontSize: 12, marginTop: 4 } },
                            "General: ",
                            a.general)))))),
            onBack && React.createElement("button", { onClick: onBack, style: btn("#222", "#aaa", { width: "100%", padding: "11px", fontSize: 14, borderRadius: 8, marginTop: 4 }) },
                "\u2190 Back to ",
                pName(otherId),
                " setup"),
            React.createElement("button", { onClick: onRules, style: btn("#1a1a12", "#f0b429", { width: "100%", padding: "12px", fontSize: 13.5, borderRadius: 8, marginTop: 10, border: "1px solid #f0b42944" }) }, "\uD83D\uDCD6 Rules \u2014 Core \u00B7 Fire & Jade \u00B7 Sand & Bone \u00B7 City of Ash"))));
}
function SetupView({ army: a, player, onChange, stepLabel, isLast, onBack, onNext }) {
    const isCrixxit = a.general === "Deathmaster Crixxit";
    const canStart = player.regiment && player.enhancement;
    return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", background: a.bg, minHeight: "100vh", color: "#fff", maxWidth: 480, margin: "0 auto" } },
        React.createElement("div", { style: { background: a.accent, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${a.color}44` } },
            React.createElement("button", { onClick: onBack, style: btn("none", "#aaa", { fontSize: 13 }) }, "\u2190 Back"),
            React.createElement("div", null,
                React.createElement("div", { style: { color: a.color, fontWeight: "bold" } },
                    a.emoji,
                    " ",
                    a.name),
                React.createElement("div", { style: { color: "#777", fontSize: 12 } },
                    stepLabel,
                    " \u00B7 Pre-Game Setup"))),
        React.createElement("div", { style: { padding: "16px 14px 40px" } },
            React.createElement(SetupSection, { n: "1", title: "Regiment Ability", subtitle: "Pick ONE \u2014 before the game starts", color: a.color }),
            a.regimentAbilities.map(r => (React.createElement(ChoiceCard, { key: r.id, item: r, selected: player.regiment === r.id, onSelect: () => onChange({ regiment: r.id }), color: a.color, accent: a.accent }))),
            React.createElement(SetupSection, { n: "2", title: "General's Enhancement", subtitle: "Pick ONE \u2014 before the game starts", color: a.color }),
            a.enhancements.map(e => (React.createElement(ChoiceCard, { key: e.id, item: e, selected: player.enhancement === e.id, onSelect: () => onChange({ enhancement: e.id }), color: a.color, accent: a.accent }))),
            isCrixxit && React.createElement(React.Fragment, null,
                React.createElement(SetupSection, { n: "3", title: "Cloaked in Shadow", subtitle: "Reminder \u2014 your key battle trait", color: a.color }),
                React.createElement("div", { style: { background: a.accent, border: `1px solid ${a.color}44`, borderRadius: 10, padding: 12, marginBottom: 8 } },
                    React.createElement("div", { style: { color: "#aaa", fontSize: 13, lineHeight: 1.5 } }, "Once per turn (any combat phase): pick a friendly Hero and a different friendly unit with 2+ models. On a 3+ shadow-travel roll, teleport the Hero within 6\" of that unit \u2014 even into an ongoing combat. Master of Shadows makes it a 2+."))),
            React.createElement("button", { onClick: onNext, disabled: !canStart, style: Object.assign(Object.assign({}, btn(canStart ? a.color : "#333", canStart ? "#000" : "#666")), { width: "100%", marginTop: 24, padding: "14px", fontSize: 16, borderRadius: 8, boxSizing: "border-box" }) }, isLast ? "⚔️ Start Battle" : "Next: Player 2 →"))));
}
// Shows a readable message instead of a blank page if rendering ever throws.
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error, info) { console.error("Spearhead Duel crashed:", error, info && info.componentStack); }
    render() {
        if (!this.state.error)
            return this.props.children;
        const msg = String((this.state.error && this.state.error.message) || this.state.error);
        return (React.createElement("div", { style: { maxWidth: 480, margin: "0 auto", padding: "48px 20px", fontFamily: "system-ui,sans-serif", color: "#fff" } },
            React.createElement("div", { style: { fontSize: 20, fontWeight: "bold", color: "#f87171", marginBottom: 10 } }, "Something went wrong"),
            React.createElement("div", { style: { color: "#ccc", fontSize: 14, lineHeight: 1.5, marginBottom: 14 } }, "The app hit an unexpected error and the current game could not be kept. Reload to start a new game."),
            React.createElement("pre", { style: { whiteSpace: "pre-wrap", background: "#1a1a2e", padding: 12, borderRadius: 6, fontSize: 12, color: "#fca5a5", marginBottom: 16 } }, msg),
            React.createElement("button", { onClick: () => window.location.reload(), style: btn("#f0b429", "#000", { padding: "10px 18px", fontSize: 14 }) }, "Reload")));
    }
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ErrorBoundary, null,
    React.createElement(App, null)));
