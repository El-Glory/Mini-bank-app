import Joi from "@hapi/joi";

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().trim(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(5).required().trim(),
    type: Joi.string().required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required().trim(),
  });
  return schema.validate(data);
};

const createAccount = (data) => {
  const schema = Joi.object({
    accountType: Joi.string().required(),
  });
  return schema.validate(data);
};

const changeAccountStatus = (data) => {
  const schema = Joi.object({
    accountStatus: Joi.string().required().trim(),
  });
  return schema.validate(data);
};

const debitAccount = (data) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
  });
  return schema.validate(data);
};

const getAllTransactions = (data) => {
  const schema = Joi.object({
    accountNumber: Joi.number().required()
  })
  return schema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.createAccount = createAccount;
module.exports.changeAccountStatus = changeAccountStatus;
module.exports.debitAccount = debitAccount;
module.exports.getAllTransactions = getAllTransactions;
