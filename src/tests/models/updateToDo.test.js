const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const conn = require('../../models/connection');
const { updateToDo } = require('../../models/toDoModels');
const { it, beforeEach, before, after, describe } = require('mocha');


describe('Atualizar um toDo no BD', () => {
  const payloadToDosInDataBase = [
    {
      title: 'Limpar a Casa',
      description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
    },
    {
      title: 'Fazer Comida',
      description: 'Tenho que preparar a comida hoje',
    }
  ]

  let DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db('toDo'));

    sinon.stub(conn, 'connection').resolves(connectionMock);
  });

  after(async () => {
    await conn.connection.restore();
  });


  describe('quando é Atualizado com sucesso', async () => {

    beforeEach(async () => {
      connectionMock.collection('toDo').deleteMany({});
      connectionMock.collection('toDo').insertMany(payloadToDosInDataBase);
    });

    it('deve retornar um Object', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});

      const response = await updateToDo(toDoInDataBase['_id'], {
        title: 'Limpar a Casa',
        description: 'Tenho que Limpar a Casa hoje as 7 da Manha',
      });

      expect(response).to.be.a('object');
    });

    it('deve atualizar o toDo no Banco', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});

      const newToDo = {
        title: 'Limpar a Casa',
        description: 'Tenho que Limpar a Casa hoje as 7 da Manha',
      }

      await updateToDo(toDoInDataBase['_id'], newToDo);

      const toDoUpdated = await connectionMock
          .collection('toDo')
          .findOne({ _id : ObjectId(toDoInDataBase['_id']) });

      delete toDoUpdated._id;

      expect(toDoUpdated).to.be.a('object');
      expect(toDoUpdated).to.deep.equals(newToDo);
    });
  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base