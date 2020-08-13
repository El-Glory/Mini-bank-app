import Joi from "@hapi/joi";

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(5).required(),
    type: Joi.string().required()
  });

  return schema.validate(data)
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required()
  })
  return schema.validate(data)
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
