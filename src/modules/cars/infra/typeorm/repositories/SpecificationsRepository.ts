import { getRepository, Repository } from "typeorm";

import {
  CreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }

  async all(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
  async create({
    name,
    description,
  }: CreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
