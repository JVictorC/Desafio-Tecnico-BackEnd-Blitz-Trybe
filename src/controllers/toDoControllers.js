/* eslint-disable no-unused-vars */
const toDosServices = require('../services/toDoServices')

const handleError = (err, res) => {
  console.log(err.message);
  if (err.status) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Internal Error' });
}

const getById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const responseData = await toDosServices.getToDoByIdService(id);
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(error, res);
  }
}

const createToDo = async (req, res, _next) => {
  try {
    const { title, description, status } = req.body;
    const responseData = await toDosServices.createToDoService({
      title, description, status
    });
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(error, res);
  }
}

const deleteToDo = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const responseData = await toDosServices.deleteToDoService(id);
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(error, res);
  }
}

const getAllToDos = async (req, res, _next) => {
  try {
    const responseData = await toDosServices.getAllToDosService();
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(error, res);
  }
}

const updateToDo = async (req, res, _next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const responseData = await toDosServices.updateToDoService({ title, description }, id);
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  getById,
  createToDo,
  deleteToDo,
  getAllToDos,
  updateToDo
}