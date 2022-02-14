const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const { it, beforeEach, before, after, describe } = require('mocha');

const conn = require('../../models/connection');
const { deleteToDo } = require('../../models/toDoModels');


describe('Delete um toDo no BD', () => {
  const payloadToDosInDataBase = [
    {
      title: 'Limpar a Casa',
      description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
      status: 'Pendente'
    },
    {
      title: 'Fazer Comida',
      description: 'Tenho que preparar a comida hoje',
      status: 'Concluído'
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


  describe('quando é apagado com sucesso', async () => {

    beforeEach(async () => {
      connectionMock.collection('toDo').deleteMany({});
      connectionMock.collection('toDo').insertMany(payloadToDosInDataBase);
    });

    it('deve retornar um Object', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});
      const response = await deleteToDo(toDoInDataBase['_id']);
      expect(response).to.be.a('object');
    });

    it('deve excluir o toDo do Banco', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});
      await deleteToDo(toDoInDataBase['_id']);
      const allTodosInDataBase = await connectionMock.collection('toDo').find({}).toArray();
      expect(allTodosInDataBase).to.be.a('array');
      expect(allTodosInDataBase.includes(toDoInDataBase)).to.be.false;
    });
  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base