import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

export default function Navbar() {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[poppins]">Event Management Portal</span>
        </Link>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient   text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to={"/"}
            >
              Home
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }`}
              to={"/vendors"}
            >
              Vendors
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to={"/about"}
            >
              About
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }`}
              to={"/contact"}
            >
              Contact
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }`}
              to={"/booking"}
            >
              Bookings
            </Link>
          </li>

          {user && user.id ? (
            <li className="font-[500] transition-all duration-150">
              <UserMenu />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
              <Link
                className="flex items-center space-x-2 px-4 py-[6px] 
                            bg-gradient-to-r from-purple-600 to-red-500 
                            text-white font-semibold rounded-md shadow-lg 
                            hover:from-purple-500 hover:to-red-400 transition 
                            duration-300 ease-in-out transform"
                to={"/login"}
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
