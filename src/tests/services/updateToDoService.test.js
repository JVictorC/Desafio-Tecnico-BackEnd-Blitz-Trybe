const { expect } = require('chai');

const { updateToDoService } = require('../../services/toDoServices');
const todoModels = require('../../models/toDoModels.js');
const { it, describe, before, after } = require('mocha');
const Sinon = require('sinon');

describe('Atualizar um novo ToDo no BD SERVICE', () => {
  const messageErrorWithOutTitle = { status: 400, message: "\"title\" is required" };
  const messageErrorWithOutDescription = { status: 400, message: '"description" is required' };
  const messageErrorWithOutId = { status: 400, message: '"id" is required' };
  const messageErrorNotFoundToDo = { status: 404, message: "toDo Not Found In Data Base" };
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const payloadToDo = {
    title: 'Limpar a Casa',
    description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
  };


  describe('quando o payload informado não é válido', async () => {
    
    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves();
    });

    after(() => {
      todoModels.getToDoById.restore();
    });

    it('retorna um Error com Status e Message quando nao passado o title', async () => {
      try {
        await updateToDoService({
          description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
        });

      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutTitle);
      }
    });

    it('retorna um Error com Status e Message quando nao passado o description', async () => {
      try {
        await updateToDoService({ title: 'Fazer Comida' });
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutDescription);
      }
    });

    it('retorna um Error com Status e Message quando nao passado o id', async () => {
      try {
        await updateToDoService({
          title: 'Fazer Comida',
          description: 'Tenho que Limpar a Casa hoje as 14 da tarde'
        });
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutId);
      }
    });

    it('retorna um Error com Status e Message quando nao encontrado o id no BD', async () => {
      try {
        await updateToDoService({
          title: 'Fazer Comida',
          description: 'Tenho que Limpar a Casa hoje as 14 da tarde'
        }, ID_EXAMPLE);
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorNotFoundToDo);
      }
    });
  });

  describe('quando é atualizado com sucesso', async () => {
    
    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves({});
      Sinon.stub(todoModels, 'updateToDo').resolves({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1
      });
    });

    after(() => {
      todoModels.getToDoById.restore();
      todoModels.updateToDo.restore();
    });


    it('retorna um objeto', async () => {
      const response = await updateToDoService(payloadToDo, ID_EXAMPLE);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo toDo atualizado', async () => {
      const response = await updateToDoService(payloadToDo, ID_EXAMPLE);
      expect(response).to.have.a.property('id');
      expect({...response, id: ID_EXAMPLE}).to.deep.equals({...payloadToDo, id: ID_EXAMPLE});
    });

  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base