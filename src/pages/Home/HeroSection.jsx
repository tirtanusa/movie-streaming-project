import { getMovieImages } from "../../api/movieService";
import { useEffect, useState } from "react";

const HeroSection = (props) => {
  const [movieImagesPath, setMovieImagesPath] = useState([]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const imagesData = await getMovieImages(props.movie.id);
        const logo = imagesData.logos.find((logo) => logo.iso_639_1 === "en");
        setMovieImagesPath(logo ? logo.file_path : "");
      } catch (error) {
        console.error("Error fetching movie images:", error);
      }
    };
    fetchMovieImages();
  }, [props.movie]);
  return (
    <>
      <div>
        <div className="absolute z-10 w-1/5 h-1/2 my-auto left-0 top-10 flex flex-col gap-4 justify-center items-start bg-transparent px-12">
          <img
            src={
              movieImagesPath ? (
                `https://image.tmdb.org/t/p/original/${movieImagesPath}`
              ) : (
                <h1>{props.movie.title}</h1>
              )
            }
            alt={props.movie.title}
            className="w-auto h-40 object-contain bg-transparent mx-auto"
          />
          <p className="text-justify bg-transparent text-white text-sm">
            {props.movie.overview}
          </p>
          <div className="flex bg-transparent gap-4">
            <button>Watchlist</button>
            <button>Trailer</button>
          </div>
        </div>
        <div className="px-6">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`}
            alt={props.movie.title}
            className="w-full h-125 object-cover rounded-b-lg mb-4"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
