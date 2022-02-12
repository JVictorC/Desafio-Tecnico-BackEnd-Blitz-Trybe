const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const conn = require('../../models/connection');
const { createToDo } = require('../../models/toDoModels');
const { afterEach } = require('mocha');


describe('Insere um novo toDo no BD', () => {
  const payloadToDo = {
    title: 'Limpar a Casa',
    description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
  }

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


  describe('quando é inserido com sucesso', async () => {

    beforeEach(async () => {
      connectionMock.collection('toDo').deleteMany({});
    });

    it('retorna um objeto', async () => {
      const response = await createToDo(payloadToDo);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo toDo inserido', async () => {
      const response = await createToDo(payloadToDo);
      expect(response).to.have.a.property('id');
    });

    it.only('deve existir um toDo com o título cadastrado!', async () => {
      await createToDo(payloadToDo);
      const movieCreated = await connectionMock.collection('toDo').findOne({ title: payloadToDo.title });
      expect(movieCreated).to.be.not.null;
    });
  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base