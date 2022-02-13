

const sinon = require('sinon');
const { expect } = require('chai');

const todoService = require('../../services/toDoServices');
const toDoControllers = require('../../controllers/toDoControllers');
const { describe, before, after, it } = require('mocha');

describe.only('Ao chamar o controller de getTodoById', () => {
  const messageErrorWithOutTitle = { status: 400, message: "\"title\" is required" };
  const messageErrorWithOutDescription = { status: 400, message: '"description" is required' };
  const response = {};
  const request = {};
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const payloadToDo = {
    id: ID_EXAMPLE,
    title: 'Limpar a Casa',
    description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
  };

  describe('quando o payload informado não é válido', async () => {
    describe('quando chamado sem o title', () => {
      before(() => {
        request.body = {
          title: null,
          description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'createToDoService').throws(messageErrorWithOutTitle);
      });

      after(() => {
        todoService.createToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o title', async () => {
        await toDoControllers.createToDo(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "title" is required', async () => {
        await toDoControllers.createToDo(request, response);

        expect(response.json.calledWith({ message: '"title" is required' })).to.be.equal(true);
      });
    });

    describe('quando chamado sem o description', () => {
      before(() => {
        request.params = {
          title: 'Fazer Comida',
          description: null,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'createToDoService').throws(messageErrorWithOutDescription);
      });

      after(() => {
        todoService.createToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o description', async () => {
        await toDoControllers.createToDo(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "description" is required', async () => {
        await toDoControllers.createToDo(request, response);

        expect(response.json.calledWith({ message: '"description" is required' })).to.be.equal(true);
      });

    })


  });

  describe('quando é inserido com sucesso', async () => {

    before(() => {
      request.body = {
        title: 'Limpar a Casa',
        description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(todoService, 'createToDoService').resolves(payloadToDo);
    })

    after(() => {
      todoService.createToDoService.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await toDoControllers.createToDo(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json tendo um object como retorno', async () => {
      await toDoControllers.createToDo(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o json tendo um ToDo como retorno', async () => {
      await toDoControllers.createToDo(request, response);

      expect(response.json.calledWith(payloadToDo)).to.be.equal(true);
    });

  });

});