const { expect } = require('chai');

const { createToDoService } = require('../../services/toDoServices');
const { it, describe } = require('mocha');

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

  // describe('quando é inserido com sucesso', async () => {
  //   const payloadMovie = {
  //     title: 'Example Movie',
  //     directedBy: 'Jane Dow',
  //     releaseYear: 1999,
  //   };

  //   before(() => {     
  //     const ID_EXAMPLE = '604cb554311d68f491ba5781';

  //     sinon.stub(MoviesModel, 'create')
  //       .resolves({ id: ID_EXAMPLE });
  //   });

  //   after(() => {
  //     MoviesModel.create.restore();
  //   });

  //   it('retorna um objeto', async () => {
  //     const response = await MoviesService.create(payloadMovie);

  //     expect(response).to.be.a('object');
  //   });

  //   it('tal objeto possui o "id" do novo filme inserido', async () => {
  //     const response = await MoviesService.create(payloadMovie);

  //     expect(response).to.have.a.property('id');
  //   });

  // });
});

// ref testes https://github.com/tryber/sd-013-c-live-lectures/tree/lecture/27.4/live-lecture-27-4-base