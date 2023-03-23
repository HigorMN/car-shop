import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IResponse from '../Interfaces/IResponse';
import CarODM from '../Models/CarODM';
import { response, responseErro } from '../Utils/ResponseFunc';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) return new Car(car);
    return null;
  }

  public async register(car: ICar): Promise<IResponse> {
    const newCar = await this.carODM.create(car);
    return response(200, this.createCarDomain(newCar));
  }

  public async getAll(): Promise<IResponse> {
    const cars = await this.carODM.findAll();
    const carsDomains = cars?.map((e) => this.createCarDomain(e));
    return response(200, carsDomains);
  }

  public async getById(id: string): Promise<IResponse> {
    try {
      const car = await this.carODM.findById(id);
      if (!car) return responseErro(404, 'Car not found');
      return response(200, this.createCarDomain(car));
    } catch (error) {
      return responseErro(422, 'Invalid mongo id');
    }
  }
}

export default CarService;