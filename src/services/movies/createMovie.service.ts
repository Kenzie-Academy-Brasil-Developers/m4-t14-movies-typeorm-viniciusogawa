import { AppDataSource } from "../../data-source";
import { iMovie, iMovieReturn } from "../../interfaces/movies.interface";
import { Movie } from "../../entities";
import { Repository } from "typeorm";
import { returnMovieSchema } from "../../schemas/movies.schema";

const createMovieService = async (movieData: iMovie): Promise<iMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: iMovie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const newMovie: iMovieReturn = returnMovieSchema.parse(movie);

  return newMovie;
};

export { createMovieService };
