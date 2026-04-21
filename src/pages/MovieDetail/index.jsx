//rnfe

import { useState, useEffect } from "react";
import { Play, Share } from "lucide-react";
import {
  getMoviesCast,
  getMovieDetails,
  getMovieImages,
  getWatchProviders,
} from "../../api/movieService";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieCasts, setMovieCasts] = useState([]);
  const [movieLogo, setMovieImages] = useState("");
  const [movieDetails, setMovieDetails] = useState({
    year: "",
    duration: "",
    genres: "",
    rating: "",
    overview: "",
    providers: [],
  });

  useEffect(() => {
    if (!id) return; // ← guard kalau id belum ada

    const fetchDetails = async () => {
      try {
        const [castData, movieData, movieImage, movieProviders] =
          await Promise.all([
            getMoviesCast(id),
            getMovieDetails(id),
            getMovieImages(id),
            getWatchProviders(id),
          ]);
        setMovieCasts(castData.cast.slice(0, 10));
        setMovieDetails({
          year: movieData.release_date?.substring(0, 4) || "",
          duration: movieData.runtime || "",
          genres: movieData.genres
            .slice(0, 3)
            .map((g) => g.name)
            .join(" • "),
          rating: Number(movieData.vote_average).toFixed(1) || "",
          overview: movieData.overview,
          backdrop_path: movieData.backdrop_path,
          poster_path: movieData.poster_path,
          director:
            castData.crew.find((p) => p.job === "Director")?.name || "Unknown",
          tagline: movieData.tagline,
          providers:
            movieProviders.results?.ID?.flatrate?.map((g) => g.logo_path) || [],
        });
        setMovieImages(
          movieImage.logos.find((logo) => logo.iso_639_1 === "en")?.file_path ||
            "",
        );
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };
    fetchDetails();
  }, [id]);
  return (
    <>
      <section className="relative w-full">
        {/* backdrop + overlay */}
        <div
          className="absolute inset-0 z-10 w-full h-[50vh]"
          style={{
            background: "linear-gradient(to top, black 20%, transparent 100%)",
          }}
        />
        {movieDetails.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            className="w-full h-[50vh] object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-[50vh] bg-black text-center flex items-center justify-center text-white font-bold font-logofont text-3xl">
            No Backdrop Picture
          </div>
        )}

        <div className="absolute bottom-0 left-0 flex items-end gap-6 px-8 pb-6 z-20 h-75">
          {/* poster */}
          {movieDetails.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w780/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-50 h-75 object-cover rounded-lg shadow-lg -mb-37.5"
            />
          ) : (
            <div className="w-50 h-75 bg-gray-800 flex items-center justify-center text-white rounded-lg mb-[-60px]">
              No Poster Picture
            </div>
          )}

          {/* logo atau judul */}
          {movieLogo ? (
            <img
              src={`https://image.tmdb.org/t/p/w780/${movieLogo}`}
              alt={movieDetails.title}
              className="w-100 h-auto"
            />
          ) : (
            <div className="w-100 text-white font-bold font-logofont text-3xl">
              {movieDetails.title}
            </div>
          )}
        </div>
      </section>
      <section className="flex flex-col px-8 w-1/2 ml-60  gap-6">
        <p className=" shrink-0 bg-transparent">{movieDetails.genres}</p>
        <div className="flex gap-4">
          <button className="w-fit flex items-center justify-center text-white">
            <Play className="w-5 h-5 mr-2 bg-transparent" />
            Trailer
          </button>
          <button className="w-fit flex items-center justify-center text-white">
            <Share className="w-5 h-5 mr-2 bg-transparent" />
            Share
          </button>
        </div>

        <div className="flex gap-4 items-center bg-transparent">
          <p className="text-yellow-400 font-bold flex gap-2 bg-transparent">
            <span className="bg-transparent">⭐</span>
            {Number(movieDetails.rating)}
          </p>
          <div className="rounded-full  w-1 h-1 bg-gray-700" />
          <p className=" shrink-0 bg-transparent">{movieDetails.year}</p>
          <div className="rounded-full  w-1 h-1 bg-gray-700" />
          <p className="shrink-0 bg-transparent">{movieDetails.duration} min</p>
        </div>
        <p>
          <span className="font-light">Director : </span>
          <span className="font-bold">{movieDetails.director}</span>
        </p>
        <p className="font-light italic">{movieDetails.tagline}</p>
        <p className="text-justify">{movieDetails.overview}</p>
        <p className="font-extralight">Available On</p>
        <div className="flex items-center gap-3">
          {movieDetails.providers.map((logoPath, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w1280/${logoPath}`}
              alt="Available on"
              className="w-20 h-20 rounded-full"
            />
          ))}
        </div>
      </section>
      <section className="my-20 px-8 ml-60 w-1/2">
        <h1>Casts</h1>
        <div className="mt-4">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={12}
            slidesPerView="auto"
            className="w-full px-4"
          >
            {movieCasts.map((movie) => (
              <SwiperSlide key={movie.id} style={{ width: "auto" }}>
                <div className="grid-cols-10 items-center justify-center">
                  <div
                    key={movie.id}
                    className="rounded-full w-25 h-25 bg-white overflow-clip shrink-0 mx-auto"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${movie.profile_path}`}
                      alt={movie.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center">{movie.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;
