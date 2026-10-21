const fs = require("fs");
const path = require("path");

const pool = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "names.json"), "utf8"));

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fullName() {
  return `${pick(pool.first)} ${pick(pool.last)}`;
}

module.exports = { pool, pick, fullName };
