function roleStudentMiddlewere(req, res, next) {
  const role = req.user.role;
  if (role !== "student") {
    return res.json("not student");
  }
  next();
}

module.exports = roleStudentMiddlewere;