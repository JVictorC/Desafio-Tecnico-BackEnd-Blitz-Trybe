const { expect } = require('chai');

const { deleteToDoService } = require('../../services/toDoServices');
const todoModels = require('../../models/toDoModels.js');
const { it, describe, before, after } = require('mocha');
const Sinon = require('sinon');

describe('Delete um novo ToDo no BD SERVICE', () => {
  describe('quando o id informado não é válido', async () => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    const messageErrorWithOutId = { status: 400, message: "\"id\" is required" };
    const messageErrorNotFOundToDo = { status: 404, message: "toDo Not Found In Data Base" };

    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves();
    });

    after(() => {
      todoModels.getToDoById.restore();
    });

    it('retorna um Error com Status e Message quando nao passado o id', async () => {
      try {
        expect(await deleteToDoService()).to.throw();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorWithOutId);
      }
    });

    it('retorna um Error com Status e Message quando nao encontrado o toDo com o id passado', async () => {
      try {
        expect(await deleteToDoService(ID_EXAMPLE)).to.throw();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equals(messageErrorNotFOundToDo);
      }
    });

  });

  describe('quando é excluído com sucesso', async () => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    const toDoExcludedSuccess = {
      status: 200,
      message: 'Delete ToDo in DataBase'
    }

    before(() => {
      Sinon.stub(todoModels, 'getToDoById').resolves({});
      Sinon.stub(todoModels, 'deleteToDo').resolves({ acknowledged: true, deletedCount: 1 });
    });

    after(() => {
      todoModels.deleteToDo.restore();
      todoModels.getToDoById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await deleteToDoService(ID_EXAMPLE);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "status" e "message" do toDo excluído', async () => {
      const response = await deleteToDoService(ID_EXAMPLE);
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('message');
      expect(response).to.deep.equals(toDoExcludedSuccess);
    });

  });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base