import { Category } from "../infra/typeorm/entities/Category";

type CreateCategoryDTO = {
  name: string;
  description: string;
};
interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: CreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, CreateCategoryDTO };
