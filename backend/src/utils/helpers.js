const { v4: uuid } = require("uuid");

const id = () => uuid();
const now = () => new Date().toISOString();

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

function pick(obj, fields) {
  return Object.fromEntries(
    fields.filter(key => obj[key] !== undefined).map(key => [key, obj[key]])
  );
}

function pagination(req) {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  return { page, limit, start: (page - 1) * limit };
}

module.exports = { id, now, sanitizeUser, pick, pagination };
