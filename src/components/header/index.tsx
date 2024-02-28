import AvatarImg from "@/components/Avatar";
import ModeToggle from "@/components/ModeToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <AvatarImg />

      <button
        className="inline-block sm:hidden z-50 mr-3"
        onClick={toggle}
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-black dark:bg-white rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-black dark:bg-white rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-black dark:bg-white rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      <nav
        className="w-max py-3 px-8 border border-solid border-black dark:border-white rounded-full font-medium capitalize items-center hidden sm:flex 
        bg-light/80 backdrop-blur-sm z-50"
      >
        <a href="/" className="mr-2">
          Home
        </a>
        <a href="/about" className="mx-2">
          About
        </a>
      </nav>

      <nav
        className=" w-4/6 h-full py-3 px-6 sm:px-8 bg-white dark:bg-black rounded-e-xl font-medium capitalize flex 
        sm:hidden fixed top-0 left-0 backdrop-blur-sm z-50 transition-all ease duration-300"
        style={{ left: click ? "0rem" : "-70%" }}
      >
        <ul>
          <li className="my-2">
            <a href="/" className="block">
              Home
            </a>
          </li>
          <li className="my-2">
            <a href="/about" className="block">
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* <div className="hidden sm:flex items-center"></div> */}
      <ModeToggle className="hidden sm:flex" />
    </header>
  );
};

export default Navbar;
