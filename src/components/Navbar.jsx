import { useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsFillFilePdfFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { BsDatabaseAdd } from "react-icons/bs";
import { BiSolidContact } from "react-icons/bi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { FcEngineering } from "react-icons/fc";
import { GiStarMedal } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Update the login state
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white top-0 left-0 w-full px-4 py-2">
      <div className="mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-centerx ml-2">
          <BiWorld className="text-2xl lg:mt-1" />
          <span className="text-white font-bold text-lg ml-2">Parvaz</span>
        </Link>
        <div className="lg:hidden">
          {/* Hamburger Icon */}
          <button
            className="text-white hover:text-gray-300 mt-2 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {/* Horizontal Menu for Large Screens */}
        <div className="hidden lg:flex space-x-6">
          <NavLink to="/skills" className="app-nav-li">
            <BiSolidDashboard />
            <span className="text-white hover:text-primary">Dashboard</span>
          </NavLink>
          <NavLink to="/skills" className="app-nav-li">
            <BiSolidContact />
            <span className="text-white hover:text-primary">Contact</span>
          </NavLink>
          <NavLink to="/skills" className="app-nav-li">
            <BsMicrosoftTeams />
            <span className="text-white hover:text-primary app-nav-li">
              About Us
            </span>
          </NavLink>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-1/2 bg-primary py-4 pl-1 transition-transform duration-300 ease-in-out transform z-50 lg:hidden`}
      >
        <div className="h-[80vh] grid grid-rows-[auto,auto]">
          <div>
            <ul className="space-y-4 mt-4">
              <li className="">
                <Link to="/" className="app-nav-li">
                  <BiSolidDashboard />
                  <span className="text-white hover:text-primary">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <NavLink to="/" className="app-nav-li">
                  <BsFillClipboardCheckFill />
                  <span className="text-white hover:text-primary">
                    Practice MCQs
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <BsFillFilePdfFill />
                  <span className="text-white hover:text-primary">
                    PDF Notes
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <BiPlusMedical />
                  <span className="text-white hover:text-primary">MDCAT</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <FcEngineering />
                  <span className="text-white hover:text-primary">FUNGAT</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <FaBook />
                  <span className="text-white hover:text-primary">
                    Texbooks
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <GiStarMedal />
                  <span className="text-white hover:text-primary">
                    Armed Forces
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/choose" className="app-nav-li">
                  <FaBookReader />
                  <span className="text-white hover:text-primary">
                    Literature
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="px-4 flex flex-col-reverse">
            <NavLink to="/login" onClick={handleLogout} className="app-nav-li">
              <BiLogOutCircle />
              <button className="text-white hover:text-primary">Logout</button>
            </NavLink>
          </div>
        </div>
      </div>
      {/* Dark Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
