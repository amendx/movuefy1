import { MovieRepository } from "./Repository";

const movie = "/movie";
const discover = "/discover";
const search = "/search";

export default {
  getMovie(id) {
    return MovieRepository.get(
      `${movie}/${id}?api_key=${
        process.env.VUE_APP_MOVIEDB_API_KEY
      }&language=en-US`
    );
  },
  getPopularMovies() {
    return MovieRepository.get(
      `${discover}${movie}?api_key=${
        process.env.VUE_APP_MOVIEDB_API_KEY
      }&sort_by=popularity.desc`
    );
  },
  getMovieByPage(page) {
    return MovieRepository.get(
      `${discover}${movie}?api_key=${
        process.env.VUE_APP_MOVIEDB_API_KEY
      }&page=${page}&sort_by=popularity.desc`
    );
  },
  searchMovies(query) {
    return MovieRepository.get(
      `${search}${movie}?api_key=${
        process.env.VUE_APP_MOVIEDB_API_KEY
      }&query=${query}`
    );
  }
};
