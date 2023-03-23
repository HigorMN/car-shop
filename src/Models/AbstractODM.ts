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

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id: id }, obj, { new: true });
  }
}

export default AbstractODM;