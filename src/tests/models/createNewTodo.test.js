const { expect } = require('chai');
const { createToDo } = require('../../models/toDoModels');

describe('Insere uma nova tarefa no BD', () => {
  const payloadToDo = {
    title: 'Limpar a Casa',
    description: 'Tenho que Limpar a Casa hoje as 14 da tarde',
  }

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await createToDo(payloadToDo);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo toDo inserido', async () => {
      const response = await createToDo(payloadToDo);

      expect(response).to.have.a.property('id')
    });
  });
});