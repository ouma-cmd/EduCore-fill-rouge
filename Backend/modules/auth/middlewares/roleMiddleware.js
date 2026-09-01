function roleMiddleware(req, res, next) {
  const role = req.user.role;
  if (role !== "admin") {
    return res.sendStatus(403);
  } else {
    next();
  }
}

module.exports = roleMiddleware;
