import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const { status, message } = await this.service.register(motorcycle);
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
}

export default MotorcycleController;