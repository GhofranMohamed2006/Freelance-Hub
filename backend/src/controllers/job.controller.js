const s = require("../services/job.service");
const { pagination } = require("../utils/helpers");
exports.list = (req, res, next) => {
  try {
    const { page, limit, start } = pagination(req),
      all = s.list(req.query);
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
    res.json(s.get(req.params.id));
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
    res.json(s.update(req.params.id, req.body, req.user.id));
  } catch (e) {
    next(e);
  }
};
exports.remove = (req, res, next) => {
  try {
    s.remove(req.params.id, req.user.id);
    res.json({ message: "Job deleted" });
  } catch (e) {
    next(e);
  }
};
exports.view = (req, res, next) => {
  try {
    res.json(s.view(req.params.id));
  } catch (e) {
    next(e);
  }
};
