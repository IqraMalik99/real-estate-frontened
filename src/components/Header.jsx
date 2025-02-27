import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const Userstate = useSelector((state) => state.user.currentUser);
  const logged = useSelector((state) => state.user.login);
  const [data, setData] = useState("");

  const navigate = useNavigate();

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${encodeURIComponent(data)}`);
  };



  return (
    <div className="group px-4 sm:px-6 text-white flex flex-col justify-center items-center w-screen bg-gradient-to-r from-gray-500 to-black h-20 fixed top-0 z-50 transition-all duration-700 ease-in-out hover:h-48">
      {/* Top Row (Logo, Search Bar, Navigation Links) */}
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link
          to="/"
          className=" mt-5 font-bold text-xl sm:text-2xl hover:text-gray-300"
        >
          Real Estate
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmitQuery} className="flex-grow mx-4 max-w-md">
          <div className="p-2 bg-blue-100 rounded flex items-center mt-5">
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="focus:outline-none  w-full bg-transparent text-black placeholder-gray-600"
              placeholder="Search ..."
              aria-label="Search properties"
            />
            <button type="submit" aria-label="Search">
              <FaSearch className="text-black" />
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <ul className="flex items-center gap-4 sm:gap-6">
          <li className="hover:underline font-semibold hidden md:block mt-5">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
         
          {/* Conditional Rendering for Auth Links */}
          {logged ? (
            <div className="relative">
              {/* Profile Image with Dropdown */}
              <Link
                    to="/profile"
                aria-label="User profile"
                className="focus:outline-none "
              >
                <img
                  className="mt-5 w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-white hover:border-gray-300"
                  src={Userstate?.avatar || "https://via.placeholder.com/150"} // Fallback avatar
                  alt="Profile"
                />
         </Link>

             
            </div>
          ) : (
            <>
              {/* Hide "Sign Up" and "Sign In" on small screens */}
              <li className=" mt-5 hover:underline font-semibold hidden sm:block">
                <Link to="/sign-up" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
              <li className=" mt-5 hover:underline font-semibold hidden sm:block">
                <Link to="/sign-in" className="hover:text-gray-300">
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Additional Options (Visible on Hover) */}
      <div className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
        <ul className="flex justify-center gap-6">
          {/* Show "Sign Up" and "Sign In" on hover for small screens (logged out) */}
          {!logged && (
            <>
              <li className="hover:underline font-semibold sm:hidden">
                <Link to="/sign-in" className="hover:text-gray-300">
                  Sign In
                </Link>
              </li>
            </>
          )}
          <li className="hover:underline font-semibold">
            <Link
              to="/sign-out"
             className="hover:text-gray-300"
            >
              Sign Out
            </Link>
          </li>
          <li className="hover:underline font-semibold ">
                <Link to="/sign-up" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
