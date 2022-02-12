const { expect } = require('chai');

const { createToDoService } = require('../../services/toDoServices');
const todoModels = require('../../models/toDoModels.js');
const { it, describe, before, after } = require('mocha');
const Sinon = require('sinon');

describe('Insere um novo ToDo no BD SERVICE', () => {
  describe('quando o payload informado não é válido', async () => {
    const messageErrorWithOutTitle = { status: 400, message: "\"title\" is required" };
    const messageErrorWithOutDescription = { status: 400, message: '"description" is required' };

    it('retorna um Error com Status e Message quando nao passado o title', async () => {
      try {
        await createToDoService({
          description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
        });

      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutTitle);
      }
    });

    it('retorna um Error com Status e Message quando nao passado o description', async () => {
      try {
        await createToDoService({ title: 'Fazer Comida' });
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutDescription);
      }
    });
  });

  describe('quando é inserido com sucesso', async () => {
    const payloadToDo = {
      title: 'Limpar a Casa',
      description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
    };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      Sinon.stub(todoModels, 'createToDo').resolves({ id: ID_EXAMPLE, ...payloadToDo });
    });

    after(() => {
      todoModels.createToDo.restore();
    });

    it('retorna um objeto', async () => {
      const response = await createToDoService(payloadToDo);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo toDo inserido', async () => {
      const response = await createToDoService(payloadToDo);
      expect(response).to.have.a.property('id');
    });

  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base