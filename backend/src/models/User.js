const { read, write } = require("../utils/jsonStore");

const User = {
  all() { return read("users"); },
  findById(id) { return this.all().find(x => x.id === id); },
  findByEmail(email) { return this.all().find(x => x.email === String(email).toLowerCase()); },
  create(data) {
    const items = this.all(); items.push(data); write("users", items); return data;
  },
  update(id, patch) {
    const items = this.all(); const i = items.findIndex(x => x.id === id);
    if (i < 0) return null; items[i] = { ...items[i], ...patch }; write("users", items); return items[i];
  },
  delete(id) {
    const items = this.all(); const next = items.filter(x => x.id !== id);
    if (next.length === items.length) return false; write("users", next); return true;
  }
};
module.exports = User;
