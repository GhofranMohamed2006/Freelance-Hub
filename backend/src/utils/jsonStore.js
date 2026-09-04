const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");

function ensureFile(name) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
  return file;
}

function read(name) {
  const file = ensureFile(name);
  const raw = fs.readFileSync(file, "utf8").trim();
  return raw ? JSON.parse(raw) : [];
}

function write(name, data) {
  const file = ensureFile(name);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  return data;
}

module.exports = { read, write };
