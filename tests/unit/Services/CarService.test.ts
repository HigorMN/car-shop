import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import { response, responseErro } from '../../../src/Utils/ResponseFunc';
import { carInput, carOutput, carInputArray, carOutputArray } from './mock/CarService.mock';

describe('Deve validar o serviço de carro', function () {
  it('Registrando um carro com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(response(201, carOutput));
  });

  it('Deve retornar o domino nulo', async function () {
    Sinon.stub(Model, 'create').resolves(null);

    const service = new CarService();
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(response(201, null));
  });

  it('Deve retorna todos os carros registrados', async function () {
    Sinon.stub(Model, 'find').resolves(carOutputArray);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(response(200, carInputArray));
  });

  it('Deve encontrar e retornar um carro pelo id com sucesso', async function () {
    Sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.getById('641c76e60e5ba3e1fc849567');

    expect(result).to.be.deep.equal(response(200, carOutput));
  });

  it('Deve retornar um erro caso não encontre um carro pelo id', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.getById('641c76e60e5ba3e1fc849544');

    expect(result).to.be.deep.equal(responseErro(404, 'Car not found'));
  });

  it('Deve retornar um erro caso id sejá invalido', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.getById('idInválido');

    expect(result).to.be.deep.equal(responseErro(422, 'Invalid mongo id'));
  });

  afterEach(function () {
    Sinon.restore();
  });
});