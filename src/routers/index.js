const express = require('express');
const toDoRouter = require('./toDo');
const mainRouter = express.Router();


mainRouter.use('/toDo', toDoRouter);


module.exports = mainRouter