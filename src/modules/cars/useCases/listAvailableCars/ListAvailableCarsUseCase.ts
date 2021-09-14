import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

type ListCarsRequest = {
  category_id?: string;
  brand?: string;
  name?: string;
};

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}
  async execute({ category_id, brand, name }: ListCarsRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
