import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const { status, message } = await this.service.register(car);
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<Response> {
    const { status, message } = await this.service.getAll();
    return this.res.status(status).json(message);
  }

  public async getById() {
    const { id } = this.req.params;

    try {
      const { status, message } = await this.service.getById(id);
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;

    try {
      const { status, message } = await this.service.updateById(id, this.req.body);
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;