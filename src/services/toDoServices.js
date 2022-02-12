const Joi = require('@hapi/joi');
const todoModels = require('../models/toDoModels');

const validationBodyToDo = (newToDo) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).validate(newToDo);
  return error;
}

const validationBody = (newToDo) => {
  const hasError = validationBodyToDo(newToDo);
  if(hasError) throw { status: 400, message: hasError.message }
}

const createToDoService = async (newToDo) => {
  validationBody(newToDo);

  const toDo = await todoModels.createToDo(newToDo);

  return toDo;
};

module.exports = {
  createToDoService
}