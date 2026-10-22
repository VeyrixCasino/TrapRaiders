const fs = require("fs");
const path = require("path");
const files = [
  "04_pyros_unsubstituted.json",
  "05_pyros_md.json",
  "05_pyros_methylenedioxy.json",
  "06_pyros_unusual.json",
];
function walk(node, acc) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => walk(n, acc));
  if (typeof node.id === "string" && (node.feel || node.scores)) {
    const src = node.feel || node.scores || {};
    acc.push({
      id: node.id,
      r: src.rush && src.rush.score,
      e: src.euphoria && src.euphoria.score,
      n: src.enjoyment && src.enjoyment.score,
      c: src.compulsiveness && src.compulsiveness.score,
    });
  }
  Object.values(node).forEach((v) => walk(v, acc));
}
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8"));
  const acc = [];
  walk(j, acc);
  console.log("\n== " + f + " ==");
  acc.forEach((row) =>
    console.log(row.id.padEnd(24) + [row.r, row.e, row.n, row.c].map((x) => (x == null ? "-" : String(x))).join("/"))
  );
}
