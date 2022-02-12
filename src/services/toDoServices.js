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
  if (hasError) throw { status: 400, message: hasError.message }
}

const createToDoService = async (newToDo) => {
  validationBody(newToDo);

  const toDo = await todoModels.createToDo(newToDo);

  return toDo;
};

const updateToDoService = async (newToDo, idToDo) => {
  validationBody(newToDo, idToDo);

  if (!idToDo) throw { status: 400, message: '"id" is required' }

  const toDoInDataBase = await todoModels.getToDoById(idToDo);
  if (!toDoInDataBase) throw { status: 404, message: "toDo Not Found In Data Base" };

  await todoModels.updateToDo(idToDo, newToDo);

  return {
    id: idToDo,
    ...newToDo
  };
};

const deleteToDoService = async (id) => {
  if (!id) throw { status: 400, message: "\"id\" is required" };

  const toDoInDataBase = await todoModels.getToDoById(id);
  if (!toDoInDataBase) throw { status: 404, message: "toDo Not Found In Data Base" };

  await todoModels.deleteToDo(id);

  return {
    status: 200,
    message: 'Delete ToDo in DataBase'
  }
}

const getAllToDosService = async () => {
  const allToDos = await todoModels.getAllToDos();
  return allToDos
}

module.exports = {
  createToDoService,
  deleteToDoService,
  updateToDoService,
  getAllToDosService
}