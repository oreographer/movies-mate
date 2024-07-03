import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="w-full  p-5 lg:p-7 mx-auto max-w-6xl flex  gap-2 flex-wrap items-center justify-between text-xs lg:text-base">
        <div>
          <span className="font-bold text-lg lg:text-xl">Popcorn Planet</span>
        </div>

        <div>
          <span>Copyright © 2024 - </span>

          <Link
            className="underline"
            target="_blank"
            href="https://oreographer.vercel.app/"
          >
            OreoGrapher
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
