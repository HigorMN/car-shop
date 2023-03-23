import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { response, responseErro } from '../../../src/Utils/ResponseFunc';
import { 
  motorcycleInput, 
  motorcycleOutput, 
  motorcycleInputArray, 
  motorcycleOutputArray, 
} from './mock/MotorcycleService.mock';

describe('Deve validar o serviço de Moto', function () {
  it('Registrando um carro com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(response(201, motorcycleOutput));
  });

  it('Deve retornar o domino nulo', async function () {
    Sinon.stub(Model, 'create').resolves(null);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(response(201, null));
  });

  it('Deve retorna todos os carros registrados', async function () {
    Sinon.stub(Model, 'find').resolves(motorcycleOutputArray);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(response(200, motorcycleInputArray));
  });

  it('Deve encontrar e retornar um carro pelo id com sucesso', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.getById('641c76e60e5ba3e1fc849567');

    expect(result).to.be.deep.equal(response(200, motorcycleOutput));
  });

  it('Deve retornar um erro caso não encontre um carro pelo id', async function () {
    Sinon.stub(Model, 'findById').onFirstCall().resolves(null).onSecondCall()
      .resolves(null);

    const service = new MotorcycleService();
    const result = await service.getById('641c76e60e5ba3e1fc849544');
    const result2 = await service.updateById('641c76e60e5ba3e1fc849544', motorcycleInput);

    expect(result).to.be.deep.equal(responseErro(404, 'Motorcycle not found'));
    expect(result2).to.be.deep.equal(responseErro(404, 'Motorcycle not found'));
  });

  it('Deve retornar um erro caso id sejá invalido', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const result = await service.getById('idInválido');
    const result2 = await service.updateById('idInválido', motorcycleInput);

    expect(result).to.be.deep.equal(responseErro(422, 'Invalid mongo id'));
    expect(result2).to.be.deep.equal(responseErro(422, 'Invalid mongo id'));
  });

  it('Deve atualizar e retornar um carro pelo id com sucesso', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.updateById('641c76e60e5ba3e1fc849567', motorcycleInput);

    expect(result).to.be.deep.equal(response(200, motorcycleOutput));
  });

  afterEach(function () {
    Sinon.restore();
  });
});