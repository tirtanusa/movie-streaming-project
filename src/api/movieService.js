import tmdb from "./tmdb";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdb.get(
      `/movie/popular?language=en-US&page=${page}&include_adult=false`,
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdb.get(
      `/movie/top_rated?language=en-US&page=${page}&include_adult=false`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await tmdb.get(
      `/movie/now_playing?language=en-US&page=${page}&include_adult=false`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}?language=en-US`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

export const getMovieImages = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/images?language=en-US`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
  }
};

export const getMovieReviews = async (movieId, page = 1) => {
  try {
    const response = await tmdb.get(
      `/movie/${movieId}/reviews?language=en-US&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/videos?language=en-US`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
  }
};

export const getWatchProviders = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/watch/providers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watch providers:", error);
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdb.get(
      `/discover/movie?with_genres=${genreId}&page=${page}&include_adult=false&sort_by=rating.desc`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  }
};
