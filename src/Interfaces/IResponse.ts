import Car from '../Domains/Car';

class IResponse {
  status?: number;
  message?: string;
  car?: Car | null;
}

export default IResponse;