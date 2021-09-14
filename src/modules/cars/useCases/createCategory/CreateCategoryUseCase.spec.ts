import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create category", () => {
  let createCategory: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };
    await createCategory.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able to create a new category when a name already exists", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };
    await createCategory.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
      createCategory.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
