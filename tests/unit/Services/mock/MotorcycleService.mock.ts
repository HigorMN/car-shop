import Motorcycle from '../../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../../src/Interfaces/IMotorcycle';

export const motorcycleInput: IMotorcycle = {
  model: 'CB 500',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  category: 'Street',
  engineCapacity: 150,
};

export const motorcycleOutput: Motorcycle = new Motorcycle({ 
  ...motorcycleInput, 
  id: '641c76e60e5ba3e1fc849567', 
});

export const motorcycleInputArray: IMotorcycle[] = [
  {
    id: '641c76e60e5ba3e1fc849567',
    model: 'CB 500',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    category: 'Street',
    engineCapacity: 150,
  },
  {
    id: '641c76e60e5ba3e1fc849568',
    model: 'CB 600',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    category: 'Street',
    engineCapacity: 150,
  },
];

export const motorcycleOutputArray: Motorcycle[] = motorcycleInputArray.map(
  (e) => new Motorcycle(e),
);