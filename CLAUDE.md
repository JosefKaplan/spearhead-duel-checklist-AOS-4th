# CLAUDE.md — Spearhead Duel

Guide for agents who deploy or edit this repo. Read all of it before changing anything. The
owner is Joe (GitHub `JosefKaplan`). He cares most about the **rules data being exactly right**.

## What this is

Spearhead Duel is a static, single-page web app. It is a two-player turn and checklist helper
for **Warhammer Age of Sigmar 4th edition, Spearhead** format.

- Each player picks one of 11 Spearhead armies, then a regiment ability and an enhancement.
- The app then walks both players through every battle round, phase by phase, with
  checklists. It also has warscroll lookup, reinforcement and reserve tracking, once-per-battle
  tracking, VP scoring and a rules reference (Core, Fire & Jade, Sand & Bone, City of Ash).

There is no backend, no analytics, no network calls and no runtime dependencies beyond
React 18. All of React lives in `vendor/`. The only thing stored is the current game, in the
browser's own `localStorage` (see "Auto-save" below). Nothing leaves the device.

- Git remote: `https://github.com/JosefKaplan/spearhead-duel-checklist-AOS-4th.git`, branch `main`.
- Live URL once deployed: **https://josefkaplan.github.io/spearhead-duel-checklist-AOS-4th/**

## File map

| Path | What it is | Edit? |
|---|---|---|
| `src/app.jsx` | **The whole app, the single source of truth.** Data and React components in one file. JSX, no imports: it uses the global `React` and `ReactDOM`. | ✅ yes |
| `app.js` | Generated from `src/app.jsx` by `npm run build`. **Committed on purpose** (see below). | ❌ never by hand |
| `index.html` | Static shell. Loads `vendor/react…`, `vendor/react-dom…`, then `app.js` with relative paths. Has a boot guard (shows why the app failed to start instead of a blank page), a `<noscript>` message and the Games Workshop disclaimer footer. | rarely |
| `vendor/react*.production.min.js` | React 18.3.1 UMD production builds, byte-identical to the npm tarballs. | ❌ (see "Upgrading React") |
| `vendor/LICENSE-react.txt` | React's MIT licence. It must ship with the React files. | ❌ |
| `favicon.svg` | Tab icon. | ok |
| `scripts/build.mjs` | Build script. Uses TypeScript's transpiler only, with no type checking: JSX becomes `React.createElement`, syntax is lowered to ES2017, and a "GENERATED" banner is added. `--check` mode fails if `app.js` is stale. | rarely |
| `tests/smoke.cjs` | Zero-dependency test of the **built** `app.js` (details below). | when the UI changes |
| `package.json` / `package-lock.json` | Only dev dependency: `typescript` pinned to **exactly 5.9.3**, so builds are byte-reproducible. Don't bump it casually: any compiler change changes `app.js`. Do not move to TypeScript 7.x: it is the native Go port and lacks the `transpileModule` JS API that the build uses. | rarely |
| `.github/workflows/deploy.yml` | On push to `main`: `npm ci`, `npm run check`, assemble `_site/`, deploy to Pages. | when needed |
| `.github/workflows/ci.yml` | Same checks on pull requests and other branches. | when needed |
| `.nojekyll` | Only matters for the branch-deploy fallback. Keep it. | no |

`.idea/` and `.DS_Store` are Joe's local editor files and are git-ignored. Don't commit them and don't delete them.

## Commands

```bash
npm ci            # install the pinned TypeScript (the only dependency)
npm run build     # src/app.jsx -> app.js
npm test          # smoke test of app.js (about 2 s)
npm run check     # build --check (app.js up to date?) + smoke test  <- run before every commit
```

Local preview needs no server: open `index.html` directly. `app.js` is a classic script, so
`file://` works. You can also run `python3 -m http.server` in the repo root and open
http://localhost:8000/.

## Deploying to GitHub Pages (the task you were probably given)

Everything is already prepared. The steps:

0. **Move the workflow files into place.** The agent that prepared this repo was not allowed
   to write into `.github/workflows/`, so the two workflows wait in `deploy/workflows/`:
   ```bash
   mkdir -p .github/workflows
   mv deploy/workflows/deploy.yml deploy/workflows/ci.yml .github/workflows/
   rmdir deploy/workflows deploy
   ```
   Review both files before committing. They only run `npm ci`, `npm run check` and the
   official `actions/*` Pages actions. Once they are moved, ignore the `deploy/` mentions below.
1. **Verify locally.** Run `npm ci && npm run check`. It must print `OK — all smoke checks passed.`
   If it fails, stop and report. Do not deploy a failing build.
2. **Commit.** The repo was `git init`-ed with no commits yet. Stage everything except what
   `.gitignore` excludes. In particular, `app.js`, `vendor/`, `package-lock.json`, `.nojekyll`
   and `.github/` **must** be committed. Check with `git status` that `node_modules/`,
   `.idea/` and `.DS_Store` are *not* staged. Suggested message: `Spearhead Duel: static build
   for GitHub Pages`.
3. **Make sure the GitHub repo exists.** Run `gh repo view JosefKaplan/spearhead-duel-checklist-AOS-4th`.
   If it doesn't exist, create it **public**. On a free GitHub plan, Pages only works for
   public repos, and Joe asked for Pages:
   `gh repo create JosefKaplan/spearhead-duel-checklist-AOS-4th --public`.
   `origin` already points to that URL, so don't add another remote.
   If it already exists and is private, don't change its visibility yourself. Ask Joe.
   Private Pages needs a paid plan.
4. **Push.** Run `git push -u origin main`.
5. **Turn on Pages with the Actions source** (one time):
   ```bash
   # if Pages has never been enabled for the repo:
   gh api -X POST repos/JosefKaplan/spearhead-duel-checklist-AOS-4th/pages -f build_type=workflow
   # if Pages already exists (e.g. set to "deploy from branch"), switch it:
   gh api -X PUT  repos/JosefKaplan/spearhead-duel-checklist-AOS-4th/pages -f build_type=workflow
   ```
   You can also do this in the web UI: Settings → Pages → Build and deployment → Source:
   **GitHub Actions**.
6. **Run and watch the deploy.** Pushing to `main` triggers `Deploy to GitHub Pages`. If the
   push happened before Pages was enabled, the first run may have failed. Re-run it with
   `gh workflow run deploy.yml`, then `gh run watch`.
7. **Verify the live site.**
   - `curl -sI https://josefkaplan.github.io/spearhead-duel-checklist-AOS-4th/` should return
     200. Do the same for `…/app.js` and `…/vendor/react-dom.production.min.js`.
   - In a browser, the page should show "Spearhead Duel" and a list of **11 armies**. The
     console should be free of errors, and you should be able to start a game.
   - Pages can take a minute or two after the run turns green. Its CDN caches for about
     10 minutes.

**Fallback, only if Actions deploys are not possible:** Settings → Pages → Source: "Deploy
from a branch" → `main` / `/ (root)`. This works because `app.js` is committed and all paths
are relative. However, it publishes the whole repo and skips the test gate, so prefer Actions.

### Gotchas

- **Paths must stay relative** (`app.js`, never `/app.js`). A project site is served under
  `/spearhead-duel-checklist-AOS-4th/`. The smoke test enforces this.
- **`app.js` must stay a classic script** (no `import`/`export`). The build fails if output
  contains them.
- Don't re-add in-browser Babel or CDN `<script>` tags. The test fails on both.
- If you work through a sandboxed shell that cannot delete files (for example Joe's Cowork
  device bridge), git leaves `.git/index.lock` behind and later git commands fail. Use a
  normal terminal for git.

## Editing the app

- Change **`src/app.jsx` only**. Then run `npm run build && npm run check`, and commit **both**
  `src/app.jsx` and `app.js`. CI fails if `app.js` doesn't match the source.
- The file is long (about 2,000 lines) and is ordered as follows:
  1. data: `ARMIES`, `BASE_LISTS`, `ARMY_EXTRAS`;
  2. gating helpers, then `TURN_PHASES`;
  3. data: `UNIT_CARDS`, then the rules packs `FNJ`, `SNB`, `COA`, `CORE`;
  4. rules components, ending with `RulesOverlay`;
  5. unit and ability components;
  6. the Eye of the Gods tracker (Bloodwind);
  7. the screens `App`, `SelectView`, `SetupView`;
  8. `ErrorBoundary`, then the mount line.
- All text is real UTF-8. **Never write `\uXXXX` escapes inside JSX text or attribute strings.**
  JSX doesn't process them, so they render literally. The test fails on literal `\u`.
- Styling is inline style objects. The layout is mobile-first with `maxWidth: 480`. There is no
  CSS framework.
- The game state lives in `App`'s `useState` hooks.
- **Auto-save.** After every change, a `useEffect` in `App` writes the game to `localStorage`
  under the key `spearhead-duel:game:v1`. On load, `loadSavedGame()` reads it and
  `validSavedGame()` checks every field against the current data (army keys, regiment ability
  and enhancement ids, ranges). Anything invalid is ignored and the app starts fresh.
  - "New Game" removes the save.
  - All storage access is wrapped in try/catch, so the app works when storage is blocked.
  - If you change the shape of the saved state, **bump the version in `SAVE_KEY`** (`v1` → `v2`)
    and the `v` check, so old saves are dropped instead of misread.
  - Renaming an army key or a regiment ability / enhancement id invalidates saves that use
    it. That is intended.
- **The smoke test reads `App`'s state by hook position:**
  `[view, setupStep, players, round, stage, firstPlayer, turnSlot, phaseIdx, checked, tab, showRules]`.
  Add new `useState` calls **after** these eleven. If you remove or reorder them, update the
  `S()` usages in `tests/smoke.cjs`. The test also finds controls by their visible labels: "General:",
  "Next: Player 2", "Start Battle", "Begin", "📖", the rules pack and tab labels,
  "✅ Checklist", "Next Phase", "End Round", "Finish Game", "New Game", "Used ✓",
  "Mark Used"/"Mark Arrived", and the rules section buttons with `minWidth: 62`. If you rename
  any of these, update the test.

### Data model (in `src/app.jsx`)

- `ARMIES[key]` has the fields `name`, `faction`, `color`/`bg`/`accent` (`#rrggbb`), `emoji`,
  `general` (must equal the GENERAL unit card's name) and `units` (roster strings, excluding the
  general). Further fields:
  - `reinforcements: [{id, name, note, reserve?}]`.
  - `noReinforcements?: true`. Set it when the army has no Reinforcements units. Then every
    `reinforcements` entry must be a `reserve: true` arrival.
  - `battleTraits`, `regimentAbilities` (**exactly 2**) and `enhancements` (**exactly 4**).
    Each entry is `{id, name, timing, opb, desc, tip}`. `opb` means once per battle.
  - `tips`, and the optional `rosterNote`.
- Army keys: `vigilant`, `gnawfeast`, `crixxit`, `sentinels`, `warpspark`, `helforge`,
  `obrTithe`, `obrMortisan`, `obrKavalos`, `bloodwind`, `yndrasta`.
- `UNIT_CARDS[key]` is a list of cards. Each card is
  `{name, role: "GENERAL"|"UNIT", kw, move: '6"', save: "4+", health, control, ranged?, melee, abilities: [{name, t, d}], note?}`.
  - A weapon is `{n, rng? (ranged only), a, hit, wnd, rnd, dmg, ab}`.
  - Use `"–"` (en dash) for "none".
- `BASE_LISTS[phase]` holds the core reminders. Each item is `{id, label, dim?}`; `dim` marks a
  greyed-out info line.
  - The phases are `roundStart`, `hero`, `movement`, `shooting`, `charge`, `combat` and
    `endTurn`.
- `ARMY_EXTRAS[armyKey][phase]` holds the army reminders. Each item has `id` and `label`, plus
  these optional fields:
  - `need` — a regiment ability or enhancement id. The reminder shows only if that choice was
    picked.
  - `when` — `"any"` means it shows on both players' turns. `"enemy"` means it shows only
    during the opponent's turn, in the opponent's "can also use" block.
  - `minRound` and `onlyRound` (1–4).
  - The smoke test proves every reminder is reachable in the UI.
- Rules packs: `CORE`, `FNJ` (Fire & Jade), `SNB` (Sand & Bone, with full twist and tactic
  decks) and `COA` (City of Ash, rules only, no cards, as Joe asked).

## Data-sourcing rules (non-negotiable)

- Use **Spearhead** cards and PDFs only. **Never use matched-play AoS warscrolls.** They
  differ, and Joe has caught this before. The sources are the free GW downloads on
  warhammer-community.com and Joe's photos of the printed Spearhead cards.
- Every Spearhead has 2 regiment abilities and 4 enhancements. An ability that targets
  "your general" is an enhancement.
- **Never invent rules, names or numbers.** If a source is missing or unreadable, leave the
  existing data alone and tell Joe exactly what you couldn't verify. Fabricated abilities have
  happened before and he found them.
- Write the text as a faithful paraphrase. Don't copy long passages of rules text verbatim.
  This is a public site.
- Errata status as of November 2026:
  - GW's **April 2026** rules update is applied.
  - The **June 2026** and **September 2026** Battlescroll articles list no Spearhead changes.
  - The autumn 2026 Spearhead changes touched only Heartflayer Troupe, Slasher Host,
    Swampskulka Gang and Sunblood Prowlers, none of which are in this app.
  - When GW publishes a new update, check its Spearhead section against the 11 armies above.
- **Source ranking.** GW's official PDFs and rules updates win. Joe's one-page card sheets are
  fan-made summaries: very accurate, but they contain a few slips. Wahapedia transcribes the
  official text with errata and is a good second check. Known slips on the sheets, where the
  app follows the official text instead:
  - Grey Seer "Wither" targets a visible enemy **within** 13" (the sheet says "wholly within").
  - Yndrasta's "Strike with the Tempest's Rage" is **Passive** (the sheet's header says
    "Your Movement Phase").
  - The Bloodwind Chaos Chariot ability is **"Swift Death"** (the sheet calls it "Devastating
    Charge"; the rule is the same).
- Last full audit: 13 November 2026. All 11 armies were compared line by line with the card
  sheets, then with the official PDFs or Wahapedia. Sentinels of Embergard has only the card
  sheet as a source. The battlepack rules were re-checked against Wahapedia's Fire and Jade,
  Sand and Bone and City of Ash pages. GW's October 2026 update PDF could not be opened; its
  announcement names no army in this app.
- Sand & Bone objective counts per map were removed because they could not be verified. Don't
  re-add them without a source.

## What the smoke test covers (`tests/smoke.cjs`)

1. **Site files.** `index.html` loads React, then React-DOM, then `app.js`. All paths are
   relative and point to files that exist. There is no external resource and no Babel, and
   `app.js` has the build banner.
2. **Data.** The shapes and rules above: 2 regiment abilities and 4 enhancements per army, one
   general card that matches, sane stat formats, unique ids, valid `need`/`when`/round values,
   and no `\u`, `undefined`, `NaN` or `TODO` in any text.
3. **Gating.** For every army × regiment ability × enhancement × round × phase, each reminder
   is visible exactly when it should be, on its own player's turn and on the opponent's. The
   ErrorBoundary fallback renders.
4. **Click-through.** A tiny React stand-in renders the real components. It plays 44 complete
   games (each army as Player 1 with 4 different setups), visiting every tab, rules page and
   phase. It fails on exceptions, on bad text, and on any army reminder that was never shown.

5. **Auto-save.** A game survives a simulated page reload exactly. Corrupt, stale or tampered
   saves are ignored. Storage that throws is tolerated. "New Game" forgets the save.

It does **not** check visual layout. After UI changes, look at the page in a browser at phone
width (about 390 px).

## Upgrading React (only if needed)

The files are copied from `npm pack react@18.3.1 react-dom@18.3.1`, `package/umd/*.production.min.js`.
- `react.production.min.js` has sha384 `DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z`.
- `react-dom.production.min.js` has sha384 `gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1`.

React 19 ships no UMD builds, so staying on 18.3.1 is deliberate.

## Don'ts

- Don't add trackers, analytics, cookies, external fonts or CDNs. `localStorage` is used for the
  auto-save only.
- Don't change the repo's visibility, licence or Pages settings beyond what's described above
  without asking Joe.
- Don't remove the Games Workshop disclaimer in `index.html`.
- Don't put personal data (emails, names beyond the GitHub handle) into the site or the repo.
