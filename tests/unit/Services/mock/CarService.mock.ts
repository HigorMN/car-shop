import Car from '../../../../src/Domains/Car';
import ICar from '../../../../src/Interfaces/ICar';

export const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const carOutput: Car = new Car({ 
  ...carInput, 
  id: '641c76e60e5ba3e1fc849567', 
});

export const carInputArray: ICar[] = [
  {
    id: '641c76e60e5ba3e1fc849567',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '641c76e60e5ba3e1fc849568',
    model: 'Uno',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
];

export const carOutputArray: Car[] = carInputArray.map((e) => new Car(e));