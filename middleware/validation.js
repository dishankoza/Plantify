const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    deviceToken: Joi.string(),
    username: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
    deviceToken: Joi.string()
  });
  return schema.validate(data);
};

const plantValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    nickname: Joi.string().required(),
    status: Joi.string(),
    image: Joi.string().required(),
    origin: Joi.string(),
    commonName: Joi.string(),
    description: Joi.string(),
    deviceID: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.plantValidation = plantValidation;
