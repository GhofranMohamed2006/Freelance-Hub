const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Setting = require("../models/Setting");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
const { id, now, sanitizeUser } = require("../utils/helpers");

function tokenFor(user) {
  return jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
}

async function register(body) {
  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !body.password) throw Object.assign(new Error("Email and password are required"), { status: 400 });
  if (body.password.length < 8) throw Object.assign(new Error("Password must be at least 8 characters"), { status: 400 });
  if (User.findByEmail(email)) throw Object.assign(new Error("Email is already registered"), { status: 409 });
  const role = body.role || "freelancer";
  if (!["freelancer","client"].includes(role)) throw Object.assign(new Error("Role must be freelancer or client"), { status: 400 });

  const user = User.create({
    id: id(), firstName: body.firstName || "", lastName: body.lastName || "",
    name: body.name || [body.firstName,body.lastName].filter(Boolean).join(" "),
    email, passwordHash: await bcrypt.hash(body.password, 12), role,
    avatar: "", bio: "", location: "", hourlyRate: 0, skills: [],
    createdAt: now(), updatedAt: now()
  });
  Setting.create({ id:id(), userId:user.id, notifications:{messages:true,proposals:true,projects:true,payments:true,marketing:false}, timezone:"UTC", language:"en", createdAt:now(), updatedAt:now() });
  return { token: tokenFor(user), user: sanitizeUser(user) };
}

async function login(email, password) {
  const user = User.findByEmail(String(email || "").trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    throw Object.assign(new Error("Invalid email or password"), { status: 401 });
  }
  return { token: tokenFor(user), user: sanitizeUser(user) };
}

async function changePassword(user, currentPassword, newPassword) {
  if (!newPassword || newPassword.length < 8) throw Object.assign(new Error("New password must be at least 8 characters"), {status:400});
  if (!(await bcrypt.compare(currentPassword || "", user.passwordHash))) throw Object.assign(new Error("Current password is incorrect"), {status:400});
  User.update(user.id, { passwordHash: await bcrypt.hash(newPassword,12), updatedAt:now() });
}

module.exports = { register, login, changePassword, tokenFor };
