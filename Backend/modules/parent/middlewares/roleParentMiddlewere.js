async function roleParentMiddlewere(req, res, next) {
  const role = req.user.role;
  if (role !== "parent") {
    return res.json("not exist");
  }
  next();
}

module.exports = roleParentMiddlewere;
