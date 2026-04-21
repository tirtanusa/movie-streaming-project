import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../api/movieService";

const MovieCard = (props) => {
  const [details, setDetails] = useState({
    genres: "",
    year: "",
    duration: "",
  });

  useEffect(() => {
    const fetchGenreNames = async () => {
      try {
        const genreData = await getMovieDetails(props.id);
        setDetails({
          genres: genreData.genres
            .slice(0, 3)
            .map((genre) => genre.name)
            .join(" "),
          year: genreData.release_date?.substring(0, 4) || "",
          duration: genreData.runtime || "",
        });
      } catch (error) {
        console.error("Error fetching genre names:", error);
      }
    };

    console.log("MovieCard id:", props.id);

    if (props.id) {
      fetchGenreNames();
    }
  }, [props.id]);

  return (
    <>
      <div className="relative w-fit shrink-0 hover:scale-105 duration-300 transition-transform py-4 cursor-pointer">
        <section className="absolute z-10 bg-black w-42 h-67 rounded-lg opacity-0 hover:opacity-80  transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
          <div className="flex items-center justify-between bg-transparent overflow-x-auto">
            <div className="flex flex-col items-center gap-2 overflow-x-hidden bg-transparent ">
              <p className="text-sm bg-transparent">{details.year}</p>
              <div className="rounded-full bg-gray-600 w-1 h-1"></div>
              <p className="text-sm bg-transparent">{details.duration} mins</p>
              <div className="rounded-full bg-gray-600 w-1 h-1"></div>
              <p className="text-sm bg-transparent shrink-0">
                {details.genres}
              </p>
            </div>
          </div>
        </section>

        <section className="absolute bg-transparent">
          <div
            className={`text-white flex items-center w-10 h-10 border-2 mx-2 my-2 rounded-full ${Number(props.rating) >= 7 ? "border-green-500" : Number(props.rating) > 5 ? "border-yellow-500" : "border-red-500"} text-center justify-center-safe p-auto`}
          >
            {Number(props.rating).toFixed(1)}
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
            <h2 className=" text-base truncate">{props.title}</h2>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieCard;
