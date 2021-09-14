import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRouter } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRouter } from "./specifications.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRouter);
routes.use("/specifications", specificationsRouter);
routes.use("/users", usersRouter);
routes.use("/cars", carsRoutes);
routes.use("/rentals", rentalRoutes);
routes.use("/password", passwordRoutes);
routes.use(authenticateRoutes);

export { routes };
