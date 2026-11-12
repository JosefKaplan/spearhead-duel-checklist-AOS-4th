# Spearhead Duel — AoS 4th

A two-player turn and checklist helper for **Warhammer Age of Sigmar — Spearhead** (4th edition).

**Live:** https://josefkaplan.github.io/spearhead-duel-checklist-AOS-4th/ (after the first deploy)

## Use it
Open the link on a phone or tablet at the table. To use it offline from disk, open `index.html`
directly: everything is local and no server or internet connection is needed.

## What's in it
- Both players pick an army, a regiment ability and an enhancement. The app then walks the
  battle round turn by turn: round start → Player 1's turn → Player 2's turn → next round.
- The full turn sequence: **Hero → Movement → Shooting → Charge → Combat → End of Turn**.
- Per-phase **checklists** with the core rules plus army reminders:
  - reminders for a regiment ability or enhancement appear only if you picked it;
  - reserve arrivals appear only from the right round;
  - the **opponent's reactions** ("end of any turn", "any combat phase", "enemy movement
    phase" abilities) show up during your turn.
- **Ability** cards with once-per-battle tracking, full **unit warscrolls**, **reinforcement and
  reserve** tracking, and an Eye of the Gods tracker for the Bloodwind Legion.
- **Auto-save:** the current game is kept in the browser, so a reload or a locked phone doesn't
  lose it. "New Game" clears it. Nothing is sent anywhere.
- **📖 Rules:**
  - core Spearhead rules;
  - Fire & Jade;
  - Sand & Bone, with the full twist and tactic decks and mystical terrain;
  - City of Ash, with relics and the campaign.

## Armies (11)
- Stormcast Eternals: Vigilant Brotherhood, Yndrasta's Spearhead
- Skaven: Gnawfeast Clawpack, Warpspark Clawpack, Crixxit's Kill-Pack
- Cities of Sigmar: Sentinels of Embergard
- Helsmiths of Hashut: Helforge Host
- Ossiarch Bonereapers: Tithe-Reaper Echelon, Mortisan Elite, Kavalos Vanguard
- Slaves to Darkness: Bloodwind Legion

## Data sources
Warscrolls are transcribed from the official GW **Spearhead** PDFs and cards, not from
matched-play warscrolls. GW's April 2026 rules update is applied. The later 2026 updates
changed no Spearhead army in this app. The battlepack rules were checked against Fire & Jade,
Sand & Bone and City of Ash.

Card and rules text is summarised in our own words, so keep your printed cards handy. If in
doubt, the card wins.

## Development
The app source is `src/app.jsx`. `app.js` is generated from it, so never edit `app.js` by hand.

```bash
npm ci            # installs the pinned TypeScript compiler (the only dependency)
npm run build     # src/app.jsx -> app.js
npm run check     # verifies app.js is up to date + runs the smoke test (44 simulated games)
```

Commit both `src/app.jsx` and `app.js`. Every push to `main` is checked and deployed to GitHub
Pages by `.github/workflows/deploy.yml`. See `CLAUDE.md` for the full guide: data model,
sourcing rules and deployment steps.

GW publishes rules updates every quarter. When a Spearhead card changes, update the matching
entry in `ARMIES`, `UNIT_CARDS` or `ARMY_EXTRAS` in `src/app.jsx`, then rebuild.

---
*Unofficial fan-made tool. Not affiliated with, endorsed or sponsored by Games Workshop.
Warhammer, Age of Sigmar, Spearhead and all associated names are trademarks of Games Workshop Ltd.*
