function roleteacherMiddlewere(req, res, next) {
  const role = req.user.role;
  if (role !== "teacher") {
    return res.sendStatus(400);
  } else {
    next();
  }
}
module.exports = roleteacherMiddlewere;
