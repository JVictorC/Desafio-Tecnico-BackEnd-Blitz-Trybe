

const sinon = require('sinon');
const { expect } = require('chai');

const todoService = require('../../services/toDoServices');
const toDoControllers = require('../../controllers/toDoControllers');
const { describe, before, after, it } = require('mocha');

describe('Ao chamar o controller de updateToDo', () => {
  const messageErrorWithOutTitle = { status: 400, message: "\"title\" is required" };
  const messageErrorWithOutDescription = { status: 400, message: '"description" is required' };
  const messageErrorNotFoundToDo = { status: 404, message: "toDo Not Found In Data Base" };
  const messageErrorWithOutId = { status: 400, message: "\"id\" is required" };
  const response = {};
  const request = {};
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const payloadToDo = {
    title: 'Limpar a Casa',
    description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
  };

  describe('quando o payload informado não é válido', async () => {
    describe('quando chamado sem o id', () => {
      before(() => {
        request.params = { id: null };
        request.body = { ...payloadToDo };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'updateToDoService').throws(messageErrorWithOutId);
      });

      after(() => {
        todoService.updateToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o Id', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "id" is required', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.json.calledWith({ message: '"id" is required' })).to.be.equal(true);
      });
    });

    describe('quando chamado sem o title', () => {
      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = {
          description: payloadToDo.description
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'updateToDoService').throws(messageErrorWithOutTitle);
      });

      after(() => {
        todoService.updateToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o title', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "title" is required', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.json.calledWith({ message: '"title" is required' })).to.be.equal(true);
      });
    });

    describe('quando chamado sem o description', () => {
      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = {
          title: payloadToDo.title
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'updateToDoService').throws(messageErrorWithOutDescription);
      });

      after(() => {
        todoService.updateToDoService.restore();
      });

      it('é chamado o status com o código 400 quando nao informado o description', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "description" is required', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.json.calledWith({ message: '"description" is required' })).to.be.equal(true);
      });
    });

    describe('quando nao e encontrado o ToDo', () => {
      before(() => {
        request.params = { id: null };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        response.next = sinon.stub().returns();
        sinon.stub(todoService, 'updateToDoService').throws(messageErrorNotFoundToDo);
      });

      after(() => {
        todoService.updateToDoService.restore();
      });

      it('é chamado o status com o código 404 quando nao encontrado o toDo', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "toDo Not Found In Data Base"', async () => {
        await toDoControllers.updateToDo(request, response);

        expect(response.json.calledWith({ message: "toDo Not Found In Data Base" })).to.be.equal(true);
      });

    })


  });

  describe('quando é atualizado com sucesso', async () => {

    before(() => {
      request.body = {
        ...payloadToDo
      };
      request.params = {
        id: ID_EXAMPLE
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(todoService, 'updateToDoService').resolves({ id: ID_EXAMPLE, ...payloadToDo });
    })

    after(() => {
      todoService.updateToDoService.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await toDoControllers.updateToDo(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json tendo um object como retorno', async () => {
      await toDoControllers.updateToDo(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o json tendo um ToDo como retorno', async () => {
      await toDoControllers.updateToDo(request, response);

      expect(response.json.calledWith({id: ID_EXAMPLE, ...payloadToDo})).to.be.equal(true);
    });

  });

});