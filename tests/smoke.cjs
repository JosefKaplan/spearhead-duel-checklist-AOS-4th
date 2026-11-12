#!/usr/bin/env node
// Zero-dependency smoke test for Spearhead Duel.  Run:  node tests/smoke.cjs   (or: npm test)
//
// It tests the BUILT app.js (what actually ships), in five parts:
//   1. Site files   — index.html loads only local, relative files that exist (GitHub Pages
//                     serves a project site under /<repo>/, so absolute "/..." paths break).
//   2. Data         — every army has the Spearhead shape (2 regiment abilities, 4 enhancements,
//                     one general card, ...) and every reminder points at a real choice.
//   3. Gating logic — reminders tied to a regiment ability / enhancement appear only when it was picked.
//   4. Click-through — a tiny React stand-in renders the real components and plays 44 full games
//                     (each army x 4 setups) through every screen, tab, rules page and phase,
//                     failing on any exception or on "undefined"/"NaN"/"[object Object]"/"\u" text.
//                     It finishes by checking that every army reminder was shown at least once.
//   5. Auto-save    — a game survives a "page reload" exactly, broken or stale saves are ignored,
//                     storage that throws is tolerated, and New Game forgets the save.
//
// It does not check visual layout. Exit code 0 = all good, 1 = failures (listed).

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const failures = [];
const fail = (msg) => failures.push(msg);
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// ───────────────────────────── 1. Site files ─────────────────────────────
function checkSiteFiles() {
  if (!fs.existsSync(path.join(ROOT, "app.js"))) {
    console.error("app.js is missing — run `npm run build` first.");
    process.exit(1);
  }
  const html = read("index.html");
  const refs = [...html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const want of ["vendor/react.production.min.js", "vendor/react-dom.production.min.js", "app.js"]) {
    if (!refs.includes(want)) fail(`index.html does not load ${want}`);
  }
  const order = ["vendor/react.production.min.js", "vendor/react-dom.production.min.js", "app.js"].map((r) => refs.indexOf(r));
  if (!(order[0] < order[1] && order[1] < order[2])) fail("index.html must load react, then react-dom, then app.js");
  for (const ref of refs) {
    if (/^(https?:)?\/\//.test(ref)) fail(`index.html loads an external resource (${ref}); keep everything vendored`);
    else if (ref.startsWith("/")) fail(`index.html uses an absolute path (${ref}); GitHub Pages project sites need relative paths`);
    else if (!ref.startsWith("data:") && !fs.existsSync(path.join(ROOT, ref))) fail(`index.html references missing file ${ref}`);
  }
  if (/text\/babel|babel(\.min)?\.js/.test(html)) fail("index.html still uses in-browser Babel; the app must be prebuilt");
  if (!/^\/\*! Spearhead Duel — GENERATED FILE/.test(read("app.js"))) fail("app.js lacks the build banner — was it edited by hand?");
}

// ─────────────────────── tiny React stand-in + app loader ───────────────────────
const Fragment = Symbol("Fragment");
const hookStore = new Map();
let curKey = null;
let hookIdx = 0;
class Component {
  constructor(props) { this.props = props; this.state = {}; }
}
Component.prototype.isReactComponent = {};
const React = {
  Fragment,
  Component,
  createElement(type, props, ...children) { return { type, props: props || {}, children: children.flat(Infinity) }; },
  useState(init) {
    const key = curKey;
    let s = hookStore.get(key);
    if (!s) { s = []; hookStore.set(key, s); }
    const i = hookIdx++;
    if (!(i in s)) s[i] = typeof init === "function" ? init() : init;
    return [s[i], (v) => { s[i] = typeof v === "function" ? v(s[i]) : v; }];
  },
  // Effects run after every render (dependency lists are ignored — fine for an idempotent save).
  useEffect(fn) { pendingEffects.push(fn); },
};
let pendingEffects = [];
let rootEl = null;
const ReactDOM = { createRoot() { return { render(el) { rootEl = el; } }; } };

const EXPORTS = ["ARMIES", "ARMY_EXTRAS", "UNIT_CARDS", "BASE_LISTS", "TURN_PHASES", "FNJ", "SNB", "COA", "CORE",
  "getChecklist", "getOppList", "getOwnExtras", "ErrorBoundary"];
const appSource = read("app.js");
// Evaluates app.js like a fresh page load. `storage` plays window.localStorage (omit = no storage at all).
function loadApp(storage) {
  hookStore.clear();
  rootEl = null;
  const win = { location: { reload() {} } };
  if (storage) win.localStorage = storage;
  return new Function("React", "ReactDOM", "document", "window",
    appSource + `\nreturn { ${EXPORTS.join(", ")} };`)(React, ReactDOM, { getElementById() { return {}; } }, win);
}
function fakeStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, map: m };
}
let lib;
try {
  lib = loadApp(null);
} catch (e) {
  console.error("app.js failed to load: " + (e && e.stack || e));
  process.exit(1);
}
if (!rootEl) { console.error("app.js did not call ReactDOM.createRoot(...).render(...)"); process.exit(1); }
const { ARMIES, ARMY_EXTRAS, UNIT_CARDS, BASE_LISTS, TURN_PHASES } = lib;
const armyKeys = Object.keys(ARMIES);

// ───────────────────────────── 2. Data ─────────────────────────────
function checkData() {
  const isStr = (v) => typeof v === "string" && v.trim().length > 0;
  const isHex = (v) => /^#[0-9a-f]{6}$/i.test(v);
  const phaseIds = ["roundStart", ...TURN_PHASES.map((p) => p.id)];

  if (armyKeys.length < 1) fail("ARMIES is empty");
  for (const ph of phaseIds) if (!Array.isArray(BASE_LISTS[ph]) || !BASE_LISTS[ph].length) fail(`BASE_LISTS.${ph} is missing or empty`);
  for (const [ph, list] of Object.entries(BASE_LISTS)) {
    if (!phaseIds.includes(ph)) fail(`BASE_LISTS has unknown phase "${ph}"`);
    const ids = list.map((i) => i.id);
    if (new Set(ids).size !== ids.length) fail(`BASE_LISTS.${ph} has duplicate ids`);
    list.forEach((i) => { if (!isStr(i.id) || !isStr(i.label)) fail(`BASE_LISTS.${ph} item without id/label`); });
  }

  for (const k of armyKeys) {
    const a = ARMIES[k];
    const where = `ARMIES.${k}`;
    for (const f of ["name", "faction", "emoji", "general"]) if (!isStr(a[f])) fail(`${where}.${f} missing`);
    for (const f of ["color", "bg", "accent"]) if (!isHex(a[f])) fail(`${where}.${f} is not a #rrggbb colour`);
    for (const f of ["units", "reinforcements", "battleTraits", "regimentAbilities", "enhancements", "tips"]) {
      if (!Array.isArray(a[f])) fail(`${where}.${f} is not an array`);
    }
    if (!Array.isArray(a.units) || !a.units.length) fail(`${where}.units is empty`);
    // Every Spearhead offers exactly 2 regiment abilities and 4 enhancements (pick one of each).
    if (a.regimentAbilities.length !== 2) fail(`${where} has ${a.regimentAbilities.length} regiment abilities (Spearhead: exactly 2)`);
    if (a.enhancements.length !== 4) fail(`${where} has ${a.enhancements.length} enhancements (Spearhead: exactly 4)`);
    if (a.battleTraits.length < 1) fail(`${where} has no battle traits`);
    const abil = [...a.battleTraits, ...a.regimentAbilities, ...a.enhancements];
    for (const x of abil) {
      for (const f of ["id", "name", "timing", "desc"]) if (!isStr(x[f])) fail(`${where} ability "${x.name || x.id}" missing ${f}`);
      if (typeof x.opb !== "boolean") fail(`${where} ability "${x.name}" needs opb: true/false`);
      if (typeof x.tip !== "string") fail(`${where} ability "${x.name}" needs a tip string`);
    }
    const abilIds = abil.map((x) => x.id);
    if (new Set(abilIds).size !== abilIds.length) fail(`${where} has duplicate ability ids: ${abilIds.join(", ")}`);
    const reinfIds = a.reinforcements.map((r) => r.id);
    if (new Set(reinfIds).size !== reinfIds.length) fail(`${where} has duplicate reinforcement ids`);
    for (const r of a.reinforcements) {
      if (!isStr(r.id) || !isStr(r.name) || !isStr(r.note)) fail(`${where} reinforcement entry missing id/name/note`);
      if (a.noReinforcements && !r.reserve) fail(`${where} is marked noReinforcements but lists "${r.name}" as a reinforcement (mark it reserve: true or fix the flag)`);
    }

    // Unit cards
    const cards = UNIT_CARDS[k];
    if (!Array.isArray(cards) || !cards.length) { fail(`UNIT_CARDS.${k} is missing`); continue; }
    const gens = cards.filter((c) => c.role === "GENERAL");
    if (gens.length !== 1) fail(`UNIT_CARDS.${k} has ${gens.length} GENERAL cards (want 1)`);
    else if (gens[0].name !== a.general) fail(`UNIT_CARDS.${k} general "${gens[0].name}" ≠ ARMIES.${k}.general "${a.general}"`);
    for (const c of cards) {
      const cw = `UNIT_CARDS.${k} "${c.name}"`;
      if (!isStr(c.name) || !isStr(c.kw)) fail(`${cw} missing name/kw`);
      if (!["GENERAL", "UNIT"].includes(c.role)) fail(`${cw} role must be GENERAL or UNIT`);
      if (!/^\d+"$/.test(c.move)) fail(`${cw} move "${c.move}" should look like 6"`);
      if (!/^[2-6]\+$/.test(c.save)) fail(`${cw} save "${c.save}" should look like 4+`);
      if (!Number.isInteger(c.health) || c.health < 1) fail(`${cw} health must be a positive integer`);
      if (!Number.isInteger(c.control) || c.control < 0) fail(`${cw} control must be an integer ≥ 0`);
      if (!Array.isArray(c.melee) || !c.melee.length) fail(`${cw} has no melee weapons`);
      const weapons = [...(c.ranged || []).map((w) => [w, true]), ...(c.melee || []).map((w) => [w, false])];
      for (const [w, ranged] of weapons) {
        const ww = `${cw} weapon "${w.n}"`;
        if (!isStr(w.n)) fail(`${cw} weapon without a name`);
        if (ranged && !/^\d+"$/.test(w.rng)) fail(`${ww} (ranged) needs rng like 12"`);
        if (!ranged && w.rng !== undefined) fail(`${ww} is melee but has a range`);
        for (const f of ["a", "hit", "wnd", "rnd", "dmg"]) {
          if (!(typeof w[f] === "number" || isStr(w[f]))) fail(`${ww} ${f} is missing`);
        }
        if (!/^([2-6]\+|–)$/.test(w.hit) || !/^([2-6]\+|–)$/.test(w.wnd)) fail(`${ww} hit/wound should look like 3+ (or – )`);
        if (!isStr(w.ab)) fail(`${ww} ab must be text ("–" when the weapon has no ability)`);
      }
      for (const ab of c.abilities || []) if (!isStr(ab.name) || !isStr(ab.t) || !isStr(ab.d)) fail(`${cw} ability missing name/t/d`);
    }
  }
  for (const k of Object.keys(UNIT_CARDS)) if (!ARMIES[k]) fail(`UNIT_CARDS.${k} has no matching army`);

  // Army reminders
  for (const [k, phases] of Object.entries(ARMY_EXTRAS)) {
    const a = ARMIES[k];
    if (!a) { fail(`ARMY_EXTRAS.${k} has no matching army`); continue; }
    const choiceIds = new Set([...a.regimentAbilities, ...a.enhancements].map((x) => x.id));
    for (const [ph, list] of Object.entries(phases)) {
      const where = `ARMY_EXTRAS.${k}.${ph}`;
      if (!phaseIds.includes(ph)) fail(`${where}: unknown phase (use one of ${phaseIds.join(", ")})`);
      const ids = list.map((i) => i.id);
      if (new Set(ids).size !== ids.length) fail(`${where} has duplicate ids`);
      for (const i of list) {
        if (!isStr(i.id) || !isStr(i.label)) fail(`${where} item without id/label`);
        if (i.need !== undefined && !choiceIds.has(i.need)) fail(`${where} "${i.id}" needs "${i.need}", which is not a regiment ability or enhancement id of ${k}`);
        if (i.when !== undefined && !["any", "enemy"].includes(i.when)) fail(`${where} "${i.id}" has when "${i.when}" (use "any" or "enemy")`);
        for (const f of ["minRound", "onlyRound"]) {
          if (i[f] !== undefined && !(Number.isInteger(i[f]) && i[f] >= 1 && i[f] <= 4)) fail(`${where} "${i.id}" ${f} must be 1–4`);
        }
      }
    }
  }

  // Text hygiene across all data (catches literal \u escapes, template slips, placeholders).
  const walk = (v, p) => {
    if (typeof v === "string") {
      if (/\\u[0-9a-f]{4}/i.test(v)) fail(`${p}: literal \\u escape in text`);
      if (/\bundefined\b|\bNaN\b|\[object |TODO|FIXME|lorem/i.test(v)) fail(`${p}: suspicious text "${v.slice(0, 60)}"`);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
    else if (v && typeof v === "object") Object.entries(v).forEach(([kk, x]) => walk(x, `${p}.${kk}`));
  };
  for (const name of ["ARMIES", "ARMY_EXTRAS", "UNIT_CARDS", "BASE_LISTS", "FNJ", "SNB", "COA", "CORE"]) {
    if (!lib[name] || typeof lib[name] !== "object" || !Object.keys(lib[name]).length) fail(`${name} is missing or empty`);
    walk(lib[name], name);
  }
}

// ───────────────────────────── 3. Gating logic ─────────────────────────────
function checkGating() {
  const { getChecklist, getOppList } = lib;
  for (const k of armyKeys) {
    const a = ARMIES[k];
    const extras = ARMY_EXTRAS[k] || {};
    for (const reg of a.regimentAbilities) for (const enh of a.enhancements) for (let round = 1; round <= 4; round++) {
      const player = { armyKey: k, regiment: reg.id, enhancement: enh.id, vp: 0, reinf: {}, used: {} };
      for (const ph of TURN_PHASES.map((p) => p.id)) {
        const own = new Set(getChecklist(ph, k, player, round).map((i) => i.id));
        const opp = new Set(getOppList(ph, k, player, round).map((i) => i.id));
        for (const item of extras[ph] || []) {
          const chosen = !item.need || item.need === reg.id || item.need === enh.id;
          const inRound = (!item.onlyRound || item.onlyRound === round) && (!item.minRound || round >= item.minRound);
          const wantOwn = chosen && inRound && item.when !== "enemy";
          const wantOpp = chosen && inRound && (item.when === "any" || item.when === "enemy");
          if (own.has(item.id) !== wantOwn) fail(`gating: ${k}.${ph}.${item.id} own-turn visibility wrong (regiment ${reg.id}, enhancement ${enh.id}, round ${round})`);
          if (opp.has(item.id) !== wantOpp) fail(`gating: ${k}.${ph}.${item.id} opponent-turn visibility wrong (regiment ${reg.id}, enhancement ${enh.id}, round ${round})`);
        }
      }
    }
  }
  // The crash screen must render too.
  const { ErrorBoundary } = lib;
  const eb = new ErrorBoundary({ children: null });
  eb.state = ErrorBoundary.getDerivedStateFromError(new Error("boom"));
  const t = text(render(eb.render(), "eb"));
  if (!t.includes("Something went wrong") || !t.includes("boom")) fail("ErrorBoundary fallback does not render the error");
}

// ───────────────────────────── renderer helpers ─────────────────────────────
function render(node, p) {
  if (node == null || node === false || node === true) return null;
  if (typeof node === "string" || typeof node === "number") return { text: String(node) };
  if (Array.isArray(node)) return { kids: node.map((n, i) => render(n, p + "." + i)) };
  if (node.type === Fragment) return { kids: node.children.map((c, i) => render(c, p + ".f" + i)) };
  if (typeof node.type === "function") {
    const key = p + ">" + node.type.name + (node.props.key != null ? "#" + node.props.key : "");
    const props = { ...node.props };
    if (node.children.length) props.children = node.children.length === 1 ? node.children[0] : node.children;
    if (node.type.prototype && node.type.prototype.isReactComponent) {
      const inst = new node.type(props);
      return render(inst.render(), key);
    }
    const pk = curKey, pi = hookIdx;
    curKey = key; hookIdx = 0;
    let out;
    try { out = node.type(props); } finally { curKey = pk; hookIdx = pi; }
    return render(out, key);
  }
  return { tag: node.type, props: node.props, kids: node.children.map((c, i) => render(c, p + "/" + (c && c.props && c.props.key != null ? "k" + c.props.key : i))) };
}
const text = (n) => (!n ? "" : n.text !== undefined ? n.text : (n.kids || []).map(text).join(""));
const clickables = (n, acc = []) => {
  if (!n) return acc;
  if (n.tag && n.props.onClick) acc.push(n);
  (n.kids || []).forEach((k) => clickables(k, acc));
  return acc;
};

// ───────────────────────────── 4. Click-through ─────────────────────────────
let tree;
let renders = 0;
const seenItemText = [];
const rr = () => {
    pendingEffects = [];
    tree = render(rootEl, "root");
    renders++;
    pendingEffects.forEach((fn) => fn());
    const tx = text(tree);
    for (const bad of ["undefined", "NaN", "[object Object]", "\\u"]) {
      const at = tx.indexOf(bad);
      if (at !== -1) throw new Error(`bad text "${bad}" near: …${tx.slice(Math.max(0, at - 70), at + 30)}…`);
    }
    return tx;
  };
  const clickWhere = (pred, desc) => {
    const c = clickables(tree).filter(pred);
    if (!c.length) throw new Error("nothing to click: " + desc);
    c[0].props.onClick({});
    return rr();
  };
  const appKey = () => [...hookStore.keys()].find((k) => /(^|>)App$/.test(k));
  // App's useState order: [view, setupStep, players, round, stage, firstPlayer, turnSlot, phaseIdx, checked, tab, showRules]
  const S = () => hookStore.get(appKey());
  const checkItems = () => clickables(tree).filter((n) => n.tag === "div" && n.props.style && n.props.style.cursor === "pointer");
  const tickAll = () => {
    const n = checkItems().length;
    for (let j = 0; j < n; j++) { const c = checkItems()[j]; seenItemText.push(text(c)); c.props.onClick({}); rr(); }
  };

function clickThrough() {
  const stats = { games: 0, ownItems: 0, oppItems: 0, errors: [] };
  let ctx = "";
  rr();

  function pickArmy(key, reg, enh, who) {
    const a = ARMIES[key];
    clickWhere((n) => n.tag === "div" && text(n).includes(a.name) && text(n).includes("General:"), "army " + a.name);
    const r = a.regimentAbilities[reg], e = a.enhancements[enh];
    clickWhere((n) => n.tag === "div" && text(n).includes(r.name) && text(n).includes(r.desc), "regiment " + r.name);
    clickWhere((n) => n.tag === "div" && text(n).includes(e.name) && text(n).includes(e.desc), "enhancement " + e.name);
    const pl = S()[2][who];
    if (pl.armyKey !== key || pl.regiment !== r.id || pl.enhancement !== e.id) throw new Error(`setup mismatch for ${who}: ${JSON.stringify(pl)}`);
  }

  for (let i = 0; i < armyKeys.length; i++) for (let k = 0; k < 4; k++) {
    const A = armyKeys[i], B = armyKeys[(i + 1 + k) % armyKeys.length];
    ctx = `${A}(regiment ${k % 2}, enhancement ${k}) vs ${B}`;
    try {
      if (S()[0] !== "select") clickWhere((n) => n.tag === "button" && text(n) === "New Game", "new game");
      pickArmy(A, k % 2, k, "p1");
      clickWhere((n) => n.tag === "button" && text(n).includes("Next: Player 2"), "next: player 2");
      pickArmy(B, (k + 1) % 2, (k + 2) % 4, "p2");
      clickWhere((n) => n.tag === "button" && text(n).includes("Start Battle"), "start battle");
      if (S()[0] !== "game") throw new Error("did not reach the game view");
      let rulesDone = false, guard = 0;
      while (S()[4] !== "gameover") {
        if (++guard > 400) throw new Error("game loop did not finish");
        const round = S()[3];
        ctx = `${A}(regiment ${k % 2}, enhancement ${k}) vs ${B} · round ${round} · ${S()[4]} · turn ${S()[6]} · phase ${S()[7]}`;
        if (S()[4] === "roundStart") {
          tickAll();
          if (round % 2 === 0) clickWhere((n) => n.tag === "button" && text(n).endsWith("Player 2"), "player 2 goes first");
          if (round === 2) for (let v = 0; v < 2; v++) clickWhere((n) => n.tag === "button" && text(n) === "+", "VP +");
          clickWhere((n) => n.tag === "button" && text(n).includes("Begin"), "begin turn");
          continue;
        }
        if (!rulesDone) {
          clickWhere((n) => n.tag === "button" && text(n) === "📖", "rules button");
          for (const pk of ["📜 Core", "🔥 Fire & Jade", "💀 Sand & Bone", "🏚️ City of Ash"]) {
            clickWhere((n) => n.tag === "button" && text(n) === pk, pk);
            const secs = clickables(tree).filter((n) => n.tag === "button" && n.props.style && n.props.style.minWidth === 62).map(text);
            if (secs.length < 4) throw new Error("rules pack has too few sections: " + pk);
            for (const s of secs) clickWhere((n) => n.tag === "button" && text(n) === s && n.props.style.minWidth === 62, s);
          }
          clickWhere((n) => n.tag === "button" && text(n).startsWith("Close"), "close rules");
          rulesDone = true;
        }
        if (S()[7] === 0) {
          for (const tab of ["⚡ Abilities", "📋 Units", "🔁 Reinforce"]) {
            clickWhere((n) => n.tag === "button" && text(n) === tab, tab);
            if (tab === "⚡ Abilities") { let g = 0; while (clickables(tree).some((n) => text(n) === "Used ✓") && g++ < 10) clickWhere((n) => text(n) === "Used ✓", "used"); }
            if (tab === "📋 Units") {
              const rows = clickables(tree).filter((n) => n.tag === "div").length;
              for (let j = 0; j < rows; j++) { const c = clickables(tree).filter((n) => n.tag === "div"); c[j].props.onClick({}); rr(); }
              if (clickables(tree).some((n) => text(n).includes("Tzeentch"))) clickWhere((n) => n.tag === "button" && text(n).includes("Khorne"), "Eye of the Gods mark");
            }
            if (tab === "🔁 Reinforce") { let g = 0; while (clickables(tree).some((n) => /^Mark (Used|Arrived)$/.test(text(n))) && g++ < 6) clickWhere((n) => /^Mark (Used|Arrived)$/.test(text(n)), "mark"); }
          }
          clickWhere((n) => n.tag === "button" && text(n) === "✅ Checklist", "checklist tab");
        }
        const items = checkItems();
        const opp = items.filter((n) => String(n.props.style.border || "").includes("dashed")).length;
        stats.ownItems += items.length - opp;
        stats.oppItems += opp;
        if (items.length - opp < 1) throw new Error("phase checklist is empty");
        tickAll();
        clickWhere((n) => n.tag === "button" && /Next Phase|'s Turn →|End Round|Finish Game/.test(text(n)), "advance");
      }
      if (!/Victory!|Draw/.test(rr())) throw new Error("no result on the game-over screen");
      stats.games++;
      clickWhere((n) => n.tag === "button" && text(n).includes("New Game"), "new game");
    } catch (e) {
      stats.errors.push(`${ctx}\n    → ${e.message}`);
      hookStore.clear();
      rr();
    }
  }

  // Every army reminder must have been reachable in at least one game.
  const seen = seenItemText.join("\n");
  const unseen = [];
  for (const [k, phases] of Object.entries(ARMY_EXTRAS)) for (const [ph, list] of Object.entries(phases)) for (const item of list) {
    if (!seen.includes(item.label)) unseen.push(`${k}.${ph}.${item.id}`);
  }
  const expected = armyKeys.length * 4;
  if (stats.games !== expected) fail(`click-through: ${stats.games}/${expected} games completed`);
  stats.errors.slice(0, 15).forEach((e) => fail("click-through: " + e));
  if (unseen.length) fail(`click-through: ${unseen.length} reminder(s) never shown: ${unseen.slice(0, 10).join(", ")}`);
  return { ...stats, renders: renders, expected };
}

// ───────────────────────────── 5. Auto-save ─────────────────────────────
function checkAutoSave() {
  const KEY = "spearhead-duel:game:v1";
  const btnClick = (label) => clickWhere((n) => n.tag === "button" && text(n).includes(label), label);
  const snapshot = () => JSON.stringify(S().slice(0, 10));
  const reload = (storage) => { loadApp(storage); return rr(); };
  try {
    const store = fakeStorage();
    reload(store);
    if (S()[0] !== "select" || store.map.has(KEY)) fail("auto-save: a fresh visit should start on army selection with nothing saved");

    // Set up vigilant vs bloodwind, play into Player 1's shooting phase, tick an item, score a VP.
    const pick = (key) => {
      const a = ARMIES[key];
      clickWhere((n) => n.tag === "div" && text(n).includes(a.name) && text(n).includes("General:"), a.name);
      clickWhere((n) => n.tag === "div" && text(n).includes(a.regimentAbilities[1].name) && text(n).includes(a.regimentAbilities[1].desc), "regiment");
      clickWhere((n) => n.tag === "div" && text(n).includes(a.enhancements[2].name) && text(n).includes(a.enhancements[2].desc), "enhancement");
    };
    pick(armyKeys[0]); btnClick("Next: Player 2"); pick(armyKeys[armyKeys.length - 2]); btnClick("Start Battle");
    btnClick("Begin"); btnClick("Next Phase"); btnClick("Next Phase");
    checkItems()[0].props.onClick({}); rr();
    clickWhere((n) => n.tag === "button" && text(n) === "+", "VP +");
    clickWhere((n) => n.tag === "button" && text(n) === "🔁 Reinforce", "reinforce tab");
    const before = snapshot();
    if (!store.map.has(KEY)) fail("auto-save: nothing was written to storage during a game");

    // "Reload the page": same storage, brand-new app instance.
    const tx = reload(store);
    if (snapshot() !== before) fail("auto-save: state after reload differs from state before reload");
    if (!tx.includes("Saved game restored")) fail("auto-save: no 'restored' notice after reload");
    clickWhere((n) => n.tag === "button" && text(n) === "✕", "dismiss notice");
    if (rr().includes("Saved game restored")) fail("auto-save: notice cannot be dismissed");

    // Broken or stale saves must be ignored, never crash.
    const good = store.map.get(KEY);
    const tamper = (fn) => { const o = JSON.parse(good); fn(o); return JSON.stringify(o); };
    const bad = {
      "corrupt JSON": "{not json",
      "other version": tamper((o) => { o.v = 99; }),
      "unknown army": tamper((o) => { o.players.p1.armyKey = "removedArmy"; }),
      "inherited key as army": tamper((o) => { o.players.p1.armyKey = "constructor"; }),
      "unknown enhancement": tamper((o) => { o.players.p2.enhancement = "gone"; }),
      "phase out of range": tamper((o) => { o.phaseIdx = 9; }),
      "missing player": tamper((o) => { delete o.players.p2; }),
      "game without armies": tamper((o) => { o.players.p2.armyKey = null; }),
      "wrong type": "[1,2,3]",
    };
    for (const [name, raw] of Object.entries(bad)) {
      const st = fakeStorage(); st.setItem(KEY, raw);
      reload(st);
      if (S()[0] !== "select") fail(`auto-save: a bad save (${name}) was restored instead of ignored`);
    }

    // Storage that throws (private mode) must not break the app.
    const broken = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("denied"); }, removeItem() { throw new Error("denied"); } };
    reload(broken);
    pick(armyKeys[1]);
    if (S()[0] !== "setup") fail("auto-save: app does not work when storage throws");

    // New Game forgets the save.
    reload(store);
    btnClick("New Game");
    if (store.map.has(KEY)) fail("auto-save: New Game did not clear the saved game");
    reload(store);
    if (S()[0] !== "select") fail("auto-save: game came back after New Game");
  } catch (e) {
    fail("auto-save: " + e.message);
  }
}

// ───────────────────────────── run ─────────────────────────────
const t0 = Date.now();
checkSiteFiles();
checkData();
checkGating();
const ct = clickThrough();
checkAutoSave();
const reminders = Object.values(ARMY_EXTRAS).reduce((n, ph) => n + Object.values(ph).reduce((m, l) => m + l.length, 0), 0);
console.log(`armies: ${armyKeys.length} · unit cards: ${Object.values(UNIT_CARDS).flat().length} · army reminders: ${reminders}`);
console.log(`click-through: ${ct.games}/${ct.expected} games · ${ct.renders.toLocaleString("en")} renders · ` +
  `${ct.ownItems.toLocaleString("en")} own + ${ct.oppItems.toLocaleString("en")} opponent checklist items ticked · ${Date.now() - t0} ms`);
if (failures.length) {
  console.error(`\nFAILED — ${failures.length} problem(s):`);
  failures.slice(0, 60).forEach((f) => console.error(" • " + f));
  if (failures.length > 60) console.error(` … and ${failures.length - 60} more`);
  process.exit(1);
}
console.log("OK — all smoke checks passed.");
