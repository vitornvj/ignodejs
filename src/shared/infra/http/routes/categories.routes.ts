import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRouter = Router();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
categoriesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

const listCategoriesController = new ListCategoriesController();
categoriesRouter.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRouter.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle,
);

export { categoriesRouter };
