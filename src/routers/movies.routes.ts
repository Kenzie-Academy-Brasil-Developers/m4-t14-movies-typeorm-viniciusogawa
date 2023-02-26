import { Router } from "express";
import {
  createMovieController,
  deleteMoviesController,
  listMoviesController,
  updateMoviesController,
} from "../controllers/movies.contollers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieExists } from "../middlewares/ensureMovieExists.middleware";
import { ensureNameExists } from "../middlewares/ensureNameExists.middleware";
import { movieCreateSchema, updateMovies } from "../schemas/movies.schema";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValid(movieCreateSchema),
  ensureNameExists,
  createMovieController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.delete("/:id", ensureMovieExists, deleteMoviesController);
moviesRoutes.patch(
  "/:id",
  ensureDataIsValid(updateMovies),
  ensureMovieExists,
  ensureNameExists,
  updateMoviesController
);

export { moviesRoutes };
