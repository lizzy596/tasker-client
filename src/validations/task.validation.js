import Joi from 'joi-browser'

export const createTaskValidation = Joi.object().keys({
  title: Joi.string().required(),
 // date: Joi.string(),
});