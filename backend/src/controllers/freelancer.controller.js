const s = require("../services/freelancer.service");
exports.dashboard = (req, res, next) => {
  try {
    const out = s.dashboard(req.user);
    res.json(out);
  } catch (e) {
    next(e);
  }
};

exports.getProjects = (req, res, next) => {
  try {
    const projects = s.getProjects(req.user);
    res.json(projects || []);
  } catch (e) {
    next(e);
  }
};

exports.getProject = (req, res, next) => {
  try {
    const project = s.getProject(req.params.id, req.user);
    res.json(project);
  } catch (e) {
    next(e);
  }
};
