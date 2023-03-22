import { Model, Schema, model, models, isValidObjectId } from 'mongoose';

abstract class AbstractODM<T> {
  readonly model: Model<T>;
  private _schema: Schema<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this._schema = schema;
    this.model = models[modelName] || model(modelName, this._schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[] | null> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    
    return this.model.findById(id);
  }
}

export default AbstractODM;