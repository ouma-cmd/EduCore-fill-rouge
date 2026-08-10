const registerShema = require("../schemas/registerSchema");

async function registerMiddleware(req, res, next) {
  try {
    const valid = await registerShema.validateAsync(req.body);
    next();
  } catch (error) {
    res.json({ error });
  }
}
module.exports = registerMiddleware;
