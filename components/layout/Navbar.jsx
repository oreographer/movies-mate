import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="w-full flex justify-between items-center p-2 px-5 mx-auto max-w-5xl ">
        <div className="flex items-center">
          <Link href={"/"} className="text-lg font-bold">
            Popcorn Planet
          </Link>
        </div>

        <Link target="_blank" href={"https://github.com/oreographer"}>
          <FaGithub className="text-xl" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
