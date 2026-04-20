import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <section className="absolute bg-transparent left-0 right-0 flex px-8 py-3 justify-between items-center">
        {/* logo */}
        <div className="bg-transparent">
          <h1 className="bg-transparent text-2xl font-bold">Watchers</h1>
        </div>

        {/* nav */}
        <div className="bg-linear-to-t from-gray-700 from-70% to-gray-500 rounded-full flex gap-6 px-6 py-2">
          <Link
            to="/"
            className="bg-transparent text-lg font-medium text-white hover:bg-white hover:text-gray-700 rounded-full px-3 py-1 transition-colors duration-300   "
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="bg-transparent text-lg font-medium text-white hover:bg-white hover:text-gray-700 rounded-full px-3 py-1 transition-colors duration-300   "
          >
            Movies
          </Link>
          <Link
            to="/search"
            className="bg-transparent text-lg font-medium text-white hover:bg-white hover:text-gray-700 rounded-full px-3 py-1 transition-colors duration-300   "
          >
            Search
          </Link>
        </div>

        {/* search */}
        <div className="bg-transparent">
          <button>
            <Search className="cursor-pointer bg-transparent text-lg font-medium text-white hover:bg-white hover:text-gray-700 rounded-full px-3 py-1 transition-colors duration-300   " />
          </button>
        </div>
      </section>
    </>
  );
};
export default Navigation;
