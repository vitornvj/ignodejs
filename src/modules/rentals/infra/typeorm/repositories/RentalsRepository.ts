import { getRepository, Repository } from "typeorm";

import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
    return rentals;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return rental;
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      end_date,
      user_id,
      car_id,
      expected_return_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
