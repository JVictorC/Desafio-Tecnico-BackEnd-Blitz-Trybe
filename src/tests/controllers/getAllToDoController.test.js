

const sinon = require('sinon');
const { expect } = require('chai');

const todoService = require('../../services/toDoServices');
const toDoControllers = require('../../controllers/toDoControllers');
const { describe, before, after, it } = require('mocha');

describe('Ao chamar o controller de getAllToDos', () => {
  const response = {};
  const request = {};
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

  describe('quando é retornado com sucesso', async () => {

    before(() => {
      request.body = {};
      request.params = {}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(todoService, 'getAllToDosService').resolves(payloadToDos);
    })

    after(() => {
      todoService.getAllToDosService.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await toDoControllers.getAllToDos(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json tendo um array como retorno', async () => {
      await toDoControllers.getAllToDos(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o json tendo todos os ToDos como retorno', async () => {
      await toDoControllers.getAllToDos(request, response);

      expect(response.json.calledWith(payloadToDos)).to.be.equal(true);
    });

  });

});