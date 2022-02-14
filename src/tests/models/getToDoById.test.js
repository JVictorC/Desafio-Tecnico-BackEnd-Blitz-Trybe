const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { it, beforeEach, before, after, describe } = require('mocha');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const conn = require('../../models/connection');
const { getToDoById } = require('../../models/toDoModels');


describe('Listar o ToDo com o Mesmo Id do DB', () => {
  const payloadToDos = [
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


  describe('quando é retornado com sucesso', async () => {

    beforeEach(async () => {
      connectionMock.collection('toDo').deleteMany({});
      connectionMock.collection('toDo').insertMany(payloadToDos);

    });

    it('retorna um toDo com o mesmo id Informado', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});
      const response = await getToDoById(toDoInDataBase['_id']);
      expect(response).to.be.a('object');
    });

    it('o toDo possui o "id"', async () => {
      const toDoInDataBase = await connectionMock.collection('toDo').findOne({});
      const response = await getToDoById(toDoInDataBase['_id']);
      expect(response).to.have.a.property('id');
      expect(toDoInDataBase['_id'].toString()).to.be.equal(response.id.toString());
    });
  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base