import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IResponse from '../Interfaces/IResponse';
import MotorcycleODM from '../Models/MotorcycleODM';
import { response } from '../Utils/ResponseFunc';

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
}

export default MotorcycleService;