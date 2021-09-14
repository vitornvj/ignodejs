import { getRepository, Repository } from "typeorm";

import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  // private static INSTANCE: CategoriesRepository;
  constructor() {
    this.repository = getRepository(Category);
  }
  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }
  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }
  async findByName(name: string): Promise<Category> {
    const findCategoryByName = this.repository.findOne({ name });
    return findCategoryByName;
  }
}

export { CategoriesRepository };
