const Joi = require("joi");

const registerShema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string()
    .valid("admin", "teacher", "parent", "student")
    .required(),
});

module.exports = registerShema;
