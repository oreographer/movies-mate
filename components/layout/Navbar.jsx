import { OWNER, SITE_NAME } from "@/_data";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="w-full flex justify-between items-center p-3 px-5 mx-auto max-w-5xl ">
        <div className="flex items-center">
          <Link href={"/"} className="text-lg font-bold">
            {SITE_NAME}
          </Link>
        </div>

        <Link target="_blank" href={OWNER.github}>
          <FaGithub className="text-xl" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
