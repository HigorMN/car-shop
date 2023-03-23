import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IResponse from '../Interfaces/IResponse';
import MotorcycleODM from '../Models/MotorcycleODM';
import { response, responseErro } from '../Utils/ResponseFunc';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor() {
    this.motorcycleODM = new MotorcycleODM();
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  public async register(motorcycle: IMotorcycle): Promise<IResponse> {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return response(201, this.createMotorcycleDomain(newMotorcycle));
  }

  public async getAll(): Promise<IResponse> {
    const motorcycles = await this.motorcycleODM.findAll();
    const motorcyclesDomains = motorcycles?.map((e) => this.createMotorcycleDomain(e));
    return response(200, motorcyclesDomains);
  }

  public async getById(id: string): Promise<IResponse> {
    try {
      const motorcycles = await this.motorcycleODM.findById(id);
      if (!motorcycles) return responseErro(404, 'Motorcycle not found');
      return response(200, this.createMotorcycleDomain(motorcycles));
    } catch (error) {
      return responseErro(422, 'Invalid mongo id');
    }
  }

  public async updateById(id: string, obj: Partial<IMotorcycle>): Promise<IResponse> {
    if (!isValidObjectId(id)) return responseErro(422, 'Invalid mongo id');

    const motorcyle = await this.motorcycleODM.findById(id);
    if (!motorcyle) return responseErro(404, 'Motorcycle not found');

    const updateMotorcycle = await this.motorcycleODM.update(id, obj);
    return response(200, this.createMotorcycleDomain(updateMotorcycle));
  }
}

export default MotorcycleService;