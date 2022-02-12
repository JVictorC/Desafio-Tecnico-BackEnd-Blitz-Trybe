const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const conn = require('../../models/connection');
const { getAllToDos } = require('../../models/toDoModels');


describe('Insere um novo toDo no BD', () => {
  const payloadToDos = [
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


  describe('quando é retornado com sucesso', async () => {

    beforeEach(async () => {
      connectionMock.collection('toDo').deleteMany({});
      connectionMock.collection('toDo').insertMany(payloadToDos);

    });

    it('retorna um array de ToDos', async () => {
      const response = await getAllToDos();
      expect(response).to.be.a('array');
    });

    it('todos os toDos possui o "id" do novo toDo inserido', async () => {
      const response = await getAllToDos();
      response.forEach((toDo) => expect(toDo).to.have.a.property('id'));
    });
  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base