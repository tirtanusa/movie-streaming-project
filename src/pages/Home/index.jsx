import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import HeroSection from "./HeroSection";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../../api/movieService";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, nowPlaying, topRated] = await Promise.all([
          getPopularMovies(),
          getNowPlayingMovies(),
          getTopRatedMovies(),
        ]);
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {nowPlayingMovies[0] && <HeroSection movie={nowPlayingMovies[0]} />}
      <div className="flex justify-between">
        <div className="genreButton">
          <p className="text-white">Action</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Animation</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Sci-Fi</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Fantasy</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Crime</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Family</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Thriller</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Adventure</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Drama</p>
        </div>
        <div className="genreButton">
          <p className="text-white">Romance</p>
        </div>
        <div className="genreButton">
          <p className="text-white">History</p>
        </div>
        <div className="genreButton">
          <p className="text-white">War</p>
        </div>
      </div>

      <h1 className="mx-6">Top Rated Movies</h1>
      <div className="flex gap-3 overflow-x-auto mx-4">
        {" "}
        {topRatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            img_path={movie.backdrop_path}
          />
        ))}
      </div>
      <h1 className="mx-6">Popular Movies</h1>
      <div className="flex gap-3 overflow-x-auto mx-4">
        {" "}
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            img_path={movie.backdrop_path}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
