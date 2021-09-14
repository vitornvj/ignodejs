import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

type ImportCategory = {
  name: string;
  description: string;
};

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportCategory[] = [];
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on("data", async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", error => reject(error));
      return categories;
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name,
      );
      if (!categoryAlreadyExists)
        await this.categoriesRepository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
