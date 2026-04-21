import { getMovieImages, getMovieDetails } from "../../api/movieService";
import { useEffect, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieDetails, setMovieDetails] = useState({
    year: "",
    duration: "",
    genres: "",
    rating: "",
    logo: "",
  });

  const currentMovie = movies[currentIndex];
  const [isPaused, setIsPaused] = useState(false);

  // fetch detail setiap kali currentIndex berubah
  useEffect(() => {
    if (!currentMovie?.id) return;

    const fetchMovieDetails = async () => {
      try {
        const [imagesData, detailsData] = await Promise.all([
          getMovieImages(currentMovie.id),
          getMovieDetails(currentMovie.id),
        ]);

        setMovieDetails({
          year: detailsData.release_date?.substring(0, 4) || "",
          duration: detailsData.runtime || "",
          genres: detailsData.genres
            .slice(0, 3)
            .map((g) => g.name)
            .join(", "),
          rating: Number(detailsData.vote_average).toFixed(1) || "",
          logo:
            imagesData.logos.find((logo) => logo.iso_639_1 === "en")
              ?.file_path || "",
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [currentMovie]);

  useEffect(() => {
    if (!movies?.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [movies, isPaused]);

  const handlePrev = () => {
    setIsPaused(true); // pause dulu saat user klik
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    setTimeout(() => setIsPaused(false), 5000); // resume setelah 5 detik
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsPaused(false), 5000);
  };

  if (!currentMovie) return null;

  return (
    <div className="relative">
      {/* gradient overlay */}
      <div
        className="absolute inset-0 z-10 w-full h-screen"
        style={{
          background: "linear-gradient(to top, black 20%, transparent 100%)",
        }}
      />

      {/* konten teks */}
      <div className="absolute z-20 w-1/3 h-fit flex flex-col gap-4 bottom-20 left-10 items-start px-12 bg-transparent">
        <div className="bg-green-800 text-green-300 px-3 py-1 rounded-lg">
          Now Playing
        </div>
        {/* logo atau judul */}
        {movieDetails.logo ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetails.logo}`}
            alt={`${currentMovie.title} Logo`}
            className="w-50 h-30 object-contain bg-transparent"
          />
        ) : (
          <h1 className="text-3xl font-bold text-white bg-transparent">
            {currentMovie.title}
          </h1>
        )}

        {/* info film */}
        <div className="flex gap-4 items-center bg-transparent">
          <p className="text-yellow-400 font-bold flex gap-2 bg-transparent">
            <span className="bg-transparent">⭐</span>
            {movieDetails.rating}
          </p>
          <div className="rounded-full  w-1 h-1 bg-white" />
          <p className="text-white shrink-0 bg-transparent">
            {movieDetails.year}
          </p>
          <div className="rounded-full  w-1 h-1 bg-white" />
          <p className="text-white shrink-0 bg-transparent">
            {movieDetails.duration} min
          </p>
          <div className="rounded-full w-1 h-1 bg-white" />
          <p className="text-white shrink-0 bg-transparent">
            {movieDetails.genres}
          </p>
        </div>

        <p className="text-justify h-25 text-white text-sm bg-transparent">
          {currentMovie.overview}
        </p>

        {/* tombol */}
        <div className="flex gap-4">
          <button className="flex items-center justify-center text-white">
            <Play className="w-5 h-5 mr-2  bg-transparent" />
            Trailer
          </button>

          {/* tombol carousel */}
          <button
            onClick={handlePrev}
            className="flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-5 h-5 bg-transparent" />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center text-white"
          >
            <ChevronRight className="w-5 h-5 bg-transparent" />
          </button>
        </div>

        {/* dots indicator */}
        <div className="flex gap-2 bg-transparent">
          {movies.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-px rounded-full transition-all opacity-70 border-0 p-1 bg-transparent ${
                index === currentIndex ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* backdrop image */}
      <div className="px-6">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-screen object-cover rounded-b-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
