import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMovie, iResultMovies } from "../../interfaces/movies.interface";
import { returnArrayMovies } from "../../schemas/movies.schema";

const checkPage = async (page: number, perPage: number) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovies: Array<Movie> = await movieRepository.find({
    take: perPage,
    skip: page,
  });

  return findMovies;
};

const listMoviesService = async (
  page: any,
  perPage: any,
  sort: any,
  order: any
): Promise<iResultMovies> => {
  let nextPageChecked: string | null = null;
  let previusPageChecked: string | null = null;
  let movies: Array<Movie> = [];

  if (page === undefined || page < 0 || page === null) {
    page = 0;
  }

  if (
    perPage === undefined ||
    perPage <= 0 ||
    perPage > 5 ||
    perPage === null
  ) {
    perPage = 5;
  }

  page = page * perPage;

  if (page > 0) {
    previusPageChecked = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage${perPage}`;
  }

  const nextPage = await checkPage((page + 1) * perPage, perPage);

  if (nextPage.length > 0) {
    nextPageChecked = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage${perPage}`;
  }

  if (order !== "asc") {
    if (order !== "desc") {
      order = "asc";
    }
  }

  if (sort !== "price") {
    if (sort !== "duration") {
      sort = "id";
    }
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (sort == "duration") {
    const findMovies: Array<Movie> = await movieRepository.find({
      take: perPage,
      skip: page,
      order: {
        duration: order,
      },
    });

    movies = returnArrayMovies.parse(findMovies);
  } else if (sort == "price") {
    const findMovies: Array<Movie> = await movieRepository.find({
      take: perPage,
      skip: page,
      order: {
        price: order,
      },
    });

    movies = returnArrayMovies.parse(findMovies);
  } else {
    const findMovies: Array<Movie> = await movieRepository.find({
      take: perPage,
      skip: page,
      order: {
        id: order,
      },
    });

    movies = returnArrayMovies.parse(findMovies);
  }

  const findMovies: Array<Movie> = await movieRepository.find();

  const totalMovies: number = findMovies.length;

  const result = {
    previusPage: previusPageChecked,
    nextPage: nextPageChecked,
    count: totalMovies,
    data: movies,
  };

  return result;
};

export { listMoviesService };
