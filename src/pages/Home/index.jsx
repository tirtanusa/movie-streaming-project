import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import HeroSection from "./HeroSection";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMoviesByGenre,
} from "../../api/movieService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, nowPlaying, topRated, byGenre] = await Promise.all([
          getPopularMovies(),
          getNowPlayingMovies(),
          getTopRatedMovies(),
          getMoviesByGenre(28),
        ]);
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
        setMovieByGenre(byGenre);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <HeroSection movies={nowPlayingMovies.slice(0, 10)} />

      <section className="flex flex-col  mx-6">
        <h1 className="">Top Rated Movies</h1>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full px-4"
        >
          {topRatedMovies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: "auto" }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                genres={movie.genre_ids}
                img_path={movie.poster_path}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="flex flex-col  mx-6">
        <h1 className="">Popular Movies</h1>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full px-4"
        >
          {popularMovies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: "auto" }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                genres={movie.genre_ids}
                img_path={movie.poster_path}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Home;
