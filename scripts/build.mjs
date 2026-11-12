#!/usr/bin/env node
// Builds the browser bundle:  src/app.jsx  ->  app.js
//
//   node scripts/build.mjs          write app.js
//   node scripts/build.mjs --check  exit 1 if app.js is missing or differs from what the
//                                   build would produce (CI runs this so the committed
//                                   app.js can never drift from src/app.jsx)
//
// What the build does: TypeScript's transpiler (no type checking) turns JSX into
// React.createElement(...) calls and lowers syntax to ES2017. The result is a plain
// classic <script> (no imports/exports) that uses the global React and ReactDOM from
// vendor/. TypeScript is pinned to an exact version in package.json, so the output is
// byte-for-byte reproducible on any machine.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = join(root, "src", "app.jsx");
const outPath = join(root, "app.js");
const checkOnly = process.argv.includes("--check");

const source = readFileSync(srcPath, "utf8");

const result = ts.transpileModule(source, {
  fileName: "app.jsx",
  reportDiagnostics: true,
  compilerOptions: {
    target: ts.ScriptTarget.ES2017,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.React, // classic runtime: React.createElement / React.Fragment
    allowJs: true,
    removeComments: false,
    newLine: ts.NewLineKind.LineFeed,
  },
});

const diagnostics = result.diagnostics || [];
if (diagnostics.length) {
  for (const d of diagnostics) {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (d.file && d.start != null) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
      console.error(`src/app.jsx:${line + 1}:${character + 1}  TS${d.code}: ${msg}`);
    } else {
      console.error(`TS${d.code}: ${msg}`);
    }
  }
  console.error(`\nBuild failed: ${diagnostics.length} syntax error(s) in src/app.jsx`);
  process.exit(1);
}

if (/^\s*(import|export)\b/m.test(result.outputText)) {
  console.error("Build failed: output contains import/export. app.js must stay a classic script " +
    "(index.html loads it with a plain <script src>, which also keeps file:// opening working).");
  process.exit(1);
}

const banner =
  "/*! Spearhead Duel — GENERATED FILE, DO NOT EDIT.\n" +
  " *  Source: src/app.jsx  ·  Rebuild: npm run build  ·  " +
  `Transpiled by TypeScript ${ts.version} (JSX -> React.createElement, ES2017) */\n`;
const output = banner + result.outputText;

if (checkOnly) {
  const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : null;
  if (current !== output) {
    console.error(current === null
      ? "app.js is missing. Run `npm run build` and commit the result."
      : "app.js is out of date with src/app.jsx (or was edited by hand). " +
        "Run `npm run build` and commit the result.");
    process.exit(1);
  }
  console.log(`app.js is up to date (${output.length.toLocaleString("en")} chars, TypeScript ${ts.version}).`);
} else {
  writeFileSync(outPath, output);
  console.log(`Built app.js from src/app.jsx (${output.length.toLocaleString("en")} chars, TypeScript ${ts.version}).`);
}
