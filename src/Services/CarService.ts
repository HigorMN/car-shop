import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IResponse from '../Interfaces/IResponse';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }

    return null;
  }

  public async register(car: ICar) {
    const newCar = await this.carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async getAll(): Promise<(Car | null)[] | undefined> {
    const cars = await this.carODM.findAll();
    const carsDomains = cars?.map((e) => this.createCarDomain(e));
    return carsDomains;
  }

  public async getById(id: string): Promise<IResponse> {
    try {
      const car = await this.carODM.findById(id);
      if (!car) return { status: 404, message: 'Car not found' };
      return { car: this.createCarDomain(car) };
    } catch (error) {
      return { status: 422, message: 'Invalid mongo id' };
    }
  }
}

export default CarService;