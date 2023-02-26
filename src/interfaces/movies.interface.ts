import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  movieCreateSchema,
  returnMovieSchema,
  returnArrayMovies,
} from "../schemas/movies.schema";

type iMovie = z.infer<typeof movieCreateSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iMovieArray = z.infer<typeof returnArrayMovies>;
type iMovieUpdate = DeepPartial<iMovie>;

interface iResultMovies {
  previusPage: string | null;
  nextPage: string | null;
  count: number;
  data: iMovie[];
}

export { iMovie, iMovieReturn, iMovieArray, iMovieUpdate, iResultMovies };
