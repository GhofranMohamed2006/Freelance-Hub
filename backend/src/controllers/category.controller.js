const s = require("../services/category.service");
exports.list = (req, res) => res.json(s.list());
exports.get = (req, res, next) => {
  try {
    res.json(s.get(req.params.id));
  } catch (e) {
    next(e);
  }
};
exports.create = (req, res, next) => {
  try {
    res.status(201).json(s.create(req.body));
  } catch (e) {
    next(e);
  }
};
exports.update = (req, res, next) => {
  try {
    res.json(s.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
};
exports.remove = (req, res, next) => {
  try {
    s.remove(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (e) {
    next(e);
  }
};
