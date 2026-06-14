const Joi = require("joi");

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  department_id: Joi.number().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  designation: Joi.string().required()
});

const validateEmployee = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateEmployee;