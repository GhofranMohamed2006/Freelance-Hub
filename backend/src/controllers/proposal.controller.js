const s = require("../services/proposal.service");
const { pagination } = require("../utils/helpers");
exports.list = (req, res, next) => {
  try {
    const { page, limit, start } = pagination(req),
      all = s.list(req.query, req.user);
    res.json({
      data: all.slice(start, start + limit),
      pagination: { page, limit, total: all.length },
    });
  } catch (e) {
    next(e);
  }
};
exports.get = (req, res, next) => {
  try {
    const x = s.get(req.params.id);
    res.json(x);
  } catch (e) {
    next(e);
  }
};
exports.create = (req, res, next) => {
  try {
    res.status(201).json(s.create(req.body, req.user.id));
  } catch (e) {
    next(e);
  }
};
exports.update = (req, res, next) => {
  try {
    res.json(s.update(req.params.id, req.body, req.user));
  } catch (e) {
    next(e);
  }
};
exports.remove = (req, res, next) => {
  try {
    s.remove(req.params.id, req.user.id);
    res.json({ message: "Proposal deleted" });
  } catch (e) {
    next(e);
  }
};
