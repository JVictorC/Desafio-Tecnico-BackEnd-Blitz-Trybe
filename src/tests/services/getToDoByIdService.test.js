const { expect } = require('chai');

const { getToDoByIdService } = require('../../services/toDoServices');
const todoModels = require('../../models/toDoModels.js');
const { it, describe, before, after } = require('mocha');
const Sinon = require('sinon');

describe('Busca o ToDo com o Id informado no BD SERVICE', () => {
  const messageErrorNotFoundToDo = { status: 404, message: "toDo Not Found In Data Base" };
  const messageErrorWithOutId = { status: 400, message: "\"id\" is required" };
  const ID_EXAMPLE = '604cb554311d68f491ba5781';


  describe('quando o payload informado não é válido', async () => {

    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves();
    });

    after(() => {
      todoModels.getToDoById.restore();
    });

    it('retorna um Error com Status e Message quando nao passado o id', async () => {
      try {
        expect(await getToDoByIdService()).to.throw();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutId);
      }
    });

    it('retorna um Error com Status e Message quando nao encontrado o id no BD', async () => {
      try {
        expect(await getToDoByIdService(ID_EXAMPLE)).to.throw();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorNotFoundToDo);
      }
    });

  });

  describe('quando é buscado com sucesso', async () => {
    const payloadToDo = {
        id: '604cb554311d68f491ba5781',
        title: 'Limpar a Casa',
        description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
      };

    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves(payloadToDo);
    });

    after(() => {
      todoModels.getToDoById.restore();
    });

    it('retorna um array de ToDos', async () => {
      const response = await getToDoByIdService(ID_EXAMPLE);
      expect(response).to.be.a('object');
      expect(response).to.deep.equals(payloadToDo);
    });

  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base