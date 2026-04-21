import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../api/movieService";

const MovieCard = (props) => {
  const [genreNames, setGenreNames] = useState([]);
  const [movieYear, setMovieYear] = useState("");
  const [movieDuration, setMovieDuration] = useState("");

  useEffect(() => {
    const fetchGenreNames = async () => {
      try {
        const genreData = await getMovieDetails(props.id);
        setGenreNames(
          genreData.genres
            .slice(0, 3)
            .map((genre) => genre.name)
            .join(" "),
        );
        setMovieYear(genreData.release_date?.substring(0, 4) || "");
        setMovieDuration(genreData.runtime || "");
      } catch (error) {
        console.error("Error fetching genre names:", error);
      }
    };

    console.log("MovieCard id:", props.id);

    if (props.genres) {
      fetchGenreNames();
    }
  }, [props.genres]);

  return (
    <>
      <div className="w-fit shrink-0 hover:scale-105 duration-300 transition-transform py-4 cursor-pointer">
        <section className="absolute z-10 bg-black w-42 h-67 rounded-lg opacity-100 hover:opacity-80  transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
          <div className="flex items-center justify-between bg-transparent overflow-x-auto">
            <div className="flex flex-col items-center gap-2 overflow-x-hidden bg-transparent ">
              <p className="text-sm bg-transparent">{movieYear}</p>
              <div className="rounded-full bg-gray-600 w-1 h-1"></div>
              <p className="text-sm bg-transparent">{movieDuration} mins</p>
              <div className="rounded-full bg-gray-600 w-1 h-1"></div>
              <p className="text-sm bg-transparent shrink-0">{genreNames}</p>
            </div>
          </div>
        </section>
        {/* Image */}
        <section>
          <img
            src={`https://image.tmdb.org/t/p/w780/${props.img_path}`}
            alt={props.title}
            className="w-50 h-75 object-cover rounded-lg bg-gray-800"
          />
        </section>

        {/* Title , duration, genre, and Rating */}
        <section className="mt-2 max-w-50">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-md">{props.title}</h2>
            <p className="flex items-center gap-2 text-white">
              <Star className="text-yellow-200 w-6 h-6" />
              {Number(props.rating).toFixed(1)}/10
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieCard;
