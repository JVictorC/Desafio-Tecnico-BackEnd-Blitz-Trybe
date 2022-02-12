const { ObjectId } = require('mongodb');
const conn = require('./connection');

const maskReturnDataBase = (toDo) => ({
  id: toDo['_id'],
  title: toDo['title'],
  description: toDo['description'],
})

const createToDo = async (newToDo) => {
  const db = await conn.connection();

  const { insertedId: id } = await db.collection('toDo').insertOne(newToDo);

  return {
    id,
    ...newToDo
  };
};


const getAllToDos = async () => {
  const db = await conn.connection();

  const allTodos = await db.collection('toDo').find({}).toArray();

  return allTodos.map(maskReturnDataBase);
}

const deleteToDo = async (idToDo) => {
  const db = await conn.connection();

  const statusDeleteMongo = await db.collection('toDo').deleteOne({
    '_id': ObjectId(idToDo)
  });

  return statusDeleteMongo;
}

module.exports = {
  createToDo,
  getAllToDos,
  deleteToDo
}

