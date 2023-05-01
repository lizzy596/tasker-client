import Joi from 'joi-browser'


export const registerValidation = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .regex(new RegExp('^[a-zA-Z]+$')),
  lastName: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .regex(new RegExp('^[a-zA-Z]+$')),
  email: Joi.string()
    .required().regex(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
  password: Joi.string()
    .required()
    .regex(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()

});


export const loginValidation = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });


