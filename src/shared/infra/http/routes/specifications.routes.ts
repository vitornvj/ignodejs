import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

// import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRouter.use(ensureAuthenticated);
specificationsRouter.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle,
);

// const listSpecificationsController = new ListSpecificationsController();
// specificationsRouter.get("/", listSpecificationsController.handle);

export { specificationsRouter };
