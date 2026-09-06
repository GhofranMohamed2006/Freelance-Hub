const s = require("../services/client.service");

exports.dashboard = (req, res, next) => {
    try {
        const data = s.getDashboard(req.user.id);

        res.json(data);
    } catch (e) {
        next(e);
    }
};