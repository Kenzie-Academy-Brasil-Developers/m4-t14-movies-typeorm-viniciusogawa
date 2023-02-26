import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMovieReturn, iMovieUpdate } from "../../interfaces/movies.interface";
import {
  returnArrayMovies,
  returnMovieSchema,
} from "../../schemas/movies.schema";

const updateMoviesService = async (
  movieData: iMovieUpdate,
  movieId: number
): Promise<iMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: movieId,
  });

  const movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(movie);

  const updateMovie = returnMovieSchema.parse(movie);

  return updateMovie;
};

export { updateMoviesService };
