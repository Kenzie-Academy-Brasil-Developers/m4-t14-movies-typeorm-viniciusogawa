import { Request, Response } from "express";
import { iMovie, iMovieUpdate } from "../interfaces/movies.interface";
import { createMovieService } from "../services/movies/createMovie.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service";
import { listMoviesService } from "../services/movies/listMovies.service";
import { updateMoviesService } from "../services/movies/updateMovies.service";

const createMovieController = async (req: Request, res: Response) => {
  const movieData: iMovie = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response) => {
  let page: any = req.query.page;
  let perPage: any = req.query.perPage;
  let sort: any = req.query.sort;
  let order: any = req.query.order;

  const movies = await listMoviesService(page, perPage, sort, order);

  return res.json(movies);
};

const deleteMoviesController = async (req: Request, res: Response) => {
  await deleteMovieService(+req.params.id);

  return res.status(204).send();
};

const updateMoviesController = async (req: Request, res: Response) => {
  const movieData: iMovieUpdate = req.body;
  const movieId = +req.params.id;

  const updateMovie = await updateMoviesService(movieData, movieId);

  return res.json(updateMovie);
};

export {
  createMovieController,
  listMoviesController,
  deleteMoviesController,
  updateMoviesController,
};
