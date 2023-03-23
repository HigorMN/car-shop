import CategoryType from '../Utils/CategoryTypes';
import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle {
  category: CategoryType;
  engineCapacity: number;
}

export default IMotorcycle;