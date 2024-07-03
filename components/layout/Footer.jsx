import { OWNER, SITE_NAME } from "@/_data";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="w-full  p-5 lg:p-7 mx-auto max-w-6xl flex  gap-2 flex-wrap items-center justify-between text-sm lg:text-base">
        <Link href={"/"} className="font-bold text-lg lg:text-xl">
          {SITE_NAME}
        </Link>

        <div>
          <span>Copyright © 2024 - </span>
          <Link className="underline" target="_blank" href={OWNER.portfolio}>
            {OWNER.name}
          </Link>{" "}
          <span> Made with ❤</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
