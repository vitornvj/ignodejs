import { Specification } from "../infra/typeorm/entities/Specification";

type CreateSpecificationDTO = {
  name: string;
  description: string;
};

interface ISpecificationsRepository {
  all(): Promise<Specification[]>;
  create({ name, description }: CreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, CreateSpecificationDTO };
