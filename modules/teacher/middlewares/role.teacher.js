function roleteacherMiddlewere(req, res, next) {
  const role = req.user.role;
  if (!role) {
    return res.sendStatus(400);
  }
  next();
}
module.exports = roleteacherMiddlewere;
