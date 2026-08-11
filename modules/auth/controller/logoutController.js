const logoutService = require("../service/logoutService");

function logoutController(req, res) {
    const logout = logoutService()
    res.json({ logout  });
}
module.exports = logoutController;
