

const sinon = require('sinon');
const { expect } = require('chai');

const todoService = require('../../services/toDoServices');
const toDoControllers = require('../../controllers/toDoControllers');
const { describe, before, after, it } = require('mocha');

describe('Ao chamar o controller de deleteToDo', () => {
  const messageErrorNotFoundToDo = { status: 404, message: "toDo Not Found In Data Base" };
  const messageErrorWithOutId = { status: 400, message: "\"id\" is required" };
  const response = {};
  const request = {};
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const returnServiceDeleteToDo = {
    status: 200,
    message: 'Delete ToDo in DataBase'
  };

  describe('quando o payload informado não é válido', async () => {
    describe('quando chamado sem o id', () => {
      before(() => {
        request.params = { id: null };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'deleteToDoService').throws(messageErrorWithOutId);
      });

      after(() => {
        todoService.deleteToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o Id', async () => {
        await toDoControllers.getById(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "id" is required', async () => {
        await toDoControllers.getById(request, response);

        expect(response.json.calledWith({ message: '"id" is required' })).to.be.equal(true);
      });
    });

    describe('quando nao e encontrado o ToDo', () => {
      before(() => {
        request.params = { id: null };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'deleteToDoService').throws(messageErrorNotFoundToDo);
      });

      after(() => {
        todoService.deleteToDoService.restore();
      });

      it('é chamado o status com o código 404 quando nao encontrado o toDo', async () => {
        await toDoControllers.deleteToDo(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "toDo Not Found In Data Base"', async () => {
        await toDoControllers.deleteToDo(request, response);

        expect(response.json.calledWith({ message: "toDo Not Found In Data Base" })).to.be.equal(true);
      });

    })


  });

  describe('quando é excluído com sucesso', async () => {

    before(() => {
      request.body = {};
      request.params = {
        id: ID_EXAMPLE
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(todoService, 'deleteToDoService').resolves(returnServiceDeleteToDo);
    })

    after(() => {
      todoService.deleteToDoService.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await toDoControllers.deleteToDo(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json tendo um object como retorno', async () => {
      await toDoControllers.deleteToDo(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o json tendo um Status como retorno', async () => {
      await toDoControllers.deleteToDo(request, response);

      expect(response.json.calledWith(returnServiceDeleteToDo)).to.be.equal(true);
    });

  });

});