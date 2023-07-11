import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '../Config/userSlice';

import { ProfileDropdown } from "../ReUsable/ProfileDropdown";


export const Header = () => {
  const user = useSelector(selectUser)

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    const headerLinks = document.querySelector(".header-links");
    headerLinks?.classList.toggle("open");

    const linkItems = document.querySelectorAll(".link-item");
    linkItems.forEach((item) => {
      item.addEventListener("click", () => {
        headerLinks?.classList.remove("open");
        setMenuOpen(false);
      });
    });
    setMenuOpen((prev) => !prev);

  };

  const preventScroll = () => {
    if (menuOpen) {
      document.body.classList.add("is-side-menu-open");
    } else {
      document.body.classList.remove("is-side-menu-open");
    }
  };

  useEffect(() => {
    preventScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-white flex justify-between items-center px-28 py-6 shadow-md 2xl:px-12 xl:px-9 md:py-5 sm:px-4" >
      <div className="">
        <h2 className=" uppercase font-bold text-5xl text-blue-700 lg:text-[36px] sm:text-3xl">Chatter</h2>
      </div>
      <div className="flex gap-6 text-black text-base font-bold lg:hidden">
        <Link to="/" className="un">
          Home
        </Link>
        <a href="#about" className="un">
          About
        </a>
        <Link to="/" className="un">
          Contact
        </Link>
        <Link to="/" className="un">
          Blogs
        </Link>
      </div>
      <div>

        {user ?
          <div className="flex gap-3 items-center z-30">
            <ProfileDropdown />
            {/* <Link to="/feed">
              <button className=" text-white font-normal text-lg bg-blue-700 rounded-lg py-3 w-36 hover:bg-blue-800 transition duration-500 ease-in-out">
                Feed
              </button>
            </Link> */}
            <button
              id="menu-btn"
              onClick={handleMenu}
              className={`hamburger  ${menuOpen ? "open" : ""
                } hidden lg:block focus:outline-none z-30 `}
            >
              <span className="harburger-top bg-blue-700 transition duration-500 ease-in-out  "></span>
              <span className="harburger-middle bg-blue-700 transition duration-500 ease-in-out  "></span>
              <span className="harburger-bottom bg-blue-700 transition duration-500 ease-in-out  "></span>
            </button>
          </div> :
          <div className="flex gap-6 items-center xl:gap-4 md:gap-3 sm:gap-2">
            <Link to="/login">
              <button className=" text-blue-900 font-normal text-lg box-border border border-blue-700 rounded-lg py-3 w-36 hover:bg-gray-50 transition duration-500 ease-in-out xl:w-32 xl:text-base lg:text-sm lg:w-28 md:hidden">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className=" text-white font-normal text-lg bg-blue-700 rounded-lg py-3 w-36 hover:bg-blue-800 transition duration-500 ease-in-out xl:w-32 xl:text-base lg:hidden">
                Sign Up
              </button>
            </Link>
            <button
              id="menu-btn"
              onClick={handleMenu}
              className={`hamburger  ${menuOpen ? "open" : ""
                } hidden lg:block focus:outline-none z-30 `}
            >
              <span className="harburger-top bg-blue-700 transition duration-500 ease-in-out  "></span>
              <span className="harburger-middle bg-blue-700 transition duration-500 ease-in-out  "></span>
              <span className="harburger-bottom bg-blue-700 transition duration-500 ease-in-out  "></span>
            </button>
          </div>
        }
      </div>
      <div className="header-links hidden lg:block z-20"
        onClick={handleMenu}
      >
        <div className="bg-white lg:flex flex-col gap-5 h-screen px-10 py-5 pr-20 sm:pr-8 sm:px-6"
          // just find a way to close the menu when you click outside the menu
          onClick={(e) => e.stopPropagation()}
        >
          {user ? <> </> :
            <div className="hidden md:flex gap-4 w-full mt-6">
              <Link to="/login">
                <button className=" text-blue-900 font-normal text-sm box-border border border-blue-700 rounded-lg py-3 w-24 hover:bg-gray-50 transition duration-500 ease-in-out">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className=" text-white font-normal text-sm bg-blue-700 rounded-lg py-3 w-24 hover:bg-blue-800 transition duration-500 ease-in-out">
                  Sign Up
                </button>
              </Link>
            </div>
          }
          <ul className="flex flex-col gap-5 pt-6 text-base font-semibold text-black">
            <li className="border-b border-gray-700 pb-3">
              <Link to="/" className="link-item">
                Home
              </Link>
            </li>
            <li className="border-b border-gray-700 pb-3">
              <a href="#about" className="link-item">
                About
              </a>
            </li>
            <li className="border-b border-gray-700 pb-3">
              <Link to="/" className="link-item">
                Contact
              </Link>
            </li>
            <li className="border-b border-gray-700 pb-3">
              <Link to="/" className="link-item">
                Blogs
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}