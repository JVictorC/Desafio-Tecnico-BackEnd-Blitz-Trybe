const { expect } = require('chai');

const { getAllToDosService } = require('../../services/toDoServices');
const todoModels = require('../../models/toDoModels.js');
const { it, describe, before, after } = require('mocha');
const Sinon = require('sinon');

describe('Busca Todos os ToDos no BD SERVICE', () => {

  describe('quando é buscado com sucesso', async () => {
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

    before(() => {
      Sinon.stub(todoModels, 'getAllToDos').resolves(payloadToDos);
    });

    after(() => {
      todoModels.getAllToDos.restore();
    });

    it('retorna um array de ToDos', async () => {
      const response = await getAllToDosService();
      expect(response).to.be.a('array');
      expect(response).to.deep.equals(payloadToDos);
    });

  });

});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base