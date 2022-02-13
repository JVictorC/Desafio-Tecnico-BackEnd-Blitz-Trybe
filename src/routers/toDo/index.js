const express = require('express');
const toDoRouter = express.Router();
const toDoControllers = require('../../controllers/toDoControllers');

toDoRouter.get('/', toDoControllers.getAllToDos);
toDoRouter.get('/:id', toDoControllers.getById);

toDoRouter.post('/', toDoControllers.createToDo);

toDoRouter.put('/:id', toDoControllers.updateToDo);

toDoRouter.delete('/:id', toDoControllers.deleteToDo);

module.exports = toDoRouter