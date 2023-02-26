import { z } from "zod";

const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
});

const returnMovieSchema = movieCreateSchema.extend({
  id: z.number(),
});

const returnArrayMovies = returnMovieSchema.array();

const updateMovies = movieCreateSchema.partial();

export {
  movieCreateSchema,
  returnMovieSchema,
  returnArrayMovies,
  updateMovies,
};
