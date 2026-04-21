import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import HeroSection from "./HeroSection";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMoviesByGenre,
} from "../../api/movieService";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, nowPlaying, topRated, movieByGenre] = await Promise.all(
          [
            getPopularMovies(),
            getNowPlayingMovies(),
            getTopRatedMovies(),
            getMoviesByGenre(28),
          ],
        );
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
        setMovieByGenre(movieByGenre);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <div
        data-carousel='{"loadingClasses": "opacity-0","dotsItemClasses": "carousel-box carousel-active:bg-primary"}'
        className="relative  w-full"
      >
        <div className="carousel">
          {nowPlayingMovies[0] && <HeroSection movie={nowPlayingMovies[0]} />}
        </div>
      </div> */}

      <HeroSection movies={nowPlayingMovies.slice(0, 10)} />

      <div className="flex gap-3 overflow-x-auto mx-4 scrollbar-hide overflow-y-hidden">
        {" "}
        {movieByGenre.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            img_path={movie.poster_path}
          />
        ))}
      </div>

      <h1 className="mx-6">Top Rated Movies</h1>
      <div className="flex gap-3 overflow-x-auto mx-4 scrollbar-hide overflow-y-hidden">
        {" "}
        {topRatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            img_path={movie.poster_path}
          />
        ))}
      </div>
      <h1 className="mx-6">Popular Movies</h1>
      <div className="flex gap-3 overflow-x-auto mx-4 scrollbar-hide overflow-y-hidden">
        {" "}
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            img_path={movie.poster_path}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
