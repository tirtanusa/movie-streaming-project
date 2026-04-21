import { Search, Home, Tv, Tag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div
        className={`fixed z-30 top-0 left-1/2 px-6 py-2 -translate-x-1/2 w-3/4 duration-300 flex items-center justify-between rounded-lg mt-4
   ${isScrolled ? "bg-black border-2 border-gray-50 mt-10" : "bg-transparent border-2 border-transparent -mt-20"}`}
      >
        {/* Logo */}
        <section className="text-white font-logofont text-3xl font-bold">
          Watchers
        </section>
        {/* Nav */}
        <section className="flex gap-10 text-white items-center">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-red-500" : "text-white"
            }
          >
            <div className="flex gap-2 items-center">
              <Home className="w-5 h-5" />
              Home
            </div>
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-red-500" : "text-white"
            }
          >
            <div className="flex gap-2 items-center">
              <Tv className="w-5 h-5" />
              Tv Shows
            </div>
          </NavLink>
          <NavLink
            to="/genre"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-red-500" : "text-whites"
            }
          >
            <div className="flex gap-2 items-center">
              <Tag className="w-5 h-5" />
              Genre
            </div>
          </NavLink>
        </section>
        {/* Search and User  */}
        <section className="flex items-center  gap-4">
          <Search className="text-white" />
        </section>
      </div>
    </>
  );
};
export default Navigation;
