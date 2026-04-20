const HeroSection = (props) => {
  return (
    <>
      <div>
        <div className="absolute z-10 w-1/3 h-1/2 my-auto left-0 top-10 ">
          <img src="" alt="" />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`}
          alt={props.movie.title}
          className="w-full h-[500px] object-cover rounded-b-lg mx-4 mb-4"
        />
      </div>
    </>
  );
};

export default HeroSection;
