const conn = require('./connection');

const createToDo = async (newToDo) => {
  const db = await conn.connection();

  const { insertedId: id } = await db.collection('toDo').insertOne(newToDo);

  return {
    id,
    ...newToDo
  };
};


module.exports = {
  createToDo
}

